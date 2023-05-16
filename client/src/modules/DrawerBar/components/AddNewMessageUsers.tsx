import { makeCn } from '@public/utils'
import { UserIMGPreview } from '../../../components'
import { Text } from '../../../components/Text'
import styles from '../DrawerBar.module.scss'

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
        <Text size="10">{`${addCount > 99 ? '+99' : `+${addCount}`}`}</Text>
      </span>
      <UserIMGPreview moduleName="users" folder="photo" img="1" />
      <UserIMGPreview moduleName="users" folder="photo" img="1" />
    </div>
  )
}
