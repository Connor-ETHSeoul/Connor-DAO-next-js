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
import { useEffect, useState } from 'react';
import HumanConditionalRender from './components/HumanConditionalRender';

export default function GamePage() {
  const [selectedEnemy, setSelectedEnemy] = useState('oldMan');
  const [isMounted, setIsMounted] = useState(false);
  // normal,swing,stab for attackType
  const [attackType, setAttackType] = useState('normal');

  const [humanHP, setHumanHP] = useState(100);
  const [oldManHp, setOldManHP] = useState(100);
  const [zombieHP, setZombieHP] = useState(100);
  const [devilHP, setDevilHP] = useState(100);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    isMounted && (
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
            {selectedEnemy === 'oldMan' ? (
              <Image
                className="border-[4px] border-black"
                src={oldmanEnemy}
                alt={''}
                onClick={() => {
                  setSelectedEnemy('oldMan');
                }}
              ></Image>
            ) : (
              <Image
                src={oldmanEnemy}
                alt={''}
                onClick={() => {
                  setSelectedEnemy('oldMan');
                }}
              ></Image>
            )}

            {selectedEnemy === 'devil' ? (
              <Image
                className="border-[4px] border-black"
                src={devilEnemy}
                alt={''}
                onClick={() => {
                  setSelectedEnemy('devil');
                }}
              ></Image>
            ) : (
              <Image
                src={devilEnemy}
                alt={''}
                onClick={() => {
                  setSelectedEnemy('devil');
                }}
              ></Image>
            )}
            {selectedEnemy === 'zombie' ? (
              <Image
                className="border-[4px] border-black"
                src={zombieEnemy}
                alt={''}
                onClick={() => {
                  setSelectedEnemy('zombie');
                }}
              ></Image>
            ) : (
              <Image
                src={zombieEnemy}
                alt={''}
                onClick={() => {
                  setSelectedEnemy('zombie');
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
              }}
            ></Image>
          </div>
        </div>
      </>
    )
  );
}
