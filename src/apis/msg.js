import request from '../utils/request'

export function getMessage(receiverId = '',groupId = '') {
    return request({
      url: '/msg/getMessage',
      method: 'get',
      params:{
        receiverId:receiverId,
        groupId:groupId
      }
    })
  }