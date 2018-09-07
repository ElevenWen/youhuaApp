<template>
	<div id="unionBindLoding">
		<header-title title="微企宝" ></header-title>
		<div class="content">
      <img src="../../assets/images/mine/unionBind/unionLoding.gif" alt="">
      <p>努力加载中，请稍等</p>
		</div>
		
	</div>
</template>

<script>
import headerTitle from "../components/header-title";
import { Actionsheet, Toast, Indicator } from "mint-ui";
import store from "../../vuex/mine/mine.js";
import * as types from '../../vuex/mutations_types.js';
import tool from "../../util/tool.js";
import api from "../../vuex/getData";
//import axios from "axios";
//import CryptoJS from "crypto-js";
export default {
  data() {
    return {
      phone: "", //手机号
      noteCode: "", //验证码
      password: "", //密码
      isGet: true, //是否获取验证码
      isPhone: false, //判断手机号是否填写整缺
      isCode: false, //判断验证码是否填写整缺
      time: 45,
      nowCoutTime: 0,  //计时 
      APPID: 'wx238223a471f69798',  //正式环境公众号 appid
//      APPID: "wxce4d12348f8df94d", //测试地址  appid

      // select: '3e68cecd5b578503b788dad634480538' //正式环境 secret  key
      //select: '3e68cecd5b578503b788dad634480538'  //测试环境 secret  key

      code: "", //微信code
      openId: "",
      UnionId: '',
      state: "" //推荐码
    };
  },
  created() {
		this.isUnionBindPhone();

  },
  mounted() {},
  components: {
    headerTitle,
    Actionsheet
  },
  methods: {
 
    //微信授权code
    allowWeiboLogin() {
      const calbackUrl = "https://api.wqbol.com/Wx/back"; //正式环境
//      const calbackUrl = "https://api.wqbol.net/Wx/back"; //测试环境
     
    
      //获取code
      window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${
        this.APPID
      }&redirect_uri=${encodeURIComponent(
        calbackUrl
      )}&response_type=code&scope=snsapi_base&state=unionBindLoding`;
      //通知后台请求微信授权     
    },
   
    isUnionBindPhone() {
      if (location.href.indexOf("code") > 0) {
        this.code = tool.getQueryStringHash("code");

        //获取oppenid
        var OppenPamars = {
          code: this.code,
          state: window.localStorage.getItem("weiXin_stateRefCode")
            ? window.localStorage.getItem("weiXin_stateRefCode")
            : ""
        };
        api.get_WxGetUserOpenId(OppenPamars).then(res => {
          console.log("oppenid~~~", res);
          this.openId = res.data.openid;
          this.UnionId = res.data.unionid;
          var params = {
            unionid: res.data.unionid
          };
          //是否已关联
          api
            .get_WxGetLoginInfo(params)
            .then(res => {
              console.log("已关联账号密", res);
              //已关联 记住账号密码
              this.phone = res.data.name;
              this.password = res.data.pwd;
              //自动登录
              this.autoLogin();
            })
            .catch(err => {
              //未关联 先关联          
              console.log("未关联账号密", err);
              this.$router.push('/mine/unionBind')
            });
        });
      } else {
        //授权 code
        this.allowWeiboLogin();
      }
    },
 
    autoLogin() {
    
      var params = {
        LoginName: this.phone,
        Password: this.password,
        VerifyCode: '',
        openSSL: false,
        rememberMe: true,
        isBackLogin: true,
        returnUrl: "/home",
        datatype: "json"
			};

      api
        .getLogin(params)
        .then(res => {
          this.commonTool.saveToLocal(
            "login_user_id",
            "login_user_id",
            "login_user_id",
            res.data
					);
					
          store.commit(types.LOGIN, res.data.Token);
          if (res.data.LastLoginTime === null) {
            store.commit(types.FIRST, true);
					}
					//登录成功
				//	console.log("登录成功", res);
          this.$router.push("/home");
					
        })
        .catch(err => {
          console.log("自动登录失败", err);
        });
    },

  },

};
</script>

<style lang="less" type="stylesheet/css" scoped>
@rem: 75rem;

#unionBindLoding {
  width: 100%;
  min-height: 100%;
  padding-top: 1.19rem;
  background: #e9e9e9;
  .content{
    margin: 50% auto;
    text-align: center;
    img{
      width: 370/@rem;
	    height: 302/@rem;
    }
    p{
      font-size: 28/@rem;
    	color: #666666;
    }
  }
}
</style>