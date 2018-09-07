<template>
	<div id="integral-rule">
		<div class="integral-rule-header">
			<span  class="return" @click.stop="goBack()"></span>
			积分赚取规则
		</div>
		<div class="rule-content" style="padding:0 13px;">
			<h3 class="rule-title">一.积分定义</h3>
			<p>积分是用户行为产生的分数系统，是衡量用户活跃度和粘性的指标，积分可以兑换延展权益。积分系统定位于两套规则（积分生成规则/积分使用规则）及统一的管理平台。</p>
			
			<h3 class="rule-title">二.什么是积分？</h3>
			<p>积分是微企宝为奖励会员和注册游客提供的一种虚拟币。</p>
			
			<h3 class="rule-title">三.积分生成规则</h3>
			<p>用户通过各种行为或系统根据设定条件为用户生成并累加积分的规则。<br />
				a.基于通用行为：用户的使用、互动、消费、传播、营销会产生积分；<br />
				b.积分生成规则覆盖全业务线，按照统一标准产生积分；<br />
				C.积分兑换而产生的用户行为，将不再次累积积分。
			</p>
			<div class="img"><img src="../../assets/images/mine/integral/ruleGet@3x.png"/></div>
			
			<h3 class="rule-title">四.积分消耗规则</h3>
			<div class="img2"><img src="../../assets/images/mine/integral/rule@3x.png"/></div>
			<div class="notice">注：所有积分仅供在微企宝网站使用和兑换，不找零，不折现。</div>
			
			<h3 class="rule-title">五.积分有效期</h3>
			<p>当年产生的积分在下一个自然年的1月1日0点前有效，逾期将作废。</p>
			
			<h3 class="rule-title">六.积分违规及收回说明</h3>
			<p>发表的评论违反国家法律法规或者附带其它广告信息的，一经发现将被删除，同时一次扣除50积分。</p>
			
			<h3 class="rule-title">七.积分查询方式</h3>
			<p style="padding-bottom: 0.43243243243243246rem ;">a.平台在线查询：用户在登陆状态下，通过个人中心查询到自己的积分总额和消耗情况；<br />
				b.定向邮件/短信通知：用户资料完善的情况下，固定周期通过电邮/短信方式将积分总额和消耗情况送达用户。过电邮/短信方式将积分总额和消耗情况送达用户。
			</p>
		</div>
	</div>
</template>

<script>
	export default{
		methods:{
			//返回
			goBack(){
				this.$router.go(-1);
			},
		},
	}
</script>

<style lang="less" type="stylesheet/css" scoped>
	@import "../../common/index.less";
	#integral-rule{
     background: #fff;
}
/*头部*/
 .integral-rule-header{
     height: 1.1891891891891893rem;
     width: 100%;
     text-align: center;
     line-height: 1.162162162162162rem;
     font-size: 0.4864864864864865rem;
     color: #1F1F1F;
     border-bottom: 1px solid #EBE5E1;
     background:white;
}
 .integral-rule-header .return{
     padding-left: 0.40540540540540543rem;
     height: 1.0810810810810811rem;
     width: 0.6486486486486487rem;
     .bg-image('../../assets/images/tabBar/nav_back');
     background-size: 100%;
     background-position: 0.40540540540540543rem 0.24324324324324326rem;
     position: absolute;
     left: 0;
}
 .rule-content{
     background-color: #fff;
}
 .rule-content .rule-title{
     font-weight: normal;
     font-size: 0.40540540540540543rem;
     color: #000;
     line-height: 1.0810810810810811rem;
}
 .rule-content p{
     font-size: 0.35135135135135137rem;
     color: #666;
     line-height: 0.5405405405405406rem;
}
 .rule-content .img{
     margin-top: 0.3783783783783784rem;
     height: 14.243243243243244rem;
     img{
         width: 100%;
         height: 100%;
    }
}
 .rule-content .img2{
     height: 4.378378378378378rem;
     margin-bottom: 0.2702702702702703rem;
     img{
         width: 100%;
         height: 100%;
    }
}
 .rule-content .notice{
     font-size: 0.32432432432432434rem;
     color: #df3d3e;
}
 
</style>