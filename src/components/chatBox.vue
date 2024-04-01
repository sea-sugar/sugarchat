<template>
    <div class="message-chat-box">
  
      <el-button
        class="eye-more"
        type="text">加载更多消息</el-button>
  
      <ul class="message-styles-box">
        <li
          v-for="(item, index) in 6"
          class="message-layout-right">
  
          <img class="message-avatar"
            :src="item.avatar ? item.avatar : '/bgc.png'"
            :alt="item.nickName ? item.nickName : '我是憨批'">
  
          <!-- <p class="message-nickname">sea 发送time</p> -->
          <p class="message-nickname" >接收time sugar</p>
          <p class="message-classic" >内容</p>
        </li>
        <li
          v-for="(item, index) in 2"
          class="message-layout-left">
  
          <img class="message-avatar"
            :src="item.avatar ? item.avatar : '/bgc.png'"
            :alt="item.nickName ? item.nickName : '我是憨批'">
  
          <p class="message-nickname">sea 发送time</p>
          <!-- <p class="message-nickname" >接收time sugar</p> -->
          <p class="message-classic" >内容</p>
        </li>
      </ul>
    </div>
</template>

<script>
export default {
    name : 'chatBox',
    data(){
        return {

        }
    },
    methods:{
        
    }

}
</script>

<style lang="scss" scoped>
.message-chat-box {
  padding: 0 20px;
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  background: rgba(255, 255, 255, .8);

  .eye-more {
    width: 100%;
    padding: 10px 0;
    font-size: 12px;
    text-align: center;
  }

  .message-styles-box {
    margin-bottom: 20px;
    list-style-type: none;
    padding-left: 0;
    .message-layout-left,
    .message-layout-right {
      margin-top: 20px;
      width: 100%;
      .message-classic::before {
        content: '';
        position: absolute;
        border-width: 8px;
        border-style: solid;
      }
    }

    .message-layout-left {
        text-align: left;
      .message-avatar {
        float: left;
        margin-right: 10px;
      }
      .message-classic {
        text-align: right ;
        background-color: rgba(255, 255, 255, .8);
        &::before {
          left: -16px;
          border-color: transparent rgba(255, 255, 255, .8) transparent transparent;
        }
      }
    }

    .message-layout-right {
      text-align: right;
      .message-avatar {
        float: right;
        margin-left: 10px;
      }
      .message-classic {
        text-align: left;
        color: #ffffff;
        background-color: rgba(55, 126, 200, .8);
        &::before {
          right: -16px;
          border-color:  transparent transparent  transparent rgba(55, 126, 200, .8);
        }
      }
    }

    .message-avatar {
      width: 40px;
      height: 40px;
      border-radius: 2px;
      border: 1px solid #eeeeee;
    }
    .message-nickname {
      color: #777777;
      font-size: 12px;
    }

    .message-classic {
      position: relative;
      max-width: 45%;
      margin-top: 5px;
      display: inline-block;
      padding: 9px 12px;
      font-size: 14px;
      color: #333333;
      border-radius: 5px;
      white-space: pre-line;
      word-break: break-all;
    }
  }
}
</style>