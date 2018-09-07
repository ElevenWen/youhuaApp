<style lang="less">
@import "../../common/index.less";
// 底部
	.inputMessageWrap{
     height: 1.3783783783783783rem;
     background: #fff;
     position: absolute;
     bottom: 0;
     right: 0;
     left: 0;
     border-bottom: 1px solid #B3B3B3;
}
 .message{
     width: 68%;
     height: 1rem;
     border: 1px solid #B3B3B3 !important;
     border-radius: 0.13513513513513514rem;
     margin: 0.08108108108108109rem 0 0 0.32432432432432434rem;
     -webkit-appearance: none;
     //移除ios原生控件样式 
}
 .voice,.plus{
     display: inline-block;
     width: 0.7837837837837838rem;
     height: 0.7837837837837838rem;
     background-size: 0.7837837837837838rem 0.7837837837837838rem;
     position: relative;
     top: 0.35135135135135137rem;
}
 .voice{
     .bg-image('../../assets/images/mine/customerService/voice');
     margin-left: 0.2702702702702703rem;
}
 .plus{
     .bg-image('../../assets/images/mine/customerService/add');
     margin-left: 0.2702702702702703rem;
}
 // 聊天框 
 .messageWrap{
     margin-top: 1.4594594594594594rem;
}
 .tipMessage{
     width: 2.27027027027027rem;
     height: 0.5675675675675675rem;
     line-height: 0.5135135135135135rem;
     background: #CECECE;
     border: 1px solid #CECECE;
     border-radius: 0.2702702702702703rem;
     margin: 0 auto;
     text-align: center;
     font-size: 0.32432432432432434rem;
     color: #fff;
}
 .messageLeft{
     padding: 0.40540540540540543rem 0 0 0.40540540540540543rem;
     overflow: hidden;
     .font,img{
         float: left;
    }
}
 .messageLeft img,.messageRight img{
     width: 1.0810810810810811rem;
     height: 1.0810810810810811rem;
     display: inline-block;
}
 .font{
     display: inline-block;
     min-width: 1.5405405405405406rem;
     max-width: 5.675675675675675rem;
     min-height: 1.1081081081081081rem;
     background: #fff;
     font-size: 0.40540540540540543rem;
     margin-left: 0.2702702702702703rem;
}
 .font span{
     display: block;
     padding: 0.40540540540540543rem;
     line-height: 0.4864864864864865rem;
}
 .sanjiao{
     width: 0;
     height: 0;
     overflow: hidden;
     border-width: 0.21621621621621623rem;
     border-color: transparent white transparent transparent;
     border-style:solid dashed dashed dashed;
     position: absolute;
     margin: 0.40540540540540543rem 0 0 0;
     left: 1.4594594594594594rem 
}
 .messageRight{
     padding: 0.40540540540540543rem 0.40540540540540543rem 0 0;
     overflow: hidden;
}
 .messageRight img{
     float: right;
}
 .fontRight{
     float: right;
     min-width: 1.5405405405405406rem;
     max-width: 5.54054054054054rem;
     min-height: 1.1081081081081081rem;
     display: inline-block;
     background: #4592D9;
     font-size: 0.40540540540540543rem;
     margin-right: 0.2702702702702703rem;
     color: white;
}
 .fontRight span{
     display: block;
     padding: 0.40540540540540543rem;
     line-height: 0.4864864864864865rem;
}
 .sanjiaoRight{
     width: 0;
     height: 0;
     overflow: hidden;
     border-width: 0.21621621621621623rem;
     border-color: transparent transparent transparent #4592D9;
     border-style:solid dashed dashed dashed;
     position: absolute;
     margin: 0.32432432432432434rem 0 0 0;
     right: 1.3783783783783783rem;
}
 // 底部隐藏弹框start 
 .hiddenBox{
     width: 100%;
     height: 3.054054054054054rem;
     background: white;
     position: absolute;
     bottom: 0;
     left: 0;
     right: 0;
}
 .photo,.camera{
     width: 1.6486486486486487rem;
     height: 1.6486486486486487rem;
     margin: 0.7027027027027027rem 0 0 0.35135135135135137rem;
}
 .photo{
     // margin: 0.7027027027027027rem 0 0 0.35135135135135137rem;
}
 
</style>

<!-- 聊天页面 暂时不用 -->
<template>
	<div id="customerService">
		<!-- 头部start -->
		<header-title title="在线客服"></header-title>
		<!-- 头部end -->
		<!-- 聊天框start -->
		<div class="messageWrap" @click="closePlus">
			<div class="tipMessage">xx为您服务</div>
			<div class="messageLeft">
				<img src="../../assets/images/mine/customerService/headImg@3x.png">
				<div class="font">
					<div class="sanjiao"></div>
					<span>您好!xx很高兴为您服务~</span>
				</div>
			</div>
			<div class="messageRight">
				<img src="../../assets/images/mine/customerService/headImg@3x.png">
				<div class="fontRight">
					<div class="sanjiaoRight"></div>
					<span>在喔</span>
				</div>
			</div>
			<div class="messageLeft">
				<img src="../../assets/images/mine/customerService/headImg@3x.png">
				<div class="font">
					<div class="sanjiao"></div>
					<span>您好</span>
				</div>
			</div>
		</div>
		<!-- 聊天框end -->
		<!-- 底部start -->
		<div class="inputMessageWrap" ref="plus">
			<input type="text" class="message">
			<span class="voice"></span>
			<span class="plus" @click="sendImg"></span>
		</div>
		<!-- 底部end -->
		<!-- 底部隐藏弹框start -->
		<div class="hiddenBox" v-if="hiddenOrShow" @click="sendImg">
			<img class="photo" src="../../assets/images/mine/customerService/photo@2x.png">
			<img class="camera" src="../../assets/images/mine/customerService/camera@2x.png">
		</div>
		<!-- 底部隐藏弹框end -->
	</div>
</template>
<script>
	import headerTitle from '../components/header-title';
	export default {
		data(){
			return {
				hiddenOrShow:false, //是否展示图库和相机
			}
		},
		components:{
			headerTitle,
		},
		methods:{
			sendImg(){
				this.hiddenOrShow = !this.hiddenOrShow;
				var aaa = this.$refs.plus;
				if(this.hiddenOrShow == true){
					aaa.style.bottom = "113px";
				}else{
					aaa.style.bottom = "0px";
				}
			},
			closePlus(){ //隐藏图库和相机
				this.hiddenOrShow = false;
				var aaa = this.$refs.plus;
				aaa.style.bottom = "0px";
			}
		},
	}
</script>