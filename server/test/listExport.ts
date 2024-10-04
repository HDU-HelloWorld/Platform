import xlsx from 'node-xlsx'
import fs from 'fs'
;(async () => {
  const SignIned = (await fetch(
    'http://127.0.0.1:6677/signIn?events=一面签到',
    {
      method: 'GET',
    }
  )
    .then((res) => res.json())
    .then((res: any) => res.data)) as any
  const registerTableList = (await fetch('http://127.0.0.1:6677/register', {
    method: 'GET',
  }).then((res) => res.json())) as any

  const userIds = [...SignIned[0].userIds, ...SignIned[1].userIds]
  const locations = ['6教中321', '七教北122B']
  const times = ['9月26日', '9月27日']
  console.log(userIds.length)

  const list = registerTableList.data.map((item: any) => {
    if (!userIds.includes(item.id)) {
      return null
    }
    return {
      id: item.id,
      name: item.username,
      college: item.college,
      major: item.major,
      department: item.department,
      bio: item.bio,
    }
  })
  // let infoList = list.map((item: any, index: number) => {
  //   let time = times[0]
  //   let Location = locations[0]
  //   if (index > list.length / 2) {
  //     time = times[1]
  //     Location = locations[1]
  //   }
  //   return [...Object.values(item), time + Location]
  // })
  let infoList: any[] = []
  for (let i = 0; i < list.length; i++) {
    let time = times[0]
    let Location = locations[0]
    if (i > list.length / 2) {
      time = times[1]
      Location = locations[1]
    }
    if (list[i] !== null)
      infoList.push([...Object.values(list[i]), time + Location])
  }
  console.log(infoList.length)

  let buffer = xlsx.build([
    {
      name: times[0] + locations[0],
      data: [
        ['学号', '姓名', '学院', '专业', '意向部门', '自我介绍', '时间地点'],
        ...infoList,
      ],
      options: {
        '!cols': [
          { wch: 10 }, // 学号
          { wch: 10 }, // 姓名
          { wch: 30 }, // 学院
          { wch: 20 }, // 专业
          { wch: 10 },
          { wch: 50 }, // 自我介绍

          { wch: 20 }, // 时间地点
        ],
      },
    },
  ])

  fs.writeFile('test.xlsx', buffer, function (err: any) {
    if (err) {
      console.log(err, '导出excel失败')
    } else {
      console.log('导出excel成功!')
    }
  })
})()
