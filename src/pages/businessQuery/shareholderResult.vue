<template><!--股东结果-->
	<div  :id="jobArr.length>0?'shareholderResult':'noData'">
		<div class="jobArr.length>0?'shareholderResult':'noData'">
			<div class="searchBox result">
				<span class="return" @click="goBack"><span ></span></span>
				<label><img src="../../assets/images/tabBar/search@3x.png" /></label>
				<input type="text" placeholder="公司名称" @keyup.enter="search()" v-model="value" />
				<span class="sort"></span>
			</div>
			<div class="rank" >	<!--条件查询 -->
				<ul>
					<li>不限地区</li>
					<li>所有行业</li>
					<li>更多筛选</li>
				</ul>
			</div>
			<!--<div class="reminder">
				查到多名同名人员，可以进行&nbsp;&nbsp;<span @click="shareholderDeWeight">人名去重</span>
			</div>-->
			<div class="empty" v-show="isShow">
				<img class="emptyImg" src="../../assets/images/BusinessQuery/bgD@3x.png">
				<div class="emptyData">没有找到相关数据</div>
			</div>
			<div class="paging" v-if="jobArr.length">
				<span>搜索到<span>{{jobArr.length}}</span>条数据</span>
				<!--<span>第1/2页</span>-->
			</div>
			<div class="resultList" @click="shareholderParticulars(data)" v-for="data in jobArr">
				<dl> 
				    <dt><img :src="companyData.logo" /></dt> 
				    <dd class="result_dd" v-keyWordChange="value">{{companyData.name}}<span v-if="false">000002.SZ</span></dd> 
				    <dd class="result_dd1">
				    	<span class="color_802">{{data.name}}</span>
				    	<span>{{companyData.regCapital}}</span>
				    	<span>成立{{companyData.time}}年</span>
				    </dd> 
				    <dd class="result_dd2">
				    	<span v-show="false">续存</span>
				    	<span class="abnormal" v-show="false">异常</span>
				    	<span v-show="false">上市公司</span>
				    </dd>
				    <dd class="result_dd3">
				    	<span>法定代表：<span class="color_802">{{companyData.legalPersonName}}</span></span>
				    </dd> 
				</dl> 
			</div>
		</div>
	</div>
</template>

<script>
	import getd from '../../vuex/getData.js';
	import tool from '../../util/tool.js';
	export default{
		data(){
			return{
				companyData:{},
				value:"",
				jobArr:[],//股东信息
				isShow:false,//是否有数据
			}
		},
		created(){
			this.requestData();
		},
		methods:{
			requestData(){
				var str = encodeURI("name="+this.$route.query.searchName);
				var params = {
					"params":{
						api:4,
						args:str,
					}
				};
				getd.queryCompany("get",params)
				.then((res)=>{
					if(res.reason=="无数据"){
						this.isShow = true;
						this.jobArr = [];
					}else{
						this.isShow = false;
						this.companyData = res.result;
						this.jobArr = this.companyData.staffList.result;
						this.companyData.time = new Date().getFullYear()-new Date(this.companyData.estiblishTime).getFullYear();
					}
				})
				.catch((error)=>{
					this.isShow = true;
					this.jobArr = [];
					//console.log(error)
				})
			},
			goBack(){
				this.$router.push('/businessQuery/selectShareholder');
			},
			//股东详情
			shareholderParticulars(val){
				tool.judgment("sha","browsing",this.$route.query.searchName);
				this.$router.push({name:'shareholderParticulars',params:{mes:val,searchName:this.$route.query.searchName}})
			},
			//人名去重
			shareholderDeWeight(){
				this.$router.push('/businessQuery/shareholderDeWeight')
			},
			//点击确认搜索
			search(){
				this.value = this.value.replace(/\s/g, "");
				if (this.value) {
					//存入本地
					tool.judgment("sha","",this.value);
					this.$router.push({path:'/businessQuery/shareholderResult',query:{searchName:this.value}});
				};
			},
		},
		watch: {
			//路由变化刷新
		  	'$route': function (route) {
			  	this.requestData();
		  	},
		},
	}
</script>

<style lang="less" type="stylesheet/css" scoped>
	@import "../../common/index.less";
	@import 'businessQuery.less';
	.empty{
		padding-top: 1.0810810810810811rem;
		background: white;
		text-align: center;
	}
	.emptyImg{
		width: 4.621621621621622rem;
		height: 4.054054054054054rem;
	}
	.emptyData{
		margin: 0.6486486486486487rem auto;
		color: #666666;
	}
	#shareholderResult{
		height: 100%;
	}
</style>