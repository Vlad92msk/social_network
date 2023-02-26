import { classnames } from '@bem-react/classnames'
import { isEqual, isSameMonth, isToday, isWithinInterval, max, min } from 'date-fns'
import React, { useCallback, useMemo } from 'react'
import { Text, TextSize } from '@shared/components/Text'
import { cn } from './cn'


export interface CellDayProps {
  className?: string
  currentDate?: Date
  clickedDayState: [Date[], React.Dispatch<React.SetStateAction<Date[]>>]
  day?: Date
  withBorder?: boolean
  textSize?: TextSize
  children?: (day: Date) => React.ReactNode | React.ReactNode[]
  onClick?: (day:Date[], isCurrentMonth?: boolean, isCurrentDay?: boolean) => void
}
export const CellDay: React.FC<CellDayProps> = (props) => {
  const {
    className, withBorder, currentDate, day, textSize, clickedDayState, onClick, children,
  } = props
  const [clickedDay, setClickedDay] = clickedDayState


  const isCurrentMonth = useMemo(() => isSameMonth(currentDate, day), [currentDate, day])
  const isCurrentDay = useMemo(() => isToday(day), [day])

  const handleDayClick = useCallback(() => {
    setClickedDay(clickedDay.length === 1 ? [...clickedDay, day] : [day])
    onClick?.(clickedDay.length === 1 ? [...clickedDay, day] : [day], isCurrentMonth, isCurrentDay)
  }, [clickedDay, day, isCurrentDay, isCurrentMonth, onClick, setClickedDay])


  return (
    <span
      className={classnames(cn('DayCell', {
        withBorder,
        withinInterval: (clickedDay && clickedDay.length) && isWithinInterval(day, { start: min(clickedDay), end: max(clickedDay) }),
      }), className)}
    >
      <Text
        className={cn('Day', {
          currentMonth: isCurrentMonth,
          currentDay: (clickedDay && clickedDay.length) ? clickedDay.some((d) => isEqual(day, d)) : isCurrentDay,
        })}
        color="note"
        weight="medium"
        size={textSize}
        onClick={handleDayClick}
      >
        {day.getDate()}
      </Text>
      {children?.(day)}
    </span>
  )
}
