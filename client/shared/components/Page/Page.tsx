import { storageGet } from '@shared/utils'
import { NextPage } from 'next'
import Head from 'next/head'
import React, { PropsWithChildren } from 'react'
import { AuthGuard, AuthGuardType } from '@shared/containers/AuthGuard'
import { Language } from 'src/services/language'


export interface PageType extends AuthGuardType {
  title?: string
  subTitle?: string
  lang: Language
}


export const Page: NextPage<PropsWithChildren<PageType>> = React.memo((props) => {
  const { title, subTitle, children, roles, page, lang } = props

  return (
    <AuthGuard page={page} roles={roles}>
      <Head>
        <link type="image/png" rel="shortcut icon" href="/resources/images/htmlTag.png" />
        {(title || subTitle) && (
          <title>
            {`${title} | ${subTitle} [${lang}]`}
          </title>
        )}
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      {children}
    </AuthGuard>
  )
})

Page.defaultProps = {
  title: 'Vlad',
  subTitle: 'Social',
}
