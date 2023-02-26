import { distinctUntilChanged, filter, map, pipe } from 'rxjs'
import { storageGet } from '@shared/utils'
import { DEFAULT_LANGUAGE, Language, LANGUAGE_VARIABLES } from '.'

export const languageMapValues = () => pipe(
  filter(([value]: [Language]) => Boolean(value)),
  map(([value]) => {
    const isCorrect = Boolean(value && LANGUAGE_VARIABLES.includes(value))
    const languageInStorage = storageGet('userLanguage') as Language
    return isCorrect ? value : (languageInStorage || DEFAULT_LANGUAGE)
  }),
  distinctUntilChanged(),
)
