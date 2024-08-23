import Membership from './membership.model'
export default class Club {
  id: number
  name: string
  description?: string | null
  createdAt: Date
  updatedAt: Date
  memberships: Membership[]

  constructor(
    id: number,
    name: string,
    createdAt: Date,
    updatedAt: Date,
    memberships: Membership[],
    description?: string | null
  ) {
    this.id = id
    this.name = name
    this.description = description
    this.createdAt = createdAt
    this.updatedAt = updatedAt
    this.memberships = memberships
  }
}
