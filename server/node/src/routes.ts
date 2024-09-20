import {
  createRegisterTable,
  getRegisterTableList,
  updateRegisterTable,
} from './controller/registerController'

export default [
  { path: '/register', type: 'post', action: createRegisterTable },
  { path: '/register', type: 'get', action: getRegisterTableList },
  { path: '/register', type: 'put', action: updateRegisterTable },
] as {
  path: string
  type: 'get' | 'post' | 'put' | 'delete'
  action: (ctx: any) => Promise<any>
}[]
