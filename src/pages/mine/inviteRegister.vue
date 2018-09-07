<template>
	<div id="inviteRegister">
		<!-- <div class="theRegistered" id="theRegistered" v-if="isShow">
			<div class="close" @touchend.prevent="clise"></div>
			<div class="discounts" id="discounts">
				<span>2888</span>
				<span>优惠券</span>
			</div>
			<div class="hint">亲可以在“我的-优惠券” 中找到优惠券哦！</div>
			<div class="getButton" @touchend="downloadAPP">立即下载APP</div>
		</div>
 -->

		<header-title title="注册" ></header-title>
		
		<div class="inviteRegister_top">
			<mt-swipe :auto="4000">
				<mt-swipe-item v-for="(items,index) in datas" :key='index' v-if="items.Type == 0">
						<img  width="100%" @click="active(items.LinkWebSite,items)"  height="100%" :src="items.PosterImgURL" />
				</mt-swipe-item>
			</mt-swipe>
		</div>
		<div class="kindlyReminder">
			<p>温馨提醒：上传加公章后的营业执照照片，您将有权参与微企宝的有奖推荐活动，赚取现金大奖。</p>
		</div>
		<div class="inviteRegister">
			<form v-if="!isShowHeaderImage">
				<div>
					<!--<i>*</i>-->
					<input type="number" placeholder="输入手机号码" v-model="phone" @blur="verifyP"/>
				</div>
				<div class="verification">
					<!--<i>*</i>-->
					<input type="text" placeholder="输入验证码" v-model="noteCode" @blur="verifyM"/>
					<span class="getVerification" @click.stop.prevent="getVerification" v-if="isGet" :class="{active:phone}">获取验证码</span>
					<span class="getVerification" style="color:#FA2802" v-if="!isGet">重新获取{{time}}s</span>
				</div>
				<div class="phone_numbor">
					<!--<i>*</i>-->
					<input type="password" v-model="register.password" placeholder="设置登录密码" @blur="verifyPassword"/>
				</div>
				<!--<div class="phone_numbor">
					<i>*</i>
					<input type="password" v-model="register.enterPassword" placeholder="请确认密码" @blur="verifyEnterPassword"/>
				</div>-->
				<!--<div><input type="text" placeholder="输入公司名称" v-model="companyName"/></div>
				<div @click="toChoose">
					<img id="picture" :src="headerImage" v-show="headerImage"/>
					<input type="text" :placeholder="!headerImage?'上传营业执照(加盖公章)':''" readonly/>
					<label class="photograph"></label>
					<input type="file" id="upload" accept="image/*" @change="upload" v-show="!isApp">
				</div>
				<div class="referrerS">
					<label class="referrer">推荐人:</label>
					<input placeholder="推荐人" v-if="!isDis" v-model="rec"/> 
					<input placeholder="推荐人" unselectable="on" onfocus="this.blur()" v-if="isDis" readonly="true" v-model="rec"/>
				</div>-->
				<div class="agreement">
					<span @click.stop.prevent="agree()">
						<img class="serve_yes" src="../../assets/images/tabBar/select_boxS@3x.png" v-show="allChecked" />
						<img class="serve_no" src="../../assets/images/tabBar/select_box@3x.png"  v-show="(!allChecked)" />
					</span >
					<span @click.stop.prevent="agree()">已阅读并同意</span>
					<span @click.stop.prevent="goAgreement">《用户服务协议》</span>
				</div>
				<div>
					<button type="button" @click.prevent="goNext" class="sbtRegister" :class="{active:phone&&register.password&&noteCode&&allChecked}">完成</button>
				</div>
			</form>
			<form v-if="isShowHeaderImage" class="businessLicence">
				<div @click="toChoose">
					<img id="picture" :src="headerImage" v-show="headerImage"/>
					<input type="text" :placeholder="!headerImage?'上传公司营业执照（加盖公章）':''" readonly/>
					<label class="photograph"></label>
					<input type="file" id="upload" accept="image/*" @change="upload" v-show="!isApp">
				</div>
				<div><input type="text" placeholder="输入公司名称" v-model="companyName"/></div>
				<div><input type="text" placeholder="输入社会信用代码" v-model="socialCreditCode"/></div>
				<div class="referrerS">
					<label class="referrer">推荐人ID:</label>
					<!--<input placeholder="推荐人" v-if="!isDis" v-model="rec"/>--> 
					<input placeholder="推荐人" unselectable="on" onfocus="this.blur()" readonly="true" v-model="rec"/>
				</div>
				<div class="sbtRegister_div">
					<button type="button" @click.prevent="toImprove" class="sbtRegister">完成提交</button>
					<button type="button" @click.prevent="isEnd" class="skipBtn">跳过</button>
				</div>
			</form>
		</div>
		<!--<div class="wqblogo">
			<img src="../../assets/images/theCoupleRegistered/wqblogo3@3x.png" />
		</div>-->
		<div id="img" @touchmove.prevent v-if="isOpen"><img src="../../assets/images/mine/download@3x.png"/></div>
	
		<!--扫一扫弹窗-->
		<scanMessageBox :isShowMessageBox="isShowMessageBox" @closePop="toClose"></scanMessageBox>
	</div>
