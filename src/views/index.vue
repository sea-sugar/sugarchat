<template>
    <div>
      登录了，恭喜你！
      <el-button type="primary" @click="logout">退出</el-button>
    </div>
</template>

<script>
export default {
  data() {
    return {
      
    };
  },
  methods: {
    logout(){
      this.$store.dispatch('LogOut').then(() => {
        this.$router.replace("/login");
        }).catch(err =>{
        console.log(err);
      })
    }
  }
};
</script>

<style scoped>

</style>