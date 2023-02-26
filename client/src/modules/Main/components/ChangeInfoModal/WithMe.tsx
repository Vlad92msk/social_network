import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { ChangeResume } from '@modules/Main/components'
import { FieldSet } from '@shared/components/FieldSet'
import { TextField } from '@shared/components/TextField'
import { cn } from './cn'

export const WithMe = () => {
  const { control } = (useFormContext<ChangeResume>() || {})

  return (
    <FieldSet className={cn('WithMe')} label="Обо мне">
      <Controller
        control={control}
        rules={{
          required: 'Введите название',
        }}
        name="position"
        render={({ field: { onChange, value } }) => (
          <TextField
            label="Специальность"
            placeholder="Введите название..."
            value={value}
            onChange={onChange}
          />
        )}
      />
      {/* <Controller */}
      {/*  control={control} */}
      {/*  name="name2" */}
      {/*  rules={{ */}
      {/*    required: 'Введите описание', */}
      {/*  }} */}
      {/*  render={({ field: { onChange, value } }) => ( */}
      {/*    <AreaField */}
      {/*      label="Описание" */}
      {/*      placeholder="Введите описание описание..." */}
      {/*      value={value} */}
      {/*      onChange={onChange} */}
      {/*    /> */}
      {/*  )} */}
      {/* /> */}
    </FieldSet>
  )
}
