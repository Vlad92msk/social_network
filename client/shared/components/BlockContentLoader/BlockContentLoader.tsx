import { classnames } from '@bem-react/classnames'
import React from 'react'
import { makeCn } from 'public/utils'
import styles from './BlockContentLoader.module.scss'

const cn = makeCn('BlockContentLoader', styles)

export interface BlockContentLoaderProps {
  isLoading?: boolean
  className?: string
  size?: 'regular' | 'small'
}

export const BlockContentLoader: React.FC<BlockContentLoaderProps> = (props) => {
  const { isLoading, className, size } = props

  if (!isLoading) return null

  return (
    isLoading && (
      <div className={classnames(cn(), className)}>
        <div className={cn('DotsContainer', { size })}>
          <div className={cn('Dot')} />
          <div className={cn('Dot')} />
          <div className={cn('Dot')} />
          <div className={cn('Dot')} />
          <div className={cn('Dot')} />
          <div className={cn('Dot')} />
          <div className={cn('Dot')} />
          <div className={cn('Dot')} />
        </div>
      </div>
    )
  )
}

BlockContentLoader.defaultProps = {
  size: 'regular',
  isLoading: true,
}
