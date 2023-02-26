import { classnames } from '@bem-react/classnames'
import React, { useCallback, useContext } from 'react'
import { Box, PolymorphicComponentProps } from 'react-polymorphic-box'
import { IconName } from '@public/models/icon.model'
import { Icon } from '@shared/components/Icon'
import { Text, TextSize } from '@shared/components/Text'


import { cn } from './cn'
import { Context } from './Context'

export interface MenuListItemOwnProps {
  className?: string;
  icon?: IconName;
  size?: TextSize;
  text?: string;
  active?: boolean;
  children?: React.ReactNode | React.ReactNode[];
  onClick?: (e?: React.MouseEvent) => void;
  disabled?: boolean;
}

export type MenuListItemProps<E extends React.ElementType> = PolymorphicComponentProps<E, MenuListItemOwnProps>;

const DEFAULT_ELEMENT = 'button'

export const MenuListItem = <E extends React.ElementType = typeof DEFAULT_ELEMENT> (props: MenuListItemProps<E>): JSX.Element => {
  const {
    className,
    icon,
    size,
    text,
    active,
    onClick,
    children,
    disabled,
    ...rest
  } = props

  const { onCloseMenu } = useContext(Context)

  const handleClick = useCallback((e: React.MouseEvent) => {
    onCloseMenu()
    if (onClick) {
      onClick(e)
    }
  }, [onClick, onCloseMenu])

  return (
    <Box as="button" className={classnames(cn('Item', { active, disabled }), className)} onClick={handleClick} {...rest}>
      {icon && <Icon className={cn('ItemIcon')} icon={icon} />}
      <Text size={size}>
        {text}
        {children}
      </Text>
    </Box>
  )
}

MenuListItem.defaultProps = {
  className: null,
}
