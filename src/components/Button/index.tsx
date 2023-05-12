import React from 'react'
import styled from 'styled-components'
import { darken, lighten } from 'polished'
import { useTranslation } from 'react-i18next'
import { RowBetween } from '../Row'
import { ChevronDown } from 'react-feather'
import { Button as RebassButton, ButtonProps } from 'rebass/styled-components'

const Base = styled(RebassButton)<{
  padding?: string
  width?: string
  height?: string
  maxWidth?: string
  borderRadius?: string
  altDisabledStyle?: boolean
}>`
  padding: ${({ padding }) => (padding ? padding : '1rem')};
  width: ${({ width }) => (width ? width : '100%')};
  height: ${({ height }) => (height ? height : '54px')};

  font-weight: 500;
  text-align: center;
  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : '12px')};
  outline: none;
  border: 1px solid transparent;
  color: white;
  text-decoration: none;
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  align-items: center;
  cursor: pointer;
  position: relative;
  z-index: 1;

  &:disabled {
    cursor: not-allowed;
  }

  > * {
    user-select: none;
  }
`

export const CleanButton = styled(Base)`
  max-width: none;
  background-color: transparent;
  color: inherit;
`

export const ButtonPrimary = styled(Base)<{ fullWidth?: boolean; margin?: string }>`
  background: ${({ theme }) => theme.primary1};
  color: white;
  width: ${({ fullWidth }) => (fullWidth ? 'width: 100%' : 'auto')};
  margin: ${({ margin }) => (margin ? margin : '')};
  &:focus {
    opacity: 0.91;
  }
  &:hover {
    opacity: 0.92;
  }
  &:active {
    opacity: 0.93;
  }
  &:disabled {
    background-color: ${({ theme, altDisabledStyle }) => (altDisabledStyle ? theme.primary1 : theme.bg3)};
    color: ${({ theme, altDisabledStyle }) => (altDisabledStyle ? 'white' : theme.text3)};
    box-shadow: none;
    border: 1px solid transparent;
    outline: none;
    opacity: ${({ altDisabledStyle }) => (altDisabledStyle ? '0.5' : '0.5')};
  }
`

export const ButtonLight = styled(Base)`
  background-color: ${({ theme }) => theme.primary5};
  color: ${({ theme }) => theme.primaryText1};
  font-size: 16px;
  font-weight: 500;
  &:focus {
    opacity: 0.91;
  }
  &:hover {
    opacity: 0.92;
  }
  &:active {
    opacity: 0.93;
  }
  :disabled {
    opacity: 0.4;
    :hover {
      cursor: auto;
      background-color: ${({ theme }) => theme.primary5};
      box-shadow: none;
      border: 1px solid transparent;
      outline: none;
    }
  }
`

export const ButtonSecondary = styled(Base)`
  border: 1px solid ${({ theme }) => theme.primary4};
  color: ${({ theme }) => theme.primary4};
  background-color: transparent;
  font-size: 16px;
  border-radius: 12px;
  padding: ${({ padding }) => (padding ? padding : '10px')};

  &:focus {
    opacity: 0.91;
  }
  &:hover {
    opacity: 0.92;
  }
  &:active {
    opacity: 0.93;
  }
  &:disabled {
    opacity: 50%;
    cursor: auto;
  }
  a:hover {
    text-decoration: none;
  }
`

export const ButtonOutlined = styled(Base)`
  border: 1px solid ${({ theme }) => theme.text4};
  background-color: transparent;
  color: ${({ theme }) => theme.text1};

  &:focus {
    opacity: 0.91;
  }
  &:hover {
    opacity: 0.92;
  }
  &:active {
    opacity: 0.93;
  }
  &:disabled {
    opacity: 50%;
    cursor: auto;
  }
`

export const ButtonWhite = styled(Base)`
  border: 1px solid #edeef2;
  background-color: ${({ theme }) => theme.bg1};
  color: black;

  &:focus {
    opacity: 0.91;
  }
  &:hover {
    opacity: 0.92;
  }
  &:active {
    opacity: 0.93;
  }
  &:disabled {
    opacity: 50%;
    cursor: auto;
  }
`

const ButtonConfirmedStyle = styled(Base)`
  background-color: ${({ theme }) => lighten(0.5, theme.green1)};
  color: ${({ theme }) => theme.green1};
  border: 1px solid ${({ theme }) => theme.green1};

  &:disabled {
    opacity: 50%;
    cursor: auto;
  }
`

const ButtonErrorStyle = styled(Base)`
  background-color: ${({ theme }) => theme.red1};
  border: 1px solid ${({ theme }) => theme.red1};

  &:focus {
    box-shadow: 0 0 0 1pt ${({ theme }) => darken(0.05, theme.red1)};
    background-color: ${({ theme }) => darken(0.05, theme.red1)};
  }
  &:hover {
    background-color: ${({ theme }) => darken(0.05, theme.red1)};
  }
  &:active {
    box-shadow: 0 0 0 1pt ${({ theme }) => darken(0.1, theme.red1)};
    background-color: ${({ theme }) => darken(0.1, theme.red1)};
  }
  &:disabled {
    opacity: 50%;
    cursor: auto;
    box-shadow: none;
    background-color: ${({ theme }) => theme.red1};
    border: 1px solid ${({ theme }) => theme.red1};
  }
`

export function ButtonConfirmed({
  confirmed,
  altDisabledStyle,
  ...rest
}: { confirmed?: boolean; altDisabledStyle?: boolean } & ButtonProps) {
  if (confirmed) {
    return <ButtonConfirmedStyle {...rest} />
  } else {
    return <ButtonPrimary {...rest} altDisabledStyle={altDisabledStyle} />
  }
}

const ButtonAddStyle = styled(CleanButton)<{ disabled?: boolean }>`
  cursor: pointer;
  height: 2rem;
  width: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.primary2};
  color: ${({ theme }) => theme.white1};
  ${({ disabled }) => (disabled ? `pointer-events: none; opacity: .6;` : '')}
`

export function ButtonAdd({ onClick, disabled }: { onClick: () => void; disabled?: boolean }) {
  const { t } = useTranslation()

  return (
    <ButtonAddStyle onClick={onClick} disabled={disabled} title={t('add')}>
      {t('add')}
    </ButtonAddStyle>
  )
}

export function ButtonError({ error, ...rest }: { error?: boolean } & ButtonProps) {
  if (error) {
    return <ButtonErrorStyle {...rest} />
  } else {
    return <ButtonPrimary {...rest} />
  }
}

export function ButtonDropdown({ disabled = false, children, ...rest }: { disabled?: boolean } & ButtonProps) {
  return (
    <ButtonPrimary {...rest} disabled={disabled}>
      <RowBetween>
        <div style={{ display: 'flex', alignItems: 'center' }}>{children}</div>
        <ChevronDown size={24} />
      </RowBetween>
    </ButtonPrimary>
  )
}

export function ButtonRadio({ active, ...rest }: { active?: boolean } & ButtonProps) {
  if (!active) {
    return <ButtonWhite {...rest} />
  } else {
    return <ButtonPrimary {...rest} />
  }
}
