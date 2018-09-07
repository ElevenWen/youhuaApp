<template>
	<div id="personageRZ">
		<header-title title="个人实名认证"></header-title>
		<div class="personageRZ" id="enterprise">
			<div class="personageContent">
				<ul>
					<li>
						<span>*</span>
						<span>姓名：</span>
						<input type="text" placeholder="请输入您的真实姓名"  v-model="idcardInfo.name" @blur="person"/>
					</li>
					<li>
						<span>*</span>
						<span>手机号：</span>
						<input type="text" placeholder="请输入手机号码" v-model="telphoneStart"  @blur="verifyP" readonly/>
					</li>
					<li>
						<span>*</span>
						<span>验证码：</span>
						<input type="text" class="getCodeInput" placeholder="请输入验证码" v-model="code" @blur="verifyM"/>
						<!-- <span class="getCode" @click="getCode">{{isClick ? timer : "获取验证码" }}</span> -->
						<div class="getCode" @click="getCode" v-if="!isClick">获取验证码</div>
                		<div class="getCode gray" v-if="isClick">{{timer}}</div>
					</li>
					<li>
						<span>*</span>
						<span>身份证号：</span>
						<input type="text" placeholder="请输入证件号" v-model="idcardInfo.code" @blur="identityCard"/>
					</li>
					<li>
						<span>*</span>
						<span>身份证照片：</span>
					</li>
				</ul>
				<div class="identityCardZ">
					<div @click="uploadBImg(1,'idCard')" class="identityCardZ-file">
						<div class="picture" :style="'backgroundImage:url('+idcardInfo.Img+')'" v-if="idcardInfo.Img"></div>
						<input type="file" @change="uploadIdcardFace" id="uploadIdcardFace" v-if="!isApp">
					</div>
					<span>带头像面</span>
				</div>
				<div class="identityCardF">
					<div @click="uploadBImg(2,'idCard')" class="identityCardZ-file">
						<div class="picture" :style="'backgroundImage:url('+idcardBack.Img+')'" v-if="idcardBack.Img"></div>
						<input type="file" @change="uploadIdcardBack" id="uploadIdcardBack" v-if="!isApp">
					</div>
					<span>带国徽面</span>
				</div>
			</div>
		</div>
		<div class="contractBottom" @click="submitInformation">
			提交实名认证信息
		</div>
		<div class="shadeN" v-bind:class="{shade: shadeS}">
			<div class="shadeC">
				<span>信息提交成功</span>
				<p>1-2个工作日反馈审核结果;<br />审核通过之后，系统自动帮你生产电子签章</p>
				<div>
					<span>{{toContractTime}}s后自动返回</span>
					<span class="contract" @click.stop.prevent="electronicContract">合同详情页</span>
				</div>
			</div>
		</div>
		<!--扫一扫弹窗-->
		<scanMessageBox :isShowMessageBox="isShowMessageBox" @closePop="toClose"></scanMessageBox>
	</div>
</template>

<style type="text/css" lang="less" scoped>
@import "../../common/index.less";
@import "./electronicContract.less";
</style>

