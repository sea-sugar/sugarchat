<template>
    <div class="message-input-box">
      <div class="input-tools" @click="bug">
        <i slot="reference" class="el-icon-s-opportunity" title="表情"></i>
        <i slot="reference" class="el-icon-folder-opened" title="文件"></i>
        <i slot="reference" class="el-icon-microphone" title="语音输入"></i>    
        <i slot="reference" class="el-icon-chat-dot-round" title="聊天记录"></i>    
        <i slot="reference" class="el-icon-position" title="位置信息"></i>
      </div>
  
      <el-input
        type="textarea"
        resize="none"
        :autosize="{ minRows: 5, maxRows: 7}"
        v-model="textArea"
        @keydown.native.shift.enter="handleShiftEnter"
        @keydown.enter.native="handleEnter"
        >
      </el-input>
  
      <div class="footer-tools">
        <el-button
          size="mini"
          type="primary"
          class="send-button"
          @click="sendMessage"
          >
          发送/Send
        </el-button>
      </div>
    </div>
</template>

<script>
export default {
    name : "chatInput",
    props: {
      nowchat: {
        type: Object
      }
    },
    data(){
        return{
            textArea:'',
        }
    },
    methods:{
      sendMessage(){
        console.log("发送消息：",this.textArea);
        if (this.blankTesting() && this.$store.getters.nowchat != null) {
          this.$store.dispatch('sendMessage',this.textArea)
          this.textArea = ''
          return
        }
        console.log("发送失败");
      },

      // 消息过滤
      // textAreaTran () {
      //   return this.textArea.replace(/\n/g, '').replace(new RegExp('<', 'gm'), '&lt')
      // },
      // 检测空白
      blankTesting () {
        if (this.textArea.replace(/\s+/g, '') === '') {
          this.$alert('不能发送空白消息', '提示', {
            confirmButtonText: '确定'
          })
          return false
        }
        return true
      },
      handleShiftEnter(event) {
        event.preventDefault(); // 阻止默认行为（不插入换行符）

        const textarea = event.target;
        const cursorPos = textarea.selectionStart;
        const textBeforeCursor = this.textArea.substring(0, cursorPos);
        const textAfterCursor = this.textArea.substring(cursorPos);

        // 更新文本并保持光标位置
        this.textArea = textBeforeCursor + '\n' + textAfterCursor;
        const newCursorPos = cursorPos + 1;
        this.$nextTick(() => {
          textarea.setSelectionRange(newCursorPos, newCursorPos);
        });
      },
      handleEnter(event){
        if (event.key === 'Enter' && !event.shiftKey) {
          event.preventDefault(); // 阻止默认行为（不插入换行符）
          this.sendMessage();
        }
      },
      bug(){
        this.$message({
            type:"info",
            message:"功能尚未开发",
            showClose:true
            })
      }
    }
}
</script>

<style lang="scss" scoped>
.message-input-box {
  height: 200px;
  background-color: rgba(255, 255, 255, .85);
  border-top: 1px solid #dddddd;
  ::v-deep .el-textarea__inner {
    padding: 5px 20px;
    border-radius: 0;
    border: 0;
    background-color: transparent;
  }
  .input-tools {
    position: relative;
    padding-left: 10px;
    padding-top: 10px;
    text-align: left;
    .upload-demo {
      display: inline;
    }
    i {
      margin-left: 10px;
      color: rgb(94, 94, 94);
      font-size: 20px;
      cursor: pointer;
    }
  }
  .el-textarea {
    height:130px;
    min-height: 120px;
    overflow:hidden;
    // .el-textarea__inner {
    //   padding: 5px 20px;
    //   border-radius: 0;
    //   border: 0;
    //   background-color: transparent;
    // }
  }
  .footer-tools {
    text-align: right;
    .send-button {
      padding: 7px 10px;
      margin-right: 20px;
      background: #377ec8;
    }
  }
}
.face-pabel {
  .face {
    display: inline-block;
    width: 20px;
    height: 20px;
  }
}
</style>