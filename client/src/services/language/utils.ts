import { Language, LANGUAGE_VARIABLES } from 'src/services/language/context'

export const isAvailableLanguage = (lang: Language) => LANGUAGE_VARIABLES.includes(lang)
