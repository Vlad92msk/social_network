import { classnames } from '@bem-react/classnames'
import { PropsWithChildren } from 'react'
import { Popup, PopupPosition } from '@public/components/Popup'
import { Icon } from 'public/components/Icon'
import { makeCn } from 'public/utils'
import styles from './MenuList.module.scss'

const cn = makeCn('MenuList', styles)

interface MenuListProps extends PropsWithChildren {
    className?: string
    classNameButton?: string
    position?: PopupPosition
}

export const MenuList = (props: MenuListProps) => {
  const { className, position, classNameButton, children } = props
  return (
    <Popup state={{ position, withDefaultArrow: true, isClickOutside: true, behavior: 'fixed' }}>
      <Popup.Button className={classnames(cn('Button'), classNameButton)}>
        <Icon icon="more-vertical" />
      </Popup.Button>
      <Popup.Content className={classnames(cn('Content'), className)}>
        {children}
      </Popup.Content>
    </Popup>
  )
}
