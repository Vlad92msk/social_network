import { useObservableCallback, useSubscription } from 'observable-hooks'
import { useState } from 'react'
import { distinctUntilChanged, map } from 'rxjs'
import { useContextDispatch } from '@modules/DrawerBar/service'
import { TextInput } from '@shared/components/TextInput'
import { makeCn } from '@shared/utils'
import styles from './Search.module.scss'

const cn = makeCn('Search', styles)

export const Search = () => {
  const dispatch = useContextDispatch()
  const [search, setSearch] = useState('')
  const [onChange, textChange$] = useObservableCallback<
    string,
    string
    >((event$) => event$.pipe(
      distinctUntilChanged(),
      map((v: string) => v),
    ))

  useSubscription(textChange$, (resilt) => {
    setSearch(resilt)
    dispatch((state) => ({ search: resilt }))
  })

  return (
    <div className={cn()}>
      <TextInput
        className={cn('Input')}
        icon="search"
        value={search}
        onChange={onChange}
      />
    </div>
  )
}
