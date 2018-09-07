import Vue from 'vue'
import Vuex from 'vuex'
 
import cart from './cart/cart' 
import comfirmOrder from './cart/comfirm-order'
import discover from './discover/discover'
import home from './home/home'
import mine from './mine/mine'
import mine_index from './mine/mine_index'

import serve from './serve/serve'
import myorder from './myorder/myorder'
import businessQuery from './businessQuery/businessQuery'
import message from './message/message'


 

import axios from 'axios'
Vue.use(Vuex)
 

const state = {
	 ab:1111
}

const mutations = {
	ab(){

	}
}

const actions = {
	 a1b(){
		
	}
}

const getters = {
	 ab2(){
		
	}
}
export default  new Vuex.Store({  
    state,
	mutations,
	actions,
	getters,
	modules:{
		cart,
		comfirmOrder,
		discover,
		home,
		mine,
		mine_index,
		serve,
		myorder,
		businessQuery,
		message,
	}
})