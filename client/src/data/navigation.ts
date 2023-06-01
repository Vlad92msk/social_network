import { IconName } from '@public/types/icon.model'


export interface NavListItem {
    id: number
    title: string
    icon: IconName
}

export const NAV_LIST: Record<string, NavListItem> = {
  home: {
    id: 1,
    title: 'Домой',
    icon: 'home',
  },
  photo: {
    id: 2,
    title: 'Фото',
    icon: 'photo',
  },
  video: {
    id: 3,
    title: 'Видео',
    icon: 'video',
  },
  'message-square': {
    id: 4,
    title: 'Чаты',
    icon: 'message-square',
  },
  'clock-not-filled': {
    id: 5,
    title: 'Календарь',
    icon: 'clock-not-filled',
  },
  settings: {
    id: 6,
    title: 'Настройки',
    icon: 'settings',
  },
}
