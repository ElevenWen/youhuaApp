<template>
	<div id="userChatSever">
		<!--头部-->
		<div class="redeem-header">
			<span  class="return" @click.stop="goBack()"></span>
			客服聊天
		</div>
		<iframe id="Iframe" src="https://html.ecqun.com/kf/sdk/openwin.html?corpid=7331675&cstype=rand&mode=0&cskey=SqGFFE7Glw76x6szdw&scheme=0" height="100%" width="100%"></iframe>
	</div>
</template>

<script>
	
	export default{
		data(){
			return{
			
			}
		},
		created(){
		
		},
		methods:{
			//返回
			goBack(){
				this.$router.go(-1);
			},
		}
	}
</script>

<style lang="less" type="stylesheet/css" scoped>
	@import "../../common/index.less";
	#userChatSever{
     position: absolute;
     left: 0;
     top: 0;
     bottom: 0;
     width: 100%;
}
#Iframe{
	padding-top: 1.19rem;
}
/*头部*/
 .redeem-header{
	 position: fixed;
	 top: 0;
	 left: 0;
		background: #fff;
		height: 1.1891891891891893rem;
		width: 100%;
		text-align: center;
		line-height: 1.162162162162162rem;
		font-size: 0.4864864864864865rem;
		color: #1F1F1F;
		border-bottom: 1px solid #EBE5E1;
		background:white;
}
 .redeem-header .return{
     padding-left: 0.40540540540540543rem;
     height: 1.0810810810810811rem;
     width: 0.6486486486486487rem;
     .bg-image('../../assets/images/tabBar/nav_back');
     background-size: 100%;
     background-position: 0.40540540540540543rem 0.24324324324324326rem;
     position: absolute;
     left: 0;
}
 
 
</style>