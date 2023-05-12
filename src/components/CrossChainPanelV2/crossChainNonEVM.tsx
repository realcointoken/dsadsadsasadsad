import React, { useEffect, useState, useContext, useMemo, useCallback } from 'react'

import {isAddress} from 'multichain-bridge'
import { useTranslation } from 'react-i18next'
import { ThemeContext } from 'styled-components'
import { ArrowDown, Plus, Minus } from 'react-feather'

import SelectChainIdInputPanel from './selectChainID'
import Reminder from './reminder'

import { useActiveWeb3React } from '../../hooks'
import {useTerraCrossBridgeCallback} from '../../hooks/useBridgeCallback'
import { WrapType } from '../../hooks/useWrapCallback'
// import { useApproveCallback, ApprovalState } from '../../hooks/useApproveCallback'
// import { useLocalToken } from '../../hooks/Tokens'

import SelectCurrencyInputPanel from '../CurrencySelect/selectCurrency'
import { AutoColumn } from '../Column'
// import { ButtonLight, ButtonPrimary, ButtonConfirmed } from '../Button'
import { ButtonLight, ButtonPrimary } from '../Button'
import { AutoRow } from '../Row'
// import Loader from '../Loader'
import AddressInputPanel from '../AddressInputPanel'
import { ArrowWrapper, BottomGrouping } from '../swap/styleds'
import ModalContent from '../Modal/ModalContent'

import { useWalletModalToggle } from '../../state/application/hooks'
// import { tryParseAmount } from '../../state/swap/hooks'
// import { useMergeBridgeTokenList } from '../../state/lists/hooks'
import { useAllMergeBridgeTokenList } from '../../state/lists/hooks'
import { useUserSelectChainId } from '../../state/user/hooks'

import config from '../../config'
import {getParams} from '../../config/tools/getUrlParams'
import {selectNetwork} from '../../config/tools/methods'

// import {getNodeTotalsupply} from '../../utils/bridge/getBalanceV2'
// import {formatDecimal, thousandBit} from '../../utils/tools/tools'

import TokenLogo from '../TokenLogo'
// import LiquidityPool from '../LiquidityPool'

import {
  LogoBox,
  ConfirmContent,
  TxnsInfoText,
  ConfirmText,
  FlexEC,
} from '../../pages/styled'

import {
  outputValue,
  useInitSelectCurrency,
  useDestChainid,
  useDestCurrency
} from './hooks'

// let intervalFN:any = ''

