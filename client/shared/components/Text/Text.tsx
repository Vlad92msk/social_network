import { classnames } from '@bem-react/classnames'
import { motion } from 'framer-motion'
import React, { forwardRef } from 'react'
import { Box } from 'react-polymorphic-box'
import { AS, BoxProps } from '@public/models/boxType'
import { makeCn } from '@shared/utils'
import styles from './Text.module.scss'

const cn = makeCn('Text', styles)

export type TextSize = '44' | '25' | '22' | '18' | '16' | '12' | '10' | '8'

export interface TextOwnProps {
  size?: TextSize
  textTransform?: 'uppercase'
  className?: string
}


export const Text = forwardRef(<E extends AS>(
  props: BoxProps<E, TextOwnProps>,
  ref?: React.Ref<E>,
) => {
  const { className, size, textTransform, ...rest } = props

  return (
    <Box
      ref={ref}
      className={classnames(cn({ size, textTransform }), className)}
      {...rest}
    />
  )
})

export const TextMotion = motion(Text)


Text.defaultProps = {
  size: '16',
  color: 'inherit',
  as: 'span',
} as Partial<TextOwnProps>
