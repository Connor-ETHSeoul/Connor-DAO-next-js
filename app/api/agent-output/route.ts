import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

const client = new PrismaClient();

export async function GET() {
  const agentOutput = await client.agent_output.findMany();
  return NextResponse.json({ agentOutput });
}
