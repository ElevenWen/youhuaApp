<template>
	<div id="shippingAddress">
		<div class="shippingAddress"  v-show=" !showBank && !showCompany ">
			<header-title title="收货地址" ></header-title>
			<div class="imgBox">
				<img src="../../assets/images/mine/myorder/dd-add-t@3x.png" alt="">
			</div>
			<!--收货地址为空时状态-->
			<div class="isNull" v-if='cusDeliveryData.length ===0'>
				<span>您还没有收货地址，请新增地址</span>
				<span @click="newSite">新增地址</span>
			</div>
			<div class="address_list" v-if='cusDeliveryData.length > 0'>
				<ul>
					<li v-for="(data, index) in cusDeliveryData" :key="index">
						<div class="box">
							<div @click="setAdrress(this,$event,data.Id)">
							<p class="address_name">
								<span>{{data.ConsigneeName}}</span>
								<span class="mobile">{{data.ConsigneeMobile}}</span>
							</p>
							<p class="address_site">
								<span>{{data.ProvinceName}}{{data.CityName}}{{data.AreaName}}</span>
								<span>{{data.Address}}</span>
							</p>
						</div>
						<div class="defaultTag" v-if="index == 0">默认</div>
						<div class="modify" @click="redactSite(data)">
							<img src="../../assets/images/mine/myorder/dd-edit@3x.png" alt="">
						</div>
						<!-- <div class="address_compile">
							<span>
								<img v-if="index == checkIndex" src="../../assets/images/tabBar/select_boxS@3x.png" />
								<img @click="IsDefault(data,index)" v-else="" src="../../assets/images/tabBar/select_box@3x.png" />&nbsp;默认地址
							</span>
							<span @click="deleteSite(data,index)"><img src="../../assets/images/tabBar/deleteIcon@3x.png" />&nbsp;删除</span>
							<span @click="redactSite(data)"><img src="../../assets/images/mine/Opinion@3x.png" />&nbsp;编辑</span>
						</div> -->
						</div>
					</li>
				</ul>
				<div class="new_site">
					<button @click="newSite">+&nbsp;新建地址</button>
				</div>
			</div>
		</div>
		<div id="newSite"  v-show="showCompany">
			<div class="popularity_return">
			  <span  class="return  promotion_top_right"  @click="toBack" ></span>
			  <span class="title_name">{{headTitle}}</span> 
			  <span class="pAdd" v-show="edit" @click="deleteSiteS">{{editor}}</span>
			</div>
			<div class="ge"></div>
			<div class="newSite">
				<ul>
					<li class="line">
						<div class="lineLi">
							<span><input type="text" placeholder="请输入收货人姓名" ref="ConsigneeName" v-model="ConsigneeName" @blur="checkName"></span>
						</div>
					</li>
					<li>
						<span><input type="text" placeholder="请输入手机号码" ref="ConsigneeMobile" v-model="ConsigneeMobile" @blur="checkTel"></span>
					</li>
					<li class="regionLi">
						<!-- <span>所在地区</span> -->
						<span class="region cf8C" @click="openAd">
							<span><strong>{{addressProvince}}</strong><i>|</i></span>
							<span><strong class="leftStyle">{{addressCity}}</strong><i>|</i></span>
							<span><strong class="leftStyle">{{addressXian}}</strong></span>
						</span>
					</li>
					<li>
						<span class="AddressStyle"><input type="text" placeholder="请输入详细地址（街道、楼牌号等）" ref="Address" v-model="Address" @blur="checkAddr" minlength="5" maxlength="100"></span>
					</li>
					<li>
						<span v-if='IsDefaults'  @click='IsDefaultClick' class="defaultStyle"><img  src="../../assets/images/tabBar/select_boxS@3x.png" />&nbsp;默认地址</span>
						<span v-else  @click='IsDefaultClick'><img src="../../assets/images/tabBar/select_box@3x.png" />&nbsp;默认地址</span>
					</li>
				</ul>
				<div class="new_site save_b">
					<button @click="save">保存</button>
				</div>
			</div>
		</div>
		<!-- 三级联动 -->
		<div class="liandongWrap"   @touchmove="mousemoveFn($event)"  @click="clickStartFn($event)"  v-show="popupVisible">
		  	<div class="liandong">
		  			<div class="choiceWrap">
				  		<p><span  @click="cancelAd">取消</span></p>
				  		<p><span  @click="closeAd">确定</span></p>
				  	</div>
					<mt-picker :itemHeight="itemHeight" :slots="addressSlots" class="picker"   value-key="Name"  @change="onAddressChange" :visible-item-count="3" >
					</mt-picker>
					<mt-picker :itemHeight="itemHeight" :slots="streetSlots" ref="picker" class="picker" @change="onStreetChange" :visible-item-count="3" >
					</mt-picker>
		  	</div>
		</div>
	</div>
