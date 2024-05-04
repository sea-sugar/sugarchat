<template>
    <div class="loginbody">
      <div class="logindata">
        <div class="logintext">
          <h2>Register</h2>
        </div>
        <div class="formdata">
          <el-form ref="form" :model="form" :rules="rules" @keyup.enter.native="register('form')">
            <el-form-item prop="user_id">
              <el-input
                v-model="form.user_id"
                clearable
                placeholder="请输入账号"
              ></el-input>
            </el-form-item>
            <el-form-item prop="username">
              <el-input
                v-model="form.username"
                clearable
                placeholder="请输入昵称"
              ></el-input>
            </el-form-item>
            <el-form-item prop="email">
              <el-input
                v-model="form.email"
                clearable
                placeholder="请输入邮箱"
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
            <el-form-item prop="againassword">
              <el-input
                v-model="form.againpassword"
                clearable
                placeholder="请再一次输入密码"
                show-password
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="tool">
          <div>
            <span class="shou" @click="login" style="color: white;">使用已有账户登录</span>
          </div>
          <div>
            <span class="shou" @click="forgetpas" style="color: white;">忘记密码？</span>
          </div>
        </div>
        <div class="butt">
          <el-button type="primary" @click.native.prevent="register('form')" :loading="loading" 
            >注册</el-button
          >
        </div>
      </div>
      <footer class="footer">
        <a href="https://github.com/sea-sugar/sugarchat.git" target="_blank">sea sugar</a> &copy; 2024
      </footer>
    </div>
</template>
  
<script>
import  { Base64 } from 'js-base64'
import { register } from '@/apis/user';
export default {
    name: "login",
    data() {
      return {
        form: {
          password: "",
          againpassword: "",
          user_id: "",
          username:"",
          email:"",
        },
        loading:false,
        paramsRegister : {
            user_id:'',
            password:'',
            username:'',
            email:'',
        },
        rules: {
          password: [
            { required: true, message: "请输入密码", trigger: "blur" },
            { pattern: /^[a-zA-Z0-9_-]{4,16}$/, message: "密码需在4到16位(字母，数字，下划线，减号)", trigger: "blur" }
          ],
          user_id: [
            { required: true, message: "请输入账号", trigger: "blur" },
            { pattern: /^[a-zA-Z0-9]{3,10}$/, message: "用户名应是3到10位，只能包含字母和数字", trigger: "blur" }
          ],
          againpassword: [
            { required: true, message: "请再一次输入密码", trigger: "blur" },
            { pattern: /^[a-zA-Z0-9_-]{4,16}$/, message: "密码需在4到16位(字母，数字，下划线，减号)", trigger: "blur" }
          ],
          username: [
            { required: true, message: "请输入昵称", trigger: "blur" },
            { message: "用户名应是3到10位，只能包含字母和数字", trigger: "blur" }
          ],
          email: [
            { required: true, message: "请输入邮箱", trigger: "blur" },
            { pattern: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/ , message: "密码需是标准邮箱格式", trigger: "blur" }
          ],
        },
      };
    },
    mounted(){

    },
    methods: {
        register() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.loading = true;
                    if (this.form.password !== this.form.againpassword) {
                        this.$alert("<font color='red'>对不起，您的账号密码不一致，注册失败！</font>", '系统提示', {
                            dangerouslyUseHTMLString: true,
                            type: 'error'
                        })
                        return 
                    }
                    register(this.form).then(res => {
                        if (res.msg !== 'success') {
                            this.$alert("<font color='red'>对不起，您的账号已经被注册！</font>", '系统提示', {
                            dangerouslyUseHTMLString: true,
                            type: 'error'})
                            this.loading = false;   
                            return ;
                        }
                        const username = this.form.username;
                        this.$alert("<font color='greed'>恭喜你，您的账号 " + username + " 注册成功！</font>", '系统提示', {
                            dangerouslyUseHTMLString: true,
                            type: 'success'
                        }).then(() => {
                            this.$router.push("/login");
                        }).catch(() => {});
                    }).catch((err) => {
                        this.loading = false;   
                        console.log(err);
                    })
                }
            });
        },
        forgetpas() {
            this.$message({
            type:"info",
            message:"功能尚未开发",
            showClose:true
            })
        },
        login(){
            this.$router.push('/login');
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
    opacity: 0.8;
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
  .footer {
    position: fixed;
    bottom: 10px;
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
  </style>
  
  