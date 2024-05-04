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

// 注册
export function register(data) {
    return request({
      url: '/user/register',
      method: 'post',
      data: data
    })
}

// 获取好友列表
export function getList() {
  return request({
    url: '/user/getList',
    method: 'get',
  })
}

// 更新用户信息
export function updateUserinfo(userinfoForm) {
  return request({
    url: '/user/updateUserinfo',
    method: 'post',
    data:{
      username:userinfoForm.username,
      avatar:userinfoForm.avatar
    }
  })
}

// 添加联系人
export function findfriends(inputId) {
  return request({
    url: '/user/findfriends',
    method: 'post',
    data:{
      inputId:inputId,
    }
  })
}

// params: query