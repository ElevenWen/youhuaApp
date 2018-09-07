<template>
	<div  :id="companyListTemp.length>0?'companyResult':'noData'">
		<div :class="companyListTemp.length>0?'companyResult':'noData'">
			<div class="searchBox result">
				<span class="return" @click="goBack"><span ></span></span>
				<label @click="brandResult"><img src="../../assets/images/tabBar/search@3x.png" /></label>
				<input type="text"   v-model="valuee" placeholder="公司注册" @keyup.enter="search()" class="souS"/>
				<span class="sort" @click="sort"></span>
			</div>
			<div class="search-list" v-show="isShow">
				<ul>
					<li v-for="data in searchResult" v-html="data.name" @click="gocompanyduct(data.name)">{{data.name}}</li>
				</ul>
			</div>
			<!-- 智能排序隐藏弹窗 -->
			<!-- <div class="sortWrap" v-if="sortIsShow">
				<ul >
					<li :class="{defaultSort:index==check,undefaultSort:!(index==check)}" v-for="(items,index) in sortArr" @touchend="chooseSort(items,index)">
						<i>{{items}}</i>
						<i :class="{check:index==check,uncheck:!(index==check)}"></i>
					</li>
				</ul>
			</div> -->
			<div class="rank" >
				<ul>
					<li  @click="chooseAddress">不限地区</li>
					<li>所有行业</li>
					<li>更多筛选</li>
				</ul>
			</div>
			<!-- 不限地区隐藏弹框 -->
			<!-- <div class="addressWrap" v-if="addressIsShow">
				
			</div> -->
			<!-- v-show="!(companyListTemp.length)" -->
			<div class="reminder" >
				没查到您关注的企业，可以去&nbsp;&nbsp;<span @click="toServer">注册公司</span>
			</div>
			<div class="empty" v-show="!(companyListTemp.length)">
				<img class="emptyImg" src="../../assets/images/BusinessQuery/bgD@3x.png">
				<div class="emptyData">没有找到相关数据</div>
			</div>
			<div class="paging" v-if="companyListTemp.length">
				<span>搜索到<span>{{companyListTemp.length}}</span>家企业</span>
			</div>
			<div class="resultList" @click="companyDetails(items)" v-for="(items,index) in companyListTemp">
				<dl> 
				    <dt><img src="../../assets/images/businessQuery/time@3x.png" /></dt> 
				    <dd class="result_dd" v-html="items.name" v-keyWordChange="valuee">{{items.name}}
				    </dd> 
				    <dd class="result_dd1">
				    	<span>{{items.legalPersonName}}</span>
				    	<span>{{items.regCapital}}</span>
				    	<span v-if="items.estiblishTime">成立{{ items.estiblishTime != '-'?new Date().getFullYear() - (items.estiblishTime).substring(0,4) : '-'}}年</span>
				    </dd> 
				    <!-- <dd class="result_dd2">
				    	<span>续存</span>
				    	<span class="abnormal">异常</span>
				    	<span>上市公司</span>
				    </dd> -->
				    <!-- <dd class="result_dd3">
				    	<span>历史名称：深圳市祥云科技有限公司</span>
				    </dd>  -->
				</dl> 
			</div>
			
		</div>
	</div>
</template>

