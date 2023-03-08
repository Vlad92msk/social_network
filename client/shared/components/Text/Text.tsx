import { classnames } from '@bem-react/classnames'
import React from 'react'
import { Box, PolymorphicComponentProps } from 'react-polymorphic-box'
import { makeCn } from '@shared/utils'
import styles from './Text.module.scss'

const cn = makeCn('Text', styles)

export interface TextOwnProps {
  textTransform?: 'uppercase'
  className?: string
  children?: any
}

export type TextProps<E extends React.ElementType> = PolymorphicComponentProps<E, TextOwnProps>

const DEFAULT_ELEMENT = 'span'

export const Text = (props: TextProps<React.ElementType>) => {
  const { className, textTransform, ...rest } = props

  return <Box as={DEFAULT_ELEMENT} className={classnames(cn({ textTransform }), className)} {...rest} />
}
