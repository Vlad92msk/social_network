import { format } from 'date-fns'
import { ButtonBox } from '@shared/components/ButtonBox'
import { FieldRow } from '@shared/components/FieldRow'
import { Text } from '@shared/components/Text'
import { DateFormats } from '@shared/utils'
import { cn } from './cn'
import { Experience } from './mock'

export interface ExperienceItemProps {
  experience: Experience
  setSelectExperience: (id: Experience) => void
  activeId: string
}

export const ExperienceItem = (props: ExperienceItemProps) => {
  const { experience, setSelectExperience, activeId } = props
  const {
    id, dateStart, dateEnd, position, responsibility, companyName,
  } = experience
  return (
    <ButtonBox
      className={cn('ExperienceItem', { active: activeId === id })}
      onClick={() => setSelectExperience(experience)}
    >
      <Text className={cn('Period')} color="title" weight="bold" size="4">
        {`${format(dateStart, DateFormats.FORMAT_4)}-${dateEnd ? format(dateEnd, DateFormats.FORMAT_4) : 'н/в'}`}
      </Text>
      <div className={cn('ExperienceList')}>
        <FieldRow direction="column">
          <Text color="title" weight="bold" size="4">{position}</Text>
          <Text color="title" size="4">{companyName}</Text>
        </FieldRow>
        {responsibility?.map((value) => (
          <Text key={value} color="body" size="4">{`- ${value}`}</Text>
        ))}
      </div>
    </ButtonBox>
  )
}
