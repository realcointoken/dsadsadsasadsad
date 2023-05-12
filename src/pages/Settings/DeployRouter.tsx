import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { useActiveWeb3React } from '../../hooks'
import { useTransactionAdder } from '../../state/transactions/hooks'
import { deployRouter } from '../../utils/contract'
import { chainInfo } from '../../config/chainConfig'
import { ButtonPrimary } from '../../components/Button'
import { useMainConfigContract } from '../../hooks/useContract'
import { useAppState } from '../../state/application/hooks'

const Button = styled(ButtonPrimary)`
  width: 100%;
`

export default function DeployRouter({
  onDeploymentCallback,
  serverAdminAddress
}: {
  onDeploymentCallback: (contractAddress: string, chainId: number, hash: string) => void
  serverAdminAddress: string | undefined
}) {
  const { account, library, active, chainId: currentChainId } = useActiveWeb3React()
  const { t } = useTranslation()
  const addTransaction = useTransactionAdder()
  const [wrappedToken, setWrappedToken] = useState('')
  const { appSettings: { mainConfigAddress, mainConfigChainId, routerConfigs } } = useAppState()
  const routerConfig = useMainConfigContract(mainConfigAddress, mainConfigChainId || 0, true)

  const hasRouterOnChain = () => {
    const contractsOnChain = Object.keys(routerConfigs).filter((contractKey) => {
      const contractInfo = routerConfigs[contractKey]
      return (contractInfo.chainId == currentChainId)
    })
    return !(contractsOnChain.length === 0)
  }

  useEffect(() => {
    if (currentChainId) {
      const { wrappedToken } = chainInfo[currentChainId]

      setWrappedToken(wrappedToken || '')
    }
  }, [currentChainId])

  const [canDeploy, setCanDeploy] = useState(false)

  useEffect(() => setCanDeploy(Boolean(active && wrappedToken && serverAdminAddress)), [
    active,
    wrappedToken,
    serverAdminAddress
  ])

  const onDeployment = async () => {
    if (!currentChainId || !wrappedToken || !routerConfig) return

    const breakDeployment = !(hasRouterOnChain() ? confirm(`You are already has deployed contract on this network. Deploy new?`) : true)
    if (breakDeployment) return

    try {
      await deployRouter({
        chainId: currentChainId,
        library,
        account,
        onDeployment: (contractAddress: string, chainId: number, hash: string) => {
          addTransaction(
            { hash },
            {
              summary: `Deployment: chain ${chainId}; ROUTER ${contractAddress}`
            }
          )
          onDeploymentCallback(contractAddress, chainId, hash)
        },
        factory: account,
        wNative: wrappedToken,
        mpc: serverAdminAddress // https://github.com/noxonsu/CrossChain-Router/blob/main/README.md?plain=1#L19
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Button disabled={!canDeploy} onClick={onDeployment}>
      {t(serverAdminAddress ? 'deployRouter' : 'saveValidatorNodeNetworkAddress')}
    </Button>
  )
}
