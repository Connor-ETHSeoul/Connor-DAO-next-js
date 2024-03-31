import { proxy } from 'valtio';

export interface IAgentOutput {
  id: number;
  proposalId: number;
  color: string;
  text: string;
}

interface AgentOutputState {
  agentOutputList: IAgentOutput[];
}

const state = proxy<AgentOutputState>({
  agentOutputList: [],
});

const AgentOutputStore = {
  state,
  addAgentOutputList(newAgentOutputList: IAgentOutput[]) {
    const iDs = new Set(newAgentOutputList.map(({ id }) => id));
    state.agentOutputList = state.agentOutputList.filter(
      (agentOutput) => !iDs.has(agentOutput.id),
    );
    state.agentOutputList = state.agentOutputList.concat(newAgentOutputList);
  },
  addAgentOutput(newAgentOutput: IAgentOutput) {
    state.agentOutputList.push(newAgentOutput);
  },
  deleteAgentOutputList() {
    state.agentOutputList = [];
  },
};
export default AgentOutputStore;
