<template>
    <div class="container">
      <el-container>
        <el-aside width="250px">
          <el-header height="40px">
            <i class="el-icon-user-solid icon-message"></i>
            <span class="title">联系人</span>
            <i class="el-icon-circle-plus-outline" style="float: right; line-height: inherit; cursor: pointer;" @click="openFindFriends = true"></i>
          </el-header>
          <chatGroup 
          :key="isAddFriend"
          @switchGroup="switchGroup"
          @getList="getList"/>
        </el-aside>
        <el-main >
          <el-header height="40px" >
            <span class="title">{{nowchat.username ? nowchat.username : nowchat.group_name}}</span>
            <!-- <span class="title" v-if="nowchat.group_name">(666)人</span> -->
          </el-header>
          <chatBox 
          :nowchat="nowchat"/>
          <chatInput 
          :nowchat="nowchat"/>
        </el-main>
        <footer class="footer">
          <a href="https://github.com/sea-sugar/sugarchat.git" target="_blank">sea sugar</a> &copy; 2024
        </footer>
      </el-container>

      <el-dialog
          title="添加联系人"
          :visible.sync="openFindFriends"
          width="30%"
          :append-to-body="true"
          >
          <span>添加好友：</span>
          <el-input v-model="inputId" style="width: 240px" placeholder="Please input" ></el-input>

          <span slot="footer" class="dialog-footer">
            <el-button @click="openFindFriends = false">取 消</el-button>
            <el-button type="primary" @click="submitFindFriends">确 定</el-button>
          </span>
        </el-dialog>
    </div>
</template>

<script>
import chatGroup from '@/components/chatGroup.vue';
import chatBox from '@/components/chatBox.vue';
import chatInput from '@/components/chatInput.vue';
import { findfriends } from '../apis/user'
import { Notification} from 'element-ui'
export default {
  data() {
    return {
      nowchat:{
        user_id:'sea-sugar',
        username:'sea-sugar',
        user_avatar:'/1.png',
        active:true,

        // group_id:1,
        // group_name:'123',
        // group_avatar:'123',
        // own_id:'123',
        // description:'123',
        // active:true,
      },
      openFindFriends:false,
      inputId:'',
      List:[],
      isAddFriend:false,
    };
  },
  components: {
    chatGroup,
    chatBox,
    chatInput
  },
  mounted(){
    this.$store.dispatch("startWebSocket");
  },
  destroyed(){
    this.$store.dispatch("clearWebSocket");
  },
  methods: {
    switchGroup(item){
      console.log("聊天对象已经切换至 ",item.username ? item.username : item.group_name);
      this.nowchat = item 
    },
    getList(List){
      this.List = List
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    submitFindFriends(){
      if (this.List.findIndex(item =>{ return item.user_id == this.inputId || item.group_id == this.inputId}) == -1 && this.inputId !== this.$store.getters.user_id) {
        findfriends(this.inputId).then(res =>{
          // console.log(res);
          Notification.success({
            title: '添加成功'
          })
          this.isAddFriend = !this.isAddFriend
          this.openFindFriends = false
        }).catch(err =>{
          console.log(err);
        })
        console.log("提交");
      }else if(this.inputId == this.$store.getters.user_id){
        Notification.error({
          title: '请勿添加自己'
        })
      }else{
        Notification.error({
          title: '请勿重复添加'
        })
      }
      // this.openFindFriends = false
      this.inputId = ''
    },
  }
};
</script>

<style lang="scss" scoped>
.container{
  // height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  .el-container{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 88%;
    margin: 30px auto;
    .el-aside,
    .el-main {
      display: flex;
      flex-direction: column;
      border-radius: 6px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }
    .el-aside {
      background: rgba(235, 233, 232, .8);
    }
    .el-main {
      padding: 0;
      margin-left: 20px;
    }
    .el-header {
      position: relative;
      line-height: 40px;
      background: rgb(55, 126, 200);
      overflow: hidden;
      .title,
      .icon-message {
        color: #ffffff;
      }
      .icon-message {
        font-size: 20px;
        vertical-align: middle;
      }
      .title {
        display: inline-block;
        margin-left: 5px;
        font-size: 16px;
        letter-spacing: 1px;
      }
    }
  }
  .footer {
    position: absolute;
    bottom: -23px;
    right: 0;
    left: 0;
    margin: auto;
    font-size: 13px;
    width: 150px;
    color: #ffffff;
    text-align: center;
    a {
      color: #ffffff;
      &:hover {
        color: #377ec8;
      }
    }
  }
}

</style>