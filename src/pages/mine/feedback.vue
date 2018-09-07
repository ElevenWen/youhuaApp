<style type="text/css" lang="less" scoped>
	@import "../../common/index.less";
		// 头部样式
	#title{
     background:white;
}
 .popularity_header {
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
 .return a{
     width: 100%;
     height: 100%;
     display: block;
}
 #submit{
     position: absolute;
     right: 0.40540540540540543rem;
     font-size: 0.40540540540540543rem;
     color: #B2B2B2;
     margin-right: 0.40540540540540543rem;
}
 #submit.active{
     color:#fa2802;
}
 // 输入反馈意见 
 #content{
     width: 100%;
     min-height: 5.702702702702703rem;
     background: #fff;
     margin-top: 1.5135135135135136rem;
     padding: 0.2702702702702703rem 0 0 0.32432432432432434rem;
     color: #B2B2B2;
     resize:none;
	 border: 0;
	 font-size: 0.373333rem;
}
 // 上传照片 
 .uploadImgWrap{
     height: 2.945945945945946rem;
     background: #fff;
     margin-top: 0.2702702702702703rem;
}
 .uploadImgFont{
     padding: 0.43243243243243246rem 0 0 0.32432432432432434rem;
     font-size: 0.40540540540540543rem;
     font-weight: 600;
}
 .uploadImgFont span{
     font-size: 0.3783783783783784rem;
     color: #B3B3B3;
}
 .uploadImgWrap .img{
     float: left;
     width: 1.2972972972972974rem;
     height: 1.2972972972972974rem;
     margin: 0.40540540540540543rem 0 0 0.32432432432432434rem;
     img{
         width: 100%;
         height: 100%;
    }
}
.img{
	position: relative;
}
 // 改变input[file]的样式 
 .add{
     float: left;
     display: inline-block;
     vertical-align: middle;
     width: 1.3243243243243243rem;
     height: 1.3243243243243243rem;
     background: #EFEFF4;
     box-sizing: content-box;
     overflow: hidden;
     margin: 0.40540540540540543rem 0 0 0.32432432432432434rem;
     position: relative;
     div{
         width: 1.3243243243243243rem;
         height: 1.3243243243243243rem;
         line-height: 1.2702702702702702rem;
         font-size: 0.7027027027027027rem;
         color: #666;
         text-align: center;
    }
}
#coverImg,#file{
		width: 1.2972972972972974rem ;
		height: 1.2972972972972974rem;
		position: absolute;
		cursor: pointer;
		top: 0rem;
		left: 0;
		z-index: 22;
		opacity: 0;
}
.appC{
	width: 1.2972972972972974rem ;
	height: 1.2972972972972974rem;
	position: absolute;
	z-index: 9999;
}
 // 联系方式 
 .telphone{
     width: 100%;
     height: 1.3783783783783783rem;
     background: #fff;
     margin-top: 0.2702702702702703rem;
     padding-left: 0.32432432432432434rem;
	 border: 0;
	 font-size: 0.373333rem;
}
 // 感谢 
 .thankful{
     margin: 0.43243243243243246rem 0 0 0.32432432432432434rem;
	 color: #8C8C8C;
	 font-size: 0.373333rem;
	 line-height: 0.506667rem;
}
 
</style>
<template>
	<div id="feedback">
		<!-- 头部 -->
		<div class="popularity_header" id="title">
            <span  class="return" @click="goBack()"></span>
			<span id="title_name">意见反馈</span>
			<span id="submit" @click="submitFeedBack" :class="content&&phone?'active':''">提交</span>
		</div>
		<!-- /头部 -->
		<!-- 输入反馈意见 -->
		<textarea name="textarea" v-model="content" id="content" placeholder="输入反馈意见" maxlength="160"></textarea>
		<!-- /输入反馈意见 -->
		<!-- 上传照片 -->
		<div class="uploadImgWrap">
			<div class="uploadImgFont">上传照片<span>（选填，最多5张）</span></div>
			<div class="img" v-for="(data,index) in arr" :key="index">
				<div @click="toChoose(index)" class="appC"></div>
				<input type="file" id="coverImg" v-show="!isApp" @change="upload2($event,data,index)"/>
				<!--  -->
				<img id="upload" :src="data" alt="" v-show="headerImage">
				<!-- <img id="upload" :src="currentImg" alt="" v-else> -->
			</div>
			<div class="add" v-show="isShow">
				<div @click="toChoose(-1)">+</div>
				<input type="file" id="file" @change="upload($event)" v-show="!isApp"/>
			</div>

		</div>
		<!-- /上传照片 -->
		<!-- 联系方式 -->
		<input type="number" v-model="phone" name="text" class="telphone" placeholder="联系方式" @blur="verifyP">
		<!-- /联系方式 -->
		<div class="thankful">感谢您对我们产品及服务的关注，您还可以联系在线客服，直接向我们反馈</div>
		
		<!--扫一扫弹窗-->
		<scanMessageBox :isShowMessageBox="isShowMessageBox" @closePop="toClose"></scanMessageBox>
	</div>
