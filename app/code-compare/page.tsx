'use client';

import ReactDiffViewer from 'react-diff-viewer-continued';

import { ContractAddressSVG } from './components/ContractAddressSVG';
import { useEffect, useRef, useState } from 'react';
import { useSnapshot } from 'valtio';
import SmartContractStore from '@/store/smartContractStore';
import AgentOutputStore, { IAgentOutput } from '@/store/agentStore';
import useInterval from './hook/useInterval';
import AgentOutputConditionalRender from './components/AgentOutputConditionalRender';

export default function CodeComparePage() {
  const value = useRef(0);
  const messagesEndRef = useRef(null);

  const { agentOutputList } = useSnapshot(AgentOutputStore.state);
  const { smartContractList } = useSnapshot(SmartContractStore.state);

  const [oldCode, setOldCode] = useState(``);
  const [newCode, setNewCode] = useState(``);
  const [contractVersion, setContractVersion] = useState('');

  const [outPutList, setOutputList] = useState<IAgentOutput[]>([]);

  const fetchAgentOutput = async () => {
    const res = await fetch('https://connor-dao-next-js.vercel.app//api/smart-contract');
    const data = await res.json();
    return data;
  };

  const fetchSmartContract = async () => {
    const res = await fetch(`https://connor-dao-next-js.vercel.app//api/smart-contract`);
    const data = await res.json();
    return data;
  };

  useEffect(() => {
    fetchSmartContract().then((res) => {
      SmartContractStore.addSmartContracttList(res);
    });
  }, []);

  useEffect(() => {
    fetchAgentOutput().then((res) => {
      setOutputList(res.agentOutput);
    });
  }, []);

  useInterval(
    () => {
      AgentOutputStore.addAgentOutput(outPutList[value.current]);
      ++value.current;
    },
    Math.floor(Math.random() * 5000) + 1000,
  );

  useEffect(() => {
    if (smartContractList.length >= 2) {
      setContractVersion(
        smartContractList[smartContractList.length - 1].version,
      );
      setOldCode(smartContractList[smartContractList.length - 1].code);
      setNewCode(smartContractList[smartContractList.length - 2].code);
    }
  }, [smartContractList]);

  const scrollToBottom = () => {
    // @ts-ignore
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  return (
    <div className="mx-[10%] flex flex-col gap-[20px]">
      <div className="codeCompareHeader flex flex-col gap-[10px] p-[20px]">
        <div className="policyVersionAndTitle flex flex-col items-center">
          <div className="policyVersion">{contractVersion}</div>
          <div className="policyTitle">Title</div>
        </div>
      </div>
      <div className="aiResultStreamContainer flex h-[500px] flex-col overflow-y-scroll rounded-[20px] border border-[#DDE0E1] p-[24px]">
        {agentOutputList.map((agentOutput, idx) =>
          agentOutput ? (
            <AgentOutputConditionalRender
              agentOutput={agentOutput}
              idx={idx}
              key={idx}
            ></AgentOutputConditionalRender>
          ) : (
            <></>
          ),
        )}
        <div ref={messagesEndRef} />
      </div>
      <ReactDiffViewer oldValue={oldCode} newValue={newCode} splitView={true} />
    </div>
  );
}
