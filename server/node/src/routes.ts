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
import { sendEmail, getSendedEmail } from './controller/sendEmailController'
import {
  getSignInEvent,
  createSignInEvent,
  signIn,
} from './controller/signInController'
import { uploadFile } from './controller/upload.controller'
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
  { path: '/email', type: 'get', action: getSendedEmail },
  { path: '/signIn', type: 'get', action: getSignInEvent },
  { path: '/signIn', type: 'post', action: createSignInEvent },
  { path: '/signIn', type: 'put', action: signIn },
  { path: '/upload', type: 'post', action: uploadFile },
] as {
  path: string
  type: 'get' | 'post' | 'put' | 'delete'
  action: (ctx: any) => Promise<any>
}[]
