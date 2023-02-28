import { App } from '@modules/App'
import { initializeApollo } from '@services/apollo/apolloClient'
import { GetUserInfoDocument, useGetUserInfoQuery } from '@services/apollo/generate'


// async function getProjects() {
//   return await initializeApollo().query({ query: GetUserInfoDocument, variables: { id: 1 } })
// }

export default async function User(props) {
  // const ferf = await getProjects()

  return <App />
}
