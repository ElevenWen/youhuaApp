<template>
  <div  >
	 <div id="findFriendPay">
		<header-title title="发起代付请求"></header-title>
		<header>
			<img  src="@/assets/images/comfirm-order/daifu@3x.png" alt="">
			<p >
				通过微信、QQ、分享链接等方式请求好友代付，即可让您的好友为您买单！
			</p>
			<div class="headerTitleWrap">
				<p class="headerTitle">
					<span >应付：</span>
					<span class="themeC  nowPrice">{{onlogin_data.Amount | formatPrice |currency}}<b style="font-weight: normal;font-size: 0.5405405405405406rem ;">{{onlogin_data.Amount| formatPriceX}}</b></span>
				</p>
			</div>
		</header>
		<main>
			<form action="" id="payForm">
				<div>捎句话呗：</div>
				<textarea name="" ref="textareaDom" @input.stop="textareaChange"  v-model="textareaData" maxlength="80" placeholder="亲，江湖告急，帮忙付个款，滴水之恩，定当涌泉相报"></textarea>
				<span class="fontLen">{{textareaLen}}/80</span>
			</form>
			
			<div class="submitPay" @click="openActionsheet">请好友帮我付款</div>
		</main>
		


		<footer >
			说明：</br>
			1.付款前请和好友再次确认，避免遇到诈骗行为；</br>
			2.如果发生退款，已支付金额将原路退回付款人；</br>
		</footer>

	 </div>


	<!-- 二维码弹框 -->
	<!-- <CodeDialog> -->
	<div  @click="closeShowCode">微信弹框临时按钮</div>
    <div class="codeDialogWrap" v-show='showCode'>
      <div class="codeDialog">
        <div class="chacha" @click="closeShowCode">
        </div>
		<div id="QR_code">
			<div class="QR_code">
			</div>
		</div>
        <!-- <img :src="ab" alt=""> -->
        <p>使用微企宝App/微信扫码帮我支付</br>
          二维码在<span class="themeC">{{onlogin_data.EndTime | formatDate }}</span>前有效，超时重新申请
        </p>
      </div>
    </div>
	<!-- </CodeDialog> -->

	<!-- 底部自定义弹窗 -->
	<div class="dialogWrap" v-show="dialogWrapShow" @click="cancelBtn">
		<div class="dialog">
			<p class="hrDom">———————— 分享到 ————————</p>
			<ul  >
				<li  class="items" v-for="(items, index ) in itemsData" :key="index"  @click.stop="qqBtn(items)">
					<p>{{items}}</p>
				</li>
			</ul>
		<div class="cancelBtn" @click="cancelBtn">取消</div>
		</div>
	
	</div>
	<!--  -->
		<!-- <mt-actionsheet
		:actions="actions" cancelText=""
		v-model="sheetVisible">
		</mt-actionsheet> -->

		<!-- 微信右上角 -->
	<div id="img" @touchend.stop="closeIsOpen"  @touchmove.prevent v-show="isOnApp==false" @click="isOnApp = true"><img src="../../assets/images/cart/corner@3x.png"/></div>
 
 </div>
</template>

<script>
import headerTitle from '../components/header-title';
import  tool from "../../util/tool";
import { mapState,mapActions,mapGetters} from 'vuex'; 
// import { Actionsheet } from 'mint-ui';
import QRCode from 'qrcodejs2';
import Vue from 'vue';



