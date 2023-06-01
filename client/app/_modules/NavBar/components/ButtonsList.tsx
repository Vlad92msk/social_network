'use client'

import { Text } from '@common'
import { useSearchParams } from 'next/navigation'
import { ButtonBox } from '@public/components/ButtonBox'
import { Icon } from '@public/components/Icon'
import { useSetSearchParams } from '@public/hooks'
import { makeCn } from '@public/utils'
import { NAV_LIST } from '../../../../src/data/navigation'
import styles from '../NavBar.module.scss'

const cn = makeCn('ButtonsList', styles)


export const ButtonsList = () => {
  const searchParams = useSearchParams()
  const createQueryString = useSetSearchParams()

  return (
    <div className={cn()}>
      {Object.values(NAV_LIST).map(({ id, title, icon }) => {
        const isActive = searchParams.get('folder') === icon

        return (
          <ButtonBox
            key={id}
            as="a"
            className={cn('Button', { active: isActive })}
            onClick={() => {
              createQueryString('folder', icon)
            }}
          >
            <Icon className={cn('ButtonIcon')} icon={icon} />
            <Text className={cn('ButtonText')}>{title}</Text>
          </ButtonBox>
        )
      })}
    </div>
  )
}
