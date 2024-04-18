<template>
    <div class="message-chat-box">
  
      <el-button
        class="eye-more"
        type="text"
        @click="moreMessages"
        :disabled="loading"
        v-show="moreMsg"
        >加载更多消息</el-button>
  
      <ul class="message-styles-box">
        <li
          v-for="(item, index) in messages"
          :class="{'message-layout-right': item.sender_id == $store.getters.user_id , 'message-layout-left' : item.sender_id !== $store.getters.user_id }">
   <!-- src="../assets/avatar/1.png" -->
          <img class="message-avatar"
            v-if="item.receiver_id!==null"
            :src="item.sender_id == $store.getters.user_id ? require('../assets/avatar' + item.sender.user_avatar) : require('../assets/avatar' + item.receiver.user_avatar)"
            :alt="item.sender_id == $store.getters.user_id ? item.sender.username : item.receiver.username">
          <img class="message-avatar"
            v-else
            :src="require('../assets/avatar' + item.sender.user_avatar)"
            :alt="item.sender.user_username">
          <!-- <p class="message-nickname">sea 发送time</p> -->

          <p class="message-nickname" >{{ item.sender.username}} {{ formatTime(item.send_time) }}</p>
          <p class="message-classic" >{{item.content}}</p>
        </li>
        <!-- <li
          v-for="(item, index) in 2"
          class="message-layout-left">
  
          <img class="message-avatar"
            :src="item.avatar ? item.avatar : '/bgc.png'"
            :alt="item.nickName ? item.nickName : '我是憨批'">
  
          <p class="message-nickname">sea 发送time</p>
           <p class="message-nickname" >接收time sugar</p> 
          <p class="message-classic" >内容</p>
        </li> -->
      </ul>
      <button @click="sendMessage">发送消息到chatGroup</button>
    </div>
</template>

<script>
import { getMessage } from '../apis/msg';
import { mapGetters } from 'vuex';
import { EventBus } from '../utils/EventBus';
export default {
    name : 'chatBox',
    props: {
      nowchat: {
        type: Object
      }
    },
    data(){
        return {
          messages:[],
          totalMessages:0,
          page:1,
          loading:false,
          moreMsg:true,
        }
    },
    mounted(){
      // this.getMessage()
    },
    beforeDestroy() {
      EventBus.$off('message-from-component-chatBox');
    },
    computed:{
      isNewChat(){
        return this.nowchat
      },
      ...mapGetters(['newmessage']),
    },
    watch: {
      isNewChat: {
        immediate: true,
        handler(newVal, oldVal) {
          this.totalMessages = 0
          this.page = 1
          this.loading = false
          this.moreMsg = true
          this.messages = []
          this.getMessage();
        }
      },
      newmessage: {
        deep:true,
        handler(newVal,oldVal) {
          if(newVal){
            this.messages.push(newVal)
            this.gotoBottom()
          }
        }
      }
    },
    methods:{
      getMessage(page = 1){
        this.loading = true
        if (this.totalMessages !== 0) {
          const totalPages = Math.ceil(this.totalMessages / 10);
          console.log(page,totalPages);
          if (page > totalPages) {
            this.moreMsg = false
            this.loading = false
            return
          }
        }
        if (this.nowchat.user_id !== undefined ) {
          getMessage(this.nowchat.user_id,'',page).then(res =>{
            console.log(res);
            this.totalMessages = res.data.totalMessages
            this.messages.unshift(...res.data.messages) 
          }).catch(err =>{
            console.log(err);
          })
        }
        else{
          getMessage('',this.nowchat.group_id,page).then(res =>{
            console.log(res);
            this.totalMessages = res.data.totalMessages
            this.messages.unshift(...res.data.messages) 
          }).catch(err =>{
            console.log(err);
          })
        }
        this.loading = false
      },
      async moreMessages() {
        // 获取当前滚动位置
        const box = document.getElementsByClassName('message-chat-box')[0];
        const scrollTopBeforeLoad = box.scrollTop;

        // 加载更多消息
        this.page = this.page + 1;
        await this.getMessage(this.page);

        // 等待加载更多消息完成后,平滑滚动到之前的位置
        this.$nextTick(() => {
          const scrollPosition = box.scrollHeight - box.offsetHeight + scrollTopBeforeLoad;
          box.scrollTo({
            top: scrollPosition,
            // behavior: 'smooth'
          });
        });
      },

      gotoBottom () {
        const box = document.getElementsByClassName('message-chat-box')[0]
        this.$nextTick(() => {
          box.scrollTop = box.scrollHeight
        })
      },
      formatTime(time) {
        const date = new Date(time);

        // 获取时间的小时和分钟
        const hours = date.getHours();
        const minutes = date.getMinutes();

        // 对小时和分钟进行补零处理
        const formattedHours = hours < 10 ? `0${hours}` : hours;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

        // 获取当前日期的年月日
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;
        const currentDay = currentDate.getDate();

        // 获取传入时间的年月日
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        // 如果传入时间与当前时间的年月日相同，则只返回小时和分钟；否则返回完整的日期加上小时和分钟
        if (year === currentYear && month === currentMonth && day === currentDay) {
          return `${formattedHours}:${formattedMinutes}`;
        } else {
          return `${year}/${month}/${day} ${formattedHours}:${formattedMinutes}`;
        }
      },
      sendMessage() {
        EventBus.$emit('message-from-component-chatBox', 'Hello from chatBox');
        console.log("send...");
      },
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
        max-width: 100%;
        height: auto;
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
        max-width: 100%;
        height: auto;
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