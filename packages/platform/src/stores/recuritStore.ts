import { makeAutoObservable, autorun, runInAction } from 'mobx'
import recruitApi from '@/api/recruitApi'
import type { recuritTable } from '@/models/recurit.model'

export default class RecuritStore {
  recruitList: recuritTable[] = []
  loading: boolean = true
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }
  async submitRecruitApply(data: recuritTable) {
    return recruitApi.submitRecruitApply(data).then((res) => {
      return res
    })
  }
  async getRecruitList() {
    const res = await recruitApi.getRecruitList(['', ''])
    runInAction(() => {
      this.recruitList = res.data
      this.loading = false
    })
    return res
  }
  async updateRecruitApply(id: number, updateData: Partial<recuritTable>) {
    const res = await recruitApi.modifyRecruitApply(id, updateData)
    return res
  }
  async deleteRecruitApply(id: number) {
    const res = await recruitApi.deleteRecruitApply(id)
    await this.getRecruitList()
    return res
  }
}
