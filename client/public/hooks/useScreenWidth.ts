import { useObservable, useObservableState } from 'observable-hooks'
import { debounceTime, distinct, fromEvent, map } from 'rxjs'

export const useScreenWidth = () => {
  const count$ = useObservable(() => fromEvent(window, 'resize').pipe(
    debounceTime(400),
    map(() => window.innerWidth),
    distinct(),
  ))
  return useObservableState(count$, 0)
}
