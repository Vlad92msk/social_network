import React from 'react'
import { Text } from '../Text'
import { makeCn } from '@public/utils'
import styles from './UserStatus.module.scss'

const cn = makeCn('UserStatus', styles)

export enum UserStatusEnum {
  ONLINE = 'online',
  OFFLINE = 'offline'
}

export type UserSmallType = {
  status: UserStatusEnum
}

export const UserStatus = React.memo((props: UserSmallType) => {
  const { status } = props
  return (
    <div className={cn()}>
      <span className={cn('Status', { status })} />
      <Text className={cn('Description')} size="8">{ status }</Text>
    </div>
  )
})
