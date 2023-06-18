// async function getProjects() {
//   return await initializeApollo().query({ query: GetUserInfoDocument, variables: { id: 1 } })
// }

import { transform } from 'lodash'
import { AuthOptions, getServerSession } from 'next-auth'
import { ReactNode } from 'react'
import { Main } from '@modules'
import { Photo } from './_components/Photo/Photo'
import { Video } from './_components/Video/Video'
import { NAV_LIST, NavListItem } from '../../../src/data/navigation'
import { authConfig } from '../../_configs/auth'
import { UserType } from '../../api/user/[id]/userss'

interface NavListWithComponent extends NavListItem {
  component: ReactNode
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
  params: {
    lang: 'ru',
    user_id: string
    searchParams: Record<string, any>
  }
}

const User = async (props: UserProps) => {
  const { folder } = props.searchParams
  const session = await getServerSession<AuthOptions, {user: UserType}>(authConfig)
  // console.log('session____', session?.user.privatePolicy)


  // const resUser = await getUser(props.params.user_id, ['progress'])
  // console.log('User')
  return (
    <Main>
      {navListWithComponent[folder]?.component || <div>main info</div>}
    </Main>
  )
}


export default User
