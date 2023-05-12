import { MATIC_MAIN_CHAINID } from './chainConfig/matic'
import { FTM_MAIN_CHAINID } from './chainConfig/ftm'
import { BNB_MAIN_CHAINID } from './chainConfig/bsc'

interface FarmConfig {
  [key: string]: any
}

const BSC_ANY_TOKEN = '0xf68c9df95a18b2a5a5fa1124d79eeeffbad0b6fa'
const BSC_ANY = {
  [BSC_ANY_TOKEN]: {
    list: {
      symbol: "ANY",
      name: "Anyswap",
      decimals: 18
    }
  }
}

const config: FarmConfig = {
  'MATIC': {
    chainId: MATIC_MAIN_CHAINID,
    farmToken: '0xB0A3dA261BAD3Df3f3cc3a4A337e7e81f6407c49',
    lpToken: '0x9610b01aaa57ec026001f7ec5cface51bfea0ba6',
    blockNumber: 41143,
    lpTokenIno: {
      '0x9610b01aaa57ec026001f7ec5cface51bfea0ba6': {
        list: {
          symbol: "USDC",
          name: "USDCoin",
          decimals: 6
        }
      }
    },
    url: 'farm/matic',
    logoUrl: 'https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png',
    key: 'ANY',
    farmtype: 'noany'
  },
  'FTM': {
    chainId: FTM_MAIN_CHAINID,
    farmToken: '0xdccd7b567da13a11cde232522be708b2d1a14498',
    lpToken: '0x95bf7e307bc1ab0ba38ae10fc27084bc36fcd605',
    blockNumber: 86393,
    lpTokenIno: {
      '0x95bf7e307bc1ab0ba38ae10fc27084bc36fcd605': {
        list: {
          symbol: "USDC",
          name: "USDCoin",
          decimals: 6
        }
      }
    },
    url: 'farm/ftm',
    logoUrl: 'https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png',
    key: 'ANY',
    farmtype: 'noany'
  },
  'BSC': {
    chainId: BNB_MAIN_CHAINID,
    farmToken: '0x411f3e09c66b30e7facfec45cd823b2e19dfad2d',
    lpToken: BSC_ANY_TOKEN,
    blockNumber: 28800,
    lpTokenIno: BSC_ANY,
    url: 'farm/bsc',
    logoUrl: 'https://assets.coingecko.com/coins/images/10970/small/DEAPcoin_01.png',
    key: 'DEP',
    farmtype: 'any'
  },
  'BSC_HERO': {
    chainId: BNB_MAIN_CHAINID,
    farmToken: '0x5e430f88d1be82eb3ef92b6ff06125168fd5dcf2',
    lpToken: BSC_ANY_TOKEN,
    blockNumber: 28800,
    lpTokenIno: BSC_ANY,
    url: 'farm/bsc/hero',
    logoUrl: 'https://assets.coingecko.com/coins/images/16245/small/HERO-200.png',
    key: 'HERO',
    farmtype: 'any'
  },
  'BSC_TRO': {
    chainId: BNB_MAIN_CHAINID,
    farmToken: '0xf47a640ff9745b5591edd446cb02ed6d096c99bd',
    lpToken: BSC_ANY_TOKEN,
    blockNumber: 28800,
    lpTokenIno: BSC_ANY,
    url: 'farm/bsc/hero',
    logoUrl: require('../assets/coin/source/TRO.png'),
    key: 'HERO',
    farmtype: 'any'
  },
  'BSC_PLAY': {
    chainId: BNB_MAIN_CHAINID,
    farmToken: '0xdb12c7e30dc2a2c421724d07c7a09147bd9f61bb',
    lpToken: BSC_ANY_TOKEN,
    blockNumber: 28800,
    lpTokenIno: BSC_ANY,
    url: 'farm/bsc/polyplay',
    logoUrl: 'https://assets.coingecko.com/coins/images/17314/small/09ee5fe7-7f9c-4e77-8872-d9053ac2a936.png',
    key: 'PLAY',
    farmtype: 'any'
  },
  'BSC_BACON': {
    chainId: BNB_MAIN_CHAINID,
    farmToken: '0xfd14d755a3a3358aec08d0979ecf369b4a387039',
    lpToken: BSC_ANY_TOKEN,
    blockNumber: 28800,
    lpTokenIno: BSC_ANY,
    url: 'farm/bsc/bacon',
    logoUrl: 'https://assets.coingecko.com/coins/images/18059/small/xDV_bhdA_400x400.jpg',
    key: 'BACON',
    farmtype: 'any'
  },
  'BSC_KABY': {
    chainId: BNB_MAIN_CHAINID,
    farmToken: '0x5157629E486b36f5862d163C119c4E86506cA15e',
    lpToken: BSC_ANY_TOKEN,
    blockNumber: 28800,
    lpTokenIno: BSC_ANY,
    url: 'farm/bsc/kaby',
    logoUrl: 'https://assets.coingecko.com/coins/images/18090/small/URPKhnop_400x400.jpg',
    key: 'KABY',
    farmtype: 'any'
  },
  'BSC_PTLKX': {
    chainId: BNB_MAIN_CHAINID,
    farmToken: '0x8C77057C3343B7DCC97CA21dA274730396162a98',
    lpToken: BSC_ANY_TOKEN,
    blockNumber: 28800,
    lpTokenIno: BSC_ANY,
    url: 'farm/bsc/ptlkx',
    logoUrl: 'https://i.imgur.com/3TBo92F.png',
    key: 'PTLKX',
    farmtype: 'any',
    price: 0.00588118
  },
  'ETH_TEST': {
    chainId: '4',
    farmToken: '0x0bd19f6447cd676255C7C7B00428462B3dA67e3a',
    lpToken: '0x7f30b414a814a6326d38535ca8eb7b9a62bceae2',
    blockNumber: 28800,
    lpTokenIno: {
      '0x7f30b414a814a6326d38535ca8eb7b9a62bceae2': {
        list: {
          symbol: "ANY",
          name: "Anyswap",
          decimals: 18
        }
      }
    },
    url: '/farm/eth/test',
    logoUrl: 'https://assets.coingecko.com/coins/images/18090/small/URPKhnop_400x400.jpg',
    key: 'ANY',
    farmtype: 'noany'
  },
}
export default config