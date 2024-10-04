import * as xlsx from 'xlsx'
import * as fs from 'fs'
;(async () => {
  const arr = readExcelToArray('./output.xlsx').slice(1)
  const arr2 = [
    {
      id: 24051023,
      name: '应维轩',
      department: '后端',
      email: '1958961907@qq.com',
    },
    
  ]
  const list = arr2.map((item) => {
    // const id = item[0]
    // const name = item[1]
    // const email = item[2] + '@qq.com'
    // const department = item[item.length - 2]
    // let test = [item[item.length - 2] + '二面试题.pdf']
    const { id, name, email, department } = item
    let test = [department + '二面试题.pdf']
    if (department === 'AI') {
      test = [
        '杭州电子科技大学HelloWorld社人工智能部二面试题.docx',
        '杭州电子科技大学HelloWorld社人工智能部二面答题卷.docx',
      ]
    }
    const message = `<div
    class="cover"
    style="
      margin: 0px;
      padding: 0px;
      width: auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: rgb(247, 247, 247);
      flex-direction: column;
      position: relative;
    "
  >
    <div
      class="Top"
      style="
        background-color: #f57c69;
        width: 100%;
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 28px;
        font-weight: 900;
      "
    >
      <p style="color: #f0b4ab; font-weight: 400">Welcome To</p>
      <p
        style="
          color: #fff;
          font-size: 38px;
          font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
        "
      >
        &nbsp;HW
      </p>
    </div>
    <span
      class="banner"
      style="
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
      "
    >
      <p class="text" style="font-weight: bold">Hey,亲爱的${name}同学：</p>
      <p class="text">你好！首先恭喜你通过了${department}部门的第一轮面试环节！</p>
      <p class="text">
        本次HelloWorld社团的第二轮面试/笔试将于国庆假期期间(10.1-10.7)进行。如果你报名了技术部门，希望你可以认真学习相关知识，用心对待这次的笔试试题。如果你报名了行政部门，希望你能够提前熟悉行政相关的工作（如推文，策划案），发挥自己的创造力完成这一次的测试。
      </p>
      <p class="text">
        放平心态，认真对待，相信用心的你一定可以通过第二轮面试/笔试！
      </p>
      <p class="text" style="font-weight: bold">- HelloWorld 全体成员</p>
      <p class="text">
        注1：二面试题请在附件下载
        注2：行政没有笔试捏
      </p>
    
    </span>
    <div
      class="bottom"
      style="
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 38px;
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
        font-weight: 900;
        height: 80px;
        color: #f57c69;
      "
    >
      HelloWorld

    </div>
    <div
      style="
        height: 80px;
        color: rgb(178, 185, 190);
        font-size: 14px;
        font-family: 'Heiti';
      "
    >
      <div
        class="lastbottom"
        style="
          height: 30px;
          color: rgb(178, 185, 190);
          font-size: 12px;
          font-family: 'Heiti';
          text-align: center;
          line-height: auto;
        "
      >
        杭州市杭州经济开发区白杨街道2号大街1158号 邮编:310018
      </div>
      <div
        class="lastbottom"
        style="
          height: 20px;
          color: rgb(178, 185, 190);
          font-size: 12px;
          font-family: 'Heiti';
          text-align: center;
          line-height: auto;
        "
      >
        You Received This Email Because You've Successfully Registered For
        HelloWorld
      </div>
    </div>
  </div>`
    return {
      id: id,
      name: name,
      email: email,
      department: department,
      test: test,
      message: message,
    }
  })
  for (let i = 0; i < list.length; i++) {
    sendEmail(
      list[i].email,
      // '714014724@qq.com',
      'HelloWorld社 二面通知',
      list[i].message,
      list[i].test.map((item) => {
        return {
          filename: item,
          path: '../test/' + item,
        }
      })
    )
    await sleep(25000)
  }
  // const res = await sendEmail(
  //   // '2553035342@qq.com',
  //   '714014724@qq.com',
  //   'HelloWorld 社 二面通知',
  //   list[1].message,
  //   [
  //     {
  //       filename: list[1].test,
  //       path: '../test/' + list[1].test,
  //     },
  //   ]
  // )
})()
async function sendEmail(
  email: string,
  subject: string,
  html: string,
  attachments: any
) {
  await fetch('http://localhost:6677/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ to: email, subject, html, attachments }),
  }).then((res) => {
    return res.json()
  })
}
function readExcelToArray(filePath: string): any[][] {
  // 读取Excel文件
  const workbook = xlsx.readFile(filePath)
  // 获取第一个工作表的名称
  const sheetName = workbook.SheetNames[0]
  // 获取第一个工作表
  const sheet = workbook.Sheets[sheetName]
  // 将工作表内容转换为JSON数组
  const data = xlsx.utils.sheet_to_json(sheet, { header: 1 })
  return data as any[][]
}

// 新增函数：找出数组中的重复项
function findDuplicates(arr: string[]): { [key: string]: number } {
  const counts: { [key: string]: number } = {}
  const duplicates: { [key: string]: number } = {}

  for (const item of arr) {
    counts[item] = (counts[item] || 0) + 1
    if (counts[item] > 1) {
      duplicates[item] = counts[item]
    }
  }

  return duplicates
}

// 新增函数：将对象数组写入Excel
function writeArrayToExcel(data: any[], filePath: string): void {
  // 创建一个新的工作簿
  const workbook = xlsx.utils.book_new()

  // 将数据转换为工作表
  const worksheet = xlsx.utils.json_to_sheet(data)

  // 将工作表添加到工作簿
  xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet1')

  // 将工作簿写入文件
  xlsx.writeFile(workbook, filePath)

  console.log(`数据已成功写入 ${filePath}`)
}
function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
