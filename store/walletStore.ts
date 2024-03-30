import { proxyWithLocalStorage } from '@/utils/StoreUtil';

/**
 * Types
 */
export interface WalletState {
  isSignedIn: boolean;
  accountId?: string;
  ethAddress?: string;
}

/**
 * State
 */
const state = proxyWithLocalStorage<WalletState>('WalletState', {
  isSignedIn: false,
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
  reset() {
    state.isSignedIn = false;
    state.accountId = undefined;
    state.ethAddress = undefined;
  },
};

export default WalletStore;
