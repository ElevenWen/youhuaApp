<template>
	<div id="toEvaluate">
		<div class="popularity_return" id="title">
            <span  class="return" @click="goBack()"></span>
			<span id="title_name">发布评论</span>
			<span id="submit" @click="submitEva">发布</span>
		</div>

		<!--<div class="toEvaluate">
			<div class="evaluate_grade">
				<span>给服务打分</span>
				<div id="starBg" class="star_bg">
				    <input type="radio" id="starScore1"  class="score score_1" value="1" name="score" v-show="isStar1">
				    	<label for="starScore1" class="star star_1"  title="差" @click="giveEvaluate1"></label>
				    <input type="radio" id="starScore2"    class="score score_2" value="2" name="score" v-show="isStar2">
				    	<label for="starScore2" class="star star_2"  title="较差" @click="giveEvaluate2"></label>
				    <input type="radio" id="starScore3"  class="score score_3" value="3" name="score" v-show="isStar3">
				    	<label for="starScore3" class="star star_3"  title="普通" @click="giveEvaluate3" ></label>
				    <input type="radio" id="starScore4"  class="score score_4" value="4" name="score" v-show="isStar4">
				    	<label for="starScore4" class="star star_4"  title="较好" @click="giveEvaluate4"></label>
				    <input type="radio" id="starScore5"    class="score score_5" value="5" name="score" v-show="isStar5">
				    	<label for="starScore5" class="star star_5"  title="好" @click="giveEvaluate5"></label>
				</div>
			</div>
			<div class="evaluate_content">
				<span class="commodityImg">
					<img src="../../assets/images/tabBar/1151002.png">
				</span>
				<textarea name="textarea" id="content" cols="50" rows="5" @change="contenting" placeholder="点评一下此次购物的感受，您的 意见很重要" ref="words">
				</textarea>
			</div>
			<div class="anonymity">
				<span class="anonymity_no" >
					<div :class="noName == false ? 'anonymous' : 'yesName' " @click="selectName"></div>
				</span>
				<span>匿名评价</span>
				<span v-show="noName">您的评价会以匿名的形式显示</span>
			</div>
		</div>-->

    <div class="toEvaluatesWrap">
      <div class="toEvaluate" >
        <div class="evaluate_grade">
          <span>给服务打分</span>
          <div id="starBg" class="star_bg">
            <input type="radio" id="starScore1"  class="score score_1" value="1" name="score" v-show="isStar1">
            <label for="starScore1" class="star star_1"  title="差" @click="giveEvaluate1"></label>
            <input type="radio" id="starScore2"    class="score score_2" value="2" name="score" v-show="isStar2">
            <label for="starScore2" class="star star_2"  title="较差" @click="giveEvaluate2"></label>
            <input type="radio" id="starScore3"  class="score score_3" value="3" name="score" v-show="isStar3">
            <label for="starScore3" class="star star_3"  title="普通" @click="giveEvaluate3" ></label>
            <input type="radio" id="starScore4"  class="score score_4" value="4" name="score" v-show="isStar4">
            <label for="starScore4" class="star star_4"  title="较好" @click="giveEvaluate4"></label>
            <input type="radio" id="starScore5"    class="score score_5" value="5" name="score" v-show="isStar5">
            <label for="starScore5" class="star star_5"  title="好" @click="giveEvaluate5"></label>
          </div>
        </div>
        <div class="evaluate_content">
				<span class="commodityImg">
					<img :src="dataList[0].Img">
				</span>
          <textarea name="textarea" id="content" maxlength="200" rows="5" @change="contenting" placeholder="点评一下此次购物的感受，您的 意见很重要" ref="words">
				</textarea>
        </div>
        <div class="anonymity">
				<span class="anonymity_no" >
					<div :class="noName == false ? 'anonymous' : 'yesName' " @click="selectName"></div>
				</span>
          <span>匿名评价</span>
          <span v-show="noName">您的评价会以匿名的形式显示</span>
        </div>
      </div>
    </div>


	</div>
</template>

<script>
	import headerTitle from '../components/header-title';
	import { MessageBox,Toast  } from 'mint-ui';
	export default {
	    created(){
	        this.dataList = this.$route.query.listDate

      },
		data(){
			return {
				noName:false, //表示客户是否为匿名评价  true表示匿名  false表示不匿名
				isStar1:false, //表示星星是否被选中  true表示选中  false表示不选中
				isStar2:false,
				isStar3:false,
				isStar4:false,
				isStar5:false,
				count:0,
        dataList:[]
			}
		},
		components:{
		   headerTitle,
		},
		methods:{
			selectName(){
				this.noName = !this.noName;
			},
			contenting(){
			},
			goBack(){
				this.$router.go(-1);
			},
	        giveEvaluate1(){
	        	this.count = 1;
	        	return this.count;
	        },
	        giveEvaluate2(){
	        	this.count = 2;
	        	return this.count;
	        },
	        giveEvaluate3(){
	        	this.count = 3;
	        	return this.count;

	        },
	        giveEvaluate4(){
	        	this.count = 4;
	        	return this.count;
	        },
	        giveEvaluate5(){
	        	this.count = 5;
	        	return this.count;
	        },
	        submitEva(){
				console.log('评论内容',this.$refs.words.value);
				
				if(this.count == 0){
					Toast('您还没有选择星星喔！');
					return;
				}else if(this.$refs.words.value.trim() == ""){
                    Toast('^_^,请写下您的感受,至少5个字');
					return;
                };

	            // 调新增评论接口
	            var data = {
		            "params":{
		                "content":this.$refs.words.value,
		                "orderId": this.$route.query.OrderId,
		                "productId": this.$route.query.ProductId,
		                "parentId":"",
		                "reviewType":this.noName,
		                "star":this.count,
		            }
	            };
	            this.$store.dispatch("request_data_evaluate",data).then(()=>{
                    console.log(1)
                });
	            // 评价完成后跳转到订单页面
	            // this.$router.push("/mine/toMyOrder");
	        },
		}
	}
