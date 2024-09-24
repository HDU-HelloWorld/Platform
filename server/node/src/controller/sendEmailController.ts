import type { Context } from 'koa'
import emailService from '../service/emailService'
import { EmailMessage } from '../types/index'
export const sendEmail = async (ctx: Context) => {
  const email = ctx.request.body as EmailMessage
  await emailService
    .sendmail(ctx, email)
    .then((res) => {
      ctx.success({ data: res })
    })
    .catch((err) => {
      ctx.fail({ msg: err })
    })
  // ctx.success({ msg: '邮件发送成功' })
}
