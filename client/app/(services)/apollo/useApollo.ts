import { NormalizedCacheObject } from '@apollo/client'
import { useMemo } from 'react'
import { initializeApollo } from './apolloUtils'


export const useApollo = (initialState?: NormalizedCacheObject) => (
  useMemo(() => initializeApollo(initialState), [initialState])
)
