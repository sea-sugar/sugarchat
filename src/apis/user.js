import request from '../utils/request'

// 登录
export function login(data) {
  return request({
    headers: {
      isToken: false,
    },
    url: '/user/login',
    method: 'post',
    data:data,
    })
}

// 退出登录
export function logout() {
  return request({
    url: '/user/logout',
    method: 'get'
  })
}

// 获取用户详细信息
export function getInfo() {
  return request({
    url: '/user/getinfo',
    method: 'get'
  })
}

export function register(data) {
    return request({
      url: '/user/register',
      method: 'post',
      data: data
    })
}

// params: query