 <template>
	<div id="guidePage">
	<!-- @change="handleChange" -->
		<mt-swipe :auto="0" :continuous="false" >
			<mt-swipe-item>
				<img width="100%" height="100%" src="../../assets/Images/home/guidePage1.png" />
			</mt-swipe-item>
			<mt-swipe-item>
				<img width="100%" height="100%" src="../../assets/Images/home/guidePage2.png" />
			</mt-swipe-item>
			<mt-swipe-item>
				<img width="100%" height="100%" src="../../assets/Images/home/guidePage3.png" />
			</mt-swipe-item>
			<mt-swipe-item>
				<img width="100%" height="100%" src="../../assets/Images/home/guidePage4.png" />
				<span class="Tohome" @click="Tohome">立即体验</span>
			</mt-swipe-item>
		</mt-swipe>
		<span class="skip"  @click="Tohome">跳过</span>
	</div>
</template>

<script>
import Vue from 'vue';
export default {
	data() {
		return {
			
		}
	},
	beforeRouteEnter (to, from, next) {
		next()
//		getd.getVersion()
//		.then((res)=>{
//			version = res.data.Number;
			
			//引导页出现否
//			if(tool.loadFromLocal('version','version','version',false)){
//				if (res.data.Number != tool.loadFromLocal('version','version','version',false)) {
//					if (tool.loadFromLocal('count','count','count',false)==2) {
//						next({
//							path:'/home'
//						})
//					}
//				}else{
//					next({
//						path:'/home'
//					})
//				}
//			}else{
//				next()
//				tool.saveToLocal('count','count','count',1);
//			}
//		})
		
	},
	methods: {
		Tohome(){
//			this.commonTool.saveToLocal('version','version','version',version);
			this.$router.replace('/home');
		},
	}
}
		// handleChange(index) {
		// 	var but = document.getElementById("skip");
		// 	var h = document.documentElement.clientHeight,
  //         	mybody = document.getElementsByTagName('body')[0];
  //         	mybody.style.height = h + 'px';
  //         	//返回角度
	 //        function GetSlideAngle(dx,dy) {
  //   	        return Math.atan2(dy,dx) * 180 / Math.PI;
	 //        }
	 //        //根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动
	 //        function GetSlideDirection(startX,startY, endX, endY) {
	 //            var dy = startY - endY;
	 //            var dx = endX - startX;
	 //            var result = 0;
	 //            //如果滑动距离太短
	 //        	if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
	 //    	        return result;
	 //        	}
		//          var angle = GetSlideAngle(dx, dy);
		//          if (angle >= -45 && angle < 45) {
	 //    	        result = 4;
	 //        	}else if (angle >= 45 && angle < 135) {
		//             result = 1;
		//         }else if (angle >= -135 && angle < -45) {
	 //    	        result = 2;
	 //        	}else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
		//             result = 3;
		//         }
	 //    	    return result;
	 //        }
	 //        //滑动处理
	 //        if(index == 3){
	 //        	var startX, startY;
	 //        	mybody.addEventListener('touchstart', function (ev){
	 //         	ev.preventDefault();
		//             startX = ev.touches[0].pageX;
	 //            	startY = ev.touches[0].pageY;
		//         }, false);
		//         mybody.addEventListener('touchmove', function (ev){
	 //          		var endX, endY;
	 //          		ev.preventDefault();
	 //          		endX = ev.changedTouches[0].pageX;
	 //          		endY = ev.changedTouches[0].pageY;
	 //         		var direction = GetSlideDirection(startX, startY, endX, endY);
	 //        		switch (direction){
	 //          			case 0:
	 //            			////console.log("没动力")
	 //            		break;
	 //          			case 1:
	 //            			////console.log("向上")
	 //            		break;
	 //          			case 2:
	 //            			////console.log("向下")
		//             	break;
		//           		case 3:
		//           				but.click();
		//             	break;
		//           		case 4:
		//             		////console.log("向右")
		//             	break;
		//             default:          
		//         	} 
	 //      		}, false);
	 //        }
        	
		// }


</script>

<style lang="less" type="stylesheet/css" scoped>
#guidePage {
     width: 100%;
     height: 100%;
}
 .skip {
     position: fixed;
     z-index: 9999;
     background: rgba(220,220,220,0.34);
     height: 0.6486486486486487rem;
     line-height: 0.6486486486486487rem;
     width: 1.6216216216216217rem;
     border-radius: 0.2702702702702703rem;
     top: 0.4864864864864865rem;
     right: 0.6216216216216216rem;
     color: #FFF;
     text-align: center;
}
 .Tohome {
     height: 0.8918918918918919rem;
     width: 3.2972972972972974rem;
     display: block;
     z-index: 9999;
     text-align: center;
     line-height: 0.8648648648648649rem;
     border: 1px solid #FFF;
     color: #FFF;
     position: fixed;
     margin: 0 auto;
     left: 0;
     right: 0;
     bottom: 1.0810810810810811rem;
}
 
</style> 