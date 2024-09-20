import registerService from '../service/registerService'
import type { Context } from 'koa'

import { registerTable } from '@prisma/client'

export const createRegisterTable = async (ctx: Context) => {
  const registerData = ctx.request.body as registerTable
  const table = await registerService.createRegisterTable(ctx, registerData)
  // const table = await registerService.getRegisterTable(ctx, registerData.id)
  table ? ctx.success({ data: table }) : ctx.fail({ data: table })
}
export const getRegisterTableList = async (ctx: Context) => {
  ctx.body = await registerService.getRegisterTable(ctx)
}
export const updateRegisterTable = async (ctx: Context) => {}

export const updateRegisterStatus = async (ctx: Context) => {
  const { id, status } = ctx.request.body as { id: number; status: string }
  ctx.body = await registerService.updateRegisterStatus(ctx, id, status)
}

export const events = async (ctx: Context) => {
  ctx.set('Content-Type', 'text/event-stream')
  ctx.set('Cache-Control', 'no-cache')
  ctx.set('Connection', 'keep-alive')
  // ctx.prisma.$on('event', (event: registerTable) => {
  //   ctx.body += `data: ${JSON.stringify(event)}\n\n`
  // })
}
