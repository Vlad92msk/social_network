import { classnames } from '@bem-react/classnames'
import { max, min } from 'date-fns'
import React, { useCallback, useState } from 'react'
import { Calendar } from '@shared/components/Calendar'
import { Popup } from '@shared/components/Popup'
import { TextInput } from '@shared/components/TextInput'
import { createDateFormat, DateFormats } from '@shared/utils'

import { cn } from './cn'

interface CalendarPopupProps {
  onChange: (s: Date[]) => void
}
export const CalendarPopup = (props: CalendarPopupProps) => {
  const { onChange } = props
  const [val, set] = useState('')
  const handleChange = useCallback((dates: Date[]) => {
    if (dates.length === 1) {
      set(`${createDateFormat(dates[0], DateFormats.FORMAT_3)}`)
    }
    if (dates.length > 1) {
      set(`${createDateFormat(min(dates), DateFormats.FORMAT_3)} - ${createDateFormat(max(dates), DateFormats.FORMAT_3)}`)
    }
    onChange?.(dates)
  }, [onChange])
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = useCallback(({ currentTarget }: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(currentTarget)
  }, [])

  const handleClose = useCallback(() => {
    setAnchorEl(null)
  }, [])

  return (
    <>
      <TextInput
        className={classnames(cn('Input'))}
        value={val}
        onClick={handleClick}
        onChange={() => 1}
        icon="calendar"
        iconPosition="right"
        iconFill="bluePrimrose50"
        size="small"
      />
      <Popup
        onClose={handleClose}
        open={!!anchorEl}
        anchorEl={anchorEl}
        placement="bottom-start"
        className={cn('CalendarPopup')}
        modifiers={{
          offset: { offset: '0, 10px' },
        }}
      >
        <Calendar onClickDay={handleChange} textSize="1" />
      </Popup>
    </>
  )
}
