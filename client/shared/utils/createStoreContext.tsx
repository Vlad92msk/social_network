import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useSyncExternalStore,
} from 'react'
import { DeepPartial } from '@public/models/deepPartial'
import { compose } from '@shared/utils/compose'
import { log, LogColors } from '@shared/utils/logColors'


export function createStoreContext<Store>(initialState: Store, name?: string) {
  function useStoreData(): {
    get: () => Store;
    set: (v: (s: Store) => DeepPartial<Store>) => Store
    subscribe: (callback: () => void) => () => void;
    } {
    const store = useRef(initialState)
    const get = useCallback(() => store.current, [])
    const subscribers = useRef(new Set<() => void>())

    const set = useCallback((value: Partial<Store>): Store => {
      const assigned = { ...store.current, ...value }
      store.current = assigned
      subscribers.current.forEach((callback) => callback())

      console.group(name)
      // log(LogColors.fg.magenta, ['prev state', store.current])
      log(LogColors.fg.blue, ['payload', value])
      log(LogColors.fg.red, ['result', assigned])
      console.groupEnd()

      return assigned
    }, [])

    const apply = useCallback((dispatch: (s: Store) => Partial<Store>): Store => (
      compose(set, dispatch)(get())
    ), [get, set])

    const subscribe = useCallback((callback: () => void) => {
      subscribers.current.add(callback)
      return () => subscribers.current.delete(callback)
    }, [])


    return {
      get,
      set: apply,
      subscribe,
    }
  }

  type UseStoreDataReturnType = ReturnType<typeof useStoreData>;

  const StoreContext = createContext<UseStoreDataReturnType | null>(null)

  const ContextProvider = ({ children }: { children: React.ReactNode }) => (
    <StoreContext.Provider value={useStoreData()}>
      {children}
    </StoreContext.Provider>
  )

  function useStore<SelectorOutput>(
    selector: (store: Store) => SelectorOutput,
  ): [SelectorOutput, (v: (s: Store) => Partial<Store>) => Store] {
    const store = useContext(StoreContext)
    if (!store) throw new Error('Store not found')

    const state = useSyncExternalStore(
      store.subscribe,
      () => selector(store.get()),
    )

    return [state, store.set]
  }

  function useStoreSelector<SelectorOutput>(
    selector: (store: Store) => SelectorOutput,
  ): SelectorOutput {
    const store = useContext(StoreContext)
    if (!store) throw new Error('Store not found')

    return useSyncExternalStore(
      store.subscribe,
      () => selector(store.get()),
    )
  }

  function useStoreDispatch<SelectorOutput>() {
    const store = useContext(StoreContext)
    if (!store) throw new Error('Store not found')

    return store.set
  }

  return ({
    ContextProvider,
    useStore,
    useContextSelector: useStoreSelector,
    useContextDispatch: useStoreDispatch,
  })
}
