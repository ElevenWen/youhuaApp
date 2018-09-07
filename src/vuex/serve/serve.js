import * as types from '../mutations_types';
import   getServer  from '../getData';
import axios from 'axios'
import { Indicator } from 'mint-ui';

const state = {
	abc:'111',
   dataValue: [],   //一级？
   dataList:[],     //二级？
   dataProduct:[],   //三级？
   dataProductHot:[],//二级分类热销榜
 };

const  getters ={
	dataProductHotFn(state){  //二级分类热销榜
		return state.dataProductHot
	}
};

const mutations = {
	// 一级菜单
	[types.SERVERLIST](state, data) {
		state.dataValue = data;
		// console.log("state.dataValue",state.dataValue)
	  	//数据返回取消mask
	  
	  	Indicator.close();
	},
	//二级菜单
	[types.SERVER_PRODUCT_LIST](state,data) {
		state.dataList = data;
		Indicator.close();
	},
	// 三级菜单
	[types.SERVER_PRODUCT_INFOR](state,data) {
		state.dataProduct = data;
		Indicator.close();
	},
	//产品热销榜
	[types.SERVER_PRODUCT_HOT](state,data){
		state.dataProductHot = data.plist.slice(0,12);
		Indicator.close();
	}
}

const actions = {
	server_data_list({ state, commit, rootState }) {
		// 服务  商品分类列表获取数据
		return getServer.SERVERLIST().then((res)=>{
			// //console.log("初始化数据",res);
       return commit(types.SERVERLIST, res.data);

        // //console.log("======",res.data)
    }).catch(function(error) {
       //console.log(error);
     });
	},
	server_product_list({ state, commit, rootState },data) {
		// 服务  商品服务列表获取数据
	return	getServer.SERVER_PRODUCT_LIST(data).then((res)=>{
			//console.log(">>>",res);
       return commit(types.SERVER_PRODUCT_LIST, res.data);
    }).catch(function(error) {
    	 
       //console.log("error",error);
     });
	},
	server_product_infor({ state, commit, rootState },data) {
		//根据分类获取产品列表请求数据
		return getServer.SERVER_PRODUCT_INFOR(data).then((res)=>{
			// //console.log("热销列表数据",res);
        	return  commit(types.SERVER_PRODUCT_INFOR, res.data);
    }).catch(function(error) {
    	 
       //console.log("error",error);
     });
	},
	server_product_hot({state,commit},data){
		//根据二级分类获取产品热销榜
		return getServer.SERVER_PRODUCT_HOT(data).then((res)=>{
        	return  commit(types.SERVER_PRODUCT_HOT, res.data);
   		}).catch(function(error) {
       		console.log("error",error);
     	});
	}
	
}



export default {
	namespaced:true,
	state,
	getters,
	mutations,
	actions
}