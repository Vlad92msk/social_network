import React, { useCallback, useMemo } from 'react'
import { IconName } from '@public/models/icon.model'
import { ButtonBox } from '@shared/components/ButtonBox'
import { Icon, IconProps } from '@shared/components/Icon'
import { Text, TextProps } from '@shared/components/Text'
import { makeCn } from '@shared/utils'
import styles from './IconCount.module.scss'


const cn = makeCn('IconCount', styles)

interface IconCountProps {
  options?: {
    icon?: Omit<IconProps, 'icon' | 'onClick'>
    text?: TextProps<React.ElementType>
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
    icon: {
      size: 'small_1',
      fill: 'oldAsphalt40',
    },
    text: {
      size: '1',
    },
  },
}
