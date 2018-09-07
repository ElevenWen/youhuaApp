<template>
	<div id="identitySelect">
		<header-title title="身份选择"></header-title>
		<div class="identitySelect">
			<div class="enterprise">
				<img src="../../assets/images/electronicContract/enterprise@3x.png">
				<span class="identity" v-bind:class="{ actives: isActives}" @click="enterprise">企业身份签署</span>
			</div>
			<div class="personage">
				<img src="../../assets/images/electronicContract/personage@3x.png">
				<span class="identity" v-bind:class="{ active: isActive}" @click="personage">个人身份签署</span>
			</div>
			<div class="nextStep" @click="authentication">下一步</div>
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
	import { Indicator,MessageBox } from 'mint-ui';
	import getData from "../../vuex/getData";
	export default {
		data(){
			return {
				isActive: false, //个人身份签署
				isActives: true,//企业身份签署
			}
		},
		components:{
			headerTitle,
		},
		computed:{
			
		},
		mounted(){
			console.log(tool.loadFromLocal("orderDetail123","ALL") );
		},
		methods:{
			personage(){
				this.isActive = true;
				this.isActives = false;
			},
			enterprise(){
				this.isActives = true;
				this.isActive = false;
			},
			authentication(){
				//没有签章-个人实名认证
				// this.$router.push('/electronicContract/personageRZ');
				//没有签章-企业实名认证
				// this.$router.push('/electronicContract/enterpriseRZ');

				//有签章跳签章页
				// this.$router.push('/electronicContract/signature');
				if(this.isActive){
					let params = {
						Type: 0,
						datatype:"json",
					}
					this.request_signlist(params,1);
				}else if(this.isActives){
					let params = {
						Type: 1,
						datatype:"json",
					}
					this.request_signlist(params,2);
				}
				
			},
			request_signlist(params,type){ // 1 == 个人 2 == 公司
				getData.signList(params).then((res) => {
					// console.log("res11111",res);
					if(type == 1){
						if(res.data.length == 0){
							this.$router.push('/electronicContract/personageRZ');
						}else{
							this.$router.push({path:"/electronicContract/signature",query:{type:'person'}});
						}
					}else if(type == 2){
						if(res.data.length == 0){
							this.$router.push('/electronicContract/enterpriseRZ');
						}else{
							this.$router.push({path:"/electronicContract/signature",query:{type:'company'}});
						}
					}
				})
			}
		},
		filters:{
			
		}
	}
</script>