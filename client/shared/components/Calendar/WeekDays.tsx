import { isSunday } from 'date-fns'
import React from 'react'
import { Text, TextSize } from '@shared/components/Text'
import { createDateFormat, DateFormats } from '@shared/utils'
import { cn } from './cn'
import { createThisWeek } from './utils'

const thisWeek = createThisWeek()

export interface WeekDays {
  withBorder?: boolean
  textSize?: TextSize
}
export const WeekDays = React.memo((props: WeekDays) => (
  <div className={cn('WeekDays')}>
    {thisWeek.map((weekDay) => (
      <Text
        key={String(weekDay)}
        className={cn('WeekDay', { withBorder: props?.withBorder })}
        color={isSunday(weekDay) ? 'red' : 'note'}
        size={props?.textSize}
        weight="medium"
      >
        {createDateFormat(weekDay, DateFormats.FORMAT_6)}
      </Text>
    ))}
  </div>
))
