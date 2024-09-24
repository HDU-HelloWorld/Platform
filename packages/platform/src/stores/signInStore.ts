import { makeAutoObservable, autorun, runInAction } from 'mobx'
import signInAPi from '@/api/signIn'
import { useSearchParams } from 'next/navigation'
//时间紧急，暂时不做跳过了
export default class SignInStore {
  private _signIn: boolean = false

  private _signInError: boolean = false
  private _signInErrorMessage: string = ''
  get signIn() {
    return this._signIn
  }
}
