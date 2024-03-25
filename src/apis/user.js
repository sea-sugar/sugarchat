import request from './request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data:data,
    })
}

// export function login(query) {
//     return request({
//       url: '/login',
//       method: 'post',
//       params: query
//     })
//   }
// 
  