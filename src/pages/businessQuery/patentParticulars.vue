<!--专利详情-->
<template>	
	<div  :id="innerList.length>0?'patentParticulars':'selectPatentHeight'"  >
<!-- 	<div id="patentParticulars"> -->
		<div class="selectBrand">
			<div class="searchBox particulars">
				<span class="return" @click="goBack"><span ></span></span>
				<div>专利详情</div>
			</div>
			<div  v-if="innerList.length > 0" >
				<div  v-for="(value,index) in innerList" >
					<div class="patentParticulars"  >
						<p>{{value.patentName}}</p>
						<ul>
							<li>
								<span>申请号</span>
								<span>{{value.patentNum}}</span>
							</li>
							<li>
								<span>申请日</span>
								<span>{{ value.applicationTime | formatDateFn(value.applicationTime)}}</span>
								 
							</li>
							<li>
								<span>公开（公告）号</span>
								<span>{{value.applicationPublishNum}}</span>
							</li>
							<li>
								<span>公开（公告）日</span>
								<span>{{ value.applicationPublishTime | formatDateFn(value.applicationPublishTime)}}</span>
							</li>
						</ul>
					</div>
					<div class="patentParticularsS">
						<ul>
							<li>
								<span>公司名称</span>
								<span class="color_1f8" @click="companyDetails(value.applicantName)">{{value.applicantName}}</span>
							</li>
							<li>
								<span>代理机构</span>
								<span>{{value.agency}}</span>
							</li>
							<li>
								<span>发明人</span>
								<span>{{value.inventor}}</span>
							</li>
						</ul>
					</div>
					<div class="patentParticularsS">
						<ul>
							<li>
								<span>专利类型</span>
								<span>{{value.patentType}}</span>
							</li>
							<li>
								<span>分类号</span>
								<span>{{value.allCatNum}}</span>
							</li>
							<li v-if="false">
								<span>分类</span>
								<span>{{value.abstracts}}</span>
							</li>
							<li v-if="false">
								<span>法律状态</span>
								<span>{{value.abstracts}}</span>
							</li>
						</ul>
					</div>
					<div class="patentParticularsS message">
						<ul>
							<li>
								<span>详细信息</span>
							</li>
							<li>
								<span>{{value.abstracts}}</span>
							</li>
							<li v-if="value.imgUrl!=undefined">
								<img :src="value.imgUrl" />
							</li>
						</ul>
					</div>
				</div>
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

	export default{
		data(){
			return {
				innerList:[],
			}
		},
		created(){
			this.requestData();
		},
		methods:{
			//返回判断
			goBack(){
				this.$router.go(-1)
			}, 
			requestData(){	//初始化数据 
				var str = encodeURI("name="+this.$route.query.com);
				
				var key =  this.$route.query.name;
				var publishNum  = this.$route.query.publishNum;
				var params = {
					"params":{
						api:35,
						args:str,
					}
				};
				getd.queryCompany("get",params)
				.then((res)=>{
					if(res.reason == "无数据"){
						this.innerList = [];
						return 
					}
					var data = res.result; 
					this.companyData = data.total;
					this.companyDataList = data.items;
					//循环获取其中一条数据 
					this.companyDataList.forEach( (items,indx)=>{ 
						////console.log(items)
						if(items.applicationPublishNum == publishNum){  
							this.innerList.push(items);   
							// //console.log(items);
							// //console.log(this.innerList)
						} 
					});
					 
				},(error)=>{
						//console.log(error);
						this.innerList = [];
				}) 
			},
			companyDetails(val){//查公司 
				////console.log(val);
				this.$router.push({path:"/businessQuery/companyDetails",query:{name:val}});
			},
		},
	    filters:{ 
			formatDateFn(value){ 
				return tool.formatDate(value,"yyyy-MM-dd")
			},
			 
		}
	}
</script>


<style lang="less" type="stylesheet/css" scoped>
	@import "../../common/index.less";
	@import 'businessQuery.less';
</style>