</template>

<script>
import headerTitle from "../components/header-title";
import {Actionsheet,Toast,Indicator} from 'mint-ui';
import getd from '../../vuex/getData.js';
import * as types from '../../vuex/mutations_types.js';
import store from '../../vuex/mine/mine.js';
import tool from '../../util/tool.js';
import md5 from 'js-md5';
import axios from 'axios';
	import Vue from 'vue';
import CryptoJS from 'crypto-js'
import scanMessageBox from "../components/scanMessageBox.vue"
var ua = navigator.userAgent.toLowerCase();
	export default {
		data() {
			return {
				sheetVisible: false,
				allChecked:true,
				companyName:"",//公司名称
				phone:"",//手机号
				register: { 
                    password:"",
                    enterPassword:"", 
                }  ,
                password:false,//判断密码
				noteCode:"",//验证码
				rec:"",//推荐人
				headerImage:"",//营业执照
				socialCreditCode:"",//社会信用代码
				isPhone:false,//判断手机号
                isCode:false,//判断验证码
                isGet:true,//是否获取验证码
                time:45,
                isShow:false,
                isOpen:false,
                isDis:false,//推荐人是否可以编辑
                datas:[],//轮播图
                isApp:true,//是否在app
                isShowHeaderImage:false,//是否下一步
                legalRepresentative:"",//法定代表人
				establishmentDate:"",//成立日期
				enterpriseType:"",//企业类型
				expiredTime:"",//过期时间
				LastLoginTime:"",//是否首次登陆
				isShowMessageBox:false,//显示扫一扫弹窗
				registerResource:0,//注册来源
			}
		},
		 
		created(){
			//自动填写推荐人
			if(location.href.indexOf("Account")>0){
				this.rec = tool.getQueryStringHash("Account");
				this.isDis = true;
			};
			var params = {
				params:{
					type:1,//pc 成为0  app 为1
					code:'GG00101'
				}
			}; 
			console.log(Boolean(location.hash));



			if(location.hash){
				//解决app 二次刷新问题  存在则表示用app 
					// 请求bannner图片
				getd.getHomeBanner(params)
				.then((res) => {
					this.datas = res.data.list;
					
					//console.log( "22",this.datas )
				})
				.catch((error)=>{
					//console.log(error)
				})
			}else{
				//console.log(this.$router)
				//console.log(this.$router.currentRoute.fullPath)
				// //console.log(location.pathname )
				let routerHref  = location.origin+this.$router.currentRoute.fullPath;
				let currrentHref = location.href;
				if( routerHref !== currrentHref ){ 
					//console.log( "routerHref",routerHref  )
					//console.log(currrentHref)
					location.replace(routerHref);  
				}else{
					getd.getHomeBanner(params)
					.then((res) => { 
						var currenthDate = res.data.list;
						this.datas =res.data.list;  
						//console.log( currenthDate ,"微信数据问题");
						currenthDate.forEach((items)=>{  
							if(items.Describe == '/activity/newPresent'){//newPresent 分享内容
//							if(items.DataDictionaryName == '/activity/newPresent'){//newPresent 分享内容
								//console.log(items.LinkName.substring(0,items.LinkName.length-1))
								Vue.prototype.QQshare(items.LinkName.substring(0,items.LinkName.length-1)   ,items.Remark,items.ThumbImgURL,items.LinkWebSite);
								Vue.prototype.WXshare(items.LinkName.substring(0,items.LinkName.length-1)   ,items.Remark,items.ThumbImgURL,items.LinkWebSite) ;
							}
						}) 
					},err=>{
						console.log(err,'掉两次')
					})
				}
			} 


		},
		mounted(){
			this.$nextTick(()=>{
				// document.getElementById("inviteRegister").style.height = window.screen.availHeight+ 33 + "px";
				 
			});
			
			//是否在app内
			if(ua.match(/wqbol/i)=="wqbol"){
				this.isApp = true;
			}else{
				this.isApp = false;
			}
		},
		components: {
			headerTitle,
			Actionsheet,
			scanMessageBox
		},
		methods: {
			// actionSheet: function(){
		 //        this.sheetVisible = true;
		 //    },
		 //    getCamera: function(){  
		 //        alert("打开照相机")
		 //    },
		 //    getLibrary: function(){
		 //    	alert("打开相册")
		 //    },
			//首页活动链接--轮播图
			active(url,item){
				
 				function getQueryString(address,name) {
					var str  = address.substring(address.indexOf("?"));
			        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
			        var r = str.substr(1).match(reg); 
			        if (r != null){ 
			            return unescape(r[2]);
			        } 
			        return null;
				};

				//console.log( getQueryString (item.LinkWebSite,"id" ) );

 				if(item.Type == 0){ //活动
 					// return
					 this.$router.push( item.Describe); 
//					 this.$router.push( item.DataDictionaryName); 
 				}else{// 产品详情
 					let id = getQueryString(item.LinkWebSite,'id');
 					let type = getQueryString(item.LinkWebSite,'type');
 					this.$router.push({path:"/home/productDetails",query:{id:id,type:type,style:0}});
 				};
				
			},
			//注册协议
            goAgreement(){
            	this.$router.push('/mine/agreement');
            },
			downloadAPP() {
				var  ua = navigator.userAgent.toLowerCase();
			    if(ua.match(/MicroMessenger/i)=="micromessenger") {  
			       this.isOpen = true;
			    } else {  
			        this.$router.push('/home/downloadAPP');
			    }  
			},
			getButton(){
				this.$router.replace('/mine/coupon');
			},
			clise(){
				this.isShow = false;
			},
			//验证手机号
			verifyP(){
				if(!this.phone.trim()){
					return;
				}
        		var status = this.commonTool.regularJudgement("phone",this.phone);
				if (status) {
					this.isPhone = true;
				}else{
					this.isPhone = false;
				}
        	},
        	//判断密码 
        	verifyPassword(){
				if(!this.register.password.trim()){
					return;
				}
				var status = this.commonTool.regularJudgement("password",this.register.password);
				if (status) {
					this.password = true;
				}else{
					this.password = false;
				}
        	}, 
 
        	//判断验证码
        	verifyM(){
				if(!this.noteCode.trim()){
					return;
				}
        		var status = this.commonTool.regularJudgement("noteCode",this.noteCode);
				if (status) {
					this.isCode = true;
				}else{
					this.isCode = false;
				}
        	},
        	//获取验证码
        	getVerification(){
				
				var timer = null;
				
        		if(this.isPhone){
        			this.isGet = false;
        			var params = {
	        			mobile:this.phone
	        		};
        			getd.getVerification(params)
	        		.then((res)=>{
	        			console.log('进了吗111111')
	        		}).catch(err=>{
						console.log('进了吗222222')
					})
	        		//倒计时45s
	        		timer = setInterval(()=>{
	        			if(this.time==1){
	        				this.time = 45;
	        				clearInterval(timer);
	        				this.isGet = true;
	        			}else{
	        				this.time--;
	        			}
	        		},1000)
        		}
        	},
        	//登录完成的判断
        	isEnd(){
        		//是否在app内
				var ua = navigator.userAgent.toLowerCase();
    			if(ua.match(/wqbol/i)=="wqbol"){
    				//是否首次登陆
        			if(this.LastLoginTime===null){
        				store.commit(types.FIRST, true);
        				//活动是否到期
        				var t = new Date().getTime();
	        			if(this.expiredTime>t){
	        				store.commit(types.JUDGE, true);
	        				this.$router.replace('/home');
	        			}else{
	        				this.$router.replace('/mine/myInformation');
	        			}
        			}else{
        				this.$router.replace('/home');
        			}
    			}else{
    				//this.isShow = true;//显示下载app
    				this.$router.replace('/home/downloadAPP');//直接跳转 下载页面
    			}
        	},
        	//下一步
        	goNext(){
        		let  passwordEncrypt =  CryptoJS.AES.encrypt(this.register.password, '59964e5d540e446cf98bc2af78a2ea58');//密码加密 
        		
        		//判断终端设备是否为微信浏览器
            	if(tool.is_weixn()){
            		//为公众号
            		this.registerResource = 3;
            	}else{
            		//为app
            		this.registerResource = 0;
            	}
        		//注册
                if( this.isPhone && this.password  && this.isCode && this.allChecked){
//              	if(this.companyName.trim()=="" || this.headerImage.trim()==""){
                		var params = {
//							Name:this.companyName,
//							BusinessLicense:this.headerImage,
							Mobile:this.phone,
							Password:encodeURI(passwordEncrypt.toString()),
							openSSL:true,
							VerifyCode:this.noteCode,
							Recommender:this.rec,
							Type:0,
							regSource:this.registerResource,
							datatype:"json"
						};
//              	}else{
//              		var params = {
//							Name:this.companyName,
//							BusinessLicense:this.headerImage,
//							Mobile:this.phone,
//							Password:this.register.password,
//							VerifyCode:this.noteCode,
//							Recommender:this.rec,
//							Type:1,
//							datatype:"json"
//						};
//              	}
					
					getd.getRegister( params )
	        		.then((res)=>{
	        			//console.log(res)
	        			let  passwordEncrypt =  CryptoJS.AES.encrypt(res.data.Password, '59964e5d540e446cf98bc2af78a2ea58');//密码加密
	        			//注册成功后登陆
	        			var params1 ={
					        LoginName:res.data.Mobile,
    						VerifyCode:"",
    						Password:encodeURI(passwordEncrypt.toString()),
    						openSSL:true,
    						rememberMe:true,
							isBackLogin:true,
							returnUrl:"/mine",
							datatype:"json"
					    };
	            		getd.getLogin(params1)
		        		.then((response)=>{
		        			//console.log(response)
		        			this.expiredTime = response.data.ActivityEndTime.slice(6,19);
		        			this.LastLoginTime = response.data.LastLoginTime;
		        			Indicator.close();
		        			this.commonTool.saveToLocal('login_user_id','login_user_id','login_user_id',response.data);
							store.commit(types.LOGIN, response.data.Token);
							
							//下一步
							// this.isShowHeaderImage = true;
							if(tool.is_app()){
								this.$router.push('/home')
							}else{
								this.$router.push('/home/downloadAPP')
							}
		        		})
		        		.catch((error)=>{
							Indicator.close();
							 Toast({
							   message: error.data.msg, 
							   duration: 2000
							 });
							//console.log(error);
						})
		        		
	        		})
	        		.catch((error)=>{
	        			Indicator.close();
						Toast({
						  message: error.data.msg, 
						  duration: 2000
						});
						//console.log(error);
					})
                }else if(this.phone&&this.register.password&&this.noteCode&&this.allChecked){
                	if(!this.isPhone){
	                	Toast({
						  	message: "手机号码错误", 
						  	duration: 2000
						});
	                }else if(!this.isCode){
	                	Toast({
						  	message: "验证码错误", 
						  	duration: 2000
						});
	                }else if(!this.password){
	                	Toast({
						  	message: "密码错误,请至少输入6位字符", 
						  	duration: 2000
						});
	                }
                }
            },
            //完成提交
            toImprove(){
            	if (this.companyName&&this.headerImage&&this.socialCreditCode) {
	 				var params = {
	 					Id:"",
						SocialCreditCode:this.socialCreditCode,
						Name:this.companyName,
						BusinessLicensePic:this.headerImage,
						TaxpayersType:"",
						BankName:"",
						BankAccount:"",
						TaxIdAddressProvince:"",
						TaxIdAddressCity:"",
						TaxIdAddressArea:"",
						TaxIdAddress:"",
						CompanyAddressProvince:"",
						CompanyAddressCity:"",
						CompanyAddressArea:"",
						CompanyAddress:"",
						Phone:"",
						datatype:"json"
	 				}
	 				getd.cusCompanySave(params)
	 				.then((res)=>{
	 					//console.log(res)
	 					this.isEnd();
	 				})
	 				.catch((error)=>{
	 					Toast({
						  message: error.data.msg, 
						  duration: 2000
						});
	 				})
	 			}else{
 					Toast({
					  message: '请完善公司信息', 
					  duration: 2000
					});
	 			}
            },
		    agree(){
            	this.allChecked= !this.allChecked; 
            },
			// invitePoliteness(){
			// 	this.$router.push('/home/invitePoliteness')
			// },
			 //上传营业执照
	 		toChoose(){
	 			if(ua.match(/wqbol/i)=="wqbol"){
	 				this.showActionSheet();
	 			}
	 		},
	 		//点击事件，弹出选择摄像头和相册的选项
			showActionSheet() {  
			 	var self = this;
				var bts = [{    
				    title: "拍照"    
				}, {    
				    title: "从相册选择"    
				}];    
				plus.nativeUI.actionSheet({    
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
			    });    
			},
			//拍照
			getImage(){
				// 获取设备默认的摄像头对象 
				var self = this;
				var cmr = plus.camera.getCamera(1);
				cmr.captureImage(
					function(capturedFile) {
						//通过URL参数获取目录对象或文件对象
						plus.io.resolveLocalFileSystemURL(capturedFile, function(entry) {    
				           
				           var task = plus.uploader.createUpload( "https://api.wqbol.com/Upload/Save", {}, function ( t, status ) {
								// 上传完成
								if ( status == 200 ) {
									//console.log( "Upload success: " + JSON.stringify(t) );
									self.headerImage = JSON.parse(t.responseText).data.storeResult.path;
								} else {
									//console.log( "Upload failed: " + status );
								}
							});
							task.addFile( entry.toLocalURL(), {key:"testdoc"} );
							task.addData( "type", "businessLicense" );
							task.addData( "file", entry.toLocalURL() );
							task.addData( "Token", self.getToken());
							task.start();
							self.compressImage(entry.toLocalURL(),entry.name);
				       	}, function(e) {    
				           plus.nativeUI.toast("读取拍照文件错误：" + e.message);    
				       	});
					},
					function(error) {
						//console.log('拍照失败'+error.code+error.message)
					},
					{    
				       	filter: 'image'   
				   	}
				)
			},
			//压缩图片    
		   	compressImage(url,filename){    
		   		var self = this;
			   	var name="_doc/upload/"+filename;  
			   	plus.zip.compressImage({    
			           src:url,//src: (String 类型 )压缩转换原始图片的路径    
			           dst:name,//压缩转换目标图片的路径    
			           quality:40,//quality: (Number 类型 )压缩图片的质量.取值范围为1-100    
			           overwrite:true//overwrite: (Boolean 类型 )覆盖生成新文件    
			   	},    
			   	function(zip) {  
			       //页面显示图片  
			       self.showPics(zip.target,name);  
			   	},function(error) {    
			       	plus.nativeUI.toast("压缩图片失败，请稍候再试");    
			   	});    
		   	},
			//显示图片
			showPics(url,name){
			 	var self = this;
				//根据路径读取到文件   
		   		plus.io.resolveLocalFileSystemURL(url,function(entry){  
		   			entry.file( function(file){  
		       			var fileReader = new plus.io.FileReader();  
		       			fileReader.readAsDataURL(file);
						fileReader.onloadend = function(e) {
							var img = e.target.result.toString();
							var picUrl = e.target.result.toString();
							picUrl = picUrl.substring(picUrl.indexOf(",")+1);
							//console.log(picUrl)
							axios({
							  	method: 'post',
							  	url: 'https://dm-58.data.aliyun.com/rest/160601/ocr/ocr_business_license.json',
							  	data: {
								  	"inputs": [
								    {
								      "image": {
								        "dataType": 50,
								        "dataValue": picUrl
								      }
								    }
								  ]
								},
							  headers:{'Authorization':'APPCODE d941f350729443bfb8e1c6884d66dfab'},
							})
						  	.then(function (response) {
							  	Indicator.close();
							    var obj = JSON.parse(response.data.outputs[0].outputValue.dataValue);
							    
							    //判断是否识别出
							    if(obj.name&&(obj.name!="FailInRecognition")){
							    	self.companyName = obj.name;
							    }else{
							    	self.companyName = "";
							    }
							    if(obj.reg_num&&(obj.reg_num!="FailInRecognition")){
							    	self.socialCreditCode = obj.reg_num;
							    }else{
							    	self.socialCreditCode = "";
							    }
							    if(obj.person&&(obj.person!="FailInRecognition")){
							    	self.legalRepresentative = obj.person;
							    }else{
							    	self.legalRepresentative = "";
							    }
							    if(obj.establish_date&&(obj.establish_date!="FailInRecognition")){
							    	self.establishmentDate = obj.establish_date.substring(0,4)+"-"+obj.establish_date.substring(4,6)+"-"+obj.establish_date.substring(6);
							    }else{
							    	self.establishmentDate = "";
							    }
							})
						  	.catch(function (error) {
							    //console.log(error);
							    self.headerImage = "";
							    self.companyName = "";
							    self.socialCreditCode = "";
							    alert("请重新上传清晰图像");
							});
						}
					});	
				});
			},
			//从相册选择照片  
		   	galleryImgs() {   
		   	 	var self = this;
			    plus.gallery.pick(function(e) {    
			    	var task = plus.uploader.createUpload( "https://api.wqbol.com/Upload/Save", {}, function ( t, status ) {
						// 上传完成
						if ( status == 200 ) {
							//console.log( "Upload success: " + JSON.stringify(t) );
							self.headerImage = JSON.parse(t.responseText).data.storeResult.path;
						} else {
							//console.log( "Upload failed: " + status );
						}
					});
					task.addFile( e, {key:"testdoc"} );
					task.addData( "type", "businessLicense" );
					task.addData( "file", e );
					task.addData( "Token", self.getToken());
					task.start();
			        var name = e.substr(e.lastIndexOf('/') + 1);  
			       	self.compressImage(e,name);  
			    }, function(e) {    
			    }, {    
			        filter: "image"    
			    });    
		    },
		    
		    //web获取营业执照
		    upload(){
				var self = this;
				// 选择的文件对象
				var file = null;
				var baseStr = null;
				var eleFile = document.querySelector('#upload');
				// 压缩图片需要的一些元素和对象
				var reader = new FileReader(), img = new Image();
				file = eleFile.files[0];
				if(!eleFile.files.length) return;
		    	// 选择的文件是图片
		    	if (file.type.indexOf("image") == 0) {
		        	reader.readAsDataURL(file);    
		    	}
				// 缩放图片需要的canvas
				var canvas = document.createElement('canvas');
				var context = canvas.getContext('2d');
				
				// base64地址图片加载完毕后
				img.onload = function () {
				    // 图片原始尺寸
				    var originWidth = this.width;
				    var originHeight = this.height;
				    // 最大尺寸限制
				    var maxWidth = 400, maxHeight = 400;
				    // 目标尺寸
				    var targetWidth = originWidth, targetHeight = originHeight;
				    // 图片尺寸超过400x400的限制
				    if (originWidth > maxWidth || originHeight > maxHeight) {
				        if (originWidth / originHeight > maxWidth / maxHeight) {
				            // 更宽，按照宽度限定尺寸
				            targetWidth = maxWidth;
				            targetHeight = Math.round(maxWidth * (originHeight / originWidth));
				        } else {
				            targetHeight = maxHeight;
				            targetWidth = Math.round(maxHeight * (originWidth / originHeight));
				        }
				    }
				        
				    // canvas对图片进行缩放
				    canvas.width = targetWidth;
				    canvas.height = targetHeight;
				    // 清除画布
				    context.clearRect(0, 0, targetWidth, targetHeight);
				    // 图片压缩
				    context.drawImage(img, 0, 0, targetWidth, targetHeight);
				    baseStr = canvas.toDataURL("image/png");//压缩后base64数据    
					};
					
					// 文件base64化，以便获知图片原始尺寸
					reader.onload = function(e) {
						//压缩前base64数据    
						var imgData = e.target.result;
						imgData = imgData.substring(imgData.indexOf(",")+1);
						axios({
						  	method: 'post',
						  	url: 'https://dm-58.data.aliyun.com/rest/160601/ocr/ocr_business_license.json',
						  	data: {
							  	"inputs": [
							    {
							      "image": {
							        "dataType": 50,
							        "dataValue": imgData
							      }
							    }
							  ]
							},
						  headers:{'Authorization':'APPCODE d941f350729443bfb8e1c6884d66dfab'},
						})
					  	.then(function (response) {
						  	Indicator.close();
						    var obj = JSON.parse(response.data.outputs[0].outputValue.dataValue);
						    
						    self.headerImage = baseStr;
						    //判断是否识别出
						    if(obj.name&&(obj.name!="FailInRecognition")){
						    	self.companyName = obj.name;
						    }else{
						    	self.companyName = "";
						    }
						    if(obj.reg_num&&(obj.reg_num!="FailInRecognition")){
						    	self.socialCreditCode = obj.reg_num;
						    }else{
						    	self.socialCreditCode = "";
						    }
						    if(obj.person&&(obj.person!="FailInRecognition")){
						    	self.legalRepresentative = obj.person;
						    }else{
						    	self.legalRepresentative = "";
						    }
						    if(obj.establish_date&&(obj.establish_date!="FailInRecognition")){
						    	self.establishmentDate = obj.establish_date.substring(0,4)+"-"+obj.establish_date.substring(4,6)+"-"+obj.establish_date.substring(6);
						    }else{
						    	self.establishmentDate = "";
						    }
					  	})
					  	.catch(function (error) {
						    //console.log(error);
						    self.headerImage = "";
						    self.companyName = "";
						    self.socialCreditCode = "";
						    alert("请重新上传清晰图像");
						});
							//调用上面的img.load
						  img.src = e.target.result;
					};
			},
		    //扫一扫弹窗组件
		    toClose(){
		    	this.isShowMessageBox = false;
		    }
		}
	};
