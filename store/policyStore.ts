import { proxy } from 'valtio';

export interface IPolicy {
  policyId: number;
  title: string;
  description: string;
  policy: string;
  yesVoteAmount: number;
  noVoteAmount: number;
  abstainVoteAmount: number;
  dueDate: string;
}

interface PolicyListState {
  policyList: IPolicy[];
}

const state = proxy<PolicyListState>({
  policyList: [
    {
      policyId: 0,
      title: 'Attacks on elderly',
      description: '## Hello World. This is Policy 1',
      policy: 'Do not Attack Human',
      yesVoteAmount: 60,
      noVoteAmount: 30,
      abstainVoteAmount: 10,
      dueDate: '2024-04-01',
    },
  ],
});

const PolicyStore = {
  state,
  addPolicyList(newPolicyList: IPolicy[]) {
    state.policyList = state.policyList.filter(
      (policy) => !newPolicyList.includes(policy),
    );
    state.policyList = state.policyList.concat(newPolicyList);
  },
  deletePolicy(value: IPolicy) {
    state.policyList = state.policyList.filter(
      (policy) => policy.policyId !== value.policyId,
    );
  },
};
export default PolicyStore;
