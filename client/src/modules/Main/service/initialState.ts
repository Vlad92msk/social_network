import { ImagePath } from '@shared/components/Image'
import {
  Contact, contacts, Experience, experiencePrimary, experienceSecondary, hobbies, Hobie, schoolInfo, SchoolInfo, Skills, skills,
} from '../sections/resume/mock'

export interface StateModule {
  resume: {
    withMe: {
      userPhoto: ImagePath
      userName: string
      position: string
    },
    contacts: Contact[]
    hobbies: Hobie[]
    experienceAndSkills: {
      experiencePrimary: Experience[]
      experienceSecondary: Experience[]
      skills: Skills []
    },
    school: SchoolInfo[],
  }
}

export type ResumeModel = StateModule['resume']

export const initialState: StateModule = {
  resume: {
    withMe: {
      userPhoto: {
        moduleName: 'users',
        folder: 'photo',
        img: '1',
      },
      userName: 'Фирсов Влад',
      position: 'Frontend-разработчик',
    },
    contacts,
    experienceAndSkills: {
      skills,
      experiencePrimary,
      experienceSecondary,
    },
    school: schoolInfo,
    hobbies,
  },
}
