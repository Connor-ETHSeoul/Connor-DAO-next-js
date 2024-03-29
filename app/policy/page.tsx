'use client';

import Markdown from 'react-markdown';
import { PollAmountLogo } from '@/components/assets/PollAmountLogo';
import { PollDateRangeLogo } from '@/components/assets/PollDateRangeLogo';
import { ConnorDAOButton } from '@/components/MainButton';
import { ButtonSize, ButtonType } from '@/types/ButtonType';

export default function PolicyPage() {
  const markdown = '# Hi, *Pluto*!';
  
  return (
    <div className="policyContainer mx-[9%] mt-[40px] flex flex-col items-center justify-center gap-[30px]">
      <div className="policyTitle flex max-h-[156px] min-w-[1130px] flex-col gap-[6px]">
        <div className="text-[16px] font-medium leading-[100%] text-[#065CDE]">
          Voting inprogress
        </div>
        <div className="text-[28px] font-semibold leading-[140%]">
          {'Hello World'}
        </div>
      </div>
      <div className="policyBody flex gap-[25px]">
        <div className="pollContainer flex flex-col gap-[20px]">
          <div className="votingStatus flex w-[746px] flex-col gap-[18px] rounded-[20px] border-2 border-[#065CDE] p-[20px]">
            <div className="votingHeader flex justify-between">
              <div className="text-[18px] font-semibold leading-[130%]">
                Voting progress
              </div>
              <div className="flex items-start gap-[10px] rounded-[43px] bg-[#065CDE] px-[8px] py-[4px] text-[16px] font-semibold leading-[140%] text-white">
                D-30
              </div>
            </div>
            <div className="votingStatus flex gap-[18px] border border-b-gray-100 border-t-gray-100">
              <div className="flex flex-col items-start gap-[18px] self-stretch px-[12px]">
                <div className="flex items-end justify-between self-stretch">
                  <div className="flex items-center gap-[10px]">
                    <PollAmountLogo className="h-[16px] w-[16px]" />
                    <div className="text-[16px] leading-[140%] text-gray-500">
                      100,000
                    </div>
                  </div>
                  <div className="text-[18px] font-semibold leading-[140%] text-[#065CDE]">
                    60%
                  </div>
                </div>
                <div className="pollBar flex h-[6px] items-center self-stretch bg-[#EEEFF0] pr-[145.5px]">
                  <div className="pollBarYes h-[6px] w-[145.5px] bg-[#065CDE]"></div>
                </div>
              </div>
              <div className="flex items-center gap-[10px] px-[12px]">
                <PollDateRangeLogo className="h-[16px] w-[16px]" />
                <div className="text-[16px] leading-[140%] text-gray-500">
                  {}
                </div>
              </div>
            </div>
            <div className="votePercentage flex h-[80px] w-full items-start border border-gray-100">
              <div className="yesVote flex w-[70%] flex-col items-start justify-center bg-[#D9E7FD] p-[12px]">
                <div className="text-[16px] leading-[140%] text-[#065CDE]">
                  Yes
                </div>
                <div className="text-[24px] font-semibold leading-[140%] text-[#065CDE]">
                  70%
                </div>
              </div>
              <div className="noVote flex w-[20%] flex-col items-start justify-center bg-[#FEDFEA] p-[12px]">
                <div className="text-[16px] leading-[140%] text-[#F56677]">
                  No
                </div>
                <div className="text-[24px] font-semibold leading-[140%] text-[#F56677]">
                  20%
                </div>
              </div>
              <div className="abstainVote flex w-[10%] flex-col items-start justify-center bg-gray-200 p-[12px]">
                <div className="text-[16px] leading-[140%] text-[#71797D]">
                  Abstain
                </div>
                <div className="text-[24px] font-semibold leading-[140%] text-[#71797D]">
                  10%
                </div>
              </div>
            </div>
          </div>
          <div className="pollDescription flex min-h-[427px] w-[746px] flex-col gap-[18px] rounded-[20px] border-2 border-gray-200 p-[20px]">
            <div className="descriptionHeader text-[18px] font-semibold leading-[130%]">
              Description
            </div>
            <div className="divider m-[0px] h-0"></div>
            <div>
              <Markdown>{markdown}</Markdown>
            </div>
          </div>
        </div>
        <div className="voteContainer flex max-h-[500px] w-[375px] flex-col gap-[20px] rounded-[20px] border border-gray-200 p-[20px]">
          <div className="voteHeader text-[18px] font-semibold leading-[130%]">
            Vote
          </div>
          <div className="divider divider m-[0px] h-0" />
          <div className="voteSection flex flex-col gap-[12px]">
            <div className="text-[16px] font-medium leading-[140%] text-gray-500">
              ❶ Please select whether you agree or not.
            </div>
            <div className="voteRadioButton flex items-start">
              <button className="flex h-[68px] flex-col items-center justify-center rounded-l-[8px] border bg-[#F5F5F6] px-[36px] py-[39px]">
                <div>Yes</div>
              </button>
              <button className="flex h-[68px] flex-col items-center justify-center border bg-[#F5F5F6] px-[36px] py-[39px]">
                <div>No</div>
              </button>
              <button className="flex h-[68px] flex-col items-center justify-center border bg-[#F5F5F6] px-[36px] py-[39px]">
                <div>Abstain</div>
              </button>
            </div>
            <div className="checkFHESection flex flex-col gap-[12px]">
              <div className="text-[16px] font-medium leading-[140%] text-gray-500">
                ❶ Please select whether you agree or not.
              </div>
              <div className="checkFHERadioButtonGroup flex flex-col gap-[8px]">
                <button className="flex items-center justify-between rounded-[8px] border bg-[#F5F5F6] p-[12px] ">
                  <div className="flex gap-[10px]">
                    <PollAmountLogo className="h-[16px]"></PollAmountLogo>
                    <div>Vote None Anonymously</div>
                  </div>
                  <div className="h-[16px] w-[16px] rounded-full border border-[#000]"></div>
                </button>
                <button className="flex items-center justify-between rounded-[8px] border bg-[#F5F5F6] p-[12px] ">
                  <div className="flex gap-[10px]">
                    <PollAmountLogo className="h-[16px]"></PollAmountLogo>
                    <div>Vote Anonymously</div>
                  </div>
                  <div className="h-[16px] w-[16px] rounded-full border border-[#000]"></div>
                </button>
              </div>
            </div>
            <div className="divider"></div>
            <ConnorDAOButton
              buttonText={'Vote'}
              onClickEvent={function (): void {
                console.log('Hello World');
              }}
              buttonType={ButtonType.Secondary}
              buttonSize={ButtonSize.Large}
              isDisabled={false}
              className="leading-[0px]"
            ></ConnorDAOButton>
          </div>
        </div>
      </div>
    </div>
  );
}
