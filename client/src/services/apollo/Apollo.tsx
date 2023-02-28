'use client'

import { ApolloProvider } from '@apollo/client'
import { useApollo } from '@services/apollo/apolloClient'

const Apollo = ({ children, apolloState }: { children: React.ReactNode, apolloState?: string }) => (
  <ApolloProvider client={useApollo(JSON.parse(apolloState ?? '{}'))}>
    {children}
  </ApolloProvider>
)


export default Apollo
