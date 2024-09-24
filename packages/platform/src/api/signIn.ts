import request from '../utils/request'
import { events } from '../../../../server/node/src/controller/registerController'
const signInAPi = {
  async createSignInEvent(event: string, studentIds?: number[]) {
    return request
      .post('/signIn', {
        event,
        studentIds
      })
      .then((res) => res.data)
  },
  async getSignInEvents(event?: string) {
    return request.get('/signIn' + event || '').then((res) => res.data)
  },
  async signIn(event: string, studentId: number) {
    return request
      .put('/signIn', {
        event,
        studentId
      })
      .then((res) => res.data)
  }
}
export default signInAPi
