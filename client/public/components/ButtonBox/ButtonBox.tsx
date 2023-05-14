import { classnames } from '@bem-react/classnames'
import { motion } from 'framer-motion'
import React, { forwardRef, PropsWithChildren } from 'react'
import { Box } from 'react-polymorphic-box'

import { AS, BoxProps } from '@public/types/boxType'
import { RefType } from '@public/types/refType'
import { makeCn } from '@public/utils'

import styles from './ButtonBox.module.scss'

const cn = makeCn('ButtonBox', styles)

export interface ButtonBoxOwnProps extends PropsWithChildren {
  className?: string
}

const DEFAULT_BUTTON_BOX: AS = 'button'

export const ButtonBox = <E extends AS = typeof DEFAULT_BUTTON_BOX>(props: BoxProps<E, ButtonBoxOwnProps>) => {
  const { className, children, ...rest } = props

  return (
    <Box type="button" className={classnames(cn(), className)} {...rest}>
      {children}
    </Box>
  )
}

ButtonBox.defaultProps = {
  as: DEFAULT_BUTTON_BOX,
}

export const ButtonBoxMotion = motion(forwardRef((props: BoxProps<any, ButtonBoxOwnProps>, ref: RefType<any>) => (
  <ButtonBox {...props} ref={ref} />
)))
