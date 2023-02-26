import { Controller } from 'react-hook-form'
import { TextField } from '@shared/components/TextField'
import { ControlProps } from './controlProps'


export const ControlResponsibility = (props: ControlProps) => {
  const { control, index } = props
  return (
    <Controller
      name={`experienceSecondary.${index}.position`}
      control={control}
      rules={{
        required: 'Укажите должность',
      }}
      render={({ field }) => (
        <TextField
          autoWidth
          label="Должность"
          placeholder=""
          required
          {...field}
        />
      )}
    />
  )
}
