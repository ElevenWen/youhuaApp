<template>
	<div id="unionBind">
		<header-title title="联合登录绑定" ></header-title>
		<div class="content">
			<div class="des">关联后，您的微信账号和手机号账户都可以登录</div>
			<div class="fromWrap">
				<form>
					<div>
						<span class="text">手机号</span>
						<input type="number"  placeholder="输入手机号码" v-model="phone" @blur="verifyP" @input="sliceValue"/>
					</div>
					<div class="verification">
						<span class="text">验证码</span>							
						<input type="text" maxlength="6" placeholder="输入验证码" v-model="noteCode" @blur="verifyM"/>
						<span class="getVerification" @click.stop.prevent="getVerification" v-if="isGet" >获取验证码</span>
						<span class="getVerification" style="color:#999999" v-if="!isGet">重新获取{{time}}s</span>
					</div>																					
				</form>
			</div>
			<div class="registDes">
				若你输入的手机号未注册，将为您直接注册，注册即视为同意
				<span @click="goAgreement">《微企宝用户注册协议》</span>
			</div>
		</div>
		<div class="bindBtn" @click="submitBindApp" :class="{active: phone && noteCode }">关联</div>
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
      //APPID: "wxce4d12348f8df94d", //测试地址  appid
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
    //注册协议
    goAgreement() {
      this.$router.push("/mine/agreement");
    },
    //验证手机号
    verifyP() {
      if(!this.phone){
        return
      }
      var status = this.commonTool.regularJudgement("phone", this.phone);
      if (status) {
        this.isPhone = true;
      } else {
        this.isPhone = false;
      }
    },
    //判断验证码
    verifyM() {
      if(!this.noteCode){
        return
      }
      var status = this.commonTool.regularJudgement("noteCode", this.noteCode);
      if (status) {
        this.isCode = true;
      } else {
        this.isCode = false;
      }
    },
    //获取验证码
    getVerification() {
      var timer = null;
      if (this.isPhone) {
        this.isGet = false;
        var params = {
          mobile: this.phone
        };
        api.getVerification(params).then(res => {
          Indicator.close();
        });
        //倒计时45s
        timer = setInterval(() => {
          if (this.time == 1) {
            this.time = 45;
            clearInterval(timer);
            this.isGet = true;
          } else {
            this.time--;
          }
        }, 1000);
      } else {
        return;
      }
    },
    //微信授权code
    allowWeiboLogin() {
      const calbackUrl = "https://api.wqbol.com/Wx/back"; //正式环境
    
      //获取code
      window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${
        this.APPID
      }&redirect_uri=${encodeURIComponent(
        calbackUrl
      )}&response_type=code&scope=snsapi_base&state=unionBind`;
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
          //记录用户推荐记录
            var pamars2 = {
              openid: res.data.openid,
              RefCode: window.localStorage.getItem("weiXin_stateRefCode")
            };
            api
              .get_NewBindCusAndRefCode(pamars2)
              .then(res => {
                console.log("推荐成功", res);
              })
              .catch(err => {
                console.log("推荐失败", err);
              });
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
            });
        });
      } else {
        //授权 code
        this.allowWeiboLogin();
      }
    },
    submitBindApp() {
      if(!this.phone || !this.noteCode){
        return
      }
      var binParams = {
        type: 1,
        openId: this.UnionId,
        //openId: 'oVa9D07U0VgA3uep_DkKqMtktYdE',
        accessToken: "WQB_MockAccessToken",
        LoginName: this.phone,
        VerifyCode: this.noteCode,
        datatype: "json"
      };
      api
        .bindApp(binParams)
        .then(res => {

          if (res.data.LastLoginTime === null) {
            store.commit(types.FIRST, true);  //解决是否最新用户  首页弹窗问题
					}
          Toast({
            message: "关联成功！",
            position: "middle",
            duration: 2000
          });
          //获取账号密码 自动登录
          var wxParams = {
            unionid: this.UnionId
          };
          api.get_WxGetLoginInfo(wxParams).then(res => {
            //已关联 记住账号密码
            this.phone = res.data.name;
            this.password = res.data.pwd;
            //自动登录
            //this.autoLogin();
          });
        })
        .catch(err => {
          Toast({
            message: err.data.msg,
            position: "middle",
            duration: 2000
          });
        });
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
          
					//登录成功
				//	console.log("登录成功", res);
          this.$router.push("/home");
					
        })
        .catch(err => {
          console.log("自动登录失败", err);
        });
    },
    sliceValue(){
      if(this.phone.length>11)this.phone = this.phone.slice(0,11)
    }
  },
  destroyed() {
   
    this.sendWxSQTime = null;
  }
};
</script>

<style lang="less" type="stylesheet/css" scoped>
@rem: 75rem;

#unionBind {
  width: 100%;
  min-height: 100%;
  padding-top: 1.19rem;
  background: #fff;
  .content {
    width: 100%;
    .des {
      padding: 0 25 / @rem;
      width: 100%;
      height: 90 / @rem;
      line-height: 90 / @rem;
      background-color: #f6f6f6;
      font-family: PingFang-SC-Medium;
      font-size: 28 / @rem;
      color: #999999;
    }
    .fromWrap {
      padding: 0 25 / @rem;
      width: 100%;
      form {
        div {
          width: 100%;
          height: 100 / @rem;
          position: relative;
          input {
            padding-left: 150 / @rem;
            padding-right: 160 / @rem;
            border: none;
            border-bottom: 1px solid #ebe5e1;
            height: 100 / @rem;
            width: 100%;
            outline: none;
            /*解决ios input默认阴影*/
            -webkit-appearance: none;
          }
          .text {
            position: absolute;
            top: 32%;
            left: 0;
            font-size: 32 / @rem;
            color: #1f1f1f;
          }
        }
        .verification {
          .getVerification {
            position: absolute;
            right: 0;
            top: 40%;
            color: #30a1f8;
            font-size: 26 / @rem;
          }
        }
      }
    }
    .registDes {
      padding: 30 / @rem 25 / @rem;
      font-family: PingFang-SC-Medium;
      font-size: 28 / @rem;
      line-height: 40 / @rem;
      color: #666666;
      span {
        color: #30a1f8;
      }
    }
  }
  .bindBtn {
    margin: 0 auto;
    margin-top: 80 / @rem;
    width: 670 / @rem;
    height: 80 / @rem;
    line-height: 80 / @rem;
    text-align: center;
    background-color: #B2B2B2;
    background-blend-mode: normal, normal;
    border-radius: 2px;
    font-size: 34 / @rem;
    color: #ffffff;
  }
  .active{
    background-image: linear-gradient(-90deg, #f95008 0%, #fc7303 100%),
      linear-gradient(#d5d5d5, #d5d5d5);
  }
}
</style>