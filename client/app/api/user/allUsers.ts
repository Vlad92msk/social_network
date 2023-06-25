// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 as uuidv4 } from 'uuid'


 enum UserStatusEnum {
    ONLINE = 'online',
    OFFLINE = 'offline'
}

export enum RoleEnum {
     admin = 'admin',
     visitor = 'visitor',
     participant = 'participant',
 }

type Uuid = string
type ChatUuid = string

export interface SocialEntity {
     friends: Uuid[]
     privateChat: ChatUuid[]
     groupChat: ChatUuid[]
     subscription: Uuid[]
     subscribers: Uuid[]
 }

export interface ConnectEntity {
     id: string
     email: string
     uuid: Uuid
     roles: RoleEnum[]
 }

export interface PersonalEntity {
    uuid: Uuid
     name: string
     dateOfBirth: Date
     nationality: string
     lastName: string
     patronymicName: string
     gender: string
     country: string
     city: string
 }

export interface ProgressEntity {
     id: string
     uuid: Uuid
     hobbies: string
     placeOfStudy: string
     employment: string
     workingLanguages: string
 }

export type PrivatePolicy = {
    blocked: {
        friends: string[]
    }
}

export type UserType = {
    id?: string
    uuid: Uuid
    image?: string
    name?: string
    status?: UserStatusEnum
    connect?: ConnectEntity
    personal?: PersonalEntity
    social?: SocialEntity
    progress?: ProgressEntity
    privatePolicy?: PrivatePolicy
}

export const allUsers: UserType[] = [
  // Ваш профиль
  {
    id: '1',
    uuid: uuidv4(),
    image: 'image1.jpg',
    name: 'Ваше Имя',
    status: UserStatusEnum.ONLINE,
    privatePolicy: {
      blocked: {
        friends: [],
      },
    },
    connect: {
      id: '1',
      email: 'youremail@example.com',
      uuid: uuidv4(),
      roles: [RoleEnum.admin],
    },
    personal: {
      uuid: uuidv4(),
      name: 'Ваше Имя',
      dateOfBirth: new Date(1990, 1, 1), // или любая другая дата
      nationality: 'Русский',
      lastName: 'Ваша Фамилия',
      patronymicName: 'Ваше Отчество',
      gender: 'Мужской',
      country: 'Россия',
      city: 'Москва',
    },
    social: {
      friends: [],
      privateChat: [],
      groupChat: [],
      subscribers: [],
      subscription: [],
    },
    progress: {
      id: '1',
      uuid: uuidv4(),
      hobbies: 'программирование, чтение',
      placeOfStudy: 'МГУ',
      employment: 'OpenAI',
      workingLanguages: 'JavaScript, TypeScript',
    },
  },
  // Другие пользователи
  // Для генерации более реалистичных данных используйте какой-либо API или библиотеку, например, faker.js
  // Здесь для простоты используем простые строки и случайные числа
  ...Array(20).fill(null).map((_, i) => ({
    id: (i + 2).toString(),
    uuid: uuidv4(),
    img: `image${i + 2}.jpg`,
    name: `User ${i + 2}`,
    status: i % 2 === 0 ? UserStatusEnum.ONLINE : UserStatusEnum.OFFLINE,
    privatePolicy: {
      blocked: {
        friends: [],
      },
    },
    connect: {
      id: (i + 2).toString(),
      email: `user${i + 2}@example.com`,
      uuid: uuidv4(),
      roles: [RoleEnum.visitor],
    },
    personal: {
      uuid: uuidv4(),
      name: `User ${i + 2}`,
      dateOfBirth: new Date(1990 + i, 1, 1),
      nationality: 'Русский',
      lastName: `Lastname ${i + 2}`,
      patronymicName: `Patronymic ${i + 2}`,
      gender: i % 2 === 0 ? 'Мужской' : 'Женский',
      country: 'Россия',
      city: 'Москва',
    },
    social: {
      friends: [],
      privateChat: [],
      groupChat: [],
      subscribers: [],
      subscription: [],
    },
    progress: {
      id: (i + 2).toString(),
      uuid: uuidv4(),
      hobbies: 'программирование, чтение',
      placeOfStudy: 'МГУ',
      employment: 'OpenAI',
      workingLanguages: 'JavaScript, TypeScript',
    },
  })),
]

// Добавляем друзей для первого пользователя
for (let i = 1; i < 6; i++) {
  allUsers[0].social?.friends.push(allUsers[i].uuid)
  allUsers[i].social?.friends.push(allUsers[0].uuid)
}

// Добавляем UUID для приватных чатов в профили пользователей
for (let i = 1; i < 11; i++) {
  const chatUuid = uuidv4()
  allUsers[0].social?.privateChat.push(chatUuid)
  allUsers[i].social?.privateChat.push(chatUuid)
}

// Добавляем подписчиков и подписки для первого пользователя
for (let i = 6; i < 11; i++) {
  allUsers[0].social?.subscribers.push(allUsers[i].uuid)
  allUsers[0].social?.subscription.push(allUsers[i].uuid)
}

// Добавляем блокированных пользователей для первого пользователя
for (let i = 11; i < 16; i++) {
  allUsers[0].privatePolicy?.blocked.friends.push(allUsers[i].uuid)
}

// Создаем UUID для групповых чатов и добавляем их в профили пользователей
for (let i = 1; i < 11; i++) {
  const chatUuid = uuidv4()
  allUsers[0].social?.groupChat.push(chatUuid)
  allUsers[i].social?.groupChat.push(chatUuid)
}
