import { MediaType } from './mediaType'

export interface MediaItemType {
  id: string // Наверно хеширвоать с userID + DataCreate
  title: string
  authorName: string
  authorId: number
  likeUsersIds: number[]
  disLikeUsersIds: number[],
  likeCount: number
  disLikeCounts: number
  commentsCount: number
  date: Date
  description: string
  hash?: string | null
  commentUsersIds: number[]
  albumId: number
  path: string
  type: MediaType
  viewCount: number
}
