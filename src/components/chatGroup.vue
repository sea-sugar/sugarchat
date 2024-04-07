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
    }
  },
  methods:{
    getList(){
      this.List = [] 
      getList().then(res =>{
        console.log(res);
        this.List.push(...res.data.friendInfo);
        this.List.push(...res.data.groupInfo);
        this.List.map(item => {
          item.active = false
        })
      }).catch(err =>{
        console.log(err);
      })
    },
    switchGroup(item){
      if (this.loading) {
        return 
      }
      this.loading = true
      this.List.map(item => {
        item.active = false
      })
      item.active = true
      this.$forceUpdate()
      this.$emit('switchGroup',item)
      console.log(456);
      this.loading = false
    }

  },
  mounted(){
    this.getList();
  }
}
</script>

<style lang="scss" scoped>
.item-active {
  background: rgba(255, 255, 255, .4);
}
.group{
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
}
</style>