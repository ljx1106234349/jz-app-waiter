<template>
  <div class="home">
      <img style="width:100%;margin:0 auto" src="../../assets/images/home_02.png" alt="">
      <van-loading v-show="visible" type="spinner" color="#1989fa" size="30px" style="padding:240px 0;text-align:center;">加载中...</van-loading>
  <!-- 待接单 -->
      <van-panel :title="item.customer.realname" :status="item.status" v-for="item in orderStatusFilter('待接单')" :key="item.b" >
        <div style="font-size:14px;color:#5a5e5e;">
          <van-row>
            <van-col :span="3" style="text-align:center;font-size:16px;"><van-icon name="gem-o" /></van-col>
            <van-col :span="20">总额： <span style="color:red">{{item.total}}</span></van-col>
          </van-row>
          <van-row>
            <van-col :span="3" style="text-align:center;font-size:16px;"><van-icon name="clock-o" /></van-col>
            <van-col :span="20">下单时间：{{item.time}}</van-col>
          </van-row>
          <van-row>
            <van-col :span="3" style="text-align:center;font-size:16px;"><van-icon name="records" /></van-col>
            <van-col :span="20">服务内容：{{item.remark}}</van-col>
          </van-row>
          <van-row>
            <van-col :span="3" style="text-align:center;font-size:16px;"><van-icon name="location-o" /></van-col>
            <van-col :span="20">地址： {{item.address.province+" "+item.address.city+" "+item.address.area}}</van-col>
          </van-row>
          <div slot="footer" v-show="item.status == '待接单'" style="text-align:right; margin-right:16px;">
            <van-button size="small" type="warning" plain @click="rejectHandler(item.id)">拒绝</van-button>&nbsp;
            <van-button size="small" type="primary" plain @click="acceptHandler(item.id)">接受</van-button> 
          </div>
        </div>
        
      </van-panel>

  <!-- 已接订单 -->
      <van-panel :title="item.customer.realname" :status="item.status" v-for="item in orderStatusFilter('待服务')" :key="item.b" >
        <div style="font-size:14px;color:#5a5e5e;">
          <van-row>
            <van-col :span="3" style="text-align:center;font-size:16px;"><van-icon name="gem-o" /></van-col>
            <van-col :span="20">总额： <span style="color:red">{{item.total}}</span></van-col>
          </van-row>
          <van-row>
            <van-col :span="3" style="text-align:center;font-size:16px;"><van-icon name="clock-o" /></van-col>
            <van-col :span="20">下单时间：{{item.time}}</van-col>
          </van-row>
          <van-row>
            <van-col :span="3" style="text-align:center;font-size:16px;"><van-icon name="records" /></van-col>
            <van-col :span="20">服务内容：{{item.remark}}</van-col>
          </van-row>
          <van-row>
            <van-col :span="3" style="text-align:center;font-size:16px;"><van-icon name="location-o" /></van-col>
            <van-col :span="20">地址： {{item.address.province+" "+item.address.city+" "+item.address.area}}</van-col>
          </van-row>
          <div slot="footer" v-show="item.status == '待服务'" style="text-align:right;margin-right:16px;">
            <van-button size="small" type="warning" plain @click="confirmHandler(item.id)">完成</van-button>&nbsp; 
          </div>
        </div>
          
      </van-panel>
      <!-- {{info}} -->
      <div class="button"></div>
  </div>
</template>
<script>
import {mapState,mapActions,mapGetters} from 'vuex'
export default {
  data(){
    return {
      visible:true
    }
  },
  created(){
    setTimeout(()=>{
      this.findAllOrdersByWaiter();
      this.visible = false;
    },500)
  },
  computed:{
    ...mapState("order",["orders"]),
    // ...mapState("user",["info"]),
    ...mapGetters("order",["orderStatusFilter"])
  },
  methods:{
    ...mapActions("order",["findAllOrdersByWaiter","rejectOrder","acceptOrder","confirmOrder"]),
    //拒绝接单
    rejectHandler(orderId){
      // console.log("拒绝的订单",orderId)
      this.rejectOrder(orderId)
      .then((response)=>{
        this.$toast(response.statusText);
      })
    },
    //接受订单
    acceptHandler(orderId){
      // console.log("接受的订单",orderId)
      this.acceptOrder(orderId)
      .then((response)=>{
        this.$toast(response.statusText);
      })
    },
    //完成订单
    confirmHandler(orderId){
      // console.log("接受的订单",orderId)
      this.confirmOrder(orderId)
      .then((response)=>{
        this.$toast(response.statusText);
      })
    }
  }
}
</script>
<style >
  .button {
    margin-bottom: 50px;
  }
</style>