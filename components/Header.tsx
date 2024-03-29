'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ConnorDAOButton } from './MainButton';
import { ButtonType, ButtonSize } from '@/types/ButtonType';

export default function Header() {
  const router = useRouter();
  return (
    <div className="navbar sticky top-0 flex h-[70px] w-full items-center justify-center gap-[800px] border border-solid border-b-gray-200 px-[8%] py-[13px] lg:static">
      <div className="navbar-start w-auto items-stretch lg:w-1/2">
        <Link href="/" passHref className="">
          <div className="flex text-[24px] font-bold leading-[140%] text-[#000]">
            CONNOR DAO
          </div>
        </Link>
      </div>
      <div className="navbar-end flex min-w-[240px] items-center gap-[16px]">
        <ConnorDAOButton
          buttonText={'+ New Policy'}
          onClickEvent={function (): void {
            router.push('/newPolicy');
          }}
          buttonType={ButtonType.Secondary}
          buttonSize={ButtonSize.Small}
          isDisabled={false}
        />
        <ConnorDAOButton
          className=""
          buttonText={'Login'}
          onClickEvent={function (): void {
            console.log('Hello World');
          }}
          buttonType={ButtonType.Primary}
          buttonSize={ButtonSize.Small}
          isDisabled={false}
        />
      </div>
    </div>
  );
}
