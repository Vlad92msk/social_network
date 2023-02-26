import { FieldRow } from '@shared/components/FieldRow'
import { Icon } from '@shared/components/Icon'
import { Text } from '@shared/components/Text'
import { Contact, Hobie } from './mock'

interface ContactsProps {
  hobbies: Hobie[]
  contacts: Contact[]
}

export const Contacts = (props: ContactsProps) => {
  const { contacts, hobbies } = props
  return (
    <FieldRow width="100" justify="between">
      <FieldRow direction="column" width="50" gap="10px">
        <Text color="title" size="6">Увлечения</Text>
        <FieldRow width="100" wrap="wrap" gap="10px">
          {hobbies.map(({
            id,
            name,
          }) => (
            <Icon
              key={id}
              icon={name}
              size="medium"
              basePath="users/hobbies/"
              fill="bluePrimrose50"
            />
          ))}
        </FieldRow>
      </FieldRow>
      <FieldRow direction="column" width="50" align="bottom" gap="10px">
        <Text color="title" size="6">Контакты</Text>
        <FieldRow direction="column" align="bottom" gap="5px">
          {contacts.map(({
            id,
            value,
            type,
          }) => (
            <FieldRow key={id} justify="end" gap="5px" align="center">
              <Text color="body">{value}</Text>
              <Icon icon={type} fill="oldAsphalt40" size="ordinary" />
            </FieldRow>
          ))}
        </FieldRow>
      </FieldRow>
    </FieldRow>
  )
}
