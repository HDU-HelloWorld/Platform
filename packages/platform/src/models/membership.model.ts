// Membership
import Club from './club.Model'
import User from './user.model'
export default class Membership {
  id: number
  role: string
  userId: number
  clubId: number
  createdAt: Date
  updatedAt: Date
  club: Club
  user: User

  constructor(
    id: number,
    role: string,
    userId: number,
    clubId: number,
    createdAt: Date,
    updatedAt: Date,
    club: Club,
    user: User
  ) {
    this.id = id
    this.role = role
    this.userId = userId
    this.clubId = clubId
    this.createdAt = createdAt
    this.updatedAt = updatedAt
    this.club = club
    this.user = user
  }
}
