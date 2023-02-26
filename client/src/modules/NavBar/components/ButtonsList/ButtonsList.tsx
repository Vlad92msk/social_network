import { useCallback, useState } from 'react'
import { IconName } from '@public/models/icon.model'
import { ButtonBox } from '@shared/components/ButtonBox'
import { Icon } from '@shared/components/Icon'
import { Text } from '@shared/components/Text'
import { makeCn } from '@shared/utils'
import styles from './ButtonsList.module.scss'

const cn = makeCn('ButtonsList', styles)

interface ButtonListItem{
  id: number
  title: string
  icon: IconName
}

const buttons: ButtonListItem[] = [
  {
    id: 1,
    title: 'Домой',
    icon: 'home',
  },
  {
    id: 2,
    title: 'Фото',
    icon: 'photo',
  },
  {
    id: 3,
    title: 'Видео',
    icon: 'video',
  },
  {
    id: 4,
    title: 'Чаты',
    icon: 'message-square',
  },
  {
    id: 5,
    title: 'Календарь',
    icon: 'clock-not-filled',
  },
  {
    id: 6,
    title: 'Настройки',
    icon: 'settings',
  },
]

export const ButtonsList = () => {
  const [active, setActive] = useState(1)

  return (
    <div className={cn()}>
      {buttons.map(({ id, title, icon }) => (
        <ButtonBox key={id} className={cn('Button', { active: id === active })} onClick={() => setActive(id)}>
          <Icon className={cn('ButtonIcon')} icon={icon} size="small_1" />
          <Text className={cn('ButtonText')}>{title}</Text>
        </ButtonBox>
      ))}
    </div>
  )
}
