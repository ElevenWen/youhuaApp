<template>
   <div id="transferSate">
    
   </div>
</template>

<script>
import   tool    from '../../util/tool'
	export default {
    data() {
      return {}
    },
    created(){
       
      /*第三方介入接口调用
       * 说明
       * type 从第三方获取的字段 
       * url 获取type后 通过url 直接传给后台即可
       *
       * 
      */
  

     
 
      //https://localhost:11000/transferState/transferState?flag=1
      function getQueryString(name) {
         var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
          var r = window.location.search.substr(1).match(reg);
          if (r != null) {
            return unescape(r[2]);
          }
          return null;
      }

 
       var _id = getQueryString('flag')
       // console.log(_id)
      // this.push.replace('/transferState/transferStateTemporary')
      // console.log('我要跳转')
      // var fff =  
      //   `https://apitest.xdaozwg.com/oauth/authorize?client_id=c1ebe4661cdc4bd3ab6977c3561b9dee&response_type=code&scope=base,phone,userinfo,companyinfo&state=1234&redirect_uri=https://host.wqbol.com/OpenPlatform/Callback/DaoWang?flag=${_id}`
      // console.log( fff )
      // 注意正式环境 https://apitest.xdaozwg.com/oauth/authorize?client_id=c1ebe4661cdc4bd3ab6977c3561b9dee&response_type=code&scope=base,phone,userinfo,companyinfo&state=1234&redirect_uri=https://api.wqbol.com/OpenPlatform/Callback/DaoWang?flag=${_id}
      // 测试环境  https://apitest.xdaozwg.com/oauth/authorize?client_id=c1ebe4661cdc4bd3ab6977c3561b9dee&response_type=code&scope=base,phone,userinfo,companyinfo&state=1234&redirect_uri=https://api.wqbol.com/OpenPlatform/Callback/DaoWang?flag=${_id}
        // client_id：8611d2cab79f432ea28446b8579bae0d
         location.href  = `https://app.xdaozwg.com/oauth/authorize?client_id=8611d2cab79f432ea28446b8579bae0d&response_type=code&scope=base,phone,userinfo,companyinfo&state=1234&redirect_uri=https://api.wqbol.com/OpenPlatform/Callback/DaoWang?flag=${_id}`
    },
  }

</script>


<style lang="less" type="stylesheet/css" scoped>
	 #transferSate{
     background-image: url('../../assets/images/transferState/transferBg.png');
     background-size: 88%;
     background-repeat: no-repeat;
     background-position: center;
     background-color: rgba(0,0,0,0.5) ;
}
 
</style>
