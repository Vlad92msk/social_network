import React, { useEffect } from 'react'
import { Control, useController, useFormContext, UseFormUnregister } from 'react-hook-form'
import { RegisterOptions } from 'react-hook-form/dist/types/validator'

export declare interface IControlInputEasy {
  control?: Control<any>
  name: string
  rules?: RegisterOptions
  defaultValue?: any
  unregister?: UseFormUnregister<any> | boolean
}

export interface ControlInputEasyProps extends IControlInputEasy {
  Input: React.FC
}

export const ControlInputEasy: React.FC<ControlInputEasyProps> = (props) => {
  const {
    control, name, rules, defaultValue, unregister, Input, ...restProps
  } = props

  // const { unregister: unregisterContext } = (useFormContext() || {});
  const { field: { ref, ...field } } = useController({ control, name, rules, defaultValue })

  /**
   * Ресет инпута при демонтировании
   */
  // useEffect(() => () => {
  //   if (unregister) {
  //     if (typeof unregister === 'function') unregister(name);
  //     else if (unregisterContext) unregisterContext(name);
  //   }
  // }, [name, unregister, unregisterContext]);

  // @ts-ignore
  return <Input {...field} {...restProps} />
}
