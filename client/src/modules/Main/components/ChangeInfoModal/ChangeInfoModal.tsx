import React, { useCallback } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { ResumeModel, useContextSelector } from '@modules/Main/service'
import { Button } from '@shared/components/Button'
import { FieldRow } from '@shared/components/FieldRow'
import { Modal } from '@shared/components/Modal'
import { useSwitcher } from '@shared/hooks'
import { SwitchType } from 'src/components'
import { cn } from './cn'
import { Contacts } from './Contacts'
import { Experience } from './Experience'
import { Hobbies } from './Hobbies'
import { School } from './School'
import { Skills } from './Skills'
import { WithMe } from './WithMe'


const enum ChangeSections {
  MAIN= 'main',
  HOBBIES= 'hobbies',
  CONTACTS = 'contacts',
  SKILLS= 'skills',
  EXP='experience',
  SCHOOL = 'school'
}


const sections: Record<ChangeSections, JSX.Element> = {
  [ChangeSections.MAIN]: <WithMe />,
  [ChangeSections.HOBBIES]: <Hobbies />,
  [ChangeSections.CONTACTS]: <Contacts />,
  [ChangeSections.SKILLS]: <Skills />,
  [ChangeSections.EXP]: <Experience />,
  [ChangeSections.SCHOOL]: <School />,
}

export type ChangeResume = {
  school: ResumeModel['school']
  hobbies: ResumeModel['hobbies']
  contacts: ResumeModel['contacts']
  skills: ResumeModel['experienceAndSkills']['skills']
  experienceSecondary: ResumeModel['experienceAndSkills']['experienceSecondary']
  experiencePrimary: ResumeModel['experienceAndSkills']['experiencePrimary']
  position: ResumeModel['withMe']['position']
}


interface ChangeInfoModalProps {
  open: boolean
  setOpen: () => void
}

export const ChangeInfoModal = (props: ChangeInfoModalProps) => {
  const { open, setOpen } = props
  const {
    school, hobbies, contacts,
    withMe: { position },
    experienceAndSkills: { skills, experienceSecondary, experiencePrimary },
  } = useContextSelector((store) => store.resume)

  const [openSection, switcher] = useSwitcher<ChangeSections>({
    initial: ChangeSections.MAIN,
    groupName: 'changeResumeInfoSection',
    type: SwitchType.VERTICAL,
    className: cn('Switcher'),
    options: [
      { value: ChangeSections.MAIN, label: 'Осн' },
      { value: ChangeSections.HOBBIES, label: 'Увлечения' },
      { value: ChangeSections.CONTACTS, label: 'Контакты' },
      { value: ChangeSections.SKILLS, label: 'Навыки' },
      { value: ChangeSections.EXP, label: 'Опыт' },
      { value: ChangeSections.SCHOOL, label: 'Учеба' },
    ],
  })

  const methods = useForm<ChangeResume>({
    defaultValues: {
      school, hobbies, contacts, skills, experienceSecondary, experiencePrimary, position,
    },
  })
  const { handleSubmit } = methods

  const handleSave = useCallback((data) => {
    console.log('formData', data)
  }, [])


  return (
    <Modal className={cn()} open={open} onClose={setOpen}>
      {switcher}
      <FormProvider {...methods}>
        <form
          className={cn('Form')}
          id="ChangeResume-form"
          onSubmit={handleSubmit(handleSave)}
        >
          {sections[openSection]}
          <FieldRow className={cn('Actions')} width="100" justify="end">
            <Button
              className={cn('Submit')}
              styleType="filled"
              buttonName="green"
              type="reset"
              icon="exit"
            />
            <Button
              className={cn('Submit')}
              styleType="filled"
              buttonName="green"
              type="submit"
              icon="user"
            />
          </FieldRow>
        </form>
      </FormProvider>
    </Modal>
  )
}
