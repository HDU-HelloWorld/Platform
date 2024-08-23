import Koa from 'koa'
import Router from '@koa/router'
import bodyParser from 'koa-bodyparser'
import logger from 'koa-logger'
import cors from '@koa/cors'
import { koaSwagger } from 'koa2-swagger-ui'
import path from 'path'
import serve from 'koa-static'

// Initialize Koa app
const app = new Koa()
const router = new Router()

// Middleware
app.use(logger())
app.use(bodyParser())
app.use(cors())

// Serve static files
app.use(serve(path.join(__dirname, 'public')))

// Basic route
router.get('/', async (ctx) => {
	ctx.body = 'Hello World!'
})

// Example of a protected route
router.get('/protected', async (ctx) => {
	// Example middleware for protected route
	if (!ctx.request.headers.authorization) {
		ctx.status = 401
		ctx.body = 'Unauthorized'
		return
	}
	ctx.body = 'Protected Content'
})

// Swagger UI (if you use Swagger for API documentation)
app.use(
	koaSwagger({
		routePrefix: '/swagger',
		swaggerOptions: {
			url: '/swagger.json',
		},
	})
)

// Register routes
app.use(router.routes())
app.use(router.allowedMethods())

// Error handling
app.use(async (ctx, next) => {
	try {
		await next()
	} catch (err: unknown) {
		// TODO 没时间写，先workaround
		const typedError = err as Error & {
			status: number
		}
		ctx.status = typedError.status || 500
		ctx.body = typedError.message
		ctx.app.emit('error', typedError, ctx)
	}
})

// Error event listener
app.on('error', (err, ctx) => {
	console.error('Server error', err, ctx)
})

// Start the server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`)
})

export default app
