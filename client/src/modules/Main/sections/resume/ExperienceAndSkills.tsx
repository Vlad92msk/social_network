import React, { useMemo, useState } from 'react'
import { FieldRow } from '@shared/components/FieldRow'
import { Icon } from '@shared/components/Icon'
import { Text } from '@shared/components/Text'
import { useSwitcher } from '@shared/hooks'
import { cn } from './cn'
import { ExperienceItem } from './ExperienceItem'
import { Experience, Skills } from './mock'

const enum VisibleExp {
  PRIMARY = 'primary',
  SECONDARY = 'secondary'
}

interface ExperienceAndSkillsProps {
  experiencePrimary: Experience[]
  experienceSecondary: Experience[]
  skills: Skills []
}

export const ExperienceAndSkills = (props: ExperienceAndSkillsProps) => {
  const { experiencePrimary, experienceSecondary, skills } = props
  const [selectExperience, setSelectExperience] = useState<Experience>(null)

  const [visibleExp, switcher] = useSwitcher({
    initial: VisibleExp.PRIMARY,
    groupName: 'visibleExp',
    options: [
      { value: VisibleExp.PRIMARY, label: 'осн' },
      { value: VisibleExp.SECONDARY, label: 'доп' },
    ],
  })

  return (
    <FieldRow width="100" justify="between">
      <div className={cn('Skills')}>
        <Text color="title" size="6">Навыки</Text>
        <div className={cn('SkillsContainer')}>
          <div className={cn('SkillsBox')}>
            {skills.map(({ id, name }) => (
              <Icon
                className={cn('SkillsItem', { active: selectExperience?.skills.includes(name) })}
                key={id}
                icon={name}
                size="medium"
                basePath="users/skills/"
              />
            ))}
          </div>
        </div>
      </div>
      <div className={cn('Experience')}>
        <FieldRow justify="between" width="100" align="center">
          <Text color="title" size="6" weight="bold" textTransform="uppercase">Опыт</Text>
          {switcher}
        </FieldRow>
        {useMemo(
          () => (visibleExp === VisibleExp.PRIMARY ? (
            <div className={cn('ExperienceContainer')}>
              {experiencePrimary.map((item) => (
                <ExperienceItem
                  key={item.id}
                  experience={item}
                  activeId={selectExperience?.id}
                  setSelectExperience={setSelectExperience}
                />
              ))}
            </div>
          ) : (
            <div className={cn('ExperienceContainer')}>
              {experienceSecondary.map((item) => (
                <ExperienceItem
                  key={item.id}
                  experience={item}
                  activeId={String(selectExperience?.id)}
                  setSelectExperience={setSelectExperience}
                />
              ))}
            </div>
          )),
          [experiencePrimary, experienceSecondary, selectExperience?.id, visibleExp],
        )}
      </div>
    </FieldRow>
  )
}
