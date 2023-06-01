import React from 'react'
import { Main } from '@modules'

interface UserLayoutProps {
    navBar: React.ReactNode
    drawerBar: React.ReactNode
    children: React.ReactNode
}

const UserLayout = (props: UserLayoutProps) => {
  const { children, drawerBar, navBar, ...rest } = props
  return (
    <>
      {navBar}
      <Main>
        {children}
      </Main>
      {drawerBar}
    </>
  )
}


export default UserLayout
