import { createContext, useContextSelector } from 'use-context-selector'

export type Theme = 'default' | 'red' | 'orange'

/* Язык по умолчанию */
export const DEFAULT_THEME: Theme = 'default'


type ContextService = {
  theme: Theme
  setTheme: (theme: Theme) => void
}
export const ContextService = createContext<ContextService>({
  theme: DEFAULT_THEME,
  setTheme: null,
})


export const useServiceThemeSelector = () => (
  useContextSelector<ContextService, Theme>(ContextService, (store) => store.theme)
)

export const useServiceThemeAction = () => (
  useContextSelector(ContextService, (store) => store.setTheme)
)
