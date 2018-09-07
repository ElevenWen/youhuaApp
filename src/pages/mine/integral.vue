<template>
	<div id="integral">
		<transition 
			name="fade" mode="out-in" > 
			<div  v-if="isTrue" class="fixHeader fixHeaderOne" key="save">
				<span class="return" @click="toReturn"></span>
				我的积分
			</div>
			<div   v-else  class="fixHeader fixHeaderSecond" key="other">
				<span class="return" @click="toReturn"></span>
				我的积分
			</div> 
		</transition>
		  
		<div class="integral_top">
			<div class="integral_numbor">{{scoreObj.Score}}</div>
			<div class="integral_text">小积分，大用处，多领一些囤起来！</div>
		</div>
		<div class="addintgral">
			<div class="addintgral_left" @click.stop="toRule">积分说明</div>
			<div class="addintgral_right" @click.stop="toRedeem">积分兑换</div>
		</div>
		<div class="intgral_list">
			<div class="integral_list_top" @click.stop="showAll">
				收支明细
			</div>
			<ul>
				<li v-for="data in scoreDetail">
					<div class="integral_li_left">
						<span>{{data.Reason}}</span>
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
		<router-view></router-view>
	</div>
</template>

<script>
	import getd from '../../vuex/getData.js';
	export default{
		data(){
			return{
				scoreObj:{},//当前积分
				scoreDetail:[],//积分获取详情
				isShow:false,//积分明细
				isTrue:true, 
				show: true
			}
		},
		created(){
			//获取当前用户积分
			var params = {
				datatype:"json"
			};
			getd.getMyScore(params)
			.then((res)=>{
				this.scoreObj = res.data;
			})
			//积分获取详情
			getd.getMyScoreDetails(params)
			.then((res)=>{
				this.scoreDetail = res.data.slice(0,10);
			})
		},
		mounted(){
			//滚动监听
			window.addEventListener('scroll', this.handleScroll)
		},
		methods:{
			toReturn(){
				this.$router.go(-1);
			},
			//滚动监听
			handleScroll(){
			  var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
			   	if (scrollTop > 60) {
			   	 
				    this.isTrue = false;
				   
				} else if((scrollTop < 60)) {
				    this.isTrue = true;
				}
			},
			//积分明细
			showAll(){
				this.$router.push('/mine/integral/integralDetail');
			},
			//去兑换
			toRedeem(){
				this.$router.push('/mine/integral/redeem');
			},
			//积分规则
			toRule(){
				this.$router.push('/mine/integral/integralRule');
			}
		},
		destroyed () {
		  window.removeEventListener('scroll', this.handleScroll)
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
	@import './mine.less';
	.popularity_return{
     padding-left: 0rem;
}
 #integral{
     position: relative;
}
 #integral .popularity_return .return.selected{
     transition:1s;
     .bg-image('../../assets/images/cart/nav_back');
}
 #integral .integral_li_right.selected{
     color: #67B642;
}
 .slide-fade-enter-active, .slide-fade-leave-active {
     background: blue;
     transition: all 20s 
}
 .fixHeader{
     position: fixed;
     top:0;
     left: 0;
     width: 100%;
     text-align: center;
     line-height: 1.1891891891891893rem;
     font-size: 0.4864864864864865rem;
}
 .fixHeaderOne .return{
     position: absolute;
     left: 0;
     top: 0;
     height: 1.1891891891891893rem;
     width: 1.1081081081081081rem;
     display: block;
     float: left;
     background-size: 57%;
     background-position: 0.3783783783783784rem 0.2702702702702703rem;
     .bg-image('../../assets/images/mine/integral/nav_back');
}
 .fixHeaderSecond .return{
     position: absolute;
     left: 0;
     top: 0;
     height: 1.1891891891891893rem;
     width: 1.1081081081081081rem;
     display: block;
     float: left;
     background-size: 57%;
     background-position: 0.3783783783783784rem 0.2702702702702703rem;
     .bg-image('../../assets/images/cart/nav_back');
}
 .fixHeaderOne{
     color: white;
     background:transparent ;
}
 .fixHeaderSecond{
     color: black;
     background: white ;
     border-bottom: 1px solid #EBE5E1;
}
 .fade-enter-active, .fade-leave-active {
     transition: opacity .3s ease;
}
 .fade-enter, .fade-leave-to 
/* .component-fade-leave-active for below version 2.1.8 */
 {
     opacity: 0;
}
 .bounce-enter-active {
    /*animation: back-in 0.5s;
     */
}
 .bounce-leave-active {
    /*animation: back-in 0.5s reverse;
     */
}
 @keyframes back-in {
    /*0% {
         background:rgba(255,255,255,0);
    }
     50%{
         background:rgba(255,255,255,0.5);
    }
     100% {
         background:rgba(255,255,255,1);
    }
     */
}
 
 
	
</style>