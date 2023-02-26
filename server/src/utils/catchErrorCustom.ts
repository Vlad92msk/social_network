import { GraphQLError } from 'graphql'
import { of } from 'rxjs'

export const catchErrorCustom = (err: string) => of(new GraphQLError(err))
// export const catchErrorCustom = (err) => of(new GraphQLError(err.message))
// export const catchErrorCustom = (err) => of(err)
