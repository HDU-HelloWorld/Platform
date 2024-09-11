import { makeAutoObservable, autorun, runInAction } from 'mobx'
import recruitApi from '@/api/recruitApi'
import type { recuritTable } from '@/models/recurit.model'
import { Message } from '@arco-design/web-react'
export default class RecuritStore {
  recruitList = []
  constructor() {
    makeAutoObservable(this)
  }
  submitRecruitApply(data: recuritTable) {
    return new Promise(async (resolve, reject) => {
      const response = await recruitApi.submitRecruitApply(data).then((res) => {
        if (res.code === 200) {
          Message.success('提交成功')
          resolve(res.data)
        }
      })
    })
  }
  async getRecruitList() {
    const res = await recruitApi.getRecruitList()
    return res.data
  }
}
