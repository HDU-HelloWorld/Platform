import Koa from 'koa'
import Router from '@koa/router'
import bodyParser from 'koa-bodyparser'
import logger from 'koa-logger'
import cors from '@koa/cors'
import { koaSwagger } from 'koa2-swagger-ui'
import path from 'path'
import serve from 'koa-static'
import routesAction from './routes'
const app = new Koa()
const router = new Router()
const PORT = process.env.PORT || 3000
routesAction.forEach(({ path, type, action }) => router[type](path, action))

app.use(bodyParser())
app.use(logger())
app.use(cors())
app.use(serve(path.join(__dirname, '../public')))
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
