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
}
export default userApi
