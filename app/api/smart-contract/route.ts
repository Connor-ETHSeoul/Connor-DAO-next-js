import { PrismaClient } from '@prisma/client';
import { NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

const client = new PrismaClient();

export async function GET() {
  const smartContract = await client.smart_contract.findMany();
  return NextResponse.json(smartContract);
}
