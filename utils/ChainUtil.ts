import { Address, Chain, defineChain } from 'viem';
import { astarZkyoto, auroraTestnet, neonDevnet, sepolia } from 'viem/chains';

export const chainIds = [11155111, 6038361, 1313161555, 245022926, 2424];

export function chainFrom(chainId: number): Chain {
  switch (chainId) {
    case 11155111:
      return sepolia;
    case 6038361:
      return astarZkyoto;
    case 1313161555:
      return auroraTestnet;
    case 245022926:
      return neonDevnet;
    case 2424:
      return defineChain({
        id: 2424,
        network: 'inevm-testnet',
        name: 'inEVM testnet',
        nativeCurrency: {
          name: 'Injective',
          symbol: 'INJ',
          decimals: 18,
        },
        rpcUrls: {
          default: {
            http: ['https://testnet.rpc.inevm.com/http'],
          },
          public: {
            http: ['https://testnet.rpc.inevm.com/http'],
          },
        },
        blockExplorers: {
          default: {
            name: 'inevm-testnet.explorer',
            url: 'https://inevm-testnet.explorer.caldera.xyz/',
          },
        },
        testnet: true,
      });
    default:
      return sepolia;
  }
}

export function voteContractAddressFrom(chainId: number): Address {
  switch (chainId) {
    case 11155111:
      return '0xF21ac1285FD503420608aC147bB94c16433CBC32';
    case 6038361:
      return '0x77ee0829f5a99853aefe092539C3e44DbdBf4A9B';
    case 1313161555:
      return '0xF08b81741f32A35b75C0Bd92949146A0D69a430A';
    case 245022926:
      return '0x104Cf628d2B73E6DBE1148bF637CACA16f8fc7F9';
    case 2424:
      return '0x104Cf628d2B73E6DBE1148bF637CACA16f8fc7F9';
    default:
      return '0xF21ac1285FD503420608aC147bB94c16433CBC32';
  }
}