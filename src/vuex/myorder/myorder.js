import * as types from '../mutations_types';
import   getMyorder  from '../getData';
import axios from 'axios'
import { Indicator,MessageBox } from 'mint-ui';

const state = {
   dataValue: [],
   productDetail:[],
   payData:{},
   telphone:{},
   buyagain:[],
   isBuy:'',  //判断商品是否可买

   todos: [
      { id: 1, text: '我是测试数据1', done: true },
      { id: 2, text: '我是测试数据2', done: false }
    ]
 };
const  getters ={
    // doneTodos: state => {
    //   //console.log("texttext");
    //   return state.todos.filter(todo => todo.text);
    //   // return this.$store.state.myorder.dataValue.list;
    // },
    // doneTodosCount: (state, getters) => {
    //   //console.log("长度",getters.doneTodos.length);
    //   return getters.doneTodos.length;
    // },
    // arr: (state) => {
    //   //console.log("getters",state.dataValue.list);
    //   if(!state.dataValue.list){
    //     return [];
    //   }
    //   return state.dataValue.list;
    // }
};


const mutations = {
  //订单校验
  [types.CHECK_ORDER](state,data){
    state.isBuy = data;
  },
	[types.REQUEST_DATA_MYORDER](state, data) { 
    // 订单列表——订单列表请求数据
	  state.dataValue = data;
	  //数据返回取消mask
	  // //console.log("data截取数据",data)
	  
	  Indicator.close();
	},
	[types.REQUEST_DATA_CANCEL](state, data) {
    // 订单列表——取消订单请求数据
	//  //console.log("REQUEST_DATA_CANCELREQUEST_DATA_CANCEL",data);  
   state.dataValue = data;
  //  //console.log(data,'取消订单报错' )
	 //state.dataValue = data;
	 Indicator.close();

	},
	[types.REQUEST_DATA_DETAIL](state, data) {
    // 订单商品详情请求数据
	//  //console.log("REQUEST_DATA_DETAIL",data)
	 state.productDetail = data;
	 Indicator.close();

	},
	[types.REQUEST_DATA_DELETE](state, dataV) {
    // 订单删除商品请求数据 
   //删除匹配对象 
   state.dataValue.list.forEach((items,index)=>{
      if(items.Id == dataV.Id){
          state.dataValue.list.splice(index,1)
      }
   });
   Indicator.close();
	},
	// [types.REQUEST_DATA_NEWORDER](state, data) {
	//  // //console.log("REQUEST_DATA_NEWORDER")
	//  //state.cartInfos = data;
 //   Indicator.close();
	// },
  [types.REQUEST_DATA_PAY](state, data) {
  //  //console.log("REQUEST_DATA_NEWORDER",data)
   state.payData = data;
   // //console.log( "state.payDatastate.payDatastate.payDatastate.payData",state.payData    );
   Indicator.close();
  },
  [types.REQUEST_DATA_EVALUATE](state, data) {
  //  //console.log("REQUEST_DATA_EVALUATE",data)
   // state.payData = data;
   Indicator.close();
  },
  [types.REQUEST_DATA_TELPHONE](state, data) {
   // //console.log("REQUEST_DATA_TELPHONE",data)
  //  //console.log("Vuex3")
   state.telphone = data;
   Indicator.close();
  },
  [types.REQUEST_DATA_BUYAGAIN](state, data) {
  //  //console.log("REQUEST_DATA_BUYAGAIN",data)
   state.buyagain = data;
   Indicator.close();
  },

	xxxxx() {
	//  //console.log("xx")
	}
}



