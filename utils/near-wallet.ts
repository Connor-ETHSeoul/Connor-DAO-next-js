// wallet selector
import '@near-wallet-selector/modal-ui/styles.css';
import { setupModal } from '@near-wallet-selector/modal-ui';
import { setupWalletSelector, Wallet } from '@near-wallet-selector/core';
import { setupMyNearWallet } from '@near-wallet-selector/my-near-wallet';
import WalletStore from '@/store/walletStore';
import { NearViemAccountFactory } from 'near-viem';
import { Account, KeyPair, connect, keyStores } from 'near-api-js';

export const MPC_CONTRACT = 'multichain-testnet-2.testnet';

// Wallet that simplifies using the wallet selector
export class NearWallet {
  selector;
  wallet?: Wallet;
  createAccessKeyFor;

  constructor({ createAccessKeyFor = MPC_CONTRACT }) {
    // Login to a wallet passing a contractId will create a local
    // key, so the user skips signing non-payable transactions.
    // Omitting the accountId will result in the user being
    // asked to sign all transactions.
    this.createAccessKeyFor = createAccessKeyFor;
    this.selector = setupWalletSelector({
      network: 'testnet',
      modules: [setupMyNearWallet()],
    });
  }

  // To be called when the website loads
  async startUp() {
    const walletSelector = await this.selector;
    const isSignedIn = walletSelector.isSignedIn();

    if (isSignedIn) {
      this.wallet = await walletSelector.wallet();
      const accounts = await this.wallet.getAccounts();
      const accountId = accounts[0].accountId;
      WalletStore.setAccountId(accountId);
    }

    WalletStore.setSignedIn(isSignedIn);

    return isSignedIn;
  }

  // Sign-in method
  async signIn() {
    const description = 'Please select a wallet to sign in.';
    const modal = setupModal(await this.selector, {
      contractId: this.createAccessKeyFor,
      description,
    });
    modal.show();
  }

  // Sign-out method
  async signOut() {
    await this.wallet?.signOut();
    this.wallet = undefined;
    WalletStore.reset();
    window.location.replace(window.location.origin + window.location.pathname);
  }

  async nearViemAccount(accountId: string) {
    const walletSelector = await this.selector;
    const isSignedIn = walletSelector.isSignedIn();

    if (!isSignedIn) {
      throw new Error('Please sign in');
    }
    const keyStore = new keyStores.BrowserLocalStorageKeyStore();
    const near = await connect({
      keyStore,
      networkId: 'testnet',
      nodeUrl: 'https://rpc.testnet.near.org',
    });
    const account = await near.account(accountId);
    const viemAccount = await NearViemAccountFactory(account);
    return viemAccount;
  }
}
