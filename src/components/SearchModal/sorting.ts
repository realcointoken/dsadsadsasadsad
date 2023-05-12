import { Token, TokenAmount } from 'anyswap-sdk'
import { useMemo } from 'react'
// import { useAllTokenBalances } from '../../state/wallet/hooks'
import { useBridgeAllTokenBalances } from '../../state/wallet/hooks'

// compare two token amounts with highest one coming first
function balanceComparator(balanceA?: TokenAmount, balanceB?: TokenAmount, sortA?:any, sortB?:any) {
  if (sortA > sortB) {
    return 1
  } else {
    if (balanceA && balanceB) {
      return balanceA.greaterThan(balanceB) ? -1 : balanceA.equalTo(balanceB) ? 0 : 1
    } else if (balanceA && balanceA.greaterThan('0')) {
      return -1
    } else if (balanceB && balanceB.greaterThan('0')) {
      return 1
    }
    return 0
  }
}

function getTokenComparator(balances: {
  [tokenAddress: string]: TokenAmount | undefined
}): (tokenA: Token, tokenB: Token) => number {
  return function sortTokens(tokenA: any, tokenB: any): number {
    // -1 = a is first
    // 1 = b is first

    // sort by balances
    const balanceA = balances[tokenA.address]
    const balanceB = balances[tokenB.address]

    const balanceComp = balanceComparator(balanceA, balanceB, tokenA.sort, tokenB.sort)
    if (balanceComp !== 0) return balanceComp

    if (tokenA.symbol && tokenB.symbol) {
      // console.log(tokenA)
      // sort by symbol
      if (tokenA.sort > tokenB.sort) {
        return 1
      } else {
        return tokenA.symbol.toLowerCase() < tokenB.symbol.toLowerCase() ? -1 : 1
      }
    } else {
      return tokenA.symbol ? -1 : tokenB.symbol ? -1 : 0
    }
  }
}

// export function useTokenComparator(key?: string | undefined, chainId?:any, inverted?: boolean): (tokenA: Token, tokenB: Token) => number {
export function useTokenComparator(key?: string | undefined, chainId?:any, inverted?: boolean): any {
  const balances = useBridgeAllTokenBalances(key, chainId)
  // console.log(balances)
  const comparator = useMemo(() => getTokenComparator(balances ?? {}), [balances])
  const tokenComparator = useMemo(() => {
    if (inverted) {
      return (tokenA: Token, tokenB: Token) => comparator(tokenA, tokenB) * -1
    } else {
      return comparator
    }
  }, [inverted, comparator])
  return {
    tokenComparator,
    balances
  }
  // return useMemo(() => {
  //   if (inverted) {
  //     return (tokenA: Token, tokenB: Token) => comparator(tokenA, tokenB) * -1
  //   } else {
  //     return comparator
  //   }
  // }, [inverted, comparator])
}
