<template>

	<div id="alipay">
		<div class="payTitle">
			<span>支付宝交易进度</span>
			<span @touchend="closePay">关闭</span> 
		</div>
		<!-- 阿里巴巴支付 --> 
	    <form action="https://api.wqbol.com/Payment/SubmitAlipay"  novalidate="novalidate"    class="form-horizontal" id="profile-form" method="post"  target="aliFrame" enctype="application/x-www-form-urlencoded"   >        
	         <input :value="this.$route.query.out_trade_no" name="out_trade_no" id="out_trade_no"  type="hidden">
	         <input :value="this.$route.query.bookkeepCurrency" name="bookkeepCurrency" id="bookkeepCurrency"  type="hidden">
	         <input :value="this.$route.query.cid" name="cid" id="cid"  type="hidden">
	    </form>

	   <iframe name="aliFrame"  id="aliFrame"></iframe> 

	</div>
</template>


<script> 
export default { 
  mounted () {  
  	//自动提交表单
  	this.ordBtnPayFn();
  },
  methods:{
   ordBtnPayFn(){
        //表单自动提交
        //  if(this.$route.params.out_trade_no && this.$route.params.total_fee){ 
        // 	 document.getElementById("profile-form").submit();
		//  }
         if(this.$route.query.out_trade_no){ 
        	 document.getElementById("profile-form").submit();
         }
     }, //生成订单 END
     closePay(){
     	//返回我的订单界面 
     	this.$router.replace({"path":"/success","query":{
			  orderNum: this.$route.query.out_trade_no,
              actPrice: this.$route.query.actPrice,
			  flag:this.$route.query.flag
		 }});  
     }
  },
}

</script>



<style lang="less" type="stylesheet/css" scoped>
#alipay{
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
         font-size: 20px;
    }
     >span:nth-child(2){
         position: absolute;
         right:0;
         top:0;
         width: 15%;
         padding-top:4%;
         height: 100%;
         line-height: 100%;
         font-size: 16px;
         // background: blue;
    }
}
 #aliFrame{
     height: 93.5%;
     width: 100%;
}
 
</style>
