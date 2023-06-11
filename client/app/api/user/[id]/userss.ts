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
     chats: ChatUuid[]
     subscribers: Uuid[]
     subscription: Uuid[]
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


export type UserType = {
    id?: string
    uuid: Uuid
    img?: string
    name?: string
    status?: UserStatusEnum
    connect?: ConnectEntity
    personal?: PersonalEntity
    social?: SocialEntity
    progress?: ProgressEntity
}

export const users: UserType[] = [
  // Ваш профиль
  {
    id: '1',
    uuid: uuidv4(),
    img: 'image1.jpg',
    name: 'Ваше Имя',
    status: UserStatusEnum.ONLINE,
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
      chats: [],
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
      chats: [],
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
  users[0].social?.friends.push(users[i].uuid)
  users[i].social?.friends.push(users[0].uuid)
}

// Добавляем чаты для первого пользователя
for (let i = 1; i < 6; i++) {
  const chatUuid = uuidv4()
  users[0].social?.chats.push(chatUuid)
  users[i].social?.chats.push(chatUuid)
}

// Добавляем подписчиков и подписки для первого пользователя
for (let i = 6; i < 11; i++) {
  users[0].social?.subscribers.push(users[i].uuid)
  users[0].social?.subscription.push(users[i].uuid)
}
