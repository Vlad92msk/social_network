import { classnames } from '@bem-react/classnames'
import { PopperPlacementType } from '@material-ui/core'
import React from 'react'


import { Popup } from '../Popup'

import { cn } from './cn'
import { Context } from './Context'

export interface MenuListProps {
  children: React.ReactNode | React.ReactNode[];
  className?: string;

  open: boolean;
  onClose: () => void;

  anchorEl: HTMLElement;
  position?: PopperPlacementType;
  offset?: string;
  arrow?: boolean;
}

export const MenuList: React.FC<MenuListProps> = (props) => {
  const {
    children, className, anchorEl, open, onClose, position, offset, arrow,
  } = props

  return (
    <Popup
      className={classnames(cn(), className)}
      arrow={arrow}
      open={!!(open && anchorEl)}
      onClose={onClose}
      anchorEl={anchorEl}
      placement={position}
      modifiers={{
        preventOverflow: { boundariesElement: 'scrollParent' },
        offset: { offset },
      }}
    >
      <Context.Provider value={{ onCloseMenu: onClose }}>
        {children}
      </Context.Provider>
    </Popup>
  )
}

MenuList.defaultProps = {
  className: null,
  position: 'bottom-end',
  offset: '0, 10px',
  arrow: false,
}
