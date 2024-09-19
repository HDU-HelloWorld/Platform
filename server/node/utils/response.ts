import { Context } from 'koa'
interface ApiResponse {
  code: number
  msg: string
  data?: any
}
function successResponse(data: any): ApiResponse {
  return {
    code: 200,
    msg: 'Success',
    data,
  }
}

function errorResponse(code: number, msg: string): ApiResponse {
  return {
    code,
    msg,
  }
}
export { successResponse, errorResponse }