<script>
	import getd from '../../vuex/getData.js';
	import {mapState,mapActions,mapGetters} from "vuex";
	import util from '../../util/tool';
	export default{
		data(){
			return {
				valuee:this.$route.query.searchName,
				sortIsShow:false, //排序弹窗是否显示  true显示  false不显示
				sortArr:["默认排序","按成立日期升序","按成立日期降序","按注册资本升序","按注册资本降序"],
				check:0,
				addressIsShow:false, //地区弹窗是否显示  true显示  false不显示
				isShow:false,
				searchResult:[],//模糊查询的结果
				companyListTemp:[],
			}
		},
		created(){
	  		this.requestData();
		},
		mounted(){
			//在用户输入一次后和再次输入之间的时间间隔大于500ms就让第一次发送
			this.$watch('valuee',(newVal,oldVal)=>{
				util.sendSearchName(newVal,oldVal,"valuee","isShow","searchResult","/Enterprise/GetTianYanChaApiData",this,2,1,"word");
			});
		},
		computed:{
			...mapState(
		      "businessQuery", ["companyList"]
		    ),
			// companyListTemp(){
			// 	var _companyList = this.companyList;
			// 	if(!_companyList){
			// 		return;
			// 	}
			// 	// //console.log("1234555555",_companyList); 
			// 	return _companyList;
			// },
		},
		watch: {
			//路由变化刷新
		  	'$route': function (route) {
		  		//console.log("路由刷啊,这里会打印");
			  	this.requestData()
		  	},
		},
		methods:{
			...mapActions(
		      "businessQuery",{
		         "QUERYCOMPANY":"QUERYCOMPANY" ,
		        }
		    ),
		    requestData(){
		    	var str = encodeURI("word="+this.$route.query.searchName);
				var data = {
					"params": {
						api: 1,
						args: str,
					}
				};
				getd.queryCompany("get",data)
				.then((res)=>{
					if(res.reason=="无数据"){
						
					}else{
						this.companyListTemp = res.result.items;
					}
				})
		    },
			goBack(){
				this.$router.go(-1);
			},
			companyDetails(val){
				var name = val.name.replace(/\<em\>/g,"").replace(/\<\/em\>/g,"");
				util.judgment("company","browsing",name);
				this.$router.push({path:"/businessQuery/companyDetails",query:{name:val.name}});
			},
			brandResult(){
				
			},
			sort(){  //排序弹窗是否显示
				this.sortIsShow = !this.sortIsShow;
			},
			chooseSort(items,index){ //
				//改变选中状态
				this.check = index;
			},
			chooseAddress(){
				this.addressIsShow = !this.addressIsShow;
			},
			toServer(){
				this.$router.push({path:'/home/productDetails',query:{id:'59143b23-746e-4e99-b946-3aff9134ff88',type:0,style:0}});
			},
			//点击确认进行跳转
			search(){
				this.valuee = this.valuee.replace(/\s/g, "");
				if (this.valuee) {
					//存入本地
					util.judgment("company","",this.valuee);
					this.isShow = false;
					this.$router.push({path:'/businessQuery/companyResult',query:{searchName:this.valuee}});

				};
				return false;
			},
			//点击搜索结果跳转
			gocompanyduct(val){
				var name = val.replace(/\<em\>/,"").replace(/\<\/em\>/,"");
				util.judgment("company","",name);
				this.isShow = false;
				this.$router.push({path:'/businessQuery/companyResult',query:{searchName:name}});
			},
		},
		filters:{
			keywordFilter(value,data){
				return util.keyWordColor(value,data);
			}
		}
	}
</script>

<style lang="less" type="stylesheet/css" scoped>
	@import "../../common/index.less";
	@import 'businessQuery.less';
	// 排序隐藏弹框的遮罩层
	.sortWrap{
     position:absolute;
     top:1.1891891891891893rem;
     bottom:0;
     left:0;
     right:0;
     z-index: 999;
     background-color:rgba(0, 0, 0, 0.4);
}
 .sortWrap div{
     color: #666666;
}
 .defaultSort{
     height: 1.2162162162162162rem;
     background: #EFEFF4;
     opacity:1;
     padding-left: 0.40540540540540543rem;
     line-height: 1.1891891891891893rem;
     z-index: 999;
     color: #FA2802;
}
 .undefaultSort{
     height: 1.2162162162162162rem;
     background: #fff;
     opacity:1;
     padding-left: 0.40540540540540543rem;
     line-height: 1.1891891891891893rem;
     z-index: 999;
}
 .check{
     width: 0.4864864864864865rem;
     height: 0.35135135135135137rem;
     float: right;
     .bg-image("../../assets/images/businessQuery/rightIcon");
     background-size: 0.4864864864864865rem 0.35135135135135137rem;
     margin: 0.40540540540540543rem 0.43243243243243246rem 0 0 ;
}
 .uncheck{
     background: none;
}
 // 地区弹出框的遮罩层 
 .addressWrap{
     position:absolute;
     top:2.4324324324324325rem;
     bottom:0;
     left:0;
     right:0;
     z-index: 999;
     background-color:rgba(0, 0, 0, 0.4);
}
 .keyWordColor{
     color: red;
}
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
 .souS{
	 font-size: .373333rem;
 }
</style>