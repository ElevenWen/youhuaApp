<style type="text/css" lang="less" scoped>
@import "../../common/index.less";
@import "./messageIcon.less";
</style>
<template>
	<div>
		<template v-if="source=='mine'">
			<span class="information1" >
        <img src="../../assets/images/tabBar/messageNew@3x.png" class="mesImg" @touchend="my_message"/>
		    <span class="cartPoint" v-if="systemMsgLeng>0"></span>
        <!-- <a  class="first1" href="https://dut.zoosnet.net/LR/Chatpre.aspx?id=DUT46021401&lng=cn" _target='_blank'></a> -->
				<!-- <span @click="customerService"></span>
				<span class="point" v-if="systemMsgLeng>0">·</span>
				<span class="second1" @touchend="my_message"></span> -->
				<!-- <label v-if="systemMsgData.length>0">·</label> -->
			</span>
		</template>
		<template v-else-if="source=='cart'">
		  	<span class="cart">
		        <img src="../../assets/images/tabBar/messageNewS@3x.png" class="mesImg" @touchend="my_message"/>
		        <span class="cartPoint" v-if="systemMsgLeng>0"></span>
		    </span>
		</template>
    	<template v-else-if="source=='discover'">
		  	<span class="cart">
		        <img src="../../assets/images/tabBar/messageNewS@3x.png" class="mesImg" @touchend="my_message"/>
		        <span class="cartPoint" v-if="systemMsgLeng>0"></span>
		    </span>
		</template>
		<template v-else-if="source=='home'">
         <span @touchend="my_message" class="richscan richscanRight">
           <img src="../../assets/Images/tabBar/messageNewImg@3x.png" class="erweima" >
           <span class="cartPoint" v-if="systemMsgLeng>0">
             <span></span>
           </span>
        </span>
		</template>
    <template v-else-if="source=='home2'">
         <span @touchend="my_message" class="richscan richscanRight">
           <img src="../../assets/Images/tabBar/messageNewSImg@3x.png" alt="" class="erweima" >
           <span class="cartPoint" v-if="systemMsgLeng>0"></span>
        </span>
		</template>
		<template v-else>
			<span class="information" v-if="source!='mine'">
        
        <!-- <a  class="first1" href="https://dut.zoosnet.net/LR/Chatpre.aspx?id=DUT46021401&lng=cn" _target='_blank'></a> -->
				<span class="first"  @click="customerService"></span>
				<span class="point" v-if="systemMsgLeng>0"></span>
				<span class="second" @touchend="my_message"></span>
				<!-- <label v-if="systemMsgData.length>0">·</label> -->
			</span>
		</template>
	</div>
</template>
<script type="text/javascript">
import { mapState, mapActions, mapGetters } from "vuex";
import tool from "../../util/tool";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      Length: 0 //有本地存储消息时后台推送的消息
    };
  },
  props: {
    source: {
      //来源于我的页面
      type: String
    }
  },
  created() {
    // 判断客户是否登录
    if (this.getToken()) {
      this.system_msg();
    } else {
      return;
    }
  },
  activated() {
    // 判断客户是否登录
    if (this.getToken()) {
      this.system_msg();
    } else {
      return;
    }
  },
  computed: {
    ...mapState("message", {
      systemMsgData: "systemMsgData",
      serverMsgData: "serverMsgData",
      activeMsgData: "activeMsgData",
      systemMsgLeng: "systemMsgLeng"
    })
  },
  methods: {
    ...mapActions("message", {
      system_msg: "system_msg",
      server_msg: "server_msg",
      active_msg: "active_msg"
    }),
    my_message() {
      let that = this;
      //跳转到消息页面
      // var  _activeMsgData = tool.saveToLocal("_activeMessage",this.getToken(),"data",this.activeMsgData);
      // var  _serverMessage = tool.saveToLocal("_serverMessage",this.getToken(),"data",this.serverMsgData);
      // 如果本地有数据  则把数据加到后台返回的数组里 一起存进本地
      this.Length = this.systemMsgData.length;
      console.log('sb写老师很慢',this.systemMsgData )
      var hadData = tool.loadFromLocal(
        "_systemMessage",
        this.getToken(),
        "data",
        false
      );

      if (hadData && hadData.length === this.Length) {
       
        this.$router.push({
          path: "/message",
          query: { length: that.systemMsgLeng }
        });
      } else {
        // 本地没有数据的时候则直接存后台返回的数据
        tool.saveToLocal(
          "_systemMessage",
          this.getToken(),
          "data",
          this.systemMsgData
        );
       
        this.$router.push({
          path: "/message",
          query: { length: that.systemMsgLeng }
        });
      }
    },
    customerService() {
      //联系客服
      // console.log('客服')
      window.open(
       // "https://html.ecqun.com/kf/sdk/openwin.html?corpid=7331675&cstype=rand&mode=0&cskey=SqGFFE7Glw76x6szdw&scheme=0"
        this.$router.push('/userChatSever')
      );
      //跳转限时优惠页面
      // this.$router.push("/mine/customerService");
    }
  }
};
</script>