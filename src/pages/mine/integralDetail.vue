<template>
	<div id="integral-detail">
		<div class="integral-detail-header">
			<span  class="return" @click.stop="goBack()"></span>
			收支明细
		</div>
		<ul>
			<li v-for="data in scoreDetail">
				<div class="integral_li_left">
					<span>{{data.Reason}}</span>
					<!--<span>2017-10-20&nbsp;周日</span>-->
					<span>{{data.AddTime|getTime}}</span>
				</div>
				<div class="integral_li_right" :class="data.AddScore<0?'selected':''" v-if="data.AddScore<0">
					{{data.AddScore}}
				</div>
				<div class="integral_li_right" v-if="data.AddScore>0">
					+{{data.AddScore}}
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	import getd from '../../vuex/getData.js';
	export default{
		data(){
			return{
				scoreDetail:[],//积分获取详情
			}
		},
		created(){
			//积分获取详情
			var params = {
				datatype:"json"
			};
			getd.getMyScoreDetails(params)
			.then((res)=>{
				this.scoreDetail = res.data;
			})
		},
		methods:{
			//返回
			goBack(){
				this.$router.go(-1);
			},
		},
		filters:{
			getTime:(val)=>{
				var t = val.slice(6,19);
				var time = new Date(parseInt(t));
				var year = time.getFullYear();
				var month = time.getMonth()+1;
				var date = time.getDate();
				var day = time.getDay();
				switch (day){
					case 0:
						day = "日";
						break;
					case 1:
						day = "一";
						break;
					case 2:
						day = "二";
						break;
					case 3:
						day = "三";
						break;
					case 4:
						day = "四";
						break;
					case 5:
						day = "五";
						break;
					case 6:
						day = "六";
						break;
					default:
						break;
				}
				return year+"-"+month+"-"+date+" 周"+day;
			}
		}
	}
</script>

<style lang="less" type="stylesheet/css" scoped>
	@import "../../common/index.less";
	#integral-detail{
     position: absolute;
     left: 0;
     top: 0;
     bottom: 0;
     background: #fff;
     width: 100%;
}
 #integral-detail ul li{
     height: 2.1621621621621623rem;
     width: 100%;
     background: #FFF;
     margin-bottom: 1px;
	 .border-1pxB(#eee);
	 font-size: 0.3783783783783784rem; 
}
 #integral-detail .integral_li_left{
     float: left;
     height: 2.1621621621621623rem;
     width: 70%;
}
 #integral-detail .integral_li_left span{
     width: 100%;
     display: block;
     height: 0.8108108108108109rem;
     padding-left: 0.32432432432432434rem;
}
 #integral-detail .integral_li_left span:nth-child(1){
     margin-top: 0.5945945945945946rem;
     .cDefault;
     text-overflow: ellipsis;
     white-space: nowrap;
     overflow: hidden;
     line-height: 0.7567567567567568rem;
     height: 0.918918918918919rem;
}
 #integral-detail .integral_li_left span:nth-child(2){
     margin-top: -0.16216216216216217rem;
     .fs13;
     .cf8C;
}
 #integral-detail .integral_li_right{
     float: right;
     height: 2.1621621621621623rem;
     line-height: 2.1621621621621623rem;
     text-align: right;
     padding-right: 0.32432432432432434rem;
     font-size: 0.5405405405405406rem;
     .cf802;
     width: 29%;
}
 #integral-detail .integral_li_right.selected{
     color: #67B642;
}
/*头部*/
 .integral-detail-header{
     height: 1.1891891891891893rem;
     width: 100%;
     text-align: center;
     line-height: 1.162162162162162rem;
     font-size: 0.4864864864864865rem;
     color: #1F1F1F;
     border-bottom: 1px solid #EBE5E1;
     background:white;
}
 .integral-detail-header .return{
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