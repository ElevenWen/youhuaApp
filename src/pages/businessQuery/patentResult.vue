<!--专利结果-->
<template>	
	<div  :id="companyData.length>0?'patentResult':'selectPatentHeight'"  >
		<!-- 处理高度selectBrandHeight  -->
		<div  :class="companyData.length>0?'selectBrand':'selectBrandHeight'"  v-loadMoreDirectives="loadMore" >
			<div class="searchBox result">
				<span class="return" @click="goBack"><span ></span></span>
				<label><img src="../../assets/images/tabBar/search@3x.png" /></label>
				<input type="text" value="" placeholder="公司注册" @keyup.enter="search()" v-model="valueSearch"/>
				<span class="sort"></span>
			</div>
			<div class="rank patent_rank" >	<!--条件查询 -->
				<ul>
					<li>类型不限</li>
					<li>时间不限</li>
				</ul>
			</div>
			<div class="reminder">
				没找到相关专利，去&nbsp;&nbsp;<span @click="toDetail">申请专利</span>
			</div>
			<div v-if="companyData.length>0"  >
 
				<div class="paging">
					<span>搜索到<span>{{companyData}}</span>个专利</span>
					<!--<span>第1/17页</span>-->
				</div>
				<div class="patentList" @click="patentParticulars(value.applicantName,value.patentName,value.applicationPublishNum)" v-for="(value,index) in companyDataList"   v-if="value.patentName!=undefined">
					<ul> 
						<li v-keyWordChange="valueSearch">{{value.patentName}}</li>
						<li>
							<span>专利类型：</span>
							<span>{{value.patentType}}</span>
						</li>
						<li>
							<span>申请公布号：</span>
							<span>{{value.applicationPublishNum}}</span>
						</li>
						<li>
							<span>申请公布日：</span>
							<span>{{value.applicationPublishTime| formatDateFn}}</span>
						</li>
						<li class="brandBot">
							<span>申请人：<span class="brandspan">{{value.applicantName }}</span></span>
						</li>  
					</ul>  
				</div>  
				<div     class="lastListWrap" v-if="lastPage.notMore=='notMore'" >————　已经到底了　————</div> 
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
				companyData:0,//后台返回数据条数
				valueSearch:"",
				companyDataList:[],//后台数据
				pageNum:1,//页数
				lastPage:{
					notMore:null,//判断是否到底部
				}
			}
		},
		created(){ 
			this.requestData(this.pageNum,"35");
			this.valueSearch = this.$router.currentRoute.query.searchName ; 
		},
		mounted(){
			 
         
		},
		destroyed(){  
			////console.log("=============") 
			window.removeEventListener("scroll",window.scrollCommonFn);

		},
		methods:{
			loadMore(tempPageNum){
				   // //console.log(tempPageNum)
                   return this.requestData(tempPageNum,"35") 
			},
			requestData(pageNum,api){
				var  _this = this
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
						this.companyData = [];
					}) 
			},
			//申请专利
			toDetail(){
				this.$router.push({path:'/home/productDetails',query:{id:'e9efb1a6-8620-448d-8be1-9b845d11f3da',type:0,style:0}});
			},
			//点击确认搜索
			search(){
				this.valueSearch = this.valueSearch.replace(/\s/g, "");
				if (this.valueSearch) {
					//存入本地
					tool.judgment("patent","",this.valueSearch);
					this.$router.push({path:'/businessQuery/patentResult',query:{searchName:this.valueSearch}});
					//重新搜索
					 window.location.reload();
				};
			},
			//返回判断
			goBack(){
				this.$router.go(-1); 
			},
			patentParticulars(com,name,publishNum){  //跳转详情 
				//存入本地
				tool.judgment("patent","browsing",com);
				this.$router.push({path:'/businessQuery/patentParticulars',query:{com:com,name:name,publishNum:publishNum}});
			}
		},
		watch: {
			//路由变化刷新
		  	'$route': function (route) {
		  		this.value = this.$router.currentRoute.query.searchName ;  
				this.companyDataList  = [];
			  	this.requestData(this.pageNum,"35");
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