import Vue from 'vue'
import * as types from '../mutations_types.js'
import Vuex from 'vuex'
Vue.use(Vuex);
//声明state
const state = {
	token:null,
	isExpired:false,
	isFirst:false,
    count:0,
    id:'',//记录订单id
}

//声明Mutations
const mutations = {
	[types.LOGIN](state, data){
        state.token = data;
    },
    [types.LOGOUT](state){
        state.token = null//退出
    },
    [types.JUDGE](state, data){
        state.isExpired = data;
    },
    [types.FIRST](state, data){
        state.isFirst = data;
    },
    [types.COUNT](state, data){
        state.count = data;
    },
    [types.ID](state, data){
        state.id = data;
    },
}

//声明Actions
const actions = {
	reviseId({ state, commit, rootState },data){
		commit(types.ID, data);
	}
}
var store = new Vuex.Store({
	'state':state,
	'mutations':mutations,
	'actions':actions
})


export default store;
