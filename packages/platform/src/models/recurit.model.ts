export interface recuritTable {
  username: string
  id: number
  qqId: string
  phone: string
  bio: string
  status: 'pending' | 'approved' | 'rejected'
  department: 'WEB' | '后端' | 'AI' | '行政'
  college: string
  major: string
  grade: string
  createAt: string
  updateAt: string
}
