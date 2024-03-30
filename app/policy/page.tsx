'use client';

import Markdown from 'react-markdown';
import { PollAmountLogo } from '@/components/assets/PollAmountLogo';
import { PollDateRangeLogo } from '@/components/assets/PollDateRangeLogo';
import { ConnorDAOButton } from '@/components/MainButton';
import { ButtonSize, ButtonType } from '@/types/ButtonType';
import {
  createWalletClient,
  http,
  getContract,
  createPublicClient,
  LocalAccount,
} from 'viem';
import { sepolia } from 'viem/chains';
import abi from '../contractJson/ConnerDao.json';
import 'viem/window';
import { useEffect, useMemo, useState } from 'react';
import { useIsMounted } from '@/hooks/useIsMounted';
import WalletStore from '@/store/walletStore';
import { NearWallet, MPC_CONTRACT } from '@/utils/near-wallet';
import { useSnapshot } from 'valtio';
import Header from '@/components/Header';

export default function PolicyPage() {
  const wallet = useMemo(
    () => new NearWallet({ createAccessKeyFor: MPC_CONTRACT }),
    [],
  );
  const { isSignedIn, accountId } = useSnapshot(WalletStore.state);

  const policyId = 0;
  const SEPOLIA_RPC_URL =
    'https://endpoints.omniatech.io/v1/eth/sepolia/public';
  const address = '0x0d16F1d334790466F5B5097b98105D3b769bD1f2';
  const contractABI = abi.abi;
  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(SEPOLIA_RPC_URL),
  });
  const client = createWalletClient({
    chain: sepolia,
    transport: http(SEPOLIA_RPC_URL),
  });

  // const account = privateKeyToAccount(`0x${PRIVATE_KEY}`);

  const contract = getContract({
    address: address,
    abi: contractABI,
    client: client,
  });

  const [policyData, setPolicyData] = useState({
    title: '',
    description: '',
    policy: '',
  });

  const [votingData, setVotingData] = useState({
    agree: 0,
    disagree: 0,
    abstain: 0,
  });

  enum Vote {
    AGREE,
    DISAGREE,
    ABSTAIN,
  }

  const [userVote, setUserVote] = useState<Vote | null>(null);

  const vote = async () => {
    let voteNumber;
    if (userVote == Vote.AGREE) {
      voteNumber = 0;
    } else if (userVote == Vote.DISAGREE) {
      voteNumber = 1;
    } else {
      voteNumber = 2;
    }
    if (!isSignedIn || accountId === undefined) {
      throw new Error('Please sign in to vote');
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
        address: address,
        abi: contractABI,
        functionName: 'vote',
        args: [BigInt(policyId), BigInt(voteNumber)],
      });

      const result = await walletClient.writeContract(request);
      console.log(result);
      if (userVote == Vote.AGREE) {
        setVotingData((prev) => {
          return {
            ...prev,
            agree: prev.agree + 1,
          };
        });
      } else if (userVote == Vote.DISAGREE) {
        setVotingData((prev) => {
          return {
            ...prev,
            agree: prev.disagree + 1,
          };
        });
      } else {
        setVotingData((prev) => {
          return {
            ...prev,
            agree: prev.abstain + 1,
          };
        });
      }
    } catch (error: any) {
      alert('Voting failed: ' + error.message);
      console.error('Voting error:', error);
    }
  };

  useEffect(() => {
    const policyDetail = async () => {
      const data = await contract.read.policyDetail([BigInt(policyId)]);
      const [id, title, description, policy] = data as [
        bigint,
        string,
        string,
        string,
      ];
      setPolicyData({ title, description, policy });
      console.log(data);
    };
    const voteStatus = async () => {
      const data = await contract.read.voteStatus([BigInt(policyId)]);
      const [agree, disagree, abstain] = data as [bigint, bigint, bigint];
      setVotingData({
        agree: Number(agree),
        disagree: Number(disagree),
        abstain: Number(abstain),
      });
      console.log(data);
    };
    policyDetail();
    voteStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const markdown = `# policy: ${policyData.policy} ${'\n'} # description: ${policyData.description}`;
  const mounted = useIsMounted();

  return (
    mounted && (
      <>
        <Header />
        <div className="policyContainer mx-[9%] mt-[40px] flex flex-col items-center justify-center gap-[30px]">
          <div className="policyTitle flex max-h-[156px] min-w-[1130px] flex-col gap-[6px]">
            <div className="text-[16px] font-medium leading-[100%] text-[#065CDE]">
              Voting inprogress
            </div>
            <div className="text-[28px] font-semibold leading-[140%]">
              {policyData.title}
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
                        {votingData.agree}
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
                      {votingData.agree}
                    </div>
                  </div>
                  <div className="noVote flex w-[20%] flex-col items-start justify-center bg-[#FEDFEA] p-[12px]">
                    <div className="text-[16px] leading-[140%] text-[#F56677]">
                      No
                    </div>
                    <div className="text-[24px] font-semibold leading-[140%] text-[#F56677]">
                      {votingData.abstain}
                    </div>
                  </div>
                  <div className="abstainVote flex w-[10%] flex-col items-start justify-center bg-gray-200 p-[12px]">
                    <div className="text-[16px] leading-[140%] text-[#71797D]">
                      Abstain
                    </div>
                    <div className="text-[24px] font-semibold leading-[140%] text-[#71797D]">
                      {votingData.disagree}
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
                  <button
                    className="flex h-[68px] flex-col items-center justify-center rounded-l-[8px] border bg-[#F5F5F6] px-[36px] py-[39px]"
                    onClick={() => setUserVote(Vote.AGREE)}
                  >
                    <div>Yes</div>
                  </button>
                  <button
                    className="flex h-[68px] flex-col items-center justify-center border bg-[#F5F5F6] px-[36px] py-[39px]"
                    onClick={() => setUserVote(Vote.DISAGREE)}
                  >
                    <div>No</div>
                  </button>
                  <button
                    className="flex h-[68px] flex-col items-center justify-center border bg-[#F5F5F6] px-[36px] py-[39px]"
                    onClick={() => setUserVote(Vote.ABSTAIN)}
                  >
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
                  onClickEvent={() => vote()}
                  buttonType={ButtonType.Secondary}
                  buttonSize={ButtonSize.Large}
                  isDisabled={false}
                  className="leading-[0px]"
                ></ConnorDAOButton>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
}