</script>

<style lang="less" type="stylesheet/css" scoped>
	@import "../../common/index.less";
	#inviteRegister{
     width: 100%;
     min-height: 100%;
     background: #FFF;
    /*position: absolute;
     left: 0;
     top: 0;
     bottom: 0;
     */
}
 .kindlyReminder{
     background: #fffbf0;
     padding: 0.24324324324324326rem 0.5405405405405406rem 0.2702702702702703rem 0.40540540540540543rem;
     p{
         font-size: 0.35135135135135137rem;
         color: #ff6767;
         line-height: 0.4864864864864865rem;
    }
}
 .inviteRegister{
     position: relative;
}
 .inviteRegister .businessLicence .skipBtn{
     color: #333;
}
 .inviteRegister .businessLicence .sbtRegister{
     margin-top: 0.4864864864864865rem;
     margin-bottom: 0.5405405405405406rem;
     background-size: 100% 100%;
     background-position: 0rem 0rem !important;
     .bg-image('../../assets/images/mine/register/registers');
}
 .inviteRegister_top{
     width: 100%;
     height: 4.378378378378378rem;
     margin-top: 1.1891891891891893rem;
     background-size: 100% 100%;
     //.bg-image('../../assets/images/home/invitePoliteness/banner');
    /*background-image: url(../../assets/images/theCoupleRegistered/presentBanner@3x.png);
     */
}
 .inviteRegister{
     margin-top: 0.32432432432432434rem;
     padding: 0.2702702702702703rem 0.8108108108108109rem 1.3513513513513513rem 0.8108108108108109rem;
     background: #fff;
}
 .inviteRegister form div i{
     color: red;
     padding-right: 0.21621621621621623rem;
     position: absolute;
     left: -0.3783783783783784rem;
     top: 0.40540540540540543rem;
}
 .inviteRegister div {
     width: 100%;
     height: 1.0810810810810811rem;
     margin-bottom: 0.32432432432432434rem;
     position: relative;
}
 .inviteRegister div input{
     border: 1px solid #EBE5E1;
     padding-left: 0.35135135135135137rem;
     height: 1.0810810810810811rem;
     width: 100%;
     outline: none;
    /*解决ios input默认阴影*/
     -webkit-appearance: none;
}
 .inviteRegister .verification input{
     width: 62% !important;
}
 .photograph{
     height: 1.0810810810810811rem;
     width: 100%;
     display: block;
     position: absolute;
     left: 0%;
     top: 0;
     background-size: 0.5405405405405406rem 0.43243243243243246rem;
     background-position: 95% 0.32432432432432434rem;
     background-repeat: no-repeat;
     .bg-image('../../assets/images/home/invitePoliteness/photograph');
}
 .getVerification{
     width: 35%;
     height: 1.0810810810810811rem;
     line-height: 1.0810810810810811rem;
     text-align: center;
     background: #EFEFF4;
     border: 1px solid #EBE5E1;
     border-radius: 0.05405405405405406rem;
     display: block;
     float: right;
     .fs15;
     color: #B2B2B2;
}
 .getVerification.active{
	 font-size: 0.373333rem;
     color: #FA2802;
}
 .inviteRegister div:nth-child(5){
    /*margin-top: 0.8108108108108109rem;
     */
}
 .sbtRegister,.skipBtn{
     width: 100%;
     height: 1.0810810810810811rem;
     border: none;
     outline: none;
     font-size: 0.4rem;
     .cff;
     background-size: 100% 100%;
     background-position: 0rem 0rem !important;
     .bg-image('../../assets/images/mine/register/register');
}
 .sbtRegister.active{
     background-size: 100% 100%;
     background-position: 0rem 0rem !important;
     .bg-image('../../assets/images/mine/register/registers');
}
 .wqblogo{
     padding: 0.5675675675675675rem 0 0.2702702702702703rem 0;
     width: 100%;
     text-align: center;
     background: white;
}
 .wqblogo img{
     width: 1.6216216216216217rem;
     height: 0.5675675675675675rem;
}
 .mint-actionsheet{
     background: none;
     padding: 0 0.2702702702702703rem 0.2702702702702703rem 0.2702702702702703rem;
}
 .agreement {
	 font-size: 0.373333rem;
     padding: 0.5405405405405406rem 0 0 0.13513513513513514rem !important;
     border: none !important;
}
 .agreement img {
     width: 0.4864864864864865rem;
     height: 0.4864864864864865rem;
     padding: 0.05405405405405406rem;
     vertical-align: middle;
}
 .agreement span:nth-child(3){
     .cff8;
}
 .referrer{
     position: absolute;
     margin: 0.3783783783783784rem 0 0 0.35135135135135137rem;
     display: block;
     color: #8C8C8C;
}
#inviteRegister input{
	//input 统一30px
	font-size: 0.4rem;
}
 .referrerS input{
	 
     color: #8C8C8C;
     padding-left: 2.108108108108108rem !important;
     background: #f5f5f5;
}
 #picture{
     width: 1.0810810810810811rem;
     height: 0.8648648648648649rem;
     position: absolute;
     left: 0.35135135135135137rem;
     top: 0.13513513513513514rem;
}
 #upload{
     opacity: 0;
     filter: alpha(opacity=0);
     position: absolute;
     left: 0;
     top: 0;
}
 .theRegistered{
     display: block;
     width: 100%;
     height: 100%;
     background-color: rgba(0,0,0,0.4);
     //opacity: 0.5;
     position: fixed;
     z-index: 9999;
     background-position: 46% 40%;
     background-size: 90% 35%;
     .bg-image('../../assets/images/theCoupleRegistered/redPacket');
}
 .close{
     width: 0.5405405405405406rem;
     height: 0.5405405405405406rem;
     background-size: 0.5405405405405406rem;
     float: right;
     margin: 46% 10% 0 0;
     //background-image: url(../../assets/images/tabBar/close1@3x.png);
     .bg-image('../../assets/images/tabBar/close1');
}
 .theRegistered .discounts {
     width: 2.7027027027027026rem;
     height: 2.1621621621621623rem;
     margin: 0 auto;
     position: relative;
     bottom: -36.5%;
}
 .theRegistered .discounts span{
     width: 100%;
     display: block;
     height: 1.0810810810810811rem;
     text-align: center;
     line-height: 1.0810810810810811rem;
}
 .theRegistered .discounts span:nth-child(1){
     color:#EC4D35;
     font-size: 0.6756756756756757rem;
}
 .theRegistered .discounts span:nth-child(2){
     color:#EC4D35;
     .fs15;
}
 .hint{
     width: 4.27027027027027rem;
     line-height: 0.5405405405405406rem;
     position: relative;
     bottom: -52%;
     margin: 0 auto;
     text-align: center;
     .fs13;
     .cff;
}
 .getButton {
     width: 4rem;
     height: 1.027027027027027rem;
     line-height: 1.027027027027027rem;
     text-align: center;
     color: #FFEA97;
     margin: 0 auto;
     position: relative;
     bottom: -56%;
     background-size: 100% 100%;
     .bg-image('../../assets/images/theCoupleRegistered/examine');
}
 #img{
     width: 100%;
     position: fixed;
     left: 0;
     top: 0;
     bottom: 0;
     background: #000000;
     opacity: 0.76;
     z-index: 999;
}
 #img img{
     margin-top: 0.2702702702702703rem;
     margin-right: 0.7567567567567568rem;
}
 .sbtRegister_div{
     height: 4.864864864864865rem !important;
     margin-bottom: 0rem !important;
}
 
</style>