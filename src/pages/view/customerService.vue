<style lang="less" scoped>
@import "../../common/index.less";
 /*底部*/
	.inputMessageWrap{
     height: 1.3783783783783783rem;
     background: #fff;
     position: fixed;
     bottom: 0;
     right: 0;
     left: 0;
}
 .message{
     width: 68%;
     height: 1rem;
     border: 1px solid #B3B3B3 !important;
     border-radius: 0.13513513513513514rem;
     margin: 0.1891891891891892rem 0 0 0.32432432432432434rem;
}
 .voice,.plus{
     display: inline-block;
     width: 0.7837837837837838rem;
     height: 0.7837837837837838rem;
     background-size: 0.7837837837837838rem 0.7837837837837838rem;
     position: relative;
     top: 0.35135135135135137rem;
}
 .voice{
     .bg-image('../../assets/images/mine/customerService/voice');
     margin-left: 0.2702702702702703rem;
}
 .plus{
     .bg-image('../../assets/images/mine/customerService/add');
     margin-left: 0.2702702702702703rem;
}
/*聊天框*/
 .chat-content{
     width: 100%;
     position: absolute;
     left: 0;
     top: 1.1891891891891893rem;
     bottom: 1.3783783783783783rem;
}
 .messageWrap{
     margin: 0.35135135135135137rem 0 1.5405405405405406rem 0;
     overflow: hidden;
}
 .tipMessage{
     width: 2.27027027027027rem;
     height: 0.5675675675675675rem;
     line-height: 0.5135135135135135rem;
     background: #CECECE;
     border: 1px solid #CECECE;
     border-radius: 0.2702702702702703rem;
     margin: 0 auto;
     text-align: center;
     font-size: 0.32432432432432434rem;
     color: #fff;
}
 .messageLeft{
     padding: 0.40540540540540543rem 0 0 0.40540540540540543rem;
     overflow: hidden;
}
 .messageLeft img,.messageRight img{
     width: 1.0810810810810811rem;
     height: 1.0810810810810811rem;
     display: inline-block;
     float: left;
}
 .font{
     display: inline-block;
     min-width: 1.5405405405405406rem;
     max-width: 6.891891891891892rem;
     min-height: 1.1081081081081081rem;
     background: #fff;
     font-size: 0.40540540540540543rem;
     margin-left: 0.2702702702702703rem;
     float: left;
}
 .font span{
     display: block;
     padding: 0.40540540540540543rem;
     line-height: 0.4864864864864865rem;
}
 .sanjiao{
     width: 0;
     height: 0;
     overflow: hidden;
     border-width: 0.21621621621621623rem;
     border-color: transparent white transparent transparent;
     border-style:solid dashed dashed dashed;
     position: absolute;
     margin: 0.2702702702702703rem 0 0 0;
     left: 1.3783783783783783rem 
}
 .messageRight{
     padding: 0.40540540540540543rem 0.40540540540540543rem 0 0;
     overflow: hidden;
}
 .messageRight img{
     float: right;
}
 .fontRight{
     float: right;
     min-width: 1.5405405405405406rem;
     max-width: 6.891891891891892rem;
     min-height: 1.1081081081081081rem;
     display: inline-block;
     max-width:6.891891891891892rem;
     background: #4592D9;
     font-size: 0.40540540540540543rem;
     margin-right: 0.2702702702702703rem;
     color: white;
}
 .fontRight span{
     display: block;
     padding: 0.40540540540540543rem;
     line-height: 0.4864864864864865rem;
}
 .sanjiaoRight{
     width: 0;
     height: 0;
     overflow: hidden;
     border-width: 0.21621621621621623rem;
     border-color: transparent transparent transparent #4592D9;
     border-style:solid dashed dashed dashed;
     position: absolute;
     margin: 0.32432432432432434rem 0 0 0;
     right: 1.3783783783783783rem;
}
/*底部隐藏弹框start*/
 .hiddenBox{
     width: 100%;
     height: 3.054054054054054rem;
     background: white;
     position: absolute;
     bottom: 0;
     left: 0;
     right: 0;
}
 .photo,.camera{
     width: 1.6486486486486487rem;
     height: 1.6486486486486487rem;
     margin: 0.7027027027027027rem 0 0 0.35135135135135137rem;
}
 
