import request from '../utils/request'

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

// export function login(query) {
//     return request({
//       url: '/login',
//       method: 'post',
//       params: query
//     })
//   }
// 
  