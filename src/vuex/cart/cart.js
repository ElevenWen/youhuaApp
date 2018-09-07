 import * as types from '../mutations_types';
 import   getData  from '../getData';
 import axios from 'axios'
 import { Indicator } from 'mint-ui';



 const state = {
   list:"1",
   cartInfos: [],
   throttle:true,//节流
 };

 const mutations = {
   [types.REQUEST_DATA_CART](state, data) {  
     state.cartInfos = data;
      //数据返回取消mask 
      // //console.log("我来自vuex的购物车",data);

      state.throttle = true;
   },
   [types.ADD_DB_CART](state, data) {  
      state.cartInfos = data;  
   },
   [types.DES_DB_CART](state, data) {  
      state.cartInfos = data;
   },
   [types.UPDATE_CUR_SHOP_STATUS_CART](state, data) {     
   },
   [types.DELETE_DB_CART](state, data) { 
      state.cartInfos = data;   
      state.throttle = true; 
   } 
 }


 const actions = {
   request_data_cart({ dispatch,state, commit, rootState }) {
    // 请求数据 
   return  getData.REQUEST_DATA_CART( ).then((res)=>{ 
        let _ids = [];
        let tempRes = [];
        res.data.list.forEach((res,index)=>{
           if(res.ProductStatus == 1){//表示产品下架
              res.IsChecked = false
              tempRes.push(res);
           }
        })
        if(tempRes.length == 0){
           return   commit(types.REQUEST_DATA_CART, res.data); 
        }
         
        // 若产品已经下架 , 同步保证文件IsCheck 为false 传入参数为需要同步改为IsCheck:false 的id
       return  dispatch('updata_cur_shop_status_cart',tempRes).then(res=>{  
          return  getData.REQUEST_DATA_CART( ).then((res)=>{  
             return   commit(types.REQUEST_DATA_CART, res.data); 
           })
        })
    }).catch(function(error) {
       //console.log("error",error);
     });

   
   },
   add_db_cart: ({ state, commit, rootState }, data) => {
      //console.log(data);
      //console.log("22222222222")
      var dataObj = {
          "params": { 
            id: data.Id,
            type: "plus"
          }
      } 
      
         ////console.log("vue1")
      return getData.ADD_DB_CART(dataObj).then((res)=>{
        // //console.log("vue2")
         return  commit(types.ADD_DB_CART, res.data);
       }).catch(function(error) {
           ////console.log(error);
       });
    
   },
   des_db_cart: ({ state, commit, rootState }, data) => {
 
      var dataObj = {
          "params": { 
            id: data.Id,
            type: "reduce"
          }
      } 
       
      return getData.DES_DB_CART(dataObj).then((res)=>{
           return commit(types.DES_DB_CART, res.data);
       }).catch(function(error) {
           ////console.log(error);
       }); 
   
   },
   updata_cur_shop_status_cart: ({ state, commit, rootState }, dataV) => {

     let data = [];
     if (!(dataV instanceof Array)) {
       data.push(dataV)
     } else {
       data = dataV;
     };
     var params = {
       ids: [],
       IsChecked: ""
     };
     //console.log(data);
     data.forEach((items, index) => {
       params.ids.push(items.Id);
       params.IsChecked = items.IsChecked;
     });
     let _customerId = params.customerId;
     let _ids = params.ids.join("|");
     let _IsChecked = params.IsChecked;
 
     var dataObj = {
         "params" : {
           ids: _ids,
           IsChecked: _IsChecked
         } 
     } 
     //console.log(dataObj,'?????')
     getData.UPDATE_CUR_SHOP_STATUS_CART(dataObj).then((res)=>{ 
         commit(types.UPDATE_CUR_SHOP_STATUS_CART, res.data);
     }).catch(function(error) {
        // //console.log(error);
     }); 
 
   },
   delete_db_cart({ state, commit, rootState }, dataV) { 
     let data = [];
     if (!(dataV instanceof Array)) {
       data.push(dataV)
     } else {
       data = dataV;
     } 
     var params = {
       customerId: "",
       ids: []
     }; 
      data.forEach((items, index) => {
       params.ids.push(items.Id);
      // //console.log( "items.Id" ,items )
       if (index == data.length - 1) {
         params.customerId = items.CustomerId;
       }
     });
      let _customerId = params.customerId;
      let _ids = params.ids.join("|");

      let dataObj = {
          params : {
          // customerId: _customerId,
           ids: _ids
          }
      };
      // debugger
      getData.DELETE_DB_CART(dataObj).then((res)=>{
         commit(types.DELETE_DB_CART, res.data);
      }).catch(function(error) {
         // //console.log(error);
      });
   },


 }

 const getters = {
    ceshi(){
    //  //console.log("state.cartInfos",state.cartInfos)
      return   state.cartInfos==undefined ?"没数据了":state.cartInfos
       
    }
 }



 export default {
   // namespaced:true,
   state,
   getters,
   mutations,
   actions
 }
