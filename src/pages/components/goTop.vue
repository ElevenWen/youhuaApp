<template>
	<div id="top" class="top" @click="goTop" ref="top" v-show="isShowTop">
		<img src="../../assets/images/tabBar/gotop@3x.png" />
	</div>
</template>

<script>
	export default{ 
		data(){
			return{
				isShowTop:false
			}
		},
		created(){
			this.goTop();
		},
		methods: {
			goTop(){
				//返回顶部事件
				var timer = null; //定义一个定时器
				var isTop = true; //定义布尔值，判断是否到达顶部
				this.$nextTick(()=>{
					var gotop = this.$refs.top;
					timer = setInterval(function() {
						//获取滚动条的滚动高度
						var osTop = document.documentElement.scrollTop || document.body.scrollTop;
						//用于设置速度差，产生缓动的效果
						var speed = Math.floor(-osTop / 8);
						document.documentElement.scrollTop = document.body.scrollTop = osTop + speed;
						isTop = true; //用于阻止滚动事件清除定时器
						if(osTop == 0) {
							clearInterval(timer);
						}
					}, 10);
				}) 
				document.addEventListener('touchstart',function(){
					clearInterval(timer);
				})
			},
			 
		},
		activated(){ 
		 let	that = this;
			//重置切换 自动返回首页头部背景透明  
				document.querySelector("#search_box").style.background = "";
				document.querySelector("#search_box").style.borderBottom  = "1px solid transparent";
				document.querySelector("#search_box .search_in").style.background = "#ffffff";
				that.$emit('onShowTopStyle',false)
			//当滚动条滚动到距离顶部300px的时候出现返回顶部按钮 
			console.log(window,window.onscroll) 
			window.onscroll = function(){
				var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;  
				if(scrollTop > 300) { //如果滚动高度大于300px，则显示回到顶部按钮
					that.isShowTop = true;
				} else { //否则隐藏
					that.isShowTop = false;
				}
				//滚动条滚动时固定搜索栏在最上方 FE9D10
				if (document.querySelector("#search_box")) {
					if(scrollTop > 28) { 
						document.querySelector("#search_box").style.background = "#ffffff";
						document.querySelector("#search_box").style.borderBottom  = "1px solid #cccccc";
						document.querySelector("#search_box .search_in").style.background = "#eeeeee";
						document.querySelector("#search_box .search_in").style.color = "#ffffff";

						//首页扫码切换
						 that.$emit('onShowTopStyle',true)
					} else { 
						document.querySelector("#search_box").style.background = "";
						document.querySelector("#search_box").style.borderBottom  = "1px solid transparent";
						document.querySelector("#search_box .search_in").style.background = "#ffffff";
						document.querySelector("#search_box .search_in").style.color = "#B2B2B2";
						//首页扫码切换
						 that.$emit('onShowTopStyle',false)
					}
				}
			}
		},
		deactivated(){ 
			this.isShowTop = false;
			window.onscroll = null; 
		}
	}
</script>

<style>
	#top{
		position: fixed;
		top:80%;
		right: 0.32432432432432434rem;
		width: 1.0810810810810811rem;
		height: 1.0810810810810811rem;
		line-height: 1.0810810810810811rem;
		text-align: center; 
		z-index: 999; 
	}
	#top img{
		width: 0.972972972972973rem;
		height: 0.972972972972973rem;
	}
 
</style>