export default {
	data(){
		return {
			title:"交易详情",
			money:"",
			ab :require('@/assets/images/comfirm-order/defeated@3x.png'), 	
			showCode:false,//是否弹出二维码
			sheetVisible:false,
			actions: [{  
				name: '拍照',  
				method : this.getCamera// 调用methods中的函数  
			}, {  
				name: '从相册中选择',   
				method :this.getLibrary// 调用methods中的函数  
			}],
			isOpen:false,
			isOnApp: false,
			textareaData:'',//留言
			textareaLen:'24',//长度
			dialogWrapShow:false,//是否显示弹窗
			// itemsData:['微信好友','QQ好友','二维码','复制链接'],
			itemsData:['微信好友','QQ好友','二维码'],
			
			
		}
	},
	components:{
		headerTitle,
	},
	beforeRouteEnter: (to, from, next) => {  
			 next(vm => { 
				//微信分享
				vm.handleWX(vm);
			})

	},		
	created(){   
		if(tool.is_app()){
			this.isOnApp = true;
		}
		// 获取订单信息
		 
		let params ={
			orderNum: this.$route.query.orderNum
		};
		this.REQUEST_DATA_MYORDER_ONLOGIN(params).then(()=>{
			console.log(this.onlogin_data)
		})
	},
	computed:{
        ...mapState("comfirmOrder", { 
		   onlogin_data:'REQUEST_DATA_MYORDER_ONLOGIN_DATA',
		   LEAVE_MESSAGE_DATA:'LEAVE_MESSAGE_DATA'
        }), 
    },
	methods:{
		handleWX(self){
			Vue.prototype.WXshare(
				'快来帮我付款' ,
				self.textareaData || '亲，江湖告急，帮忙付个款，滴水之恩，定当涌泉相报',
				'https://host.wqbol.com/shareLogo.png',
				`https://host.wqbol.com/helpFriendPay?orderNum=${this.$route.query.orderNum}&actPrice=${this.$route.query.actPrice}&flag=help`
			);
			Vue.prototype.QQshare(
				'快来帮我付款' ,
				self.textareaData || '亲，江湖告急，帮忙付个款，滴水之恩，定当涌泉相报',
				'https://host.wqbol.com/shareLogo.png', 
				`https://host.wqbol.com/helpFriendPay?orderNum=${this.$route.query.orderNum}&actPrice=${this.$route.query.actPrice}&flag=help`
			);
		},
		...mapActions( 
			'comfirmOrder',{ 
				REQUEST_DATA_MYORDER_ONLOGIN:'REQUEST_DATA_MYORDER_ONLOGIN',//免登录获取订单信息
				LEAVE_MESSAGE:'LEAVE_MESSAGE',//代付留言
			}
		),
		closeShowCode(){
			this.showCode = !this.showCode;
			document.body.style.overflow = Boolean(this.showCode)  ?'hidden'  : 'visible'; 
			document.getElementById("QR_code").innerHTML = "";
		},
		openActionsheet(){//打开弹框
		//    暂时跳转联动
		// this.$router.push({path:'/helpFriendPay',query:{'orderNum':this.$route.query.orderNum}})
			//原生判断 
			if(tool.is_weixn()){ 
					//微信分享
					this.handleWX(this);
					//微信提示用户右上角
					this.isOpen = true;
					return
			}

			if(tool.is_ios() || tool.is_android()){ 
				this.dialogWrapShow = true;
			}  
		},
		 
		cancelBtn(){
			this.dialogWrapShow = false;
			this.showCode = false;
		 
			
		},
		textareaChange(value){
			this.textareaLen = value.target.value.length; 
		},
		weixinBtn(){ 
		},
		qqBtn(val){
			this.showCode = false;

			switch(val){
				case '微信好友':  
				  
					let params1 = {
						orderNum:this.$route.query.orderNum, 
						content: this.textareaData || '亲，江湖告急，帮忙付个款，滴水之恩，定当涌泉相报'
					};
					console.log('dd' ,params1)
					//留言调用
					this.LEAVE_MESSAGE(params1).then(()=>{
						/**
						 * 打开分享操作列表
						 * @param {Object} bussType_param 业务类型 必填 业务类型枚举类 BusinessTypeEnum
						 * @param {Object} bussId_param 业务Id 必填
						 * @param {Object} title_param 标题 必填
						 * @param {Object} content_param 内容 必填
						 * @param {Object} img_param 图片 可选 格式:album/20150725123555_519.JPG,不需要加图片域名
						 * @param {Object} href_param 链接 可选,格式:'https://wanrenhui.com'
						*/ 
							var obj = [{
									id: "weixin",
									ex: "WXSceneSession"
								}, {
									id: "weixin",
									ex: "WXSceneTimeline"
								},
								{
									id: "qq"
							}]

						wrhShare().sendShareCustom(
							'weixin',
							"WXSceneSession",
							"原生活动",//bussType_param, bussId_param, title_param, content_param, img_param, href_param
							"000000",
							'快来帮我付款' ,
							this.textareaData || '亲，江湖告急，帮忙付个款，滴水之恩，定当涌泉相报',
							'https://host.wqbol.com/shareLogo.png',
							`https://host.wqbol.com/helpFriendPay?orderNum=${this.$route.query.orderNum}&actPrice=${this.$route.query.actPrice}&flag=help`
						);
					}).catch(()=>{
						//alert('请重新刷新')
					})
					
					
					 

				break;

				case 'QQ好友': 
					 
					let params2 = {
						orderNum:this.$route.query.orderNum, 
						content: this.textareaData || '亲，江湖告急，帮忙付个款，滴水之恩，定当涌泉相报'
					}
					console.log('dd' ,params2)
					//留言调用
					this.LEAVE_MESSAGE(params2).then(()=>{
						/**
						 * 打开分享操作列表
						 * @param {Object} bussType_param 业务类型 必填 业务类型枚举类 BusinessTypeEnum
						 * @param {Object} bussId_param 业务Id 必填
						 * @param {Object} title_param 标题 必填
						 * @param {Object} content_param 内容 必填
						 * @param {Object} img_param 图片 可选 格式:album/20150725123555_519.JPG,不需要加图片域名
						 * @param {Object} href_param 链接 可选,格式:'https://wanrenhui.com'
						*/
				
							var obj = [{
										id: "weixin",
										ex: "WXSceneSession"
									}, {
										id: "weixin",
										ex: "WXSceneTimeline"
									},
									{
										id: "qq"
									}]

						wrhShare().sendShareCustom(
							'qq',
							"",
							"原生活动",//bussType_param, bussId_param, title_param, content_param, img_param, href_param
							"000000",
							'快来帮我付款' ,
							this.textareaData || '亲，江湖告急，帮忙付个款，滴水之恩，定当涌泉相报',
							'https://host.wqbol.com/shareLogo.png',
							`https://host.wqbol.com/helpFriendPay?orderNum=${this.$route.query.orderNum}&actPrice=${this.$route.query.actPrice}&flag=help`
						)
						
					}).catch(()=>{
						//alert('请重新刷新')
					})


					
			 
				break;
				case '二维码': 
				var  dpr = document.documentElement.getAttribute('data-dpr');
				var sizeS = 0
				if(dpr <2){
					sizeS = 110;
				}else if(dpr <=2){
					sizeS = 220;
				}else{
					sizeS = 370;
				}
				console.log(sizeS)
				document.getElementById("QR_code").style.width = sizeS+'px';
				var qrcode = new QRCode(document.getElementById("QR_code"), { 
					// text: `https://192.168.1.215:12000/helpFriendPay?orderNum=${this.$route.query.orderNum}&actPrice=${this.$route.query.actPrice}&flag=help`,//环境
				    text: `https://host.wqbol.com/helpFriendPay?orderNum=${this.$route.query.orderNum}&actPrice=${this.$route.query.actPrice}&flag=help`,//环境					
				    width:sizeS,
				    height: sizeS,
				    colorDark : "#000000",   
				    colorLight : "#ffffff",
				    correctLevel : QRCode.CorrectLevel.H,
				});
 

				this.showCode = true;
				this.dialogWrapShow = false;
				let params3 = {
					orderNum:this.$route.query.orderNum, 
					content: this.textareaData || '亲，江湖告急，帮忙付个款，滴水之恩，定当涌泉相报'
				}
				console.log('dd' ,params3)
				//留言调用
				this.LEAVE_MESSAGE(params3).then(()=>{
					//this.
					console.log(this.LEAVE_MESSAGE_DATA,'LEAVE_MESSAGE_DATA')
					//this.$router.push({path:'/helpFriendPay',query:{'orderNum':this.$route.query.orderNum}})
					
				})
				break;
				case '复制链接':
				console.log('复制链接')
				
				break;
			}
		 
		},
		closeIsOpen(){//关闭微信指示
			this.isOpen = false;
		}

		 
	},
	filters:{
      formatPrice (value) {
        return   tool.formatPrice(value) ;
      },
      formatPriceX:value =>{
        return tool.formatPriceX(value) ;
      },
      currency :value =>   {
        return tool.currency(value);
	  },
	  formatDate:value =>{
		  if(!value) return; 
		//   value = parseInt(value.replace(/\D/g, ""));
		   var _value  = value.replace(/\D/g,"") 
		   return tool.formatDate(_value,"yyyy-MM-dd");
	  }
    }
}
 

