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
import abi from '../contractJson/Game.json';
import 'viem/window';
import { useState } from 'react';

export default function Home() {
  const [attackerIndex, setAttackerIndex] = useState<string>('');
  const [defenderIndex, setDefenderIndex] = useState<string>('');

  const SEPOLIA_RPC_URL = process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL;
  const PRIVATE_KEY = process.env.NEXT_PUBLIC_PRIVATE_KEY;
  const gameAddress = '0x338588a505a4ba141f1A156CA836df6C239C88d9';
  const contractABI = abi.abi;
  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(SEPOLIA_RPC_URL),
  });
  const client = createWalletClient({
    chain: sepolia,
    transport: http(SEPOLIA_RPC_URL),
  });

  const account = privateKeyToAccount(`0x${PRIVATE_KEY}`);

  const stab = async () => {
    const { request } = await publicClient.simulateContract({
      account,
      address: gameAddress,
      abi: contractABI,
      functionName: 'stab',
      args: [BigInt(attackerIndex), BigInt(defenderIndex)],
    });

    const result = await client.writeContract(request);
    console.log(result);
  };

  const swing = async () => {
    const { request } = await publicClient.simulateContract({
      account,
      address: gameAddress,
      abi: contractABI,
      functionName: 'stab',
      args: [BigInt(attackerIndex), BigInt(defenderIndex)],
    });

    const result = await client.writeContract(request);
    console.log(result);
  };

  return (
    <div>
      <div>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="number"
            value={attackerIndex}
            onChange={(e) => setAttackerIndex(e.target.value)}
            placeholder="Input 1"
          />
          <input
            type="number"
            value={defenderIndex}
            onChange={(e) => setDefenderIndex(e.target.value)}
            placeholder="Input 2"
          />
          <button className="btn" onClick={() => stab()}>
            stab
          </button>
        </form>
      </div>
      <div>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="number"
            value={attackerIndex}
            onChange={(e) => setAttackerIndex(e.target.value)}
            placeholder="Input 1"
          />
          <input
            type="number"
            value={defenderIndex}
            onChange={(e) => setDefenderIndex(e.target.value)}
            placeholder="Input 2"
          />
          <button className="btn" onClick={() => swing()}>
            swing
          </button>
        </form>
      </div>
    </div>
  );
}
