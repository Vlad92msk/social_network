import { createComponentWithProps } from '@shared/utils/createComponent'
import { PopupWrapper as Container } from './Popup'
import { PopupArrow } from './PopupArrow'
import { PopupButton } from './PopupButton'
import { PopupComponent } from './PopupComponent'

const Popup = createComponentWithProps(Container, {
  Button: PopupButton,
  Content: PopupComponent,
  Arrow: PopupArrow,
})

export { Popup }
