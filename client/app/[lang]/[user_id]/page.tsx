// async function getProjects() {
//   return await initializeApollo().query({ query: GetUserInfoDocument, variables: { id: 1 } })
// }

import { transform } from 'lodash'
import { ReactNode } from 'react'
import { Main, NotAvailablePage } from '@modules'
import { Photo } from './_components/Photo/Photo'
import { Video } from './_components/Video/Video'
import { NAV_LIST, NavListItem } from '../../../src/data/navigation'
import { authGuardServer } from '../../_utils/authGuardServer'

interface NavListWithComponent extends NavListItem {
  component: ReactNode
}

export interface UserPageUrlParams {
  lang: 'ru',
  user_id: string
  searchParams: Record<string, any>
}


const navListWithComponent = transform(NAV_LIST, (acc, value, key: keyof typeof NAV_LIST) => {
  acc[key] = {
    ...value,
    component: key === 'home'
      ? (<div>home</div>)
      : key === 'video' ? <Video />
        : key === 'photo' ? <Photo />
          : key === 'settings' ? <div>settings</div>
            : key === 'message-square' ? <div>message</div>
              : key === 'clock-not-filled' ? <div>calendar</div>
                : <div>some component</div>,
  }
}, {} as NavListWithComponent)


export interface UserProps {
  searchParams: {
    folder: keyof typeof NAV_LIST
  }
  params: UserPageUrlParams
}

const User = async (props: UserProps) => {
  const { folder } = props.searchParams
  const available = await authGuardServer({ ...props.params })

  if (!available) return <NotAvailablePage />
  return (
    <Main>
      {navListWithComponent[folder]?.component || <div>main info</div>}
    </Main>
  )
}


export default User
