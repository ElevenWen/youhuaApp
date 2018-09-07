<template>
  <div id="payMethodCheck">
  	<headerTitle  :title="title"   @showProps="showPropsFn"></headerTitle>

  	<div class="mainWrap">
  		<div><i class="icon"></i>支付方式<i></i></div>
  		<ul>
  			<li @touchend.stop.prevent="chooseMethods(items,index)"   v-for="(items,index) in methodsArr " >
  				<i class="icon"></i>{{items}} <span v-if="items == '余额'">:¥{{_balanceMoney}}</span><i :class="{check:index==check,uncheck:!(index==check)}"></i>
  			</li>
  		</ul>
  	</div>

    <div class="footPay">使用{{payTextDes}}￥2345.66</div>
  </div>
</template>

<script>

import headerTitle from '../components/header-title';
import { mapState,mapActions,mapGetters} from 'vuex';


export default {
	data(){
		return {
			title:"选择支付方式",
			methodsArr:["微信支付","支付宝支付","余额"],
			check:'-99',
			payTextDes: '支付宝支付'
		}
	},
	components:{
	   headerTitle,
	},
	computed:{
		...mapState(
			"comfirmOrder", ["pay"]
		),
		...mapGetters(
			"comfirmOrder", ["_balanceMoney"]
		),

		// _balanceMoney(){
		// 	//console.log(this.$store.state.comfirmOrder,'----------')
		// 	return this.$store.state.comfirmOrder.balanceMoney
		// }
	},
	methods:{
		...mapActions(
        "comfirmOrder",{
         	"payMethods_comfirmorder":"payMethods_comfirmorder",
         	"getBalance_comfirmorder":"getBalance_comfirmorder"
        }
    ),
		showPropsFn(childProps){
			//传值给父组件 的一个过渡
			//comfirm-order已经定义了
			 this.$emit("showProps",childProps );
		},
		chooseMethods(items,index){
			//改变选中状态
			this.check = index;
			if(index <=1){
				this.payTextDes = this.methodsArr[index];
			}else if(index =2){
				this.payTextDes = this.methodsArr[index] + '支付'
			}else{}
			
			this.$store.state.comfirmOrder.pay = items;
			//本地保存用户支付方式
			console.log('============payMethodCheck')
			this.commonTool.saveToLocal("_SETBILL","paymethod","payObj",items);
			
		}
	},
	created(){

		//支付方式-初始化 --- 在comfirmOrder 已经发起
		this.payMethods_comfirmorder().then((res)=>{
			this.methodsArr.forEach((items,index)=>{
			 	//this.pay vuex中后台返回的支付方式
		 		if(items == this.pay){
		 			this.check = index;
		 		}
			})
		});



		 // 获取余额
	    this.getBalance_comfirmorder().then(()=>{
	          //console.log(this,"获取余额获取余额获取余额")
	    })

	},
	mounted(){

	}
}


</script>


<style lang="less" type="stylesheet/css" scoped>
  @rem:46.875rem;

 	@import "../../common/index.less";
	#payMethodCheck{
		background: #EFEFF4;
		height: 90%;
		margin-top: 56px;
    .footPay{
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 100/@rem;
      background-image: linear-gradient(-90deg,
      #f95008 0%,
      #fe760a 100%),
      linear-gradient(
        #fa2802,
        #fa2802);
      text-align: center;
      line-height: 100/@rem;
      font-size: 15px;
      color: #ffffff;
    }
	}
	.mainWrap{
		margin-top: 12px;
		background: #fff;
	}
	.mainWrap>div{
		height: 35px;
		line-height: 35px;
		margin-left: 13px;
		.icon{
			width: 18px;
			height: 18px;
			margin-top: 9px;
			margin-right: 10px;
			.bg-image("../../assets/images/comfirm-order/payMethod");
			background-size: 18px;
			vertical-align: top;
		}
	}
	.mainWrap>ul{
		li{
			height: 45px;
			line-height: 44px;
			.border-1pxT(#EFEFF4);
			padding-left: 9px;
			&:nth-child(1){
				i{
						.bg-image("../../assets/images/comfirm-order/wxPay");
				}
			}
			&:nth-child(2){
				i{
						.bg-image("../../assets/images/comfirm-order/aliPay");
				}
			}
			&:nth-child(3){
				i{
						.bg-image("../../assets/images/comfirm-order/otherPay");
				}
			}
			&:nth-child(4){
				i{
						.bg-image("../../assets/images/comfirm-order/cT");
				}
			}
			i{
				width: 26px;
				height: 26px;
				display: inline-block;
				vertical-align: middle;
				margin-right: 9px;
				background-size: 26px;
				&.uncheck{
					background: none;
				}
				&.check{
					float:right;
					margin-right: 12px;
					margin-top: 12px;
					.bg-image("../../assets/images/comfirm-order/rightS");
				}
			}
		}

	}
</style>
