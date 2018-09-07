<style lang="less" scoped>
@import "../../common/base.less";
	#about{
     height: 100%;
     background: white;
}
 #about .backgroundImg{
     width: 100%;
     height: 6.081081081081081rem;
     margin-top: 1.1891891891891893rem;
}
 #about .titleWrap{
     height: 1.3513513513513513rem;
     padding-left: 17%;
}
 #about .titleImg{
     display: inline-block;
     width: 0.7567567567567568rem;
     height: 0.5405405405405406rem;
     .bg-image("../../assets/images/mine/Handshake");
     background-size: 0.7567567567567568rem 0.5405405405405406rem;
     position: relative;
     top: 0.08108108108108109rem;
}
 #about .title{
     text-align: center;
     line-height: 1.3513513513513513rem;
     font-size: 0.43243243243243246rem;
     font-weight: 600;
     margin-left: 0.35135135135135137rem;
}
 #about .content{
     color: #666666;
     font-size: 0.3783783783783784rem;
     padding: 0 0.40540540540540543rem;
     text-indent:0.7567567567567568rem;
     line-height: 0.6216216216216216rem;
}
 
</style>
<template>
	<div id="about">
		<header-title title="关于我们"></header-title>
		<img class="backgroundImg" src="../../assets/images/mine/about@2x.jpg">
		<div class="titleWrap">
			<span class="titleImg"></span>
			<span class="title">微企宝——企业服务宝中宝</span>
		</div>
		<div class="content">"微企宝"由深圳微企宝计算机系统有限公司开发，系荣灿金融控股有限公司旗下一站式企业服务平台。主要业务范畴包括：云记账、云代账、工商信息查询、著作权与资质查询、IM即时通讯及远程协助、"扫票"（扫描发票二维码）一键自动生成凭证并自动校验合并重复项、V宝机器人自动服务、线上下单及远程协助公司注册等服务。</div>
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