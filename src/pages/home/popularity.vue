<template>
	<div id="popularity">
		<header-title :title="id" :router="routerLink"></header-title>
		<div class="promotion">
			<div class="promotion_body"  v-infinite-scroll="popularityLoadMore"   infinite-scroll-disabled="loading"  infinite-scroll-distance="30"   infinite-scroll-immediate-check="true">
				<div class="promotion_listWrap" v-for="data in activityData">


		<div class="promotion_list">	
					<div class="promotion_img" @click="goProduct(data.Id,data.Type)">
						<img v-lazy="data.ThumbImgURL" alt="暂无图片" />
					</div>
					<!--右侧  其他活动-->
					<div class="promotion_particulars" v-if="id != '限时抢购'" @click="goProduct(data.Id,data.Type)">
						<div>
							<span class="promotion_name">{{data.Name}}</span>
							<span class="promotion_activity">
	  							<label v-if="data.Discount&&((data.Discount/10)!=10)">折扣</label>
	  							<label v-if="data.IsSeckill">秒杀</label>
	  						</span>
						</div>
						<div>{{data.Title}}</div>
						<div class="promotion_money">
							<span class="discount">{{data.Price| formatPrice |currency}}<b>{{data.Price | formatPriceX}} </b></span>
							<del class="abolish">{{data.OldPrice| formatPrice |currency}}<b>{{data.OldPrice | formatPriceX}} </b></del>
							<span class="sales_volume">销量：{{data.SalesVolume}}</span>
						</div>
					</div>
					<!--右侧  限时抢购 -->
					<div v-else="id" class="flashSaleRigt">
						<div class="wrap">
							<div class="top">
								<div class="top_1">
									<h3>{{data.Name}}</h3>
									<p><span class="newPrice">￥{{data.Price}}</span><span class="OldPrice">{{data.OldPrice}}</span></p>
								</div>
								<div class="top_2" @click="goProduct(data.ProductId,data.Type)">立即抢购</div>
							</div>
							<div class="down">
								<div class="down_1">
									<span>距结束{{data.EndTime}}</span>
									<countDown :timeData="Date.parse(purchaseS.EndTime)" class="inLine" :calbackFn="calbackFn" @childMethod="parentMethod"></countDown>
								</div>
								<div class="down_2">
									<mt-progress :value="Math.floor((data.SalesAmount / data.Amount) * 100)" class="dPropress">
										<div slot="start" class="startText">{{`已抢${Math.floor((data.SalesAmount / data.Amount) * 100)}%`}}</div>
									</mt-progress>
								</div>
							</div>
						</div>
					</div>


			</div>		
					
				</div>
					<div class="mint-loadmore-bottom">
						<span>
							<span class ="mint-cell-value" style="justify-content: center">
								<mt-spinner type="snake" ></mt-spinner>加载中..
							</span>
						</span>
					</div>
			</div>
		</div>
		

	</div>
</template>

<script>
	import headerTitle from "../components/header-title";
	import getd from '../../vuex/getData.js';
	import { Indicator } from 'mint-ui';
	import util from '../../util/tool';
	import WXJSSDK from "../../util/ajax";
	import countDown from '../components/countDown.vue'

	export default {
		data() {
			return {
				// routerLink:"{path:'/home'}"
				routerLink: '/home',
				activityData: [],
				purchaseS: [],
				Percentage: "",
				id: this.$route.query.id,
				pageIndex: 1, //产品列表 默认分类页码
				loading: false,//是否允许滑动加载
				pageSize: 6, //每页数量 常量
				newListDatLength: "", //获取最新数据length 用于判断是否加载完成全部数据
			}
		},
		components: {
			headerTitle,
			countDown
		},
		created() {
			this.requestData();
		},
		updated() {

		},
		activated(){
			this.loading = false;
		},
		mounted(){
			this.$watch('$route',(n,o)=>{
				this.loading = true;
			})
		},
		methods: {
			parentMethod(param) {
				//console.log('parent');
			},
			calbackFn() {
				//console.log("aaaaaa~~~!")
			},
			_initScroll() {

			},
			requestData() {
					//请求人气专场数据
					
					let productAllListParam = {
				        params: {
				          pageIndex: 1,
				          pageSize: this.pageSize
				        }
				    };
					getd.getPopulariData(productAllListParam)
		      		.then(res => {
		      			this.activityData = res.data.list;
		      		})
			},
			goProduct(id, type) {
				this.$router.push({
					path: '/home/productDetails',
					query: {
						id: id,
						type: type
					}
				});
			},
			//上拉加载更多
		    popularityLoadMore() {
		      if (this.activityData !== 0) {
		        this.pageIndex++;
		
		        //若为真，则无限滚动不会被触发
		        this.loading = true;
		        this.getProductNewList(this.pageIndex);
		      } else {
		        this.loading = false;
		      }
		    },
		    //获取产品列表数据
		    getProductNewList(index) {
		      //请求人气专场数据  分页 下拉刷新效果
		      let productAllListParam = {
		        params: {
		          pageIndex: index,
		          pageSize: this.pageSize
		        }
		      };
		      getd.getPopulariData(productAllListParam)
		      .then(res => {
		        let NewListDate = res.data.list;
		        this.newListDatLength = NewListDate.length;
		        if (NewListDate.length == 0) {
		          //全部数据加载完毕处理
		          this.loading = true; //End 显示加载中..
		          this.$nextTick(() => {
		            if (document.getElementsByClassName("mint-loadmore-bottom")[0]) {
		              document.getElementsByClassName(
		                "mint-loadmore-bottom"
		              )[0].innerHTML =
		                "没有更多了";
		            }
		          });
		          return;
		        } else {
		          NewListDate.forEach(elem => {
		            this.activityData.push(elem);
		          });
		
		          this.loading = false;
		        }
		      });
		    },
		},
		filters: {
			formatPrice(detail) {
				return util.formatPrice(detail);
			},
			formatPriceX(detail) {
				return util.formatPriceX(detail);
			},
			currency(detail) {
				return util.currency(detail);
			},
		},
	}
</script>

<style lang="less" type="stylesheet/css" scoped>
	@import "../../common/index.less";
	@import "../../../node_modules/mint-ui/lib/swipe/style.css";
	@import "popularity.less";
</style>