import { classnames } from '@bem-react/classnames'
import React from 'react'
import { makeCn, rem } from '@public/utils'
import styles from './Flex.module.scss'

const cn = makeCn('Flex', styles)

export interface FieldRowProps {
  children: React.ReactNode | React.ReactNode[]
  className?: string
  align?: 'flex-start' | 'flex-end' | 'center'
  justify?: 'flex-start' | 'center' | 'space-between' | 'space-around' | 'flex-end'
  content?: 'flex-start' | 'center' | 'space-between' | 'space-around' | 'flex-end'
  wrap?: 'wrap' | 'nowrap'
  direction?: 'row' | 'column' | 'column-reverse' | 'row-reverse'
  style?: React.CSSProperties
  gap?: number
  width?: number
}

export const Flex = (props: FieldRowProps) => {
  const {
    children, className, align, content, justify, wrap, direction, style, gap, width,
  } = props

  return (
    <div
      className={classnames(cn(), className)}
      style={{
        ...style,
        alignItems: align,
        justifyContent: justify,
        flexDirection: direction,
        alignContent: content,
        flexWrap: wrap,
        gap: rem(gap),
        width: width && `${width}%`,
      }}
    >
      {children}
    </div>
  )
}