import { allUsers } from '../user/allUsers'


export const friendList = allUsers.map(({ id, uuid, name, image }) => ({ id, uuid, name: name || `user_${uuid}`, image, messageCount: 0 }))

export type FriendList = typeof friendList[0]
