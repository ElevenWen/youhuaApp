<template>
	<div id="electronicContract">
		<header-title title="合同详情"  @showProps="showPropsFn"></header-title>
		<div class="electronicContract">
			<div class="contract">
				<!-- <embed :src="isShowContract" />	
				<embed id="plugin" type="application/pdf" :src="isShowContract" /> -->

				<!-- 不带签章 -->
				<!-- <iframe :src="'static/web/viewer.html?id='+contractTemData" width="100%" height="100%" frameborder="0" name="iframeS" id="iframeS" @load="toLoad" v-if="isShow"></iframe> -->
				<div  v-for="(items,index) in imgList" :key="index" v-if="isShow">
					<img :src="items.ImgUrl">
				</div> 
				<!-- 带签章-->



				<!-- <iframe  src="https://www.jb51.net/article/42666.htm" width="100%" height="100%" frameborder="0" name="iframeS" id="iframeS" @load="aaaa"></iframe> -->
				
				
				
				<div v-if="!isShow" v-for="(items,index) in imgList2" :key="index">
					<img :src="items.ImgUrl">
				</div>
			</div>
			<div class="contractBottom" v-if="isSigned">
				<ul>
					<li @click="customerService">联系客服</li>
					<li @click="downContract">下载电子合同</li>
				</ul>
			</div>
			<div class="contractBottom" v-else>
				<ul>
					<li @click="customerService">联系客服</li>
					<li @click="identitySelect">签署电子合同</li>
				</ul>
			</div>
		</div>
	</div>	
</template>

<style type="text/css" lang="less" scoped>
	@import "../../common/index.less";
	@import "./electronicContract.less";
</style>

<script>
import headerTitle from '../components/header-title';
import tool from '../../util/tool';
import { Indicator,MessageBox,Toast } from 'mint-ui';
import { mapState,mapActions,mapGetters} from 'vuex';
import getData from "../../vuex/getData";
	export default {
		data(){
			return {
				isSigned:false,//是否已签署
				contractTem:"", //未签署的合同
				contractTemYes:"",
				info:"",
				_status:"", //订单状态
				isShow:false,
				url:'',
				noSignImg:"", //不带签章的图片
				haveSignImg:"", //带签章的图片
				imgList:[],
				imgList2:[],
			}
		},
		components:{
			headerTitle,
		},
		computed:{
			arr(){
				var arrTemp = this.$store.state.myorder.productDetail;
				return arrTemp;
			},
			contractTemData(){
				let arrTemp = this.$store.state.myorder.productDetail;
				return arrTemp.ElectronicContractTemplate;
			},
			contractTemYesData(){
				let arrTemp = this.$store.state.myorder.productDetail;
				return arrTemp.ElectronicContractViewpdfUrl;
			}

		},
		mounted(){
			console.log(1)
			console.log(tool.loadFromLocal("orderDetail123","ALL") );
			console.log(this.$store.state.myorder.productDetail,5465)
			var arrTemp = this.$store.state.myorder.productDetail;
			let info = tool.loadFromLocal("orderDetail123","ALL");
			// console.log("00info",info);
			let aaa = info.orderDetail123.orderDetail123.IsSignedElectronicContract;
			if(aaa){
				let params = {
					id: info.orderDetail123.orderDetail123.contractId,
					datatype: "json",
				}
				getData.toSignImg(params).then((res) => {
					this.isShow = false;
					this.isSigned = true;
					this.imgList2 = res.data;
					// console.log("toSignImg",res,this.imgList2);
				})
				// this.isShow = false;
				// this.isSigned = true;
			}else{
				let params = {
					id: info.orderDetail123.orderDetail123.ContractTemplateID,
					datatype: "json",
				}
				getData.toImg(params).then((res) => {
					// this.isShow = true;
					// this.isSigned = false;
					this.imgList = res.data;
					console.log(res);
				})
				this.isShow = true;
				this.isSigned = false;
			}
		},
		methods:{
			// aaaa(){
			// 	console.log(2)
			// },
			toLoad(){
				window.frames["iframeS"].document.getElementById("viewerContainer").style.height=window.screen.height-50-44-32  +'px';
			},
			showPropsFn(){

			},
			identitySelect(){
				this._status = this.$store.state.myorder.productDetail.Status;
				console.log("this._status",this._status)
				if(this._status == "Prepay" || this._status == "Fail"){
					Toast({
						message: '只有已受理的订单才能签署电子合同',
						duration: 2000
					});
					return;
				}else {
					this.$router.push('/electronicContract/identitySelect');
				}
			},
			downContract(){
				this.imgList2.forEach((items) => {
					var dtask = plus.downloader.createDownload(items.ImgUrl, {});
					dtask.start();
					dtask.addEventListener("statechanged", function(task, status) {
						switch(task.state) {
							case 1: // 开始
								break;
							case 2: //已连接到服务器
								break;
							case 3: // 已接收到数据
								break;
							case 4: // 下载完成
								plus.gallery.save( task.filename, function () {
									Toast({
										message: '已保存到相册',
										duration: 1000
									});
								} );
								break;
						}
					});
				})
				
			},
			customerService(){ //客服聊天页面
				//window.open('https://html.ecqun.com/kf/sdk/openwin.html?corpid=7331675&cstype=rand&mode=0&cskey=SqGFFE7Glw76x6szdw&scheme=0')
				this.$router.push('/userChatSever')
				},
		},
	}
</script>
