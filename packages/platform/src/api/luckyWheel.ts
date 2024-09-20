import request from '../utils/request'
const luckyWheelApi = {
  createLuckyWheel: () => {},
  getLuckyWheelInfo: async (name: string) => {
    return request
      .get('/luckyWheel', { params: { name } })
      .then((res) => res.data)
  },
  updateLuckyWheel: () => {},
  drawPrize: async (name: string) => {
    //传入轮盘名称
    return request
      .put('/luckyWheel', {
        name,
      })
      .then((res) => res.data)
  },
}
export default luckyWheelApi
