// const { reverse } = require('dns')
import { createTransport } from 'nodemailer'
import { env } from 'process'
import { EmailMessage } from '../types/index'
import type { Context } from 'koa'
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
    this.transporter.sendMail(
      {
        ...EmailMessage,
        from: env.QQEMAIL_USER,
        to: EmailMessage.to,
        // subject: EmailMessage.subject || '测试邮件',
        // text: EmailMessage.text || '这是一封测试邮件',
        // html: EmailMessage.html || '<b style="color:red">这是一封测试邮件</b>',
      },
      (err, info) => {
        if (err) {
          console.log(err)
          ctx.fail({ msg: '邮件发送失败', data: err })
        } else {
          ctx.success({ msg: '邮件发送成功', data: info })
        }
      }
    )
  }
}
export default new SendEmailService()
