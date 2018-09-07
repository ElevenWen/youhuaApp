<style lang="less"  scoped>
@import "../../common/index.less";
/*头部样式*/
#title{
    background:white; 
}
.popularity_return {
     position: fixed;
     height: 1.1891891891891893rem;
     width: 100%;
     text-align: center;
     line-height: 1.162162162162162rem;
     font-size: 0.4864864864864865rem;
     color: #1F1F1F;
     border-bottom: 1px solid #EBE5E1;
     top: 0;
     right: 0;
     left: 0;
     background:white;
     z-index: 999;
}
 .return{
     padding-left: 0.40540540540540543rem;
     height: 1.0810810810810811rem;
     width: 0.6486486486486487rem;
     .bg-image('../../assets/images/tabBar/nav_back');
     background-size: 100%;
     background-position: 0.40540540540540543rem 0.24324324324324326rem;
     position: absolute;
     left: 0;
}
 .return a{
     width: 100%;
     height: 100%;
     display: block;
}
 #submit{
     float: right;
     font-size: 0.40540540540540543rem;
     color: rgb(102,102,102);
     margin-right: 0.40540540540540543rem;
}
/*消息*/
 .atMsgWrap{
     background: white;
     margin: 1.5135135135135136rem 0.32432432432432434rem 0.32432432432432434rem 0.32432432432432434rem;
     border: 1px solid rgb(235,229,225);
     border-radius: 0.05405405405405406rem;
}
 .atMsgWrap1{
     background: white;
     margin: 0.32432432432432434rem;
     border: 1px solid rgb(235,229,225);
     border-radius: 0.05405405405405406rem;
}
 .titleWrap{
     height: 1rem;
}
 .titleImg{
     float: left;
     width: 0.40540540540540543rem;
     height: 0.40540540540540543rem;
     .bg-image('../../assets/images/mine/message/unread');
     background-size: 0.40540540540540543rem 0.40540540540540543rem;
     margin: 0.2972972972972973rem 0 0 0.2972972972972973rem;
}
 .title1{
     font-size: 0.40540540540540543rem;
     font-weight: 600;
     margin-left: 0.2972972972972973rem;
     line-height: 1rem;
}
 .timer{
     font-size: 0.32432432432432434rem;
     color: rgb(102,102,102);
     margin-left: 0.2972972972972973rem;
}
 .contentWord{
     margin: 0.2702702702702703rem 0.4594594594594595rem 0rem 0.2972972972972973rem;
     padding-bottom: 0.2702702702702703rem;
     font-size: 0.40540540540540543rem;
     font-weight: 600;
     line-height: 0.5675675675675675rem;
     border-bottom: 1px solid rgb(235,229,225);
}
 .details{
     color: rgb(48,161,248);
     padding: 0.2702702702702703rem 0 0.2702702702702703rem 0.2972972972972973rem;
}
 .toRight{
     float: right;
     width: 0.1891891891891892rem;
     height: 0.35135135135135137rem;
     .bg-image('../../assets/images/tabBar/right_arrow');
     background-size: 0.1891891891891892rem 0.35135135135135137rem;
     margin-right: 0.2702702702702703rem;
}
 
</style>
<template>
	<div id="serverMessage">
		<!-- 头部start -->
		<div class="popularity_return" id="title">
            <span  class="return" @click="goBack()"></span>
			<span id="title_name">服务消息</span>
			<span id="submit">清空</span>
		</div>
		<!-- 头部end -->
		<!-- 消息start -->
		<div v-for="(items,index) in arr">
			<div :class="index==0 ? 'atMsgWrap' : 'atMsgWrap1'" @touchend="msPage" >
			 	<div class="titleWrap">
			 		<span class="titleImg"></span>
			 		<span class="title1">邀请好友送现金</span>
			 	</div>
			 	<div class="timer">今天  15:25</div>
			 	<div class="contentWord">您购买深圳公司注册的服务（编号：3232323）已成功受理</div>
			 	<div class="details">查看详情<span class="toRight"></span></div>
			</div>
		</div>
		<!-- 消息end -->
	</div>
</template>
<script>
export default{
	data(){
		return {
			arr:["a","b","c"],
		}
	},
	components:{

	},
	methods:{
		goBack(){
			this.$router.go(-1);
		},
		msPage(){
			this.$router.push("/message/activeMessageDetail");
		}
	}
}
</script>