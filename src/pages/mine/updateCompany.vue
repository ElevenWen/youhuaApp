<template>
	<div id="updateCompany">
		<div class="popularity_return" id="title">
            <span  class="return" @click="goBack()"></span>
			<span id="title_name">公司信息</span>
			<span id="submit" @click="goConfirm">确定</span>
		</div>
		<div class="updateNikeName">
			<label>公司名称：</label>
			<input type="text" class="nikeName_input" placeholder="请输入名称" v-model="name" @blur="verify"/>
		</div>
		<div class="pictureHeader">
			<label>营业执照：</label>
			<input type="text" :placeholder="!headerImage?'上传营业执照(加盖公章)':''" readonly/>
			<img id="picture" :src="headerImage" v-show="headerImage"/>
			<label class="photograph"></label>
			<input type="file" id="upload" accept="image/*" @change="upload" capture="camera" multiple/>
		</div>
	</div>
</template>

<script>
import headerTitle from "../components/header-title";
import { Toast } from 'mint-ui';
import getd from '../../vuex/getData.js';
import tool from '../../util/tool.js';
//Vue.component(Actionsheet.name,Actionsheet);
export default{
	data(){
		return{
			name:"",
			isRight:false,
			headerImage:'', //营业执照
		}
	},
	created(){
		//获取当前用户信息
		var params = {
			datatype:"json"
		};
		getd.getCustomerInfo(params)
		.then((res)=>{
			this.name = res.data.Name;
			this.headerImage = res.data.BusinessLicense;

		})
	},
	components:{
    	headerTitle
    },
    methods:{
    	verify(){
    		var reg = /^([\u2E80-\u9FFF]|[A-Za-z0-9_-]){4,20}$/ ;
    		if (reg.test(this.name)) {
    			this.isRight = true;
    		}else{
    			this.isRight = false;
    			Toast({
				  message: '输入有误', 
				  duration: 2000
				});
    		}
    	},
    	goConfirm(){
    		// if (this.name&&this.isRight) {
        		var params={
        			Name:this.name,
        			BusinessLicense:this.headerImage,
	    			modifyField:"Name,"+"BusinessLicense",
        		};
        		getd.reviseCustomerInfo(params)
        		.then((res)=>{
        			if (res.msg=="操作成功") {
        				this.$router.push('/mine/myInformation');
        			}
        		}).catch(function(error) {
			         //console.log("更新公司信息有问题",error);
			       });
    		// }
    	},
    	goBack(){
    		this.$router.go(-1);
    	},
    	upload(e) {
	        let files = e.target.files || e.dataTransfer.files;
	        if(!files.length) return;
	        this.picValue = files[0];
	        this.imgPreview(this.picValue);
	    },
	    imgPreview(file) {
	        let self = this;
	        let Orientation;
	        //去获取拍照时的信息，解决拍出来的照片旋转问题 
	        // Exif.getData(file, function() {
	        //   Orientation = Exif.getTag(this, 'Orientation');
	        // });
	        // 看支持不支持FileReader 
	        if(!file || !window.FileReader) return;
	        if(/^image/.test(file.type)) {
	          // 创建一个reader 
	          let reader = new FileReader();
	          // 将图片2将转成 base64 格式 
	          reader.readAsDataURL(file);
	          // 读取成功后的回调 
	          reader.onloadend = async function() {
	            let result = this.result;
	            let img = new Image();
	            img.src = result;
	            //判断图片是否大于100K,是就直接上传，反之压缩图片 
	            if(this.result.length <= (100 * 1024)) {
	              self.headerImage = this.result;
	              self.postImg();
	            } else {
	              img.onload = function() {
	                let data = self.compress(img, Orientation);
	                self.headerImage = data;
	                self.postImg();
	              }
	            }
	          }
	        }
	    },
	    postImg(){

	    },
	    rotateImg(img, direction, canvas) {
	        //最小与最大旋转方向，图片旋转4次后回到原方向 
	        const min_step = 0;
	        const max_step = 3;
	        if(img == null) return;
	        //img的高度和宽度不能在img元素隐藏后获取，否则会出错 
	        let height = img.height;
	        let width = img.width;
	        let step = 2;
	        if(step == null) {
	          step = min_step;
	        }
	        if(direction == 'right') {
	          step++;
	          //旋转到原位置，即超过最大值 
	          step > max_step && (step = min_step);
	        } else {
	          step--;
	          step < min_step && (step = max_step);
	        }
	        //旋转角度以弧度值为参数 
	        let degree = step * 90 * Math.PI / 180;
	        let ctx = canvas.getContext('2d');
	        switch(step) {
	          case 0:
	            canvas.width = width;
	            canvas.height = height;
	            ctx.drawImage(img, 0, 0);
	            break;
	          case 1:
	            canvas.width = height;
	            canvas.height = width;
	            ctx.rotate(degree);
	            ctx.drawImage(img, 0, -height);
	            break;
	          case 2:
	            canvas.width = width;
	            canvas.height = height;
	            ctx.rotate(degree);
	            ctx.drawImage(img, -width, -height);
	            break;
	          case 3:
	            canvas.width = height;
	            canvas.height = width;
	            ctx.rotate(degree);
	            ctx.drawImage(img, -width, 0);
	            break;
	        }
	    },
	    compress(img, Orientation) {
	        let canvas = document.createElement("canvas");
	        let ctx = canvas.getContext('2d');
	        //瓦片canvas 
	        let tCanvas = document.createElement("canvas");
	        let tctx = tCanvas.getContext("2d");
	        let initSize = img.src.length;
	        let width = img.width;
	        let height = img.height;
	        //如果图片大于四百万像素，计算压缩比并将大小压至400万以下 
	        let ratio;
	        if((ratio = width * height / 4000000) > 1) {
	          //console.log("大于400万像素")
	          ratio = Math.sqrt(ratio);
	          width /= ratio;
	          height /= ratio;
	        } else {
	          ratio = 1;
	        }
	        canvas.width = width;
	        canvas.height = height;
	        // 铺底色 
	        ctx.fillStyle = "#fff";
	        ctx.fillRect(0, 0, canvas.width, canvas.height);
	        //如果图片像素大于100万则使用瓦片绘制 
	        let count;
	        if((count = width * height / 1000000) > 1) {
	          //console.log("超过100W像素");
	          count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片 
	          //  计算每块瓦片的宽和高 
	          let nw = ~~(width / count);
	          let nh = ~~(height / count);
	          tCanvas.width = nw;
	          tCanvas.height = nh;
	          for(let i = 0; i < count; i++) {
	            for(let j = 0; j < count; j++) {
	              tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
	              ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
	            }
	          }
	        } else {
	          ctx.drawImage(img, 0, 0, width, height);
	        }
	        //修复ios上传图片的时候 被旋转的问题 
	        if(Orientation != "" && Orientation != 1) {
	          switch(Orientation) {
	            case 6: //需要顺时针（向左）90度旋转 
	              this.rotateImg(img, 'left', canvas);
	              break;
	            case 8: //需要逆时针（向右）90度旋转 
	              this.rotateImg(img, 'right', canvas);
	              break;
	            case 3: //需要180度旋转 
	              this.rotateImg(img, 'right', canvas); //转两次 
	              this.rotateImg(img, 'right', canvas);
	              break;
	          }
	        }
	        //进行最小压缩 
	        let ndata = canvas.toDataURL('image/jpeg', 0.1);
	        //console.log('压缩前：' + initSize);
	        //console.log('压缩后：' + ndata.length);
	        //console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%");
	        tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
	        return ndata;
      	},
    }
}
</script>