</template>

<script>
	import headerTitle from '../components/header-title';
	import Vue  from 'vue';
	import { Toast,Actionsheet,Indicator,MessageBox  } from 'mint-ui';
	import s from '../comfirm-order/address4.json';
	import { mapState,mapActions} from 'vuex';
	import getd from '../../vuex/getData.js';
	import axios from 'axios';
	import tool from '@/util/tool'
	export default {
		data(){
			return {
				itemHeight:72,
				checkIndex: 0,		//默认选择第一个
				showCompany: false, //显示公司
				// showImg: false,
				edit: false,
				showBank: false,
				cusDeliveryData:[], //收货地址列表
				currentId:"",	//Id, 唯一标识（空值为新增，存在值为编辑）
				headTitle:"",//头部名字
				editor: "",
				ConsigneeName: "",	//收货人姓名
				ConsigneeMobile: "",  //收货人手机号码
				Province :"",	//收货人省市区
				Address:"",		//收货人详细地址
				popupVisible:false,//三级联动弹出框
				ProvinceId:'',
				cityId:'',
				areaId:'',
				IsDefaults: false,//默认地址
				province1:"",//当前省
				city1:"",//当前市
				area1:"",//当前区
				streetAddr:"",
				proviceId:0,  
		        cityId:0,  
		        areaId:0,  
				tempProvice:[],//省份
				tempProviceHidden:[],//隐藏的省份
				addressSlots: [
				{
				 	flex: 1,
			        defaultIndex: 1,
			        values: [],
			        className: 'slot1',
			        textAlign: 'center',
			        defaultIndex:1
				},
				{
				 	divider: true,
			        content: '',
			        className: 'slot2'
				},
				{
				 	flex: 1,
			        values: [],
			        className: 'slot3',
			        textAlign: 'center'
				},
				{
				 	divider: true,
			        content: '',
			        className: 'slot4'
				},
				{
				 	flex: 1,
			        values: [],
			        className: 'slot5',
			        textAlign: 'center'
				}
				],
				streetSlots: [{
			        flex: 1,
			        values: [],
			        className: 'slot1',
			        textAlign: 'center'
			    }],
				addressProvince: '省',
		        addressCity: '市',
		        addressXian: '区',
			}
		},
		created(){
			getd.getCusDeliveryAddressList().then((res)=>{ //获取收货地址
				this.cusDeliveryData = res.data.list;
				
			})
			this.getprovice();
			//适配不同手机的 三级 联动 
			var  dpr = document.documentElement.getAttribute('data-dpr');
			if(dpr <2){
				this.itemHeight = 36;
			}else if(dpr <=2){
				this.itemHeight = 72;
			}else{
				this.itemHeight = 108;
			}
		},
		mounted(){
			
		},

		components:{
			headerTitle,
		},
		methods:{
			//设置地址 非设置默认地址
			setAdrress(a,el,id){
				if(this.$route.query.isCF&&this.cusDeliveryData.length){
					this.$router.replace('/cart/comfirmOrder?AId='+id)
				}
			},
			// 验证姓名
			checkName(){
				let _checkName = tool.regularJudgement("person",this.ConsigneeName);
				if(!_checkName){
					return false;
				}
				return _checkName;
			},
			// 验证电话
			checkTel(){
				if(!ConsigneeMobile){
					return;
				}
				let _checkTel = tool.regularJudgement("phone",this.ConsigneeMobile);
				if(!_checkTel){
					return false;
				}
				return _checkTel;
			},
			// 验证地址
			checkAddr(){
				// let _checkAddr = tool.regularJudgement("companyAddress",this.Address);
				// if(!_checkAddr){
				// 	return false;
				// }
				// // return _checkAddr;
				// if(this.Address.length < 5){
				// 	Toast({
				// 		message: '详细地址不能少于五个字',										
				// 	});
				// }
			},
			//编辑收货地址
			redactSite(val){
				this.currentId = val.Id;
				this.showCompany = true;
				this.edit = true;
				this.showBank = false;
				this.headTitle = "编辑收货地址";
				this.editor = "删除";
				var param = {
		            datatype:"json",
		            Id:val.Id,
		        }
				getd.getSingAddress(param).then((res) => {
					this.ConsigneeName = val.ConsigneeName;	//收货人姓名
					this.ConsigneeMobile = val.ConsigneeMobile;  //收货人手机号码
					// this.Province = "广东省深圳市宝安区";	//收货人省市区
					this.Address = val.Address;		//收货人详细地址
					this.IsDefaults = val.IsDefault		//是否默认地址
					this.addressProvince = res.data.ProvinceName //省
					this.addressCity = res.data.CityName //市
					this.addressXian = res.data.AreaName //区
				})
			},
			//新增收货地址
			newSite(){
				if(this.cusDeliveryData.length>=10){
					Toast({
						message: '收货地址不能超过十个',										
					});
					return;
				}
				this.showCompany = true;
				this.showBank = false;
				this.headTitle = "新增收货地址";
				this.edit = true;
				this.editor = "";
				//var param = {
//		            datatype:"json",
//		            Id:"",
//		            ConsigneeName:"",
//		            ConsigneeMobile:"",
//		            ProvinceId:"",
//		            CityId:"",
//		            AreaId:"",
//		            Address:"",
//		            IsDefault:true,
//		        }
//				getd.addShippingAddress().then((res) => {
					this.ConsigneeName = "";	//收货人姓名
					this.ConsigneeMobile = "";  //收货人手机号码
					this.Province = "";	//收货人省市区
					this.Address = "";		//收货人详细地址
					this.IsDefaults = false;	//是否默认地址
//				})
			},
			//修改默认地址
			IsDefault(val,i){
		        var param = {
			            datatype:"json",
			            Id:val.Id,
		        }    
		        getd.setDefault(param).then((res) => {
								 // window.location.reload();  ??体验！
							this.checkIndex = i;
							Toast({
									message: '设置成功',										
								});
		        })
		        .catch((err) => {
		        	////console.log(err)
		        })
		    },
		    IsDefaultClick(){ //编辑页面重置默认地址
		    	this.IsDefaults = !this.IsDefaults
		    },
			//删除
			deleteSite(val,i){
					var param = {
					params : {
							datatype:"json",
							Id:val.Id,
						}
					};
				MessageBox.confirm('确定要删除此地址吗?')
				.then(action => {
						getd.delectShippingAddress(param).then((res)=>{
							Toast({message: '删除成功！',position: 'middle',duration: 3000});
							window.location.reload();
						}).catch((res) =>{
							Toast({message: '删除失败',position: 'middle',duration: 3000});
						})
					})
				.catch(rejected =>{
					return
				})
			},
			deleteSiteS(){
				var param = {
					params : {
						datatype:"json",
		            	Id:this.currentId,//Id, 唯一标识（空值为新增，存在值为编辑）
					}
				}
				MessageBox.confirm('确定要删除此地址吗?')
				.then(action => {
						getd.delectShippingAddress(param).then((res)=>{
							Toast({message: '删除成功！',position: 'middle',duration: 3000});
							window.location.reload();
						}).catch((res) =>{
							Toast({message: '删除失败',position: 'middle',duration: 3000});
						})
					})
				.catch(rejected =>{
					return
				})
			},
			//保存地址
			save(){
				var tel = this.$refs.ConsigneeMobile.value; //手机号码
				var tes = this.$refs.Address.value;			//详细地址
				var tee = this.$refs.ConsigneeName.value;   //收货人名称
				if(tee.length < 2 || tee == Number){ 
			      	Toast({message: '请输入正确的姓名！',position: 'middle',duration: 2000});
			        return false; 
			    }
			    if(!(/(^1[3|4|5|7|8][0-9]{9}$)/.test(tel))){ 
			      	Toast({message: '请输入正确的手机号！',position: 'middle',duration: 2000});
			        return false; 
			    }
			    if(tes.length < 5 || tes == Number){ 
			      	Toast({message: '请输入正确的详细地址！',position: 'middle',duration: 2000});
			        return false; 
			    }
				//alert("保存成功！");
				//获取三级联动数据
				var param = { 
		            datatype:"json",
		            Id:this.currentId,//Id, 唯一标识（空值为新增，存在值为编辑）
		            ConsigneeName: this.ConsigneeName,//收货人姓名
		            ConsigneeMobile: this.ConsigneeMobile,//手机号码
		            ProvinceId: this.ProvinceId,//省份ID
		            CityId: this.cityId,//城市ID
		            AreaId: this.areaId,//区域ID
		            Address: this.Address,//详细地址
		            IsDefault: this.IsDefaults //是否为默认地址（true=是，false=否）
		        }
				getd.addShippingAddress(param).then((res)=>{
					Toast({message: '保存成功！',position: 'middle',duration: 2000});
			        window.location.reload();
				}).catch((error)=>{
					Toast({message: '保存失败！',position: 'middle',duration: 2000});
					window.location.reload();
				})
			},
			toBack(){
				this.showCompany = !this.showCompany;
			},
			//点击省市区
			openAd($event) {
				$event.preventDefault();
				if (!this.status) {
					this.popupVisible = !this.popupVisible;
				}
		   	 	$event.stopPropagation();
		    },
		    //三级联动  确定
		    closeAd($event){
		    	$event.preventDefault();
		    	//关闭模态三级
			    this.popupVisible = !this.popupVisible;
			    $event.stopPropagation()
					this.province1 = this.addressProvince;
					this.city1 = this.addressCity;
			    this.area1 = this.addressXian;
		    },
		    //三级联动   取消
		    cancelAd($event){
//		    	//console.log('取消')
		    	$event.preventDefault();
		    	this.popupVisible = !this.popupVisible;
			    $event.stopPropagation();
			    this.addressProvince = this.province1;
			    this.addressCity = this.city1;
			    this.addressXian = this.area1;
		    },
		    mousemoveFn($event){
				//阻止穿透 滚动html
				$event.preventDefault();			 
			},
			clickStartFn($event){
				//阻止穿透 滚动html
				$event.preventDefault(); 
				this.popupVisible = ! this.popupVisible;
			},
			onAddressChange(picker, values) {
				this.$nextTick(()=>{ 
					if(!values[0] ){
						 //处理 values为undefined 情况
						 // 通过mouted 钩子触发change事件 -- 每次change事件触发3次
						return 
					}
					this.addressProvince = values[0].Name // 一级赋值
					this.ProvinceId = values[0].Id // 一级赋值
					var paramsGetcityArea = { //请求二级
						params:{
				          datatype:"json",
				          Id: typeof values[0]  =='object' ? values[0].Id : values[0] ,//默认显示北京市
				        }
					}
					this.getcityArea(paramsGetcityArea,picker,values) //请求市区
				    return false
			    })
			},
			onStreetChange(picker, values){
		        this.addressStreet = values[0]
		    },
		    getprovice(){ // 请求省份
		    	getd.provice("get","/System/GetProinveList").then((res)=>{ 
		    		res.data.list.forEach((item,index)=>{
		    			this.tempProvice.push(item.Name)
		    			this.tempProviceHidden.push(item.Id)
		    		});
		    		this.$set(this.addressSlots[0],'values',res.data.list )
		    	}) 
		    },
		    getcityArea(paramsGetcityArea,picker,values){//请求市区
		    	return getd.cityArea(paramsGetcityArea)
		    	.then((res)=>{
//		    		//console.log('氢气市区',values)
		    		picker.setSlotValues(1, res.data.list)//配制二级
		    		if( values[1] ==  undefined ){
		    			return false
		    		}
		    		this.addressCity = values[1].Name//二级赋值
		    		this.cityId =  values[1].Id//二级赋值
		    		let paramsGetcityArea = {
		    			params:{
				          datatype:"json",
				          Id:    values[1].Id,//默认显示北京市
				        }
		    		};
		    		this.getAreaList(paramsGetcityArea,picker,values) //三级
		    	}) //请求市区
		    }	,
		    getAreaList(paramsGetcityArea,picker,values){ //请求三级城市
		    	return getd.cityArea(paramsGetcityArea).then((res)=>{
		    		picker.setSlotValues(2, res.data.list  )// 市区
//		    		//console.log(res.data.list,'sanji ')
//		    		//console.log(values,'sanji ')
		    		if(values[2] != undefined){
		    			this.addressXian = values[2].Name
		    			this.areaId = values[2].Id;
		    		}
		    	}) 
		    },
		    defaultClick(){//设置默认地址
		    	this.IsDefault = !this.IsDefault 
		    }
		},
		 
		 
	}
</script>

<style lang="less" type="stylesheet/css" scoped>
	@import "../../common/index.less";
	@import './mine.less';
	#shippingAddress{
		background: #fff;
	}
	a{
		height: 0.96rem;
	}
	.imgBox{
		margin-top: 1.173333rem;
	}
</style>