import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { App } from '@modules/App'
import { useGetUserInfoQuery } from '@my-apollo/generate'
import { LocalStorageEnum } from '@public/models/localStorage'
import { Language } from '@services/language'
import { Page } from '@shared/components/Page/Page'
import { ResponseApi } from '@shared/components/ResponseApi'
import { getSSR, ssrResult, storageGet, storageSet } from '@shared/utils'
import { PortfolioPages } from 'src/router/pages'

interface HomeProps {
  lang: Language
  user_id?: number
}

const Home: NextPage<HomeProps> = (props) => {
  const { lang, user_id } = props
  const router = useRouter()

  const visitUserInStorage = storageGet(LocalStorageEnum.VISIT_USER)

  const { data, error, loading } = useGetUserInfoQuery({
    variables: { id: Number(user_id) },
  })

  useEffect(() => {
    if (!visitUserInStorage && !error && !loading) {
      storageSet(LocalStorageEnum.VISIT_USER, data.getOneUser)
    }
  }, [error, data, loading, visitUserInStorage])


  return (
    <ResponseApi status={[loading]} errors={[error]}>
      {() => (
        <Page page={PortfolioPages.PROFILE} lang={lang}>
          <App />
        </Page>
      )}
    </ResponseApi>
  )
}

export const getServerSideProps: GetServerSideProps = (ctx) => (
  getSSR(ctx, async (apolloClient) => (
    ssrResult(apolloClient, {
      lang: ctx.query.lang,
      user_id: ctx.query.user_id,
    })
  ))
)

export default Home
