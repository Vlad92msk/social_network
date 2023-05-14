import { classnames } from '@bem-react/classnames'
import React from 'react'
import { DEFAULT_TEXT, Text as TextBase, TextProps } from '@public/components/Text'
import { AS, BoxProps } from '@public/types/boxType'
import { makeCn } from '@public/utils'
import styles from './Text.module.scss'

const cn = makeCn('Text', styles)

export type TextSize = '44' | '25' | '22' | '18' | '16' | '12' | '10' | '8'

export interface TextOwnProps extends TextProps {
    size?: TextSize
    ellipsis?: boolean
}

export const Text = <E extends AS = typeof DEFAULT_TEXT>(props: BoxProps<E, TextOwnProps>) => {
  const { className, size, ellipsis, ...rest } = props

  return (
    <TextBase
      className={classnames(cn({ size, ellipsis }), className)}
      {...rest}
    />
  )
}


Text.defaultProps = {
  size: '16',
} as TextOwnProps
