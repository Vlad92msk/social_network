import React from 'react'
import { usePopupSelect } from './Popup'
import { WrapperComponent } from '../WrapperComponent'


export const PopupArrow = () => {
  const withDefaultArrow = usePopupSelect((store) => store.withDefaultArrow)
  const arrow = usePopupSelect((store) => store.arrow)
  const xPlacement = usePopupSelect((store) => store.xPlacement)
  const defaultArrow = usePopupSelect((store) => store.defaultArrow)
  const style = usePopupSelect((store) => store.arrowStyle)

  return (
    <>
      {(arrow && !withDefaultArrow) && (
        <WrapperComponent
          component={arrow}
          addProps={{ 'data-x-placement': xPlacement, style }}
        />
      )}
      {withDefaultArrow && (
      <WrapperComponent
        component={defaultArrow!}
        addProps={{ 'data-x-placement': xPlacement, style }}
      />
      )}
    </>
  )
}
PopupArrow.displayName = 'PopupArrow'
