'use client'

import React, { createContext, PropsWithChildren, useCallback, useContext, useRef, useSyncExternalStore } from 'react'

import { DeepPartial } from '@public/models/deepPartial'
import { log, LogColors } from '@shared/utils/logColors'

interface Options<Store> {
  initialState: Store
  name?: string
}
function logStoreData(name, store, value) {
  console.group(name)
  log(LogColors.fg.magenta, ['prev state', store.current])
  log(LogColors.fg.blue, ['payload', value])

  const assigned = ({ ...store.current, ...value })
  log(LogColors.fg.red, ['result', assigned])
  console.groupEnd()
  return assigned
}

export function createStoreContext<Store>({ name, initialState }: Options<Store>) {
  function useStoreData(): {
    get: () => Store;
    set: (v: (s: Store) => DeepPartial<Store>) => Store
    subscribe: (callback: () => void) => () => void;
    } {
    // Создаем ссылку на наше хранилище состояния с исходным состоянием
    const store = useRef(initialState)

    // Функция get позволяет нам получить текущее состояние хранилища
    const get = useCallback(() => store.current, [])

    // Мы создаем ссылку на множество подписчиков, которые будут уведомлены при изменении состояния
    const subscribers = useRef(new Set<() => void>())

    // Функция set позволяет нам изменить текущее состояние хранилища
    const set = useCallback((value: Partial<Store>): Store => {
      // Если текущее состояние и новое значение совпадают, ничего не делаем
      if (Object.is(store.current, value)) return store.current

      // Если задано имя, логируем данные о состоянии
      if (name) {
        store.current = logStoreData(name, store, value)
      }

      // Объединяем текущее состояние с новым значением
      const assigned = ({ ...store.current, ...value })

      // Обновляем текущее состояние
      store.current = assigned

      // Уведомляем всех подписчиков об изменении состояния
      subscribers.current.forEach((callback) => callback())

      // Возвращаем новое состояние
      return assigned
    }, [])

    // Функция apply принимает функцию dispatch, применяет ее к текущему состоянию и затем обновляет состояние
    const apply = useCallback((dispatch: (s: Store) => Partial<Store>): Store => {
      const dispatched = dispatch(store.current)
      return set(dispatched)
    }, [set])

    // Функция subscribe позволяет подписаться на изменения состояния хранилища
    const subscribe = useCallback((callback: () => void) => {
      subscribers.current.add(callback)
      // Возвращаем функцию, которая при вызове отменяет подписку
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

  function useStoreDispatch() {
    const store = useContext(StoreContext)
    if (!store) throw new Error('Store not found')

    return store.set
  }

  interface Props extends PropsWithChildren {
    state?: Partial<Store>
  }

  const StartWith = (props: Props) => {
    const { state, children } = props
    const updateContext = useStoreDispatch()

    if (state !== undefined) {
      updateContext((initial) => ({ ...initial, ...state }))
    }

    return <>{children}</>
  }

  const contextWrapper = (Module: React.FC<PropsWithChildren>): React.FC<Props> => (
    ({ state, children, ...restProps }) => (
      <ContextProvider>
        <StartWith state={state}>
          <Module {...restProps}>
            {children}
          </Module>
        </StartWith>
      </ContextProvider>
    )
  )

  return ({
    useStore,
    useContextSelector: useStoreSelector,
    useContextDispatch: useStoreDispatch,
    contextWrapper,
  })
}
