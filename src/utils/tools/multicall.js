import config from '../../config'
import multicallABI from '../../constants/multicall/abi.json'
const TIMEOUT = 'timeout'

const Web3 = require('web3')

function getWeb3 (rpc) {
  rpc = rpc ? rpc : ''
  const wFn = new Web3(new Web3.providers.HttpProvider(rpc))
  // wFn.extend({
  //   property: 'swap',
  //   methods: [...web3Extend]
  // })
  return wFn
}


function getContract ({rpc, abi}) {
  const web3 = getWeb3(rpc)
  // abi = abi ? abi : ERC20_ABI
  return new web3.eth.Contract(abi)
}

function timeoutWeb3 () {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(TIMEOUT)
    }, [1000 * 50])
  })
}

function getMulticallData (chainId, rpc, list) {
  return new Promise((resolve, reject) => {
    const contract = getContract({abi: multicallABI, rpc: rpc})
    contract.options.address = config.getCurChainInfo(chainId).multicalToken
    const arr = []
    for (const obj of list) {
      arr.push({
        target: obj.to,
        callData: obj.data
      })
    }
    contract.methods.aggregate(arr).call((err, res) => {
      if (err) {
        reject(err)
      } else {
        resolve(res.returnData)
      }
    })
  })
}

function getMulticallResult (chainId, rpc, list) {
  return new Promise((resolve, reject) => {
    Promise.race([
      timeoutWeb3(),
      getMulticallData(chainId, rpc, list)
    ]).then(res => {
      if (res === TIMEOUT) {
        reject(res)
      } else {
        resolve(res)
      }
    }).catch(error => {
      reject(error)
    })
  })
}

const useNode = {}

async function useMulticall (chainId, list) {
  const rpcArr = config.getCurChainInfo(chainId)?.nodeRpcList
  if (!rpcArr) return ''
  const len = rpcArr.length - 1
  if (!useNode[chainId]) {
    useNode[chainId] = {
      rpc: rpcArr[0],
      index: 0
    }
  }
  let index = useNode[chainId].index
  const rpc = rpcArr[useNode[chainId].index]
  let results = ''
  try {
    results = await getMulticallResult(chainId, rpc, list)
  } catch (error) {
    console.error('useMulticall error: ' + rpc)
    console.error(error.toString())
    if (
      error.toString().indexOf('Invalid JSON RPC response') !== -1
      || error.toString().indexOf('Error: Returned error') !== -1
      || error === TIMEOUT
    ) {
      if (index < len) {
        index ++
        useNode[chainId] = {
          rpc: rpcArr[index],
          index: index
        }
        results = await useMulticall(chainId, list)
      } else {
        useNode[chainId] = {
          rpc: rpcArr[0],
          index: 0
        }
      }
    } else {
      results = error
    }
  }
  return results
}

// const rList = [
//   {
//     data: '0x06fdde03',
//     methods: 'name',
//     to: '0x818ec0a7fe18ff94269904fced6ae3dae6d6dc0b'
//   },
//   {
//     data: '0x313ce567',
//     methods: 'decimals',
//     to: '0x818ec0a7fe18ff94269904fced6ae3dae6d6dc0b'
//   },
//   {
//     data: '0x95d89b41',
//     methods: 'symbol',
//     to: '0x818ec0a7fe18ff94269904fced6ae3dae6d6dc0b'
//   }
// ]
// useMulticall('288', rList).then(res => {
//   console.log(res)
//   for (let i = 0, len = rList.length; i < len; i++) {
//     console.log(rList[i].methods)
//     console.log(ERC20_INTERFACE.decodeFunctionResult(rList[i].methods, res[i])[0])
//   }
// })
// init()
// module.exports = {
//   useMulticall
// }
export {
  useMulticall
}