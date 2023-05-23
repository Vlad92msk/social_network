import { DrawerBar } from '@modules/DrawerBar'
import { Main } from '@modules/Main'
import { NavBar } from '@modules/NavBar'


// async function getProjects() {
//   return await initializeApollo().query({ query: GetUserInfoDocument, variables: { id: 1 } })
// }

export default async function User(props) {
  // const ferf = await getProjects()

  return (
    <>
      <NavBar />
      <Main />
      <DrawerBar />
    </>
  )
}
