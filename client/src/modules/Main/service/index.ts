import { createStoreContext } from '@shared/utils'
import { initialState } from './initialState'

export * from './initialState'

export const {
  ContextProvider,
  useContextSelector,
  useContextDispatch,
} = createStoreContext(initialState, 'Main')
