import { registerTable } from '@prisma/client'
import type { Context } from 'koa'

// type RegisterInput = Omit<registerTable, 'createdAt' | 'updatedAt'> & {
//   // 如果有默认值，可以在这里定义
//   status?: string
// }
class RegisterService {
  createRegisterTable = async (ctx: Context, register: registerTable) => {
    const exist = await ctx.prisma.registerTable.findUnique({
      where: {
        id: register.id,
      },
    })
    if (exist) {
      return null
    } else {
      return await ctx.prisma.registerTable.create({
        data: {
          ...register,
        },
      })
    }
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
    return await ctx.prisma.registerTable.update({
      where: {
        id,
      },
      data: {
        status,
      },
    })
  }

  // updateRegisterTable = async (
  //   ctx: Context,
  //   id: number,
  //   register: registerTable
  // ) => {}

  updateRegisterTable = async (
    ctx: Context,
    id: number,
    updateData: Partial<registerTable>
  ) => {
    const exist = await this.getRegisterTable(ctx, id)
    if (exist) {
    }
    try {
      // 更新记录
      const updatedRecord = await ctx.prisma.registerTable.update({
        where: { id },
        data: updateData,
      })

      return updatedRecord
    } catch (error) {
      return error
    }
  }
}
export default new RegisterService()
