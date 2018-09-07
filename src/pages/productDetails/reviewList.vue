<style lang="less" type="stylesheet/css" scoped >
@import "../../common/index.less";
@import "./productDetails.less";
</style>
<template>

	<div id="reviewList">
        <div class="wrap">
			<!-- 头部 -->
             <div class="wrapS" ref="wrapS">
				<!-- 返回 -->
					<!-- <img src="../../assets/images/productDetails/Back-icon@3x.png" class="fanhui" @click="headerBack"> -->
				<span class="fanhuiReview" @click="headerBack" v-if="flagShare"></span><span  class="wenzi">返回</span>
			    <div class="headerShare" @click="toShare"  v-if="flagShare">
					<!-- <img src="../../assets/images/productDetails/share@3x.png" class="share" /> -->
				</div>
			</div> 
	    </div>
          
		 	<!--评论-->
				<div class="evaluate evaluateS">
					<div class="evaluate_top"  >
						<span>评分&nbsp;&nbsp;</span>
						 <span class="evaluate_star evaluate_starS"   >
                            <img src="../../assets/images/productDetails/evaluateStarS@3x.png" />  
                            <img src="../../assets/images/productDetails/evaluateStar@3x.png" v-show="Math.ceil(totalStar.countStar)<2?true:false" />
                            <img src="../../assets/images/productDetails/evaluateStarS@3x.png" v-show="Math.ceil(totalStar.countStar)>=2?true:false" />
                            <img src="../../assets/images/productDetails/evaluateStar@3x.png" v-show="Math.ceil(totalStar.countStar)<3?true:false" />
                            <img src="../../assets/images/productDetails/evaluateStarS@3x.png" v-show="Math.ceil(totalStar.countStar)>=3?true:false" />
                            <img src="../../assets/images/productDetails/evaluateStar@3x.png" v-show="Math.ceil(totalStar.countStar)<4?true:false" />
                            <img src="../../assets/images/productDetails/evaluateStarS@3x.png" v-show="Math.ceil(totalStar.countStar)>=4?true:false" />
                            <img src="../../assets/images/productDetails/evaluateStar@3x.png" v-show="Math.ceil(totalStar.countStar)<5?true:false" />
                            <img src="../../assets/images/productDetails/evaluateStarS@3x.png" v-show="Math.ceil(totalStar.countStar)>=5?true:false" />
                        </span>
                        <span>{{totalStar.percent}}</span> 
                        <span>满意</span>
                        <span @click.prevent="active = 'tab-container3'"  ></span>
						 
					</div>
					<div class="noCommon" v-if="!proReviewS.length">
						暂无评论~
					</div>
					<div class="evaluate_outer evaluate_outerS">
						<div class="evaluate_list evaluate_listS" v-for="(data,index) in proReviewS"  v-if="index == 0">
							<div class="evaluate_name">
								<div class="evaluate_name_left">
									<span class="evaluate_headPortrait">
										<img src="../../assets/images/tabBar/mine@3x.png" v-if="data.ReviewType||!(data.HeadPicPath)"/>
											<img :src="data.HeadPicPath" v-if="!data.ReviewType&&data.HeadPicPath"/>
									</span>
									<span class="evaluate_nike">{{data.ReviewType?"匿名":data.CustomerName}}</span>
									<span class="evaluate_star">
										<img src="../../assets/images/productDetails/evaluateStarS@3x.png" />
										<img src="../../assets/images/productDetails/evaluateStar@3x.png" v-show="data.Star<2?true:false" />
										<img src="../../assets/images/productDetails/evaluateStarS@3x.png" v-show="data.Star>=2?true:false" />
										<img src="../../assets/images/productDetails/evaluateStar@3x.png" v-show="data.Star<3?true:false" />
										<img src="../../assets/images/productDetails/evaluateStarS@3x.png" v-show="data.Star>=3?true:false" />
										<img src="../../assets/images/productDetails/evaluateStar@3x.png" v-show="data.Star<4?true:false" />
										<img src="../../assets/images/productDetails/evaluateStarS@3x.png" v-show="data.Star>=4?true:false" />
										<img src="../../assets/images/productDetails/evaluateStar@3x.png" v-show="data.Star<5?true:false" />
										<img src="../../assets/images/productDetails/evaluateStarS@3x.png" v-show="data.Star>=5?true:false" />
									</span>
								</div>
								<span class="evaluate_name_right">
									{{data.CreateTime}}
								</span>
							</div>
							<div class="evaluate_content">
								<span>{{data.Content}}</span>
								<!--<span>有限公司注册，加急办理，不刻章</span>-->
							</div>
							<div class="reply">
								<span >官方回复:&nbsp;</span>
								<span>感谢您在我们平台购物，祝您生活愉快！</span>
							</div>
						</div>
					 
					</div>
				</div>
	</div>

</template>

<script>
import getd from "../../vuex/getData.js";

export default {
  data() {
    return {
      proReview: [],
      totalStar: {},
      proReviewS: [] ,//评价截取2条
      flagShare: this.$root.flagShare, //分享图标
    };
  },
  created() {
    //请求评价信息
    var params1 = {
      productId: this.$route.query.id,
      orderId: "",
      datatype: "json"
    };
    getd
      .getProReview(params1)
      .then(res => {
        this.proReview = res.data.list;
        this.proReviewS = res.data.list.slice(0, 6);
        if (this.proReviewS.length >= 6) {
          this.seenAll = true; //展示全部评价
        } else {
          this.seenAll = false; //不展示全部评价
        }
        //等待评价列表出来 在计算  DOM的offsetTop
        this.canshow = true;

        this.$nextTick(() => {
          // this.windowScroll();
        });
      })
      .catch(() => {
        this.canshow = true;
        this.$nextTick(() => {
          // this.windowScroll();
        });
      });
    //请求评论总星级
    var params2 = {
      productId: this.$route.query.id
    };
    getd.getStar(params2).then(res => {
      this.totalStar = res.data;
      console.log(res.data.percent)
      this.totalStar.percentC= Number(res.data.percent*100);
      
    });

    //请求评论总星级
  },
  methods: {
    headerBack() {
      //   var s = this.$route.query.style;
      return this.$router.go(-1);
    },
    toShare() {
      wrhShare().sendShare(
        "活动", //bussType_param, bussId_param, title_param, content_param, img_param, href_param
        "000000",
        this.product.Name,
        this.content,
        this.product.ThumbImgURL,
        "https://host.wqbol.com/home/productDetails?id=" +
          this.$route.query.id +
          "&type=" +
          this.$route.query.type +
          "&style=" +
          this.$route.query.style
      );
    }
  }
};
</script>