import { classnames } from '@bem-react/classnames'
import { PropsWithChildren } from 'react'
import { Icon } from '@shared/components/Icon'
import { Popup } from '@shared/components/Popup'
import { PopupPosition } from '@shared/components/Popup/context/initialState'
import { makeCn } from '@shared/utils'
import styles from './MenuList.module.scss'

const cn = makeCn('MenuList', styles)

interface MenuListProps extends PropsWithChildren {
    className?: string
    position?: PopupPosition
}

export const MenuList = (props: MenuListProps) => {
  const { className, position, children } = props

  return (
    <Popup state={{ position, withDefaultArrow: true, isClickOutside: true }}>
      <Popup.Button className={cn('Button')}>
        <Icon icon="more-vertical" />
      </Popup.Button>
      <Popup.Content className={classnames(cn('Content'), className)}>
        {children}
      </Popup.Content>
    </Popup>
  )
}
