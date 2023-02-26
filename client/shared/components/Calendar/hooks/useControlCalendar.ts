import { addMonths, addWeeks, startOfToday, subMonths, subWeeks } from 'date-fns'
import { useCallback, useEffect, useState } from 'react'
import { DisplayControls } from '../types/display'

export type CalendarControls = {
  current: Date,
  handlePrev: () => void,
  handleNext: () => void,
  handleToday: () => void,
  handleCurrentDay: (currentDay: Date) => void
}
export interface ControlCalendarOptions {
  date?: Date
  step?: number
  externalControls?: CalendarControls
  display: DisplayControls
}
export const useControlCalendar = ({
  date = new Date(),
  step = 1,
  externalControls,
  display,
}: ControlCalendarOptions): CalendarControls => {
  const [current, seCurrent] = useState(externalControls ? externalControls.current : date)
  /**
   * Если есть внешнее управление - используем его
   */
  useEffect(() => {
    if (externalControls) {
      seCurrent(externalControls.current)
    }
  }, [externalControls])

  const handlePrev = useCallback(() => {
    if (externalControls) {
      return externalControls.handlePrev()
    }
    switch (display) {
      case DisplayControls.MONTH_CALENDAR:
        return seCurrent((p) => subMonths(p, step))
      case DisplayControls.TIME_CALENDAR || DisplayControls.WEEK_CALENDAR:
        return seCurrent((p) => subWeeks(p, step))
      default: return null
    }
  }, [display, externalControls, step])

  const handleNext = useCallback(() => {
    if (externalControls) {
      return externalControls.handleNext()
    }
    switch (display) {
      case DisplayControls.MONTH_CALENDAR:
        return seCurrent((p) => addMonths(p, step))
      case DisplayControls.TIME_CALENDAR:
        return seCurrent((p) => addWeeks(p, step))
      default: return null
    }
  }, [display, externalControls, step])

  const handleToday = useCallback(() => {
    seCurrent(startOfToday())
  }, [])

  const handleCurrentDay = useCallback((currentDay: Date) => {
    seCurrent(currentDay)
  }, [])

  return { current, handlePrev, handleNext, handleToday, handleCurrentDay }
}
