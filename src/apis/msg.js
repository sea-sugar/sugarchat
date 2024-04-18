import request from '../utils/request'

export function getMessage(receiverId = '',groupId = '',page = 1) {
    return request({
      url: '/msg/getMessage',
      method: 'get',
      params:{
        receiverId:receiverId,
        groupId:groupId,
        page:page
      }
    })
  }

 export function getLastMessage(receiverId = '',groupId = '') {
    return request({
      url: '/msg/getLastMessage',
      method: 'get',
      params:{
        receiverId:receiverId,
        groupId:groupId,
      }
    })
  }