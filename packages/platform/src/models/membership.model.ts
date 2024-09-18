// Membership
import { ClubModel } from './club.model'
import { UserModel, Role } from './user.model'
interface MembershipModel {
  id: number
  role: Role
  userId: number
  clubId: number
  createdAt: Date
  updatedAt: Date
  club: ClubModel
  user: UserModel
}
export type { MembershipModel }
