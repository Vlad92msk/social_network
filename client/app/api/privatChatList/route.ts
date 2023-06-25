import { NextResponse } from 'next/server'
import { privatChatList } from './privatChatList'

export async function GET(req: Request) {
  return NextResponse.json(privatChatList)
}
