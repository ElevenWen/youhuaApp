<template>
	<div id="updateNikeName">
		<header-title title="修改昵称" source="updateNikeName" :name="name" :isRight="isRight"></header-title>
		<div class="updateNikeName">
			<input type="text" minlength="4" maxlength="20" class="nikeName_input" placeholder="请输入昵称" v-model="name" @blur="verify"/>
			<span>4-20个字符，可由中英文、数字、“_”、“-”组成</span>
		</div>
	</div>
</template>

<script>
import headerTitle from "../components/header-title";
import { Toast } from 'mint-ui';
//Vue.component(Actionsheet.name,Actionsheet);
export default{
	data(){
		return{
			name:this.$route.params.nickname,
			isRight:false
		}
	},
	components:{
    	headerTitle
    },
    methods:{
    	verify(){
    		//4-20个字符
    		var reg = /([A-Za-z0-9-_]{4,20})|([\u4e00-\u9fa5]{2,10})|([\u4e00-\u9fa5][\w\W-]{2})/;
    		if (reg.test(this.name)) {
    			this.isRight = true;
    		}else{
    			this.isRight = false;
    			Toast({
				  message: '输入有误', 
				  duration: 2000
				});
    		}
    	}
    }
}
</script>

<style lang="less" type="stylesheet/css" scoped>
	@import "../../common/index.less";
	@import 'mine.less';
	.popularity_return{
     padding-left: 0.8108108108108109rem;
	}
	.nikeName_input{
		height:1.3513513513513513rem;
		width: 100%;
	}
	.nikeName_input{
		height: 1.3513513513513513rem;
		width: 100%;
		font-size: 0.43243243243243246rem;
		padding-left: 0.32432432432432434rem;
		color: #000;
	}
	.nikeName_input::-webkit-input-placeholder{   
		color: #B2B2B2;   
	}   
	.updateNikeName {
		margin-top: 1.1891891891891893rem;
	}
	.updateNikeName span{
		display: block;
		width: 100%;
		color: #B3B3B3;
		font-size: 0.32432432432432434rem;
		padding-left: 0.32432432432432434rem;
		margin-top: 0.32432432432432434rem;
	}
 
</style>