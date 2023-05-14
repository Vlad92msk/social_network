import { classnames } from '@bem-react/classnames'
import React from 'react'
import { Text, TextSize } from 'src/components/Text'
import { makeCn } from 'public/utils'

import styles from './FieldSet.module.scss'


const cn = makeCn('FieldSet', styles)


export interface FieldSetProps {
  children: React.ReactNode | React.ReactNode[]
  className?: string
  size?: TextSize
  label: string
}


export const FieldSet = (props: FieldSetProps) => {
  const { children, className, label, size } = props

  return (
    <fieldset className={classnames(cn(), className)}>
      <Text as="legend" className={cn('Label')} size={size}>{label}</Text>
      {children}
    </fieldset>
  )
}
