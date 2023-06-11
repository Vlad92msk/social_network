import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { RefType } from '@public/types/refType'

export interface PortalOptions {
    isOverFlowHidden?: boolean
}

export type PortalTarget = RefType

export interface UsePortalProps {
    open: boolean
    targetEl?: PortalTarget
    options?: PortalOptions
    children: React.ReactNode
}

export const usePortal = (props: UsePortalProps) => {
  const { targetEl, options, open, children } = props

  if (typeof window === 'undefined') return null
  const target = targetEl?.current || document.body

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (options?.isOverFlowHidden) {
      target.style.overflow = 'hidden'
      return () => {
        target.style.overflow = ''
      }
    }
  }, [options, target])

  return open ? ReactDOM.createPortal(children, target) : null
}
