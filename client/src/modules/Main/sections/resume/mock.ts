import { IconName } from '@public/models/icon.model'

export interface Experience {
  id: string
  dateStart: Date
  dateEnd?: Date
  responsibility: any[]
  companyName: string
  position: string
  skills: IconName[]
}
export const experienceSecondary: Experience[] = [
  {
    id: '21',
    dateStart: new Date('2018-08-06'),
    dateEnd: null,
    responsibility: [
      'Разработка интерфейсов',
      'Что еще делал',
      'Что еще делал1',
      'Что еще делал2',
      'Что еще делал3',
    ],
    companyName: 'ООО "42"',
    position: 'Главный инженер-разработчик',
    skills: ['react', 'redux'],
  },
]
export const experiencePrimary: Experience[] = [
  {
    id: '1',
    dateStart: new Date('2019-08-06'),
    dateEnd: null,
    responsibility: [
      'Разработка интерфейсов',
      'Что еще делал',
      'Что еще делал1',
      'Что еще делал2',
      'Что еще делал3',
    ],
    companyName: 'ООО "42"',
    position: 'Главный инженер-разработчик',
    skills: ['react', 'redux'],
  },
  {
    id: '2',
    dateStart: new Date('2018-08-06'),
    dateEnd: new Date('2019-09-06'),
    responsibility: [
      'Разработка интерфейсов',
      'Что еще делал',
      'Что еще делал1',
      'Что еще делал2',
      'Что еще делал3',
    ],
    companyName: 'ООО "42"',
    position: 'Главный инженер-разработчик',
    skills: ['git', 'graphql', 'nest', 'nextLS', 'postgresql', 'react', 'redux', 'rxjs', 'sass', 'typeScript'],
  },
]

export const hobbies:{id: number, name: IconName}[] = [
  { id: 1, name: 'bulb' },
  { id: 2, name: 'burger-split' },
  { id: 3, name: 'burger-dot' },
]
export type Hobie = typeof hobbies[0]

export const skills:{id: number, name: IconName}[] = [
  { id: 1, name: 'git' },
  { id: 2, name: 'graphql' },
  { id: 3, name: 'nest' },
  { id: 4, name: 'nextLS' },
  { id: 5, name: 'postgresql' },
  { id: 6, name: 'react' },
  { id: 7, name: 'redux' },
  { id: 8, name: 'rxjs' },
  { id: 9, name: 'sass' },
  { id: 10, name: 'typeScript' },
]
export type Skills = typeof skills[0]

export const contacts: {id: number, value: string, type: IconName}[] = [
  { id: 1, type: 'photo', value: '8-999-999-99-99' },
  { id: 2, type: 'eye', value: 'fvs011@yandex.ru' },
]
export type Contact = typeof contacts[0]

export interface SchoolInfo {
  id: number
  vuz: string
  profession: string
  dateStart: Date
  dateEnd: Date
}

export const schoolInfo: SchoolInfo[] = [
  { id: 1,
    vuz: 'Московский городской педагогический университет',
    profession: 'Менеджмент организации',
    dateStart: new Date('2009-01-09'),
    dateEnd: new Date('2014-01-09') },
]
