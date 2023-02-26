import { classnames } from '@bem-react/classnames'
import React from 'react'
import { Box, PolymorphicComponentProps } from 'react-polymorphic-box'
import { makeCn } from '@shared/utils'
import styles from './Text.module.scss'

const cn = makeCn('Text', styles)

export type TextSize = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8'
export type TextColor = 'inherit' | 'body' | 'title' | 'note' | 'disabled' | 'red'

export interface TextOwnProps {
  size?: TextSize
  weight?: 'regular' | 'medium' | 'bold'
  color?: TextColor
  textTransform?: 'uppercase'
  className?: string
  children?: any
}

export type TextProps<E extends React.ElementType> = PolymorphicComponentProps<E, TextOwnProps>

const DEFAULT_ELEMENT = 'span'

export const Text = <E extends React.ElementType = typeof DEFAULT_ELEMENT>(props: TextProps<E>): JSX.Element => {
  const { className, size, weight, color, textTransform, ...rest } = props

  return <Box as={DEFAULT_ELEMENT} className={classnames(cn({ size, weight, color, textTransform }), className)} {...rest} />
}

Text.defaultProps = {
  className: null,
  size: '3',
  weight: 'regular',
  color: 'inherit',
} as Partial<TextOwnProps>
