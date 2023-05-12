import { chainInfo } from '../chainConfig'
import {
  ENV_NODE_CONFIG
} from '../constant'

export function selectNetwork (chainID:any) {
  return new Promise(resolve => {
    const { ethereum } = window
    const ethereumFN:any = {
      request: '',
      ...ethereum
    }
    if (ethereumFN && ethereumFN.request) {
      // console.log(ethereumFN)
      // console.log(ethereumFN.chainId)

      const chainId = '0x' + Number(chainID).toString(16) // A 0x-prefixed hexadecimal string

      const addChainData = {
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId,
            chainName: chainInfo[chainID].networkName,
            nativeCurrency: {
              name: chainInfo[chainID].name,
              symbol: chainInfo[chainID].symbol, // 2-6 characters long
              decimals: 18,
            },
            rpcUrls: [chainInfo[chainID].nodeRpc],
            blockExplorerUrls: chainInfo[chainID].nodeRpcList ? chainInfo[chainID].nodeRpcList : [chainInfo[chainID].explorer],
            iconUrls: null // Currently ignored.
          }
        ],
      }

      const switchChainData = {
        method: 'wallet_switchEthereumChain',
        params: [{ chainId }]
      }

      const onSuccess = (res: any) => {
         // console.log(chainID)
         console.log(res)
         localStorage.setItem(ENV_NODE_CONFIG, chainInfo[chainID].label)
         console.log('>>> go 7')
         history.go(0)
         resolve({
           msg: 'Success'
         })
      }

      const onError = (err: any) => {
        console.log(err)
        resolve({
          msg: 'Error'
        })
      }

      ethereumFN.request(switchChainData)
      .then(onSuccess)
      .catch((switchError: any) => {
        if (switchError.code === 4902) {

          ethereumFN.request(addChainData)
          .then(onSuccess)
          .catch(onError)
        } else {
          onError(switchError)
        }
      })

    } else {
      resolve({
        msg: 'Error'
      })
    }
  })
}

export function addToken (address:string, symbol: string, decimals: number, logoUrl?:string) {
  return new Promise(resolve => {
    const { ethereum } = window
    const ethereumFN:any = {
      request: '',
      ...ethereum
    }
    if (ethereumFN && ethereumFN.request) {
      ethereumFN.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20', // 最初只支持ERC20，但最终支持更多
          options: {
            address: address, // 令牌所在的地址。
            symbol: symbol, // A ticker symbol or shorthand, up to 5 chars.
            decimals: decimals, // The number of decimals in the token
            image: logoUrl, // A string url of the token logo
          },
        },
      }).then((res: any) => {
        console.log(res)
        resolve({
          msg: 'Success'
        })
      }).catch((err: any) => {
        console.log(err)
        resolve({
          msg: 'Error'
        })
      })
    } else {
      resolve({
        msg: 'Error'
      })
    }
  })
}