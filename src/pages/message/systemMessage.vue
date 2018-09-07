<style lang="less" scoped>
  @import "../../common/index.less";
  /*头部样式*/
  #title {
     background: white;
}
 .popularity_return {
     position: fixed;
     height: 1.1891891891891893rem;
     width: 100%;
     text-align: center;
     line-height: 1.162162162162162rem;
     font-size: 0.4864864864864865rem;
     color: #1f1f1f;
     border-bottom: 1px solid #ebe5e1;
     top: 0;
     right: 0;
     left: 0;
     background: white;
     z-index: 999;
}
 .return {
     padding-left: 0.40540540540540543rem;
     height: 1.0810810810810811rem;
     width: 0.6486486486486487rem;
     .bg-image("../../assets/images/tabBar/nav_back");
     background-size: 100%;
     background-position: 0.40540540540540543rem 0.24324324324324326rem;
     position: absolute;
     left: 0;
}
 .return a {
     width: 100%;
     height: 100%;
     display: block;
}
 #title_name {
     text-align: center;
     float: left;
     width: 100%;
}
 #submit {
     padding-right: 0.40540540540540543rem;
     position: absolute;
     right: 0;
     top: 0;
     font-size: 0.40540540540540543rem;
     color: rgb(102, 102, 102);
     padding-right: 0.40540540540540543rem;
}
/*消息*/
 .atMsgWrap {
     background: white;
     margin: 1.5135135135135136rem 0.32432432432432434rem 0.32432432432432434rem 0.32432432432432434rem;
     border: 1px solid rgb(235, 229, 225);
     border-radius: 0.05405405405405406rem;
}
 .atMsgWrap1 {
     background: white;
     margin: 0.32432432432432434rem;
     border: 1px solid rgb(235, 229, 225);
     border-radius: 0.05405405405405406rem;
}
 .titleWrap {
     height: 1rem;
}
 .titleImg {
     float: left;
     width: 0.40540540540540543rem;
     height: 0.40540540540540543rem;
     .bg-image("../../assets/images/mine/message/unread");
     background-size: 0.40540540540540543rem 0.40540540540540543rem;
     margin: 0.2972972972972973rem 0 0 0.2972972972972973rem;
}
 .titleImg1 {
     float: left;
     width: 0.40540540540540543rem;
     height: 0.40540540540540543rem;
     .bg-image("../../assets/images/mine/message/read");
     background-size: 0.40540540540540543rem 0.40540540540540543rem;
     margin: 0.2972972972972973rem 0 0 0.2972972972972973rem;
}
 .title1 {
     font-size: 0.40540540540540543rem;
     font-weight: 600;
     margin-left: 0.2972972972972973rem;
     line-height: 1rem;
}
 .timer {
     font-size: 0.32432432432432434rem;
     color: rgb(102, 102, 102);
     margin-left: 0.2972972972972973rem;
}
 .contentWord {
     margin: 0.2702702702702703rem 0.4594594594594595rem 0rem 0.2972972972972973rem;
     padding-bottom: 0.2702702702702703rem;
     font-size: 0.40540540540540543rem;
     font-weight: 600;
     line-height: 0.5675675675675675rem;
     border-bottom: 1px solid rgb(235, 229, 225);
}
 .details {
     color: rgb(48, 161, 248);
     padding: 0.2702702702702703rem 0 0.2702702702702703rem 0.2972972972972973rem;
}
 .toRight {
     float: right;
     width: 0.1891891891891892rem;
     height: 0.35135135135135137rem;
     .bg-image("../../assets/images/tabBar/right_arrow");
     background-size: 0.1891891891891892rem 0.35135135135135137rem;
     margin-right: 0.2702702702702703rem;
}
 // 清空后 
 .empty {
     margin-top: 4.054054054054054rem;
     margin-left: 26%;
}
 .empty img {
     width: 75%;
}
 .empty span {
     display: block;
     margin: 0.5405405405405406rem 0 0 0.4864864864864865rem;
     color: #818181;
}
 .mint-msgbox-wrapper .mint-msgbox {
     width: 60%;
}
 
