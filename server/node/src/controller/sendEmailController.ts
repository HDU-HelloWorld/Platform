import type { Context } from 'koa'
import emailService from '../service/emailService'
import { EmailMessage } from '../types/index'
import registerService from '../service/registerService'
import { registerTable } from '@prisma/client'
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
export const sendInterviewEmail = async (ctx: Context) => {
  const list = (await registerService.getRegisterTable(ctx)) as registerTable[]
  const emailList = list.map((item, index) => {
    const locations = ['6教中321', '七教北122B']
    const times = ['9月26日', '9月27日']
    let time = times[0]
    let Location = locations[0]
    if (index > list.length / 2) {
      time = times[1]
      Location = locations[1]
    }
    return {
      name: item.username,
      studentId: item.id,
      email: item.qqId + '@qq.com',
      time: time,
      Location: Location,
    }
  })
  for (let i = 0; i < emailList.length; i++) {
    const item = emailList[i]
    const { name, email, studentId, time, Location } = item
    // try {
    //   console.log((await emailService.createEmail(ctx, email)).email)
    // } catch (err) {
    //   console.log(err)
    // }

    const message = `<div class="cover" style="
  margin: 0px;
  padding: 0px;
  width: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(247, 247, 247);
  flex-direction: column;
  position: relative;
">
<div class="Top" style="
    background-color: #f57c69;
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 28px;
    font-weight: 900;
  ">
  <p style="color: #f0b4ab; font-weight: 400">Welcome To</p>
  <p style="
      color: #fff;
      font-size: 38px;
      font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    ">
    &nbsp;HW
  </p>
</div>
<span class="banner" style="
    width: auto;
    background-color: #fff;
    border-radius: 2px;
    border: rgb(233, 233, 233) 2px solid;
    box-shadow: rgb(233, 233, 233) 0px 0px 10px;
    margin-top: 40px;
    margin-left: 20px;
    margin-right: 20px;
    padding: 20px;
    font-size: 13px;
    line-height: 25px;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; 
  ">
  <p class="text" style="font-weight: bold;">Hey,亲爱的${name}同学：</p>
  <p class="text">
    你好！恭喜你进入我们的第一轮面试环节，首先感谢你对HelloWorld大家庭的肯定和选择，我们也希望能在面试中看见你精彩的表现。
  </p>
  <p class="text">
    面试时间为${time}晚6点30分到9点，地点为${Location}，请提前五分钟到面试地点签到，可别迟到了哦，相信你一定能在面试中表现出色，加油！
  </p>
  <p class="text">
    如果时间有冲突，请向群内管理员询问情况并进行调整，感谢你的配合！
  </p>
  <p>
    <a href="http://platform.helloworld-hdu.com/signIn?studentId=${studentId}" style="color: #f57c69; font-weight: bold;">
      请点击此链接以确认参加本次面试！！（点了会默认报名哟！！！）</a>

  </p>
  <p class="text">

    招新群号：<a href="https://qm.qq.com/q/TBeJYZS2gQ">892237462 </a>。
  </p>
  <p class="text" style="font-weight: bold;">
    - HelloWorld 全体成员
  </p>
</span>
<div class="bottom" style="
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 38px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-weight: 900;
    height: 80px;
    color: #f57c69;
  ">
  HelloWorld
</div>
<div style="
    height: 80px;
    color: rgb(178, 185, 190);
    font-size: 14px;
    font-family: 'Heiti';
  ">
  <div class="lastbottom" style="
      height: 30px;
      color: rgb(178, 185, 190);
      font-size: 12px;
      font-family: 'Heiti';
      text-align: center;
      line-height: auto;
    ">
    杭州市杭州经济开发区白杨街道2号大街1158号 邮编:310018
  </div>
  <div class="lastbottom" style="
      height: 20px;
      color: rgb(178, 185, 190);
      font-size: 12px;
      font-family: 'Heiti';
      text-align: center;
      line-height: auto;
    ">
    You Received This Email Because You've Successfully Registered For
    HelloWorld
  </div>
</div>
</div>`
    if (
      !(await emailService
        .getSendEmail(ctx, email)
        .then((res: any) => res.isSended))
    ) {
      await emailService
        .sendmail(ctx, {
          to: email,
          subject: 'HelloWorld面试通知',
          html: message,
        })
        .then(async (res: any) => {
          if (res.success) await emailService.updateSendEmail(ctx, email, true)
        })
      await sleep(30 * 1000)
    }
  }
  ctx.body = JSON.stringify(await emailService.getSendEmail(ctx))
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
