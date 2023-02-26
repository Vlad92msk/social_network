import React, { PropsWithChildren, useCallback, useEffect, useState } from 'react'
import { ContextService, DEFAULT_THEME, Theme } from './context'


type ThemeServiceProps = PropsWithChildren

export const ServiceTheme: React.FC<ThemeServiceProps> = (props) => {
  const { children } = props
  const [theme, setTheme] = useState(DEFAULT_THEME)

  useEffect(() => {
    document.body.setAttribute('data-theme', theme)
  }, [theme])

  const handleChangeTheme = useCallback((input: Theme) => {
    setTheme(input)
  }, [])

  return (
    <ContextService.Provider value={{ theme, setTheme: handleChangeTheme }}>
      {children}
    </ContextService.Provider>
  )
}
