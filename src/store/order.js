import {get} from '../http/axios'
import moment from 'moment'

export default {
  namespaced:true,
  state:{
    orders:[]
  },
  getters:{
    orderStatusFilter(state){
      return (status)=>{
        return state.orders.filter(item=>item.status === status)
      }
    }
  },
  mutations:{
    refreshOrders(state, orders){
      state.orders = orders;
      // console.log(orders);
    }
  },
  actions:{
    // 根据指定员工下的订单信息
    async findAllOrdersByWaiter({commit,rootState}){
      let response = await get("/order/query",{waiterId:rootState.user.info.id})
        response.data.forEach((item,index)=>{
          // 时间转换
          response.data[index].time = moment(item.orderTime).format('YYYY-MM-DD HH:mm:ss')
          // console.log(item.time);
      })
      // console.log(response.data);
      commit("refreshOrders",response.data);
    },
    // 接受订单
    async acceptOrder({dispatch},orderId){
      let response = await get("/order/takeOrder",{orderId})
      //刷新
      dispatch("findAllOrdersByWaiter");
      return response;
    },
    // 拒绝订单
    async rejectOrder({dispatch},orderId){
      // console.log(orderId);
      let response = await get("/order/rejectOrder",{orderId});
      // 刷新
      dispatch("findAllOrdersByWaiter");
      return response;
    },
    // 完成订单
    async confirmOrder({dispatch},orderId){
      let response = await get("/order/serviceCompleteOrder",{orderId});
      // 刷新
      dispatch("findAllOrdersByWaiter");
      return response;
    }
    
  }
}