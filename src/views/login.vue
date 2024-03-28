<template>
    <div class="loginbody">
      <div class="logindata">
        <div class="logintext">
          <h2>Welcome</h2>
        </div>
        <div class="formdata">
          <el-form ref="form" :model="form" :rules="rules" @keyup.enter.native="login('form')">
            <el-form-item prop="user_id">
              <el-input
                v-model="form.user_id"
                clearable
                placeholder="请输入账号"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="form.password"
                clearable
                placeholder="请输入密码"
                show-password
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="tool">
          <div>
            <el-checkbox v-model="remember" 
              >记住密码</el-checkbox
            >
          </div>
          <div>
            <span class="shou" @click="forgetpas">忘记密码？</span>
          </div>
        </div>
        <div class="butt">
          <el-button type="primary" @click.native.prevent="login('form')" :loading="loading" 
            >登录</el-button
          >
          <el-button class="shou" @click="register">注册</el-button>
        </div>
      </div>
    </div>
</template>
  
<script>
import  { Base64 } from 'js-base64'
import { getCookie , setCookie , removeCookie } from '@/utils/auth';
export default {
    name: "login",
    data() {
      return {
        form: {
          password: "",
          user_id: "",
        },
        remember: false,
        loading:false,
        paramsLogin : {
            user_id:'',
            password:'',
        },
        rules: {
          password: [
            { required: true, message: "请输入密码", trigger: "blur" },
            { pattern: /^[a-zA-Z0-9_-]{4,16}$/, message: "密码需在4到16位(字母，数字，下划线，减号)", trigger: "blur" }
          ],
          user_id: [
            { required: true, message: "请输入用户名", trigger: "blur" },
            { pattern: /^[a-zA-Z0-9]{3,10}$/, message: "用户名应是3到10位，只能包含字母和数字", trigger: "blur" }
          ],
        },
      };
    },
    mounted(){
      // 在页面加载时从cookie获取登录信息
      let remember = getCookie("remember")
      if(remember){
          this.form.user_id = getCookie("user_id")
          this.form.password = Base64.decode(getCookie("password"))
          this.remember = getCookie("remember")
      }
    },
    methods: {
      login(form) {
        this.loading = true ;
        this.$refs[form].validate((valid) => {
          if (valid) {
            this.paramsLogin.user_id = this.form.user_id ;
            this.paramsLogin.password = this.form.password ;
            console.log(this.paramsLogin.user_id);
            console.log(this.paramsLogin.password);
            this.$store.dispatch("Login", this.paramsLogin).then((res) => {
              if (res.msg === 'success') {
                this.remenber()
                this.$message({
                  message: "登录成功",
                  type: "success",
                  showClose: true,
                });
                this.$router.replace("/index");
              }
              else{
                this.$message({
                  message: res.msg,
                  type: "error",
                  showClose: true,
                });
                this.form.password = '';
                removeCookie("user_id")
                removeCookie("password") 
                removeCookie("remember")
              }
                  
            }).catch((err) => {
              console.log(err);
            });
            this.loading = false ;
          } else {
            this.loading = false ;
            return false;
          }
        });
      },
      remenber(){
        this.loading = true ;
        if(this.remember){
            setCookie("user_id",this.form.user_id)
            // base64加密密码
            let passWord = Base64.encode(this.form.password)
            setCookie("password",passWord)   
            setCookie("remember",this.remember)   
        }else{
          removeCookie("user_id")
          removeCookie("password") 
          removeCookie("remember")   
        } 
        this.loading = false ;
      },
      forgetpas() {
        this.$message({
          type:"info",
          message:"功能尚未开发",
          showClose:true
        })
      },
      register(){
        this.$router.push('/register');
      },
    },
  };
  </script>
  
  <style scoped>
  .loginbody {
    width: 100%;
    height: 100%;
    min-width: 1000px;
    /* background-image: url("../assets/login2.jpg"); */
    background-size: 100% 100%;
    background-position: center center;
    overflow: auto;
    background-repeat: no-repeat;
    position: fixed;
    line-height: 100%;
    padding-top: 150px;
  }
  
  .logintext {
    margin-bottom: 20px;
    line-height: 50px;
    text-align: center;
    font-size: 30px;
    font-weight: bolder;
    color: white;
    text-shadow: 2px 2px 4px #000000;
  }
  
  .logindata {
    width: 400px;
    height: 300px;
    transform: translate(-50%);
    margin-left: 50%;
  }
  
  .tool {
    display: flex;
    justify-content: space-between;
    color: #606266;
  }
  
  .butt {
    margin-top: 10px;
    text-align: center;
  }
  
  .shou {
    cursor: pointer;
    color: #606266;
    font-size: 14px;
  }
  
  /*ui*/
  /* /deep/ .el-form-item__label {
    font-weight: bolder;
    font-size: 15px;
    text-align: left;
  }
  
  /deep/ .el-button {
    width: 100%;
    margin-bottom: 10px;
  
  } */
  </style>
  
  