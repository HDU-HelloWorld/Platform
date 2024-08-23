import Membership from './membership.model'
// import OAuthAccount from './oauthAccount.model'
// import Profile from './profile.model'
// import Role from './role.model'
// import Session from './session.model'
export default class User {
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
  memberships: Membership[]
  oauthAccounts: OAuthAccount[]
  profile?: Profile | null
  sessions: Session[]
  role: Role

  constructor(
    id: number,
    email: string,
    username: string,
    password: string,
    createdAt: Date,
    roleId: number,
    memberships: Membership[],
    oauthAccounts: OAuthAccount[],

    sessions: Session[],
    role: Role,
    firstName?: string | null,
    lastName?: string | null,
    updatedAt?: Date | null,
    profile?: Profile | null
  ) {
    this.id = id
    this.email = email
    this.username = username
    this.password = password
    this.createdAt = createdAt
    this.roleId = roleId
    this.firstName = firstName
    this.lastName = lastName
    this.updatedAt = updatedAt
    this.memberships = memberships
    this.oauthAccounts = oauthAccounts
    this.profile = profile
    this.sessions = sessions
    this.role = role
  }
}
class OAuthAccount {
  id: number
  provider: string
  providerId: string
  accessToken: string
  refreshToken?: string | null
  expiresAt?: Date | null
  userId: number
  user: User

  constructor(
    id: number,
    provider: string,
    providerId: string,
    accessToken: string,
    userId: number,
    user: User,
    refreshToken?: string | null,
    expiresAt?: Date | null
  ) {
    this.id = id
    this.provider = provider
    this.providerId = providerId
    this.accessToken = accessToken
    this.refreshToken = refreshToken
    this.expiresAt = expiresAt
    this.userId = userId
    this.user = user
  }
}
