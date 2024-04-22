<template>
    <ul class="group">
        <li v-for="(item , index) in List"
        :class="['item-list',{'item-active' : item.active}]" 
        @click="switchGroup(item)"
        >
            <div class="group-left">
                <el-badge
                class="badge"
                :max="99"
                >
                <img :src="item.user_avatar != undefined ? require(`../assets/avatar${item.user_avatar}`) : require(`../assets/avatar${item.group_avatar}`)" 
                :alt="item.username != undefined ? item.username : item.group_name"  class="group-avatar">
                </el-badge>
            </div>
            <!-- 新消息提醒红点 -->
            <div class="new-message-dot" v-if="item.hasNewMessage"></div>
            
            <div class="group-right">
                <div class="group-header">
                    <div class="group-title">{{item.username ? item.username : item.group_name}}</div>
                    <!-- <div class="group-time">{{item.lastMessage.send_time}}</div> -->
                    <div class="group-time">{{item.lastMessage?.send_time !== undefined ?  formatTimeGroup(item.lastMessage.send_time) : 'time'}}</div>
                </div>
                <div class="group-content">{{item.lastMessage?.content !== undefined ?  item.lastMessage.content : 'content'}}</div>
            </div>
        </li>
        <div class="userinfo" @click="openUserinfo=true">
          <el-image :src="require(`../assets/avatar${this.$store.getters.avatar}`)"  lazy  style="width: auto; height: 50px; border-radius: 70%;" ></el-image>
          {{this.$store.getters.username}} 欢迎回家！
        </div>
        <el-dialog
          title="个人中心"
          :visible.sync="openUserinfo"
          width="30%"
          :append-to-body="true"
          >
          <!-- <span>这是一段信息</span> -->
          <el-form :model="userInfoForm" :rules="userInfoFormRule" ref="userInfoFormRef" label-width="80px" class="userInfoForm">
            <el-form-item prop="username" label="我的昵称">
              <el-input v-model="userInfoForm.username" placeholder="取个好听的名字吧"></el-input>
            </el-form-item>
            <el-form-item prop="avatar" label="我的头像">
              <el-image v-model="userInfoForm.avatar" :src=avatarPath @click="changeAvatar" lazy  style="width: auto; height: 200px" ></el-image>
            </el-form-item>
            <!-- <el-form-item label="即时配送">
              <el-switch v-model="form.delivery"></el-switch>
            </el-form-item> 
            <el-form-item label="活动性质">
              <el-checkbox-group v-model="form.type">
                <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                <el-checkbox label="地推活动" name="type"></el-checkbox>
                <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="特殊资源">
              <el-radio-group v-model="form.resource">
                <el-radio label="线上品牌商赞助"></el-radio>
                <el-radio label="线下场地免费"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="活动形式">
              <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>-->

            <!-- <el-form-item>
              <el-button type="primary" @click="onSubmit">立即创建</el-button>
              <el-button>取消</el-button>
            </el-form-item> -->

          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="openUserinfo = false">取 消</el-button>
            <el-button type="primary" @click="submitUserInfoForm">确 定</el-button>
          </span>
        </el-dialog>
    </ul>
</template>

