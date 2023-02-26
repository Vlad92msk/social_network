import React from 'react'
import { ControlInput, IControlInput } from '@shared/components/ControlInput'
import { Textarea, TextareaProps } from './Textarea'


export type TextareaControlProps = Partial<TextareaProps> & IControlInput;

export const TextareaControl: React.FC<TextareaControlProps> = (props) => (
  <ControlInput Input={Textarea} {...props} />
)
