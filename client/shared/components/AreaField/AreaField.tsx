import React from 'react'

import { AreaInput } from '../AreaInput'
import { Field, FieldProps } from '../Field'


export type AreaFieldProps = FieldProps<typeof AreaInput>


export const AreaField = (props: AreaFieldProps) => (
  <Field {...props} as={AreaInput} />
)
