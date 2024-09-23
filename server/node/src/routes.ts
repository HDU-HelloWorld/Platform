import {
  createRegisterTable,
  getRegisterTableList,
  updateRegisterTable,
  deleteRegisterTable,
} from './controller/registerController'
import {
  createLuckyWheel,
  getLuckyWheel,
  drawPrize,
  deleteLuckyWheel,
} from './controller/luckyWheelController'
import { sendEmail } from './controller/sendEmailController'
export default [
  { path: '/register', type: 'post', action: createRegisterTable },
  { path: '/register', type: 'get', action: getRegisterTableList },
  { path: '/register', type: 'put', action: updateRegisterTable },
  { path: '/register', type: 'delete', action: deleteRegisterTable },
  { path: '/luckyWheel', type: 'post', action: createLuckyWheel },
  { path: '/luckyWheel', type: 'get', action: getLuckyWheel },
  { path: '/luckyWheel', type: 'put', action: drawPrize },
  { path: '/luckyWheel', type: 'delete', action: deleteLuckyWheel },
  { path: '/email', type: 'post', action: sendEmail },
] as {
  path: string
  type: 'get' | 'post' | 'put' | 'delete'
  action: (ctx: any) => Promise<any>
}[]
