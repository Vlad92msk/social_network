import { ChangeEvent, useCallback, useState } from 'react'
import { InputTextMod } from '@common'
import { makeCn } from '@public/utils'
import { useDrawerBarUpdate } from '../DrawerBar'
import styles from '../DrawerBar.module.scss'

const cn = makeCn('Search', styles)

export const Search = () => {
  const dispatch = useDrawerBarUpdate()
  const [search, setSearch] = useState('')

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const result = e.target.value
    setSearch(result)
    dispatch((state) => ({ search: result }))
  }, [dispatch])

  const handleClear = useCallback(() => {
    setSearch('')
    dispatch((state) => ({ search: '' }))
  }, [dispatch])

  return (
    <div className={cn()}>
      <InputTextMod
        icon="search"
        value={search}
        onChange={handleChange}
        onClear={handleClear}
      />
    </div>
  )
}
