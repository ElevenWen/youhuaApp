<style lang="less" scoped>
@import "../../common/index.less";
/*头部样式*/
#title{
    background:white; 
}
#title_name{
	font-size: 0.453333rem;
}
.popularity_return {
     position: fixed;
     height: 1.173333rem;
     width: 100%;
     text-align: center;
     line-height:1.173333rem; 
     color: #1F1F1F;
     border-bottom: 1px solid rgb(204,204,204);
     top: -0.1px;
     right: 0;
     left: 0;
     background:white;
     z-index: 999;
}
 .return{
     padding-left: 0.373333rem;
     height: 100%;
     width: 0.8rem;
     background-image: url('../../assets/images/tabBar/nav_back@2x.png');
     background-repeat: no-repeat;
    /*.bg-image('../../assets/images/tabBar/nav_back');
     */
     background-size:0.293333rem  0.48rem;
     background-position:0.386667rem   0.346667rem;
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
	 right: 0.373333rem;
     float: right;
     font-size: 0.373333rem;
     color: rgb(102,102,102);
     margin-right: ;
}
/*消息*/
 .atMsgWrap{
     background: white;
     margin: 1.5135135135135136rem 0.32432432432432434rem 0.32432432432432434rem 0.32432432432432434rem;
     border: 1px solid rgb(235,229,225);
     border-radius: 0.05405405405405406rem;
}
 .atMsgWrap1{
     background: white;
     margin: 0.32432432432432434rem 0.32432432432432434rem 0.32432432432432434rem 0.32432432432432434rem;
     border: 1px solid rgb(235,229,225);
     border-radius: 0.05405405405405406rem;
}
 .titleWrap{
     height: 1rem;
}
 .titleImg{
     float: left;
     width: 0.373333rem;
     height: 0.373333rem;
     background-image: url("../../assets/images/mine/message/unread@2x.png");
     background-size: 0.373333rem 0.373333rem;
     background-repeat: no-repeat;
     margin: 0.2972972972972973rem 0 0 0.2972972972972973rem;
}
 .title1{
     font-size: 0.373333rem;
     font-weight: 600;
     margin-left: 0.2972972972972973rem;
     line-height: 1rem;
}
 .timer{
     font-size: 0.32432432432432434rem;
     color: rgb(102,102,102);
     margin-left: 0.2972972972972973rem;
}
 .bigImg{
     width:100%;
     padding-top: 0.3783783783783784rem;
}
 .details{
     color: rgb(48,161,248);
     padding: 0.2702702702702703rem 0 0.2702702702702703rem 0.2972972972972973rem;
}
 .toRight{
     float: right;
     width: 0.1891891891891892rem;
     height: 0.35135135135135137rem;
     background-image: url("../../assets/images/tabBar/right_arrow@2x.png");
     background-repeat: no-repeat;
     background-size: 0.1891891891891892rem 0.35135135135135137rem;
     margin-right: 0.2702702702702703rem;
}
 
</style>
<template>
	<div id="activeMessage">
		<!-- 头部start -->
		<div class="popularity_return" id="title">
            <span  class="return" @click="goBack()"></span>
			<span id="title_name">活动消息</span>
			<span id="submit" @touchend="delData(arr,arr.length)">清空</span>
		</div>
		<!-- 头部end -->
		<!-- 消息start -->
		<div :class="index==0 ? 'atMsgWrap' : 'atMsgWrap1'" @touchend="msPage(items)" v-for="(items,index) in arr">
		 	<div class="titleWrap">
		 		<span class="titleImg"></span>
		 		<span class="title1">{{items.Title}}</span>
		 	</div>

		 	<div class="timer">{{(items.CreateDate).substring(6,items.CreateDate.lastIndexOf(")"))| formatDateFn((items.CreateDate).substring(6,items.CreateDate.lastIndexOf(")")))}}</div>
		 	<img src="../../assets/images/mine/message/ms@2x.png" class="bigImg">
		 	<div class="details">查看详情<span class="toRight"></span></div>
		</div>
		<!-- 消息end -->
	</div>
</template>
<script>
import { mapState,mapActions,mapGetters} from 'vuex';
import tool from "../../util/tool";
import { Toast } from 'mint-ui';
export default{
	data(){
		return {
			arr:[],
		}
	},
	components:{

	},
	created(){
		// 获取message页面存入的数据
		this.arr = tool.loadFromLocal("_activeMessage",this.getToken(),"data",false);
	},
	methods:{
		goBack(){
			this.$router.go(-1);
		},
		msPage(val){ //跳转到活动详情页面
			this.$router.push({path:"/message/messageDetail",query:{id: val.Id }})
		},
		delData(val,len){ //清空当前页面消息
			// 移除本地存储的消息
			tool.removeLocal("_activeMessage");
			// 页面上也要删除
			val.splice(val,len);
			Toast({
				  message: '已清空',
				  position: 'middle',
				  duration: 2000
				});
		}
	},
	filters:{ 
		formatDateFn:value =>{ 
        	return tool.formatDate(value,"yyyy-MM-dd")
        } ,
	}
}
	
</script>