import { createContext, useContextSelector } from 'use-context-selector'

export type Language = 'ru' | 'en'

/* Возможные языки */
export const LANGUAGE_VARIABLES: Language[] = ['ru', 'en']
/* Язык по умолчанию */
export const DEFAULT_LANGUAGE: Language = 'ru'


type ContextService = {
  language: Language
  setLanguage: (lang: Language) => void
}
export const ContextService = createContext<ContextService>({
  language: DEFAULT_LANGUAGE,
  setLanguage: null,
})


export const useServiceLanguageSelector = () => (
  useContextSelector<ContextService, Language>(ContextService, (store) => store.language)
)

export const useServiceLanguageAction = () => (
  useContextSelector(ContextService, (store) => store.setLanguage)
)
