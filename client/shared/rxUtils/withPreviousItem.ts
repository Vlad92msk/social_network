import { map, OperatorFunction, pairwise, pipe, startWith } from 'rxjs'

export const withPreviousItem = <T, >(init?: any): OperatorFunction<T, { previous?: T; current: T }> => pipe(
  startWith(init),
  pairwise(),
  map(([previous, current]) => ({
    previous,
    current: current!,
  })),
)
