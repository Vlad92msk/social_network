import { GetServerSideProps, NextPage } from 'next'
import { DEFAULT_LANGUAGE } from 'src/services/language'


const Home: NextPage = () => <template />
export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log('context', context)
  return ({
    redirect: {
      destination: `/${DEFAULT_LANGUAGE}/1`,
      permanent: true,
    },
    props: {},
  })
}

export default Home
