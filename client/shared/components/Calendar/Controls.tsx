import React from 'react'
import { IconButton } from '@shared/components/IconButton'
import { Text, TextSize } from '@shared/components/Text'
import { createDateFormat, DateFormats } from '@shared/utils'
import { cn } from './cn'
import { CalendarControls } from './hooks/useControlCalendar'


export interface ControlsProps {
  controls: CalendarControls
  dateFormat?: string | DateFormats
  textSize?: TextSize
}
export const Controls:React.FC<ControlsProps> = (props) => {
  const { controls, dateFormat, textSize } = props
  const { handleNext, handlePrev, current } = controls

  return (
    <div className={cn('Controls')}>
      <IconButton icon="arrow-left-sharp" fill="oldAsphalt50" onClick={handlePrev} />
      <Text color="body" weight="medium" size={textSize}>
        {createDateFormat(current, dateFormat)}
      </Text>
      <IconButton icon="arrow-right-sharp" fill="oldAsphalt50" onClick={handleNext} />
    </div>
  )
}

Controls.defaultProps = {
  dateFormat: DateFormats.FORMAT_5,
}
