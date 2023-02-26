import { getYear } from 'date-fns'
import { FieldRow } from '@shared/components/FieldRow'
import { Text } from '@shared/components/Text'
import { cn } from './cn'
import { SchoolInfo } from './mock'

interface SchoolProps {
  schoolInfo: SchoolInfo[]
}

export const School = (props: SchoolProps) => {
  const { schoolInfo } = props
  return (
    <div className={cn('School')}>
      <Text color="title" size="6" textTransform="uppercase" weight="bold">Учеба</Text>
      {schoolInfo.map(({ id, dateEnd, dateStart, vuz, profession }) => (
        <FieldRow key={id} width="100" justify="between" align="center">
          <FieldRow direction="column">
            <Text color="title" weight="bold" size="4">{profession}</Text>
            <Text color="body" size="4" textTransform="uppercase">{vuz}</Text>
          </FieldRow>
          <Text color="title" weight="bold" size="4">{`${getYear(dateStart)} - ${getYear(dateEnd)}`}</Text>
        </FieldRow>
      ))}
    </div>
  )
}
