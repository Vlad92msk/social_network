import React from 'react'
import { ButtonBox } from '@shared/components/ButtonBox'
import { Icon } from '@shared/components/Icon'
import { Text } from '@shared/components/Text'
import { AddedFile } from '@shared/hooks/useMaterialsAttach'
import { makeCn } from '@shared/utils'
import styles from 'src/components/Attachment/Attachment.module.scss'


const cn = makeCn('Attachment', styles)

export enum ATTACHMENT_ACTION {
  SAVE = 'save',
  PLAY = 'play'
}

type AttachmentProps = {
  attach: AddedFile
  action: ATTACHMENT_ACTION
}

export const Attachment: React.FC<AttachmentProps> = React.memo((props) => {
  const { attach: { name, src }, action } = props

  return (
    <ButtonBox
      className={cn()}
      as="a"
      href={src}
      icon="file-outlined"
      download={action === ATTACHMENT_ACTION.SAVE}
    >
      <Icon className={cn('Icon')} icon="file-outlined" size="small" />
      <Text className={cn('Name')} size="2">{name}</Text>
    </ButtonBox>
  )
})
