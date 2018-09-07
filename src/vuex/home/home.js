import Vue from 'vue'
import * as types from '../mutations_types.js'
import Vuex from 'vuex'
Vue.use(Vuex);
//声明state
const state = {
	cacheData:[],
	loadData:[],
	isShowCase:false,//是否显示弹出框
	verMes:{},//版本号信息
}

const getters = {
	isShowCase(state){
		return state.isShowCase;
	},
	verMes(state){
		return state.verMes;
	}
}

//声明Mutations
const mutations = {
	[types.STORAGE](state, data){
        state.cacheData = data;
    },
    [types.LOAD](state, data){
        state.loadData = data;
    },
    [types.SHOWCASE](state, data){
        state.isShowCase = data;
    },
    [types.VERMES](state, data){
        state.verMes = data;
    },
}

//声明Actions
const actions = {
	reviseShowCase({state, commit, rootState},data){
		commit(types.SHOWCASE, data);
	},
	reviseVerMes({state, commit, rootState},data){
		commit(types.VERMES, data);
	},
}



 export default {
// namespaced:true,
   state,
   getters,
   mutations,
   actions
 }

