import { addDays, eachDayOfInterval, startOfWeek } from 'date-fns'
import { ru as RU_LOCALE } from 'date-fns/locale'

export const createThisWeek = (date: Date = new Date()): Date[] => {
  const startWeek = startOfWeek(date, { locale: RU_LOCALE })
  const aWeekFromNow = addDays(startWeek, 6)
  return eachDayOfInterval({
    start: startWeek,
    end: aWeekFromNow,
  })
}
