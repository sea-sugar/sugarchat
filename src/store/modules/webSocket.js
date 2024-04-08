import { getToken } from "@/utils/auth";
import io from 'socket.io-client';

const webSocket = {
  state : {
    ws: null,
  },
  mutations : {
    SET_WS(state, ws) {
      state.ws = ws;
      console.log("SET_WS", state.ws);
    },
    CLEAR_WS(state) {
      state.ws = null;
    },
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
          })
        } catch (error) {
          console.error('WebSocket连接失败：', error);
        }

      }
    },
  
    sendMessage({state,rootState },{nowchat, message}) {
      console.log(`${new Date().toLocaleString()} >>>>> 发送消息：${message}`, state.ws);
      let data = null ;
      if (nowchat.user_id) { //私聊
        data = {
          sender_id: rootState.user.user_id,
          receiver_id: nowchat.user_id, // 如果是私聊
          content: message,
          type: 'text',
        };
      } else {
        data = {
          sender_id: rootState.user.user_id,
          group_id: nowchat.group_id, // 如果是群聊
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