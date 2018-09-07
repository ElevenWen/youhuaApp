<template>
	<div id="unionBindBefor">
		<div class="contenWrap">
			<img src="../../assets/images/mine/unionBind/bg_01@2x.jpg" alt="" class="one">
			<img src="../../assets/images/mine/unionBind/bg_02@2x.jpg" alt="" class="two">
			<img src="../../assets/images/mine/unionBind/bg_03@2x.png" alt="" class="three">
			<img src="../../assets/images/mine/unionBind/bg_04@2x.jpg" alt="" class="four">

			<div class="btn" @click="">{{btnTxet}}</div>

			<div class="phoneShow">
				<!-- <img src="../../assets/images/mine/unionBind/wqbgzh_Test.jpg" alt=""> -->
        <img src="../../assets/images/mine/unionBind/wqbgzh.jpg" alt="">
				<span>关注公众号</span>
				<p>领取新人大礼包</p>
			</div>
		</div>
    <div v-if="!isWXBrowerOpen" class="WXBrowerOpenPopu">
      <img src="../../assets/images/mine/unionBind/wx_tsPuop@2x.png" alt="">
    </div>
	</div>
</template>

<script>
import tool from "../../util/tool.js";
//import axios from "axios";
import api from "../../vuex/getData";
import Vue from 'vue';

export default {
  data() {
    return {
      APPID: 'wx238223a471f69798',  //正式环境公众号 appid

//      APPID: "wxce4d12348f8df94d", //测试地址  appid

      isWXBrowerOpen: false,  //是否是微信浏览器内打开
      btnTxet: "扫下方二维码领取",
      account: "",
      code: "",
      oppenId: "",
      access_token: ""
    };
  },
  beforeRouteEnter(to,from,next){
    //判断是否是手机Q 登录
    var params = {
      params:{
        type:1,//pc 成为0  app 为1
        code:'GG00101'
      }
    };
    next(vm=>{
      //获取缩略图
      api.getHomeBanner(params)
        .then((res) => {

          if(location.hash){
            //解决app 二次刷新问题  存在则表示用app

            var currenthDate = res.data.list;
            currenthDate.forEach((items,index,tempCurrenthDate)=>{
//                    if(items.DataDictionaryName == '/activity/invitePoliteness'){//newPresent 分享内容 //invitePoliteness 分享内容
              if(items.Describe == '/activity/newPresent'){//newPresent 分享内容 //invitePoliteness 分享内容
                vm.ActivityEndTime =tool.formatDate(items.ActivityEndTime.replace(/[\/Date(]|[)\/)]/g, ''),'yyyy年MM月dd日');


                vm.ActivityStartTime = tool.formatDate(items.ActivityStartTime.replace(/[\/Date(]|[)\/)]/g, ''),'yyyy年MM月dd日');
                vm.ActivityAmount = items.ActivityAmount
                Vue.prototype.QQshare(items.LinkName.substring(0,items.LinkName.length-1)   ,items.Remark,items.ThumbImgURL,items.LinkWebSite);
                Vue.prototype.WXshare(items.LinkName.substring(0,items.LinkName.length-1)   ,items.Remark,items.ThumbImgURL,items.LinkWebSite);


                vm.activityMes =items;

              }
            })
          }else{
            if(to.path !== location.pathname  ){
              location.replace(location.origin+to.fullPath);
            }else{
              var currenthDate = res.data.list;
              //console.log( currenthDate ,"微信数据问题");
              currenthDate.forEach((items,index,tempCurrenthDate)=>{
                if(items.Describe == '/activity/newPresent'){//newPresent 分享内容 //invitePoliteness 分享内容
//                  if(items.DataDictionaryName == '/activity/invitePoliteness'){//newPresent 分享内容 //invitePoliteness 分享内容
                  vm.ActivityEndTime =tool.formatDate(items.ActivityEndTime.replace(/[\/Date(]|[)\/)]/g, ''),'yyyy年MM月dd日');

                  vm.ActivityStartTime = tool.formatDate(items.ActivityStartTime.replace(/[\/Date(]|[)\/)]/g, ''),'yyyy年MM月dd日');
                  vm.ActivityAmount = items.ActivityAmount

                  Vue.prototype.QQshare(items.LinkName.substring(0,items.LinkName.length-1)   ,items.Remark,items.ThumbImgURL,items.LinkWebSite);
                  Vue.prototype.WXshare(items.LinkName.substring(0,items.LinkName.length-1)   ,items.Remark,items.ThumbImgURL,items.LinkWebSite)


                  next(vm=>{
                    vm.activityMes = items;
                  })
                }
              })
            }
          }
        },(error)=>{
//          alert("请重新刷新页面")
        });
    })
  },

  beforeCreate() {},
  created() {
    this.getWxAccess_token();
  },
  methods: {
    allowWeiboLogin() {
       //是否使用微信打开
      var ua = navigator.userAgent.toLowerCase();
      if(ua.match(/MicroMessenger/i)=="micromessenger") {
        //微信浏览器
        this.isWXBrowerOpen = true;

          const calbackUrl = "https://api.wqbol.com/Wx/back"; //正式环境
//      const calbackUrl = "https://api.wqbol.net/Wx/back"; //测试环境 46db2f0e-e03b-4727-ab43-bef6525aee0d

        if (location.href.indexOf("Account") > 0) {
          this.account = tool.getQueryStringHash("Account");
          window.localStorage.setItem("weiXin_stateRefCode", this.account);
          console.log("二维码分享页推荐码：", this.account);
          //获取code

          window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${
            this.APPID
          }&redirect_uri=${encodeURIComponent(
            calbackUrl
          )}&response_type=code&scope=snsapi_base&state=unionBindBefor`;
        } else {
          this.account = ''
          window.localStorage.setItem("weiXin_stateRefCode", this.account);
          console.log("二维码分享页推荐码：", this.account);
          //获取code

          window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${
            this.APPID
          }&redirect_uri=${encodeURIComponent(
            calbackUrl
          )}&response_type=code&scope=snsapi_base&state=unionBindBefor`;
        }

        return "weixin";
        
      } else if (ua.match(/QQ/i) == "qq") {
          //QQ浏览器
          return "QQ";
      }else if(ua.match(/AlipayClient/i) == 'alipayclient'){
          //支付宝
          return "Alipay";
      }else{
        console.log("其他浏览器")
      }	
    
     
    },
    //通过code  stata  获取oppenid
    getWxAccess_token() {

      if (location.href.indexOf("code") > 0) {
         this.isWXBrowerOpen = true; //重置跳转回来code情况
        this.code = tool.getQueryStringHash("code");
        this.account = window.localStorage.getItem("weiXin_stateRefCode");
        console.log("二维码分享页推荐码：", this.account);
        

        var OppenPamars = {
          code: this.code,
          state: this.account
        };
        api
          .get_WxGetUserOpenId(OppenPamars)
          .then(res => {
            console.log("oppenid~~~", res);
            //记录用户推荐记录
            var pamars = {
              openid: res.data.openid,
              RefCode: this.account
            };
            api
              .get_NewBindCusAndRefCode(pamars)
              .then(res => {
                console.log("推荐成功", res);
              })
              .catch(err => {
                console.log("推荐失败", err);
              });
          })
          .catch(err => {
            console.log("获取oppenid报错", err);
          });
      } else {
        //授权 code
        this.allowWeiboLogin();
      }

     
    }
  }
};
</script>

