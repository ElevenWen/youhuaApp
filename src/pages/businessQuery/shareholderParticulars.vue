<template><!--股东详情-->
	<div id="shareholderParticulars">
		<div class="searchBox particulars">
			<span class="return" @click="goBack"><span ></span></span>
			<div>人员详情</div>
			<div class="filtrate">
				<span v-show='false'></span>
				<span>筛选</span>
			</div>
		</div>
		<div class="resultList">
			<div class="brandLogo">
				<img :src="mes.logo">
			</div>
			<div class="shareholderList">
				<span>{{mes.name}}</span>
				<span>教育：-</span>
				<span>工作区域：-</span>
				<span>关联企业：-</span>
				<div class="shareholder">
					<div v-for="val in jobArr">{{val.typeJoin[0]}}：{{val.name}}</div>
				</div>
			</div>
		</div>
		<div class="resultList" @click="tocompanyDetail">
			<dl> 
			    <dt><img :src="companyData.logo" /></dt> 
			    <dd class="result_dd">{{comName}}</dd> 
			    <dd class="result_dd1">
			    	<span>{{mes.name}}</span>
			    	<span>{{companyData.regCapital}}</span>
			    	<span>成立{{companyData.time}}年</span>
			    </dd> 
			    <dd class="result_dd3">
			    	<span><img src="../../assets/images/businessQuery/relevance@3x.png" />任职：<span v-for="val in mes.typeJoin">{{val}}&nbsp;</span></span>
			    </dd> 
			</dl> 
		</div>
	</div>
</template>

<script>
	import getd from '../../vuex/getData.js';
	export default{
		data(){
			return{
				companyData:{},
				mes:{},//股东信息
				jobArr:[],
				comName:this.$route.params.searchName,//公司名
			}
		},
		mounted(){
			this.mes = this.$route.params.mes;
			
			//查主要人员
			var str = encodeURI("name="+this.$route.params.searchName);
			var params = {
				"params":{
					api:4,
					args:str,
				}
			};
			getd.queryCompany("get",params)
			.then((res)=>{
				//console.log(res)
				this.companyData = res.result;
				this.jobArr = this.companyData.staffList.result;
				this.companyData.time = new Date().getFullYear()-new Date(this.companyData.estiblishTime).getFullYear();
			})
		},
		methods:{
			//返回判断
			goBack(){
				//console.log(this.$route.params.style);
				if (this.$route.params.style) {
					this.$router.go(-1);
				}else{
					this.$router.push({path:'/businessQuery/shareholderResult',query:{searchName:this.$route.params.searchName}});
				}
			},
			tocompanyDetail(){ //跳转到公司详情页
				this.$router.push({path:'/businessQuery/companyDetails',query:{name:this.$route.params.searchName,mes:this.mes}})
			}
		},
	}
</script>

<style lang="less" type="stylesheet/css" scoped>
	@import "../../common/index.less";
	@import 'businessQuery.less';
	
</style>
