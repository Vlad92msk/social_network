import { ClassNameList } from '@bem-react/classname'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { makeCn } from '@shared/utils'

export interface UseChangeTheme <T> {
  initTheme: keyof T
  componentName: string
  themes?: T
}

export const useChangeTheme = <T>(props: UseChangeTheme<T>):[
  (elemNameOrBlockMods?: any, elemModsOrBlockMix?: any, elemMix?: ClassNameList) => string,
  (input: keyof T) => void
] => {
  const { initTheme, componentName, themes } = props
  const [color, setColor] = useState<keyof T>(initTheme)
  const [theme, setTheme] = useState('')


  useEffect(() => {
    (async () => {
      // @ts-ignore
      setTheme(themes[color])
    })()
  }, [color, themes])

  const changeTheme = useCallback((input: keyof T) => {
    setColor(input)
  }, [])
  // @ts-ignore
  const cn = useMemo(() => makeCn(componentName, theme), [componentName, theme])
  return [cn, changeTheme]
}
