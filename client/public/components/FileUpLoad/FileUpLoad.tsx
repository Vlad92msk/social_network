import { classnames } from '@bem-react/classnames'
import React, { useCallback, useEffect, useId } from 'react'

import { IconButton } from '@public//components/IconButton'
import { ButtonBox } from '@public/components/ButtonBox'
import { Modal } from '@public/components/Modal'
import {
  AddedFile,
  availableFormats,
  MaterialAttachProps,
  useBooleanState,
  useMaterialsAttach,
} from '@public/hooks'
import { IconName } from '@public/types/icon.model'
import { makeCn, classNames } from '@public/utils'
import { Icon } from 'public/components/Icon'
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

  // @ts-ignore
  return (
    <>
      <div className={classNames(cn(), className)}>
        <label className={cn('AddFile', { disabled })} htmlFor={inputId}>
          <Icon icon={icon!} />
          <input
            className={cn('FileInput')}
            id={inputId}
            onChange={handleAttach}
            multiple
            accept={availableTypes?.availableTypes.join(',')}
            type="file"
          />
        </label>
      </div>
      <Modal className={cn('Modal')} open={isOpenPevFiles && isConfirm}>
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
        <ButtonBox onClick={applyAttachments}>
          Подтвердить
        </ButtonBox>
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
