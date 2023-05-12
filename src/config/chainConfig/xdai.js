import {formatSwapTokenList, getLocalRPC} from './methods'
import {tokenListUrl, VERSION, USE_VERSION} from '../constant'

export const XDAI_MAIN_CHAINID = 100
export const XDAI_MAINNET = getLocalRPC(XDAI_MAIN_CHAINID, 'https://rpc.gnosischain.com')
export const XDAI_MAIN_EXPLORER = 'https://blockscout.com/xdai/mainnet'

export const XDAI_TEST_CHAINID = 77
export const XDAI_TESTNET = getLocalRPC(XDAI_TEST_CHAINID, 'https://sokol.poa.network')
export const XDAI_TEST_EXPLORER = 'https://blockscout.com/poa/sokol'

export const tokenList = []
export const testTokenList = []

const symbol = 'GNO'

const bridgeToken = {
  [VERSION.V1]: {
    bridgeInitToken: '',
    bridgeInitChain: '',
  },
  [VERSION.V5]: {
    bridgeInitToken: '',
    bridgeInitChain: '56',
    nativeToken: '',
    crossBridgeInitToken: '0xb44a9b6905af7c801311e8f4e76932ee959c663c'
  },
  [VERSION.V7]: {
    bridgeInitToken: '',
    bridgeInitChain: '56',
    nativeToken: '',
    crossBridgeInitToken: '0xb44a9b6905af7c801311e8f4e76932ee959c663c'
  },
}

export default {
  [XDAI_MAIN_CHAINID]: {
    wrappedToken: '0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d',
    tokenListUrl: tokenListUrl + XDAI_MAIN_CHAINID,
    tokenList: formatSwapTokenList(symbol, tokenList),
    ...bridgeToken[USE_VERSION],
    swapRouterToken: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
    swapInitToken: '',
    // multicalToken: '0xb5b692a88BDFc81ca69dcB1d924f59f0413A602a',
    multicalToken: '0x67dA5f2FfaDDfF067AB9d5F025F8810634d84287',
    v1FactoryToken: '',
    v2FactoryToken: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
    timelock: '0x9a8541Ddf3a932a9A922B607e9CF7301f1d47bD1',
    nodeRpc: XDAI_MAINNET,
    nodeRpcList: [
      XDAI_MAINNET,
    ],
    chainID: XDAI_MAIN_CHAINID,
    lookHash: XDAI_MAIN_EXPLORER + '/tx/',
    lookAddr: XDAI_MAIN_EXPLORER + '/address/',
    lookBlock: XDAI_MAIN_EXPLORER + '/block/',
    explorer: XDAI_MAIN_EXPLORER,
    symbol: symbol,
    name: 'Gnosis',
    networkName: 'Gnosis mainnet',
    type: 'main',
    label: XDAI_MAIN_CHAINID,
    isSwitch: 1,
    suffix: 'Gnosis',
    anyToken: '0xb44a9b6905af7c801311e8f4e76932ee959c663c'
  },
  [77]: {
    wrappedToken: "0x79D5C019F2515Cbc0596170Da44FCd26412c4f83",
    tokenListUrl: tokenListUrl + 77,
    tokenList: formatSwapTokenList(symbol, tokenList),
    ...bridgeToken[USE_VERSION],
    swapRouterToken: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
    swapInitToken: '',
    // multicalToken: '0xb5b692a88BDFc81ca69dcB1d924f59f0413A602a',
    multicalToken: '0x2D0Cf59485baa2A105541b9bf850E06C071AFab8',
    v1FactoryToken: '',
    v2FactoryToken: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
    timelock: '0x9a8541Ddf3a932a9A922B607e9CF7301f1d47bD1',
    nodeRpc: 'https://sokol.poa.network',
    nodeRpcList: [
      'https://sokol.poa.network',
    ],
    chainID: 77,
    lookHash: XDAI_TEST_EXPLORER + '/tx/',
    lookAddr: XDAI_TEST_EXPLORER + '/address/',
    lookBlock: XDAI_TEST_EXPLORER + '/block/',
    explorer: XDAI_TEST_EXPLORER,
    symbol: symbol,
    name: 'Gnosis',
    networkName: 'Gnosis testnet',
    type: 'main',
    label: 77,
    isSwitch: 1,
    suffix: 'Gnosis',
    anyToken: '0xb44a9b6905af7c801311e8f4e76932ee959c663c'
  },
}