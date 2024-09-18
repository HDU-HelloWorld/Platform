import { MembershipModel } from './membership.model'
import { Major, College } from './collegeMajor.model'
// import OAuthAccount from './oauthAccount.model'
// import Profile from './profile.model'
// import Role from './role.model'
// import Session from './session.model'
type Role =
  | 'OFFICER' //干事
  | 'MINISTER' //部长
  | 'DEPUTY_MINISTER' //副部长
  | 'VICE_PRESIDENT' //副社长
  | 'PRESIDENT' //社长
interface UserModel {
  // 必选参数
  id: number
  email: string
  username: string
  password: string
  createdAt: Date
  roleId: number

  // 可选参数
  firstName?: string | null
  lastName?: string | null
  updatedAt?: Date | null
  memberships: MembershipModel[]
  oauthAccounts: OAuthAccount[]
  // profile?: Profile | null
  // sessions: Session[]
  role: Role
}
interface OAuthAccount {
  id: number
  provider: string
  providerId: string
  accessToken: string
  refreshToken?: string | null
  expiresAt?: Date | null
  userId: number
  user: UserModel
}
export type { UserModel, Role }
