import { classnames } from '@bem-react/classnames'
import React from 'react'
import { Text, TextSize } from '@shared/components/Text'
import { makeCn } from '@shared/utils'

import styles from './FieldSet.module.scss'


const cn = makeCn('FieldSet', styles)


export interface FieldSetProps {
  children: React.ReactNode | React.ReactNode[]
  className?: string
  size?: TextSize
  label: string
}


export const FieldSet: React.FunctionComponent<FieldSetProps> = (props) => {
  const { children, className, label, size } = props

  return (
    <fieldset className={classnames(cn(), className)}>
      <Text as="legend" className={cn('Label')} size={size}>{label}</Text>
      {children}
    </fieldset>
  )
}


FieldSet.defaultProps = {
  className: null,
  size: '4',
}
