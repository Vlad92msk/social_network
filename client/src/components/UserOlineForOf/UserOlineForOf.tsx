import { Icon } from '@shared/components/Icon'
import React from 'react'
import { Text } from '@shared/components/Text'
import { makeCn } from '@shared/utils'
import styles from './UserOlineForOf.module.scss'

const cn = makeCn('UserOlineForOf', styles)

export type UserOlineForOfProps = {
  totalCount: number
}

export const UserOlineForOf = React.memo((props: UserOlineForOfProps) => {
  const { totalCount } = props
  return (
    <div className={cn()}>
      <Text className={cn('Count')} size="10">{totalCount}</Text>
    </div>
  )
})
