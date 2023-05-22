export enum UserStatusEnum {
  ONLINE = 'online',
  OFFLINE = 'offline'
}

export type BaseInformation = {
  city?: string
  country?: string
  dateOfBirth?: string
  gender?: string
  placeOfStudy?: string
  placeOfWork?: string
  languageProficiency?: string
}

export type ProfessionalInformation = {
  profession?: string
  experience?: string
}

export type UserType = {
  id?: string
  description?: string
  img?: string
  hashName?: string
  name?: string
  family?: string
  status?: UserStatusEnum
  friends?: number[]
  baseInformation?: BaseInformation
  professionalInformation?: ProfessionalInformation
}

export const USER: UserType = {
  id: '1',
  description: 'dwedwed dwedwed dwedwed dwedwed dwedwed dwedwe ddwedwed dwedwe ddwedweddw edwed dwed dwedwedwe dewedewdf jved jdgewiougd kehodigwef lewihofidwe weihfiwe weihfiwe fwelihfwe fweoifoiwehf wedwed',
  img: 'ava1',
  hashName: 'firsovv',
  name: 'Vlad',
  family: 'Firsov',
  status: UserStatusEnum.ONLINE,
  friends: [1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  baseInformation: {
    city: 'Москва',
    country: 'Россия',
    dateOfBirth: '02.07.1992',
    gender: 'm',
    placeOfStudy: 'МГПУ',
    placeOfWork: 'ООО "42"',
    languageProficiency: 'ru',
  },
  professionalInformation: {
    profession: 'frontend-developer',
    experience: '2 года',
  },
}
