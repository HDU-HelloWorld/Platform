import type { Context } from 'koa'
import type { LuckyWheel, Prize } from '@prisma/client'
import { LuckyWheelWithPrizeList } from '../types/index'
class LuckyWheelService {
  async createLuckyWheel(ctx: Context, luckyWheel: LuckyWheelWithPrizeList) {
    const existWheel = await this.getWheelInfo(ctx, luckyWheel.name)

    if (existWheel) {
      return null
    } else {
      //创建数据库
      const createdLuckyWheel = await ctx.prisma.luckyWheel.create({
        data: { name: luckyWheel.name },
      })
      const prizeDataWithLuckyWheel = luckyWheel.prizeList.map((prizeData) => ({
        ...prizeData,
        luckyWheelId: createdLuckyWheel.id,
      }))

      await ctx.prisma.prize.createMany({
        data: prizeDataWithLuckyWheel,
      })
      return this.getWheelInfo(ctx, createdLuckyWheel.name)
    }
  }
  async getWheelInfo(ctx: Context, name?: string) {
    // 查询数据库
    if (name) {
      return await ctx.prisma.luckyWheel.findUnique({
        where: {
          name,
        },
        include: {
          prizeList: true,
        },
      })
    } else {
      // return await ctx.prisma.luckyWheel.findMany({
      //   include: {
      //     prizeList: true,
      //   },
      // })
    }
  }

  async updateLuckyWheel(
    ctx: Context,
    name: string,
    updateData: Partial<LuckyWheel>
  ) {
    const existWheel = await this.getWheelInfo(ctx, name)
    if (existWheel) {
      //更新数据库
      ctx.prisma.luckyWheel.update({
        where: {
          name: existWheel.name,
        },
        data: updateData,
      })
    } else {
      return null
    }
  }
  async deleteLuckyWheel(ctx: Context, name: string) {
    const existWheel = await ctx.prisma.luckyWheel.findUnique({
      where: { name },
      include: { prizeList: true },
    })

    if (!existWheel) {
      return null
    }

    try {
      // 开始事务
      await ctx.prisma.$transaction(async (tx) => {
        // 删除所有关联的 Prize 记录
        await Promise.all(
          existWheel.prizeList.map((prize) =>
            ctx.prisma.prize.delete({ where: { id: prize.id } })
          )
        )

        // 删除 LuckyWheel 记录
        await ctx.prisma.luckyWheel.delete({ where: { name } })
      })

      return {
        message: 'LuckyWheel and its prizes have been deleted successfully.',
      }
    } catch (error) {
      console.error('Error deleting LuckyWheel and prizes:', error)
      throw error
    }
  }
  async drawPrize(ctx: Context, name: string) {
    //抽奖

    const existWheel = await this.getWheelInfo(ctx, name)
    if (existWheel) {
      //抽奖
      const prizeList = existWheel.prizeList
      const weightList: number[] = []
      prizeList.forEach((item) => {
        const weight = item.weight * item.remain
        weightList.push(weight)
      })

      const random = Math.floor(
        Math.random() * weightList[weightList.length - 1]
      )
      for (let index = 0; index < weightList.length; index++) {
        if (random < weightList[index]) {
          const prize = prizeList[index]
          prize.remain--
          return await ctx.prisma.prize.update({
            where: {
              id: prize.id,
            },
            data: {
              remain: prize.remain,
            },
          })
        }
      }
    } else {
      return null
    }
  }
}
export default new LuckyWheelService()
