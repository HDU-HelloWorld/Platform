enum status {
  pending = 'pending',
  approved = 'approved',
  rejected = 'rejected',
}

export interface recuritTable {
  name: string
  id: number
  qqId: string
  phone: string
  bio: string
  status: status
  college: string
  major: string
  grade: string
  createAt: string
  updateAt: string
}
