import registerService from '../service/registerService'
import type { Context } from 'koa'

import { registerTable } from '@prisma/client'
import { successResponse, errorResponse } from '../../utils/response'
export const createRegisterTable = async (ctx: Context) => {
  const registerData = ctx.request.body as registerTable
  await registerService.createRegisterTable(ctx, registerData)
  const table = await registerService.getRegisterTable(ctx, registerData.id)

  ctx.body = table
    ? successResponse(table)
    : errorResponse(500, 'Table not found')
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
  ctx.prisma.$on('event', (event: any) => {
    ctx.body += `data: ${JSON.stringify(event)}\n\n`
  })
}
