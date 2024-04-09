const getters = {
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    username: state => state.user.username,
    user_id: state => state.user.user_id,
    nowchat: state => state.webSocket.nowchat,
    newmessage: state => state.webSocket.newmessage,
  }
  export default getters