</template>
<script>
	import { Toast } from 'mint-ui';
	import getD from '../../vuex/getData.js';
	import tool from "../../util/tool";
	import scanMessageBox from "../components/scanMessageBox.vue"
	var ua = navigator.userAgent.toLowerCase();
	export default {
		data(){
			return {
				headerImage:"",
				phone:"",
				arr:[],
				isShow:true,//是否选了五张
				content:"",//反馈内容
				isTrue:false,//手机号是否正确
				isApp:true,//是否在app
				currentImg:"",
				currentIndex:-1,
				isShowMessageBox:false,//显示扫一扫弹窗
			}
		},
		components: {
			scanMessageBox
		    // headerTitle
		},
		mounted(){
			this.$watch('headerImage',(newVal,oldVal)=>{
				if (this.arr.length==4) {
					this.arr.push(newVal);
					this.isShow = false;
				}else{
					this.arr.push(newVal);
				}
			})
			//是否在app内
			if(ua.match(/wqbol/i)=="wqbol"){
				this.isApp = true;
			}else{
				this.isApp = false;
			}
		},
		methods:{
			submitFeedBack(){
				if (this.content&&this.isTrue) {
					var _arr = this.arr.join("|");
					var params = {
						// params:{
							source:1,
							content:this.content,
							phone:this.phone,
							image:_arr,
						// }
					}
					getD.feedback(params).then((res) => {
						//console.log(res);
						this.$router.replace('/mine')
						Toast({
						  message: '提交成功',
						  position: 'middle',
						  duration: 2000
						});
					},err => {
						console.log(err);
						// console.log(err.data);
						// console.log(err.msg);
					}).catch(error => {
						console.log(error)
					})
					
				}else{
					Toast({
					  message: '请确保内容填写完整',
					  position: 'middle',
					  duration: 2000
					});
				}
				
			},
			goBack(){
				this.$router.go(-1);
			},
			//判断手机号
        	verifyP(){
						if(!this.phone){
							return
						}
        		var status = this.commonTool.regularJudgement("phone",this.phone);
        		if (status) {
					this.isTrue = true;
				}else{
					this.isTrue = false;
				}
        	},
			//上传营业执照
	 		toChoose(val){
				let self = this;
				self.currentIndex = val;
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
							var picUrl = e.target.result.toString();

							if(self.currentIndex == -1){
								self.headerImage = picUrl;
							}else {
								self.arr.forEach((items,index) => {
									if(index == self.currentIndex){
										items = picUrl;
									}
									self.$set(self.arr,index,items)
								})
							}
						}
					});	
				});
			},
			//从相册选择照片  
		   	galleryImgs() {   
		   	 	var self = this;
			    plus.gallery.pick(function(e) {    
			        var name = e.substr(e.lastIndexOf('/') + 1);  
			       	self.compressImage(e,name);  
			    }, function(e) {    
			    }, {    
			        filter: "image"    
			    });    
			},
			upload2(e,val,i){
				console.log(val,i,this.arr[i])
				let self = this;
				let files = e.target.files || e.dataTransfer.files;
				if(!files.length) return;
				//传给后台
				var acv = new FormData();
				acv.append('file', files[0]);
				acv.append('Token',self.getToken());
				acv.append('type', 'avatar');
				
				getD.upNetImage(acv)
				.then((res)=>{
					self.currentImg = res.data.storeResult.path;
					this.$set(self.arr,self.currentIndex+1,self.currentImg)
				})
				.catch((error)=>{
					console.log(error);
				})	
			},
		    
		    //上传图片
			upload(e) {
				let self = this;
				let files = e.target.files || e.dataTransfer.files;
				console.log(e.target,e.dataTransfer)
				if(!files.length) return;

				//传给后台
				var acv = new FormData();
				acv.append('file', files[0]);
				acv.append('Token',self.getToken());
				acv.append('type', 'avatar');
				
				getD.upNetImage(acv)
				.then((res)=>{
					self.headerImage = res.data.storeResult.path;
				})
				.catch((error)=>{
					console.log(error);
				})	
		//         let files = e.target.files || e.dataTransfer.files;
		//         if(!files.length) return;
		//         this.picValue = files[0];
		//         this.imgPreview(this.picValue);
		//       },
		//       imgPreview(file) {
		//         let self = this;
		//         let Orientation;
		//         //去获取拍照时的信息，解决拍出来的照片旋转问题 
		//         // Exif.getData(file, function() {
		//         //   Orientation = Exif.getTag(this, 'Orientation');
		//         // });
		//         // 看支持不支持FileReader 
		//         if(!file || !window.FileReader) return;
		//         if(/^image/.test(file.type)) {
		//           // 创建一个reader 
		//           let reader = new FileReader();
		//           // 将图片2将转成 base64 格式 
		//           reader.readAsDataURL(file);
		//           // 读取成功后的回调 
		//           reader.onloadend = async function() {
		//             let result = this.result;
		//             let img = new Image();
		//             img.src = result;
		//             //判断图片是否大于100K,是就直接上传，反之压缩图片 
		//             if(this.result.length <= (100 * 1024)) {
		//               self.headerImage = this.result;
		//               self.postImg();
		//             } else {
		//               img.onload = function() {
		//                 let data = self.compress(img, Orientation);
		//                 self.headerImage = data;
		//                 self.postImg();
		//               }
		//             }
		//           }
		//         }
		//       },
		//       postImg() {
		//         //这里写接口 
		        
		//       },
		//       rotateImg(img, direction, canvas) {
		//         //最小与最大旋转方向，图片旋转4次后回到原方向 
		//         const min_step = 0;
		//         const max_step = 3;
		//         if(img == null) return;
		//         //img的高度和宽度不能在img元素隐藏后获取，否则会出错 
		//         let height = img.height;
		//         let width = img.width;
		//         let step = 2;
		//         if(step == null) {
		//           step = min_step;
		//         }
		//         if(direction == 'right') {
		//           step++;
		//           //旋转到原位置，即超过最大值 
		//           step > max_step && (step = min_step);
		//         } else {
		//           step--;
		//           step < min_step && (step = max_step);
		//         }
		//         //旋转角度以弧度值为参数 
		//         let degree = step * 90 * Math.PI / 180;
		//         let ctx = canvas.getContext('2d');
		//         switch(step) {
		//           case 0:
		//             canvas.width = width;
		//             canvas.height = height;
		//             ctx.drawImage(img, 0, 0);
		//             break;
		//           case 1:
		//             canvas.width = height;
		//             canvas.height = width;
		//             ctx.rotate(degree);
		//             ctx.drawImage(img, 0, -height);
		//             break;
		//           case 2:
		//             canvas.width = width;
		//             canvas.height = height;
		//             ctx.rotate(degree);
		//             ctx.drawImage(img, -width, -height);
		//             break;
		//           case 3:
		//             canvas.width = height;
		//             canvas.height = width;
		//             ctx.rotate(degree);
		//             ctx.drawImage(img, -width, 0);
		//             break;
		//         }
		//       },
		//       compress(img, Orientation) {
		//         let canvas = document.createElement("canvas");
		//         let ctx = canvas.getContext('2d');
		//         //瓦片canvas 
		//         let tCanvas = document.createElement("canvas");
		//         let tctx = tCanvas.getContext("2d");
		//         let initSize = img.src.length;
		//         let width = img.width;
		//         let height = img.height;
		//         //如果图片大于四百万像素，计算压缩比并将大小压至400万以下 
		//         let ratio;
		//         if((ratio = width * height / 4000000) > 1) {
		// //        //console.log("大于400万像素")
		//           ratio = Math.sqrt(ratio);
		//           width /= ratio;
		//           height /= ratio;
		//         } else {
		//           ratio = 1;
		//         }
		//         canvas.width = width;
		//         canvas.height = height;
		//         // 铺底色 
		//         ctx.fillStyle = "#fff";
		//         ctx.fillRect(0, 0, canvas.width, canvas.height);
		//         //如果图片像素大于100万则使用瓦片绘制 
		//         let count;
		//         if((count = width * height / 1000000) > 1) {
		// //        //console.log("超过100W像素");
		//           count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片 
		//           //  计算每块瓦片的宽和高 
		//           let nw = ~~(width / count);
		//           let nh = ~~(height / count);
		//           tCanvas.width = nw;
		//           tCanvas.height = nh;
		//           for(let i = 0; i < count; i++) {
		//             for(let j = 0; j < count; j++) {
		//               tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
		//               ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
		//             }
		//           }
		//         } else {
		//           ctx.drawImage(img, 0, 0, width, height);
		//         }
		//         //修复ios上传图片的时候 被旋转的问题 
		//         if(Orientation != "" && Orientation != 1) {
		//           switch(Orientation) {
		//             case 6: //需要顺时针（向左）90度旋转 
		//               this.rotateImg(img, 'left', canvas);
		//               break;
		//             case 8: //需要逆时针（向右）90度旋转 
		//               this.rotateImg(img, 'right', canvas);
		//               break;
		//             case 3: //需要180度旋转 
		//               this.rotateImg(img, 'right', canvas); //转两次 
		//               this.rotateImg(img, 'right', canvas);
		//               break;
		//           }
		//         }
		//         //进行最小压缩 
		//         let ndata = canvas.toDataURL('image/jpeg', 0.1);
		// //      //console.log('压缩前：' + initSize);
		// //      //console.log('压缩后：' + ndata.length);
		// //      //console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%");
		//         tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
		//         return ndata;
			  },
			  //扫一扫弹窗组件
			    toClose(){
			    	this.isShowMessageBox = false;
			    }
		}
	}
</script>
