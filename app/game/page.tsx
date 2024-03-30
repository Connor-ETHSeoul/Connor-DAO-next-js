'use client';

import { Profiile } from './components/Profile';

import humanFace from '@/public/humanFace.svg';
import oldManFcae from '@/public/oldManFace.svg';
import zombieFace from '@/public/zombieFace.svg';
import devilFace from '@/public/devilFace.svg';

import oldmanEnemy from '@/public/oldMan.svg';
import zombieEnemy from '@/public/zombie.svg';
import devilEnemy from '@/public/devil.svg';

import stabbingButton from '@/public/btn_attack1.svg';
import swingButton from '@/public/btn_attack2.svg';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import HumanConditionalRender from './components/HumanConditionalRender';

import {
  createWalletClient,
  http,
  getContract,
  createPublicClient,
  LocalAccount,
} from 'viem';
import { MPC_CONTRACT, NearWallet } from '@/utils/near-wallet';
import { useSnapshot } from 'valtio';
import WalletStore from '@/store/walletStore';
import abi from '../contractJson/Game.json';
import 'viem/window';
import { sepolia } from 'viem/chains';
import { useIsMounted } from '@/hooks/useIsMounted';

export default function GamePage() {
  const wallet = useMemo(
    () => new NearWallet({ createAccessKeyFor: MPC_CONTRACT }),
    [],
  );
  const { isSignedIn, accountId } = useSnapshot(WalletStore.state);

  const SEPOLIA_RPC_URL =
    'https://endpoints.omniatech.io/v1/eth/sepolia/public';
  const gameAddress = '0x589685A025C0DE5f21904314d235ad093b3bFEc3';
  const contractABI = abi.abi;

  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(SEPOLIA_RPC_URL),
  });
  const client = createWalletClient({
    chain: sepolia,
    transport: http(SEPOLIA_RPC_URL),
  });

  const contract = getContract({
    address: gameAddress,
    abi: contractABI,
    client: client,
  });

  enum Enemy {
    OLDMAN,
    DEVIL,
    ZOMBIE,
  }

  const [selectedEnemy, setSelectedEnemy] = useState(Enemy.OLDMAN);

  // normal,swing,stab for attackType
  const [attackType, setAttackType] = useState('normal');

  const [humanHP, setHumanHP] = useState(100);
  const [oldManHp, setOldManHP] = useState(100);
  const [zombieHP, setZombieHP] = useState(100);
  const [devilHP, setDevilHP] = useState(100);

  const stab = async () => {
    let enemy;
    if (selectedEnemy == Enemy.OLDMAN) {
      enemy = 1;
    } else if (selectedEnemy == Enemy.DEVIL) {
      enemy = 2;
    } else {
      enemy = 3;
    }
    if (!isSignedIn || accountId === undefined) {
      throw new Error('Please sign in to stab');
    }
    const nearViemAccount = (await wallet.nearViemAccount(
      accountId,
    )) as LocalAccount;
    const walletClient = createWalletClient({
      account: nearViemAccount,
      transport: http(),
      chain: sepolia,
    });

    try {
      const { request } = await publicClient.simulateContract({
        account: nearViemAccount,
        address: gameAddress,
        abi: contractABI,
        functionName: 'stab',
        args: [BigInt(0), BigInt(enemy)],
      });
      if (selectedEnemy == Enemy.OLDMAN) {
        setOldManHP((prev) => prev - 40);
      } else if (selectedEnemy == Enemy.DEVIL) {
        setDevilHP((prev) => prev - 40);
      } else {
        setZombieHP((prev) => prev - 40);
      }
      const result = await walletClient.writeContract(request);
      console.log(result);
    } catch (error: any) {
      alert('Stab failed: ' + error.message);
      console.error('Stab error:', error);
    }
  };

  const swing = async () => {
    let enemy;
    if (selectedEnemy == Enemy.OLDMAN) {
      enemy = 1;
    } else if (selectedEnemy == Enemy.DEVIL) {
      enemy = 2;
    } else {
      enemy = 3;
    }
    if (!isSignedIn || accountId === undefined) {
      throw new Error('Please sign in to swing');
    }
    const nearViemAccount = (await wallet.nearViemAccount(
      accountId,
    )) as LocalAccount;
    const walletClient = createWalletClient({
      account: nearViemAccount,
      transport: http(),
      chain: sepolia,
    });

    try {
      const { request } = await publicClient.simulateContract({
        account: nearViemAccount,
        address: gameAddress,
        abi: contractABI,
        functionName: 'swing',
        args: [BigInt(0), BigInt(enemy)],
      });
      if (selectedEnemy == Enemy.OLDMAN) {
        setOldManHP((prev) => prev - 40);
      } else if (selectedEnemy == Enemy.DEVIL) {
        setDevilHP((prev) => prev - 40);
      } else {
        setZombieHP((prev) => prev - 40);
      }
      const result = await walletClient.writeContract(request);
      console.log(result);
    } catch (error: any) {
      alert('Swing failed: ' + error.message);
      console.error('Swing error:', error);
    }
  };

  const mounted = useIsMounted();
  return (
    mounted && (
      <>
        <div className="mx-[6%] mt-[3%] flex flex-col">
          <div className="flex justify-between">
            <Profiile
              svgImage={humanFace}
              hpStatus={humanHP}
              name="me"
            ></Profiile>
            <Profiile
              svgImage={oldManFcae}
              hpStatus={oldManHp}
              name="old man"
            ></Profiile>
            <Profiile
              svgImage={devilFace}
              hpStatus={zombieHP}
              name="Devil"
            ></Profiile>
            <Profiile
              svgImage={zombieFace}
              hpStatus={devilHP}
              name="Zombie"
            ></Profiile>
          </div>
          <div className="characterContainer flex justify-between pt-[10%]">
            <HumanConditionalRender attackType={attackType} />
            {selectedEnemy === Enemy.OLDMAN ? (
              <Image
                className="border-[4px] border-black"
                src={oldmanEnemy}
                alt={''}
                onClick={() => {
                  setSelectedEnemy(Enemy.OLDMAN);
                }}
              ></Image>
            ) : (
              <Image
                src={oldmanEnemy}
                alt={''}
                onClick={() => {
                  setSelectedEnemy(Enemy.OLDMAN);
                }}
              ></Image>
            )}

            {selectedEnemy === Enemy.DEVIL ? (
              <Image
                className="border-[4px] border-black"
                src={devilEnemy}
                alt={''}
                onClick={() => {
                  setSelectedEnemy(Enemy.DEVIL);
                }}
              ></Image>
            ) : (
              <Image
                src={devilEnemy}
                alt={''}
                onClick={() => {
                  setSelectedEnemy(Enemy.DEVIL);
                }}
              ></Image>
            )}
            {selectedEnemy === Enemy.ZOMBIE ? (
              <Image
                className="border-[4px] border-black"
                src={zombieEnemy}
                alt={''}
                onClick={() => {
                  setSelectedEnemy(Enemy.ZOMBIE);
                }}
              ></Image>
            ) : (
              <Image
                src={zombieEnemy}
                alt={''}
                onClick={() => {
                  setSelectedEnemy(Enemy.ZOMBIE);
                }}
              ></Image>
            )}
          </div>
          <div className="mt-[5%] flex gap-[10%] px-[30%]">
            <Image
              className="rounded-full bg-gray-300"
              src={stabbingButton}
              alt={''}
              onClick={() => {
                setTimeout(() => {
                  setAttackType('normal');
                }, 1000);
                setAttackType('stab');
                stab();
              }}
            ></Image>
            <Image
              className="rounded-full bg-gray-300"
              src={swingButton}
              alt={''}
              onClick={() => {
                setTimeout(() => {
                  setAttackType('normal');
                }, 1000);
                setAttackType('swing');
                swing();
              }}
            ></Image>
          </div>
        </div>
      </>
    )
  );
}
