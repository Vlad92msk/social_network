import { Controller } from 'react-hook-form'
import { TextField } from '@shared/components/TextField'
import { ControlProps } from './controlProps'


export const ControlCompanyName = (props: ControlProps) => {
  const { control, index } = props
  return (
    <Controller
      name={`experienceSecondary.${index}.companyName`}
      control={control}
      rules={{
        required: 'Укажите название компании',
      }}
      render={({ field }) => (
        <TextField
          autoWidth
          label="Название компании"
          placeholder=""
          required
          {...field}
        />
      )}
    />
  )
}
