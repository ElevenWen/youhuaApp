<template>
	<div id="enterpriseRZ">
		<header-title title="企业实名认证"></header-title>
		<div class="enterpriseRZ" id="enterprise">
			<div class="personageContent">
				<ul>
					<li>
						<span>*</span>
						<span>手机号：</span>
						<input type="text" placeholder="请输入手机号码" v-model="telphoneStart"  @blur="verifyP" readonly/>
					</li>
					<li>
						<span>*</span>
						<span>验证码：</span>
						<input type="text"  placeholder="请输入验证码" v-model="code" @blur="verifyM"/>
						<!-- <span class="getCode" @click="getCode">{{isClick ? timer : "获取验证码" }}</span> -->
            <div class="getCode" @click="getCode" v-if="!isClick">获取验证码</div>
            <div class="getCode gray" v-if="isClick">{{timer}}</div>
					</li>
					<li>
						<span>*</span>
						<span>企业名称：</span>
						<input type="text"  placeholder="请输入企业名称" style="width: 3.2432432432432434rem;" v-model="business.name" @blur="checkComName"/>
						<span class="addCompany" @click="addCompany"><img src="../../assets/images/electronicContract/addCompany@3x.png"></span>
					</li>
					<li>
						<span>*</span>
						<span>法人姓名：</span>
						<input type="text" placeholder="请输入法人代表姓名" v-model="idcardInfo.name" @blur="person" class="active"/>
					</li>
					<li>
						<span>*</span>
						<span>身份证号：</span>
						<input type="text" placeholder="请输入法人代表证件号" v-model="idcardInfo.code" @blur="identityCard" class="active"/>
					</li>
					<li>
						<span>*</span>
						<span>社会信用代码：</span>
						<input type="text" placeholder="请输入信用代码" v-model="business.code" @blur="creditCode" class="active"/>
					</li>
					<li>
						<span>*</span>
						<span>营业执照：</span>
						<div class="businessZ">
							<span>照片所有信息需清晰可见，内容真实有效</span>
							<div class="business" @click="uploadBImg(0,'businessLicense')">
								<input type="file"  id="uploadBusiness" @change="uploadBusiness" v-if="!isApp">
								<div class="picture" :style="'backgroundImage:url('+business.Img+')'"></div>
							</div>
						</div>
					</li>
					<li>
						<span>*</span>
						<span>身份证照片：</span>
						<div class="identityCardZ">
							<div @click="uploadBImg(1,'idCard')" class="identityCardZ-file">
								<div class="picture" :style="'backgroundImage:url('+idcardInfo.Img+')'" v-if="idcardInfo.Img"></div>
								<input type="file" @change="uploadIdcardFace" id="uploadIdcardFace" accept="image/*" v-if="!isApp">
							</div>
							<span>带头像面</span>
						</div>
						<div class="identityCardF">
							<div @click="uploadBImg(2,'idCard')" class="identityCardZ-file">
								<div class="picture" :style="'backgroundImage:url('+idcardBack.Img+')'" v-if="idcardBack.Img"></div>
								<input type="file" @change="uploadIdcardBack" id="uploadIdcardBack" v-if="!isApp" accept="image/*">
							</div>
							<span>带国徽面</span>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<div class="contractBottom" @click="submitInformation">
			提交实名认证信息
		</div>
		<div class="shadeN" v-bind:class="{shade: shadeS}" @click="electronicContract">
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
import axios from "axios";
import scanMessageBox from "../components/scanMessageBox.vue"

