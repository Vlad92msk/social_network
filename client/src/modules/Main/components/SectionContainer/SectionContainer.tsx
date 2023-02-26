import { classnames } from '@bem-react/classnames'
import React, { PropsWithChildren, ReactElement, useMemo } from 'react'
import { Icon } from '@shared/components/Icon'
import { Text } from '@shared/components/Text'
import { useRect } from '@shared/hooks'
import { createDateFormat, DateFormats, makeCn } from '@shared/utils'
import { Switch, SwitchOption } from 'src/components'
import styles from './SectionContainer.module.scss'

const cn = makeCn('SectionContainer', styles)


const visibleTypeSwitcher: SwitchOption[] = [
  { groupName: 'visibleType', value: 'all', label: 'Все' },
  { groupName: 'visibleType', value: 'albums', label: 'Альбомы' },
]

const visibleTypeSwitcherStart = visibleTypeSwitcher[0].value

interface SectionContainerProps {
  className?: string
  withSwitcher?: boolean
  title: string
  lastAdded: Date
  changeVisibleType?: (selectValue: string | number) => void
}

export const SectionContainer = (props: PropsWithChildren<SectionContainerProps>) => {
  const { title, lastAdded, className, changeVisibleType, withSwitcher, children } = props
  const [rect, contentEl] = useRect<HTMLDivElement>(['width'])

  return (
    <div className={classnames(cn(), className)}>
      <div className={cn('Title')}>
        <Text color="title" size="7" weight="bold" textTransform="uppercase">{title}</Text>
        {useMemo(() => (
          <div className={cn('Calendar')}>
            <Icon className={cn('CalendarIcon')} icon="calendar-not-filled" fill="redRose40" />
            <Text color="title" size="2">{createDateFormat(lastAdded, DateFormats.FORMAT_3)}</Text>
          </div>
        ), [lastAdded])}
        {useMemo(() => (withSwitcher
          && (
          <Switch
            onChange={changeVisibleType}
            options={visibleTypeSwitcher}
            startWith={visibleTypeSwitcherStart}
          />
          )
        ), [changeVisibleType, withSwitcher])}
      </div>
      <div className={cn('Content')} ref={contentEl}>
        {useMemo(() => React.Children.map(children, (child: ReactElement<any, string>) => React.cloneElement(child, {
          containerWidth: rect.width,
        })), [children, rect.width])}
      </div>
    </div>
  )
}

SectionContainer.defaultProps = {
  withSwitcher: true,
}
