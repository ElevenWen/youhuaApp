<style lang="less">
@import "../../common/index.less";
#activeMessageDetail{
     height: 100%;
     background:#fff;
}
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
 .share{
     padding-left: 0.40540540540540543rem;
     height: 1.1891891891891893rem;
     width: 1.4864864864864864rem;
     background-repeat: no-repeat;
     background-size: 0.5405405405405406rem;
     background-position: 0.7027027027027027rem 0.2972972972972973rem;
     position: absolute;
     right: 0;
     .bg-image('../../assets/images/productDetails/share');
}
 // 正文 
.contentWrap{
     margin-top: 1.1891891891891893rem;
}
 .title{
     font-size: 0.4594594594594595rem;
     font-weight: 600;
     padding-top: 0.5675675675675675rem;
     margin-left: 27%;
}
 .timer1{
     color: rgb(140,140,140);
     margin-top: 0.40540540540540543rem;
     padding-left: 35%;
}
 .content{
     padding-top: 0.40540540540540543rem;
     font-size: 0.43243243243243246rem;
     margin: 0.6756756756756757rem 0.40540540540540543rem 0.40540540540540543rem 0.40540540540540543rem;
     line-height: 0.6756756756756757rem;
     border-top: 1px solid rgb(235,229,225);
}
 .contentImg{
     width: 91%;
     height: 4.054054054054054rem;
     margin: 0.13513513513513514rem 0.40540540540540543rem 0.40540540540540543rem 0.40540540540540543rem;
}
 
</style>
<template>
	<div id="activeMessageDetail">
		<!-- 头部start -->
		<div class="popularity_return" id="title">
            <span  class="return" @click="goBack()"></span>
			<span id="title_name">消息详情</span>
			<span class="share"></span>
		</div>
		<!-- 头部end -->
		<div class="contentWrap">
			<div class="title">秒杀专区暂时下线公告</div>
			<div class="timer1">2017-12-23 16:53</div>
			<div class="content">通告是在一定范围内公布应当遵守或周知事项时使用的文种，其主要特点是知照性、专业性、约束力。通知具有规范性、业务性、广泛性。通告是在一定范围内公布应当遵守或周知事项时使用的文种，其主要特点是知照性、专业性、约束力。通知具有规范性、业务性、广泛性。</div>
			<img src="../../assets/images/mine/message/ms@2x.png" class="contentImg">
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return {

			}
		},
		methods:{
			goBack(){
				this.$router.go(-1);
			}
		}
	}
</script>