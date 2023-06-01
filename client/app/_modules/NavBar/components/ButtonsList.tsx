'use client'

import { useSearchParams } from 'next/navigation'
import { Text } from '@common'
import { ButtonBox } from '@public/components/ButtonBox'
import { Icon } from '@public/components/Icon'
import { useSetSearchParams } from '@public/hooks'
import { IconName } from '@public/types/icon.model'
import { makeCn } from '@public/utils'
import styles from '../NavBar.module.scss'

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
  const searchParams = useSearchParams()
  const createQueryString = useSetSearchParams()

  return (
    <div className={cn()}>
      {buttons.map(({ id, title, icon }) => {
        const isActive = searchParams.get('folder') === icon

        return (
          <ButtonBox
            key={id}
            as="a"
            className={cn('Button', { active: isActive })}
            onClick={() => {
              createQueryString('folder', icon)
            }}
          >
            <Icon className={cn('ButtonIcon')} icon={icon} />
            <Text className={cn('ButtonText')}>{title}</Text>
          </ButtonBox>
        )
      })}
    </div>
  )
}
