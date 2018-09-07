<template>
	<div id="scan">
		<div id="barcode"></div>
	</div>
</template>
<style lang="less" type="stylesheet/css" scoped>
// @import "../../common/index.less";
#scan {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  background: #000;
}
#barcode {
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
}
</style>
<script>
import { Toast, Indicator } from "mint-ui";
import tool from "../../util/tool";
import axios from "axios";

//定义组件全局变量
var ws = null;
var view1 = null;
var bc = null;
var metaContent = null;
export default {
  data() {
    return {};
  },
//   beforeRouteEnter(to, from, next) {
//     metaContent = document
//       .querySelector('meta[name="viewport"]')
//       .getAttribute("content");
   

//     next(vm=>{
		 
     
// 	});
//   },
  created() {
	  metaContent = document
      .querySelector('meta[name="viewport"]')
      .getAttribute("content");
    this.metaContent = metaContent;
    
//  setTimeout(()=>{
		   document.querySelector('meta[name="viewport"]')
      .setAttribute(
        "content",
        "width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
      );
//	 },60)
  },

  mounted() {
	 
    var self = this;
    //创建webview
    ws = plus.webview.currentWebview();

    //创建view1控件，控制返回图标
    view1 = new plus.nativeObj.View("bmp", {
      width: "36px",
      height: "36px",
      top: "18px",
      left: "6px"
    });
    //绘制图片
    view1.draw([{ tag: "img", id: "img", src: "static/img/nav_back@3x.png" }]);
    ws.append(view1);
    view1.addEventListener("click", onClick, false);
    //监听back安卓
    plus.key.addEventListener("backbutton", function() {
      document
        .querySelector('meta[name="viewport"]')
        .setAttribute("content", self.metaContent);
      view1.close();
      bc.cancel();
      bc.close();
      setTimeout(function() {
        self.$router.go(-1);
      }, 200);
    });
    //返回
    function onClick(e) {
      document
        .querySelector('meta[name="viewport"]')
        .setAttribute("content", self.metaContent);

      view1.close();
      bc.cancel();
      bc.close();
      setTimeout(function() {
        self.$router.go(-1);
      }, 300);
    }
	
	//调用扫一扫
	this.useBar();
    
  },
  methods: {
    useBar() {
      var self = this;
      //条码扫描识别控件对象
      bc = new plus.barcode.Barcode("barcode", [0, 3], {
        frameColor: "#fcfcfc",
        scanbarColor: "#fa2802"
      });
      //添加扫描成功和失败的方法
      bc.onmarked = function(type, code, file) {
        console.log(type);
        console.log(code);
        //判断二维码信息是否含有登录链接
        var patt1 = new RegExp("/OpenPlatform/ScanLogin");
        //判断是否是代付
        var patt2 = new RegExp("/helpFriendPay");

        var patt3 = new RegExp("/findFriendPay");
        if (patt1.test(code)) {
          //关闭相应view
          view1.close();
          bc.cancel();
          bc.close();

          //扫描成功后告诉pc端
          axios
            .post(code, {
              Token: "",
              steps: 1, //扫码
              datatype: "json"
            })
            .then(response => {
              Indicator.close();
              console.log(response);
            })
            .catch(error => {
              Indicator.close();
              console.log(error);
            });
          document
            .querySelector('meta[name="viewport"]')
            .setAttribute("content", self.metaContent);

          //用户是否登录
          if (self.getToken()) {
            self.$router.replace({ name: "scanLogin", params: { url: code } });
          } else {
            //存储扫描到的数据
            tool.saveToLocal("isScan", "isScan", "isScan", code);
            self.$router.replace({
              name: "toLogin",
              params: { type: 2, url: code }
            });
          }
        } else if (patt2.test(code)) {
          //关闭相应view
          view1.close();
          bc.cancel();
          bc.close();

          var arr1 = code.substring(code.indexOf("?") + 1);
          var arr2 = arr1.split("&");
          document
            .querySelector('meta[name="viewport"]')
            .setAttribute("content", self.metaContent);

          //用户是否登录
          if (self.getToken()) {
            // https://host.wqbol.com/
            // orderNum=1527059777349923&actPrice=888.00

            self.$router.replace({
              path: "/helpFriendPay",
              query: {
                orderNum: arr2[0].split("=")[1],
                actPrice: arr2[1].split("=")[1]
              }
            });
          } else {
            tool.saveToLocal("isScan", "isScan", "isScan", {
              orderNum: arr2[0].split("=")[1],
              actPrice: arr2[1].split("=")[1]
            });
            self.$router.replace({ name: "toLogin", params: { type: 3 } });
          }
        } else if (patt3.test(code)) {
          //关闭相应view
          view1.close();
          bc.cancel();
          bc.close();

          var arr1 = code.substring(code.indexOf("?") + 1);
          var arr2 = arr1.split("&");
          document
            .querySelector('meta[name="viewport"]')
            .setAttribute("content", self.metaContent);

          //用户是否登录
          if (self.getToken()) {
            // https://host.wqbol.com/
            // orderNum=1527059777349923&actPrice=888.00

            self.$router.replace({
              path: "/findFriendPay",
              query: {
                orderNum: arr2[0].split("=")[1],
                actPrice: arr2[1].split("=")[1]
              }
            });
          } else {
            tool.saveToLocal("isScan", "isScan", "isScan", {
              orderNum: arr2[0].split("=")[1],
              actPrice: arr2[1].split("=")[1]
            });
            self.$router.replace({ name: "toLogin", params: { type: 4 } });
          }
        } else {
          bc.cancel();
          // 弹出系统提示对话框
          plus.nativeUI.alert(
            "对不起，暂不支持此二维码",
            function() {
              view1.close();
              bc.cancel();
              bc.close();
              self.$router.replace("/home");
            },
            "",
            "知道了"
          );
        }
      };
      bc.onerror = function(error) {
        console.log(error.code);
        console.log(error.message);
        bc.cancel();
        // 弹出系统提示对话框
        plus.nativeUI.alert(
          "对不起，暂不支持此二维码",
          function() {
            view1.close();
            bc.close();
            document
              .querySelector('meta[name="viewport"]')
              .setAttribute("content", self.metaContent);

            self.$router.replace("/home");
          },
          "",
          "知道了"
        );
      };
      bc.start();
    }
  }
};
</script>

