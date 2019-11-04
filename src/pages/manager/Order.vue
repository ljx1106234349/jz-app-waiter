<template>
  <div class="order">
    <div class="nav">订单</div>
    <div>
      <van-tabs v-model="activeName" :swipe-threshold="5" sticky>

        <!-- 所有订单 -->
        <van-tab title="所有订单" name="所有订单"  type="card" >
          <van-panel :title="item.customer.realname" :status="item.status" v-for="item in orders" :key="item.a">
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
              <div v-show="item.status == '待接单'" style="text-align:right;margin-right:16px;">
                <van-button size="small" type="warning" plain @click="rejectHandler(item.id)">拒绝</van-button>&nbsp;
                <van-button size="small" type="primary" plain @click="acceptHandler(item.id)">接受</van-button> 
              </div>
              <div v-show="item.status == '待服务'" style="text-align:right;margin-right:16px;">
                <van-button size="small" type="warning" plain @click="confirmHandler(item.id)">完成</van-button>&nbsp; 
              </div>
            </div>
          </van-panel>
        </van-tab>
        <!-- /所有订单 -->
        <!-- 未接订单 -->
        <van-tab title="待接订单" name="待接单">
          <van-panel :title="item.customer.realname" :status="item.status" v-for="item in orderStatusFilter('待接单')" :key="item.b">
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
              <div v-show="item.status == '待接单'" style="text-align:right;margin-right:16px;">
                <van-button size="small" type="warning" plain @click="rejectHandler(item.id)">拒绝</van-button>&nbsp;
                <van-button size="small" type="primary" plain @click="acceptHandler(item.id)">接受</van-button> 
              </div>
            </div>
          </van-panel>
        </van-tab>
        <!-- /未接订单 -->
        <!-- 已接订单 -->
        <van-tab title="已接订单" name="待服务">
          <van-panel :title="item.customer.realname" :status="item.status" v-for="item in orderStatusFilter('待服务')" :key="item.c">
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
              <div v-show="item.status == '待服务'" style="text-align:right;margin-right:16px;">
                <van-button size="small" type="warning" plain @click="confirmHandler(item.id)">完成</van-button>&nbsp; 
              </div>
            </div>
          </van-panel>
        </van-tab>
        <!-- /已接订单 -->
        <!-- 待确认 -->
        <van-tab title="待确认" name="待确认">
          <van-panel :title="item.customer.realname" :status="item.status" v-for="item in orderStatusFilter('待确认')" :key="item.d">
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
            </div>
          </van-panel>
        </van-tab>
        <!-- /待确认 -->
        <!-- 完成订单 -->
        <van-tab title="完成订单" name="已完成">
          <van-panel :title="item.customer.realname" :status="item.status" v-for="item in orderStatusFilter('已完成')" :key="item.e">
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
            </div>
            <div>
              <!-- {{}} -->
            </div>
          </van-panel>
          <!-- /完成订单 -->
        </van-tab>
      </van-tabs>
    </div>
    <!-- {{orders}} -->
    <div class="button"></div>
    <div class="order_content">
      <!-- {{info.id}} -->
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import {mapState,mapActions,mapGetters} from 'vuex'
export default {
  data(){
    return {
      activeName: 'a',
      
    }
  },
  created(){
    this.findAllOrdersByWaiter();
  },
  computed:{
    ...mapState("order",["orders","info"]),
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
    },
    findAlltotal(){
      
    }
  }
}
</script>
<style>
  .nav{
    font-size: 16px;
    text-align: center;
    padding: 12px 0;
  }
  .button {
    margin-bottom: 50px;
  }
  
</style>