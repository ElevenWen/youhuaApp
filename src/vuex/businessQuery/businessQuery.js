import * as types from '../mutations_types';
import   getbusinessQuery  from '../getData';
import axios from 'axios'
import { Indicator,MessageBox } from 'mint-ui';

const state = {
	companyList : [],
}

const  getters = {

}

const mutations = {
	[types.queryCompany](state, data) {
		if(!data){
			return
		}    	
	  state.companyList = data.items;
	  //数据返回取消mask
	  //console.log("data数据",state.companyList)
	  Indicator.close();
	},
}

const actions = {
	QUERYCOMPANY({ state, commit, rootState },data) {
    // 查公司搜索结果页请求数据
    //console.log(data,"<<<<<<<1111");
	    getbusinessQuery.queryCompany(data.method,data.params).then((res)=>{
	        commit(types.queryCompany, res.result);
	        //console.log("查公司",res.reason)
	        if(res.reason == "无数据"){
	        	return
	        }
	    }).catch(function(error) {
	       //console.log(error);
	     })
	}
}


export default {
	namespaced:true,
	state,
	getters,
	mutations,
	actions
}