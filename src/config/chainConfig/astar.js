import {formatSwapTokenList, getLocalRPC} from './methods'
import {tokenListUrl, VERSION, USE_VERSION} from '../constant'

export const ASTAR_MAIN_CHAINID = 592
export const ASTAR_MAINNET = getLocalRPC(ASTAR_MAIN_CHAINID, 'https://rpc.astar.bldnodes.org/')
export const ASTAR_MAIN_EXPLORER = 'https://rpc.astar.network:8545'

export const tokenList = []
export const testTokenList = []

const symbol = 'ASTR'

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
  [ASTAR_MAIN_CHAINID]: {
    tokenListUrl: tokenListUrl + ASTAR_MAIN_CHAINID,
    tokenList: formatSwapTokenList(symbol, tokenList),
    ...bridgeToken[USE_VERSION],
    swapRouterToken: '',
    swapInitToken: '',
    multicalToken: '0x639A647fbe20b6c8ac19E48E2de44ea792c62c5C',
    v1FactoryToken: '',
    v2FactoryToken: '',
    timelock: '',
    nodeRpc: ASTAR_MAINNET,
    nodeRpcList: [
      ASTAR_MAINNET,
      'https://rpc.astar.network:8545',
      'https://astar.subscan.io',
    ],
    chainID: ASTAR_MAIN_CHAINID,
    lookHash: ASTAR_MAIN_EXPLORER + '/extrinsic/',
    lookAddr: ASTAR_MAIN_EXPLORER + '/account/',
    lookBlock: ASTAR_MAIN_EXPLORER + '/block/',
    explorer: ASTAR_MAIN_EXPLORER,
    symbol: symbol,
    name: 'Astar Network',
    networkName: 'Astar mainnet',
    networkLogo: 'ASTR',
    type: 'main',
    label: ASTAR_MAIN_CHAINID,
    isSwitch: 1,
    suffix: 'ASTR',
    anyToken: ''
  },
}