import { createStoreContext } from 'shared/utils/createStoreContext'
import { initialState } from './initialState'

export * from './initialState'

export const {
  ContextProvider: ThemeServiceProvider,
  useContextSelector: useThemeServiceCtxSelector,
  useContextDispatch: useThemeServiceCtxDispatch,
} = createStoreContext(initialState, 'ThemeService')
