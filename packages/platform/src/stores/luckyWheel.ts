import { makeAutoObservable, autorun, runInAction } from 'mobx'
import luckyWheelApi from '../api/luckyWheel'
import { LuckyWheel, Prize } from '../models/luckyWheel.model'
import initLuckyWheel from '../app/luckyWheel/initLuckyWheel.json'
export default class LuckyWheelStore {
  luckyWheelData: LuckyWheel = JSON.parse(JSON.stringify(initLuckyWheel))
    .luckyWheel //
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  // 获取转盘数据
  async getLuckyWheelData() {
    const res = await luckyWheelApi.getLuckyWheelInfo(this.luckyWheelData.name)
    runInAction(() => {
      this.luckyWheelData = res.data
    })
    return res
  }
  async resetLuckyWheel(name: string) {
    await luckyWheelApi.deleteLuckyWheel(name)
    await luckyWheelApi.createLuckyWheel(this.luckyWheelData)
    await this.getLuckyWheelData()
  }
}
