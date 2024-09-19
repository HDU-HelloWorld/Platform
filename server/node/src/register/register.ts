//注册路由
import Router from '@koa/router'
import koa from 'koa'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { registerTable } from '@prisma/client'
const registerRouter = new Router()
registerRouter.post('/register', async (ctx: koa.Context) => {
  // TODO: 注册逻辑
})
