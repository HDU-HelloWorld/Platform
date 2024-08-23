import { observable, action } from 'mobx'
import userApi from '@/api/userApi'
export default class UserStore {
  @observable user: any = null
  @action async login(params: any) {
    const res = await userApi.login()
  }
}
