'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export const Profiile = ({
  svgImage,
  hpStatus,
  name,
}: {
  svgImage: any;
  hpStatus: number;
  name: string;
}) => {
  return (
    <div className="flex h-[101px] w-[307px]">
      <div className="border border-[4px] border-black bg-[#BC9862]">
        <Image src={svgImage} priority={true} alt={name}></Image>
      </div>
      <div className="nameAndHp flex flex-col">
        <div
          className="name font-DOSSaemmul w-[205px] px-[14px] text-[34px] font-medium leading-[140%] text-white"
          style={{
            WebkitTextStrokeWidth: '1.5px',
            WebkitTextStrokeColor: 'black',
          }}
        >
          {name}
        </div>
        <div className="hpSection flex h-[100px] flex-col border border-[4px] border-l-0 border-black">
          <div className="hpGaugeTop flex w-full">
            <div
              className={`h-[22px] bg-[#FFD698]`}
              style={{ width: `${hpStatus.toString()}%` }}
            ></div>
            <div
              className={`h-[22px] bg-[#AE3423]`}
              style={{ width: `${(100 - hpStatus).toString()}%` }}
            ></div>
          </div>
          <div className="hpGaugeBottom flex">
            <div
              className={`h-[23px] bg-[#F8B147]`}
              style={{ width: `${hpStatus.toString()}%` }}
            ></div>
            <div
              className={`h-[23px] bg-[#922718]`}
              style={{ width: `${(100 - hpStatus).toString()}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};
