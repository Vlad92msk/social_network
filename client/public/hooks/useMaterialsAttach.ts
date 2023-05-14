import React, { ChangeEvent, useCallback, useState } from 'react'
import {
  FILE_FORMAT_APP,
  FILE_FORMAT_AUDIO,
  FILE_FORMAT_IMAGE,
  FILE_FORMAT_TEXT,
  FILE_FORMAT_VIDEO,
} from '@public/types/fileFormats'

/**
 * Доступные для добавления форматы изображений
 */
export const availableImages = Object.fromEntries(
  Object.entries(FILE_FORMAT_IMAGE).filter(([_, fileType]) => (
    fileType === FILE_FORMAT_IMAGE.BMP
    || fileType === FILE_FORMAT_IMAGE.GIF
    || fileType === FILE_FORMAT_IMAGE.JPG
    || fileType === FILE_FORMAT_IMAGE.TIFF
    || fileType === FILE_FORMAT_IMAGE.PNG
    || fileType === FILE_FORMAT_IMAGE.WEBP
    || fileType === FILE_FORMAT_IMAGE.PSD
  )),
)

/**
 * Доступные для добавления видео форматы
 */
export const availableVideoFormats = Object.fromEntries(
  Object.entries(FILE_FORMAT_VIDEO).filter(([_, fileType]) => (
    fileType === FILE_FORMAT_VIDEO.AVI
    || fileType === FILE_FORMAT_VIDEO.MP4
    || fileType === FILE_FORMAT_VIDEO.MPEG
  )),
)

/**
 * Доступные для добавления аудио форматы
 */
export const availableAudioFormats = Object.fromEntries(
  Object.entries(FILE_FORMAT_AUDIO).filter(([_, fileType]) => (
    fileType === FILE_FORMAT_AUDIO.WAV
    || fileType === FILE_FORMAT_AUDIO.WMA
    || fileType === FILE_FORMAT_AUDIO.WAX
  )),
)

/**
 * Доступные для добавления текстовые форматы
 */
export const availableTextFormats = Object.fromEntries(
  Object.entries(FILE_FORMAT_TEXT).filter(([_, fileType]) => (
    fileType === FILE_FORMAT_TEXT.CSS
    || fileType === FILE_FORMAT_TEXT.YAML
    || fileType === FILE_FORMAT_TEXT.TXT
    || fileType === FILE_FORMAT_TEXT.CURL
    || fileType === FILE_FORMAT_TEXT.HTML
    || fileType === FILE_FORMAT_TEXT.CSV
  )),
)

/**
 * Доступные для добавления форматы приложений
 */
export const availableAppFormats = Object.fromEntries(
  Object.entries(FILE_FORMAT_APP).filter(([_, fileType]) => (
    fileType === FILE_FORMAT_APP.DOC
    || fileType === FILE_FORMAT_APP.DOCX
    || fileType === FILE_FORMAT_APP.DOCM
    || fileType === FILE_FORMAT_APP.ZIP
    || fileType === FILE_FORMAT_APP.ZZ
    || fileType === FILE_FORMAT_APP.RAR
    || fileType === FILE_FORMAT_APP.ODT
    || fileType === FILE_FORMAT_APP.XLS
    || fileType === FILE_FORMAT_APP.XLSB
    || fileType === FILE_FORMAT_APP.XLSM
    || fileType === FILE_FORMAT_APP.XLSX
  )),
)

/**
 * Доступные ворматы для загрузки
 */
export const availableFormats: string[] = Object.values(
  {
    ...availableImages,
    ...availableVideoFormats,
    ...availableAudioFormats,
    ...availableTextFormats,
    ...availableAppFormats,
  },
)


export interface AddedFile extends File {
  src: string
}


export type MaterialAttachProps = {
  maxFileSize?: number
  availableTypes: string[]
}

type MaterialAttach = [
  AddedFile[],
  (fileInputRef: ChangeEvent<HTMLInputElement>) => void,
  React.Dispatch<React.SetStateAction<AddedFile[]>>
]

export const useMaterialsAttach = (props: MaterialAttachProps | undefined): MaterialAttach => {
  const [addedFiles, setAddedFiles] = useState<AddedFile[]>([])

  const handleAddFiles = useCallback((fileInputRef: React.ChangeEvent<HTMLInputElement>) => {
    // Сначала очищаем список добавленных файлов.
    setAddedFiles([])

    // Если не предоставлен fileInputRef, просто возвращаемся.
    if (!fileInputRef) return

    // Извлекаем файлы из события изменения ввода.
    const currentFiles = fileInputRef.target?.files

    // Если файлы отсутствуют, просто возвращаемся.
    if (!currentFiles) return

    // Создаем временный массив для хранения новых файлов
    const newFiles: AddedFile[] = []

    // Преобразуем список файлов в массив и обрабатываем каждый файл.
    Array.from(currentFiles)
      .map((file) => {
        const { type, size } = file

        // Если тип файла или размер файла не соответствуют заданным ограничениям, пропускаем этот файл.
        if (!props || (props.availableTypes && !props.availableTypes.includes(type)) || (props.maxFileSize && size > props.maxFileSize)) return null

        // В противном случае возвращаем файл для дальнейшей обработки.
        return file
      })
      .filter(Boolean) // Отфильтровываем недействительные (null) файлы.
      .forEach((file: File) => {
        // Создаем URL для файла, который может быть использован для отображения файла в браузере.
        const url = URL.createObjectURL(file)

        // Создаем объект AddedFile, который содержит информацию о файле и URL для отображения.
        const addedFile: AddedFile = {
          ...file,
          lastModified: file.lastModified,
          name: file.name,
          size: file.size,
          type: file.type,
          webkitRelativePath: file.webkitRelativePath,
          // @ts-ignore
          lastModifiedDate: file.lastModifiedDate,
          src: url,
        }

        // Добавляем новый файл во временный массив.
        newFiles.push(addedFile)
      })

    // Обновляем состояние с новым списком файлов только один раз
    setAddedFiles(newFiles)
  }, [props])

  return [addedFiles, handleAddFiles, setAddedFiles]
}


// export const useMaterialsAttach = (props: MaterialAttachProps): MaterialAttach => {
//   const [addedFiles, setAddedFiles] = useState<AddedFile[]>([])
//
//   const handleAddFiles = useCallback((fileInputRef: React.ChangeEvent<HTMLInputElement>) => {
//     setAddedFiles([])
//     /**
//      * Нет ссылки -выходим
//      */
//     if (!fileInputRef) return
//     const currentFiles = fileInputRef.target?.files
//
//     /**
//      * Нет файла - выходим
//      */
//     if (!currentFiles) return
//
//     lodash
//       .toArray(currentFiles)
//       .map((file) => {
//         const { type, size } = file
//         /**
//        * Проверка на тип и размер
//        */
//         if (!props.availableTypes.includes(type) || size > props.maxFileSize) return null
//
//         return file
//       })
//       .filter(Boolean)
//       .forEach((file) => {
//         const url = URL.createObjectURL(file!)
//
//         setAddedFiles((prev) => [...prev, {
//           lastModified: file.lastModified,
//           name: file.name,
//           size: file.size,
//           type: file.type,
//           webkitRelativePath: file.webkitRelativePath,
//           // @ts-ignore
//           lastModifiedDate: file.lastModifiedDate,
//           src: url,
//           ...file,
//         }])
//       })
//   }, [props])
//
//   return [addedFiles, handleAddFiles, setAddedFiles]
// }
