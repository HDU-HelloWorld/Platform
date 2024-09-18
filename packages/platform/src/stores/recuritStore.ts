import { makeAutoObservable, autorun, runInAction } from 'mobx'
import recruitApi from '@/api/recruitApi'
import type { recuritTable } from '@/models/recurit.model'
import { Message } from '@arco-design/web-react'
import { ResponseModel } from '@/models/response.model'
export default class RecuritStore {
  recruitList = []
  constructor() {
    makeAutoObservable(this)
  }
  async submitRecruitApply(data: recuritTable) {
    return recruitApi.submitRecruitApply(data).then((res) => {
      return res
    })
  }
  // async getRecruitList() {
  //   const res = await recruitApi.getRecruitList()
  //   return res.data
  // }
}
