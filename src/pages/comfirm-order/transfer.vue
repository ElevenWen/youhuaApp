<template>
  <div id="transfer">
	<headerTitle  :title="title"></headerTitle>
    <div class="mainWrap" v-show="false">
    	<div class="header">
    		<p class="themeC">¥ 2560.00</p>
    		<p  class="">订单金额</p>
    	</div>
		<div class="contentWrap">
			<ul class="content">
				<li  class="cf8C">
					<span>订单编号：</span><span>121212121</span><span class="copy"><strong>复制</strong></span>
				</li>
				<li class="cf8C">
					<span>收款方：</span><span>深圳市微企宝计算机系统有限公司 </span>
				</li>
				<li class="cf8C">
					<span>开户行：</span><span>建设银行</span>
				</li>
				<li class="cf8C">
					<span>账号：</span><span class="cDefault">121212121</span>
				</li>
			</ul>
		</div> 
		<div class="goBack">
			返回
		</div>
		<div class="brief">请转账到以上账户,并在转账备注栏注明订单编号,以便平台进行核对</div>
    </div>
	
	<div class="anotherPayWrap"> 
		<div class="wxWrap">
			<!-- <img :src="ab" alt="">
			 --><p class="themeC">¥ 2560.00</p>
		</div> 
		<div class="goBack">
			返回
		</div>
		<div class="brief">请分享此二维码给您要代付的朋友,以完成支付环节</div>
    </div>

  </div>
</template>

<script>

import headerTitle from '../components/header-title';

export default {
	data(){
		return {
			title:"公司转账",
			// ab : require('@/assets/images/test.png'), 	
		}
	},
	components:{
	   headerTitle,
	},
}
 

</script>

<style lang="less" type="stylesheet/css" scoped>
 @import "../../common/index.less";
 // 公司转账
 #transfer{
     background: #fff;
     height: 100%;
}
 .mainWrap{
     padding: 0.1px 0.5405405405405406rem;
}
 .header{
     text-align: center;
     margin-top: 0.8108108108108109rem;
     padding-bottom: 0.8108108108108109rem;
     .border-1pxB(#efeff4);
     p:nth-child(1){
         font-size: 0.6756756756756757rem;
    }
     p:nth-child(2){
         margin: 0 auto;
         margin-top: 0.2702702702702703rem;
    }
}
 .contentWrap{
     padding-top: 0.2702702702702703rem;
}
 .content li{
     margin-top: 0.16216216216216217rem;
     .copy{
         .border-1px(#8C8C8C);
         height: 0.43243243243243246rem;
         line-height: 0.35135135135135137rem;
         padding:0 0.13513513513513514rem;
         float: right;
         strong{
             .font11;
        }
    }
}
 .goBack{
     margin-top: 4.054054054054054rem;
     background: linear-gradient(to right, #FC7303, #F95008);
     text-align: center;
     .c(#fff);
     height: 1.135135135135135rem;
     line-height: 1.135135135135135rem;
     font-size: 0.40540540540540543rem;
}
 .brief{
     margin-top: 0.40540540540540543rem;
     font-size: 0.35135135135135137rem;
     .cf8C;
}
 //找人代付 
 .anotherPayWrap{
     padding:0 0.5405405405405406rem;
     .goBack{
         margin-top: 3.5135135135135136rem;
    }
}
 .wxWrap{
     padding-top:0.8108108108108109rem;
     img{
         display: block;
         margin:0 auto;
         width: 3.7837837837837838rem;
         height: 3.7837837837837838rem;
    }
     >p{
         height: 0.5135135135135135rem;
         line-height:0.5135135135135135rem;
         margin-top: 0.5405405405405406rem;
         text-align: center;
         font-size: 0.6216216216216216rem;
         font-weight: bold;
    }
}
 
</style>
