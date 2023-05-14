import { PolymorphicComponentProps } from 'react-polymorphic-box'

export type AS = keyof JSX.IntrinsicElements
export type BoxProps<AS_ELEMENT extends AS, Component extends Record<string, any>> = PolymorphicComponentProps<AS_ELEMENT, Component>
