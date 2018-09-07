<template>
	<!--扫一扫权限弹窗提示-->
	<div id="scanMessageBox" @touchmove.prevent.stop v-if="isShowMessageBox">
		<!--页面的弹出框-->
		<div class="modal">
		    <div class="title">
		    	<h3>您的相机功能好像有问题哦~<br/>去“设置>隐私>相机”开启</h3>
		    </div>
		    <div class="btn" @click="toClose">知道了</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		props:{
			isShowMessageBox:Boolean
		},
		methods:{
			toClose(){
				this.$emit("closePop",false)
			}
		}
	}
</script>

<style lang="less" type="stylesheet/css" scoped>
	/*扫一扫弹窗提示*/
#scanMessageBox{
    position:fixed;
    left:0px;
    top:0px;
    width: 100%;
    height: 100%;
    background:rgba(0, 0, 0, 0.4);
    z-Index:99999;  
    
    .modal{
        position:absolute;
        width:7.2rem;
        border-radius: 0.2666rem;
        top:50%;
        left:50%;
        background-color:#fff;
        margin-left: -3.6rem;
        margin-top: -1.4666rem;
        
        .title {
            height: 2.1333rem;
            line-height: 0.56rem;
            padding-top: 0.48rem;
            h3{
                font-size: 0.4266rem;
                color: #000;
                text-align: center;
                
            }
        }
        .btn{
            border-top: 1px solid #b2b2b6;
            color: #007aff;
            font-size: 0.4533rem;
            text-align: center;
            line-height: 1.1733rem;
        }
    }
}
</style>