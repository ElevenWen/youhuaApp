<template>
   <div id="tranferStateTemporary">
     
   </div>
</template>

<script>
  import tool    from '../../util/tool'
  import store   from '../../vuex/mine/mine.js'
  import getd    from '../../vuex/getData.js'
  import CryptoJS from 'crypto-js'
  import * as types from '../../vuex/mutations_types.js'

	export default {
    data() {
      return {}
    },
    created(){
      /*第三方介入接口调用中转 截取accessCode 
       * 说明
       * flag 从第三方获取的字段 
       * 获取tflag后传给后台 获取跳转地址
       *
       * 
      */

       // https://localhost:11000/transferState/transferState?flag=1
      var accessCode = tool.getQueryString('accessCode')
      var flag = tool.getQueryString('flag')

      if(accessCode  && accessCode.length!= 0){ //用户是否通过第三方平台介入
        //解密 
        let bytes = CryptoJS.AES.decrypt(accessCode.toString(),'59964e5d540e446cf98bc2af78a2ea58');
        let decrytedData = (bytes.toString(CryptoJS.enc.Utf8).split('|')) // //解析对象 
        let params ={
              LoginName:decrytedData[1],
              Password:decrytedData[2],
              rememberMe:true,
              isBackLogin:true,
              returnUrl:"/home",
              datatype:"json"
            };
            if (tool.loadFromLocal('login_user_id','ALL')){ //删除原来的token 避免问题
              tool.removeLocal('login_user_id');
            }
            getd.getLogin(params)
            .then((res)=>{
              //保存本地
              tool.saveToLocal('login_user_id','login_user_id','login_user_id',res.data);
              // 同步 vuex
              store.commit(types.LOGIN, res.data.Token);
              // 登陆成功 跳转页面
              let  params = {
                'flag':flag
              }
              //获取跳转url
              getd.GetDaoWangAccessUrl(params).then((res)=>{
                console.log('OK' ,res)
                 this.$router.replace({"path": res.data.Url});
              }).catch((err)=>{
                console.log('baocuo ',err)
              })
            })
        }

 
    },
  }

</script>

<style lang="less" type="stylesheet/css" scoped>
   #tranferStateTemporary{
    background-image: url('../../assets/images/transferState/transferBg.png');
    background-size: 88%;
    background-repeat: no-repeat;
    background-position: center;
    background-color: rgba(0,0,0,0.5) ;
   }
</style>