export default function CrossChain({
  bridgeKey
}: {
  bridgeKey: any
}) {
  // const { account, chainId, library } = useActiveWeb3React()
  const { account, chainId } = useActiveWeb3React()
  const { t } = useTranslation()
  const [selectNetworkInfo] = useUserSelectChainId()
  
  const useChainId = useMemo(() => {
    if (selectNetworkInfo?.chainId) {
      return selectNetworkInfo?.chainId
    }
    return chainId
  }, [selectNetworkInfo, chainId])

  // const allTokensList:any = useMergeBridgeTokenList(useChainId)
  const allTokensList:any = useAllMergeBridgeTokenList(bridgeKey, useChainId)
  const theme = useContext(ThemeContext)
  const toggleWalletModal = useWalletModalToggle()
  

  const [inputBridgeValue, setInputBridgeValue] = useState('')
  const [selectCurrency, setSelectCurrency] = useState<any>()
  const [selectDestCurrency, setSelectDestCurrency] = useState<any>()
  const [selectDestCurrencyList, setSelectDestCurrencyList] = useState<any>()
  const [selectChain, setSelectChain] = useState<any>()
  const [selectChainList, setSelectChainList] = useState<Array<any>>([])
  const [recipient, setRecipient] = useState<any>(account ?? '')
  const [swapType, setSwapType] = useState('swap')
  
  // const [intervalCount, setIntervalCount] = useState<number>(0)

  const [modalOpen, setModalOpen] = useState(false)
  const [modalTipOpen, setModalTipOpen] = useState(false)

  const [delayAction, setDelayAction] = useState<boolean>(false)

  let initBridgeToken:any = getParams('bridgetoken') ? getParams('bridgetoken') : ''
  initBridgeToken = initBridgeToken ? initBridgeToken.toLowerCase() : ''

  const destConfig = useMemo(() => {
    // console.log(selectCurrency)
    if (selectDestCurrency) {
      return selectDestCurrency
    }
    return false
  }, [selectDestCurrency])
  // console.log(destConfig)
  const isRouter = useMemo(() => {
    // console.log(destConfig)
    if (['swapin', 'swapout'].includes(destConfig?.type)) {
      return false
    }
    return true
  }, [destConfig])

  const isUnderlying = useMemo(() => {
    if (selectCurrency && selectCurrency?.underlying) {
      return true
    }
    return false
  }, [selectCurrency])

  const isDestUnderlying = useMemo(() => {
    // console.log(destConfig)
    // console.log(destConfig?.underlying)
    if (destConfig?.underlying) {
      return true
    }
    return false
  }, [destConfig])
  
  // const formatCurrency = useLocalToken(selectNetworkInfo?.chainId ? undefined : selectCurrency)

  function onDelay () {
    setDelayAction(true)
  }
  function onClear (type?:any) {
    setDelayAction(false)
    setModalTipOpen(false)
    if (!type) {
      setInputBridgeValue('')
    }
  }

  function changeNetwork (chainID:any) {
    selectNetwork(chainID).then((res: any) => {
      console.log(res)
      if (res.msg === 'Error') {
        alert(t('changeMetamaskNetwork', {label: config.getCurChainInfo(chainID).networkName}))
      }
    })
  }

  const { balance: terraBalance, wrapType: wrapTerraType, execute: onTerraWrap, inputError: wrapInputErrorTerra } = useTerraCrossBridgeCallback(
    selectCurrency,
    destConfig.DepositAddress,
    inputBridgeValue,
    selectChain,
    selectCurrency?.address,
    destConfig?.pairid,
    recipient,
    destConfig?.Unit,
    useChainId
  )

  const outputBridgeValue = outputValue(inputBridgeValue, destConfig, selectCurrency)

  const useBalance = useMemo(() => {
    return terraBalance?.toSignificant(3)
  }, [terraBalance])
  // console.log(terraBalance)
  const isWrapInputError = useMemo(() => {
    if (wrapInputErrorTerra) {
      return wrapInputErrorTerra
    } else {
      return false
    }
  }, [wrapInputErrorTerra])
  // console.log(selectCurrency)
  const isCrossBridge = useMemo(() => {
    const isAddr = isAddress( recipient, selectChain)
    if (
      account
      && destConfig
      && selectCurrency
      && inputBridgeValue
      && !isWrapInputError
      && isAddr
    ) {
      if (
        Number(inputBridgeValue) < Number(destConfig.MinimumSwap)
        || Number(inputBridgeValue) > Number(destConfig.MaximumSwap)
      ) {
        return true
      } else {
        return false
      }
    } else {
      return true
    }
  }, [selectCurrency, account, destConfig, inputBridgeValue, recipient, isWrapInputError, selectChain])

  const isInputError = useMemo(() => {
    if (
      account
      && destConfig
      && selectCurrency
      && inputBridgeValue
      && isCrossBridge
    ) {
      if (
        Number(inputBridgeValue) < Number(destConfig.MinimumSwap)
        || Number(inputBridgeValue) > Number(destConfig.MaximumSwap)
        || isWrapInputError
        || isCrossBridge
      ) {
        // console.log(1)
        return true
      } else {
        // console.log(2)
        return false
      }
    } else {
      // console.log(3)
      return false
    }
  }, [account, destConfig, selectCurrency, inputBridgeValue, isCrossBridge, isWrapInputError])

  const btnTxt = useMemo(() => {
    // console.log(isWrapInputError)
    if (isWrapInputError && inputBridgeValue) {
      return isWrapInputError
    } else if (
      destConfig
      && inputBridgeValue
      && (
        Number(inputBridgeValue) < Number(destConfig.MinimumSwap)
        || Number(inputBridgeValue) > Number(destConfig.MaximumSwap)
      )
    ) {
      return t('ExceedLimit')
    } else if (wrapTerraType === WrapType.WRAP) {
      return t('swap')
    }
    return t('swap')
  }, [t, isWrapInputError, inputBridgeValue, destConfig, isDestUnderlying, wrapTerraType, isRouter])

  const {initCurrency} = useInitSelectCurrency(allTokensList, useChainId, initBridgeToken)

  useEffect(() => {
    // console.log(initCurrency)
    setSelectCurrency(initCurrency)
  }, [initCurrency])
  
  useEffect(() => {
    if (swapType == 'swap' && account && !isNaN(selectChain)) {
      setRecipient(account)
    } else if (isNaN(selectChain) && destConfig?.type === 'swapout') {
      setRecipient('')
    }
  }, [account, swapType, selectChain, destConfig])

  const {initChainId, initChainList} = useDestChainid(selectCurrency, selectChain, useChainId)

  useEffect(() => {
    // console.log(selectCurrency)
    setSelectChain(initChainId)
  }, [initChainId])

  useEffect(() => {
    setSelectChainList(initChainList)
  }, [initChainList])

  const {initDestCurrency, initDestCurrencyList} = useDestCurrency(selectCurrency, selectChain)

  useEffect(() => {
    setSelectDestCurrency(initDestCurrency)
  }, [initDestCurrency])

  useEffect(() => {
    setSelectDestCurrencyList(initDestCurrencyList)
  }, [initDestCurrencyList])

  const handleMaxInput = useCallback((value) => {
    if (value) {
      setInputBridgeValue(value)
    } else {
      setInputBridgeValue('')
    }
  }, [setInputBridgeValue])

  return (
    <>
      <ModalContent
        isOpen={modalTipOpen}
        title={'Cross-chain Router'}
        onDismiss={() => {
          setModalTipOpen(false)
        }}
      >
        <LogoBox>
          <TokenLogo symbol={selectCurrency?.symbol ?? selectCurrency?.symbol} size={'1rem'}></TokenLogo>
        </LogoBox>
        <ConfirmContent>
          <TxnsInfoText>{inputBridgeValue + ' ' + config.getBaseCoin(selectCurrency?.symbol ?? selectCurrency?.symbol, useChainId)}</TxnsInfoText>
          {
            isUnderlying && isDestUnderlying ? (
              <ConfirmText>
                {
                  t('swapTip', {
                    symbol: config.getBaseCoin(selectCurrency?.underlying?.symbol, useChainId),
                    symbol1: config.getBaseCoin(selectCurrency?.symbol ?? selectCurrency?.symbol, useChainId),
                    chainName: config.getCurChainInfo(selectChain).name
                  })
                }
              </ConfirmText>
            ) : ''
          }
          <BottomGrouping>
            {!account ? (
                <ButtonLight onClick={toggleWalletModal}>{t('ConnectWallet')}</ButtonLight>
              ) : (
                <ButtonPrimary disabled={isCrossBridge || delayAction} onClick={() => {
                // <ButtonPrimary disabled={delayAction} onClick={() => {
                  onDelay()
                  if (onTerraWrap) onTerraWrap().then(() => {
                    onClear()
                  })
                }}>
                  {t('Confirm')}
                </ButtonPrimary>
              )
            }
          </BottomGrouping>
        </ConfirmContent>
      </ModalContent>

      <AutoColumn gap={'sm'}>

        <SelectCurrencyInputPanel
          label={t('From')}
          value={inputBridgeValue}
          onUserInput={(value) => {
            // console.log(value)
            setInputBridgeValue(value)
          }}
          onCurrencySelect={(inputCurrency) => {
            // console.log(inputCurrency)
            setSelectCurrency(inputCurrency)
          }}
          onMax={(value) => {
            handleMaxInput(value)
          }}
          currency={selectCurrency}
          disableCurrencySelect={false}
          showMaxButton={true}
          isViewNetwork={true}
          onOpenModalView={(value) => {
            // console.log(value)
            setModalOpen(value)
          }}
          isViewModal={modalOpen}
          id="selectCurrency"
          isError={isInputError}
          bridgeKey={bridgeKey}
          allTokens={allTokensList}
          customChainId={useChainId}
          customBalance={useBalance}
        />
        <AutoRow justify="center" style={{ padding: '0 1rem' }}>
          <ArrowWrapper clickable={false} style={{cursor:'pointer'}} onClick={() => {
            // toggleNetworkModal()
            changeNetwork(selectChain)
          }}>
            <ArrowDown size="16" color={theme.text2} />
          </ArrowWrapper>
          {
            account && destConfig?.type !== 'swapin' && !isNaN(selectChain) ? (
              <ArrowWrapper clickable={false} style={{cursor:'pointer', position: 'absolute', right: 0}} onClick={() => {
                if (swapType === 'swap') {
                  setSwapType('send')
                } else {
                  setSwapType('swap')
                  if (account) {
                    setRecipient(account)
                  }
                }
              }}>
                {
                  swapType === 'swap' ? (
                    <FlexEC>
                      <Plus size="16" color={theme.text2} /> <span style={{fontSize: '12px', lineHeight:'12px'}}>{t('sendto')}</span>
                    </FlexEC>
                  ) : (
                    <FlexEC>
                      <Minus size="16" color={theme.text2} /> <span style={{fontSize: '12px', lineHeight:'12px'}}>{t('sendto')}</span>
                    </FlexEC>
                  )
                }
              </ArrowWrapper>
            ) : ''
          }
        </AutoRow>

        <SelectChainIdInputPanel
          label={t('to')}
          value={outputBridgeValue.toString()}
          onUserInput={(value) => {
            setInputBridgeValue(value)
          }}
          onChainSelect={(chainID) => {
            setSelectChain(chainID)
          }}
          selectChainId={selectChain}
          id="selectChainID"
          onCurrencySelect={(inputCurrency) => {
            console.log(inputCurrency)
            setSelectDestCurrency(inputCurrency)
          }}
          bridgeConfig={selectCurrency}
          // intervalCount={intervalCount}
          selectChainList={selectChainList}
          selectDestCurrency={selectDestCurrency}
          selectDestCurrencyList={selectDestCurrencyList}
          bridgeKey={bridgeKey}
        />
        {
          swapType == 'send' || (isNaN(selectChain) && destConfig?.type === 'swapout') || isNaN(useChainId) ? (
            <AddressInputPanel id="recipient" value={recipient} label={t('Recipient') + '( ' + t('receiveTip') + ' )'} onChange={setRecipient} selectChainId={selectChain} />
          ) : ''
        }
      </AutoColumn>

      <Reminder destConfig={destConfig} bridgeType='bridgeAssets' currency={selectCurrency} selectChain={selectChain}/>
      {
        config.isStopSystem ? (
          <BottomGrouping>
            <ButtonLight disabled>{t('stopSystem')}</ButtonLight>
          </BottomGrouping>
        ) : (
          <BottomGrouping>
            {!account ? (
                <ButtonLight onClick={toggleWalletModal}>{t('ConnectWallet')}</ButtonLight>
              ) : (
                <ButtonPrimary disabled={isCrossBridge || delayAction} onClick={() => {
                  setModalTipOpen(true)
                }}>
                  {btnTxt}
                </ButtonPrimary>
              )
            }
          </BottomGrouping>
        )
      }
    </>
  )
}