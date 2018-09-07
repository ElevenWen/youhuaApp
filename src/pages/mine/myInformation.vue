<template>
	<div id="myInformation">
		<div class="back">
			<span  class="return" @click="goBack()"></span>
			我的信息
		</div>
		<div class="informations">
			  <div class="head_portrait">
				<span>头像</span>
				<div @click="toChoose">
					<img id="picture" :src="headerImage" v-show="headerImage"/>
					<img src="../../assets/images/tabBar/right_arrow@3x.png" />
					<!--<form enctype="multipart/form-data" :action="'https://112.74.135.230:3215/Upload/Save?type=avatar&dataType=json&Token='+_token" method="POST" id="myform" >-->
					<!--<form enctype="multipart/form-data" id="myform">-->
						<input type="file" id="upload" accept="image/*" name="image_file" @change="upload" v-show="!isApp"/>
					<!--</form>-->
				</div>
			  </div>
			<div class="user_name">
				<span>用户名</span>
				<div>{{userInfo.Account}}</div>
			</div>
			<div class="nike_name" @click="updateNikeName">
				<span>昵称</span>
				<div>{{nickname}}<img src="../../assets/images/tabBar/right_arrow@3x.png" /></div>
			</div>
			<div class="gender" @click="gender">
				<span>性别</span>
				<div>{{sex}}<img src="../../assets/images/tabBar/right_arrow@3x.png" /></div>
			</div>
			<div class="mobile_phone">
				<span>手机</span>
				<div>{{userInfo.Mobile}}</div>
			</div>
			<div class="shipping_address" @click="shippingAddress">
				<span>收货地址</span>
				<div><img src="../../assets/images/tabBar/right_arrow@3x.png" /></div>
			</div>
			<!-- <div class="nike_name" @click="updateCompany" v-if="false">
				<span>公司</span>
				<div>{{companyName}}<img src="../../assets/images/tabBar/right_arrow@3x.png" /></div>
			</div> -->
			<div class="referrer">
				<span>推荐人</span>
				<div class="tuijianren">{{userInfo.RecommenderAccount}}</div>
			</div>
		    <!-- <mt-actionsheet :actions= "data1" class="genders" v-model="genders"></mt-actionsheet> -->
				<mt-actionsheet id="abcd" :actions= "data1" class="genders" v-model="genders"></mt-actionsheet>
		</div>
		<!--扫一扫弹窗-->
		<scanMessageBox :isShowMessageBox="isShowMessageBox" @closePop="toClose"></scanMessageBox>
	</div>
</template>

<script>
import headerTitle from "../components/header-title";
import footerNav from '../../footer-nav';
import Actionsheet from 'mint-ui';
import getd from '../../vuex/getData.js';
import axios from 'axios';
import scanMessageBox from "../components/scanMessageBox.vue"
//Vue.component(Actionsheet.name,Actionsheet);

