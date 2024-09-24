import signInService from '../service/signInService'
import type { Context } from 'koa'
export const createSignInEvent = async (ctx: Context) => {
  const { event, studentIds } = ctx.request.body as {
    event: string
    studentIds: number[]
  }
  const result = await signInService.createSignInEvent(ctx, event, studentIds)
  result
    ? ctx.success({ data: result })
    : ctx.fail({ msg: '已存在', data: result })
}
export const getSignInEvent = async (ctx: Context) => {
  const event = ctx.query.event as string
  const result = await signInService.getSignInEvent(ctx, event)
  result
    ? ctx.success({ data: result })
    : ctx.fail({ msg: '获取失败', data: result })
}
export const signIn = async (ctx: Context) => {
  const { studentId, event } = ctx.request.body as {
    studentId: number
    event: string
  }
  const result = await signInService.signIn(ctx, event, studentId)
  result
    ? ctx.success({ data: result })
    : ctx.fail({ msg: '签到失败', data: result })
}
