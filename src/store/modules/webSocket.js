import { getToken } from "@/utils/auth";
import io from 'socket.io-client';

const webSocket = {
  state : {
    ws: null,
    nowchat : null,
    newmessage : null,
  },
  mutations : {
    SET_WS(state, ws) {
      state.ws = ws;
      // console.log("SET_WS", state.ws);
    },
    CLEAR_WS(state) {
      state.ws = null;
    },
    SET_NOWCHAT(state , nowchat){
      state.nowchat = nowchat
    },
    CLEAR_NOWCHAT(state){
      state.nowchat = null;
    },
    SET_MESSAGE(state , msg){
      state.newmessage = msg
    },
    CLEAR_MESSAGE(state){
      state.newmessage = null;
    }
  },
  actions : {
    startWebSocket({commit, dispatch, state}) {
      if (getToken() && (!state.ws || state.ws.disconnected)) {
        const socketUrl = `${process.env.VUE_APP_SOCKET_PATH}?token=${getToken()}`;
        // const socketUrl = `http://localhost:3000?token=${getToken()}`;
        try {
          const ws = new io(socketUrl);
          // console.log("socketUrl:", socketUrl,"  ws:",ws);
          ws.on('message', function (data) {
            console.log(`${new Date().toLocaleString()} >>>>> 收到消息 ${data}`, state.ws);
          });
    
          ws.on('disconnect', function () {
            console.log(`${new Date().toLocaleString()} >>>>> 连接已关闭`);
            // 尝试重新连接
            dispatch('reconnectWebSocket');
          });
          // 监听 'authError' 消息
          ws.on('authError', (data) => {
            console.log('Authentication Error:', data.message);
            // 在这里进行相应的处理，比如提示用户认证失败等操作
          });
          ws.on('connect', function () {
            console.log(`${new Date().toLocaleString()} >>>>> 连接成功`, ws);
            // 保存 WebSocket 连接信息
            commit('SET_WS', ws);
            // // 在这里调用 sendMessage，确保 state.ws 已经被正确设置
          });
    
          ws.on('error', function (e) {
            console.log(`${new Date().toLocaleString()} >>>>> 数据传输发生异常`, e);
          });

          ws.on('receiveMessage',function (data) {
            console.log(`${new Date().toLocaleString()} >>>>> 收到消息 ${(JSON.stringify(data))}`, state.ws);
            dispatch('receiveMessage',data)
          })
        } catch (error) {
          console.error('WebSocket连接失败：', error);
        }

      }
    },
    receiveMessage({state,rootState,commit},data){
      console.log(data,6666666666);
      if(data.group_id == state.nowchat.group_id){//接收群聊消息
        commit('SET_MESSAGE',data)
      }else if(data.receiver_id == rootState.user.user_id){//接收私聊消息
        commit('SET_MESSAGE',data)
      }else{
        return
      }

    },
    sendMessage({state,rootState },message) {
      console.log(`${new Date().toLocaleString()} >>>>> 发送消息：${message}`, state.ws);
      let data = null ;
      if (state.nowchat.user_id !== undefined) { //私聊
        data = {
          sender_id: rootState.user.user_id,
          receiver_id: state.nowchat.user_id, // 如果是私聊
          content: message,
          type: 'text',
        };
      } else {
        data = {
          sender_id: rootState.user.user_id,
          group_id: state.nowchat.group_id, // 如果是群聊
          content: message,
          type: 'text',
        };
      }
      state.ws.emit('sendMessage',data);
    },
  
    reconnectWebSocket({dispatch}) {
      dispatch('clearWebSocket');
      // 递归调用，一直尝试重连
      setTimeout(() => {
        dispatch('startWebSocket');
      }, 6000);
    },
  
    clearWebSocket({commit, state}) {
      if (state.ws) {
        state.ws.close();
        commit('CLEAR_WS');
      }
    },
  },
}

export default webSocket