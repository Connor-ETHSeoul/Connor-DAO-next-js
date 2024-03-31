import { IAgentOutput } from '@/store/agentStore';

const AgentOutputConditionalRender = ({
  agentOutput,
  idx,
}: {
  agentOutput: IAgentOutput;
  idx: number;
}) => {
  if (agentOutput.color === 'red') {
    return (
      <div
        className="flex flex-col rounded-[4px] border border-white bg-red-300"
        key={idx}
      >
        <div>Agent RED</div>
        <div>{agentOutput.text}</div>
      </div>
    );
  } else if (agentOutput.color === 'blue') {
    return (
      <div className="flex flex-col border border-white bg-blue-300" key={idx}>
        <div>Agent BLUE</div>
        <div>{agentOutput.text}</div>
      </div>
    );
  } else if (agentOutput.color === 'black') {
    return (
      <div className="flex flex-col border border-white bg-gray-300 " key={idx}>
        <div>Agent BLACK</div>
        <div>{agentOutput.text}</div>
      </div>
    );
  } else if (agentOutput.color === 'purple') {
    return (
      <div
        className="flex flex-col border border-white bg-purple-300"
        key={idx}
      >
        <div>Agent PURPLE</div>
        <div>{agentOutput.text}</div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col border border-white bg-green-300" key={idx}>
        <div>Agent GREEN</div>
        <div>{agentOutput.text}</div>
      </div>
    );
  }
};
export default AgentOutputConditionalRender;
