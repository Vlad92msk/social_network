import { useEffect } from 'react'
import { useThemeServiceCtxSelector } from './context'


const Module = (props) => {
  const { children } = props
  const theme = useThemeServiceCtxSelector((contextStore) => contextStore.theme)

  useEffect(() => {
    document.body.setAttribute('data-theme', theme)
  }, [theme])

  return children
}

export default Module
