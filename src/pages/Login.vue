<template>
  <div class="login">
    <div class="header">
      <div class="logo">Wine</div>
      <div class="title">葡萄酒在线商城-员工端</div>
    </div>
    <div class="form" style="background-image: linear-gradient(to right, #4bb0ff, #6149f6);">
      <!-- {{form}} -->
      <div class="login">
        <br />
        <van-cell-group>
          <van-field
            v-model="form.username"
            required
            clearable
            label="用户名"
            right-icon="question-o"
            placeholder="请输入用户名"
          />

          <van-field
            v-model="form.password"
            type="password"
            label="密码"
            placeholder="请输入密码"
            required
          />
        </van-cell-group>
        <div style="margin-top:15px;text-align:center">
          <van-button
            size="large"
            type="default"
            color="linear-gradient(to right, #4bb0ff, #6149f6)"
            @click="loginHandler"
          >登录</van-button>
        </div>
      </div>
    </div>
      <div class="foot">
        <span class="register">没有账号?</span>
        <van-button size="mini" type="default" @click="AddUserHandler">
          <div style="color:grey">注册账号</div>
        </van-button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      form: {
        type: 'waiter'
      }
    }
  },
  methods: {
    ...mapActions('user', ['login']),
    loginHandler() {
      this.login(this.form).then(() => {
        //跳转到首页
        this.$router.push({ path: '/manager/home' })
      })
    },
    AddUserHandler() {
      this.$router.push({ path: '/adduser' })
    }
  }
}
</script> 
<style >
.header {
  height: 140px;
  padding: 40px;
  color: #ffffff;
  /* background-color: aquamarine; */
  background-image: url('../assets/images/banner01.jpg');
  text-align: center;
}
.header .logo {
  width: 50px;
  height: 50px;
  line-height: 50px;
  border-radius: 50%;
  border: 1px solid #efefef;
  margin: 0 auto;
  color: #efefef;
  font-weight: bold;
  margin-bottom: 1em;
}
.header .title {
  font-size: 24px;
  padding-top: 10px;
}
.form {
  margin-left: 38px;
  margin-right: 38px;
}
.form > .login {
  background: #fff;
  padding: 25px;
}
.foot {
  text-align: center;
  margin-top: 120px;
}
.register {
  color: cornflowerblue;
  font-size: 10px;
}
</style>