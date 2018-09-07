<template><!--查公司-->
	<div id="selectCompany">
		<div class="selectBrand">
			<div class="searchBox">
				<label ><img src="../../assets/images/tabBar/search@3x.png" /></label>
				<input type="text" value="" placeholder="公司注册" @keyup.enter="search()" autocomplete="off" v-model="value"/>
				<label class="search"><img src="../../assets/images/tabBar/search@3x.png" /></label>
				<span @click="home">取消</span>
			</div>
			<div class="search-list" v-show="isShow">
				<ul>
					<li v-for="data in searchResult" v-html="data.name" @click="gocompanyduct(data.name)">{{data.name}}</li>
				</ul>
			</div>
			<div class="history">
				<div class="hidden_sous">
					<span>历史搜索</span>
					<span @click="searchList(true)"></span>
				</div>
				<div class="hidden_record record" v-if="searchRecord.length > 0">
					<span v-for="value in searchRecord" @click="goSearch(value)">{{value}}</span>
				</div>
				<div v-if="searchRecord.length == 0" class="nothing94">暂无搜索内容</div>
			</div>
			<div class="history historyFullScreen">
				<div class="hidden_sous">
					<span>浏览历史</span>
					<span  @click="searchList(false)"></span>
				</div>
				<div class="hidden_record active" v-if="browsingHistory.length > 0">
					<div v-for="data in browsingHistory" v-html="data" @click="goSearch(data)"><img src="../../assets/images/mine/collect@2x.png">{{data}}</div>
				</div>
				<div v-if="browsingHistory.length == 0" class="nothing94">暂无浏览历史</div>
			</div>
		</div>
	</div>
</template>

<script>
	//import footerNav from '../../footer-nav';
	import tool from '../../util/tool.js';
	import getd from '../../vuex/getData.js';
	var timer =null;
	export default {
		data() {
			return {
				value:"",
				searchRecord:[],//搜索记录
				searchResult:[],//模糊查询的结果
				browsingHistory:[],//浏览历史记录
				isShow:false,
			}
		},
		components: {
	//		footerNav,
		},
		created(){
			this.searchRecord = tool.readRecord("company","");
			this.browsingHistory = tool.readRecord("company","browsing");
		},
		methods: {
			home(){ //取消
				this.$router.push('/home/home')
			},
			//清除历史记录
			searchList(name){ 
				if (name) {
					if (this.searchRecord.length>0) {
						this.searchRecord = this.searchRecord;
						return tool.cleanSearchList("company","","searchRecord",this);
					}
				}else{
					if (this.browsingHistory.length>0) {
						this.browsingHistory = this.browsingHistory;
						return tool.cleanSearchList("company","browsing","browsingHistory",this);
					}
				}
			},
			//点击历史搜索/浏览历史跳转
			goSearch(val){
				var name = val.replace(/\<em\>/g,"").replace(/\<\/em\>/g,"");
				this.$router.push({path:'/businessQuery/companyResult',query:{searchName:name}});

			},
			//点击搜索结果跳转
			gocompanyduct(val){
				var name = val.replace(/\<em\>/g,"").replace(/\<\/em\>/g,"");
				tool.judgment("company","",name);
				this.$router.push({path:'/businessQuery/companyResult',query:{searchName:name}});
			},
			//点击确认进行跳转
			search(){
				this.value = this.value.replace(/\s/g, "");
				if (this.value) {
					//存入本地
					tool.judgment("company","",this.value)
					this.$router.push({path:'/businessQuery/companyResult',query:{searchName:this.value}});
				};
				return false;
			},

		},
		mounted(){
			//在用户输入一次后和再次输入之间的时间间隔大于500ms就让第一次发送
			this.$watch('value',(newVal,oldVal)=>{
				tool.sendSearchName(newVal,oldVal,"value","isShow","searchResult","/Enterprise/GetTianYanChaApiData",this,2,1,"word");
			});
		},
	};
</script>

<style lang="less" type="stylesheet/css" scoped>
	@import "../../common/index.less";
	@import 'businessQuery.less';
	.history{
		margin-top: 0.35135135135135137rem ;
	}
</style>