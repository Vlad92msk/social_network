import React, { useEffect, useMemo } from 'react'
import { GetArgTypes } from '@public/models/getArgTypes'
import Module from '../Module'
import { StateModule, ThemeServiceProvider, useThemeServiceCtxDispatch } from '.'


interface Props extends GetArgTypes<typeof Module>{
  state?: StateModule;
}

const StartWith = (props: Props) => {
  const { state, ...rest } = props
  const dispatch = useThemeServiceCtxDispatch()

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
  <ThemeServiceProvider>
    <StartWith {...props} />
  </ThemeServiceProvider>
)

export default Component