<style lang="less" type="stylesheet/css" scoped>
	@import "../../common/index.less";
	@import 'mine.less';
	#updateCompany{
     width: 100%;
     position: fixed;
}
 .updateNikeName{
     margin-top: 0rem !important;
     padding-top: 1.1891891891891893rem;
}
 .updateNikeName label{
     position: fixed;
     padding-left: 0.32432432432432434rem;
}
 label{
     color: #1A1A1A;
     display: block;
     float: left;
     height: 1.3513513513513513rem;
     line-height: 1.3513513513513513rem;
     font-size: 0.43243243243243246rem;
}
 .popularity_return{
     padding-left: 0.8108108108108109rem;
}
 .pictureHeader{
     background: #FFF;
     height: 1.3513513513513513rem;
     line-height: 1.2432432432432432rem;
     margin-top: 1px;
     font-size: 0.43243243243243246rem;
     padding-left: 0.32432432432432434rem;
}
 .nikeName_input{
     height:1.3513513513513513rem;
     width: 100%;
}
 .nikeName_input{
     height: 1.3513513513513513rem;
     width: 100%;
     font-size: 0.43243243243243246rem;
     padding-left: 2.5945945945945947rem;
     color: #B2B2B2;
}
 .updateNikeName span{
     display: block;
     width: 100%;
     color: #B3B3B3;
     font-size: 0.32432432432432434rem;
     padding-left: 0.32432432432432434rem;
     margin-top: 0.32432432432432434rem;
}
 #picture{
     width: 1.0810810810810811rem;
     height: 0.8648648648648649rem;
     position: absolute;
     left: 2.5945945945945947rem;
     top: 2.810810810810811rem;
}
 .photograph{
     height: 1.3513513513513513rem;
     width: 100%;
     display: block;
     position: absolute;
     left: 0%;
     top: 2.5405405405405403rem;
     background-size: 0.5405405405405406rem 0.43243243243243246rem;
     background-position: 92% 0.4864864864864865rem;
     background-repeat: no-repeat;
     .bg-image('../../assets/images/home/invitePoliteness/photograph');
}
 .popularity_return {
     padding-left: 0rem;
}
 #upload{
     opacity: 0;
     filter: alpha(opacity=0);
     position: absolute;
     top: 2.5675675675675675rem;
     height: 1.3513513513513513rem;
}
 // 头部样式
  #title{
     background:white;
}
 .popularity_return {
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
     float: right;
     font-size: 0.40540540540540543rem;
     color: #FA2802;
     margin-right: 0.40540540540540543rem;
}
 

</style>