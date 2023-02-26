import React from 'react'

import { CalendarInput } from '../CalendarInput'
import { Field, FieldProps } from '../Field'


export type CalendarFieldProps = FieldProps<typeof CalendarInput>


export const CalendarField: React.FunctionComponent<CalendarFieldProps> = (props) => (
  <Field {...props} as={CalendarInput} />
)
