import { classnames } from '@bem-react/classnames'
import React from 'react'
import { Flex } from '@public/components/Flex'
import { Icon } from '@public/components/Icon'
import { IconButton } from '@public/components/IconButton'
import { Callback } from '@public/types/callback'
import { IconName } from '@public/types/icon.model'
import { RefType } from '@public/types/refType'
import { cn } from './cn'
import { InputText, InputTextProps } from './InputText'


export interface InputTextModProps extends InputTextProps {
  icon?: IconName
  iconClassName?: string
  iconPosition?: 'left' | 'right'
  clearIcon?: IconName
  onClear?: Callback
  clearIconClassName?: string
}

export const InputTextMod = React.forwardRef((props: InputTextModProps, ref?: RefType<HTMLInputElement>) => {
  const {
    icon, iconClassName, iconPosition, clearIcon, onClear, clearIconClassName, ...rest
  } = props

  return (
    <Flex
      className={cn('TextIconContainer')}
      align="center"
      direction={iconPosition === 'left' ? 'row' : 'row-reverse'}
    >
      {icon && <Icon icon={icon} className={classnames(cn('Icon'), iconClassName)} />}
      <InputText ref={ref} {...rest} />
      {onClear && (
        <IconButton
          className={classnames(cn('IconClear'), clearIconClassName)}
          icon={clearIcon!}
          onClick={onClear}
        />
      )}
    </Flex>
  )
})

InputTextMod.defaultProps = {
  iconPosition: 'left',
  clearIcon: 'close',
}
