import { useMemo } from 'react';
import { eachDayOfInterval, endOfISOWeek, startOfISOWeek } from 'date-fns';

export const useCreateCalendarDays = (date: Date): Date[] => useMemo(() => {
  const year = date.getFullYear();
  const month = date.getMonth();

  const start = startOfISOWeek(new Date(year, month, 1));
  const end = endOfISOWeek(new Date(year, month + 1, 1));
  return eachDayOfInterval({
    start,
    end,
  });
}, [date]);