var ua = navigator.userAgent.toLowerCase();
export default{
	name: 'informations',  
	data () {  
      	return {  
			data1: [{
				name: '保密',  
	      		method : this.confidentiality
			}, {
				name: '男',   
	      		method : this.man
			}, {
				name: '女',   
	      		method : this.woman
			}],
			genderSelection: '',//存储性别
			sheetVisible: false,
			genders: false,
			userInfo:{},
			sex:"",
			headerImage:"",
			selected:"",
			nickname:"",
	        companyName:"", //公司名字
	        isApp:true,//是否在app
	        _token:"", //token值
	        isShowMessageBox:false,//显示扫一扫弹窗
  		}
	},
	created(){
		this._token = this.getToken();
		//获取当前用户信息
		var params = {
			datatype:"json"
		};
		getd.getCustomerInfo(params)
		.then((res)=>{
			this.userInfo = res.data;
			this.headerImage = res.data.HeadPicPath;
			if(res.data.Sex == 0){
				this.sex = "男";
			}else if (res.data.Sex == 1) {
				this.sex = "女";
			}else if (res.data.Sex == 2) {
				this.sex = "保密";
			}
			if (!res.data.Nickname||res.data.Nickname.length==0) {
				this.nickname = "暂无";
			}else{
				this.nickname = res.data.Nickname;
			};
		      if (!res.data.Name||res.data.Name.length==0) {
		        this.companyName = "暂无";
		      }else{
		        this.companyName = res.data.Name;
		      }
		})
	},
	mounted(){
		//是否在app内
		if(ua.match(/wqbol/i)=="wqbol"){
			this.isApp = true;
		}else{
			this.isApp = false;
		}

		this.$nextTick(()=>{ 
			for(var i = 0 ; i <document.getElementById('abcd').getElementsByTagName('li').length ;i++){
			document.getElementById('abcd').getElementsByTagName('li')[i].setAttribute('style',"height: 1.2rem!important;line-height: 1.2rem!important;font-size:0.48rem!important");
			}
			document.getElementById('abcd').getElementsByTagName('a')[0].setAttribute('style',"height: 1.2rem!important;line-height: 1.2rem!important;font-size:0.48rem!important")  
		})
	},

    activated: function () { 
      
    },
    deactivated: function () {  
     
    },
    
	methods: {
		goBack(){
			this.$router.push('/mine');
		},
		updateCompany(){
			this.$router.push('/mine/updateCompany');
		},
		//收货地址
		shippingAddress(){
			this.$router.push('/mine/shippingAddress');
		},
		//修改个人信息
		modify(val){
			if (this.headerImage) {
				this.selected = ",Sex";
			}else{
				this.selected = ",Sex";
			}
			var params={
    			Sex:val,
    			HeadPicPath:this.headerImage,
    			modifyField:"HeadPicPath"+this.selected,
    			datatype:"json"
    		}
			getd.reviseCustomerInfo(params)
    		.then((res)=>{
    			if(val == 0){
					this.sex = "男";
				}else if (val == 1) {
					this.sex = "女";
				}else if (val == 2) {
					this.sex = "保密";
				}
    		})
		},
	    gender: function(){
	      this.genders = true;
	    },
	    confidentiality: function(){
    		this.genderSelection = "2";
    		this.modify(this.genderSelection);
	    },
	    man: function(){
    		this.genderSelection = "0";
    		this.modify(this.genderSelection);
	    },
	    woman: function(){
    		this.genderSelection = "1";
    		this.modify(this.genderSelection);
	    },
	    updateNikeName(){
	    	if(this.sex == "男"){
				this.genderSelection = 0;
			}else if (this.sex == "女") {
				this.genderSelection = 1;
			}else if (this.sex == "保密") {
				this.genderSelection = 2 ;
			}
	    	this.$router.push({name:'updateNikeName',params:{sex:this.genderSelection,nickname:this.nickname}});
	    },
	    //app外调input
	    upload(e){
	    	let files = e.target.files || e.dataTransfer.files;
	    	if(!files.length) return;
	    	
	    	if(this.sex == "男"){
				this.genderSelection = 0;
			}else if (this.sex == "女") {
				this.genderSelection = 1;
			}else if (this.sex == "保密") {
				this.genderSelection = 2 ;
			}
			
			//传给后台
			var acv = new FormData();
			acv.append('file', files[0]);
			acv.append('Token',this.getToken());
			acv.append('type', 'avatar');
			
			getd.upNetImage(acv)
			.then((res)=>{
				this.headerImage = res.data.storeResult.path;
				this.modify(this.sex);
			})
			.catch((error)=>{
				//console.log(error);
			})
	    },
	      
	      	//app内调原生
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
//				           	self.compressImage(entry.toLocalURL(),entry.name); 
				           	var task = plus.uploader.createUpload( "https://api.wqbol.com/Upload/Save", {}, function ( t, status ) {
								// 上传完成
								if ( status == 200 ) {
									//console.log( "Upload success: " + JSON.stringify(t) );
									self.headerImage = JSON.parse(t.responseText).data.storeResult.path;
									
									if(self.sex == "男"){
										self.genderSelection = 0;
									}else if (self.sex == "女") {
										self.genderSelection = 1;
									}else if (self.sex == "保密") {
										self.genderSelection = 2 ;
									}
							        self.modify(self.genderSelection);
								} else {
									//console.log( "Upload failed: " + status );
								}
							});
							task.addFile( entry.toLocalURL(), {key:"testdoc"} );
							task.addData( "type", "avatar" );
							task.addData( "file", entry.toLocalURL() );
							task.addData( "Token", self.getToken());
							task.start();
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
							var picUrl = e.target.result.toString();
							self.headerImage = picUrl;
							
							//这里写接口 
					        if(self.sex == "男"){
								self.genderSelection = 0;
							}else if (self.sex == "女") {
								self.genderSelection = 1;
							}else if (self.sex == "保密") {
								self.genderSelection = 2 ;
							}
					        self.modify(self.genderSelection);
						}
					});	
				});
			},
			//从相册选择照片  
		   	galleryImgs() {   
		   	 	var self = this;
			    plus.gallery.pick(function(e) {    
//			    	var task = plus.uploader.createUpload( "https://api.wqbol.net/Upload/Save", {}, function ( t, status ) {
			    	var task = plus.uploader.createUpload( "https://api.wqbol.com/Upload/Save", {}, function ( t, status ) {
						// 上传完成
						if ( status == 200 ) {
							//console.log( "Upload success: " + JSON.stringify(t) );
							self.headerImage = JSON.parse(t.responseText).data.storeResult.path;
							
							if(self.sex == "男"){
								self.genderSelection = 0;
							}else if (self.sex == "女") {
								self.genderSelection = 1;
							}else if (self.sex == "保密") {
								self.genderSelection = 2 ;
							}
					        self.modify(self.genderSelection);
						} else {
							//console.log( "Upload failed: " + status );
						}
					});
					task.addFile( e, {key:"testdoc"} );
					task.addData( "type", "avatar" );
					task.addData( "file", e );
					task.addData( "Token", self.getToken());
					task.start();
//			        var name = e.substr(e.lastIndexOf('/') + 1);  
//			       	self.compressImage(e,name);  
			    }, function(e) {    
			    }, {    
			        filter: "image"    
			    });    
		    },
		    //扫一扫弹窗组件
		    toClose(){
		    	this.isShowMessageBox = false;
		    }
	      
	 },
    components:{
    	headerTitle,
    	footerNav,
    	Actionsheet,
    	scanMessageBox
    },
}
</script>

