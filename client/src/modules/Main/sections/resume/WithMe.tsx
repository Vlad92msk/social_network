import React from 'react'
import { ChangeInfoModal } from '@modules/Main/components'
import { Button } from '@shared/components/Button'
import { FieldRow } from '@shared/components/FieldRow'
import { Image, ImagePath } from '@shared/components/Image'
import { Text } from '@shared/components/Text'
import { useToggle } from '@shared/hooks/useToggle'
import { cn } from './cn'

interface WithMeProps {
  info: {
    userPhoto: ImagePath
    userName: string
    position: string
  }
}

export const WithMe = (props: WithMeProps) => {
  const { info: { userName, userPhoto, position } } = props
  const [open, setOpen] = useToggle()

  return (
    <>
      <FieldRow width="100" align="center" gap="50px">
        <FieldRow className={cn('UserPhotoContainer')}>
          <Image path={userPhoto} />
        </FieldRow>
        <FieldRow direction="column">
          <Text color="title" textTransform="uppercase" size="8" weight="bold">{userName}</Text>
          <Text color="title" textTransform="uppercase" size="6">{position}</Text>
          <Button
            styleType="rounded"
            buttonName="green"
            style={{ marginTop: '10%' }}
            onClick={setOpen}
          >
            Редактировать
          </Button>
        </FieldRow>
      </FieldRow>
      <ChangeInfoModal open={open} setOpen={setOpen} />
    </>
  )
}
