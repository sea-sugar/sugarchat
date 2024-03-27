import { login , getInfo ,logout} from '@/apis/user'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    username: '',
    avatar: '',
    user_id: '',
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, username) => {
      state.username = username
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ID: (state, id) => {
        state.user_id = id
      },
  },

  actions: {
    // 登录
    Login({ commit }, paramsLogin) {
      return new Promise((resolve, reject) => {
        login(paramsLogin).then(res => {
            if (res.msg == 'success') {
                setToken(res.data.token)
                commit('SET_TOKEN', res.data.token)
                commit('SET_NAME', res.data.userinfo.username)
                commit('SET_AVATAR', res.data.userinfo.avatar)
                commit('SET_ID', res.data.userinfo.user_id)
                resolve(res)
            }
            else{
                resolve(res)
            }
        }).catch(error => {
            reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo().then(res => {
          if (res.data.userinfo) { // 判断是否存在用户信息
            commit('SET_TOKEN', res.data.token)
            commit('SET_NAME', res.data.userinfo.username)
            commit('SET_AVATAR', res.data.userinfo.avatar)
            commit('SET_ID', res.data.userinfo.user_id)
          } else {
            // 用户信息为空，进行相应处理
            reject(new Error('登录过期'))
          }
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 退出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
            commit('SET_TOKEN', '')
            commit('SET_NAME', '')
            commit('SET_AVATAR', '')
            commit('SET_ID', '')
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
  }
}

export default user
