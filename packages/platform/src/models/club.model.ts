// import Membership from './membership.model'
import type { UserModel } from './user.model'
import type { MembershipModel } from './membership.model'

interface DepartmentModel {
  name: 'WEB' | '后端' | 'AI' | '行政'
  Leaders: MembershipModel[]
  memberships: MembershipModel[]
  description: string | ''
}
interface ClubModel {
  departments: DepartmentModel[]
  Leaders: MembershipModel[]
  name: string
  description?: string | null
  memberships: MembershipModel[]
}
export type { ClubModel }
