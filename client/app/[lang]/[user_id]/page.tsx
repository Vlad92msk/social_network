// async function getProjects() {
//   return await initializeApollo().query({ query: GetUserInfoDocument, variables: { id: 1 } })
// }


interface UserProps {
  searchParams: any
  params: any
}

export default async function User(props: UserProps) {
  const { folder } = props.searchParams

  console.log(folder)
  if (folder === 'video') {
    return (
      <div>video</div>
    )
  }

  return (
    <div>main</div>
  )
}