</script>

<style lang="less" type="stylesheet/css" scoped>
	@import "../../common/index.less";
	#findFriendPay{
     position: absolute;
     height: 100%;
     top:0;
     width: 100%;
     overflow-y: scroll;
     header img{
         width:100%;
         height:4.1891891891891895rem ;
    }
}
 header{
     background: white;
     line-height: 0.4864864864864865rem;
     .fs13;
     padding:0rem 0rem 0.35135135135135137rem 0rem ;
     >p{
         margin-top:0.2702702702702703rem;
         padding:0.24324324324324326rem 0.35135135135135137rem 0rem 0.35135135135135137rem ;
    }
}
 .headerTitleWrap{
}
 .headerTitle{
     text-align: center;
     margin: 0 auto;
     margin-top: 0.6216216216216216rem;
     // min-width: 4.054054054054054rem;
     span:nth-child(1){
         font-size: 0.3783783783783784rem;
    }
     span:nth-child(2){
         .themeC;
         font-size: 0.6216216216216216rem;
         color: #fa2802;
    }
}
 main{
     margin-top:0.32432432432432434rem;
}
 #payForm{
     background: white;
     padding: 0 0.32432432432432434rem 0.2702702702702703rem 0.32432432432432434rem ;
     .cfB2;
     div{
         color:black;
    }
     div{
         background: white;
         line-height: 0.8918918918918919rem;
    }
     textarea{
         resize:none;
         height: 2.7027027027027026rem;
         width: 100%;
         padding:0.24324324324324326rem 0.16216216216216217rem 0.24324324324324326rem 0.16216216216216217rem ;
         border:1px solid #ebe5e1;
         .c(#999999);
    }
     .fontLen{
         float: right;
         margin-top: -0.5405405405405406rem;
         position: relative;
         margin-right: 0.2702702702702703rem;
    }
}
 .submitPayWrap{
     background: transparent;
}
 .submitPay{
     height: 1.0810810810810811rem;
     line-height: 1.0810810810810811rem;
     color: white;
     text-align: center;
     font-size: 0.4594594594594595rem;
     margin:0.8108108108108109rem 0.32432432432432434rem 0;
     background: linear-gradient(to bottom, #f95008, #fc7303 98% , #ffffff 100%);
}
 footer{
     padding-left: 0.35135135135135137rem;
     margin-top: 0.6756756756756757rem;
     .cf6;
     line-height: 0.6216216216216216rem;
}
 .codeDialogWrap{
     position: fixed;
     top:0;
     width: 100%;
     height: 100%;
     background: rgba(0,0,0, 0.32);
     .codeDialog{
		 //二维码支付 
		 position: relative;
         top:25%;
         // border:1px solid red;
         margin: 0 0.7567567567567568rem;
         padding-top:0.9459459459459459rem;
         padding-bottom:0.5405405405405406rem;
         background:white;
         text-align: center;
         @media only screen and (-webkit-min-device-pixel-ratio: 1.0), only screen and (min-device-pixel-ratio: 1.0) {
             margin: 0 0.3783783783783784rem;
        }
         p{
			 padding-top:0.533333rem;
			 line-height: 0.6216216216216216rem;
			 font-size: 0.346667rem;
        }
         img{
             width: 5.621621621621622rem;
        }
         .chacha{
             position: absolute;
             background-repeat: no-repeat;
             top: -0.8918918918918919rem;
             right: 0;
             background-size: 100%;
             color: white;
             width: 0.6756756756756757rem;
             height: 0.9459459459459459rem;
             .bg-image('../../assets/images/comfirm-order/chacha');
        }
    }
     img{
         width: 100%;
         height: 100%;
    }
}
 input:focus, textarea:focus {
     outline: none;
}
 // 弹框 
 .dialogWrap{
     position: absolute;
     height: 100%;
     width: 100%;
     background: rgba(0, 0, 0, 0.32);
     bottom: 0;
}
 .dialog{
     position: absolute;
     bottom: 0;
     left:0;
     right: 0;
     background: #f7f7f7;
     text-align: center;
     .hrDom{
         line-height: 1;
         padding: 0.6486486486486487rem 0 ;
         margin-bottom: 0.16216216216216217rem;
    }
     ul{
         display: flex;
         margin-bottom: 1.2972972972972974rem;
    }
     li{
         flex:1 1 25%;
         padding-top:1.6216216216216217rem;
         text-align: center;
         background-size: 1.3513513513513513rem 1.3513513513513513rem;
         background-position: 50% 0%;
         &:nth-child(1){
             .bg-image('../../assets/images/mine/register/wechat');
        }
         &:nth-child(2){
             .bg-image('../../assets/images/mine/register/QQ');
        }
         &:nth-child(3){
             .bg-image('../../assets/images/mine/register/erweima');
        }
         &:nth-child(4){
             .bg-image('../../assets/images/mine/register/link');
        }
         p{
             font-size: 0.35135135135135137rem 
        }
    }
     .cancelBtn{
         background-color: white;
         line-height: 1.3513513513513513rem;
         font-size: 0.4594594594594595rem;
    }
}
 //二维码 
 #QR_code{
     margin: 0 auto;
}
 //提示微信右上角 
 #img{
     width: 100%;
     position: fixed;
     left: 0;
     top: 0;
     bottom: 0;
     background: #000000;
     opacity: 0.76;
     z-index: 999;
}
 #img img{
    position: absolute;
    right: 0.1333rem;
    width: 4.1066rem;
    height: 2.48rem;
    margin: 0.1066rem 0.9333rem 0 0;
}
 
</style>
