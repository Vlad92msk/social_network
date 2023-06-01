import React, { useCallback, useMemo } from 'react'
import { ButtonBox } from '@public/components/ButtonBox'
import { Icon, IconProps } from '@public/components/Icon'
import { IconName } from '@public/types/icon.model'
import { makeCn, classNames } from '@public/utils'
import styles from './IconCount.module.scss'
import { Text, TextOwnProps } from '../Text'


const cn = makeCn('IconCount', styles)

interface IconCountProps {
  options?: {
    icon?: Omit<IconProps, 'icon' | 'onClick'>
    text?: TextOwnProps
  }
  icon: IconName
  countBcg?: 'message' | 'other'
  isButton?: boolean
  onClick?: (item?: Record<string, any>) => void
  value: number
  item?: Record<string, any>
}

export const IconCount: React.FC<IconCountProps> = (props) => {
  const {
    value, isButton, onClick, icon, options, item, countBcg,
  } = props
  // @ts-ignore
  const { icon: iconOptions, text: textOptions } = options

  const handleClick = useCallback((e) => {
    e.stopPropagation()
    onClick?.(item)
  }, [item, onClick])

  const children = useMemo(() => (
    <>
      <Icon icon={icon} {...iconOptions} />
      <Text
        className={cn('Count', { visible: Boolean(value), bcg: countBcg })}
        {...textOptions}
      >
        {value > 9 ? '+9' : value}
      </Text>
    </>
  ), [icon, iconOptions, value, countBcg, textOptions])

  return isButton ? (
    <ButtonBox
      className={cn({ visible: Boolean(value) })}
      onClick={handleClick}
    >
      {children}
    </ButtonBox>
  ) : (
    <div className={cn({ visible: Boolean(value) })}>
      {children}
    </div>
  )
}

IconCount.defaultProps = {
  isButton: false,
  countBcg: 'message',
  options: {
    text: {
      size: '12',
    },
  },
}
