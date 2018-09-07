<style lang="less" scoped>
  @import "../../common/index.less";
  .messageWrap {
    // height: 6.986666666666666rem;
    background-color: white;
    margin-top: 1.4933333333333334rem;
  }
  .activyMessage {
    height: 1.7066666666666668rem;
    border-bottom: 0.02666666666666667rem solid #ebe5e1;
  }
  .amImg {
    display: inline-block;
    width: 0.6666666666666666rem;
    height: 0.6666666666666666rem;
    background-size: 0.6666666666666666rem 0.6666666666666666rem;
    margin: 0.5333333333333333rem 0 0 0.4rem;
    float: left;
  }
  .active {
    .bg-image("../../assets/images/mine/message/activeMessage");
  }
  .server {
    .bg-image("../../assets/images/mine/message/serverMessage");
  }
  .system {
    .bg-image("../../assets/images/mine/message/systemMessages");
  }

  .amWrap {
    display: inline-block;
    width: 65%;
    margin-left: 0.4rem;
  }
  .amTitle {
    font-size: 0.426667rem;
    font-weight: 600;
    margin-top: 0.26666666666666666rem;
  }
  .amDes {
    font-size:0.373333rem;
    color: #8c8c8c;
    margin-top: 0.24rem;
  }
  .right {
    width: 0.18666666666666668rem;
    height: 0.3466666666666667rem;
    .bg-image("../../assets/images/tabBar/right_arrow");
    background-size: 0.18666666666666668rem 0.3466666666666667rem;
    float: right;
    margin: 0.6933333333333334rem 0.32rem 0 0;
  }
  .msgNum {
    float: right;
    width: 0.48rem;
    height: 0.48rem;
    border-radius: 50%;
    background: rgb(250, 40, 2);
    color: white;
    text-align: center;
    line-height: 0.48rem;
    font-size: 0.32rem;
    margin: 0.64rem 0.32rem 0 0;
  }
  .kefu,._kefu{
    float: left;
  }
  ._kefu{
        margin-top: 0.613333rem;
  }
</style>
<template>
	<div id="message">
		<header-title title="消息中心"></header-title>
		<div class="messageWrap">
			<!-- 活动消息start -->
			<!-- <div class="activyMessage" @touchend="toActiveMessage" v-for="(items,index) in activeMsgData" v-if="index== 0">
				<div class="amImg active"></div>
				<div class="amWrap">
					<div class="amTitle">活动消息</div>
					<div class="amDes" v-if="index == 0">{{items.Title}}</div>
				</div>
				<span class="right"></span>
				<span class="msgNum" v-if="systemMsgData">{{systemMsgData.length}}</span>
				<span class="msgNum" v-else>0</span>
			</div> -->
			<!-- 活动消息end -->
			<!-- 服务消息start -->
			<!-- <div class="activyMessage" @touchend="toServerMessage" v-for="(items,index) in serverMsgData" v-if="index== 0">
				<div class="amImg server"></div>
				<div class="amWrap">
					<div class="amTitle">服务消息</div>
					<div class="amDes">{{items.Title}}</div>
				</div>
				<span class="right"></span>
				<span class="msgNum" v-if="serverMsgData">{{serverMsgData.length}}</span>
				<span class="msgNum" v-else>0</span>
			</div> -->
			<!-- 服务消息end -->
      <!-- 客服消息start -->
			<!-- v-for="(items,index) in systemMsgData" v-if="index== 0" -->
			<div class="activyMessage" @click.stop="customerService" >
				<div class="amImg system kefu"></div>
				<div class="amWrap">
					<div class="amTitle _kefu">在线客服</div> 
				</div>
				<span class="right"></span>
				<!-- <span class="msgNum" v-if="systemMsgLeng==undefined">0</span> -->
			 
			</div>
			<!-- 客服消息end-->
			<!-- 系统消息start -->
			<!-- v-for="(items,index) in systemMsgData" v-if="index== 0" -->
			<div class="activyMessage" @click.stop="toSystemMessage" >
				<div class="amImg system"></div>
				<div class="amWrap">
					<div class="amTitle">系统消息</div>
					<div class="amDes" v-if="systemMsgData.length>0">{{systemMsgData[0].Title}}</div>
					<div class="amDes" v-else>您还没有消息喔</div>
				</div>
				<span class="right"></span>
				<!-- <span class="msgNum" v-if="systemMsgLeng==undefined">0</span> -->
				<span class="msgNum">{{systemLength}}</span>
			</div>
			<!-- 系统消息end-->
		</div>
	</div>
</template>
<script>
import headerTitle from "../components/header-title";
import { mapState, mapActions, mapGetters } from "vuex";
import getd from "../../vuex/getData.js";
import tool from "../../util/tool";
export default {
  data() {
    return {
      systemMsgData: [],
      systemLength: 0 //未读消息的长度
    };
  },
  components: {
    headerTitle
  },
  computed: {
    ...mapState("message", {
      systemMsgLeng: "systemMsgLeng"
    })
  },
  created() { 
    console.log(this.$route.query)
    let length = window.sessionStorage.getItem("_systemLength_") || 0;
    this.systemLength = this.systemMsgLeng === 0 ? length : this.systemMsgLeng;
    this.systemMsgData = tool.loadFromLocal(
      "_systemMessage",
      this.getToken(),
      "data",
      false
    );
  },
  methods: {
   customerService(){
      //	window.open('https://html.ecqun.com/kf/sdk/openwin.html?corpid=7331675&cstype=rand&mode=0&cskey=SqGFFE7Glw76x6szdw&scheme=0')
      this.$router.push('/userChatSever')
		},
    toActiveMessage() {
      //跳转到活动消息页面
      this.$router.push("/message/activeMessage");
      // 本地存储  把活动消息的数据存起来  以便activeMessage取出使用
      var localstorage = tool.saveToLocal(
        "_activeMessage",
        this.getToken(),
        "data",
        this.activeMsgData
      );
    },
    toServerMessage() {
      //跳转到服务消息页面
      this.$router.push("/message/serverMessage");
    },
    toSystemMessage() {
      //跳转到系统消息页面
      this.$router.push("/message/systemMessage");
      // 本地存储  把系统消息的数据存起来  以便systemMessage取出使用
      var localstorage = tool.saveToLocal(
        "_systemMessage",
        this.getToken(),
        "data",
        this.systemMsgData
      );
    }
  }
};
</script>