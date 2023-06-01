import React from 'react'

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
      {children}
      {drawerBar}
    </>
  )
}


export default UserLayout
