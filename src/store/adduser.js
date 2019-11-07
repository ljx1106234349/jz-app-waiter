import {post} from '../http/axios'
export default {
  namespaced:true,
  state: {
    // waiter:{}
  },
  getters:{
    
  },
  mutations: {
    // refreshWaiters(state,waiter){
    //   state.waiter = waiter;
    // }
  },
  actions: {
    // 添加员工信息
    async saveWaiter({commit},form){
      console.log("====",form);
      let response = await post('/waiter/saveOrUpdate',form)
      return response;
      
    }
  }
}