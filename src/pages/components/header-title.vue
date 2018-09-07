<template>
		<div class="popularity_return" id="title">

            <span  class="return" @click.stop.prevent="goBack()"></span>
         
			<!-- 人气专场 -->
			<span id="title_name">{{title}}</span> 
            <template v-if="source =='myOrder'">
                <a href="#" class="information">
                    <i></i>
                    <label>9</label>
                </a>
            </template>
            <template v-if="source =='getCoupon'">
                <span class="getCoupon" @touchend="getCoupon">去领券</span>
            </template>
            <template v-if="source =='updateNikeName'">
                <span class="updateNikeName" @touchend="goConfirm">确定</span>
            </template>
            <template v-if="source =='electronicContract'">
                <span class="electronicContract" @touchend="electronicContract">电子合同</span>
            </template>
            <template v-if="source =='signature'">
              <span class="electronicContract" @touchend="addCompanySig">新增</span>
            </template>
            <!--  <template v-if="source =='toEvaluate'">
                <span class="updateNikeName" @click="submit">发布</span>
            </template> -->
            <template v-if="source =='newPresent'">
                <span class="updateNikeName">
                	<img src="../../assets/images/productDetails/share@3x.png" />
                </span>
            </template>
            <template v-if="source =='invitePoliteness'">
                <span class="updateNikeName">
                	<img src="../../assets/images/productDetails/share@3x.png" />
                </span>
            </template>

            <!-- 余额页面 mine/balance.vue-->
             <template v-if="source =='余额'">
              <span class="electronicContract" @touchend="showBalance">余额明细</span>
            </template>
		</div>
