import { classnames } from '@bem-react/classnames'
import React from 'react'
import { Flex } from '@public/components/Flex'
import { Icon } from '@public/components/Icon'
import { IconName } from '@public/types/icon.model'
import { RefType } from '@public/types/refType'
import { cn } from './cn'
import { InputText, InputTextProps } from './InputText'


export interface InputTextModProps extends InputTextProps {
  icon?: IconName
  iconClassName?: string
  iconPosition?: 'left' | 'right'
}

export const InputTextMod = React.forwardRef((props: InputTextModProps, ref?: RefType<HTMLInputElement>) => {
  const { icon, iconClassName, iconPosition, ...rest } = props

  return (
    <Flex
      className={cn('TextIconContainer')}
      align="center"
      direction={iconPosition === 'left' ? 'row' : 'row-reverse'}
    >
      {icon && <Icon icon={icon} className={classnames(cn('Icon'), iconClassName)} />}
      {/* @ts-ignore */}
      <InputText ref={ref} {...rest} />
    </Flex>
  )
})

InputTextMod.defaultProps = {
  iconPosition: 'left',
}