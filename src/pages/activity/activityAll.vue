<template>
 	<div id="activityAllWrap"> 

        <iframe   frameborder="0"  id="activityIframe" ref="activityIframe"   ></iframe>
 	</div>
</template>

<script>
	import tools from "../../util/tool.js";
  
    export default{
    	data(){
    		return {
    			localUrl:"",//本地url
    			fromPage:""//回退页面地址
    		}
    	},
    	beforeRouteEnter(to,from,next){ 
    		// //console.log(from); 
    		next(vm=>{ 
    			//存入本地 ==>防止页面刷新 没有数据
    			vm.localUrl = tools.loadFromLocal("_activity","activity","data",false);
    			vm.fromPage = from.name;
    			
    			// //console.log("||",vm.localUrl)
    			// //console.log(!vm.localUrl) 
	    		if(!vm.localUrl){
	    			//本地没有数据则存入 
	    			let dataObj = {
	    				"params":vm.$route.params.nowPage
	    			} 
	    			tools.saveToLocal("_activity","activity","data",dataObj);
	    			vm.localUrl = tools.loadFromLocal("_activity","activity","data",false).params;
	    		}else{
	    			//本地有数据
	    			vm.localUrl = tools.loadFromLocal("_activity","activity","data",false).params;
	    		}
    		})
    	},
        created(){


        },
    	mounted(){
    		 this.$nextTick(()=>{  
                 var self = this;
    		 	// this.$refs.activityIframe.src = "https://host.wqbol.com/activityAll/newPresent"+"?fromPage="+this.fromPage;
                this.$refs.activityIframe.src = this.localUrl;
                this.$refs.activityIframe.onload = function(){ 
                        //console.log("????", window.frames["activityIframe"].contentWindow);
                        //发送消息给子
                        //发送数据到iframe页面
                        var sendObj = {
                            tel:"13410897440",//手机号码
                            account:"邀请码",//邀请码
                            getToken:self.getToken()//token
                        }
                        //console.log("12222222222223",sendObj)
                        //postMessage 发送信息
                        window.frames["activityIframe"].contentWindow.postMessage(JSON.stringify(sendObj),"https://host.wqbol.com");
                };
                //接受信息
               
                window.addEventListener('message',function(e){
                      // //console.log(e.data,"返回")
                        if(e.data == "returnHome"){ 
                           // //console.log("返回按钮")
                            self.$router.push("/home");
                        }
                },false);

                    //title,des,imgUrl,WXJSSDK=WXJSSDKOBJ,customURL
                //调用微信
               // this.WXshare("标签头~","我是推广页面的内容简==========介","https://demo.open.weixin.qq.com/jssdk/images/p2166127561.jpg", this.$refs.activityIframe.src)
    		 })  

            
                    
    	},
        methods: {
        }

    }
</script>

<style lang="less" type="stylesheet/css" scoped>
	@import "../../common/index.less";
	#activityAllWrap,#activityIframe{
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
   

</style>