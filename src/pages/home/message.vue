<style lang="less">
@import "../../common/index.less";
.messageWrap{
     // height: 7.081081081081081rem;
     background-color: white;
     margin-top: 1.5135135135135136rem;
}
 .activyMessage{
     height: 1.7297297297297298rem;
     border-bottom: 1px solid #ebe5e1;
}
 .amImg{
     display: inline-block;
     width: 0.6756756756756757rem;
     height: 0.6756756756756757rem;
     background-size: 0.6756756756756757rem 0.6756756756756757rem;
     margin: 0.5405405405405406rem 0 0 0.40540540540540543rem;
}
 .active{
     .bg-image("../../assets/images/mine/message/activeMessage");
}
 .server{
     .bg-image("../../assets/images/mine/message/serverMessage");
}
 .system{
	 .bg-image("../../assets/images/mine/message/systemMessages");
}
 .amWrap{
     display: inline-block;
     width: 65%;
     margin-left: 0.40540540540540543rem;
}
 .amTitle{
     font-size: 0.43243243243243246rem;
     font-weight: 600;
     margin-top: 0.2702702702702703rem;
}
 .amDes{
     font-size: 0.3783783783783784rem;
     color: #8c8c8c;
     margin-top: 0.24324324324324326rem;
}
 .right{
     width: 0.1891891891891892rem;
     height: 0.35135135135135137rem;
     .bg-image("../../assets/images/tabBar/right_arrow");
     background-size: 0.1891891891891892rem 0.35135135135135137rem;
     float: right;
     margin:0.7027027027027027rem 0.32432432432432434rem 0 0;
}
 .msgNum{
     float: right;
     width: 0.4864864864864865rem;
     height: 0.4864864864864865rem;
     border-radius: 50%;
     background: rgb(250,40,2);
     color: white;
     text-align: center;
     line-height: 0.43243243243243246rem;
     font-size: 0.32432432432432434rem;
     margin:0.6486486486486487rem 0.32432432432432434rem 0 0;
}
 
</style>
<template>
	<div id="message">
		<header-title title="消息中心"></header-title>
		<div class="messageWrap">
			<!-- 活动消息start -->
			<div class="activyMessage" @touchend="toActiveMessage">
				<div class="amImg active"></div>
				<div class="amWrap">
					<div class="amTitle">活动消息</div>
					<div class="amDes">你的地球优惠福利来啦</div>
				</div>
				<span class="right"></span>
				<span class="msgNum">3</span>
			</div>
			<!-- 活动消息end -->
			<!-- 服务消息start -->
			<div class="activyMessage">
				<div class="amImg server"></div>
				<div class="amWrap">
					<div class="amTitle">服务消息</div>
					<div class="amDes">您有一张优惠券到账了</div>
				</div>
				<span class="right"></span>
				<span class="msgNum">3</span>
			</div>
			<!-- 服务消息end -->
			<!-- 系统消息start -->
			<div class="activyMessage">
				<div class="amImg system"></div>
				<div class="amWrap">
					<div class="amTitle">系统消息</div>
					<div class="amDes">秒杀专区暂时下线公告</div>
				</div>
				<span class="right"></span>
				<span class="msgNum">3</span>
			</div>
			<!-- 系统消息end-->
		</div>
	</div>
</template>
<script>
import headerTitle from '../components/header-title';
	export default{
		data(){
			return {

			}
		},
		components:{
			headerTitle,
		},
		methods:{
			toActiveMessage(){ 
			}
		}
	}
</script>