var timerr = null;
var ua = navigator.userAgent.toLowerCase();
var toCtimer = null;
export default {
  data() {
    return {
      shadeS: false, //是否展示弹窗
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
      business: {
        //营业执照信息
        name: "",
        code: "",
        Img: ""
      },
      isClick: false,
      timer: 60, //获取验证码时间
      isShow: false,
      type: 0, //0  營業執照  1  身份證正面  2  身份證反面
      currentId: "businessLicense",
      isApp: true, //是否在app
      toContractTime: 10,
      isVerify: false, //验证码是否正确
      isPerson: false, //姓名是否正确
      isIdentityCard: false, //身份证号是否正确
      isCompany: false, //公司名是否正确
      isCrediect: false, //信用代码是否正确
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
      this.telphone = res.data.Mobile;
      // 替换手机号中间几位数为*
      this.telphoneStart =
        this.telphone.substr(0, 3) + "****" + this.telphone.substr(7);
    });
    //  this.$nextTick(() => {
    //    document.getElementById("enterprise").style.height =
    //    window.screen.availHeight - 94 + "px";
    //	  });

    //是否在app内
    if (ua.match(/wqbol/i) == "wqbol") {
      this.isApp = true;
    } else {
      this.isApp = false;
    }

    // 判断客户是否选择了公司
    // this.$eventHandle.$on("cc",(val) => {
    //   console.log("cc",val);
    //   this.wenmei = val;
    // })

    if (this.$route.query.id) {
      // 调用公司列表接口
      getData.REQUEST_COMPANYDATA_GOCOMPANY().then(res => {
        this.companyList = res.data;
        this.companyList.forEach(items => {
          if (this.$route.query.id == items.Id) {
            this.business.name = items.Name;
            this.business.code = items.SocialCreditCode;
            this.business.Img = items.BusinessLicensePic;
            this.isCompany = true;
            this.isCrediect = true;
          }
        });
      });

      // let getLocal = tool.loadFromLocal("addCompanyB","ALL");
      // console.log("getLocal",getLocal);
      // this.idcardInfo.name = getLocal.idcardInfoName;
      // this.idcardInfo.code = getLocal.idcardInfoCode;
      // this.idcardInfo.Img = getLocal.idcardInfoImg;
      // this.idcardInfo.Img = getLocal.idcardBackImg;
      // console.log(this.idcardInfo.name,this.idcardInfo.code);
    }

    // 通过客户签章ID获取信息
    let _id = this.$route.params.signId;
    if (_id) {
      let params = {
        id: _id,
        datatype: "json"
      };
      getData.getSignById(params).then(res => {
        console.log("签章列表", res);
        this.business.name = res.data.CompanyName;
        this.business.code = res.data.SocialCreditCode;
        this.business.Img = res.data.BusinessLicensePic;
        this.idcardInfo.name = res.data.TrueName;
        this.idcardInfo.code = res.data.IdCardNumber;
        this.idcardInfo.Img = res.data.IdCardPositive;
        this.idcardBack.Img = res.data.IdCardOpposite;

        this.isPerson = true;
        this.isIdentityCard = true;
        this.isCompany = true;
        this.isCrediect = true;
        // }
        // })
      });
    } else {
      return;
    }
  },
  methods: {
    addCompany() {
      this.$router.replace({ path: "/electronicContract/addCompany" });
    },
    submitInformation() {
      //提交认证信息
      // 验证
      // console.log(this.idcardInfo.Img,1)
      // console.log(this.idcardBack.Img,2)
      // console.log(this.business.Img,3)
      // console.log(this.isVerify,4)
      // console.log(this.isPerson,5)
      // console.log(this.isIdentityCard,6)
      // console.log(this.isCrediect,7)
      // console.log(this.isCompany,8)
      if (
        this.isVerify &&
        this.isPerson &&
        this.isIdentityCard &&
        this.isCrediect &&
        this.isCompany &&
        this.idcardInfo.Img &&
        this.idcardBack.Img &&
        this.business.Img
      ) {
        this.realNameCertification();
      } else {
        Toast({
          message: "请填写完整的正确信息！！",
          duration: 2000
        });
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
      if (!_identityCard) {
        this.isIdentityCard = false;
        return false;
      }
      this.isIdentityCard = true;
      return _identityCard;
    },
    // 判断信用代码
    creditCode() {
      var _creditCode = tool.regularJudgement("creditCode", this.business.code);
      if (!_creditCode) {
        this.isCrediect = false;
        return false;
      }
      this.isCrediect = true;
      return _creditCode;
    },
    // 判断企业名称
    checkComName() {
      var _checkComName = tool.regularJudgement(
        "companyAddress",
        this.business.name
      );
      if (!_checkComName) {
        this.isCompany = false;
        return false;
      }
      this.isCompany = true;
      return _checkComName;
    },
    //识别身份证正面
    uploadIdcardFace() {
      tool.uploadIdcard("#uploadIdcardFace", 1, this.idcardInfo, this);
    },
    //识别身份证反面
    uploadIdcardBack() {
      tool.uploadIdcard("#uploadIdcardBack", 2, this.idcardBack, this);
    },
    // 识别营业执照
    uploadBusiness() {
      tool.uploadIdcard("#uploadBusiness", 3, this.business, this);
    },
    realNameCertification() {
      //提交认证信息  type 1 == 公司  2 == 个人
      var params = {
        Mobile: this.telphoneC,
        VerifyCode: this.code,
        CompanyName: this.business.name,
        SocialCreditCode: this.business.code,
        BusinessLicensePic: this.business.Img,
        TrueName: this.idcardInfo.name,
        IdCardNumber: this.idcardInfo.code,
        IdCardPositive: this.idcardInfo.Img,
        IdCardOpposite: this.idcardBack.Img,
        Type: 1,
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
            Toast({
              message: err.data.msg,
              duration: 3000
            });
          }
        });
    },
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
              var task = plus.uploader.createUpload(
                // "https://api.wqbol.net/Upload/Save",//测试
                "https://api.wqbol.com/Upload/Save", //正式
                {},
                function(t, status) {
                  // 上传完成
                  if (status == 200) {
                    console.log("Upload success: " + JSON.stringify(t));
                    if (self.type == 0) {
                      self.business.Img = JSON.parse(
                        t.responseText
                      ).data.storeResult.path;
                      self.compressImage(entry.toLocalURL(), entry.name);
                    } else if (self.type == 1) {
                      self.idcardInfo.Img = JSON.parse(
                        t.responseText
                      ).data.storeResult.path;
                      self.compressImage(entry.toLocalURL(), entry.name);
                    } else if (self.type == 2) {
                      self.idcardBack.Img = JSON.parse(
                        t.responseText
                      ).data.storeResult.path;
                      self.compressImage(entry.toLocalURL(), entry.name);
                    }
                  } else {
                    console.log("Upload failed: " + status);
                  }
                }
              );
              task.addFile(entry.toLocalURL(), { key: "testdoc" });
              task.addData("type", self.currentId);
              task.addData("file", entry.toLocalURL());
              task.addData("Token", self.getToken());
              task.start();
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
          overwrite: true, //overwrite: (Boolean 类型 )覆盖生成新文件
          rotate: 90
        },
        function(zip) {
          //页面显示图片
          self.showPics(zip.target, name, url);
        },
        function(error) {
          plus.nativeUI.toast("压缩图片失败，请稍候再试");
        }
      );
    },

    //显示图片
    showPics(url, name, val) {
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
              self.idcard(params, 1, val);
            } else if (self.type == 2) {
              //身份证反面
              let params = {
                image: picUrl, //图片二进制数据的base64编码
                configure: '{"side":"back"}' //身份证正反面类型:face/back
              };
              self.idcard(params, 2, val);
            } else if (self.type == 0) {
              let params = {
                inputs: [
                  {
                    image: {
                      dataType: 50,
                      dataValue: picUrl
                    }
                  }
                ]
              };
              self.BusinessLicense(params, val);
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
          var name = e.substr(e.lastIndexOf("/") + 1);
          self.compressImage(e, name);
        },
        function(e) {},
        {
          filter: "image"
        }
      );
    },

    // 识别营业执照
    BusinessLicense(params, e) {
      var self = this;
      getData
        .businessLicense("post", params)
        .then(response => {
          this.isCompany = true;
          this.isCrediect = true;

          var task = plus.uploader.createUpload(
            // "https://api.wqbol.net/Upload/Save",//测试
            "https://api.wqbol.com/Upload/Save", //正式
            {},
            function(t, status) {
              // 上传完成
              if (status == 200) {
                console.log("Upload success: " + JSON.stringify(t));
                self.business.Img = JSON.parse(
                  t.responseText
                ).data.storeResult.path;
              } else {
                console.log("Upload failed: " + status);
              }
            }
          );
          task.addFile(e, {});
          task.addData("type", this.currentId);
          task.addData("file", e);
          task.addData("Token", this.getToken());
          task.start();

          var objResult = JSON.parse(response.outputs[0].outputValue.dataValue);
          //判断是否识别出
          if (objResult.name && objResult.name != "FailInRecognition") {
            this.business.name = objResult.name;
          } else {
            this.business.name = "";
          }
          if (objResult.reg_num && objResult.reg_num != "FailInRecognition") {
            this.business.code = objResult.reg_num;
          } else {
            this.business.code = "";
          }
        })
        .catch(error => {
          this.isCompany = false;
          this.isCrediect = false;

          console.log("营业执照错误", error);
          this.business.Img = "";
          this.business.code = "";
          this.business.name = "";
          alert("请重新上传清晰的营业执照图像");
        });
    },
    // 身份证识别
    idcard(params, type, e) {
      var self = this;
      getData
        .idcard(params)
        .then(response => {
          // let task = plus.uploader.createUpload("https://api.wqbol.net/Upload/Save",{},function(t, status) {//测试
          let task = plus.uploader.createUpload(
            "https://api.wqbol.com/Upload/Save",
            {},
            function(t, status) {
              //正式
              // 上传完成
              if (status == 200) {
                console.log("Upload success: " + JSON.stringify(t));
                if (type == 1) {
                  self.idcardInfo.Img = JSON.parse(
                    t.responseText
                  ).data.storeResult.path;
                } else if (type == 2) {
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
          task.addData("type", this.currentId);
          task.addData("file", e);
          task.addData("Token", this.getToken());
          task.start();

          if (type == 1) {
            this.isPerson = true;
            this.isIdentityCard = true;

            this.idcardInfo.name = response.name;
            this.idcardInfo.code = response.num;
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
          alert("请重新上传清晰的身份证图像");
        });
    },
    //扫一扫弹窗组件
    toClose(){
    	this.isShowMessageBox = false;
    }
  },
  beforeDestroy() {
    clearInterval(timerr); //销毁定时器
  }
};
</script>