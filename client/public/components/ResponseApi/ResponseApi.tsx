import { ApolloError } from '@apollo/client'
import React from 'react'
import { Loader } from 'app/(components)/Loader'

interface ResponseApiType {
  status: boolean[]
  errors: ApolloError[]
  children: () => JSX.Element
}

export const ResponseApi = (props: ResponseApiType) => {
  const { status, errors, children } = props
  const isLoad = Array.from(new Set(status)).every((i) => i === false)
  const findFirstError = errors.find((err) => !!err)

  if (!isLoad) return <Loader />
  if (!findFirstError) return children()

  return (
    <div>
      <div>
        NetworkError-name:
        {findFirstError.networkError?.name}
      </div>
      <div>
        NetworkError-message:
        {findFirstError.networkError?.message}
      </div>
      <div>
        ExtraInfo:
        {findFirstError?.extraInfo}
      </div>
      <div>
        Message:
        {findFirstError?.message}
      </div>
      <div>
        GraphQLErrors-message:
        {findFirstError.graphQLErrors.map(({ message }) => message)}
      </div>
    </div>
  )
}
