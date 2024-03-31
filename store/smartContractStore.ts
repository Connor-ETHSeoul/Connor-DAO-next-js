import { proxy } from 'valtio';

export interface ISmartContractOutput {
  id: number;
  version: string;
  code: string;
}

interface SmartContractState {
  smartContractList: ISmartContractOutput[];
}

const state = proxy<SmartContractState>({
  smartContractList: [],
});

const SmartContractStore = {
  state,
  addSmartContracttList(newSmartContractList: ISmartContractOutput[]) {
    const iDs = new Set(newSmartContractList.map(({ id }) => id));
    state.smartContractList = state.smartContractList.filter(
      (agentOutput) => !iDs.has(agentOutput.id),
    );
    state.smartContractList =
      state.smartContractList.concat(newSmartContractList);
  },
  deleteSmartContractList() {
    state.smartContractList = [];
  },
};
export default SmartContractStore;