</script>

<style lang="less" type="stylesheet/css" scoped>
@import "../../common/index.less";
.toEvaluatesWrap{
     -webkit-tap-highlight-color:transparent;
     margin-top: 1.4054054054054055rem;
}
 .toEvaluate {
     margin-top: 0.2702702702702703rem;
}
 .evaluate_grade{
     height: 1.0810810810810811rem;
     width: 100%;
     padding: 0 0.32432432432432434rem;
     background: #FFF;
}
 .evaluate_grade span:nth-child(1) {
     display: block;
     float: left;
     line-height: 1.0810810810810811rem;
     .fs16;
     .cf6;
}
 .evaluate_grade span:nth-child(2) img{
     display: block;
     float: right;
     width: 0.5675675675675675rem;
     margin: 0.21621621621621623rem 0 0 0.32432432432432434rem;
}
 .evaluate_content{
     width: 100%;
     height: 3.4594594594594597rem;
     padding: 0.32432432432432434rem;
     background: #FFF;
     border-top:1px solid #efeff4;
}
 .commodityImg {
     display: block;
     float: left;
     width: 2.027027027027027rem;
}
 .commodityImg img {
     width: 1.945945945945946rem;
     height: 1.945945945945946rem;
}
 textarea{
     border: 0;
     margin-left: 0.32432432432432434rem;
     width: 70%;
     height: 2.4324324324324325rem;
     overflow: auto;
     padding: 0.13513513513513514rem;
     resize:none;
}
 .anonymity{
     border-top: 1px solid #efeff4;
     padding: 0.32432432432432434rem;
     height: 1.2162162162162162rem;
     line-height: 0.43243243243243246rem;
     background: #FFF;
}
 .anonymity_no{
     width: 0.4864864864864865rem;
     height: 0.4864864864864865rem;
     display: block;
     float: left;
}
 .anonymity span:nth-child(2) {
     margin-left: 0.13513513513513514rem;
}
 .anonymity span:nth-child(3) {
     float: right;
     color: #B3B3B3;
}
 // 匿名还是不匿名 
 .anonymous{
     width: 0.4864864864864865rem;
     height: 0.4864864864864865rem;
     .bg-image('../../assets/images/tabBar/select_box');
     background-size: 0.4864864864864865rem 0.4864864864864865rem;
}
 .yesName{
     width: 0.4864864864864865rem;
     height: 0.4864864864864865rem;
     .bg-image('../../assets/images/tabBar/select_boxS');
     background-size: 0.4864864864864865rem 0.4864864864864865rem;
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
     position: absolute;
     top:0;
     right: 0.40540540540540543rem;
     //float: right;
     font-size: 0.40540540540540543rem;
     color: #FA2802;
     //margin-right: 0.40540540540540543rem;
}
 // 用纯css实现星星评分 
 .star_bg {
     display: inline-block;
     height: 1.0810810810810811rem;
     line-height: 1.0810810810810811rem;
     width: 2.972972972972973rem;
     .bg-image('../../assets/images/productDetails/evaluateStar');
     background-size: 0.5945945945945946rem 0.5945945945945946rem;
     background-repeat: repeat-x;
     position: relative;
     overflow: hidden;
     float: right;
     margin-top: 0.21621621621621623rem;
}
 .star {
     height: 100%;
     width: 0.6486486486486487rem;
     line-height: 6em;
     position: absolute;
     z-index: 3;
}
 .star:hover {
     .bg-image('../../assets/images/productDetails/evaluateStarS');
     background-size: 0.5945945945945946rem 0.5945945945945946rem;
     background-repeat: repeat-x;
     background-position: 0 0rem!important;
     left: 0;
     z-index: 2;
}
 .star_1 {
     left: 0;
}
 .star_2 {
     left: 0.5945945945945946rem;
}
 .star_3 {
     left: 1.1891891891891893rem;
}
 .star_4 {
     left: 1.7837837837837838rem;
}
 .star_5 {
     left: 2.3783783783783785rem;
}
 .star_1:hover {
     width: 0.5945945945945946rem;
}
 .star_2:hover {
     width: 1.1891891891891893rem;
}
 .star_3:hover {
     width: 1.7837837837837838rem;
}
 .star_4:hover {
     width: 2.3783783783783785rem;
}
 .star_5:hover {
     width: 2.972972972972973rem;
}
 label {
     display: block;
     _display:inline;
     height: 100%;
     width: 100%;
     cursor: pointer;
}
/* 幕后的英雄，单选按钮 */
 .score {
     position: absolute;
     clip: rect(0 0 0 0);
}
 .score:checked + .star {
     .bg-image('../../assets/images/productDetails/evaluateStarS');
     background-size: 0.5945945945945946rem 0.5945945945945946rem;
     background-repeat: repeat-x;
     background-position: 0 0rem!important;
     left: 0;
     z-index: 1;
}
 .score_1:checked ~ .star_1 {
     width: 0.5945945945945946rem;
}
 .score_2:checked ~ .star_2 {
     width: 1.1891891891891893rem;
}
 .score_3:checked ~ .star_3 {
     width: 1.7837837837837838rem;
}
 .score_4:checked ~ .star_4 {
     width: 2.3783783783783785rem;
}
 .score_5:checked ~ .star_5 {
     width: 2.972972972972973rem;
}
 
/* .star_bg:hover .star {
      background-image: none;
 } */
 
</style>
