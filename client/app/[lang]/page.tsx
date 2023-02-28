import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'
// Next.js 13


const Home = (props) => {
  const authHeader = headers().values()
  console.log('authHeader', authHeader)
  // console.log('props', props)

  return redirect('/ru/1')
}

export default Home
