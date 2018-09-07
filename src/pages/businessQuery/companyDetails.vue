<style type="text/css" lang="less"  scoped>
	@import "../../common/index.less";
	// @import "../../common/base.less";
	@import "./companyDetails.less";
</style>
<template>
	<div id="companyDetails">
		<!-- title -->
		<div class="popularity-return" id="title">



            <span  class="return" @click="goBack()" ></span>



			<span id="title_name">公司详情</span>
			<!--<span id="titleRightOne" ></span>-->
			<!--存长图-->
			<span id="titleRightTwo"    @click.stop.prevent= "savePic" v-if="false"></span>
			<!--<span id="titleRightTwo2" v-show="!isClick"  ></span>-->
		</div>
		<!-- /title -->
		<!-- 公司名称 -->
		<div class="companyName"><span>{{result.name}}</span></div>
		<!-- /公司名称 -->
		<!-- 登记信息 -->
		<div class="registerInfor" @click="unfold('showOrHidden')">
			<span class="registerInforFont" id="registerInforFont">登记信息</span>
			<span class="registerInforDown" v-if="showOrHidden == true"></span>
			<span class="registerInforDown2" v-else></span>
		</div>
		<!-- /登记信息 -->
		<!-- 法定代表人 -->
		<div class="statutoryPerson" v-if="showOrHidden">
			<div class="person">法定代表人</div>
			<div class="name" @click="toShareholder2">{{result.legalPersonName}}</div>
			<div class="DataWrap data_wrap">
				<div class="setDataWrap">
					<div class="setData aaa">成立日期</div>
					<div class="data aaa">{{this.result.estiblishTime}}</div>
					<!-- <span class="separateLine"></span> -->
				</div>
				<div class="companyTypeWrap">
					<div class="companyType">企业类型</div>
					<div class="typeDetail">{{result.companyOrgType}}</div>
				</div>
			</div>
			<div class="moneyWrap">
				<div class="registeredAssets">
					<div class="setData aaa">注册资本</div>
					<div class="data aaa">{{result.regCapital}}</div>
				</div>
				<div class="registerType">
					<div class="companyType">登记状态</div>
					<div class="typeDetail">{{result.regStatus}}</div>
				</div>
			</div>
		</div>
		<!-- /法定代表人 -->
		<!-- 统一社会信用代码 -->
		<div class="creditCodeWrap">
			<ul class="creditCode">
				<li>统一社会信用代码</li>
				<li>{{result.creditCode}}</li>
			</ul>
			<div class="registerWrap">
				<ul class="register">
					<li>工商注册号</li>
					<li>{{result.regNumber}}</li>
				</ul>
				<ul class="organization">
					<li>组织机构代码</li>
					<li>{{result.orgNumber}}</li>
				</ul>
			</div>
		</div>
		<!-- /统一社会信用代码 -->
		<!-- 英文名 -->
		<div class="nameWrap">
			<!-- <div class="EnglishName">
				<span>英文名</span>
				<span></span>
			</div> -->
			<div class="EnglishName" v-if="result.correctCompanyId">
				<span>曾用名</span>
				<span>{{result.correctCompanyId}}</span>
			</div>
			<div class="EnglishName">
				<span>注册号</span>
				<span>{{result.regNumber}}</span>
			</div>
		</div>
		<!-- /英文名 -->
		<!-- 经营范围 -->
		<div class="businessScopeWrap">
			<div class="businessScope">经营范围</div>
			<div class="businessDetail">{{result.businessScope}}</div>
		</div>
		<!-- /经营范围 -->
		<!-- 公司地址 -->
		<div class="companyAddress" v-if="result.regLocation">
			<div class="EnglishName">
				<span>公司地址</span>
				<span class="addressRight"></span>
				<span class="address">{{result.regLocation}}</span>
			</div>
		</div>
		<!-- /公司地址 -->
		<!-- 营业期限 -->
		<div class="busnissTerm">
			<div class="EnglishName" v-if="result.fromTime&&result.toTime">
				<span>营业期限</span>
				<span>{{result.fromTime}}至 {{result.toTime}}</span>
			</div>
			<div class="EnglishName">
				<span>核准日期</span>
				<span>{{result.approvedTime}}</span>
			</div>
			<div class="EnglishName" v-if="result.regInstitute">
				<span>登记机关</span>
				<span>{{result.regInstitute}}</span>
			</div>
		</div>
		<!-- /营业期限 -->
		<!-- 股东 -->
		<div class="shareholder1 bbb" @click="unfold('shareholderIsShow')" >
			<span>股东</span>
			<span class="up" v-if="shareholderIsShow == false"></span>
			<span class="up2" v-else></span>
			<span>{{shareholderData.length}}</span>
		</div>
		<div v-if="shareholderIsShow"  class="shareholderWrap">
			<div v-for="(data,index) in shareholderData">
				<div class="shareholderName" @click="toShareholder1(index)"><span>{{data.name}}</span><span v-if="data.bigSha">{{data.bigSha}}</span></div>
				<div class="shareholderDetail">
					<div class="DataWrap">
						<div class="setDataWrap">
							<div class="setData proportion aaa">持股比例</div>
							<div class="data proportionNumber aaa" v-for="val in data.capital">{{val.percent?val.percent:"-"}}</div>
							<!-- <span class="separateLine"></span> -->
						</div>
						<div class="companyTypeWrap">
							<div class="companyType proportion">认缴出资额（万元）</div>
							<div class="typeDetail proportionNumber">{{data.amount?data.amount:"-"}}</div>
						</div>
					</div>
					<div class="moneyWrap">
						<div class="registeredAssets">
							<div class="setData proportion aaa">股东类型</div>
							<div class="data proportionNumber aaa">-</div>
						</div>
						<div class="registerType">
							<div class="companyType proportion">认缴出资日期</div>
							<div class="typeDetail proportionNumber">-</div>
						</div>
					</div>
				</div>
			</div>
			
		</div>
		<!-- /股东 -->
		<!-- 主要人员 -->
		<div class="shareholder1 bbb" @click="unfold('mainPeopleIsShow')">
			<span>主要人员</span>
			<span class="up" v-if="mainPeopleIsShow == false"></span>
			<span class="up2" v-else></span>
			<span>{{mainPersonnel.length}}</span>
		</div>
		<div class="mainPeople" v-if="mainPeopleIsShow">
			<div v-for="(data,index) in mainPersonnel">
				<div class="mainPeopleDetail">
					<img :src="data.logo" class="headImg">
					<div class="peopleName">
						<div class="namee" @click="toShareholder(index)">{{data.name}}</div>
						<div class="poster" v-for="val in data.typeJoin">{{val}}</div>
					</div>
				</div>
			</div>
			
		</div>
		<!-- /主要人员 -->
		<!-- 变更记录 -->
		<div class="shareholder1 bbb" @click="unfold('changeRecordIsShow')">
			<span>变更记录</span>
			<span class="up" v-if="changeRecordIsShow == false"></span>
			<span class="up2" v-else></span>
			<span>{{alteration.total}}</span>
		</div>
		<div class="changeRecord" v-if="changeRecordIsShow">
			<div v-for="data in alteration.items">
				<div class="dataa">{{data.changeTime}}<span>{{data.changeItem}}</span></div>
				<div class="changeRecordDetail">
					<div class="DataWrap">
						<div class="setDataWrap">
							<div class="setData">变更前</div>
							<div class="data"  v-html="data.contentBefore">{{data.contentBefore}}</div>
						</div>
					</div>
					<div class="moneyWrap">
						<div class="registeredAssets">
							<div class="setData">变更后</div>
							<div class="data" v-html="data.contentAfter">{{data.contentAfter}}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- /变更记录 -->
		<!-- 分支记录 -->
		<div class="changeRecord1">
			<div class="shareholder1" @click="unfold('branchIsShow')">
				<span>分支机构</span>
				<span class="up" v-if="branchIsShow == false"></span>
				<span class="up2" v-else></span>
				<span>{{branchCompany.length}}</span>
			</div>
			<div class="branch" v-if="branchIsShow">
				<div class="company" v-for="(items,index) in branchCompany">
					<div class="EnglishName">
						<span>{{items.name}}</span>
						<span class="addressRight"></span>
					</div>
				</div>
			</div>
		</div>
		<!-- /分支记录 -->
	</div>
