<template>
	<div class="setting">
		<div class="back">
			<span  class="return" @click="goBack()"></span>
			设置
		</div>
		<div class="cache">
			<div class="cache-content" @click="clearCache">
				<div class="cache-left">清除缓存</div>
				<div class="cache-right"></div>
			</div>
		</div>
		<div class="setting-list">
			<ul class="setting-ul">
				<!-- 更新提示 -->
				<li @click="getCheck" v-show="isAndroid">
					<div class="list-left">版本更新</div>
					<div class="list-right"></div>
					<div class="ver">V{{VersionNumber}}</div>
				</li>
			
				
				<!-- <li>
					<div class="list-left">给个好评</div>
					<div class="list-right"></div>
				</li> -->
				<li @click="toAbout">
					<div class="list-left">关于我们</div>
					<div class="list-right"></div>
				</li>
			</ul>
		</div>
		<div class="quit-user" @click.stop="goQuit" v-show="isShow">
			<div class="quit">退出当前用户</div>
		</div>
		<!-- 更新提示 -->
		<update></update> 
	</div>
</template>

<script>
import { Toast } from "mint-ui";
import getd from "../../vuex/getData.js";
import update from "./update";
import * as types from "../../vuex/mutations_types.js";
import store from "../../vuex/mine/mine.js";
import tool from "../../util/tool";
import { mapGetters, mapState, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      VersionNumber: "", //版本号
      isShow: true, //退出用户是否显示
      isAndroid: false //是否在安卓app内
    };
  },
  created() {
    if (tool.is_android() && tool.is_app()) {
      this.isAndroid = true;
    }
  },
  components: {
    update
  },
  mounted() {
    this.VersionNumber = version;
    if (this.getToken()) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  },
  methods: {
    ...mapActions(
		      "mine_index",{ 
    			   REQUEST_MYWALLETPARTICULARS: "REQUEST_MYWALLETPARTICULARS"//获取 帐户余额 奖励佣金 记账币 积分 
		        }
				),
    ...mapActions(["reviseShowCase", "reviseVerMes"]),
    ...mapMutations("message", {
      setSysten: "setSysten"
    }),
    //返回
    goBack() {
      this.$router.go(-1);
    },
    //清除缓存
    clearCache() {
      Toast({
        message: "清除成功",
        position: "middle",
        duration: 2000
      });
    },
    //检查更新
    getCheck() {
      var versionData = {
        params: {
          type: 0 //安卓
        }
      };
      var obj = {};
      getd.getVersion(versionData).then(res => {
        if (this.VersionNumber == res.data.VersionNumber) {
          Toast({
            message: "已经是最新版本",
            position: "middle",
            duration: 2000
          });
        } else {
          obj = res.data;
          obj.UpdateContent = obj.UpdateContent.replace(/\n/g, "<br/>");
          //强制更新
          if (res.data.VersionLevel == 2) {
            obj.isUpdated = true;
            //将数据传给vuex
            this.reviseVerMes(obj);
            //显示弹出框
            this.reviseShowCase(true);
          } else if (res.data.VersionLevel == 1 || res.data.VersionLevel == 0) {
            //不强制更新
            //判断中间版本是否有强制更新
            var updatedVersionData = {
              params: {
                type: 0, //安卓
                versionNumber: version
              }
            };
            getd.getNotUpdatedVersion(updatedVersionData).then(val => {
              for (var i = 0; i < val.data.length; i++) {
                if (val.data[i].VersionLevel == 2) {
                  //强制更新
                  obj.isUpdated = true;
                  //将数据传给vuex
                  this.reviseVerMes(obj);
                  //显示弹出框
                  this.reviseShowCase(true);
                  break;
                } else {
                  obj.isUpdated = false;
                  //将数据传给vuex
                  this.reviseVerMes(obj);
                  //显示弹出框
                  this.reviseShowCase(true);
                }
              }
            });
          }
        }
      });
    },
    toAbout() {
      //跳转到关于页面
      this.$router.push("/mine/about");
    },
    //退出当前用户
    goQuit() {
      localStorage.removeItem("login_user_id");
      sessionStorage.removeItem("_systemLength_");
      store.commit(types.LOGOUT);
      // this.$router.replace("/mine");
      // window.location.replace("/mine");
      this.setSysten(0);
      this.$router.push('/mine');
      console.log('退出前刷新')
      console.log( document.querySelector('meta[name="viewport"]').getAttribute('content'))
      this.REQUEST_MYWALLETPARTICULARS('false');
      // window.location.reload(); 
      
    }
  }
};
</script>

<style lang="less" type="stylesheet/css" scoped>
@import "../../common/index.less";
.back {
     height: 1.1891891891891893rem;
     width: 100%;
     text-align: center;
     line-height: 1.162162162162162rem;
     font-size: 0.4864864864864865rem;
     color: #1f1f1f;
     border-bottom: 1px solid #ebe5e1;
     background: white;
}
 .return {
    /*padding-left: 0.40540540540540543rem;
     */
     height: 1.1891891891891893rem;
     width: 1.1891891891891893rem;
     .bg-image("../../assets/images/tabBar/nav_back");
     background-size: 52%;
     background-position: 0.40540540540540543rem 0.2972972972972973rem;
     position: absolute;
     left: 0;
}
 .cache {
     width: 100%;
     height: 1.3783783783783783rem;
     background: #fff;
     padding: 0.4864864864864865rem 0.35135135135135137rem 0.4594594594594595rem 0.35135135135135137rem;
     margin-top: 0.32432432432432434rem;
     margin-bottom: 0.32432432432432434rem;
}
 .cache-content {
     height: 100%;
     overflow: hidden;
}
 .cache-content .cache-left {
     font-size: 0.43243243243243246rem;
     color: #1f1f1f;
     float: left;
}
 .cache-content .cache-right {
     .bg-image("../../assets/images/tabBar/right_arrow");
     background-size: 100%;
     float: right;
     width: 0.21621621621621623rem;
     height: 0.3783783783783784rem;
}
 .setting-list, .quit-user {
     width: 100%;
     padding: 0 0.35135135135135137rem 0 0.35135135135135137rem;
     background: #fff;
     margin-bottom: 0.32432432432432434rem;
}
 .setting-list .setting-ul {
     width: 100%;
}
 .setting-list .setting-ul li {
     overflow: hidden;
     height: 1.3513513513513513rem;
     line-height: 1.3513513513513513rem;
     .border-1pxB(#eee);
}
 .ver {
     float: right;
     font-size: 0.3783783783783784rem;
     color: #b3b3b3;
     margin-right: 0.1891891891891892rem;
}
 .setting-list .setting-ul li .list-left {
     font-size: 0.43243243243243246rem;
     color: #1f1f1f;
     float: left;
}
 .setting-list .setting-ul li .list-right {
     .bg-image("../../assets/images/tabBar/right_arrow");
     background-size: 100%;
     float: right;
     width: 0.21621621621621623rem;
     height: 0.3783783783783784rem;
     margin-top: 0.4864864864864865rem;
}
 .quit-user .quit {
     text-align: center;
     .cf802;
     height: 1.3513513513513513rem;
     line-height: 1.3513513513513513rem;
     font-size: 0.43243243243243246rem;
     background: #fff !important;
}
 
</style>