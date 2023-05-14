import React from 'react'

export function createComponentWithProps<T extends React.ComponentType<any>, K extends object>(
  Container: T,
  additionalProps: K,
) {
  const component = (props: React.ComponentProps<T>) => <Container {...props} />
  return Object.assign(component, additionalProps)
}
