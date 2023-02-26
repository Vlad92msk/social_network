import { Icon } from '@shared/components/Icon'
import React from 'react'
import { Text } from '@shared/components/Text'
import { makeCn } from '@shared/utils'
import styles from './UserOlineForOf.module.scss'

const cn = makeCn('UserOlineForOf', styles)

export type UserOlineForOfProps = {
  activeCount: number
  totalCount: number
}

export const UserOlineForOf = React.memo((props: UserOlineForOfProps) => {
  const { activeCount, totalCount } = props
  return (
    <div className={cn()}>
      <div className={cn('IconBox')}>
        <Icon className={cn('Icon')} icon="user" fill="oldAsphalt40" size="small" />
        <span className={cn('Status')} />
      </div>
      <Text className={cn('Count')} size="1">{`${activeCount} / ${totalCount}`}</Text>
    </div>
  )
})
