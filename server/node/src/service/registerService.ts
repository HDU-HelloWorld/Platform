import { registerTable } from '@prisma/client'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// type RegisterInput = Omit<registerTable, 'createdAt' | 'updatedAt'> & {
//   // 如果有默认值，可以在这里定义
//   status?: string
// }
class RegisterService {
  createRegisterTable = async (register: registerTable) => {
    await prisma.registerTable.create({
      data: {
        ...register,
      },
    })
  }
  getRegisterTable = async (id?: number) => {
    let res
    if (id) {
      res = await prisma.registerTable.findUnique({
        where: {
          id,
        },
      })
    } else {
      res = await prisma.registerTable.findMany()
    }
    return res
  }
}
export default new RegisterService()
