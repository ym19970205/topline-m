import request from '../utils/request.js'

// 用户认证（登录注册）
export const login = (data) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}
// 验证码认证
export const getSmsCode = (mobile) => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}

// 获取当前登录用户个人信息
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'
  })
}

// 首页-获取用户频道列表
// 注意：客户登录时，显示登录的频道的列表，不登录时显示默认的频道列表
export const getUserChannels = () => {
  return request({
    method: 'GET',
    url: 'app/v1_0/user/channels'
  })
}
