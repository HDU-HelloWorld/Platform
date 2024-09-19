import { registerTable } from '@prisma/client'
import type { Context } from 'koa'

// type RegisterInput = Omit<registerTable, 'createdAt' | 'updatedAt'> & {
//   // 如果有默认值，可以在这里定义
//   status?: string
// }
class RegisterService {
  createRegisterTable = async (ctx: Context, register: registerTable) => {
    await ctx.prisma.registerTable.create({
      data: {
        ...register,
      },
    })
  }
  getRegisterTable = async (ctx: Context, id?: number) => {
    let res
    if (id) {
      res = await ctx.prisma.registerTable.findUnique({
        where: {
          id,
        },
      })
    } else {
      res = await ctx.prisma.registerTable.findMany()
    }
    return res
  }
  updateRegisterStatus = async (ctx: Context, id: number, status: string) => {
    await ctx.prisma.registerTable.update({
      where: {
        id,
      },
      data: {
        status,
      },
    })
  }
  updateRegisterTable = async (
    ctx: Context,
    id: number,
    register: registerTable
  ) => {}
}
export default new RegisterService()
