<template>
  <div class="user">
    <div class="tab">
      <van-nav-bar
        title="我的"
        right-text="退出"
        @click-right="logoutHandler"
      />
    </div>
    <div class="header">
      <div class="user_photo">
        <img src="../../assets/images/home_23.png" alt="">
      </div>
      <div class="user_name">
        {{info.name}}
      </div>
    </div>
    <van-row>
      <van-col :span="8"  style="text-align:center;color:#4d5050">我的收入</van-col>
      <van-col :span="10" style="text-align:right;font-size:18px;color:red">￥：{{test}}</van-col>
      <van-col :span="4" style="text-align:right;font-size:18px;color:#4d5050">
        
        <van-icon name="arrow" />
      </van-col>
    </van-row>
  <van-divider />
    <van-row>
      <van-col :span="8" style="text-align:center;color:#4d5050">我的订单</van-col>
      <van-col :span="14" style="text-align:right;font-size:18px;color:#4d5050">
        <van-icon name="arrow" />
      </van-col>
    </van-row>
  <van-divider />
    <!-- {{info.avatar}}
    <p>
      <img src="info.avatar.photo" alt="">
    </p> -->
  </div>
</template>
<script>
import {mapState,mapActions,mapGetters} from 'vuex'
export default {
  data(){
    return {
      test:0
    }
  },
  created(){
    this.initData();
    // this.totest();
  },
  computed:{
    ...mapState("user",["info"]),
    ...mapState('order',['orders']),
    
    // ...mapGetters("order",["testFilter"])
  },
  methods:{
    ...mapActions('user',['logout']),
    ...mapActions('order',['findAllOrdersByWaiter']),
    logoutHandler(){
      this.logout()
      .then(()=>{
        this.$router.push({path:'/'})
      })
    },
    initData(){
      this.findAllOrdersByWaiter()
      .then((response)=>{
        response.data.forEach((item)=>{
          if(item.status === '已完成'){
            this.test += item.total;
          }
        })
      })
    }
    
  }
}
</script>
<style>
  .header {
    height: 140px;
    padding: 40px;
    background-color: #ffffff;
    text-align: center;
  }
  .user_photo > img {
    height: 120px;
    width: 120px;
    border: 1px solid #ededed;
    line-height: 80px;
    border-radius: 50%;
    margin: 0 auto;
  }
  .user_name {
    font-size: 24px;
    padding-top: 10px;
    color: black;
  }
</style>