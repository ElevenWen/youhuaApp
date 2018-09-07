<template><!--商标详情-->
	<div id="brandParticulars">
		<div class="selectBrand">
			<div class="searchBox particulars">
				<span class="return" @click="goBack"><span ></span></span>
				<div>商标详情</div>
			</div> 
			<div  v-if="innerList.length > 0"  v-for="items in innerList">
				<div class="particularsLogo" >
					<img :src="items.tmPic" />
				</div>
				<div class="brandParticulars">
					<ul>
						<li v-show="items.tmName">
							<span>商标名称</span>
							<span>{{items.tmName}}</span>
						</li>
						<li>
							<span>商标类型</span>
							<span>{{items.intCls}}</span>
						</li>
						<li>
							<span>注册号</span>
							<span>{{items.regNo}}</span>
						</li>
						<li>
							<span>状态</span>
							<span>{{items.status}}</span>
						</li>
						<li>
							<span>申请人</span>
							<span class="color_1f8" @click="companyDetails(items.applicantCn)">{{items.applicantCn}}</span>
						</li>
					</ul>
				</div>
				<div class="brandParticulars">
					<ul>
						<li>
							<span>申请时间</span>
							<span v-if="items.appDate">{{items.appDate | changeData}}</span>
						</li>
						<li v-if="false">
							<span>初审公布日期</span>
							<span>{{items.applicantCn}}</span>
						</li>
						<li v-if="false">
							<span>注册公布日期</span>
							<span>{{items.applicantCn}}</span>
						</li>
						<li v-if="false">
							<span>使用期限</span>
							<span>{{items.applicantCn}} - {{items.applicantCn}}</span>
						</li>
					</ul>
				</div>
				<div class="brandParticulars">
					<ul>
						<li>
							<span>商品/服务项目</span>
						</li>
						<li class="brandS">
							<span>环境保护领域的研究、节能领域的咨询、提供互联网搜索引擎、网络服务器的出租、计算机软件咨询、计算机病毒的防护服务</span>
						</li>
					</ul>
				</div>
				<div class="brandParticulars"  v-if="false">
					<ul>
						<li>
							<span>代理机构信息</span>
							<span @click="companyDetails(items.applicantCn)" class="color_1f8">{{}}</span>
						</li>
					</ul>
				</div>  
			</div>
			<!-- <div v-else class="nothing">
				<img src="../../assets/images/businessQuery/bgD@2x.png" alt="">
				<p>没有找到相关数据</p>
			</div> -->
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
				var params = {
					"params":{
						api:34,
						args:str,
					}
				};
				getd.queryCompany("get",params)
				.then((res)=>{

					var data = res.result; 
					this.companyData = data.total;
					this.companyDataList = data.items;


					//console.log(this.companyDataList )
					//console.log('key',key)
					//循环获取其中一条数据  
					this.companyDataList.forEach( (items,indx)=>{
					//console.log( items.regNo ,"dddddd" )  
						if(items.regNo == key){  

							this.innerList.push( items ) ;  
							//console.log(	this.innerList) 
						} 
					}); 
				},(error)=>{
						//console.log(error);
						this.innerList = [];
				});
			}, 
			companyDetails(val){//查公司  
				this.$router.push({path:"/businessQuery/companyDetails",query:{name:val}});
			},
		},
		filters:{ 
			changeData:(value)=>{return tool.formatDate(value,"yyyy-MM-dd")},
		}
	}
</script>


<style lang="less" type="stylesheet/css" scoped>
	@import "../../common/index.less";
	@import './businessQuery.less';
</style>