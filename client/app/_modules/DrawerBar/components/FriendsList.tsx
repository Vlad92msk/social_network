import { filter, orderBy } from 'lodash'
import React from 'react'
import { makeCn } from '@public/utils'
import { useDrawerBarSelect } from '../DrawerBar'
import styles from '../DrawerBar.module.scss'
import { FriendItem } from './index'

const cn = makeCn('FriendsList', styles)


export const FriendsList = React.memo(() => {
  const search = useDrawerBarSelect((state) => state.search)
  const friendList = useDrawerBarSelect((state) => state.friendList)
  return (
    <div className={cn()}>
      {orderBy(
        search ? filter(friendList, ({ name }) => name.toLowerCase().includes(search.toLowerCase())) : friendList,
        ['status', 'messageCount'],
        ['desc', 'asc'],
      ).map((friend) => (
        <FriendItem
          key={friend.uuid}
          friend={friend}
        />
      ))}
    </div>
  )
})
