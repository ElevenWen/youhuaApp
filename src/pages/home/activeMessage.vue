<style lang="less">
@import "../../common/index.less";
/*头部样式*/
.popularity_return {
     position: fixed;
     height: 1.1891891891891893rem;
     width: 100%;
     text-align: center;
     line-height: 1.162162162162162rem;
     font-size: 0.4864864864864865rem;
     color: #1F1F1F;
     border-bottom: 1px solid #EBE5E1;
     top: -0.1px;
     right: 0;
     left: 0;
     background:white;
     z-index: 999;
}
 .return{
     padding-left: 0.40540540540540543rem;
     height: 1.0810810810810811rem;
     width: 0.6486486486486487rem;
     background-image: url('../../assets/images/tabBar/nav_back@2x.png');
     background-repeat: no-repeat;
    /*.bg-image('../../assets/images/tabBar/nav_back');
     */
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
     height: 5.675675675675675rem;
     background: white;
     margin: 1.5135135135135136rem 0.32432432432432434rem 0.32432432432432434rem 0.32432432432432434rem;
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
     background-image: url("../../assets/images/mine/message/unread@2x.png");
     background-size: 0.40540540540540543rem 0.40540540540540543rem;
     background-repeat: no-repeat;
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
 .bigImg{
     width:100%;
     padding-top: 0.3783783783783784rem;
}
 .details{
     color: rgb(48,161,248);
     padding: 0.2702702702702703rem 0 0 0.2972972972972973rem;
}
 .toRight{
     float: right;
     width: 0.1891891891891892rem;
     height: 0.35135135135135137rem;
     background-image: url("../../assets/images/tabBar/right_arrow@2x.png");
     background-repeat: no-repeat;
     background-size: 0.1891891891891892rem 0.35135135135135137rem;
     margin-right: 0.2702702702702703rem;
}
 
</style>
<template>
	<div id="activeMessage">
		<!-- 头部start -->
		<div class="popularity_return" id="title">
            <span  class="return" @click="goBack()"></span>
			<span id="title_name">活动消息</span>
			<span id="submit">清空</span>
		</div>
		<!-- 头部end -->
		<!-- 消息start -->
		<div class="atMsgWrap" @touchend="msPage">
		 	<div class="titleWrap">
		 		<span class="titleImg"></span>
		 		<span class="title1">邀请好友送现金</span>
		 	</div>
		 	<div class="timer">今天  15:25</div>
		 	<img src="../../assets/images/mine/message/ms@2x.png" class="bigImg">
		 	<div class="details">查看详情<span class="toRight"></span></div>
		</div>
		<!-- 消息end -->
	</div>
</template>
<script>
export default{
	data(){
		return {

		}
	},
	components:{

	},
	methods:{
		goBack(){
			this.$router.go(-1);
		},
		msPage(){
			this.$router.push("/message/activeMessageDetail")
		}
	}
}
	
</script>