</style>
<template>
	<div id="customerService">
		<!-- 头部start -->
		<header-title title="在线客服"></header-title>
		<!-- 头部end -->
		<!-- 聊天框start -->
		<div class="chat-content">
			<div id="messageWrap" class="messageWrap">
				<!--客户进来提示-->
				<div class="tipMessage" id="com"></div>
		        <div v-for="obj in data">
		        	<!--客服聊天内容-->
		          <div class="messageLeft" v-if="obj.userid!=userid">
		            <img src="../../assets/images/mine/customerService/headImg@3x.png">
		            <div class="font">
		              <div class="sanjiao"></div>
		              <span id="chatroom">{{obj.content}}</span>
		            </div>
		          </div>
		          <!--客户聊天内容-->
		          <div class="messageRight" v-if="obj.userid==userid">
		            <img src="../../assets/images/mine/customerService/headImg@3x.png">
		            <div class="fontRight">
		              <div class="sanjiaoRight"></div>
		              <span id="kefu">{{obj.content}}</span>
		            </div>
		          </div>
		        </div>
			</div>
		</div>
		<!-- 聊天框end -->
		<!-- 底部start -->
		<div class="inputMessageWrap" ref="plus">
			<input type="text" class="message" v-model="par"  @keyup.enter="say()"/>
			<span class="voice"></span>
			<span class="plus" @touchend="sendImg"></span>
		</div>
		<!-- 底部end -->
		<!-- 底部隐藏弹框start -->
		<div class="hiddenBox" v-if="hiddenOrShow" @touchend="sendImg">
			<img class="photo" src="../../assets/images/mine/customerService/photo@2x.png">
			<img class="camera" src="../../assets/images/mine/customerService/camera@2x.png">
		</div>
		<!-- 底部隐藏弹框end -->
	</div>
</template>
<script>
  var iosocket = null;
  var groupId = "1";
  var i = 0;
	import headerTitle from '../components/header-title';
	import tool from '../../util/tool'
	import axios from 'axios';
	import { Indicator  } from 'mint-ui';

	export default {
		data(){
			return {
				hiddenOrShow:false, //是否展示图库和相机
		        par:"", //input中输入的内容
		        data:[],
		        userid:""
			}
		},
		components:{
			headerTitle,
		},
	    mounted(){
		  	var that = this;
		    this.userid = this.genUid;

		    //连接到端口9000
		    iosocket = io.connect('https://192.168.172.1:9000/');

		    //连接成功后的事件
		    iosocket.on('connect', function () {
//		    	var com = document.getElementById('com');
//		        com.innerHTML = "我不想为服务";
		    });

		    iosocket.on('ttt', function (data) {
		    	var com = document.getElementById('com');
		        com.innerHTML = "我不想为"+data+"服务";
		        i = data;
		    });

		    //监听login事件
		    iosocket.emit('login', groupId,{userid:that.userid, username:that.userid});

		    //监听event_name事件
			  iosocket.on('event_name', function (msg){//返回信息,显示
			  	//console.log(msg)
	            that.data.push(msg);
        });

//		    iosocket.on('message', function(obj) {
//		        that.data.push(obj);
//		    });
		    //服务端断开时事件
		    iosocket.on('disconnect', function() {
		        // alert('服务端关闭');
		    });
	    },
	    computed:{
	      	genUid(){
	        	return new Date().getTime()+""+Math.floor(Math.random()*899+100);
	      	},
	    },
	    methods:{
	      	say(){
	        	var obj = {
		          	userid: this.userid,
		          	username: this.userid,
		          	content: this.par,
		          	time:tool.formatDate(new Date().getTime(),"yyyy-MM-dd hh:mm:ss")
		        }
				if(i==3){
					iosocket.emit('message',2,obj);
				}else{
					iosocket.emit('message',1,obj);
				}
				//调用机器人
				axios.post('https://www.tuling123.com/openapi/api', {
				    key: 'fde7f8d0b3c9471cbf787ea0fb0ca043',
				    info: this.par,
				    userid: this.userid
			  	})
			  	.then((response)=>{
			  		Indicator.close();
			  		var objchat = {
			  			userid: '123456789',
			  			username: this.userid,
			  			content:response.data.text,
			  			time:tool.formatDate(new Date().getTime(),"yyyy-MM-dd hh:mm:ss")
			  		}
			  		this.data.push(objchat);
			  		iosocket.emit('message',0,objchat);
			  	}).catch((error)=>{
			    	//console.log(error);
			  	});
				this.par = "";
	        	window.scrollTo(0, 900000);
	      	},
	      	sendImg(){
				this.hiddenOrShow = !this.hiddenOrShow;
				var aaa = this.$refs.plus;
				if(this.hiddenOrShow == true){
					aaa.style.bottom = "113px";
				}else{
					aaa.style.bottom = "0px";
				}
			},
			closePlus(){ //隐藏图库和相机
				this.hiddenOrShow = false;
				var aaa = this.$refs.plus;
				aaa.style.bottom = "0px";
			}
	    }
	}
</script>
