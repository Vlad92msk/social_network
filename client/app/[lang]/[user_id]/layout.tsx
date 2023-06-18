import React from 'react'
import { DrawerBar, NavBar } from '@modules'

interface UserLayoutProps {
    children: React.ReactNode
    params: { lang: 'ru', user_id: string }
}


const UserLayout = async (props: UserLayoutProps) => {
  const { children, params } = props
  return (
    <>
      <NavBar />
      {children}
      <DrawerBar />
    </>
  )
}


export default UserLayout
