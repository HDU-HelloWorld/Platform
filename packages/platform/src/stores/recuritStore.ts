import { observable, action } from 'mobx'
import recruitApi from '@/api/recruitApi'

export default class RecuritStore {
  @action async submitRecruitApply(data: FormData) {
    const res = await recruitApi.submitRecruitApply(data)
    return res.data
  }
  @action async getRecruitList() {
    const res = await recruitApi.getRecruitList()
    return res.data
  }
}