<style lang="less" type="stylesheet/css" scoped>
	@import "../../common/index.less";
	@import 'mine.less';
	.head_portrait div{
     position: relative;
}
 .head_portrait div input{
     width: 2.7027027027027026rem;
     height: 1.2432432432432432rem;
     opacity: 0;
     filter: alpha(opacity=0);
     position: absolute;
     left: 0;
     top: 0;
}
 #picture{
     width: 1.2432432432432432rem;
     height: 1.2432432432432432rem;
     border-radius: 50%;
     position: absolute;
     left: 0.5945945945945946rem;
     top: 0;
}
 .back{
     position: fixed;
     height: 1.1891891891891893rem;
     width: 100%;
     text-align: center;
     line-height: 1.162162162162162rem;
     font-size: 0.4864864864864865rem;
     color: #1F1F1F;
     border-bottom: 1px solid #EBE5E1;
     top: 0;
     right: 0;
     left: 0;
     background:white;
     z-index: 999;
}
 .return{
     padding-left: 0.40540540540540543rem;
     height: 1.0810810810810811rem;
     width: 0.6486486486486487rem;
     .bg-image('../../assets/images/tabBar/nav_back');
     background-size: 100%;
     background-position: 0.40540540540540543rem 0.24324324324324326rem;
     position: absolute;
     left: 0;
}
 .informations .tuijianren{
     position: relative;
     width: 2.7027027027027026rem !important;
     float: right;
     height: 1.3513513513513513rem;
     line-height: 1.3513513513513513rem;
     text-align: right;
}
.mint-actionsheet-listitem{
	height: 0.6rem;
	line-height: 0.6rem;
	font-size: 0.24rem;
}
</style>