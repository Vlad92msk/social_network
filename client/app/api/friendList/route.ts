import { NextResponse } from 'next/server'
import { friendList } from './friendList'

export async function GET(req: Request) {
  return NextResponse.json(friendList)
}