<script>
import { getList , updateUserinfo} from '../apis/user';
import { getLastMessage } from '../apis/msg';
import { mapGetters } from 'vuex';
import { setToken } from '../utils/auth';
import { formatTimeGroup } from '../utils/tools';
import { EventBus } from '../utils/EventBus'; //兄弟组件通讯
import store from '@/store';
export default {
  name:'chatGroup',
  props:{ 

  },
  data() {
    return{
      a:1,
      List:[],
      loading:false,
      openUserinfo:false,
      avatarTemp: 0,
      userInfoForm:{
        username:'',
        avatar:'',
      },
      userInfoFormRule:{
        username: [{required: true, message: '不能为空', trigger: 'blur'},{ pattern: /^[a-zA-Z0-9\u4E00-\u9FA5]+$/, message: '用户名只能包含中文、数字和字母', trigger: 'blur' }],
        avatar:[],
      },
    }
  },
  computed:{
    avatarPath(){
      return this.avatarTemp == 0 ? require(`../assets/avatar${this.$store.getters.avatar}`) : require(`../assets/avatar/${this.avatarTemp}.png`);
    },
    ...mapGetters(['username','avatar']),
  },
  created() {
    EventBus.$on('message-from-component-chatBox', this.handleMessage);
  },
  beforeDestroy() {
    EventBus.$off('message-from-component-chatBox', this.handleMessage);
  },
  mounted(){
    this.getList();
    this.userInfoForm.username = this.username
    this.userInfoForm.avatar = this.avatar
    console.log(this.List);
  },
  methods:{
    formatTimeGroup,
    getList(){
      this.List = [] 
      getList().then(async res =>{
        // console.log(res);
        this.List.push(...res.data.friendInfo);
        this.List.push(...res.data.groupInfo);
        this.$store.commit('SET_LIST',this.List)
        this.List.map(item => {
          item.active = false
        })
        this.List[0].active = true 
        this.$emit('switchGroup',this.List[0])
        this.$store.commit('SET_NOWCHAT',this.List[0])
        await this.getLastMessage()
      }).catch(err =>{
        console.log(err);
      })
    },
    getLastMessage(){
      const promises = [];
      for (let i = 0; i < this.List.length; i++) {
        if (this.List[i].user_id !== undefined) {
          promises.push(getLastMessage(this.List[i].user_id, ''));
        } else {
          promises.push(getLastMessage('', this.List[i].group_id));
        }
      }
      Promise.all(promises).then(responses => {
        responses.forEach((res, i) => {
          // this.List[i] = { ...this.List[i], lastMessage: { ...res.data.message } }; 错误的写法
          this.$set(this.List[i], 'lastMessage', res.data.message);
        });
        console.log("获取lastMessage success");
      }).catch(err => {
        console.log(err);
      });
    },
    switchGroup(item){
      if (this.loading) {
        return 
      }
      if (item.active) {
        return
      }
      item.hasNewMessage = false
      this.loading = true
      this.List.map(item => {
        item.active = false
      })
      item.active = true
      this.$forceUpdate()
      this.$emit('switchGroup',item)
      this.$store.commit('SET_NOWCHAT',item)
      this.loading = false
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    changeAvatar(){
      this.avatarTemp = Math.floor(Math.random() * 19) + 1;
      this.userInfoForm.avatar = `/${this.avatarTemp}.png`
    },
    submitUserInfoForm(){
      this.$refs['userInfoFormRef'].validate((valid) => {
        if(valid){
          console.log("提交个人信息",this.userInfoForm);
          updateUserinfo(this.userInfoForm).then(res =>{
            console.log(res);
            if (res.data.userinfo) { // 判断是否存在用户信息
              setToken(res.data.token)
              this.$store.commit('SET_TOKEN', res.data.token)
              this.$store.commit('SET_NAME', res.data.userinfo.username)
              this.$store.commit('SET_AVATAR', res.data.userinfo.user_avatar)
              this.$store.commit('SET_ID', res.data.userinfo.user_id)
            }
          })
          this.openUserinfo = false
        }
        else{
          console.log("表单不全");
        }
      })
      
    },
    handleMessage(newmsg) {
      console.log("receive...",newmsg);
      for (let i = 0; i < this.List.length; i++) {
        if (this.List[i].user_id == newmsg.sender_id && newmsg.group_id == null) {
          this.$set(this.List[i],'hasNewMessage',true)
          this.$set(this.List[i],'lastMessage',newmsg)
          break
        }
        else if(this.List[i].group_id == newmsg.group_id && newmsg.receiver_id == null && this.$store.state.webSocket.nowchat.group_id != newmsg.group_id ){
          this.$set(this.List[i],'hasNewMessage',true)
          this.$set(this.List[i],'lastMessage',newmsg)
          break
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.item-active {
  background: rgba(255, 255, 255, .4);
}
.group{
  margin-bottom: 0;
  height: 100%;
  position: relative;
  overflow: auto;
  padding-left:0;
  .item-list{
    display: flex;
    padding: 10px 15px;
    width: 100%;
    height: 62px;
    font-size: 12px;
    box-sizing: border-box;
    &:hover {
      background: rgba(255, 255, 255, .4);
    }
  }
  .group-left {
    margin-right: 10px;
    font-size: 0;
    .group-avatar {
      width: 40px;
      height: 40px;
    }
  }
  .group-right {
      flex: 1;
      overflow: hidden;
      .group-header {
        display: flex;
        justify-content: space-between;
        .group-title {
          text-align: left;
          width: 60%;
          font-size: 16px;
        }
        .group-time {
          color: #aaaaaa;
        }
      }
      .group-content {
        text-align: left;
        margin-top: 4px;
        color: #999999;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    .userinfo{
      display: flex;
      align-items: center;
      justify-content:space-around;
      position: absolute;
      width: 100%;
      height: 60px;
      background: rgba(255, 255, 255, .0);
      bottom: 0;
      &:hover {
        background: rgba(255, 255, 255, .4);
      }
    }
    .userInfoForm{
      display: flex; 
      align-items: center; 
      justify-content: center;
    }
    .new-message-dot {
      position: absolute;
      left: 0;
      width: 12px;
      height: 12px;
      background-color: red;
      border-radius: 50%;
    }

}
</style>