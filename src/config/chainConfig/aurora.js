import {formatSwapTokenList, getLocalRPC} from './methods'
import {tokenListUrl, VERSION, USE_VERSION} from '../constant'

export const AURORA_MAIN_CHAINID = 1313161554
export const AURORA_MAINNET = getLocalRPC(AURORA_MAIN_CHAINID, 'https://mainnet.aurora.dev')
export const AURORA_MAIN_EXPLORER = 'https://aurorascan.dev/'

export const tokenList = []
export const testTokenList = []

const symbol = 'ETH'

const bridgeToken = {
  [VERSION.V1]: {
    bridgeInitToken: '',
    bridgeInitChain: '',
  },
  [VERSION.V5]: {
    bridgeInitToken: '',
    bridgeInitChain: '',
    nativeToken: '',
    crossBridgeInitToken: ''
  },
  [VERSION.V7]: {
    bridgeInitToken: '',
    bridgeInitChain: '',
    nativeToken: '',
    crossBridgeInitToken: ''
  },
}

export default {
  [AURORA_MAIN_CHAINID]: {
    wrappedToken: '0xC9BdeEd33CD01541e1eeD10f90519d2C06Fe3feB',
    tokenListUrl: tokenListUrl + AURORA_MAIN_CHAINID,
    tokenList: formatSwapTokenList(symbol, tokenList),
    ...bridgeToken[USE_VERSION],
    swapRouterToken: '',
    swapInitToken: '',
    multicalToken: '0xE3F5a90F9cb311505cd691a46596599aA1A0AD7D',
    v1FactoryToken: '',
    v2FactoryToken: '',
    timelock: '',
    nodeRpc: AURORA_MAINNET,
    nodeRpcList: [
      AURORA_MAINNET,
    ],
    chainID: AURORA_MAIN_CHAINID,
    lookHash: AURORA_MAIN_EXPLORER + '/tx/',
    lookAddr: AURORA_MAIN_EXPLORER + '/address/',
    lookBlock: AURORA_MAIN_EXPLORER + '/block/',
    explorer: AURORA_MAIN_EXPLORER,
    symbol: symbol,
    name: 'Aurora',
    networkName: 'Aurora mainnet',
    networkLogo: 'AURORA',
    type: 'main',
    label: AURORA_MAIN_CHAINID,
    isSwitch: 1,
    suffix: 'AURORA',
    anyToken: ''
  },
}