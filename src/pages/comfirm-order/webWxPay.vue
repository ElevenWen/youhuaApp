<template>
	<!-- 微信支付 -->  
	<div id="wxpay">
		<!-- <div class="payTitle">
			<span>微信交易进度</span>
			<span @touchend="closePay">关闭</span> 
		</div>
		
	   <iframe name="wxFrame"  id="wxFrame"  :src='paySrc'> 
	   </iframe>  -->



		<form :action="action" src="" frameborder="0"></form>
	</div>
</template>

<script>

 

export default {
  data() {
    return {
		   paySrc:"https://api.wqbol.com/Payment/ProductsJson?out_trade_no="+this.$route.query.out_trade_no,
		   action:"https://api.wqbol.com/Payment/ProductsJson?out_trade_no="+this.$route.query.out_trade_no
    }
  }, 
  created(){
 
	  
  },
  methods:{ 
   closePay(){
     	//返回我的订单界面
     	this.$router.replace({"path":"/success","query":{
			  orderNum: this.$route.query.out_trade_no,
              actPrice: this.$route.query.actPrice,
			  flag:this.$route.query.flag
		 }}); 
    }
  } 
}

</script>



<style lang="less" type="stylesheet/css" scoped>
#wxpay{
     height: 100%;
     width: 100%;
     overflow: hidden;
     background: #FFF;
}
 .payTitle{
     height: 6.5%;
     width: 100%;
     background: #FFF;
     position: relative;
     line-height: 1;
     text-align: center;
     >span:nth-child(1){
         padding-top:3%;
         display: block;
         font-size: 0.4864864864864865rem;
    }
     >span:nth-child(2){
         position: absolute;
         right:0;
         top:0;
         width: 15%;
         padding-top:4%;
         height: 100%;
         line-height: 100%;
         // background: blue;
    }
}
 #wxFrame{
     height: 93.5%;
     width: 100%;
}
 
</style>
