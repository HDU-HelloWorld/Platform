import {
  createRegisterTable,
  getRegisterTableList,
} from './controller/registerController'

export default [
  { path: '/register', type: 'post', action: createRegisterTable },
  { path: '/register', type: 'get', action: getRegisterTableList },
] as {
  path: string
  type: 'get' | 'post' | 'put' | 'delete'
  action: (ctx: any) => Promise<any>
}[]
