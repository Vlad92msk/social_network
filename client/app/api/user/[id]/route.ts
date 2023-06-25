import { NextApiRequest } from 'next'
import { NextResponse } from 'next/server'
import { allUsers } from '../allUsers'


export async function GET(
  _req: NextApiRequest,
  { params }: { params: { id: string } },
) {
  const findUser = params?.id ? allUsers?.find(({ uuid }) => uuid === params.id) : null
  // @ts-ignore
  return NextResponse.json(findUser)
}
