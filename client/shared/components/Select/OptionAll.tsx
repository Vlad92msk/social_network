import { classnames } from '@bem-react/classnames'
import React, { useCallback, useContext } from 'react'
import { Checkbox } from '@shared/components/Checkbox'
import { Text } from '@shared/components/Text'

import { cn } from './cn'
import { Context } from './Context'
import { OptionValue } from './model'


export interface OptionAllProps {
  className?: string;
  disabled?: boolean;
}

export const OptionAll: React.FC<OptionAllProps> = (props) => {
  const { className, disabled } = props

  const { selectValue, name, onChange, tokenfield, optionValues } = useContext(
    Context,
  )

  const handleSelectAll = useCallback(() => {
    if (disabled) return

    if ((optionValues?.length === (selectValue as OptionValue[])?.length)) {
      onChange([], name)
      return
    }
    onChange(optionValues, name)
  }, [name, disabled, onChange, optionValues, selectValue])

  return (
    <Text
      as="li"
      className={classnames(cn('Option', { disabled }), className)}
      onClick={handleSelectAll}
      color={disabled ? 'disabled' : 'body'}
    >
      {tokenfield === 'check' && (
        <Checkbox
          className={cn('OptionCheckbox')}
          value={
            optionValues?.length === (selectValue as OptionValue[])?.length
          }
        />
      )}
      Выбрать всё
    </Text>
  )
}

OptionAll.defaultProps = {
  className: null,
}
