import { Text } from '@shared/components/Text'
import { makeCn } from '@shared/utils'
import { UserIMGPreview } from 'src/components'
import styles from './AddNewMessageUsers.module.scss'

const cn = makeCn('AddNewMessageUsers', styles)

export interface AddNewMessageUsersProps {
  addCount: number
  lastUser: any
  prevUser: any
}

export const AddNewMessageUsers = (props: AddNewMessageUsersProps) => {
  const { addCount, prevUser, lastUser } = props
  return (
    <div className={cn()}>
      <span className={cn('UsersPlus')}>
        <Text size="1" color="note">{`${addCount > 99 ? '+99' : `+${addCount}`}`}</Text>
      </span>
      <UserIMGPreview moduleName="users" folder="photo" img="1" />
      <UserIMGPreview moduleName="users" folder="photo" img="1" />
    </div>
  )
}
