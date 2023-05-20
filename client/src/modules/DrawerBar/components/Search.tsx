import { ChangeEvent, useCallback, useState } from 'react'
import { makeCn } from '@public/utils'
import { InputText, InputTextMod } from '../../../components/InputText'
import { useDrawerBarUpdate } from '../DrawerBar'
import styles from '../DrawerBar.module.scss'

const cn = makeCn('Search', styles)

export const Search = () => {
  const dispatch = useDrawerBarUpdate()
  const [search, setSearch] = useState('')

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const result = e.target.value
    setSearch(result)
    dispatch((state) => ({ search: result }))
  }, [dispatch])


  return (
    <div className={cn()}>
      <InputTextMod
        icon="search"
        value={search}
        onChange={onChange}
      />
    </div>
  )
}
