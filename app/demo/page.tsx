'use client';

import {
  createWalletClient,
  http,
  getContract,
  createPublicClient,
  PrivateKeyAccount,
} from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { sepolia } from 'viem/chains';
import abi from './contractJson/ConnerDao.json';
import 'viem/window';

export default function Home() {
  const address = '0xb07959116C226f4e5A089B9453Ac3370cD882b08';
  const contractABI = abi.abi;
  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(
      '	https://sepolia.infura.io/v3/2607cab9fd8d488998c50bb4f92b0ff8',
    ),
  });
  const client = createWalletClient({
    chain: sepolia,
    transport: http(
      '	https://sepolia.infura.io/v3/2607cab9fd8d488998c50bb4f92b0ff8',
    ),
  });

  const account = privateKeyToAccount(
    '0x02f21976b012907c0a2b9fad37b1340b1bcc97b074b7babb96986d36e23f040f',
  );

  const contract = getContract({
    address: address,
    abi: contractABI,
    client: client,
  });

  const makePolicy = async () => {
    const { request } = await publicClient.simulateContract({
      account,
      address: address,
      abi: contractABI,
      functionName: 'makePolicy',
      args: ['title1', 'description1', 'policy1'],
    });

    const result = await client.writeContract(request);
    console.log(result);
  };

  const restart = async () => {
    const { request } = await publicClient.simulateContract({
      account,
      address: address,
      abi: contractABI,
      functionName: 'restart',
      args: [BigInt(0)],
    });

    const result = await client.writeContract(request);
    console.log(result);
  };

  const vote = async () => {
    const { request } = await publicClient.simulateContract({
      account,
      address: address,
      abi: contractABI,
      functionName: 'vote',
      args: [BigInt(0), BigInt(0)],
    });

    const result = await client.writeContract(request);
    console.log(result);
  };

  const policyDetail = async () => {
    const data = await contract.read.policyDetail([BigInt(0)]);
    console.log(data);
  };

  const voteStatus = async () => {
    const data = await contract.read.voteStatus([BigInt(0)]);
    console.log(data);
  };

  return (
    <div>
      <div>
        <button className="btn" onClick={makePolicy}>
          makePolicy
        </button>
      </div>
      <div>
        <button className="btn" onClick={restart}>
          restart
        </button>
      </div>
      <div>
        <button className="btn" onClick={vote}>
          vote
        </button>
      </div>
      <div>
        <button className="btn" onClick={policyDetail}>
          policyDetail
        </button>
      </div>
      <div>
        <button className="btn" onClick={voteStatus}>
          voteStatus
        </button>
      </div>
    </div>
  );
}
