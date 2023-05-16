import { useObservableCallback, useSubscription } from 'observable-hooks'
import { useState } from 'react'
import { distinctUntilChanged, map } from 'rxjs'
import { makeCn } from '@public/utils'
import { TextInput } from '@shared/components/TextInput'
import { useDrawerBarUpdate } from '../DrawerBar'
import styles from '../DrawerBar.module.scss'

const cn = makeCn('Search', styles)

export const Search = () => {
  const dispatch = useDrawerBarUpdate()
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
