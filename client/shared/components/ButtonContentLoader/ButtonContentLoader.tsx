import { classnames } from '@bem-react/classnames'
import React from 'react'

import { makeCn } from '@shared/utils'
import styles from './ButtonContentLoader.module.scss'

const cn = makeCn('ButtonContentLoader', styles)


export interface ButtonContentLoaderProps {
  className?: string
  isLoading?: boolean
  color?: 'blue'
}

export const ButtonContentLoader: React.FC<ButtonContentLoaderProps> = (props) => {
  const { className, isLoading, color } = props

  if (!isLoading) return null

  return (
    <div className={classnames(cn({ color }), className)}>
      <div className={cn('Ring')} />
      <div className={cn('Ring')} />
      <div className={cn('Ring')} />
      <div className={cn('Ring')} />
    </div>
  )
}

ButtonContentLoader.defaultProps = {
  className: null,
  isLoading: true,
}
