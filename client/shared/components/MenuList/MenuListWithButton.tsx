import { classnames } from '@bem-react/classnames'
import { PopperPlacementType } from '@material-ui/core'
import React, { useCallback, useState } from 'react'
import { Box } from 'react-polymorphic-box'
import { Icon } from '@shared/components/Icon'
import { MenuList } from '@shared/components/MenuList/MenuList'


import { cn } from './cn'

export interface MenuListWithButtonProps {
  className?: string;
  classNameButton?: string;
  children: React.ReactNode | React.ReactNode[];
  button?: React.ReactNode | React.ReactNode[] | React.FunctionComponent<{ handleClick: (event: React.MouseEvent<HTMLElement>) => void }>;
  position?: PopperPlacementType;
  offset?: string;
}


export const MenuListWithButton: React.FC<MenuListWithButtonProps> = (props) => {
  const {
    children, button, classNameButton, ...rest
  } = props

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = useCallback(({ currentTarget }: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(currentTarget)
  }, [])

  const handleClose = useCallback(() => {
    setAnchorEl(null)
  }, [])

  return (
    <>
      {
        typeof button === 'function' ? (
          button({ handleClick })
        ) : (
          <Box as="button" type="button" className={classnames(cn('MenuButton'), classNameButton)} onClick={handleClick}>
            {button || <Icon icon="more-horizontal" className={cn('ButtonIcon')} />}
          </Box>
        )
      }
      <MenuList anchorEl={anchorEl} open={!!anchorEl} onClose={handleClose} {...rest}>
        {children}
      </MenuList>
    </>
  )
}

MenuListWithButton.defaultProps = {
  classNameButton: null,
}
