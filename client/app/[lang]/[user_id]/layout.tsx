import React from 'react'
import { DrawerBar as DrawerBarComponent, NavBar as NavBarComponents } from '@modules'

interface UserLayoutProps {
    children: React.ReactNode
    params: { lang: 'ru', user_id: string }
}


const UserLayout = async (props: UserLayoutProps) => {
  const { children, params } = props

  return (
    <>
      <NavBarComponents />
      {children}
      <DrawerBarComponent />
    </>
  )
}


export default UserLayout
