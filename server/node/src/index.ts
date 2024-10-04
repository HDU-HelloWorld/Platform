import Koa from 'koa'
import Router from '@koa/router'
import bodyParser from 'koa-body'
import logger from 'koa-logger'
import cors from '@koa/cors'
import { koaSwagger } from 'koa2-swagger-ui'
import path from 'path'

import serve from 'koa-static'

import prisma from './prisma'
import { DefaultState, Context } from 'koa'
import './types/index'
import responseMiddleware from './middleware/responseMiddleware'
import routesAction from './routes' //
const PORT = process.env.PORT || 6677
const app = new Koa()
const router = new Router<DefaultState, Context>()

routesAction.forEach(({ path, type, action }) => router[type](path, action))

app.use(
  bodyParser({
    //支持文件上传
    multipart: true,
    formidable: {
      uploadDir: path.join(__dirname, 'uploads'), // 设置上传目录
      filename: (name, ext, part, form) => {
        // 直接返回原始文件名
        // console.log(name, ext, part, form)

        return name + ext
      },
      keepExtensions: true, // 保持文件扩展名
      maxFieldsSize: 50 * 1024 * 1024, // 文件大小限制50M
    },
    onError: (err, ctx) => {
      ctx.throw(400, err.message) // 处理错误
    },
  })
)
app.use(logger())
app.use(cors())
app.use(responseMiddleware())
app.use(serve(path.join(__dirname, '../public')))
app.use(async (ctx: Context, next) => {
  ctx.prisma = prisma

  await next()
})
app.use(router.routes())
app.use(router.allowedMethods())
app.use(
  koaSwagger({
    routePrefix: '/swagger',
    swaggerOptions: {
      url: '/swagger.json',
    },
  })
) //swagger

app.listen(PORT)

console.log(`应用启动成功 端口:${PORT}`)