<script>
import headerTitle from "../components/header-title";
import tool from "../../util/tool";
import { Indicator, MessageBox, Toast } from "mint-ui";
import getData from "../../vuex/getData";
import scanMessageBox from "../components/scanMessageBox.vue"
var timerr = null;
var ua = navigator.userAgent.toLowerCase();
var instance = null;
var toCtimer = null;
export default {
  data() {
    return {
      shadeS: false,
      telphone: "", //手机号
      telphoneStart: "", //中间为*号的手机号
      code: "", //验证码
      idcardInfo: {
        //身份证正面信息
        name: "",
        code: "",
        Img: ""
      },
      idcardBack: {
        //身份证反面信息
        Img: ""
      },
      isClick: false,
      timer: 60, //获取验证码时间
      isApp: true, //是否在app
      toContractTime: 10,
      isVerify: false, //验证码是否正确
      isPerson: false, //姓名是否正确
      isIdentityCard: false, //身份证号是否正确
      isShowMessageBox:false,//显示扫一扫弹窗
    };
  },
  components: {
    headerTitle,
    scanMessageBox
  },
  mounted() {
    // 获取用户手机号
    let params = {
      datatype: "json"
    };
    getData.getCustomerInfo(params).then(res => {
      // console.log("00000",res.data.Mobile);
      this.telphone = res.data.Mobile;
      // 替换手机号中间几位数为*
      this.telphoneStart =
        this.telphone.substr(0, 3) + "****" + this.telphone.substr(7);
      // console.log("this.telphoneStart",this.telphoneStart)
    });
    // this.$nextTick(() => {
    //   document.getElementById("enterprise").style.height =
    //     window.screen.availHeight - 94 + "px";
    // });

    //是否在app内
    if (ua.match(/wqbol/i) == "wqbol") {
      this.isApp = true;
    } else {
      this.isApp = false;
    }

    // 通过客户签章ID获取信息
    let _id = this.$route.query.signId;
    if (_id) {
      let params = {
        id: _id,
        datatype: "json"
      };
      getData.getSignById(params).then(res => {
        // console.log("签章列表",res);
        this.idcardInfo.name = res.data.TrueName;
        this.idcardInfo.code = res.data.IdCardNumber;
        this.idcardInfo.Img = res.data.IdCardPositive;
        this.idcardBack.Img = res.data.IdCardOpposite;

        this.isPerson = true;
        this.isIdentityCard = true;
      });
    }
  },
  methods: {
    submitInformation() {
      // 验证
      if (
        this.isVerify &&
        this.isPerson &&
        this.isIdentityCard &&
        this.idcardInfo.Img &&
        this.idcardBack.Img
      ) {
        this.realNameCertification();
      } else {
        if (instance) {
          //						关闭Toast
          instance.close();
          instance = Toast({
            message: "请填写完整的正确信息！！",
            duration: 2000
          });
        } else {
          instance = Toast({
            message: "请填写完整的正确信息！！",
            duration: 2000
          });
        }

        return;
      }
    },
    electronicContract() {
      clearInterval(toCtimer);
      this.$router.push("/electronicContract/electronicContract");
    },
    getCode() {
      //获取验证码
      this.isClick = true;
      let params = {
        mobile: this.telphone,
        datatype: "json"
      };
      getData.getVerification(params).then(res => {
        Toast({
          message: "验证码已成功发送",
          duration: 2000
        });
        timerr = setInterval(() => {
          this.timer--;
          if (this.timer <= 0) {
            this.timer = 60;
            clearInterval(timerr);
            this.isClick = false;
          }
        }, 1000);
      });
    },
    //判断手机号
    verifyP() {
      var _verifyP = tool.regularJudgement("phone", this.telphone);
      if (!_verifyP) {
        return false;
      }
      return _verifyP;
    },
    //判断验证码
    verifyM() {
      var _verifyM = tool.regularJudgement("noteCode", this.code);
      console.log("_verifyM", _verifyM);
      if (!_verifyM) {
        this.isVerify = false;
        return false;
      }
      this.isVerify = true;
      return _verifyM;
    },
    //判断姓名
    person() {
      var _person = tool.regularJudgement("person", this.idcardInfo.name);
      console.log("_person", _person);
      if (!_person) {
        this.isPerson = false;
        return false;
      }
      this.isPerson = true;
      return _person;
    },
    //判断身份证号码
    identityCard() {
      var _identityCard = tool.regularJudgement(
        "identityCard",
        this.idcardInfo.code
      );
      console.log("_identityCard", _identityCard, this.idcardInfo.code);
      if (!_identityCard) {
        this.isIdentityCard = false;
        return false;
      }
      this.isIdentityCard = true;
      return _identityCard;
    },
    // 上传身份证正面
    uploadIdcardFace() {
      let _idcardInfo = this.idcardInfo;
      tool.uploadIdcard("#uploadIdcardFace", 1, _idcardInfo, this);
    },
    // 上传身份证反面
    uploadIdcardBack() {
      let _idcardBack = this.idcardBack;
      tool.uploadIdcard("#uploadIdcardBack", 2, _idcardBack, this);
    },
    realNameCertification() {
      //提交认证信息
      var params = {
        Mobile: this.telphoneC,
        VerifyCode: this.code,
        TrueName: this.idcardInfo.name,
        IdCardNumber: this.idcardInfo.code,
        IdCardPositive: this.idcardInfo.Img,
        IdCardOpposite: this.idcardBack.Img,
        Type: 0,
        datatype: "json"
      };
      // 调取 个人/企业签章-实名认证 接口
      this.request_certification(params);
    },
    // 调取 个人/企业签章-实名认证 接口
    request_certification(params) {
      getData
        .realNameCertification(params)
        .then(res => {
          this.isShowWindows = true;
          console.log("提交认证信息res", res);
          this.shadeS = true;
          toCtimer = setInterval(() => {
            this.toContractTime--;
            if (this.toContractTime <= 0) {
              this.$router.push("/electronicContract/electronicContract");
              clearInterval(toCtimer);
            }
          }, 1000);
        })
        .catch(err => {
          console.log("提交认证信息错误", err);
          Indicator.close();
          if (err.data.success == false) {
            //						this.$message.error(err.data.msg);
            Toast({
              message: err.data.msg,
              duration: 2000
            });
          }
        });
    },

    // 调用原生摄像头和相册
    uploadBImg(type, val) {
      this.type = type;
      this.currentId = val;
      //上传营业执照
      if (ua.match(/wqbol/i) == "wqbol") {
        this.showActionSheet();
      }
    },
    //点击事件，弹出选择摄像头和相册的选项
    showActionSheet() {
      var self = this;
      var bts = [
        {
          title: "拍照"
        },
        {
          title: "从相册选择"
        }
      ];
      plus.nativeUI.actionSheet(
        {
          cancel: "取消",
          buttons: bts
        },
        function(e) {
          if (e.index == 1) {
            //检测相机权限
			var pp = plus.navigator.checkPermission('CAMERA');
			switch(pp){
				case 'authorized':
					self.getImage();
				break;
				case 'notdeny':
					self.getImage();
				break;
				case 'denied':
					//用户禁止了相机权限
					self.isShowMessageBox = true;
				break;
				case 'undetermined':
//								plus.nativeUI.alert('未确定相机权限');
					self.getImage();
				break;
				case 'unknown':
					plus.nativeUI.alert('无法查询相机权限');
				break;
				default:
					plus.nativeUI.alert('不支持相机权限');
				break;
			}
          } else if (e.index == 2) {
            self.galleryImgs();
          }
        }
      );
    },
    //拍照
    getImage() {
      // 获取设备默认的摄像头对象
      var self = this;
      var cmr = plus.camera.getCamera(1);
      cmr.captureImage(
        function(capturedFile) {
          //通过URL参数获取目录对象或文件对象
          plus.io.resolveLocalFileSystemURL(
            capturedFile,
            function(entry) {
              // var task = plus.uploader.createUpload("https://api.wqbol.net/Upload/Save",{},function(t, status) {//测试
              var task = plus.uploader.createUpload(
                "https://api.wqbol.com/Upload/Save",
                {},
                function(t, status) {
                  //正式
                  // 上传完成
                  if (status == 200) {
                    console.log("Upload success: " + JSON.stringify(t));
                    if (self.type == 1) {
                      self.idcardInfo.Img = JSON.parse(
                        t.responseText
                      ).data.storeResult.path;
                    } else if (self.type == 2) {
                      self.idcardBack.Img = JSON.parse(
                        t.responseText
                      ).data.storeResult.path;
                    }
                  } else {
                    console.log("Upload failed: " + status);
                  }
                }
              );
              task.addFile(entry.toLocalURL(), {});
              task.addData("type", self.currentId);
              task.addData("file", entry.toLocalURL());
              task.addData("Token", self.getToken());
              task.start();

              self.compressImage(entry.toLocalURL(), entry.name);
            },
            function(e) {
              plus.nativeUI.toast("读取拍照文件错误：" + e.message);
            }
          );
        },
        function(error) {
          console.log("拍照失败" + error.code + error.message);
        },
        {
          filter: "image"
        }
      );
    },
    //压缩图片
    compressImage(url, filename) {
      var self = this;
      var name = "_doc/upload/" + filename;
      plus.zip.compressImage(
        {
          src: url, //src: (String 类型 )压缩转换原始图片的路径
          dst: name, //压缩转换目标图片的路径
          quality: 40, //quality: (Number 类型 )压缩图片的质量.取值范围为1-100
          overwrite: true //overwrite: (Boolean 类型 )覆盖生成新文件
        },
        function(zip) {
          //页面显示图片
          self.showPics(zip.target, name);
        },
        function(error) {
          plus.nativeUI.toast("压缩图片失败，请稍候再试");
        }
      );
    },

    //显示图片
    showPics(url, name) {
      var self = this;
      //根据路径读取到文件
      plus.io.resolveLocalFileSystemURL(url, function(entry) {
        entry.file(function(file) {
          var fileReader = new plus.io.FileReader();
          fileReader.readAsDataURL(file);
          fileReader.onloadend = function(e) {
            var img = e.target.result.toString();
            var picUrl = e.target.result.toString();
            picUrl = picUrl.substring(picUrl.indexOf(",") + 1);
            if (self.type == 1) {
              //身份证正面
              let params = {
                image: picUrl, //图片二进制数据的base64编码
                configure: '{"side":"face"}' //身份证正反面类型:face/back
              };
              self.idcard(params, 1);
            } else if (self.type == 2) {
              //身份证反面
              let params = {
                image: picUrl, //图片二进制数据的base64编码
                configure: '{"side":"back"}' //身份证正反面类型:face/back
              };
              self.idcard(params, 2);
            }
          };
        });
      });
    },
    //从相册选择照片
    galleryImgs() {
      var self = this;
      plus.gallery.pick(
        function(e) {
          // var task = plus.uploader.createUpload("https://api.wqbol.net/Upload/Save",{},function(t, status) {//测试
          var task = plus.uploader.createUpload(
            "https://api.wqbol.com/Upload/Save",
            {},
            function(t, status) {
              //正式
              // 上传完成
              if (status == 200) {
                if (self.type == 1) {
                  self.idcardInfo.Img = JSON.parse(
                    t.responseText
                  ).data.storeResult.path;
                } else if (self.type == 2) {
                  self.idcardBack.Img = JSON.parse(
                    t.responseText
                  ).data.storeResult.path;
                }
              } else {
                console.log("Upload failed: " + status);
              }
            }
          );
          task.addFile(e, {});
          task.addData("type", self.currentId);
          task.addData("file", e);
          task.addData("Token", self.getToken());
          task.start();
          var name = e.substr(e.lastIndexOf("/") + 1);
          self.compressImage(e, name);
        },
        function(e) {},
        {
          filter: "image"
        }
      );
    },
    // 身份证识别
    idcard(params, type) {
      getData
        .idcard(params)
        .then(response => {
          console.log("123", response);
          if (type == 1) {
            this.isPerson = true;
            this.isIdentityCard = true;

            this.idcardInfo.name = response.name;
            this.idcardInfo.code = response.num;
          } else if (type == 2) {
          }
        })
        .catch(error => {
          if (type == 1) {
            this.isPerson = false;
            this.isIdentityCard = false;
            this.idcardInfo.name = "";
            this.idcardInfo.code = "";
            this.idcardInfo.Img = "";
          } else if (type == 2) {
            this.idcardBack.Img = "";
          }
          console.log("身份证识别", error);
          //console.log("请重新上传清晰的身份证图像");
        });
    },
    //扫一扫弹窗组件
    toClose(){
    	this.isShowMessageBox = false;
    }
  },
  beforeDestroy() {
    clearInterval(timerr); //销毁定时器
  },
  filters: {}
};
</script>