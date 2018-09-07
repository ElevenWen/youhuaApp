<template>
	<div id="reportEntry">
		<!--头部-->
		<div class="back">
			<span class="return" @click="goBack()"></span>
			自助记账
			<!--<span class="newcomer">新手帮助</span>-->
		</div>
		<div class="wrap" :class="isShow?'active':''">
			<div class="wrap-content">
				<!--轮播图-->
				<div class="reportEntry-banner">
					<mt-swipe :auto="4000">
						<mt-swipe-item v-for="(items,index) in datas" :key='index'>
								<img width="100%" @click="active(items.LinkWebSite,items)" height="100%"  :src="items.PosterImgURL" />
						</mt-swipe-item>
					</mt-swipe>
				</div>
				
				<!--公司搜索-->
				<div class="company-search">
					<!--搜索框-->
					<div class="search" v-show="isAccount&&isBuyServe">
						<div class="search-bar">
							<div></div>
							<input type="text" placeholder="搜索公司" v-model="value" @focus="toShowSearchList" @blur="toCloseSearchList"/>
						</div>
						
						<!--搜索结果候选-->
						<div class="search-list" v-show="isShow">
							<ul class="search-record" v-show="!isShowResult">
								<li class="history">搜索历史<span @click="searchList"></span></li>
								<li v-for="data in searchRecord"  @click="goSearch(data)">{{data.companyName}}</li>
							</ul>
							<ul class="search-result" v-show="isShowResult">
								<li v-for="data in searchResult"  @click="goSearch(data)">{{data.companyName}}</li>
							</ul>
						</div>
						
					</div>
					
					<!--搜索结果-->
					<div class="search-result">
						<div class="icon">
							<span></span>
						</div>
						<h3>{{address}}</h3>
						<div v-if="!isBuyServe" class="order" @click="toOrder">立即购买</div>
						<!--<span class="down_arrow2" v-show="isAccount"></span>-->
					</div>
				</div>
				
				<!--常用功能-->
				<div class="useted-fun">
					<div class="title">常用功能</div>
					<div class="content">
						<ul>
							<li class="tax" @click="toAccountBook">
								<div class="icon">
									<span></span>
								</div>
								<div class="list-title">
									<h3>查询账簿</h3>
									<h4>自动判断准确性</h4>
								</div>
							</li>
							<li class="reportForms" @click="toReport">
								<div class="icon">
									<span></span>
								</div>
								<div class="list-title">
									<h3>查询报表</h3>
									<h4>报表生成自动化</h4>
								</div>
							</li>
							<li class="oneTax" @click="toTax">
								<div class="icon">
									<span></span>
								</div>
								<div class="list-title">
									<h3>一键报税</h3>
									<h4>批量报税自动化</h4>
								</div>
							</li>
							<li class="courier" @click="toCourier">
								<div class="icon">
									<span></span>
								</div>
								<div class="list-title">
									<h3>快递查询</h3>
									<h4>即时跟踪进度</h4>
								</div>
							</li>
						</ul>
					</div>
				</div>
				
				
				<!--新闻-->
				<div class="news">
					<div class="title">
						新闻资讯
						<span @click="toMoreNews">更多<i></i></span>
					</div>
					<div class="content">
						<ul>
							<li v-for="(data,index) in newsArr" :key="index" @click="toNewsDetail(index)">
								<h3>{{data.title}}</h3>
								<span>{{data.source}}</span>
								<span>{{data.time}}</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<router-view></router-view>
	</div>
</template>

