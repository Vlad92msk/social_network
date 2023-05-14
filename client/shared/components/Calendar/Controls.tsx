import React from 'react'
import { IconButton } from '@public/components/IconButton'
import { Text, TextSize } from 'src/components/Text'
import { createDateFormat, DateFormats } from 'public/utils'
import { cn } from './cn'
import { CalendarControls } from './hooks/useControlCalendar'


export interface ControlsProps {
  controls: CalendarControls
  dateFormat?: string | DateFormats
  textSize?: TextSize
}
export const Controls = (props: ControlsProps) => {
  const { controls, dateFormat, textSize } = props
  const { handleNext, handlePrev, current } = controls

  return (
    <div className={cn('Controls')}>
      <IconButton icon="arrow-left-sharp" onClick={handlePrev} />
      <Text size={textSize}>
        {createDateFormat(current, dateFormat!)}
      </Text>
      <IconButton icon="arrow-right-sharp" onClick={handleNext} />
    </div>
  )
}

Controls.defaultProps = {
  dateFormat: DateFormats.FORMAT_5,
}
