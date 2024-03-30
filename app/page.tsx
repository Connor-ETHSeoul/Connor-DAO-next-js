'use client';

import Header from '@/components/Header';
import { LiveLogo } from '@/components/assets/LiveLogo';
import { PaginationRight } from '@/components/assets/PaginationRight';
import { PaginationLeft } from '@/components/assets/PaginatoinLeft';
import { PollAmountLogo } from '@/components/assets/PollAmountLogo';
import { PollDateRangeLogo } from '@/components/assets/PollDateRangeLogo';
import { useIsMounted } from '@/hooks/useIsMounted';
import PolicyStore from '@/store/policyStore';
import Link from 'next/link';
import { useSnapshot } from 'valtio';

export default function Home() {
  const { policyList } = useSnapshot(PolicyStore.state);
  const mounted = useIsMounted();
  return (
    mounted && (
      <>
        <div className="bg-[#065CDE] bg-opacity-5">
          <div className="livePolicyContainer flex flex-col items-center gap-[45px] bg-opacity-30 bg-radial-gradient py-[40px]">
            <div className="livePolicy flex items-center gap-[13px]">
              <LiveLogo className="h-[24px] w-[24px]"></LiveLogo>
              <div className="text-[40px] font-semibold leading-10">
                Live Policy
              </div>
            </div>
            <div>
              <ul className="policy flex items-start gap-[20px]">
                {policyList.map((policy, idx) => (
                  <li key={idx} className="">
                    <Link
                      className="policyCard flex h-[383px] w-[339px] flex-col  items-start justify-between rounded-[20px] border-2 border-solid border-[#065CDE] bg-white p-[24px]"
                      href={{
                        pathname: '/policy',
                      }}
                    >
                      <div className="policyTitle max-h-[156px] self-stretch text-[28px] font-semibold leading-[140%]">
                        {policy.title}
                      </div>
                      <div className="policyCardBottom flex flex-col items-start gap-[14px] self-stretch">
                        <div className="pollAndDate flex items-end justify-between self-stretch">
                          <div className="text-[18px] font-semibold leading-[140%] text-[#065CDE]">
                            60%
                          </div>
                          <div className="flex items-start gap-[10px] rounded-[43px] bg-[#065CDE] px-[8px] py-[4px] text-[16px] font-semibold leading-[140%] text-white">
                            D-30
                          </div>
                        </div>
                        <div className="pollBar flex h-[6px] items-center self-stretch bg-[#EEEFF0] pr-[145.5px]">
                          <div className="pollBarYes h-[6px] w-[145.5px] bg-[#065CDE]"></div>
                        </div>
                        <div className="pollAmountAndDateRange flex flex-col items-start gap-[4px]">
                          <div className="flex items-center gap-[10px]">
                            <PollAmountLogo className="h-[16px] w-[16px]" />
                            <div className="text-[16px] leading-[140%] text-gray-500">
                              100,000
                            </div>
                          </div>
                          <div className="flex items-center gap-[10px]">
                            <PollDateRangeLogo className="h-[16px] w-[16px]" />
                            <div className="text-[16px] leading-[140%] text-gray-500">
                              YYYY.MM.DD-MM.DD
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="policyPagination flex items-start gap-[16px]">
              <div className="flex h-[32px] w-[32px] flex-col items-center justify-center gap-[10px] p-[10px]">
                <PaginationLeft className="h-[22px] w-[22px] shrink-0" />
              </div>
              <div className="paginationNumber flex items-start">
                <div className="flex h-[32px] w-[32px] flex-col items-center justify-center gap-[10px] rounded-[10px] bg-black p-[10px] text-[16px] font-medium leading-[140%] text-white">
                  1
                </div>
              </div>
              <div className="paginationNumber flex items-start">
                <div className="flex h-[32px] w-[32px] flex-col items-center justify-center gap-[10px] rounded-[10px] p-[10px] text-[16px] font-medium leading-[140%] text-gray-600">
                  2
                </div>
              </div>
              <div className="paginationNumber flex items-start">
                <div className="flex h-[32px] w-[32px] flex-col items-center justify-center gap-[10px] rounded-[10px] p-[10px] text-[16px] font-medium leading-[140%] text-gray-600">
                  3
                </div>
              </div>
              <div className="flex h-[32px] w-[32px] flex-col items-center justify-center gap-[10px] p-[10px]">
                <PaginationRight className="h-[22px] w-[22px] shrink-0" />
              </div>
            </div>
          </div>
        </div>
        {/* All Policies */}
        <div className="allPolicyContainer mx-[8%] my-[50px] flex flex-col">
          <div className="text-[28px] font-semibold leading-[140%]">
            All Policies
          </div>
          <div className="allPolicyContainer flex flex-col items-start gap-[45px] py-[40px]">
            <div>
              <ul className="policy flex items-start gap-[20px]">
                {policyList.map((policy, idx) => (
                  <li
                    key={idx}
                    className="policyCard flex h-[383px] w-[285px] flex-shrink-0 flex-col  items-start justify-between rounded-[20px] border border-solid border-[#DDE0E1] bg-white p-[20px]"
                  >
                    <div className="policyTitle flex max-h-[156px] flex-col gap-[8px] self-stretch">
                      <div className="text-[16px] font-medium leading-[100%] text-[#065CDE]">
                        Voting inprogress
                      </div>
                      <div className="text-[22px] font-semibold leading-[140%]">
                        {policy.title}
                      </div>
                    </div>
                    <div className="policyCardBottom flex flex-col items-start gap-[14px] self-stretch">
                      <div className="pollAndDate flex items-end justify-between self-stretch">
                        <div className="text-[18px] font-semibold leading-[140%] text-[#065CDE]">
                          60%
                        </div>
                        <div className="flex items-start gap-[10px] rounded-[43px] bg-[#065CDE] px-[8px] py-[4px] text-[16px] font-semibold leading-[140%] text-white">
                          D-30
                        </div>
                      </div>
                      <div className="pollBar flex h-[6px] items-center self-stretch bg-[#EEEFF0] pr-[145.5px]">
                        <div className="pollBarYes h-[6px] w-[145.5px] bg-[#065CDE]"></div>
                      </div>
                      <div className="pollAmountAndDateRange flex flex-col items-start gap-[4px]">
                        <div className="flex items-center gap-[10px]">
                          <PollAmountLogo className="h-[16px] w-[16px]" />
                          <div className="text-[16px] leading-[140%] text-gray-500">
                            100,000
                          </div>
                        </div>
                        <div className="flex items-center gap-[10px]">
                          <PollDateRangeLogo className="h-[16px] w-[16px]" />
                          <div className="text-[16px] leading-[140%] text-gray-500">
                            YYYY.MM.DD-MM.DD
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex justify-around">
            <div className="policyPagination flex items-center gap-[16px]">
              <div className="flex h-[32px] w-[32px] flex-col items-center justify-center gap-[10px] p-[10px]">
                <PaginationLeft className="h-[22px] w-[22px] shrink-0" />
              </div>
              <div className="paginationNumber flex items-start">
                <div className="flex h-[32px] w-[32px] flex-col items-center justify-center gap-[10px] rounded-[10px] bg-black p-[10px] text-[16px] font-medium leading-[140%] text-white">
                  1
                </div>
              </div>
              <div className="paginationNumber flex items-start">
                <div className="flex h-[32px] w-[32px] flex-col items-center justify-center gap-[10px] rounded-[10px] p-[10px] text-[16px] font-medium leading-[140%] text-gray-600">
                  2
                </div>
              </div>
              <div className="paginationNumber flex items-start">
                <div className="flex h-[32px] w-[32px] flex-col items-center justify-center gap-[10px] rounded-[10px] p-[10px] text-[16px] font-medium leading-[140%] text-gray-600">
                  3
                </div>
              </div>
              <div className="flex h-[32px] w-[32px] flex-col items-center justify-center gap-[10px] p-[10px]">
                <PaginationRight className="h-[22px] w-[22px] shrink-0" />
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
}
