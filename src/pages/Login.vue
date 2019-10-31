<template>
  <div class="login">
    <div class="header">
      <div class="logo">JZ</div>
      <div class="title">
        家政服务平台-员工端
      </div>
    </div>
    <div class="form">
      <!-- {{form}} -->
      <van-cell-group>
        <van-field
          v-model="form.username"
          required
          clearable
          label="用户名"
          right-icon="question-o"
          placeholder="请输入用户名"
          @click-right-icon="$toast('question')"
        />

        <van-field
          v-model="form.password"
          type="password"
          label="密码"
          placeholder="请输入密码"
          required
        />
        <van-field>
          <van-button slot="button" size="small" type="info" @click="loginHandler" plain>登录</van-button>
        </van-field>
      </van-cell-group>
    </div>
  </div>
</template>
<script>
import {mapActions} from 'vuex'
  export default {
    data(){
      return {
        form:{
          type:'waiter'
        }
      }
    },
    methods:{
      ...mapActions("user",["login"]),
      loginHandler(){
        this.login(this.form)
        .then(()=>{
          //跳转到首页
          this.$router.push({path:'/manager/home'})
        })
      }
    }
  }
</script> 
<style >
  .header {
    height: 140px;
    padding: 40px;
    color: #ffffff;
    background-color: aquamarine;
    text-align: center;
  }
  .header .logo {
    width: 50px;
    height: 50px;
    line-height: 50px;
    border-radius: 50%;
    border: 1px solid #efefef;
    margin: 0 auto;
  }
  .header .title {
    font-size: 24px;
    padding-top: 10px;
  }
</style>