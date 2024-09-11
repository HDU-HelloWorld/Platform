import request from '../utils/request'
const userApi = {
  //登录
  login() {
    return request({
      url: '/user/login',
      method: 'post',
    })
  },
  //注册
  register() {
    return request({
      url: '/user/register',
      method: 'post',
    })
  },
  // 获取用户信息
  getUserInfo() {
    return request({
      url: '/user/info',
      method: 'get',
    })
  },
  //签到
  signIn(id: number) {
    return request({
      url: '/user/signIn',
      method: 'post',
      data: {
        id,
      },
    })
  },
}
export default userApi
