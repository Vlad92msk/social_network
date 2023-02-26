import { Controller } from 'react-hook-form'
import { CalendarPopup } from '@shared/components/CalendarInput'
import { ControlProps } from './controlProps'

export const ControlDateStart = (props: ControlProps) => {
  const { control, index } = props

  return (
    <Controller
      name={`experienceSecondary.${index}.dateStart`}
      control={control}
      rules={{
        required: 'Укажите должность',
      }}
      render={({ field: { onChange } }) => (
        <CalendarPopup onChange={onChange} />
      )}
    />
  )
}
