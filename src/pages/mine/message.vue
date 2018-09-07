<style lang="less">
@import "../../common/index.less";
	.messageWrap{
     height: 14.162162162162161rem;
     background-color: white;
     margin-top: 1.837837837837838rem;
}
 .activyMessage{
     height: 3.4864864864864864rem;
     border-bottom: 1px solid #ebe5e1;
}
 .amImg{
     display: inline-block;
     width: 1.3513513513513513rem;
     height: 1.3513513513513513rem;
     .bg-image("../../assets/images/mine/message/activeMessage");
     background-size: 1.3513513513513513rem 1.3513513513513513rem;
     margin: 1.027027027027027rem 0 0 0.8108108108108109rem;
}
 .amWrap{
     display: inline-block !important;
     width: 40%;
     color: red;
}
 
</style>
<template>
	<div id="message">
		<header-title title="消息中心"></header-title>
		<div class="messageWrap">
			<div class="activyMessage">
				<span class="amImg"></span>
				<div class="amWrap">
					<div class="amTitle">活动消息</div>
					<div class="amDes">你的地球优惠福利来啦</div>
				</div>
			</div>
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
		}
	}
</script>