const actions = {
  //订单校验
  checkOrder({state,commit},params){
    return getMyorder.get_checkOrder(params).then(res=>{
      return commit(types.CHECK_ORDER,res)
    })
  },
   request_data_myorder({ state, commit, rootState },data) {
    // 订单列表请求数据
    return getMyorder.REQUEST_DATA_MYORDER(data).then((res)=>{

      return commit(types.REQUEST_DATA_MYORDER, res.data);

        // //console.log("我的",res.data)
    }).catch(function(error) {
       //console.log(error);
     });

   
   },
   request_data_cancelOrder: ({ state, commit, rootState },data) => {
   	// 订单列表——取消订单请求数据
    getMyorder.REQUEST_DATA_CANCEL(data).then((res)=>{
    	// debugger
        commit(types.REQUEST_DATA_CANCEL, res.data);

        // //console.log("bbb",res.data)
    }).catch(function(error) {
    	// debugger;
       //console.log(error);
     });

   },
   request_data_orderDetail: ({ state, commit, rootState }, data) => {
   		// 订单商品详情请求数据

	   return getMyorder.REQUEST_DATA_DETAIL(data).then((res)=>{
        // //console.log("bbbbbb",res.data)
	      return  commit(types.REQUEST_DATA_DETAIL, res.data);

	    }).catch(function(error) {
	    	// debugger;
	       //console.log(error);
	     });

   },
   request_data_orderDelete: ({ state, commit, rootState }, dataV) => {
    // 传给后台的参数进行处理
    // let data = [];
    // if (!(dataV instanceof Array)) {
    //   data.push(dataV)
    // } else {
    //   data = dataV;
    // };
    // var params = {
    //   customerId: "",
    //   ids: [],
    // };
    // data.forEach((items, index) => {
    //   params.ids.push(items.Id);
    //   if (index == data.length - 1) {
    //     params.customerId = items.CustomerId;
    //   }
    // });
    // let _customerId = params.customerId;
    // let _ids = params.ids.join("|");
    // var dataObj = {
    //     "params" : {
    //       customerId: _customerId,
    //       ids: _ids,
    //     } 
    // } 

     // 订单删除商品请求数据
      return getMyorder.REQUEST_DATA_DELETE(dataV.data).then((res)=>{
        //注意value是来自页面的值非后台获取
      return    commit(types.REQUEST_DATA_DELETE, dataV.value);
          // //console.log("bbb",res.data)
      }).catch(function(error) {
        // debugger;
         //console.log("删除订单有问题",error);
       });
    
   },
   // request_data_newOrder:({ state, commit, rootState }, data) => {
   //  // 订单新增订单到确认订单页面
   //    getMyorder.REQUEST_DATA_NEWORDER(data).then((res)=>{

   //      commit(types.REQUEST_DATA_NEWORDER, res.data);

   //    }).catch(function(error){

   //      //console.log(error);
   //    });
   // },
   request_data_pay:({ state, commit, rootState }, data) => {
    return   getMyorder.REQUEST_DATA_PAY(data).then((res)=>{
        // //console.log("0909",res);
      return  commit(types.REQUEST_DATA_PAY, res.data);

      }).catch(function(error){
           // //console.log("vuex2。，va报错");
        //console.log(error);
      });
   },
   request_data_bugagain:({ state, commit, rootState }, data) => {
    return getMyorder.REQUEST_DATA_BUYAGAIN(data).then((res)=>{
        //console.log("新的再次购买接口",res);
        if(res.data === null) {
            // alert("该产品已经下架");
//          MessageBox.alert('该产品已下架,请选择其他商品');
			MessageBox.alert(res.msg);
        }else{
        	
        }
//      else if(res.msg == "已经购买过类似服务"  || res.msg == "如果需要购买此服务,请更换账号"){
//      	MessageBox.alert(res.msg);
//      }else{
//      	
//      }
      return  commit(types.REQUEST_DATA_BUYAGAIN, res.data);

      }).catch(function(error){
//    	console.log(error);
      	MessageBox.alert(error.data.msg);
      	return  commit(types.REQUEST_DATA_BUYAGAIN, error.data.data);
      });
   },
   request_data_evaluate:({ state, commit, rootState }, data) => {
    return getMyorder.REQUEST_DATA_EVALUATE(data).then((res)=>{
        // //console.log("评论",res);
      return  commit(types.REQUEST_DATA_EVALUATE, res.data);

      }).catch(function(error){

        //console.log(error);
      });
   },
   request_data_telphone:({ state, commit, rootState }, data) => {
   return   getMyorder.REQUEST_DATA_TELPHONE(data).then((res)=>{
        // //console.log("电话",res);
      return  commit(types.REQUEST_DATA_TELPHONE, res.data);

      }).catch(function(error){

        //console.log(error);
      });
   }

 }

export default {
	state,
	getters,
	mutations,
	actions
}