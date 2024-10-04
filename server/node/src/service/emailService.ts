// const { reverse } = require('dns')
import { createTransport } from 'nodemailer'
import { env } from 'process'
import { EmailMessage } from '../types/index'
import type { Context } from 'koa'
console.log(env.QQEMAIL_AUTHCODE)

class SendEmailService {
  private transporter = createTransport({
    host: 'smtp.qq.com', // QQ邮箱的SMTP服务器地址，默认即可
    port: 465, // QQ邮箱的SMTP服务器端口号，默认即可
    secure: true, // 是否使用 SSL/TLS 加密
    auth: {
      // 身份验证信息
      user: env.QQEMAIL_USER,
      pass: env.QQEMAIL_AUTHCODE,
    },
  })

  async sendmail(ctx: Context, EmailMessage: EmailMessage) {
    return new Promise((resolve, reject) => {
      this.transporter.sendMail(
        {
          ...EmailMessage,
          from: process.env.QQEMAIL_USER,
          to: EmailMessage.to,
          // subject: EmailMessage.subject || '测试邮件',
          // text: EmailMessage.text || '这是一封测试邮件',
          html:
            EmailMessage.html || '<b style="color:red">这是一封测试邮件</b>',
          attachments: EmailMessage.attachments || [],
        },
        (err: any, info) => {
          if (err) {
            if (err.response && err.response.includes('550')) {
              console.log(`跳过无效的邮箱: ${EmailMessage.to} - ${err.message}`)
              resolve({ success: false, message: err.message }) // 可以选择返回一个表示失败的对象
            } else {
              console.error(
                `发送邮件时发生错误: ${EmailMessage.to} - ${err.message}`
              )
              reject(err)
            }
          } else {
            console.log(EmailMessage.to + '  success')
            resolve({ success: true, message: info })
          }
        }
      )
    })
  }
  async createEmail(ctx: Context, email: string) {
    return ctx.prisma.sendEmail.create({
      data: {
        email,
      },
    })
  }
  async getSendEmail(ctx: Context, email?: string) {
    if (email) {
      return await ctx.prisma.sendEmail.findUnique({ where: { email } })
    }

    return await ctx.prisma.sendEmail.findMany()
  }
  async updateSendEmail(ctx: Context, email: string, isSended: boolean) {
    return ctx.prisma.sendEmail.update({
      where: { email },
      data: {
        email,
        isSended,
      },
    })
  }
  async deleteSendEmail(ctx: Context, email: string) {
    return ctx.prisma.sendEmail.delete({ where: { email } })
  }
}
export default new SendEmailService()