<script>
	import getData from '../../vuex/getData.js';
	import tool from '../../util/tool.js';
	import { Toast } from 'mint-ui';
	import { setSession, removeSession } from "../../util/base";
	export default{
		data(){
			return{
				newsArr:[
					{
					title:'河池警方破获特大虚开增值税发票案，关于增值税发票你知多少？',
					source:'中国税务报',
					time:'2018-04-01 12:33:56'
					},
					{
					title:'进项税额抵扣的规则你掌握了吗？七点注意事项请留意！',
					source:'中税答疑新媒体智库',
					time:'2018-04-01 14:56:56'
					}
				],
				isAccount:false,//代账true，记账false
				value:"",//搜索内容
				isShow:false,//搜索历史
				isShowResult:false,//搜索历史
				searchRecord:[],//搜索结果数组
				searchResult:[],//搜索结果
				datas:[],//轮播图
				address:'',//地址
				id:'',
				isBuyServe:false,//是否有购买记账、代账或为员工
			}
		},
		mounted(){
			//读取本地历史记录
			this.searchRecord = tool.readRecord("accountIndex","");
			//console.log(this.searchRecord)
			
			//动态设置中间内容高度
			document.getElementsByClassName("wrap")[0].style.height = window.screen.availHeight - 44 + "px";
			
			//动态设置搜索结果高度
			var sHeight = window.screen.availHeight -document.getElementsByClassName("search")[0].offsetTop-239;
			document.getElementsByClassName("search-list")[0].style.height = sHeight+"px";
			
			var timer = null;
			//在用户输入一次后和再次输入之间的时间间隔大于500ms就让第一次发送
			this.$watch('value',(newVal,oldVal)=>{
				var paramS = {
					params:{
						userID:this.id,
						companyName:newVal
					}
		        };
//				var paramS = {
//						userID:this.id,
//						companyName:newVal
//		        };
		        clearTimeout(timer)
		        if(newVal.length!=0){
		        	 timer = setTimeout(() => {
			          	getData.searchCom(paramS)
			            .then((res) => {
			              //console.log(res)
			              this.isShowResult = true;
			              this.searchResult = res.msg;
			            })
			            .catch((error)=>{
			            	//console.log(error);
			            })
			        }, 500);
		        }else{
		        	this.isShowResult = false;
		        }
		        
			});
			
			//请求轮播图
			var params = {
				params:{
					type:1,//pc 成为0  app 为1
					code:"ZZJZBBGGW"
				}
			};
			getData.getHomeBanner(params)
			.then((res)=>{
				this.datas = res.data.list;
			})
			
			//获取当前用户信息
			var params = {
				datatype:"json"
			};
			var info = null;
			getData.getCustomerInfo(params)
			.then((res)=>{
				info = res.data;
				if(res.data.JZFW || res.data.DZFW || res.data.IsStaff){
					this.isBuyServe = true;
					//请求java登录信息
					var token = this.getToken();
					var param = {
						params:{
							token:token
						}
					}
					getData.getLoginMes(param)
					.then((response)=>{
						//判断是否有账套
						if(response.acc == -1){
							this.isAccount = false;
							this.address = response.info;
						}else{
							//判断是否为记账或代码
							if(info.JZFW){
								this.isAccount = false;
							}else{
								this.isAccount = true;
							}
							
							this.address = response.info.companyName ; 
							this.id = response.uid ;
							tool.saveToLocal("uid","uid","uid",response.uid);
							tool.saveToLocal("accountID","accountID","accountID",response.info.accountID);
						}
					})
				}else{
					this.isBuyServe = false;
					this.address = '您未购买此项服务';
				}
			})
		},
		methods:{
			goBack(){
				this.$router.go(-1)
			},
			//立即购买
			toOrder(){
				setSession("_serveQuery_", {
			        name: "云服务",
			        classId: "7c057018-a1a1-4fab-8951-57be6cfc8acb",
			        navIndex:0
			    });
				
				var name = "云服务"
				this.$router.push({
		          path: "/home/serveClassify",
		          query: {
		            id: "7c057018-a1a1-4fab-8951-57be6cfc8acb",
		            name: encodeURI(name),
		            index: 0,
		            classIndex: 0
		          }
		        });
			},
			//查询账簿
			toAccountBook(){
//				if(this.isBuyServe){
					this.$router.push('/reportEntry/accountBook')
//				}else{
//					setSession("_serveQuery_", {
//				        name: "云服务",
//				        classId: "7c057018-a1a1-4fab-8951-57be6cfc8acb",
//				        navIndex:0
//				    });
//					var name = "云服务"
//					this.$router.push({
//			          path: "/home/serveClassify",
//			          query: {
//			            id: "7c057018-a1a1-4fab-8951-57be6cfc8acb",
//			            name: encodeURI(name),
//			            index: 0,
//			            classIndex: 0
//			          }
//			        });
//				}
				
			},
			//报表
			toReport(){
//				if(this.isBuyServe){
					this.$router.push('/reportEntry/report')
//				}else{
//					setSession("_serveQuery_", {
//				        name: "云服务",
//				        classId: "7c057018-a1a1-4fab-8951-57be6cfc8acb",
//				        navIndex:0
//				    });
//					var name = "云服务"
//					this.$router.push({
//			          path: "/home/serveClassify",
//			          query: {
//			            id: "7c057018-a1a1-4fab-8951-57be6cfc8acb",
//			            name: encodeURI(name),
//			            index: 0,
//			            classIndex: 0
//			          }
//			        });
//				}
			},
			//一键报税
			toTax(){
				alert("敬请期待")
			},
			//快递查询
			toCourier(){
				alert("敬请期待")
			},
			//轮播跳转
			active(url,item){
 				function getQueryString(address,name) {
					var str  = address.substring(address.indexOf("?"));
			        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
			        var r = str.substr(1).match(reg); 
			        if (r != null){ 
			            return unescape(r[2]);
			        } 
			        return null;
				};

 				if(item.Type == 0){ //活动  
					this.$router.push( item.Describe); 
 				}else{// 产品详情
 					let id = getQueryString(item.LinkWebSite,'id');
 					let type = getQueryString(item.LinkWebSite,'type');
 					this.$router.push({path:"/home/productDetails",query:{id:id,type:type,style:0}});
 				}; 
			},
			//新闻跳转更多
			toMoreNews(){
				this.$router.push('/reportEntry/moreNews')
			},
			//新闻详情
			toNewsDetail(index){
				this.$router.push({path:'/reportEntry/newsDetail',query:{id:index}})
			},
			//清除历史记录
			searchList() {
				if (this.searchRecord) { 
					this.searchRecord = this.searchRecord;
					return tool.cleanSearchList("accountIndex","","searchRecord",this);
				}; 
			},
			//选择公司
			goSearch(val){
				//存入本地
				tool.judgment("accountIndex","",val,1)
				//读取本地历史记录
				this.searchRecord = tool.readRecord("accountIndex","");
				var params = {
					params:{
						accountID:val.accountID
					}
				}
				getData.choiceCompany(params)
				.then((res)=>{
					//console.log(res)
					this.address = val.companyName;
					this.value = '';
					this.isShowResult = false;
					//
					tool.saveToLocal("accountID","accountID","accountID",val.accountID)
				})
				.catch((error)=>{
					this.address = val.companyName;
					this.value = '';
					this.isShowResult = false;
					//
					tool.saveToLocal("accountID","accountID","accountID",val.accountID)
				})
			},
			//获取焦点
			toShowSearchList(){
				this.isShow = true;
			},
			//失去焦点
			toCloseSearchList(){
				this.isShow = false;
			}
		}
	}
</script>

<style lang="less" type="stylesheet/css" scoped>
	@import "../../common/index.less";
	@import "./reportEntry.less";
</style>