</style>
<template>
	<div id="serverMessage">
		<!-- 头部start -->
		<div class="popularity_return" id="title">
            <span  class="return" @click="goBack()"></span>
			<span id="title_name">系统消息</span>
			<span id="submit" @click.stop="delData(arr,arr.length)">清空</span>
		</div>
		<!-- 头部end -->
		<!-- 消息start -->
		<div v-for="(items,index) in arr">
			<div :class="index==0 ? 'atMsgWrap' : 'atMsgWrap1'" @click="msPage(items,index,$event)">
			 	<div class="titleWrap">
			 		<span :class=" items.IsRead == true ? 'titleImg1' : 'titleImg'" id="img"></span>
			 		<span class="title1">{{items.Title}}</span>
			 	</div>
			 	<div class="timer">{{(items.CreateDate).substring(6,items.CreateDate.lastIndexOf(")"))| formatDateFn((items.CreateDate).substring(6,items.CreateDate.lastIndexOf(")")))}}</div>
			 	<div class="contentWord">{{items.Content}}</div>
			 	<div class="details">查看详情<span class="toRight"></span></div>
			</div>
		</div>
		<!-- 消息end -->
		<!-- 清空数据后start -->
		<div class="empty" v-if="arr.length == 0 || arr == false">
			<img src="../../assets/images/mine/nullCart@2x.png">
			<span>亲，消息已经清空了喔~</span>
		</div>
		<!-- 清空数据后end -->
	</div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import tool from "../../util/tool";
import getd from "../../vuex/getData.js";
import { Toast, MessageBox } from "mint-ui";
export default {
  data() {
    return {
      arr: []
    };
  },
  components: {},
  created() {
    this.arr = tool.loadFromLocal(
      "_systemMessage",
      this.getToken(),
      "data",
      false
    );
  },
  computed: {
    ...mapState("message", {
      systemMsgLeng: "systemMsgLeng"
    })
  },
  methods: {
    ...mapMutations("message", {
      setSysten: "setSysten"
    }),
    goBack() {
      this.$router.go(-1);
    },
    msPage(val, index, e) {
      //跳转到系统详情页面
      let that = this;
      //跳转到系统详情页面
      // 判断用户是否已读消息  如果已读 则图标铃铛变为灰色
      if (!this.arr[index].IsRead) {
        const params = {
          params: {
            guid: this.arr[index].Id
          }
        };
        // 更改状态
        getd.setSystemType(params).then(res => {
          if (res.success === true) {
            this.setSysten(that.systemMsgLeng - 1);
            let length =parseInt(window.sessionStorage.getItem("_systemLength_"));
            window.sessionStorage.setItem(
              "_systemLength_",
              length - 1
            );
          }
        });
        this.arr[index].IsRead = true;
      }

      tool.saveToLocal("_systemMessage", this.getToken(), "data", this.arr);

      if (val.Type == 2) {
        var DataId = val.DataId;
        if (DataId == null) {
          return;
        }
        var len = DataId.indexOf("|");
        var id = DataId.substring(0, len);
        var status = DataId.substring(len + 1, DataId.length);
        if (status == "Prepay") {
          this.$router.push({
            path: "/mine/toMyOrder/orderWaitpay",
            query: { id: id }
          });
        } else if (status == "InProcess") {
          this.$router.push({
            path: "/mine/toMyOrder/orderServering",
            query: { id: id }
          });
        } else if (status == "Canceled") {
          this.$router.push({
            path: "/mine/toMyOrder/orderCancel",
            query: { id: id }
          });
        } else if (status == "Completed") {
          this.$router.push({
            path: "/mine/toMyOrder/orderCompleted",
            query: { id: id }
          });
        } else if (status == "Evaluate") {
          this.$router.push({
            path: "/mine/toMyOrder/orderCompleted",
            query: { id: id }
          });
        }
      }
    },
    delData(val, len) {
      let hadData = tool.loadFromLocal(
        "_systemMessage",
        this.getToken(),
        "data",
        false
      );
      let that = this;
      if (!hadData || hadData.length <= 0) {
        Toast({
          message: "暂无消息",
          position: "middle"
        });
        return false;
      }
      //清空当前页面消息
      MessageBox.confirm("确定清空系统信息?")
        .then(action => {
          getd.removeSystem().then(res => {
            if (res.success) {
              // 页面上也要删除
              tool.removeLocal("_systemMessage");
              window.sessionStorage.removeItem('_systemLength_')
              that.setSysten(0);
              val && val.splice(val, len);
              Toast({
                message: "已清空",
                position: "middle"
              });
            }
          });
        })
        .catch(err => {});
    }
  },
  filters: {
    formatDateFn: value => {
      return tool.formatDate(value, "yyyy-MM-dd");
    }
  }
};
</script>