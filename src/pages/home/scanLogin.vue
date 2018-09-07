<template>
	<div id="scanLogin">
		<div class="scanLogin-header">
			<span  class="return" @touchend="goBack()"></span>
			扫码登录
		</div>
		<div class="scanLogin-content">
			<div class="scanLogin-img"></div>
			<div class="scanLogin-con" :class="isRed?'active':''">{{fon}}</div>
			<div class="btn">
				<button type="button" @touchend="toLogin" v-show="!isRed">确认登录电脑端</button>
				<button type="button" @touchend="reScan" v-show="isRed">重新扫描</button>
				<div @touchend.stop.prevent="toCancel" class="cancel" v-show="!isRed">取消</div>
			</div>
		</div>
	</div>
</template>

<script>
	import getd from '../../vuex/getData.js';
	import { Toast,Indicator } from 'mint-ui';
	import axios from 'axios';
	export default{
		data(){
			return{
				fon:"微企宝网站登录确认",
				isRed:false
			}
		},
		methods:{
			goBack(){
				this.$router.replace('/home/scan');
			},
			//确认登录
			toLogin(){
				axios.post(this.$route.params.url, {
				    Token: this.getToken(),
				    steps:2,//确认
				    datatype:"json"
				})
				.then( (response)=> {
					Indicator.close();
					//console.log(response)
				    this.$router.replace('/home');
					Toast({
					  message: '授权登录成功',
					  position: 'middle',
					  duration: 2000
					});
				})
				.catch( (error) =>{
					Indicator.close();
					//console.log(error)
					if(error.data.msg=="二维码已过期"){
						this.isRed = true;
						this.fon = "二维码过期，请重新扫描";
					}else{
						Toast({
						  message: error.data.msg,
						  position: 'middle',
						  duration: 2000
						});
					}
				});
			},
			//取消
			toCancel(){
				this.$router.replace('/home');
			},
			//重新扫描
			reScan(){
				this.$router.replace('/home/scan');
			}
		}
	}
</script>

<style lang="less" type="stylesheet/css" scoped>
	@import "../../common/index.less";
	#scanLogin{
     position: absolute;
     left: 0;
     top: 0;
     bottom: 0;
     background: #fff;
     width: 100%;
}
/*头部*/
 .scanLogin-header{
     height: 1.1891891891891893rem;
     width: 100%;
     text-align: center;
     line-height: 1.162162162162162rem;
     font-size: 0.4864864864864865rem;
     color: #1F1F1F;
     border-bottom: 1px solid #EBE5E1;
     background:white;
}
 .scanLogin-header .return{
     padding-left: 0.40540540540540543rem;
     height: 1.0810810810810811rem;
     width: 0.6486486486486487rem;
     .bg-image('../../assets/images/tabBar/nav_back');
     background-size: 100%;
     background-position: 0.40540540540540543rem 0.24324324324324326rem;
     position: absolute;
     left: 0;
}
 .scanLogin-content{
     position: absolute;
     left: 0;
     top: 1.1891891891891893rem;
     bottom: 0;
     width: 100%;
     background: #efeff4;
}
 .scanLogin-img{
     margin: 0 auto;
     margin-top: 2.5675675675675675rem;
     margin-bottom: 1.2432432432432432rem;
     width: 63%;
     height: 2.4864864864864864rem;
     .bg-image('../../assets/Images/home/img');
     background-size: 100%;
}
 .scanLogin-con{
     width: 100%;
     text-align: center;
     font-size: 0.43243243243243246rem;
     color: #000;
}
 .scanLogin-con.active{
     color: #fa2802;
}
 .scanLogin-content .btn{
     position: absolute;
     left: 0;
     bottom: 2.081081081081081rem;
     width: 100%;
}
 .scanLogin-content .btn button{
     width: 7.972972972972973rem;
     height: 1.1081081081081081rem;
     font-size: 0.43243243243243246rem;
     color: #fff;
     text-align: center;
     line-height: 1.1081081081081081rem;
     border-radius: 0.05405405405405406rem;
     .bg-image('../../assets/Images/home/btnbg');
     background-size: 100%;
     background-repeat: repeat;
     border: none;
     outline: none;
     margin: 0 auto;
     margin-bottom: 0.7837837837837838rem;
     display: block;
}
 .scanLogin-content .btn .cancel{
     width: 100%;
     height: 0.43243243243243246rem;
     text-align: center;
     font-size: 0.43243243243243246rem;
     color: #666;
}
 
</style>