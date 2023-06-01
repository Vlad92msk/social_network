// async function getProjects() {
//   return await initializeApollo().query({ query: GetUserInfoDocument, variables: { id: 1 } })
// }
import { Main } from '@modules'
import { transform } from 'lodash'
import { ReactNode } from 'react'
import { NAV_LIST, NavListItem } from '../../../src/data/navigation'

interface NavListWithComponent extends NavListItem {
  component: ReactNode
}


const navListWithComponent = transform(NAV_LIST, (acc, value, key: keyof typeof NAV_LIST) => {
  acc[key] = {
    ...value,
    component: key === 'home'
      ? (<div>home</div>)
      : key === 'video' ? <div>video</div>
        : key === 'photo' ? <div>photo</div>
          : key === 'settings' ? <div>settings</div>
            : key === 'message-square' ? <div>message</div>
              : key === 'clock-not-filled' ? <div>calendar</div>
                : <div>some component</div>,
  }
}, {} as NavListWithComponent)


interface UserProps {
  searchParams: {
    folder: keyof typeof NAV_LIST
  }
  params: any
}

export default async function User(props: UserProps) {
  const { folder } = props.searchParams

  return (
    <Main>
      {navListWithComponent[folder]?.component || <div>main</div>}
    </Main>
  )
}
