<template>
    <div class="container">
      <el-container>
        <el-aside width="250px">
          <el-header height="40px">
            <i class="el-icon-user-solid icon-message"></i>
            <span class="title">联系人</span>
          </el-header>
          <chatGroup 
          @switchGroup="switchGroup"/>
        </el-aside>
        <el-main >
          <el-header height="40px" >
            <span class="title">聊天室(0)人</span>
            <span class="title">666</span>
          </el-header>
          <span @click="logout">恭喜你，{{this.$store.getters.username}}已经登录，id为 ： {{ this.$store.getters.user_id }}</span>
          <chatBox 
          :nowchat="nowchat"/>
          <chatInput 
          :nowchat="nowchat"/>
        </el-main>
        <footer class="footer">
          <a href="localhost:8080" target="_blank">sea sugar</a> &copy; 2024
        </footer>
      </el-container>
    </div>
</template>

<script>
import chatGroup from '@/components/chatGroup.vue';
import chatBox from '@/components/chatBox.vue';
import chatInput from '@/components/chatInput.vue';
import store from '@/store';
export default {
  data() {
    return {
      nowchat:{
        // user_id:'test',
        // username:'test',
        // user_avatar:'1',
        // active:true,

        group_id:1,
        group_name:'123',
        group_avatar:'123',
        own_id:'123',
        description:'123',
        active:true,
      },
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
    logout(){
      this.$store.dispatch('LogOut').then(() => {
        this.$router.replace("/login");
        }).catch(err =>{
        console.log(err);
      })
    },
    switchGroup(item){
      console.log("聊天对象已经切换至 ",item);
      this.nowchat = item 
    }
  }
};
</script>

<style lang="scss" scoped>
.container{
  // height: 100vh;
  background-image: url('/public/bgc.png');
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