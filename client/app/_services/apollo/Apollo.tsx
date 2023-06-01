'use client'

import { ApolloProvider, NormalizedCacheObject } from '@apollo/client'
import React from 'react'
import { useApollo } from './useApollo'

interface ApolloProps {
  children: React.ReactNode
  apolloState?: NormalizedCacheObject
}

const Apollo = ({ children, apolloState }: ApolloProps) => (
  <ApolloProvider client={useApollo(apolloState)}>
    {children}
  </ApolloProvider>
)

export default Apollo
