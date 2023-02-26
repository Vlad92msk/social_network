import React from 'react'

import { Field, FieldProps } from '../Field'
import { TextInput } from '../TextInput'


export type TextFieldProps = FieldProps<typeof TextInput>


export const TextField: React.FunctionComponent<TextFieldProps> = (props) => (
  <Field {...props} as={TextInput} />
)
