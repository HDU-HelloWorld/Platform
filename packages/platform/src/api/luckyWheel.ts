import request from '../utils/request'
import { LuckyWheel } from '../models/luckyWheel.model'
const luckyWheelApi = {
  createLuckyWheel: async (luckyWheel: LuckyWheel) => {
    return request
      .post('/luckyWheel', {
        luckyWheel
      })
      .then((res) => res.data)
  },
  getLuckyWheelInfo: async (name: string) => {
    return request
      .get('/luckyWheel', { params: { name } })
      .then((res) => res.data)
  },
  updateLuckyWheel: () => {},
  deleteLuckyWheel: async (name: string) => {
    return request
      .delete('/luckyWheel', { data: { name } })
      .then((res) => res.data)
  },
  drawPrize: async (name: string, userId: number) => {
    //传入轮盘名称
    return request
      .put('/luckyWheel', {
        name,
        userId
      })
      .then((res) => res.data)
  }
}
export default luckyWheelApi
