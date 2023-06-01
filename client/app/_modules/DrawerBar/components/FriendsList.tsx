import { filter, orderBy } from 'lodash'
import React from 'react'
import { UserStatusEnum } from '@common'
import { makeCn, classNames } from '@public/utils'
import { useDrawerBarSelect } from '../DrawerBar'
import styles from '../DrawerBar.module.scss'
import { FriendItem } from './index'

const cn = makeCn('FriendsList', styles)

export interface FriendsListItem{
  id: number
  name: string
  img: string
  status: UserStatusEnum
  messageCount: number | null
}

const friendsListItems: FriendsListItem[] = [
  { id: 1, name: 'JackJa ckJackJackJac kJackJackJack', img: '1', status: UserStatusEnum.ONLINE, messageCount: 985 },
  { id: 2, name: 'Denis', img: '1', status: UserStatusEnum.OFFLINE, messageCount: null },
  { id: 3, name: 'John', img: '1', status: UserStatusEnum.ONLINE, messageCount: null },
  { id: 4, name: 'Carl', img: '1', status: UserStatusEnum.ONLINE, messageCount: null },
  { id: 5, name: 'Mike', img: '1', status: UserStatusEnum.OFFLINE, messageCount: null },
  { id: 6, name: 'Elvis', img: '1', status: UserStatusEnum.ONLINE, messageCount: null },
  { id: 7, name: 'Elvis', img: '1', status: UserStatusEnum.OFFLINE, messageCount: 1 },
  { id: 8, name: 'Elvis', img: '1', status: UserStatusEnum.OFFLINE, messageCount: 1 },
  { id: 9, name: 'Elvis', img: '1', status: UserStatusEnum.ONLINE, messageCount: 1 },
  { id: 10, name: 'Elvis', img: '1', status: UserStatusEnum.OFFLINE, messageCount: null },
  { id: 11, name: 'Elvis', img: '1', status: UserStatusEnum.ONLINE, messageCount: 0 },
  { id: 12, name: 'Elvis', img: '1', status: UserStatusEnum.ONLINE, messageCount: 1 },
  { id: 13, name: 'Elvis', img: '1', status: UserStatusEnum.OFFLINE, messageCount: 12 },
  { id: 14, name: 'Elvis', img: '1', status: UserStatusEnum.OFFLINE, messageCount: 1 },
  { id: 15, name: 'Elvis', img: '1', status: UserStatusEnum.OFFLINE, messageCount: 1 },
]

export const FriendsList = React.memo(() => {
  const search = useDrawerBarSelect((state) => state.search)
  return (
    <div className={cn()}>
      {orderBy(
        search ? filter(friendsListItems, ({ name }) => name.toLowerCase().includes(search.toLowerCase())) : friendsListItems,
        ['status', 'messageCount'],
        ['desc', 'asc'],
      ).map((friend) => (
        <FriendItem
          key={friend.id}
          friend={friend}
        />
      ))}
    </div>
  )
})
