import React from 'react'
import { Main } from '../../(modules)'

const UserLayout = ({ children, video, drawerBar, navBar }: { navBar: React.ReactNode, drawerBar: React.ReactNode, video: React.ReactNode, children: React.ReactNode}) => (
  <>
    {navBar}
    <Main>
      {video}
      {children}
    </Main>
    {drawerBar}
  </>
)


export default UserLayout
