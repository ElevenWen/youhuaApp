 

 

const state = {
	 cart1:1
}

const mutations = {
	DIS(){
		//console.log("DISDISDIS")
	} 
}
const actions = {
	getters11111({ commit },data){
		commit("types.ADD_TO_CART",data)
		//context.commit("types.ADD_TO_CART",data)
	}
}

const getters = {
	getters11111(){

	}
}
export default {
  state,
  getters,
  mutations
}
