<template>
	<!--版本号弹窗提示-->
	<div id="confirm" v-if="isShowCase" @touchmove.prevent>
		<div class="layer"style="position: fixed;left: 0;top: 0;width: 100%;height: 100%;opacity: 0.5;background: #000;"></div>
		<div class="downloading">
			<div class="downloading-title" :class="isProgress?'active':''">新版本&nbsp;V{{verMes.VersionNumber}}<span v-show="!isProgress && !verMes.isUpdated" @click.prevent="toCancel"></span></div>
			<div class="downloading-content" v-show="!isProgress">
				<h5>新版本特性</h5>
				<ul>
					<li v-html="verMes.UpdateContent"></li>
				</ul>
				<div class="btn" @click.prevent="toUpdate">立即更新</div>
			</div>
			<!--下载中-->
			<div class="progress" v-show="isProgress">
				<div class="progress-bar"><progress :value=proValue max="100"></progress></div>
				<p>新版本正在努力更新中，请稍等</p>
			</div>
		</div>
		
	</div>
</template>

<script>
	var timer1 = null;
	import {mapGetters,mapState,mapActions} from 'vuex';
	
	export default{
		data(){
			return {
				isProgress:false,//版本号提示框显示
				proValue:dwProgress,//下载进度
				aaa:''
			}
		},
		created(){
			
		},
		computed:{
			 ...mapGetters([
                 'isShowCase',
                 'verMes'
                ]),
		},
		methods:{
			...mapActions([
				'reviseShowCase',
				'reviseVerMes'
			]),
			toCancel(){
				if(this.verMes.isUpdated){
					quit();
				}else{
					this.reviseShowCase(false)
				}
			},
			//更新
			toUpdate(){
				timer1 = setInterval(()=>{
			  		this.proValue = dwProgress;
			  		if (this.proValue==100) {
			  			clearInterval(timer1);
			  			this.isProgress = false;
			  		}
			  	},100)
				toUpdate();
				this.isProgress = true;
			},
		}
	}
</script>

<style lang="less" type="stylesheet/css" scoped>
	@import "../../common/index.less";
	/*版本号弹窗提示*/
	#confirm{
     position: fixed;
     left: 0;
     top: 0;
     bottom: 0;
     width: 100%;
     z-index: 999999;
}
/*.confirm{
     position: fixed;
     top: 50%;
     left: 50%;
     width: 85%;
     height: 3.5675675675675675rem;
     transform: translate3d(-50%, -50%, 0);
     background-color: #fff;
     border-radius: 0.08108108108108109rem;
     font-size: 0.43243243243243246rem;
     overflow: hidden;
     transition: 0.2s;
}
 .confirm .header{
     color: #333;
     font-size: 0.43243243243243246rem;
     font-weight: 700;
     text-align: center;
     padding: 0.40540540540540543rem 0 0;
}
 .confirm .content{
     padding: 0.2702702702702703rem 0.5405405405405406rem 0.40540540540540543rem;
     color: #999;
     text-align: center;
     line-height: 0.972972972972973rem;
     border-bottom: 1px solid #ddd;
}
 .confirm .btns{
     display: flex;
     height: 1.0810810810810811rem;
     line-height: 1.0810810810810811rem;
}
 .confirm .btns .button{
     width: 50%;
     border: none;
     border-right: 1px solid #ddd;
     outline: none;
     background-color: #fff;
     text-align: center;
}
 .confirm .btns .upd{
     display: block;
     width: 50%;
     border-right: 1px solid #ddd;
     text-align: center;
     color: #26a2ff;
}
 */
 .downloading{
     position: fixed;
     top: 50%;
     left: 50%;
     width: 85%;
     transform: translate3d(-50%, -50%, 0);
     background-color: #fff;
     border-radius: 0.1891891891891892rem;
     font-size: 0.43243243243243246rem;
     overflow: hidden;
     transition: 0.2s;
}
 .downloading .downloading-title{
     height: 1.3783783783783783rem;
     font-size: 0.4864864864864865rem;
     line-height: 1.3783783783783783rem;
     color: #fff;
     background-size: 100% 100%;
     text-align: center;
     margin-bottom: 0.5405405405405406rem;
     .bg-image('../../assets/images/home/EditionBG');
     span{
         display: block;
         width: 0.32432432432432434rem;
         height: 0.32432432432432434rem;
         .bg-image('../../assets/images/home/X');
         position: absolute;
         right:0.2702702702702703rem ;
         top: 0.2702702702702703rem;
         background-size:100% ;
    }
}
 .downloading .downloading-title.active{
     margin-bottom: 0.8648648648648649rem;
}
 .downloading .downloading-content{
     width: 100%;
     padding-left: 0.40540540540540543rem;
}
 .downloading .downloading-content h5{
     font-size: 0.43243243243243246rem;
     color: #1f1f1f;
     margin-bottom: 0.40540540540540543rem;
}
 .downloading .downloading-content ul{
     margin-bottom: 0.6486486486486487rem;
     li{
         font-size: 0.3783783783783784rem;
         color: #666;
         line-height: 0.6486486486486487rem;
    }
}
 .downloading .downloading-content .btn{
     width: 3.2432432432432434rem;
     height: 0.7837837837837838rem;
     background: #ff9102;
     color: #fff;
     font-size: 0.40540540540540543rem;
     line-height: 0.7837837837837838rem;
     text-align: center;
     margin: 0 auto;
     margin-bottom: 0.5675675675675675rem;
     border-radius: 0.40540540540540543rem;
}
 .progress .progress-bar{
     margin-bottom: 0.43243243243243246rem;
}
 .progress .progress-bar progress{
     display: block;
     width: 5.4324324324324325rem;
     height: 0.4594594594594595rem;
     border-radius: 0.21621621621621623rem;
     margin: 0 auto;
     background: #F5F5F5;
}
/*progress::-webkit-progress-inner-element {
     border-radius: 0.21621621621621623rem;
     text-shadow: 0.05405405405405406rem 0.05405405405405406rem #000;
}
 */
 progress::-moz-progress-bar {
     border-radius: 0.24324324324324326rem;
     background: -webkit-linear-gradient( left,#F9AA46,#FA8144);
}
 progress::-webkit-progress-value {
     border-radius: 0.24324324324324326rem;
     background: -webkit-linear-gradient( left,#F9AA46,#FA8144);
}
 progress::-webkit-progress-bar {
     border-radius: 0.21621621621621623rem;
     background: #F5F5F5;
     text-shadow: 0.05405405405405406rem 0.05405405405405406rem #000;
     box-shadow: 1px 1px rgba(0,0,0,0.35) inset;
}
 .progress p{
     font-size: 0.3783783783783784rem;
     color: #B2B2B2;
     text-align: center;
     margin-bottom: 0.8918918918918919rem;
}
 
</style>