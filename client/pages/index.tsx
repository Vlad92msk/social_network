import { GetServerSideProps, NextPage } from 'next'
import { DEFAULT_LANGUAGE } from 'src/services/language'


const Home: NextPage = () => <template />
export const getServerSideProps: GetServerSideProps = async () => ({
  redirect: {
    destination: `/${DEFAULT_LANGUAGE}/`,
    permanent: true,
  },
  props: {},
})

export default Home