</template>
<script>
	import getd from '../../vuex/getData.js';
 	import tool from '../../util/tool.js';
    import { Indicator } from 'mint-ui';  

	export default {
		data(){
			return {
				showOrHidden:true, //是否展开展示登记信息  true展示  false不展示
				shareholderIsShow: true, //是否展开展示股东信息  true展示  false不展示
				mainPeopleIsShow: true,  //是否展开展示主要人员信息  true展示  false不展示
				changeRecordIsShow: true, //是否展开展示变更记录信息  true展示  false不展示
				branchIsShow: true, //是否展开展示分支机构信息  true展示  false不展示
				result:{},//企业基本信息、
				shareholderData:{},//股东信息
				mainPersonnel:{},//主要人员
				alteration:{},//变更信息
				branchCompany:[], //分支机构
				name:'',//
				is_app:false,//是否在app
				isClick:true,
			}
		},
		created(){
			 
			this.$nextTick(()=>{
				 
				document.getElementById('appApp').style = "height:auto;padding:0.1px"
			})
			//判断是否在app  实现截图功能
			if(tool.is_app()){
				//console.log("app内部");
				this.is_app = true;
			};
			var comName = this.$route.query.name;
			this.name = comName.replace(/\<em\>/g,"").replace(/\<\/em\>/g,"");
			var str = encodeURI("name="+this.name);
			//console.log(this.name)
			//获取企业基本信息
			var params = {
				"params":{
					api:4,args:str,
				}
			};
			getd.queryCompany("get",params).then((res)=>{
				this.result = res.result;
				// 把时间戳转换为时间格式
				function getLocalTime(nS) {     
				    var aaa = new Date(parseInt(nS)).toLocaleString().replace(/\//g, "-"); 
				    return aaa.substr(0,aaa.lastIndexOf("上"));
				}
				this.result.estiblishTime = getLocalTime(this.result.estiblishTime); //成立时间
				this.result.fromTime = getLocalTime(this.result.fromTime);  //营业期限开始时间
				this.result.toTime = getLocalTime(this.result.toTime);  //营业期限结束时间
				this.result.approvedTime = getLocalTime(this.result.approvedTime); //核准时间

			})
			.catch((error)=>{
				//console.log(error,"45465")
			})
			
			//主要人员
			var params = {
				"params":{
					api:5,args:str,
				}
			};
			getd.queryCompany("get",params).then((res)=>{
				this.mainPersonnel = res.result.items;
				//console.log("555",res.result.items);
			})
			.catch((error)=>{
				//console.log(error)
			})
			
			//股东信息
			var params = {
				"params":{
					api:6,args:str,
				}
			};
			getd.queryCompany("get",params).then((res)=>{
				this.shareholderData = res.result.items;
				this.shareholderData.items.forEach((val)=>{
					val.bigSha = "";
				})
				this.shareholderData.items[0].bigSha = "(大股东)";
				////console.log(res.result);
			})
			.catch((error)=>{
				////console.log(error)
			})
			
			//变更记录
			var params = {
				"params":{
					api:8,args:str,
				}
			};
			getd.queryCompany("get",params).then((res)=>{
				this.alteration = res.result;
				////console.log(res.result);
			})
			.catch((error)=>{
				////console.log(error)
			})

			// 分支机构
			var params = {
				"params":{
					api:10,
					args:str,
				}
			};
			getd.queryCompany("get",params).then((res)=>{
				this.branchCompany = res.result.items;
			})
			.catch((error)=>{
				////console.log(error)
			})
		},

		watch: {
			//路由变化刷新
		  	'$route': function (route) { 
			    //console.log( "此处路由不触发",this.$router);
			    
		  	},
		},
		beforeDestroy(){
			 
		} ,
		destroyed(){  
			document.getElementById('appApp').style = "height:100%;padding:0px"
		},
		methods:{
			goBack(){
				// //从股东页面
				if (this.$route.query.mes) {
					this.$router.push({name:'shareholderParticulars',params:{mes:this.$route.query.mes,searchName:this.$route.query.name}})
				}else{ 
					this.$router.go(-1);
				}
			},
			packUp(){ //登记信息是否展开
				this.showOrHidden = !this.showOrHidden;
			},
			unfold(data){ //股东信息是否展开 
				this[data]= !this[data];
			}, 
			mainPeoplePickUp(){ //主要人员信息是否展开
				this.mainPeopleIsShow = !this.mainPeopleIsShow;
			},
			changeRecordPickUp(){ // 变更记录信息是否展开
				this.changeRecordIsShow = !this.changeRecordIsShow;
			}, 
			branchPickUp(){  // 分支机构信息是否展开
				this.branchIsShow = !this.branchIsShow;
			},
			toShareholder(val){  //主要人员   跳转到股东详情页
				this.mainPersonnel.forEach((items,index) => {
					if(val == index ){
						var _typeJoin = (items.typeJoin).join();
						var mes = {
							name: items.name,
							typeJoin:_typeJoin,
							logo:""
						}
						this.$router.push({name:'shareholderParticulars',params:{mes,searchName:this.name,style:1}})
					}
				})
			},
			toShareholder1(val){  //股东   跳转到股东详情页
				this.shareholderData.forEach((items,index) => {
					if(val == index ){
						var mes = {
							name: items.name,
							typeJoin:"",
							logo:""
						}
						this.$router.push({name:'shareholderParticulars',params:{mes,searchName:this.name,style:1}})
					}
				})
			},
			toShareholder2(){  //法定代表人  跳转到股东详情页
				var mes = {
						name: this.result.legalPersonName,
						typeJoin:"",
						logo: ""
					}
				this.$router.push({name:'shareholderParticulars',params:{mes,searchName:this.name,style:1}})
			},
			savePic(event){ //长摁截图、
				this.$nextTick(()=>{
					Indicator.open('加载中');  
				
				
					if(tool.is_app()){
						//截图方法调用 \
						//console.log(document.body);
						document.body.style.overflow = 'hidden';
						var cloneDom = savePicture.tempDOM('companyDetails', "height",'width');// 获取clone 节点
						savePicture.canvasFn(cloneDom,Indicator,this)  
						this.isClick = false; 
					}
					
				})
				

			},
		}
	}
</script>