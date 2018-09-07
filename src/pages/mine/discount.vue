<style lang="less">
	#discount{
     height: 100%;
     background: #fff;
}
 // 倒计时 
 .timer{
     padding-top: 2rem;
     color: rgb(102,102,102);
     margin-left: 37%;
     font-weight: 600;
}
 .timeNumber{
     margin-top: 0.40540540540540543rem;
     margin-left: 32%;
}
 .timeNumber span{
     display: inline-block;
     width: 0.8108108108108109rem;
     height: 0.8108108108108109rem;
     background: rgb(62,62,62);
     color: white;
     border-radius: 0.13513513513513514rem;
     font-size: 0.4864864864864865rem;
     text-align: center;
     line-height: 0.8108108108108109rem;
}
 // 专享价
  .discountPrice{
     width: 90%;
     height: 6.756756756756757rem;
     margin: 0.9459459459459459rem 0.40540540540540543rem 0.5405405405405406rem 0.4864864864864865rem;
     background-color: rgb(241,241,241);
     border-radius: 0.13513513513513514rem;
}
 .nowPrice{
     font-size: 0.5405405405405406rem;
     font-weight: 600;
     color: rgb(250,40,2);
     padding: 0.6756756756756757rem 0 0.1891891891891892rem 32%;
}
 .prePrice{
     font-size: 0.40540540540540543rem;
     color: rgb(140,140,140);
     margin-left: 38%;
}
 .prePrice span{
     text-decoration:line-through;
}
 .productWrap{
     padding-top: 1.2432432432432432rem;
     div{
         display: inline-block;
         margin-left: 0.40540540540540543rem;
         img{
             width: 2.4324324324324325rem;
             height: 2.4324324324324325rem;
        }
         span{
             display: block;
             text-align: center;
        }
    }
}
 // 加入购物车 
 .addShoppingCar{
     width: 90%;
     height: 1.1081081081081081rem;
     margin: 0.8108108108108109rem 0.5405405405405406rem 0.5405405405405406rem 0.5405405405405406rem;
     background-image: linear-gradient(-90deg, rgba(249, 80, 8, 1) 0%, rgba(252, 115, 3, 1) 100%), linear-gradient( rgba(152, 94, 50, 1), rgba(152, 94, 50, 1));
     border-radius: 0.10810810810810811rem;
     color: #fff;
     font-size: 0.43243243243243246rem;
     text-align: center;
     line-height: 1.1081081081081081rem;
}
 .detail{
     width: 90%;
     color: #666666;
     margin: 0 0.5405405405405406rem;
     line-height: 0.5405405405405406rem;
}
 
</style>
<template>
	<div id="discount">
		<header-title title="老用户限时专享"></header-title>
		<!-- 倒计时start -->
		<div class="timer">限时专享倒计时</div>
		<div class="timeNumber">
			<span ref="hour" id="hour"></span>&nbsp：
			<span ref="minutes" id="minutes"></span>&nbsp：
			<span ref="second" id="second"></span>
		</div>
		<!-- 倒计时end -->
		<!-- 专享价start -->
		<div class="discountPrice">
			<div class="nowPrice">专享价&nbsp¥2500</div>
			<div class="prePrice">原价&nbsp <span>¥3500</span></div>
			<div class="productWrap">
				<div class="first">
					<img src="../../assets/images/tabBar/1151002.png">
					<span>公章</span>
				</div>
				<div class="second">
					<img src="../../assets/images/tabBar/1151002.png">
					<span>深圳公司注册</span>
				</div>
				<div class="third">
					<img src="../../assets/images/tabBar/1151002.png">
					<span>公司注销</span>
				</div>
			</div>
		</div>
		<!-- 专享价end -->
		<!-- 加入购物车start -->
		<div class="addShoppingCar">加入购物车</div>
		<div class="detail">此专享页面关闭后将不能再次进入，请尽快加入购物车，以防错过购买时机。</div>
		<!-- 加入购物车end -->
	</div>
</template>
<script>
import headerTitle from '../components/header-title';
export default {
	data(){
		return {
			
		}
	},
	components:{
		headerTitle,
	},
	mounted(){
		//疯狂秒杀-- --格式化时间
		var timerMiao = setInterval(function() {
			//保持2位数
			function toTwo(x) {
				var x = x < 10 ? ("0" + x) : x
				return x
			}
			var x11 = miaosha();
			var timeS = toTwo(x11.s);
			var timeM = toTwo(x11.fen);
			var timeH = toTwo(x11.h);
			if(x11.h == 0  && x11.fen ==0  && x11.s==0) {
				clearInterval(timerMiao);
			}
			var hour = document.getElementById("hour");
			var minutes = document.getElementById("minutes");
			var second = document.getElementById("second");

			hour.innerText=timeH;
			minutes.innerText=timeM;
			second.innerText=timeS;
		}, 1000)

	//格式化时间 miaosha()
		function miaosha() {
			// var daojishi = Number(new Date().getTime() + 24*60*60*1000-1000);
			var daojishi = 3690430008405;
			// 当前时间
			var nowTime = new Date().getTime();
			var cha = new Date(daojishi - nowTime)
			if(cha >= 0) {
				var obj = {
					// 秒转换为分   秒 == 秒/60 取余
					//分 = 秒 /60 取整
					//时 = 分/60 取整
					"s": Math.floor(cha / 1000 % 60),
					"fen": Math.floor(cha / 1000 / 60 % 60),
					"h": Math.floor(cha / 1000 / 60 / 60 % 24)
				}
			} else {
				var obj = {
					"s": 0,
					"fen": 0,
					"h": 0
				}
			}
			return obj
		}
	}
}	
</script>
