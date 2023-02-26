import { classnames } from '@bem-react/classnames'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { IconName } from '@public/models/icon.model'
import { FieldRow } from '@shared/components/FieldRow'
import { IconButton } from '@shared/components/IconButton'
import { makeCn } from '@shared/utils'
import styles from './SpeedDial.module.scss'

const cn = makeCn('SpeedDial', styles)

interface SpeedDialType {
  className?: string
  buttonClassname?: string
  elements: JSX.Element[]
  icon: IconName
  direction: 'left' | 'up' | 'down' | 'right'
  size?: 'small' | 'ordinary' | 'medium' | 'large'
}

export const SpeedDial: FC<SpeedDialType> = ({ className, buttonClassname, elements, icon, direction, size }) => {
  const [open, setOpen] = useState(false)
  const [style, setStyle] = useState<React.CSSProperties>()
  const handleChangeOpen = useCallback(() => setOpen((prev) => !prev), [])

  useEffect(() => {
    switch (direction) {
      case 'right':
        return setStyle({ left: 0 })
      case 'left':
        return setStyle({ right: 0 })
      case 'down':
        return setStyle({ top: 0 })
      case 'up':
        return setStyle({ bottom: 0 })
      default:
        return null
    }
  }, [direction])

  return (
    <div className={classnames(cn(), className)}>
      <FieldRow
        className={cn('IconsBox')}
        align="center"
        direction={
          // eslint-disable-next-line no-nested-ternary
          direction === 'right' ? 'row' : direction === 'left' ? 'rowreverse' : direction === 'down' ? 'column' : 'columnreverse'
        }
        style={style}
      >
        <IconButton icon={icon} onClick={handleChangeOpen} className={classnames(cn(), buttonClassname)} size={size} />
        {open
          && elements.map((action, index) => (
            <div key={Number(index)} className={cn('Icon')}>
              {action}
            </div>
          ))}
      </FieldRow>
    </div>
  )
}
