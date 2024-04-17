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
                <img src="/bgc.png" alt="头像" class="group-avatar">
                </el-badge>
            </div>
            
            <div class="group-right">
                <div class="group-header">
                    <div class="group-title">{{item.username ? item.username : item.group_name}}</div>
                    <div class="group-time">time</div>
                </div>
                <div class="group-content">123</div>
            </div>
        </li>
        <div class="userinfo" @click="openUserinfo=true">个人中心</div>
        <el-dialog
          title="个人中心"
          :visible.sync="openUserinfo"
          width="30%"
          :append-to-body="true"
          >
          <!-- <span>这是一段信息</span> -->
          <el-form  label-width="80px" class="userInfoForm">
            <el-form-item label="我的昵称">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="我的头像">
              <el-image :src=avatarPath @click="changeAvatar" lazy  style="width: auto; height: 200px" ></el-image>
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
import { getList } from '../apis/user';
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
      avatarTemp: 0 ,
    }
  },
  computed:{
    avatarPath(){
      return this.avatarTemp == 0 ? require(`../assets/avatar${this.$store.getters.avatar}`) : require(`../assets/avatar/${this.avatarTemp}.png`);
    }
  },
  mounted(){
    this.getList();
  },
  methods:{
    getList(){
      this.List = [] 
      getList().then(res =>{
        // console.log(res);
        this.List.push(...res.data.friendInfo);
        this.List.push(...res.data.groupInfo);
        this.List.map(item => {
          item.active = false
        })
        this.List[0].active = true 
        this.$store.commit('SET_NOWCHAT',this.List[0])
      }).catch(err =>{
        console.log(err);
      })
    },
    switchGroup(item){
      if (this.loading) {
        return 
      }
      if (item.active) {
        return
      }
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
    },
    submitUserInfoForm(){
      console.log("提交个人信息");
      this.openUserinfo = false
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
}
</style>