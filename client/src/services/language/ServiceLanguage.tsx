import { ApolloProvider } from '@apollo/client'
import { useRouter } from 'next/router'
import { useObservable, useSubscription } from 'observable-hooks'
import React, { FC, PropsWithChildren, useMemo, useState } from 'react'
import { combineLatest, concat, distinctUntilChanged, filter, map, pairwise } from 'rxjs'
import { take } from 'rxjs/operators'
import { useApollo } from '@my-apollo/client'
import { ErrorFallBack } from '@shared/components/ErrorFallBack'
import { Loader } from '@shared/components/Loader'
import { storageGet, storageSet } from '@shared/utils'
import { languageMapValues } from 'src/services/language'
import { ContextService, DEFAULT_LANGUAGE, Language, LANGUAGE_VARIABLES } from './context'

export interface ServiceLanguageProps extends PropsWithChildren{
  pageProps: Record<string, any>
}

export const ServiceLanguage: FC<ServiceLanguageProps> = (props) => {
  const { pageProps, children } = props
  const router = useRouter()
  const languageInStorage: Language = useMemo(() => storageGet('userLanguage'), [])

  const [language, setLanguage] = useState(DEFAULT_LANGUAGE)
  const [result, setResult] = useState(DEFAULT_LANGUAGE)

  const language$ = useObservable(
    (event$) => event$.pipe(languageMapValues()),
    [language],
  )

  const router$ = useObservable(
    (inputs$) => inputs$.pipe(languageMapValues()),
    [router.query?.lang],
  )


  const start$ = useObservable((action$) => action$.pipe(
    filter(([query]: [Language]) => Boolean(query)),
    take(1),
    map(([query]) => {
      const isCorrect = Boolean(query && LANGUAGE_VARIABLES.includes(query))

      if (!isCorrect) {
        router.push({
          query: {
            lang: (languageInStorage || DEFAULT_LANGUAGE),
          },
        })
      }

      if (!languageInStorage) {
        storageSet(
          'userLanguage',
          isCorrect ? query : DEFAULT_LANGUAGE,
        )
      }

      if (languageInStorage && languageInStorage !== query) {
        storageSet(
          'userLanguage',
          isCorrect ? query : languageInStorage,
        )
      }

      return isCorrect ? query : (languageInStorage || DEFAULT_LANGUAGE)
    }),
  ), [router.query?.lang])

  const result$ = useObservable(() => concat(start$, combineLatest(router$, language$).pipe(
    pairwise(),
    map(([[prevRouter, prevLang], [currentRouter, currentLang]]) => {
      const isChangedRouter = prevRouter !== currentRouter
      const isChangedLang = prevLang !== currentLang

      if (isChangedLang) {
        router.push({
          query: {
            lang: currentLang,
          },
        })
      }

      if (!languageInStorage || languageInStorage !== currentLang) {
        storageSet(
          'userLanguage',
          (isChangedLang && currentLang)
          || (isChangedRouter && currentRouter)
          || DEFAULT_LANGUAGE,
        )
      }

      if (isChangedLang) return currentLang
      if (isChangedRouter) return currentRouter
      return DEFAULT_LANGUAGE
    }),
    distinctUntilChanged(),
  )))
  useSubscription(result$, setResult)
  const client = useApollo(result, pageProps)

  const [component, setComponent] = useState(<Loader />)
  const component$ = useObservable((action$) => action$.pipe(
    filter(([value]: [Language]) => Boolean(value)),
    map(([value]) => value),
    distinctUntilChanged(),
    map((lang) => (
      <ContextService.Provider value={{
        language: lang,
        setLanguage,
      }}
      >
        <ApolloProvider client={client}>
          {children}
        </ApolloProvider>
      </ContextService.Provider>
    )),
  ), [result])
  useSubscription(component$, setComponent, (error) => <ErrorFallBack error={error} />)

  return component
}
