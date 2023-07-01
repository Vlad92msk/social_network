import React from 'react'
import { DrawerBar, NavBar } from '@modules'
import { fetcher } from '@public/utils/fetcher'
import { getUser } from '../../_utils/getUser'
import { ChatList } from '../../api/chatList/chatList'
import { FriendList } from '../../api/friendList/friendList'
import { PrivatChatList } from '../../api/privatChatList/privatChatList'


const getFriendList = async ({ uuids }: {uuids?: string[]}) => {
  if (!uuids) return []
  const allUsers: FriendList[] = await fetcher('http://localhost:3000/api/friendList')

  return allUsers.filter(({ uuid }) => uuids.includes(uuid))
}

const getChatList = async () => {
  const allUsers: ChatList[] = await fetcher('http://localhost:3000/api/chatList')

  return allUsers
}

const getPrivatChatList = async () => {
  const allUsers: PrivatChatList[] = await fetcher('http://localhost:3000/api/privatChatList')

  return allUsers
}


interface UserLayoutProps {
    children: React.ReactNode
    params: { locale: 'ru', user_id: string }
}

const UserLayout = async (props: UserLayoutProps) => {
  const { children, params } = props
  const user = await getUser()
  const friendsUuids = user?.social?.friends
  const chats = user?.social?.groupChat

  const friendList = await getFriendList({ uuids: friendsUuids })
  const groupChatList = await getChatList()
  const privatChatList = await getPrivatChatList()

  // console.log('friends', friendList)
  // console.log('chats', chats)
  return (
    <>
      <NavBar />
      {children}
      <DrawerBar state={{ friendList, privatChatList, groupChatList }} />
    </>
  )
}


export default UserLayout
