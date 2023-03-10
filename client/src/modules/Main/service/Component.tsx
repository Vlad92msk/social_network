import { useEffect, useMemo } from 'react'
import { GetArgTypes } from '@public/models/getArgTypes'
import Module from '../Module'
import { ContextProvider, StateModule, useContextDispatch } from '.'


interface Props extends GetArgTypes<typeof Module>{
  state?: StateModule;
}

const StartWith = (props: Props) => {
  const { state, ...rest } = props
  const dispatch = useContextDispatch()

  useEffect(() => {
    if (state) {
      dispatch(() => state)
    }
  }, [dispatch, state])


  return useMemo(() => (
    <Module {...rest} />
  ), [rest])
}

const Component = (props?: Props) => (
  <ContextProvider>
    <StartWith {...props} />
  </ContextProvider>
)

export default Component
