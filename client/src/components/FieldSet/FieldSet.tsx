import { classnames } from '@bem-react/classnames'
import React from 'react'
import { makeCn } from '@public/utils'

import styles from './FieldSet.module.scss'
import { Text, TextOwnProps } from '../Text'


const cn = makeCn('FieldSet', styles)


export interface FieldSetProps {
  children: React.ReactNode | React.ReactNode[]
  className?: string
  textLegendProps?: TextOwnProps
  label: string
}


export const FieldSet = (props: FieldSetProps) => {
  const { children, className, label, textLegendProps } = props

  return (
    <fieldset className={classnames(cn(), className)}>
      <Text
        as="legend"
        className={classnames(cn('Label'), textLegendProps?.className)}
        {...textLegendProps}
      >
        {label}
      </Text>
      {children}
    </fieldset>
  )
}
