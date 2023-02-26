import { Control } from 'react-hook-form'
import { ChangeResume } from '@modules/Main/components'

export interface ControlProps {
  index: number
  control: Control<ChangeResume, any>
}
