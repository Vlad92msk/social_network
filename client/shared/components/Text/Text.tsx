import { classnames } from '@bem-react/classnames'
import { motion } from 'framer-motion'
import React from 'react'
import { Box, PolymorphicComponentProps } from 'react-polymorphic-box'
import { makeCn } from '@shared/utils'
import styles from './Text.module.scss'

const cn = makeCn('Text', styles)

export type TextSize = '44' | '25' | '22' | '18' | '16' | '12' | '10' | '8'

export interface TextOwnProps {
  size?: TextSize
  textTransform?: 'uppercase'
  className?: string
}

export type TextProps<E extends React.ElementType> = PolymorphicComponentProps<E, TextOwnProps>

export const DEFAULT_TEXT_ELEMENT = 'span'

export const Text = React.forwardRef((props: TextProps<typeof DEFAULT_TEXT_ELEMENT>, ref?: React.LegacyRef<HTMLSpanElement>) => {
  const { className, size, textTransform, ...rest } = props

  return (
    <Box
      ref={ref}
      as={DEFAULT_TEXT_ELEMENT}
      className={classnames(cn({ size, textTransform }), className)}
      {...rest}
    />
  )
})

export const TextMotion = motion(Text)


Text.defaultProps = {
  size: '16',
  color: 'inherit',
} as Partial<TextOwnProps>
