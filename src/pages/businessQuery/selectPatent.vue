<template><!--查专利-->
	<div id="selectPatent">
		<div class="selectBrand">
			<div class="searchBox">
				<label><img src="../../assets/images/tabBar/search@3x.png" /></label>
				<input type="text" value="" placeholder="请输入专利名、申请号" @keyup.enter="search()"  v-model="value"/>
				<span @click="home">取消</span>
			</div>
			<div class="history">
				<div class="hidden_sous"  >
					<span>历史搜索</span>
					<span @click="searchList(true)"  v-show="searchRecord.length > 0"></span>
				</div>
				<div class="hidden_record  record"  v-if="searchRecord.length > 0">
					<span v-for="value in searchRecord" @click="goSearch(value)">{{value}}</span>
				</div>
				<div v-if="searchRecord.length == 0" class="nothing94">暂无搜索内容</div>
			</div>
			<div class="history  historyFullScreen">
				<div class="hidden_sous">
					<span>浏览历史</span>
					<span @click="searchList(false)"  v-show="browsingHistory.length > 0"></span>
				</div>
				<div class="hidden_record"  v-if="browsingHistory.length > 0">
					<div v-for="data in browsingHistory" v-html="data" @click="goSearch(data)"><img src="../../assets/images/mine/collect@2x.png">{{data}}</div>
				</div>
				<div v-if="browsingHistory.length == 0" class="nothing94">暂无浏览历史</div>
			</div>
		</div>
	</div>
</template>

<script>
	import getd from '../../vuex/getData.js';
	import tool from '../../util/tool.js';
	export default{
		data() {
			return {
				value:"",
				searchRecord:[],//搜索记录
				searchResult:[],//模糊查询的结果
				browsingHistory:[],//浏览历史记录
				isShow:false,
			}
		},
		created(){
			this.searchRecord = tool.readRecord("patent","");
			this.browsingHistory = tool.readRecord("patent","browsing");
		},
		methods:{
			home(){
				this.$router.push('/home/home');
			},
			//清除历史记录
			searchList(name){ 
				if (name) {
					if (this.searchRecord.length>0) {
						this.searchRecord = this.searchRecord;
						return tool.cleanSearchList("patent","","searchRecord",this);
					}
				}else{
					if (this.browsingHistory.length>0) {
						this.browsingHistory = this.browsingHistory;
						return tool.cleanSearchList("patent","browsing","browsingHistory",this);
					}
				}
			},
			//点击历史搜索跳转
			goSearch(val){
				var name = val.replace(/\<em\>/g,"").replace(/\<\/em\>/g,"");
				this.$router.push({path:'/businessQuery/patentResult',query:{searchName:name}});
			},
//			//点击搜索结果跳转
//			gocompanyduct(val){
//				var name = val.replace(/\<em\>/,"").replace(/\<\/em\>/,"");
//				tool.judgment("pat","",name);
//				this.$router.push({path:'/businessQuery/patentResult',query:{searchName:name}});
//			},
			//点击确认进行跳转
			search(){
				this.value = this.value.replace(/\s/g, "");
				if (this.value) {
					//存入本地
					tool.judgment("patent","",this.value)
					this.$router.push({path:'/businessQuery/patentResult',query:{searchName:this.value}});
				};
				return false;
			},
		},
	}
</script>

<style lang="less" type="stylesheet/css" scoped>
	@import "../../common/index.less";
	@import 'businessQuery.less';
</style>