<template>
  <div class="layout">
    <router-view></router-view>
    <!-- {{token}} -->
    <div>
      <van-tabbar v-model="active" @change="tabChangeHandler">
        <van-tabbar-item name="/manager/home" icon="star-o">首页</van-tabbar-item>
        <van-tabbar-item name="/manager/order" icon="records">订单</van-tabbar-item>
        <van-tabbar-item name="/manager/user" icon="user-o">我的</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>
<script>
import {mapState,mapActions} from 'vuex'
export default {
  data(){
    return {
      active:0
    }
  },
  created(){
    if(this.token){
      // 查询info
      this.getInfo(this.token);
      // console.log("token:",this.token);
    } else {
      this.$toast("token失效")
      // 跳转到登录
      this.$router.push({path:'/'})
    }
  },
  computed:{
    ...mapState('user',['token','info'])
  },
  methods:{
    ...mapActions('user',{
      'getInfo':'info'
    }),
    tabChangeHandler(path){
      // alert(path);
      this.$router.push({path})
    }
  }
}
</script>