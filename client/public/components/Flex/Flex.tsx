import { classnames } from '@bem-react/classnames'
import React, { HTMLAttributes } from 'react'
import { RefType } from '@public/types/refType'
import { makeCn, rem } from '@public/utils'
import styles from './Flex.module.scss'

const cn = makeCn('Flex', styles)

export interface FieldRowProps extends HTMLAttributes<HTMLDivElement> {
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

export const Flex = React.forwardRef((props: FieldRowProps, ref?: RefType<HTMLDivElement>) => {
  const {
    children, className, align, content, justify, wrap, direction, style, gap, width, ...rest
  } = props

  return (
    <div
      ref={ref}
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
      {...rest}
    >
      {children}
    </div>
  )
})
