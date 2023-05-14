import { ForwardedRef, RefObject } from 'react'

export type RefType<T = undefined> = T extends undefined ? RefObject<HTMLElement | null | undefined> | undefined : ForwardedRef<T>;
