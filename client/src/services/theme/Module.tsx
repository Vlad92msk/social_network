import React, { useLayoutEffect} from 'react'
import { createStoreContext } from '@shared/utils'
import { initialState } from './context/initialState'

export const {
  contextWrapper,
  useContextSelector: useThemeServiceSelect,
  useContextDispatch: useThemeServiceUpdate,
} = createStoreContext({
  name: 'Theme',
  initialState,
})

export const ThemeService = contextWrapper((props) => {
  const { children } = props
  const theme = useThemeServiceSelect((contextStore) => contextStore.theme)

  useLayoutEffect(() => {
    document.body.setAttribute('data-theme', theme)
  }, [theme])

  return <>{children}</>
})
