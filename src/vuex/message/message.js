import * as types from '../mutations_types';
import getMessage from '../getData';
import axios from 'axios'
import { Indicator, MessageBox } from 'mint-ui';

const state = {
	systemMsgData: [],
	serverMsgData: [],
	activeMsgData: [],
	systemMsgLeng: 0
}


const getters = {

}

const mutations = {
	[types.systemMsg](state, data) {
		// 系统消息请求数据
		state.systemMsgData = data;
		// 获取未读的信息数据
		let systemLength = data.filter(item => {
			return !item.IsRead;
		});
		window.sessionStorage.setItem('_systemLength_', systemLength.length);
		state.systemMsgLeng = systemLength.length;
		Indicator.close();
	},
	[types.serverMsg](state, data) {
		// 服务消息请求数据
		state.serverMsgData = data;
		//数据返回取消mask

		Indicator.close();
	},
	[types.activeMsg](state, data) {
		// 活动消息请求数据
		state.activeMsgData = data;
		//数据返回取消mask

		Indicator.close();
	},
//	[types.setSysten](state, len) {
//		state.systemMsgLeng = len;
//	},
	
	// 系统消息数量
	setSysten(state, len) {
		console.log(this,'???')
		state.systemMsgLeng = len;
	},
}


const actions = {
	system_msg({ state, commit, rootState }, data) {
		// 系统消息请求数据
		getMessage.SYSTEM_MSG().then((res) => {
			commit(types.systemMsg, res.data);
		}).catch(function (error) {
		});
	},
	server_msg({ state, commit, rootState }, data) {
		// 服务消息请求数据
		getMessage.SERVER_MSG().then((res) => {
			commit(types.serverMsg, res.data);
		}).catch(function (error) {
		});
	},
	active_msg({ state, commit, rootState }, data) {
		// 活动消息请求数据
		getMessage.ACTIVE_MSG().then((res) => {
			commit(types.activeMsg, res.data);
		}).catch(function (error) {
		});
	},

}

export default {
	namespaced: true,//命令空间
	state,
	getters,
	mutations,
	actions
}