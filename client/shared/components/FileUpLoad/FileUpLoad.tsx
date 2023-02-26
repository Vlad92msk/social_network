import { classnames } from '@bem-react/classnames'
import React, { useCallback, useEffect, useId } from 'react'

import { IconName } from '@public/models/icon.model'
import { Button } from '@shared/components/Button'
import { Icon } from '@shared/components/Icon'
import { IconButton } from '@shared/components/IconButton'
import { Modal } from '@shared/components/Modal'
import { useBooleanState } from '@shared/hooks'
import {
  AddedFile,
  availableFormats,
  MaterialAttachProps,
  useMaterialsAttach,
} from '@shared/hooks/useMaterialsAttach'
import { makeCn } from '@shared/utils'
import styles from './FileUpLoad.module.scss'


const cn = makeCn('FileUpLoad', styles)

type FileUpLoadProps = {
  className?: string
  icon?: IconName
  onApply: (files: AddedFile[]) => void
  disabled?: boolean
  availableTypes?: MaterialAttachProps
  isConfirm?: boolean
}

export const FileUpLoad: React.FC<FileUpLoadProps> = (props) => {
  const { className, icon, onApply, availableTypes, disabled, isConfirm } = props
  const inputId = useId()
  const [addedFiles, handleAttach, setAddedFiles] = useMaterialsAttach(availableTypes)

  const removeAttach = useCallback((e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setAddedFiles((prev) => prev.filter(({ name }) => name !== e?.currentTarget.name))
  }, [setAddedFiles])

  /**
   * Модалка предпросмотра материалов
   */
  const [isOpenPevFiles, openPrevFiles, closePrevFiles] = useBooleanState(false)
  useEffect(() => {
    if (addedFiles.length) {
      /**
       * Открывает модалку если добавлен материал
       */
      openPrevFiles()
    } else {
      /**
       * Закрывает модалку если не осталось материалов
       */
      closePrevFiles()
    }
  }, [addedFiles, closePrevFiles, openPrevFiles])


  const applyAttachments = useCallback(() => {
    onApply(addedFiles)
    setAddedFiles([])
  }, [addedFiles, onApply, setAddedFiles])

  /**
   * Если не нужно вызывать модалку с подтверждением - просто добавляет файлы
   */
  useEffect(() => {
    if (!isConfirm && addedFiles.length) {
      setTimeout(() => applyAttachments(), 500)
    }
  }, [isConfirm, addedFiles, applyAttachments])

  return (
    <>
      <div className={classnames(cn(), className)}>
        <label className={cn('AddFile', { disabled })} htmlFor={inputId}>
          <Icon
            icon={icon}
            size="small"
            fill="oldAsphalt50"
          />
          <input
            className={cn('FileInput')}
            id={inputId}
            onChange={handleAttach}
            multiple
            accept={availableTypes.availableTypes.join(',')}
            type="file"
          />
        </label>
      </div>
      <Modal className={cn('Modal')} open={isOpenPevFiles && isConfirm} onClose={closePrevFiles}>
        <div className={cn('ApplyAttachments')}>
          {addedFiles.map(({ name, src }) => (
            <div key={name} className={cn('ApplyImg')}>
              <div className={cn('ImgWrapper')}>
                <img className={cn('Img')} src={src} alt={name} />
              </div>
              <IconButton className={cn('CloseApply')} icon="close" name={name} onClick={removeAttach} />
            </div>
          ))}
        </div>
        <Button onClick={applyAttachments} buttonName="green" color="blue">
          Подтвердить
        </Button>
      </Modal>
    </>
  )
}

FileUpLoad.defaultProps = {
  icon: 'attachment',
  availableTypes: {
    availableTypes: availableFormats,
    maxFileSize: 20971520,
  },
}
