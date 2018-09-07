<template>

	<div id="ylPay">
		<div class="payTitle">
			<span>银联交易进度</span>
			<span @touchend="closePay">关闭</span> 
		</div>
		<!-- 银联支付 --> 
	    <form action="https://api.wqbol.com/Payment/Unionpay?"  novalidate="novalidate"    class="form-horizontal" id="profile-form" method="get"  target="aliFrame" enctype="application/x-www-form-urlencoded">        
	         <input :value="this.$route.query.out_trade_no" name="orderId" id="orderId"  type="hidden">
	         <input :value="this.$route.query.bookkeepCurrency" name="bookkeepCurrency" id="bookkeepCurrency"  type="hidden">
	         <input :value="frontUrl" name="frontUrl" id="frontUrl"  type="hidden">
             <input :value="this.$route.query.cid" name="cid" id="cid"  type="hidden">
             <input :value="num" name="txnAmt" id="txnAmt"  type="hidden">
	    </form>

	   <iframe name="aliFrame"  id="aliFrame"></iframe> 

	</div>
</template>


<script>   
// window.frames.document.body.style.fontSize = 100 + 'px';  
export default { 
  mounted () {  
    //   console.log('是啊金斯安心享受我去看看吗',window.frames)
  	//自动提交表单
      this.ordBtnPayFn();
  },
  beforeRouteEnter(from,to,next){
      next();
  },
  data(){
	  return {
          frontUrl:'https://host.wqbol.com/success?orderNum='+this.$route.query.out_trade_no+'&actPrice='+this.$route.query.actPrice, //返回跳转地址
          num:this.$route.query.actPrice*100 , //价钱不能有小数点
          metaContent:'',//meta 标签
	  }
  },
  created(){
      this.$nextTick(()=>{ 
        // this.metaContent =   document.querySelector('meta[name=""]').getAttribute('content')
        // document.querySelector('meta[name="viewport"]').setAttribute('content','width=device-width','initial-scale=0, maximum-scale=0, minimum-scale=2, user-scalable=no')
      })
  },
  beforeDestroy(){
        // document.querySelector('meta[name="viewport"]').setAttribute('content', this.metaContent );
  },
  methods:{
   ordBtnPayFn(){
        //表单自动提交
         if(this.$route.query.out_trade_no && this.frontUrl){ 
            //  console.log(`https://api.wqbol.net/Payment/Unionpay?orderId=${this.$route.query.out_trade_no}&txnAmt=${this.num}&frontUrl=${this.frontUrl}`)
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
#ylPay{
     height: 100%;
     width: 100%;
     overflow: hidden;
     background: #FFF;
}
 .payTitle{
     height: 6.5%;
     width: 100%;
     background: #FFF;
     position: absolute;
     top: 0;
     left: 0;
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
         font-size:16px;
         // background: blue;
    }
}
 #aliFrame{
     height: 93.5%;
     width: 100%;
     position: relative;
     margin-top: 44px;
}
 
</style>
