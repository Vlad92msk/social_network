import { useCallback } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { ChangeResume } from '@modules/Main/components'
import { ButtonBox } from '@shared/components/ButtonBox'
import { FieldRow } from '@shared/components/FieldRow'
import { FieldSet } from '@shared/components/FieldSet'
import { Icon } from '@shared/components/Icon'
import { Text } from '@shared/components/Text'
import { Experience as ExperienceType } from '../../sections/resume/mock'
import { cn } from './cn'
import {
  ControlCompanyName,
  ControlDateEnd,
  ControlDateStart,
  ControlPosition,
  ControlResponsibility,
  ControlSkills,
} from './controls'

const initConvoyPerson: ExperienceType = {
  id: '3613',
  skills: null,
  responsibility: null,
  position: null,
  dateEnd: null,
  dateStart: null,
  companyName: null,
}

export const Experience = () => {
  const { control } = (useFormContext<ChangeResume>() || {})

  const { fields, append } = useFieldArray({
    control,
    name: 'experienceSecondary',
  })

  const handleAddPerson = useCallback(() => {
    append(initConvoyPerson)
  }, [append])

  return (
    <FieldSet className={cn('Experience')} label="Опыт">
      <div className={cn('ExperienceContainer')}>
        {fields.map((field, index) => (
          <div className={cn('ExperienceContainerItem')} key={field.id}>
            <ControlCompanyName control={control} index={index} />
            <ControlPosition control={control} index={index} />
            <FieldRow justify="between" width="100" gap="10px">
              <ControlDateStart control={control} index={index} />
              <ControlDateEnd control={control} index={index} />
            </FieldRow>
            <ControlSkills control={control} index={index} />
            <ControlResponsibility control={control} index={index} />
          </div>
        ))}
      </div>
      <ButtonBox className={cn('ExperienceAdd')} onClick={handleAddPerson}>
        <Icon icon="plus" size="small_1" fill="light100" />
        <Text weight="bold" color="body"> Добавить сопровождающего</Text>
      </ButtonBox>
    </FieldSet>
  )
}
