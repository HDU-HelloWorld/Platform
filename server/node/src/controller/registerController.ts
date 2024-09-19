import registerService from '../service/registerService'
import type { Context } from 'koa'
import bodyParser from 'koa-bodyparser'
import { registerTable } from '@prisma/client'
import { successResponse, errorResponse } from '../../utils/response'
export const createRegisterTable = async (ctx: Context) => {
  const registerData = ctx.request.body as registerTable
  await registerService.createRegisterTable(registerData)
  const table = await registerService.getRegisterTable(registerData.id)

  ctx.body = table
    ? successResponse(table)
    : errorResponse(400, 'Table not found')
}
export const getRegisterTableList = async (ctx: Context) => {
  ctx.body = await registerService.getRegisterTable()
}
