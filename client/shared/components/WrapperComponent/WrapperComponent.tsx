import React from 'react'

interface WrapperComponentProps {
    component: React.ReactElement
    addProps: { [key: string]: any }
}

export const WrapperComponent: React.FC<WrapperComponentProps> = ({
  component: Component,
  addProps,
}) => React.cloneElement(Component, { ...addProps })
