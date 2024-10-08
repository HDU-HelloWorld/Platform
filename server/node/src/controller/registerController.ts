import registerService from '../service/registerService'
import type { Context } from 'koa'
import bodyParser from 'koa-bodyparser'
import { registerTable } from '@prisma/client'
import emailService from '../service/emailService'

export const createRegisterTable = async (ctx: Context) => {
  const registerData = ctx.request.body as registerTable
  const table = await registerService.createRegisterTable(ctx, registerData)
  await emailService.createEmail(ctx, registerData.qqId + '@qq.com')
  table
    ? ctx.success({ data: table })
    : ctx.fail({ code: -1, msg: '用户已注册', data: table })
}
export const getRegisterTableList = async (ctx: Context) => {
  const tableList = (await registerService.getRegisterTable(
    ctx
  )) as registerTable[]
  // try {
  //   // for (const item of tableList) {
  //   await emailService.createEmail(ctx,  '@qq.com')
  //   // }
  // } catch (error) {
  //   console.log(error)
  // }
  tableList
    ? ctx.success({ data: tableList })
    : ctx.fail({ code: -1, msg: '获取失败', data: tableList })
}
export const updateRegisterTable = async (ctx: Context) => {
  const { id, updateData } = ctx.request.body as {
    id: number
    updateData: Partial<registerTable>
  }
  const res = await registerService.updateRegisterTable(ctx, id, updateData)
  res
    ? ctx.success({ data: res })
    : ctx.fail({ code: -1, msg: '更新失败', data: res })
}

export const updateRegisterStatus = async (ctx: Context) => {
  const { id, status } = ctx.request.body as { id: number; status: string }
  ctx.body = await registerService.updateRegisterStatus(ctx, id, status)
}
export const deleteRegisterTable = async (ctx: Context) => {
  const { id } = ctx.request.body as { id: number }
  const res = await registerService.deleteRegisterTable(ctx, id)
  res
    ? ctx.success({ data: res })
    : ctx.fail({ code: -1, msg: '删除失败', data: res })
}
export const events = async (ctx: Context) => {
  ctx.set('Content-Type', 'text/event-stream')
  ctx.set('Cache-Control', 'no-cache')
  ctx.set('Connection', 'keep-alive')
  // ctx.prisma.$on('event', (event: registerTable) => {
  //   ctx.body += `data: ${JSON.stringify(event)}\n\n`
  // })
}