<style lang="less" type="stylesheet/css" scoped>
@rem: 75rem;

#unionBindBefor {
  width: 100%;
  min-height: 100%;
  background-color: #e8415b;
  .contenWrap {
    position: relative;
    font-size: 0;
    img {
      min-width: 100%;
    }
    .btn {
      position: absolute;
      top: 563 / @rem;
      left: 175 / @rem;
      width: 400 / @rem;
      height: 80 / @rem;
      line-height: 80 / @rem;
      text-align: center;
      font-size: 36 / @rem;
      color: #ffffec;
      background-image: linear-gradient(
          0deg,
          #f5a800 0%,
          #feb800 48%,
          #fcd44c 100%
        ),
        linear-gradient(#fff2bd, #fff2bd);
      background-blend-mode: normal, normal;
      box-shadow: 0px 7 / @rem 5 / @rem 0px rgba(250, 69, 62, 0.3),
        0px 7 / @rem 15 / @rem 1px rgba(228, 94, 66, 0.68);
      border-radius: 20px;
    }
    .phoneShow {
      position: absolute;
      top: 860 / @rem;
      left: 130 / @rem;
      width: 210 / @rem;
      text-align: center;
      img {
        width: 190 / @rem;
        height: 190 / @rem;
      }
      span {
        font-size: 24 / @rem;
        line-height: 50 / @rem;
        color: #333333;
      }
      p {
        font-size: 30 / @rem;
        font-weight: bold;
        color: #e8425a;
      }
    }
  }
  .WXBrowerOpenPopu{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.7);
    img{
      position: absolute;
      top: 0;
      right: 0;
      width: 546/@rem;
      height: 274/@rem;
    }
  }
}
</style>