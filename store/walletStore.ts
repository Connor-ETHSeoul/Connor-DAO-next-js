import { proxyWithLocalStorage } from '@/utils/StoreUtil';

/**
 * Types
 */
export interface WalletState {
  isSignedIn: boolean;
  accountId?: string;
  ethAddress?: string;
  selectedChainId: number;
}

/**
 * State
 */
const state = proxyWithLocalStorage<WalletState>('WalletState', {
  isSignedIn: false,
  selectedChainId: 11155111,
});

/**
 * Store / Actions
 */
const WalletStore = {
  state,
  setSignedIn(isSignedIn: boolean) {
    state.isSignedIn = isSignedIn;
  },
  setAccountId(accountId: string) {
    state.accountId = accountId;
  },
  setEthAddress(ethAddress: string) {
    state.ethAddress = ethAddress;
  },
  setSelectedChainId(selectedChainId: number) {
    state.selectedChainId = selectedChainId;
  },
  reset() {
    state.isSignedIn = false;
    state.accountId = undefined;
    state.ethAddress = undefined;
    state.selectedChainId = 11155111;
  },
};

export default WalletStore;
