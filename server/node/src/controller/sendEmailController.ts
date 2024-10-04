//写得很烂，这个部分建议重构

import type { Context } from 'koa'
import emailService from '../service/emailService'
import { EmailMessage } from '../types/index'
import registerService from '../service/registerService'
import { registerTable } from '@prisma/client'
export const sendEmail = async (ctx: Context) => {
  const email = ctx.request.body as EmailMessage

  await emailService
    .sendmail(ctx, email)
    .then(
      (res) => {
        ctx.success({ data: res })
      },
      (err) => {
        ctx.fail({ msg: err })
      }
    )
    .catch()
  // ctx.success({ msg: '邮件发送成功' })
}

export const getSendedEmail = async (ctx: Context) => {
  const res = await emailService.getSendEmail(ctx)

  ctx.success({ data: res })
}
function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
