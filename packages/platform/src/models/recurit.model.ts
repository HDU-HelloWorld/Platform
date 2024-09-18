enum status {
  pending = 'pending',
  approved = 'approved',
  rejected = 'rejected',
}

export interface recuritTable {
  username: string
  id: number
  qqId: string
  phone: string
  bio: string
  status: status
  school: string
  major: string
  grade: string
  createAt: string
  updateAt: string
}
