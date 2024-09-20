import type { Context } from 'koa'
import luckyWheelService from '../service/luckyWheelService'
import type { LuckyWheelWithPrizeList } from '../types/index'
export const createLuckyWheel = async (ctx: Context) => {
  const { luckyWheel } = ctx.request.body as {
    luckyWheel: LuckyWheelWithPrizeList
  }
  const res = await luckyWheelService.createLuckyWheel(ctx, luckyWheel)
  res ? ctx.success({ data: res }) : ctx.fail({ code: 500, msg: '创建失败' })
}
export const getLuckyWheel = async (ctx: Context) => {
  const { name } = ctx.request.query as { name: string }
  const res = await luckyWheelService.getWheelInfo(ctx, name)
  res ? ctx.success({ data: res }) : ctx.fail({ code: 500, msg: '获取失败' })
}
export const drawPrize = async (ctx: Context) => {
  const { name } = ctx.request.body as { name: string }
  const res = await luckyWheelService.drawPrize(ctx, name)
  res ? ctx.success({ data: res }) : ctx.fail({ code: 500, msg: '抽奖失败' })
}
