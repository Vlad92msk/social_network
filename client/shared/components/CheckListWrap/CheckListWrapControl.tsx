import React from 'react'
import { ControlInputEasy, IControlInputEasy } from '@shared/components/ControlInput'
import { CheckListWrap, CheckListWrapProps } from './CheckListWrap'


export type CheckListWrapControlProps = Partial<CheckListWrapProps> & IControlInputEasy;

export const CheckListWrapControl: React.FC<CheckListWrapControlProps> = (props) => (
  <ControlInputEasy Input={CheckListWrap} {...props} />
)
