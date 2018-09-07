<!--商标结果-->
<template> 
	<div  :id="companyData.length>0?'brandResult':'selectBrandHeight'"  >
		<!-- 处理高度selectBrandHeight  -->
		<div  :class="companyData.length>0?'selectBrand':'selectBrandHeight'"  v-loadMoreDirectives="loadMore" >
			<div class="searchBox result" >
				<span class="return" @click="goBack"><span ></span></span>
				<label @click="brandResult">近似搜索</label>
				<input type="text" v-show="valueData"   placeholder="公司注册" @keyup.enter="search()" v-model="valueData" class="aaa" />
				<span class="sort"></span>
			</div>
			<div class="rank" >	<!--条件查询 -->
				<ul>
					<li>全部类别</li>
					<li>全部状态</li>
					<li>时间不限</li>
				</ul>
			</div>
			<div class="reminder">
				没找到相关商标，去&nbsp;&nbsp;<span @click="toDetail">注册商标</span>
			</div>
			<div v-if="companyData>0">
				<div class="paging">
					<span>搜索到<span>{{companyData}}</span>个商标</span>
					<!--<span>第1/17页</span>-->
				</div>
				<div class="resultList" @click="brandParticulars(value.applicantCn,value.regNo)" v-for="(value,index) in companyDataList">
					<div class="brandLogo">
						<img :src="value.tmPic">
					</div>
					<div class="brandList">
						<span>{{value.tmName}}</span>
						<span>注册号：<span class="brandspan">{{value.regNo}}</span></span>
						<span>申请日期：<span class="brandspan">{{value.appDate |formatDateFn}}</span></span>
						<span>商标类别：<span class="brandspan">{{value.intCls}}</span></span>
						<span class="trademark" v-show="false">商标已注册</span>
					</div>
					<div style="clear:both"></div>
					<div class="brandPagebrandBot">  
						<span>申请人：<span class="brandspan"  v-keyWordChange="valueData">{{value.applicantCn}}</span></span>
					</div> 
				</div>
				<div  v-if="lastPage.notMore=='notMore'"   class="lastListWrap">————　已经到底了　————</div> 
			</div> 
			<div v-else class="nothing">
				<img src="../../assets/images/businessQuery/bgD@2x.png" alt="">
				<p>没有找到相关数据</p>
			</div>
		</div>
	</div>
</template>

<script>
	import getd from '../../vuex/getData.js';
	import tool from '../../util/tool.js';
	import Vue from 'vue';
	var timer =null;
	export default{
		data(){
			return{
				companyData:0,////后台返回数据条数
				valueData:"",
				companyDataList:[],//后台数据
				pageNum:1,//页数
				lastPage:{
					notMore:null,//判断是否到底部
				}
			}
		},
		created(){
			this.requestData(this.pageNum,'34');
			this.valueData = this.$router.currentRoute.query.searchName ; 
		},
		destroyed(){ 
				window.removeEventListener("scroll",window.scrollCommonFn);
		},
		methods:{
			loadMore(tempPageNum){
				   // //console.log(tempPageNum)
                   return this.requestData(tempPageNum,"34") 
			},
			requestData(pageNum,api){
				var  _this = this;
				
				var str = encodeURI("name="+this.$route.query.searchName+"&pageNum="+pageNum);
				var params = {
					"params":{
						api:Number(api),
						args:str,
					}
				};
				return	getd.queryCompany("get",params)
					.then((res)=>{  
						if(res.reason == "无数据"  && this.companyDataList.length == 0){ 
						//	判断是否至少有1条数据
							this.companyData = 0;
							return 
						}else{
								if(res.reason == "无数据" ){//拉到底部
									//console.log("到底部了");  
									// //console.log(Vue);
									this.lastPage.notMore='notMore';  //==>触发update 
									// //console.log(this.lastPage);
									 this.$nextTick(()=>{
									 	this.$destroy();//==>手动调用
									 }) 
									return 
								}	
								var data = res.result;  
								this.companyData = data.total; 
								for(var i = 0 ; i <  data.items.length ;i++){
									this.companyDataList.push(data.items[i]);
								} 
						} 
					},(error)=>{
						//console.log(error);
						this.companyDataList = [];
					}) 
			},
			//点击确认搜索
			search(){
				this.valueData = this.valueData.replace(/\s/g, "");
				if (this.valueData) {
					//存入本地
					tool.judgment("patent","",this.valueData);
					this.$router.push({path:'/businessQuery/brandResult',query:{searchName:this.valueData}});
					//重新搜索
					window.location.reload();

				};
			},
			//返回判断
			goBack(){
				this.$router.go(-1);
			},
			brandResult(){ 
			},
			brandParticulars(com,regNo){
				//存入本地
				//console.log( regNo)
				tool.judgment("brand","browsing",com);
				//
				this.$router.push({path:'/businessQuery/brandParticulars',query:{com:com,name:regNo}});
			},
			//注册商标
			toDetail(){
				this.$router.push({path:'/home/productDetails',query:{id:'71eb1b51-e7dd-42d8-a6a6-f1baa2c2d2a6',type:0,style:0}});
			}
		},
		watch: {
			//路由变化刷新
		  	'$route': function (route) { 
		  		this.valueData = this.$router.currentRoute.query.searchName ;
		  		this.companyDataList  = [];
			  	this.requestData(this.pageNum,"34");
		  	},
		},
		filters:{ 
			formatDateFn:value =>{ 
	        	return tool.formatDate(value,"yyyy-MM-dd")
	        } ,
		}
		 
	}
</script>

<style lang="less" type="stylesheet/css" scoped>
	@import "../../common/index.less";
	@import 'businessQuery.less';
	
</style>