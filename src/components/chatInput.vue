<template>
    <div class="message-input-box">
      <div class="input-tools">
        <i slot="reference" class="el-icon-s-opportunity" title="表情"></i>
        <i slot="reference" class="el-icon-folder-opened" title="文件"></i>
        <i slot="reference" class="el-icon-microphone" title="语音输入"></i>    
        <i slot="reference" class="el-icon-chat-dot-round" title="聊天记录"></i>    
        <i slot="reference" class="el-icon-position" title="位置信息"></i>
      </div>
  
      <el-input
        type="textarea"
        resize="none"
        :autosize="{ minRows: 5, maxRows: 5}"
        v-model="textArea"
        >
      </el-input>
  
      <div class="footer-tools">
        <el-button
          size="mini"
          type="primary"
          class="send-button">
          发送/Send
        </el-button>
      </div>
    </div>
</template>

<script>
export default {
    name : "chatInput",
    data(){
        return{
            textArea:'',
        }
    },
    methods:{
        
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