</template>
<script>
import getd from "../../vuex/getData.js";
import tool from "../../util/tool.js";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      // router:"/home",
      isRight: false
    };
  },
  props: {
    title: {},
    source: {
      //来源于我的订单页面，如有这个参数，则显示title右边的信息图标
      // type:String
    },
    // router:{
    //     type: String,
    // },
    name: {
      type: String
    },
    gochart: {}
    //           isRight:{
    //           	type:Boolean
    //           }
  },
  created() {
    // //console.log(this.source)
  },
  methods: {
    getCoupon() {
       
        this.$router.push("/mine/getCoupon");
       
      // //console.log("确定优惠的")
    },
    electronicContract() {
      
        this.$router.push("/electronicContract/electronicContract");
       
    },
    goBack() {
      if (tool.loadFromLocal("toOrder", "ALL")) {
        let infoo = tool.loadFromLocal("toOrder", "ALL");
        console.log("infoo", infoo);
        let current = infoo.backOrder;
        if (current == true && this.title == "订单详情") {
          if (window.localStorage.getItem("isAppInside") == "1") {
            // ,{"url":url,"type":type}
            this.$root.originData.newPage(
              `${gobleNetPort}/mine/toMyOrder`,
              "inout"
            );
          } else {
            this.$router.push("/mine/toMyOrder");
          }
        }
        if (current == true) {
          if (window.localStorage.getItem("isAppInside") == "1") {
            this.$root.originData.closePage();
          } else {
            this.$router.go(-1);
          }
        }
      } else if (this.title == "选择支付方式" && this.source == "false") {
        if (window.localStorage.getItem("isAppInside") == "1") {
          this.$root.originData.newPage(
            `${gobleNetPort}/mine/toMyOrder`,
            "inout"
          );
        } else {
          this.$router.push("/mine/toMyOrder");
        }
      } else if (this.title == "限时免费试用") {
       

        if (window.localStorage.getItem("isAppInside") == "1") {
          this.$root.originData.newPage(
            `${gobleNetPort}/home`,
            "inout"
          );
        } else {
          this.$router.push("/home");
        }


      } else {
        console.log("gggg-1");
        if (window.localStorage.getItem("isAppInside") == "1") {
          this.$root.originData.closePage();
        } else {
          this.$router.go(-1);
        }
      }
      // if(this.title == "企业实名认证"){
      //     this.$router.replace({"path":"/electronicContract/signature?type=company"});
      // }else if(this.title == "订单详情"){
      //     this.$router.replace({"path":"/mine/toMyOrder"});
      // }
      // else if(this.title == "公司签章选择"){
      //     // this.$router.replace({"path":"/mine/toMyOrder"});
      // }
      // else {

      // }

      // if(this.title == "优惠券"){
      //  	this.$router.push('/mine')
      // } else if(this.title == "领券中心"){
      // 	this.$router.push('/mine/coupon')
      // }else{
      // this.$router.go(-1);
      // }

      // if(this.title == "优惠券"){
      // 	this.$router.push('/mine')
      // }else if(this.title =='确认订单'){

      //     this.$router.push(window.localStorage.getItem('whichPage'))
      // }else if(this.title =='收货地址'){
      //     if(window.localStorage.getItem('AddressPage')=='/cart/comfirmOrder'){
      //         this.$router.push(window.localStorage.getItem('AddressPage'))
      //     }else if(window.localStorage.getItem('AddressPage')=='/mine'){
      //         this.$router.push('/mine/myInformation')
      //     }
      // }else if(this.title == "合同详情"){
      // 	//style:0,代表从合同详情页返回的
      // 	this.$router.replace({path:'/mine/toMyOrder/orderServering',query:{id:this.$store.state.mine.id,style:0}})
      // }else if(this.title == "订单详情"){
      // 	if(this.$route.query.style == 0){
      // 		this.$router.replace('/mine/toMyOrder')
      // 	}else{
      // 		this.$router.go(-1);
      // 	}
      // }else{
      // 	//确认订单 传值给父组件
      //     this.$emit("showProps",true );
      //     // 我的订单页面  传值给父组件
      //     console.log("当前页面",this.$router)
      // 	this.$router.go(-1);
      // }
    },
    //编辑客户昵称
    goConfirm() {
      //4-20个字符
      var reg = /([A-Za-z0-9-_]{4,20})|([\u4e00-\u9fa5]{2,10})|([\u4e00-\u9fa5][\w\W-]{2})/;
      if (reg.test(this.name)) {
        this.isRight = true;
      } else {
        this.isRight = false;
        Toast({
          message: "输入有误",
          duration: 2000
        });
      }
      if (this.name && this.isRight) {
        var mes = tool.loadFromLocal(
          "login_user_id",
          "login_user_id",
          "login_user_id",
          false
        );
        var params = {
          Nickname: this.name,
          Sex: this.$route.params.sex,
          modifyField: "Sex," + "Nickname"
        };
        getd.reviseCustomerInfo(params).then(res => {
          // //console.log(res);
          if (res.msg == "操作成功") {
            this.$router.push("/mine/myInformation");
          }
        });
      }
    },
    //新增公司个人签章
    addCompanySig() {
      this.$emit("addCompaySignature");
    },
    showBalance() {
      //打开余额明细表 mine/balance.vue
      console.log(" //打开余额明细表");
      this.$emit("balanceListWrap", true);
    }
  },
  computed: {}
};
</script>
<style type="text/css" lang="less" scoped>
@import "../../common/index.less";
#title {
  background: white;
}
.popularity_return {
  position: fixed;
  height: 1.1891891891891893rem;
  width: 100%;
  text-align: center;
  line-height: 1.162162162162162rem;
  font-size: 0.43rem;
  color: #1f1f1f;
  border-bottom: 1px solid #ebe5e1;
  top: -0.1px;
  // right: 0;
  left: 0;
  background: white;
  z-index: 999;
}
.return {
  padding-left: 0.40540540540540543rem;
  height: 100%;
  width: 1.0810810810810811rem;
  .bg-image("../../assets/images/tabBar/nav_back");
  background-size: 0.5405405405405406rem;
  background-position: 0.40540540540540543rem 0.24324324324324326rem;
  position: absolute;
  left: 0;
}
.return a {
  width: 100%;
  height: 100%;
  display: block;
}
// 消息图标样式
.information {
  width: 0.8108108108108109rem;
  height: 0.8108108108108109rem;
  display: none;
  float: right;
}
.information label {
  position: absolute;
  display: block;
  width: 0.4864864864864865rem;
  height: 0.4864864864864865rem;
  border-radius: 50%;
  text-align: center;
  line-height: 0.43243243243243246rem;
  background-color: #ff5000;
  color: #fff;
  -webkit-transform: scale(0.8);
  font-size: 0.2702702702702703rem;
  margin: -1.0810810810810811rem 0rem 0rem 0.40540540540540543rem;
  z-index: 999;
  float: right;
  // top: 0rem;
}
.information i {
  width: 0.7027027027027027rem;
  height: 0.7027027027027027rem;
  .bg-image("../.././assets/images/tabBar/messageS");
  background-size: 0.7027027027027027rem 0.7027027027027027rem;
  position: relative;
  top: 0.13513513513513514rem;
  margin-right: 0.5405405405405406rem;
}
.getCoupon {
  display: block;
  float: right;
  margin-right: 0.32432432432432434rem;
  color: #666;
  font-size: 0.40540540540540543rem;
}
.electronicContract {
  position: absolute;
  top: 0;
  right: 0.32432432432432434rem;
  //display: block;
  // float: right;
  // margin-right: 0.32432432432432434rem;
  color: #000;
  font-size: 0.36rem;
}
.updateNikeName {
  display: block;
  float: right;
  margin-right: 0.32432432432432434rem;
  color: #666;
  font-size: 0.40540540540540543rem;
}
.updateNikeName img {
  width: 0.6216216216216216rem;
  margin-top: 0.2702702702702703rem;
}
</style>
