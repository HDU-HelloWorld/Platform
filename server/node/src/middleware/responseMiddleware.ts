import type { Context, Next } from 'koa'
import { ApiResponse } from '../types/response'
function render(ctx: Context) {
  return ({ code = 200, msg = 'success', data }: ApiResponse) => {
    ctx.response.type = 'application/json'
    const response: ApiResponse = {
      code,
      msg,
      serverTime: Date.now(),
    }
    if (data) {
      response.data = data
    }
    ctx.body = response
  }
}
function renderFail(ctx: Context) {
  return ({ code = -1, msg = 'error', data }: ApiResponse) => {
    ctx.success({
      code,
      msg,
      data,
    })
  }
}

export default () => {
  return async (context: Context, next: Next) => {
    // 返回一个 function，在 controller 中执行
    context.success = render(context)
    context.fail = renderFail(context)
    await next()
  }
}
