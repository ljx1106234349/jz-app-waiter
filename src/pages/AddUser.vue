<template>
  <div class="adduser">
    <van-nav-bar
        title="注册账号"
        left-text="返回"
        left-arrow
        @click-left="logoutHandler"
      />
    <van-cell-group>
      <van-field
        v-model="form.username"
        required
        clearable
        label="用户名"
        right-icon="question-o"
        placeholder="请输入用户名"
        @click-right-icon="$toast('请输入字母或数字')"
      />
      <van-field
        v-model="form.realname"
        required
        clearable
        label="姓名"
        right-icon="question-o"
        placeholder="请输入姓名"
        @click-right-icon="$toast('请输入真实姓名')"
      />

      <van-field
        v-model="form.password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
      />
      <van-field
        required
        v-model="form.telephone"
        label="手机号"
        placeholder="请输入手机号"
      />

      <van-field
        v-model="form.qq"
        center
        clearable
        label="短信验证码"
        placeholder="请输入短信验证码"
      >
        <van-button slot="button" size="small" type="primary">发送验证码</van-button>
      </van-field>
      <van-field>
        <van-button slot="button" size="small" type="info" @click="AddUserHandler" plain>注册</van-button>
      </van-field>
    </van-cell-group>
    <!-- {{form}} -->
  </div>
</template>
<script>
import {mapActions} from 'vuex'
export default {
  data(){
    return {
      form:{
        enabled:false
      }
    }
  },
  methods:{
    ...mapActions('adduser',['saveWaiter']),
    logoutHandler(){
      this.$router.push({path:'/'})
    },
    AddUserHandler(form){
      console.log(this.form);
      this.saveWaiter(this.form)
      .then((response)=>{
        this.$notify({ 
          type: 'success', 
          message: response.statusText 
        });
        this.$router.push({path:'/'})
      })
    }
  }
}
</script>
<style scoped>

</style>