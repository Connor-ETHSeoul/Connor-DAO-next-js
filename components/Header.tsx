'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ConnorDAOButton } from './MainButton';
import { ButtonType, ButtonSize } from '@/types/ButtonType';
import { NearWallet, MPC_CONTRACT } from '@/utils/near-wallet';
import { useMemo, useEffect } from 'react';
import { useSnapshot } from 'valtio';
import WalletStore from '@/store/walletStore';
import { CopyLogo } from './assets/CopyLogo';
import { chainFrom, chainIds } from '@/utils/ChainUtil';

export default function Header() {
  const router = useRouter();
  const { isSignedIn, accountId, ethAddress, selectedChainId } = useSnapshot(
    WalletStore.state,
  );
  const wallet = useMemo(
    () => new NearWallet({ createAccessKeyFor: MPC_CONTRACT }),
    [],
  );
  useEffect(() => {
    wallet.startUp();
  }, [wallet]);
  const handleCopyAddressButton = (ethAddress: string) => {
    navigator.clipboard.writeText(ethAddress);
    window.alert('Copied to clipboard');
  };
  function chainNameFrom(chainId: number): string {
    return chainFrom(chainId).name;
  }

  return (
    <div className="navbar border border-solid border-b-gray-200 px-[8%] py-[13px]">
      <div className="navbar-start">
        <Link href="/" passHref className="">
          <div className="flex text-[24px] font-bold leading-[140%] text-[#000]">
            CONNOR DAO
          </div>
        </Link>
      </div>
      <div className="navbar-center">
        {isSignedIn ? (
          <div className="flex flex-col items-center justify-center gap-[2px]">
            <div className="text-[18px] text-blue-300">{accountId}</div>
            <div className="flex gap-3 text-[18px]">
              ETH: {ethAddress}{' '}
              <CopyLogo
                onClickEvent={() => handleCopyAddressButton(ethAddress!)}
                className={''}
              ></CopyLogo>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <div className="navbar-end flex gap-[16px]">
        <ConnorDAOButton
          buttonText={'+ New'}
          onClickEvent={function (): void {
            router.push('/newPolicy');
          }}
          buttonType={ButtonType.Secondary}
          buttonSize={ButtonSize.Small}
          isDisabled={false}
        />
        {!isSignedIn && (
          <ConnorDAOButton
            className=""
            buttonText={'Login'}
            onClickEvent={function (): void {
              wallet.signIn();
            }}
            buttonType={ButtonType.Primary}
            buttonSize={ButtonSize.Small}
            isDisabled={false}
          />
        )}
        {isSignedIn && (
          <ConnorDAOButton
            className=""
            buttonText={'Logout'}
            onClickEvent={function (): void {
              wallet.signOut();
            }}
            buttonType={ButtonType.Primary}
            buttonSize={ButtonSize.Small}
            isDisabled={false}
          />
        )}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost rounded-btn">
            {chainNameFrom(selectedChainId)}
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content bg-base-100 rounded-box z-[1] mt-4 w-52 p-2 shadow"
          >
            {chainIds.map((chainId) => (
              <li key={chainId}>
                <a
                  onClick={() => {
                    WalletStore.setSelectedChainId(chainId);
                  }}
                >
                  {chainNameFrom(chainId)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
