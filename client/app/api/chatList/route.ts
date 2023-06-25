import { NextResponse } from 'next/server'
import { chatList } from './chatList'

export async function GET(req: Request) {
  return NextResponse.json(chatList)
}
