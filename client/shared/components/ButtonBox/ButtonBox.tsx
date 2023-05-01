import { classnames } from '@bem-react/classnames'
import { motion } from 'framer-motion'
import React, { forwardRef } from 'react'
import { Box } from 'react-polymorphic-box'

import { AS, BoxProps } from '@public/models/boxType'
import { makeCn } from '@shared/utils'

import styles from './ButtonBox.module.scss'

const cn = makeCn('ButtonBox', styles)

export interface ButtonBoxOwnProps {
  className?: string
}


const DEFAULT_ELEMENT = 'button'

export const ButtonBox = forwardRef(<E extends AS>(
  props: BoxProps<E, ButtonBoxOwnProps>,
  ref?: React.Ref<E>,
) => {
  const { className, children, ...rest } = props

  return (
    <Box ref={ref} type="button" className={classnames(cn(), className)} {...rest}>
      {children}
    </Box>
  )
})

ButtonBox.defaultProps = {
  as: DEFAULT_ELEMENT,
}

export const MButtonBox = motion(ButtonBox)
