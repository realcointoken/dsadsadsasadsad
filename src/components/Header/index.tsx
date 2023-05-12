import React, { useMemo } from 'react'
import { Text } from 'rebass'
import styled from 'styled-components'
import assets from '../../assets'
import IconDay from '../../assets/icon/day.svg'
import IconNight from '../../assets/icon/night.svg'

import { useActiveWeb3React } from '../../hooks'
import { useBaseBalances } from '../../hooks/useBaseBalance'
import { useAccounts } from '../../hooks/useAccounts'
import { useDarkModeManager, useUserSelectChainId } from '../../state/user/hooks'
import { useAppState } from '../../state/application/hooks'
// import { useETHBalances } from '../../state/wallet/hooks'
import NavList from './NavList'
// import Row, { RowFixed } from '../Row'
import { RowFixed } from '../Row'
import Web3Status from '../Web3Status'
import SelectNetwork from './SelectNetwork'
import SelectSupportedNetwork from './SelectSupportedNetwork'
// import usePrevious from '../../hooks/usePrevious'
import config from '../../config'

const HeaderFrame = styled.div`
  display: flex;
  grid-template-columns: 1fr 120px;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 100%;
  top: 0;
  position: relative;
  padding: 0.875rem 1rem;
  z-index: 2;
  height: 70px;

  max-width: 1440px;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    grid-template-columns: 1fr;
    padding: 0 1rem;
    width: calc(100%);
    position: relative;
  `};
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    padding: 0.5rem 1rem;
  `}
`

const HeaderControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-self: flex-end;
  height: 100%;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    flex-direction: row;
    justify-content: space-between;
    justify-self: center;
    width: 100%;
    max-width: 960px;
    padding: 0rem;
    z-index: 99;
    border-radius: 12px 12px 0 0;
  `};
`

const HeaderElement = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  ${({ theme }) => theme.mediaWidth.upToMedium`
   flex-direction: row-reverse;
    align-items: center;
  `};
`
const HeaderRow = styled(RowFixed)`
  position: relative;
  height: 100%;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    height: 100%;
    width: 100%;
  `};
`

const AccountElement = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme, active }) => (!active ? theme.bg1 : theme.bg3)};
  border-radius: 12px;
  white-space: nowrap;
  width: 100%;
  cursor: pointer;

  :focus {
    border: 1px solid blue;
  }
  /* :hover {
    background-color: ${({ theme, active }) => (!active ? theme.bg2 : theme.bg4)};
  } */
`
const BalanceText = styled(Text)`
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: none;
  `};
`

const Title = styled.a`
  display: flex;
  align-items: center;
  pointer-events: auto;
  justify-self: flex-start;
  margin-right: 12px;
  height: 100%;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    justify-self: center;
    margin-right: 2px;
  `};
  :hover {
    cursor: pointer;
  }
`

const Icon = styled.div`
  ${({ theme }) => theme.flexSC};
  height: 100%;
  img {
    height: 42px;
  }
  ${({ theme }) => theme.mediaWidth.upToSmall`
    img {
      height:36px
    }
  `};
`

const NavListWrapper = styled.div`
  ${({ theme }) => theme.mediaWidth.upToMedium`
    display:none;
  `}
`

const StyleDarkToggle = styled.div`
  ${({ theme }) => theme.flexC};
  width: 36px;
  min-width: 36px;
  height: 36px;
  border-radius: 9px;
  margin-left: 15px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.lightPuroleBg};
  @media screen and (max-width: 960px) {
    margin-left: 5px;
  }
`

function ViewAccountInfo() {
  const { chainId } = useActiveWeb3React()
  const [selectNetworkInfo] = useUserSelectChainId()
  const useChainId = useMemo(() => {
    if (selectNetworkInfo?.chainId) {
      return selectNetworkInfo?.chainId
    }
    return chainId
  }, [selectNetworkInfo, chainId])

  const useAccount = useAccounts()
  const baseBalance = useBaseBalances(useAccount, useChainId)
  // console.log(baseBalance)
  if (selectNetworkInfo?.label === 'BTC') {
    return <></>
  }

  return (
    <AccountElement active={!!useAccount} style={{ pointerEvents: 'auto' }}>
      {useAccount && baseBalance ? (
        <BalanceText style={{ flexShrink: 0 }} pl="0.75rem" pr="0.5rem" fontWeight={500}>
          {baseBalance?.toSignificant(3)} {config.getCurChainInfo(useChainId).symbol}
        </BalanceText>
      ) : null}
      <Web3Status />
    </AccountElement>
  )
}

export default function Header() {
  const { logo } = useAppState()
  const [isDark, toggleDarkMode] = useDarkModeManager()

  return (
    <HeaderFrame>
      <HeaderRow>
        <Title href=".">
          <Icon>
            <img src={logo || assets.TEMP_LOGO} alt="logo" />
          </Icon>
        </Title>
        <NavListWrapper>
          <NavList />
        </NavListWrapper>
      </HeaderRow>

      <HeaderControls>
        <HeaderElement>
          <SelectNetwork />
          <SelectSupportedNetwork />
          <ViewAccountInfo />
          <StyleDarkToggle onClick={toggleDarkMode}>
            {isDark ? <img src={IconDay} alt="" /> : <img src={IconNight} alt="" />}
          </StyleDarkToggle>
        </HeaderElement>
      </HeaderControls>
    </HeaderFrame>
  )
}
