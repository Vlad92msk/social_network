import React, { ButtonHTMLAttributes, forwardRef, PropsWithChildren } from 'react'
import { Box } from 'react-polymorphic-box'

import { AS, BoxProps } from '@public/types/boxType'
import { RefType } from '@public/types/refType'
import { classNames, makeCn } from '@public/utils'

import styles from './ButtonBox.module.scss'

const cn = makeCn('ButtonBox', styles)

export interface ButtonBoxOwnProps extends PropsWithChildren {
  className?: string
}

const DEFAULT_BUTTON_BOX: AS = 'div'

export const ButtonBox = forwardRef(<E extends AS, >(props: BoxProps<E, ButtonBoxOwnProps & ButtonHTMLAttributes<E>>, ref?: RefType<ButtonHTMLAttributes<E>>) => {
  const { className, children, ...rest } = props

  return (
    <Box type="button" className={classNames(cn(), className)} {...rest} ref={ref}>
      {children}
    </Box>
  )
})

ButtonBox.displayName = 'buttonBox'
ButtonBox.defaultProps = {
  as: DEFAULT_BUTTON_BOX,
}
