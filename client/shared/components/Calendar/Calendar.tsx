import { closestTo } from 'date-fns'
import React, { useState } from 'react'
import { DisplayControls } from '@shared/components/Calendar/types/display'
import { TextSize } from '@shared/components/Text'

import { CellDay } from './CellDay'
import { cn } from './cn'
import { Controls } from './Controls'
import { CalendarControls, useControlCalendar, useCreateCalendarDays } from './hooks'
import { WeekDays } from './WeekDays'


export interface CalendarProps {
  cellDayClassName?: string
  currentDate?: Date
  display?: DisplayControls
  controls?: CalendarControls
  isHideBaseControls?: boolean
  withBorder?: boolean
  textSize?: TextSize
  onClickDay?: (day:Date[], isCurrentMonth?: boolean, isCurrentDay?: boolean) => void
  children?: (day: Date) => React.ReactNode | React.ReactNode[]
}
export const Calendar: React.FC<CalendarProps> = React.memo((props) => {
  const {
    currentDate,
    cellDayClassName,
    controls: externalControls,
    isHideBaseControls,
    textSize,
    withBorder,
    display,
    onClickDay,
    children,
  } = props

  const controls = useControlCalendar({ date: currentDate, externalControls, display })
  const calendarDays = useCreateCalendarDays(controls.current)

  const clickedDay = useState<Date[]>([closestTo(new Date(), calendarDays)])

  return (
    <div className={cn()}>
      {(!isHideBaseControls && !externalControls) && (<Controls textSize={textSize} controls={controls} />)}
      <WeekDays withBorder={withBorder} textSize={textSize} />
      <div
        className={cn('Container')}
        style={{ gridTemplateRows: `repeat(${calendarDays.length / 7}, 1fr)` }}
      >
        {calendarDays.map((day) => (
          <CellDay
            key={String(day)}
            className={cellDayClassName}
            day={day}
            textSize={textSize}
            withBorder={withBorder}
            currentDate={controls.current}
            clickedDayState={clickedDay}
            onClick={onClickDay}
          >
            { children }
          </CellDay>
        ))}
      </div>
    </div>
  )
})

Calendar.defaultProps = {
  currentDate: new Date(),
  display: DisplayControls.MONTH_CALENDAR,
}
