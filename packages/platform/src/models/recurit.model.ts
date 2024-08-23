// class RecuritModule {
//    name:string,
//    id:internal,
//    constructor(data){
//       this.name = data.name
//       this.id = data.id
//    }
// }
enum status {
  pending = 'pending',
  approved = 'approved',
  rejected = 'rejected',
}

export interface recuritTable {
  username: string
  id: number
  email?: string
  phone?: string
  address?: string
  bio?: string
  status: status
  school: string
  major: string
}
