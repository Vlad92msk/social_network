export type UserType = {
    id: string
    status?: UserStatusEnum // просто статус онлайн/ не онлайн
    connect?: Connect // данные идентификации (почта, логин, пароль, id и тд)
    personal?: Personal // Основная инф (фио, пол, город, страна и тд)
    social?: Social // Отношение с внешним миром (друзья, подписки, чаты и тд)
    progress?: Progress // Увлечения, учеба и тд
}


export enum UserStatusEnum {
    ONLINE = 'online',
    OFFLINE = 'offline'
}


export interface Connect {
    id: number
    img: string
    email: string
    password: string
    status: string
    userName: string
    roles: RoleType[]
}
/**
 * @description Роли
 * @property admin - админ
 * @property visitor - посетитель
 * @property participant - участник
 */
export enum RoleEnum {
    admin = 'admin',
    visitor = 'visitor',
    participant = 'participant',
}

export interface RoleType {
    id: number
    value: RoleEnum
    description: string
    users: UserType[]
}


export interface Personal {
    name: string
    dateOfBirth: Date
    nationality: string
    lastName: string
    patronymicName: string
    gender: string
    country: string
    city: string
}

export interface Social {
    friends: string[]
    chats: string[] // id чата (id обоих пользователей + дата создания чата)
    subscribers: string[] // мои подписчики
    subscription: string[] // на кого я подписан
}

export interface Progress {
    id: number
    hobbies: string
    placeOfStudy: string
    employment: string
    workingLanguages: string
}
