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
        enabled:false,
        status:'待审核',
        idCard: '1524781467415874',
        bankCard: '10401425145214',
        idcardPhotoPositive: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572534120097&di=d3067ad83807932522ce5395907e8249&imgtype=0&src=http%3A%2F%2Ff.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2Ff2deb48f8c5494ee25dd85502df5e0fe98257ef8.jpg',
        idcardPhotoNegative: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3132756538,1607808707&fm=15&gp=0.jpg',
        bankCardPhoto: 'http://img.sccnn.com/bimg/336/675.jpg',
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