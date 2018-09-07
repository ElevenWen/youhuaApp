<template>
	<div id="moreNews">
		<!--头部-->
		<div class="back">
			<span class="return" @click="goBack()"></span>
			新闻资讯
		</div>
		<div class="wrap">
			<div class="content">
				<ul>
					<li v-for="(data,index) in newsArr" :key="index" @click="toDetail(index)">
						<h3>{{data.title}}</h3>
						<span>{{data.source}}</span>
						<span>{{data.time}}</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				newsArr:[{
					title:'河池警方破获特大虚开增值税发票案，关于增值税发票你知多少？',
					source:'中国税务报',
					time:'2018-04-01 12:33:56'
				},{
					title:'进项税额抵扣的规则你掌握了吗？七点注意事项请留意！',
					source:'中税答疑新媒体智库',
					time:'2018-04-01 14:56:56'
				},{
					title:'出口退税请注意！这6大税收风险因素需牢记',
					source:'中国税务报',
					time:'2018-04-02 09:16:06'
				},{
					title:'3个例子解析“年应税销售额”，避免4个理解误区',
					source:'中国税务报',
					time:'2018-04-02 11:50:30'
				},{
					title:'有关发票认证，这11个问题必须清楚！',
					source:'中税答疑新媒体智库、北京国税',
					time:'2018-04-03 13:36:08'
				},{
					title:'必看！新企业所得税申报表清晰明确的十大政策',
					source:'中税答疑新媒体智库',
					time:'2018-04-03 18:45:12'
				},{
					title:'印花税6个容易出错的地方，别再弄混了',
					source:'老三会计',
					time:'2018-04-04 10:22:19'
				},{
					title:'3分钟教会你微信红包如何做账！',
					source:'xiaochenshuiwu、会计大咖',
					time:'2018-04-04 16:32:09'
				},{
					title:'必知！税前扣除、汇算清缴、企业所得税等8大问题',
					source:'中税答疑新媒体智库',
					time:'2018-04-10 08:56:56'
				},{
					title:'干货！一分钟了解收据、普票、增值税专票不同点',
					source:'中国税务报',
					time:'2018-04-12 08:32:01'
				},
				]
			}
		},
		methods:{
			goBack(){
				this.$router.go(-1)
			},
			//进新闻详情
			toDetail(index){
				this.$router.push({path:'/reportEntry/newsDetail',query:{id:index}})
			}
		}
	}
</script>

<style lang="less" type="stylesheet/css" scoped>
	@import "../../common/index.less";
	#moreNews{
     position: absolute;
     left: 0;
     top: 0;
     bottom: 0;
     background: #fff;
     width: 100%;
}
/*头部*/
 #moreNews .back{
     height: 1.1891891891891893rem;
     width: 100%;
     text-align: center;
     line-height: 1.162162162162162rem;
     font-size: 0.4864864864864865rem;
     color: #1F1F1F;
     background:white;
     .border-1pxB(#ebe5e1);
     position: fixed;
     z-index: 9;
}
 #moreNews .return{
     padding-left: 0.40540540540540543rem;
     height: 1.0810810810810811rem;
     width: 0.6486486486486487rem;
     .bg-image('../../assets/images/tabBar/nav_back');
     background-size: 100%;
     background-position: 0.40540540540540543rem 0.24324324324324326rem;
     position: absolute;
     left: 0;
}
 #moreNews .wrap{
     width: 100%;
     padding-top: 1.1891891891891893rem;
     // height: 100%;
     background: #fff;
     .content{
         overflow: scroll;
         background: #fff;
    }
}
/*主体*/
 #moreNews .wrap .content ul li{
     padding: 0.40540540540540543rem 0.2702702702702703rem 0.2972972972972973rem 0.35135135135135137rem;
     .border-1pxB(#ebe5e1);
     h3{
         font-size: 0.40540540540540543rem;
         color: #323232;
         margin-bottom: 0.2702702702702703rem;
         line-height: 0.5405405405405406rem;
    }
     span{
         font-size: 0.32432432432432434rem;
         color: #999999;
    }
     span:nth-of-type(1){
         margin-right: 0.2972972972972973rem;
    }
}
 #moreNews .news .title span{
     float: right;
     position: relative;
     font-size: 13;
     color: #666;
     i{
         width: 0.1891891891891892rem;
         height: 0.35135135135135137rem;
         .bg-image('../../assets/images/report/right_arrow');
         background-size: 100%;
         margin-left: 0.13513513513513514rem;
         position: absolute;
         top: 0.2972972972972973rem;
    }
}
 
</style>