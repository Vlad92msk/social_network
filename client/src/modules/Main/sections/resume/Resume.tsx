import { useContextSelector } from '@modules/Main/service'
import { SectionContainer } from '../../components'
import { cn } from './cn'
import { Contacts } from './Contacts'
import { ExperienceAndSkills } from './ExperienceAndSkills'
import { School } from './School'
import { WithMe } from './WithMe'

export const Resume = () => {
  const {
    contacts,
    experienceAndSkills: { skills, experiencePrimary, experienceSecondary },
    hobbies,
    school,
    withMe,
  } = useContextSelector((store) => store.resume)

  return (
    <SectionContainer
      className={cn()}
      title="Обо мне"
      lastAdded={new Date()}
      withSwitcher={false}
    >
      <WithMe info={withMe} />
      <Contacts contacts={contacts} hobbies={hobbies} />
      <ExperienceAndSkills
        skills={skills}
        experienceSecondary={experienceSecondary}
        experiencePrimary={experiencePrimary}
      />
      <School schoolInfo={school} />
    </SectionContainer>
  )
}
