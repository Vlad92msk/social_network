import { NextApiRequest } from 'next'
import { NextResponse } from 'next/server'
import { users } from './userss'


export async function GET(
  _req: NextApiRequest,
  { params }: { params: { id: string } },
) {
  const findUser = params?.id ? users?.find(({ id }) => id === params.id) : null
  // @ts-ignore
  return NextResponse.json(findUser)
}
