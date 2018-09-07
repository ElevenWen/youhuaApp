<template>
  <div id="goCompany1">
    <!-- 选择公司 -->
		<div id="companyDetailWrap">
			<div class="popularity_return">
			  <span  class="return  promotion_top_right" @click="goBack"></span>
			  <!-- 人气专场 -->
			  <span class="title_name">我的公司</span>
			  <span class="pAdd" @click="showCompanyFn()" v-show="(showCompanyBtn)">新增</span>
			</div>
			
			<!--公司为空-->
			<!--<div class="goCompanyNull" v-if="companyList.length==0">
				<span>暂无公司</span>
			</div>-->
			<!-- 显示公司列表 -->
			<ul class="companyWrap"  v-show=" !showBank && !showCompany "> 
			  <li v-for="(items ,index) in  companyList"  @click="checkComanyFn(items,index)" :key="index">
			  <span class="spanIndex">{{items.Name}}</span>
			  	<!--<i :class="{cIcon:index==check,'':index!=check}"></i>-->
			  	<!-- {{items}} -->
			  	<span class="company_amount" v-show="items">{{items.OrderCount}}</span>
			  </li>
			</ul>

		</div>
		<!-- /选择公司 -->
		<!-- 新增公司 -->
		<div id="addCompanyWrap" ref="addCompanyWrap"  v-show="showCompany">
			<div class="popularity_return">
			  <span  class="return  promotion_top_right"  @click="toBack" ></span>
			  <span class="title_name">{{headTitle}}</span> 
			  <span class="pAdd" v-show="edit" @click="goEdit(editor)">{{editor}}</span>
			</div>
			<div class="generalWtap">
				<ul class=" companyUl">
					<li class="items" :class="isShow?'selected':''">
						<span><i style="color: red;" v-if="isShow">*</i>营业执照</span>
						<div class="upload" @click="toChoose">
							<input type="file" id="upload" ref="val" accept="image/*" @change="upload()" v-show="isShow&&(!isApp)">
							<div class="picture" :style="'backgroundImage:url('+headerImage+')'"></div>
						</div>
						<i class="cIcon" v-show="isShow"></i>
					</li>
					<li class="items" :class="isShow?'selected':''">
						<span><i style="color: red;" v-if="isShow">*</i>公司名称</span>
						<input type="text"  placeholder="请输入" v-model="companyName" v-show="isShow">
						<div class="company" :class="isShow?'active':''" v-show="!isShow">{{companyName}}</div>
					</li>
					<li class="items" :class="isShow?'selected':''">
						<span><i style="color: red;" v-if="isShow">*</i>社会信用代码</span>
						<input type="text"  placeholder="请输入" v-model="socialCreditCode" v-show="isShow">
						<div :class="isShow?'active':''" v-show="!isShow">{{socialCreditCode}}</div>
					</li>
					<li class="items"  @click="actionSheet">
						<span>纳税人类型</span>
						<!-- 要求下面弹框 -->
						<input type="text" v-model="taxpayerType" v-show="isShow" readonly="readonly" style="color:#888;">
						<div v-show="!isShow">{{taxpayerType}}</div>
						<i class="cIcon" v-show="isShow"></i>
					</li>
					<li class="items" @click="showAction" >
						<span>开户行</span>
						<input type="text"  v-model="bank" v-show="isShow" readonly="readonly" style="color:#888;"> 
						<div v-show="!isShow">{{bank}}</div> 
						<i class="cIcon" v-show="isShow"></i>
					</li>
					<li class="items"  >
						<span>银行账号</span>
						<input type="text"  placeholder="请输入"  v-model="bankAccount" v-show="isShow"> 
						<div v-show="!isShow">{{bankAccount}}</div>
					</li>
					
					<!-- <li class="items  ad " v-if="false" >
						<div >税票地址</div>
						<div class=" cf8C" @click="openAd">
							<span><strong>{{addressProvince}}</strong><i>|</i></span>
							<span><strong>{{addressCity}}</strong><i>|</i></span>
							<span><strong>{{addressXian}}</strong></span>
						</div>
						<div class="other"  >
							<input type="text" placeholder="其他" v-model="invoiceAddress" v-if="isShow">
							<div v-if="!isShow">{{invoiceAddress}}</div>
						</div>
					</li> -->
					

 
					<!--<li class="items ad" v-if="false">
						<div >注册地址</div>
						<div class=" cf8C" @click="openAd2">
							<span><strong>{{addressProvince2}}</strong><i>|</i></span>
							<span><strong>{{addressCity2}}</strong><i>|</i></span>
							<span><strong>{{addressXian2}}</strong></span>
						</div>
						<div class="other" >
							<input type="text" placeholder="其他" v-model="companyAddress" v-if="isShow">
							<div v-if="!isShow">{{companyAddress}}</div>
						</div> 
					</li> -->

					<li class="items"  >
						<span>注册地址</span>
						<!-- 要求下面弹框 -->
					 <input type="text" v-model="companyAddress"   v-show="isShow"  placeholder="请输入" />
						<div v-if="!isShow"  @click='goMap' class="addressAB">{{companyAddress}}</div>
					<!--	<div v-else>{{companyAddress}}</div>-->
						<i class="cIcon" v-show="!isShow" @click='goMap'></i>
					</li>


					<li class="items" >
						<span>电话</span>
						<input type="text" placeholder="请输入" v-model="phone" v-show="isShow" @blur="verifyP">
						<div v-show="!isShow">{{phone}}</div>
					</li>
					<mt-actionsheet :actions= "data" v-model="sheetVisible"></mt-actionsheet>
				</ul>
			</div>
			<div class="noticeWrap" id="noticeWrap">
				温馨提醒:完善以上信息，以便于您更高效的办理商事相关业务。我们会确保您公司的相关信息被妥善的保存和处于严格的保护状态。
			</div>
			<div class="inProcess " v-show="!enterBtn">
				<span>办理中业务({{comContent.length}})</span>
				<ul>
					<li v-for="(data,index) in comContent" :key="index" >{{data.ProductName}}</li>
				</ul>
			</div>
			<div class="orderBtn" id="orderBtn" v-show="enterBtn"><span @click="increased">确定</span></div>
		</div>
		<!--/ 新增公司 -->

		<!-- 选择银行 -->
		<div id="bankDetailWrap" v-show="showBank">
			<div class="popularity_return">
			   <span  class="return  promotion_top_right"  @click="formBackGo()" ></span>
			  <span class="title_name">选择银行</span> 
			</div>
			<div :style="srollHeight" class="mainWrap">
				<ul class="companyWrap">
					<li v-for="(items,index) in bankArr" @click.prevent="checkBankFn(items,index)" :key="index">
						{{items.Name}}
						<i :class="{cIcon:index== checkBankIndex}"></i>
					</li>
				</ul>
			</div>
			

		</div>
		<!-- /选择银行 -->
<!-- 三级联动 -->
<!-- <mt-popup v-model="popupVisible"  position="bottom" @click="abcdFn()"> -->
<div class="liandongWrap"   @touchmove="mousemoveFn($event)"  @click="clickStartFn($event)"  v-show="popupVisible">
  	<div class="liandong">
  			<div class="choiceWrap">
		  		<p ><span  @click="cancelAd">取消</span></p>
		  		<p><span   @click="closeAd">确定</span></p>
		  	</div>
			<mt-picker :slots="addressSlots" class="picker" @change="onAddressChange" :visible-item-count="3" >
			</mt-picker >
			<mt-picker :slots="streetSlots" ref="picker" class="picker" @change="onStreetChange" :visible-item-count="3" >
			</mt-picker >
  	</div>	  
</div>
<!-- </mt-popup> -->
	
<!-- <mt-popup v-model="popupVisible2"  position="bottom"> -->
  <div class="liandongWrap" @touchmove="mousemoveFn($event)"    @click="clickStartFn2($event)" v-show="popupVisible2">
  	<div class="liandong" >
  		<div class="choiceWrap"  >
	  		<p ><span  @click="cancelAd2">取消</span></p>
	  		<p ><span  @click="closeAd2">确定</span></p>
	  	</div>
		<mt-picker :slots="addressSlots2" class="picker2" @change="onAddressChange2" :visible-item-count="3" >
		</mt-picker >
		<mt-picker :slots="streetSlots2" ref="picker2" class="picker2" @change="onStreetChange2" :visible-item-count="3" >
		</mt-picker >

  	</div>
</div>
<!-- </mt-popup>	 -->
	<!-- /三级联动 -->	
	
	<!--扫一扫弹窗-->
		<scanMessageBox :isShowMessageBox="isShowMessageBox" @closePop="toClose"></scanMessageBox>
  </div>
</template>

<script>
import Vue  from 'vue';
import { Toast,Actionsheet,Indicator } from 'mint-ui';
import s from '../comfirm-order/address4.json';
import { mapState,mapActions} from 'vuex';
import getd from '../../vuex/getData.js';
import tool from '../../util/tool'
import axios from 'axios';
import scanMessageBox from "../components/scanMessageBox.vue"
var ua = navigator.userAgent.toLowerCase();
export default {
	data(){
		return {
			ReviewStatus:'', //审核状态
			isApp:true,//是否在app
			title:"发票须知",
			showCompany:false, //显示公司
			showCompanyBtn:true,//新增 按钮 显示新增公司 
			showBank:false,//显示银行
			bankArr:[],//银行列表
			checkBankIndex:0,//默认选择中国银行索引
			check:99,
			comId:[],//公司id
			comLength:[],//公司对应的服务数量
			comContent:[],
			popupVisible:false,
			popupVisible2:false,
			phone:"",//电话
			socialCreditCode:"",//社会信用代码
			companyName:"",//公司名称
			headerImage:"",//营业执照
			taxpayerType:"",//纳税人类型
			bank:"",//开户行
			legalRepresentative:"",//法定代表人
			establishmentDate:"",//成立日期
			enterpriseType:"",//企业类型
			bankAccount:"",//银行账号
			invoiceAddress:"",//税票地址
			companyAddress:"",//公司地址
			sheetVisible:false,//纳税人类型操作表
			edit:false,//编辑隐藏/显示
			isShow:true,//输入隐藏/显示
			status:false,//点击状态判断
			enterBtn:false,
			editor:"编辑",
			companyId:"",
			headTitle:"",//头部名字
			processing:[],//办理中的业务
			isPhone:false,//电话验证
			province1:"",//当前省
			city1:"",//当前市
			area1:"",//当前区
			province2:"",//当前省
			city2:"",//当前市
			area2:"",//当前区
			companyList:[],//公司列表数据
			data:[{
				name: '一般纳税人',  
        method : this.gTaxpayer
			},{
				name: '小规模纳税人',  
        method : this.sTaxpayer
			}],
			data1: [{
				name: '拍照',  
        		method : this.getCamera
			}, {
				name: '从相册中选择',   
        		method : this.getLibrary
			}],
			addressSlots: [
				{
				 	flex: 1,
			        defaultIndex: 1,
			        values: Object.keys(s),
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
				}],
				streetSlots: [
		        {
		          flex: 1,
		          values: [],
		          className: 'slot1',
		          textAlign: 'center'
		        }
		      ],
	        addressProvince: '省',
	        addressCity: '市',
	        addressXian: '区',
	        addressStreet: '街道',
	        //第二个三级联动
	        addressSlots2: [
				{
				 	flex: 1,
			        defaultIndex: 1,
			        values: Object.keys(s),
			        className: 'slot1',
			        textAlign: 'center',
			        defaultIndex:1
				},
				{
				 	divider: true,
			        content: '-',
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
			        content: '-',
			        className: 'slot4'
				},
				{
				 	flex: 1,
			        values: [],
			        className: 'slot5',
			        textAlign: 'center'
				}],
				streetSlots2: [
	        {
	          flex: 1,
	          values: [],
	          className: 'slot1',
	          textAlign: 'center'
	        }
	      ],
        addressProvince2: '省',
        addressCity2: '市',
        addressXian2: '区',
        addressStreet2: '街道',
        isShowMessageBox:false,//显示扫一扫弹窗
		}
	},
	// props:{
	// 	showBank:false
	// },
	components:{
	    scanMessageBox
	},
	beforeRouteEnter (to, from, next) {	
	    next(vm => {  
	      	//解决 公用组件新增公用 显示和隐藏的问题
	      	if(to.name == "goCompany2" ){  
	      		//隐藏 新增按钮
				vm.showCompanyBtn =false;//不显示 新增按钮
			}
			// 解决 公用组建  银行选择 显示和隐藏问题
			if(vm.$router.currentRoute.query.active == "bank" ){  
	      		//隐藏 新增按钮
				vm.showBank =true;
				vm.showCompany = false;
				vm.showCompanyBtn =false;//不显示 新增按钮
			}else if(vm.$router.currentRoute.query.active == "goCompany" ){
				vm.showBank = false;
				vm.showCompany = false;
				vm.showCompanyBtn =false;//不显示 新增按钮
			}
	      	setTimeout(() => {
	  			//  默认触发三级联动
	  			vm.addressSlots[0].defaultIndex = 0;
	  			vm.addressSlots2[0].defaultIndex = 0;
  			},100);
  			
  			// 初始化 公司列表  
//			vm.request_data_goCompany();  
  			//后台默认可以用的银行
  			 vm.initBack();
  			//console.log( "111",vm.bankArr )
  			

	    });	
    },
    mounted(){
    	
			//是否在app内
			if(ua.match(/wqbol/i)=="wqbol"){
				this.isApp = true;
			}else{
				this.isApp = false;
			}
	},
	methods:{
		initBack(){//后台默认可以用的银行
			  
			// getd.REQUESTBANK_GOCOMPANY_TEST('get') //测试环境
			// .then(({data})=>{
			// 	//console.log("银行")
			//     this.bankArr = data.list; 
			// },(error)=>{
			// 	//console.log(error,"银行");
			// });

			 getd.REQUESTBANK_GOCOMPANY('get')//正式环境
			 .then( ({data})=>{  
			 	this.bankArr = data.list; 
			 },(error)=>{
			 	//console.log(error,"银行");
			 });

		},
		goBack(){
			//返回	   
			this.$router.go(-1);
		},
		toBack(){
			//重置input
			this.$refs.val.value  = "";
			
			this.showCompany = !this.showCompany;
			this.editor = "编辑";
		},
		startFn($e){
			//console.log($e); 
		},
		showCompanyFn(){ 
			//显示 新增公司 隐藏公司列表 且隐藏银行列表
			this.showCompany = true;
			this.showBank = false;
			this.status = false;
			this.isShow = true;
			this.enterBtn = true;
			this.edit = false;
			this.socialCreditCode ="";
			this.companyName = "";
			this.headerImage = "";
			this.taxpayerType = "";
			this.bank = "";
			this.bankAccount = "";
			this.addressProvince = "省";
			this.addressCity = "市";
			this.addressXian = "区";
			this.invoiceAddress = "";
			this.addressProvince2 = "省";
			this.addressCity2 = "市";
			this.addressXian2 = "区";
			this.companyAddress = "";
			this.phone = "";
			this.headTitle = "新增公司";
			this.editor = "";
		},
		checkBankFn(items,index){
			//选择银行
			this.checkBankIndex = index;
			// this.$store.state.comfirmOrder.checkComanyList.BankName = this.bankArr[index]
			// 后退
			// this.$router.go(-1);   
			document.getElementById("noticeWrap").style.display = "block";
			if(this.editor == "完成"){
				this.enterBtn = false;
			}else if(this.editor == ""){
				this.enterBtn = true;
			}
			this.bank = items.Name;
			this.showBank = !this.showBank;
		},
		//手机号判断
		verifyP(){
			if(!this.phone){
				return
			}
			var status = this.commonTool.regularJudgement("telephone",this.phone);
				if (status) {
					this.isPhone = true;
				}else{
					this.isPhone = false;
				}
		},
		checkComanyFn(items,index){
			//选择公司
			this.check = index;
			// //console.log(items)
			//同步vuex\
			//this.$store.state.comfirmOrder.checkComanyList = items;
			this.$store.state.comfirmOrder.checkIndex = index; 
			 
			//更新被选中公司的数据
			 this.$store.state.comfirmOrder.checkComanyList = items;
			//this.$emit("checkCompanProps","xx")
				this.companyId = items.Id;
				var params = {
					id:items.Id,
					datatype:"json"
				}
				//获取公司详情
				getd.getCusCompanyById(params)
				.then((res)=>{
					//console.log(res.data,'公司信息');
					this.socialCreditCode = res.data.SocialCreditCode;
					this.companyName = res.data.Name;
					this.headerImage = res.data.BusinessLicensePic;
					this.ReviewStatus = res.data.ReviewStatus
					if (res.data.TaxpayersType==0) {
						this.taxpayerType = "一般纳税人";
					} else if (res.data.TaxpayersType==1){
						this.taxpayerType = "小规模纳税人";
					}
					this.bank = res.data.BankName;
					this.bankAccount = res.data.BankAccount;
					this.invoiceAddress = res.data.TaxIdAddress;
					this.companyAddress = res.data.CompanyAddress;
					this.addressProvince = res.data.TaxIdAddressProvince;
					this.addressCity = res.data.TaxIdAddressCity;
					this.addressXian = res.data.TaxIdAddressArea;
					this.addressProvince2 = res.data.CompanyAddressProvince;
					this.addressCity2 = res.data.CompanyAddressCity;
					this.addressXian2 = res.data.CompanyAddressArea;
					this.phone = res.data.Phone;
				})
				//获取正在办理中的业务
//				var paramsObj = {
//					type:"1"
//				}
//				getd.REQUEST_DATA_MYORDER(paramsObj)
//				.then((res)=>{
//					//console.log(res.data.list)
//				})
//				.catch((error)=>{
//					//console.log(error)
//				})
				
				
				var paramsId = {
					id:items.Id
				}
				getd.getCompanyOrderList(paramsId)
				.then((item)=>{
					//console.log(item.data.list)
					this.comContent = item.data.list;
				})
				
				
				this.showCompany = true;
				this.showBank = false;
				this.edit = true;
				this.isShow = false;
				this.status = true;
				this.enterBtn = false;
				this.headTitle = "公司基础信息";
		},
		formBackGo(){
			//console.log()
			// 从选择银行 返回
			this.showBank = !this.showBank;
			document.getElementById("noticeWrap").style.display = "block";
			if(this.editor == "完成"){
				this.enterBtn = false;
			}else if(this.editor == ""){
				this.enterBtn = true;
			}
			//若url带有active 参数 则go(-1) 否则判断此次点击来源url为  我的-公司 菜单
			//console.log("this.$router",this.$router )
			if(this.$router.currentRoute.query.active =="bank"  ){
				//返回setBill 页面
				this.$router.go(-1);
			}
			
		},
		addComBtn(){
			//
			this.showCompany = true;
			this.$nextTick(()=>{
				// //console.log(this.$refs.addCompanyWrap)
				// let addObj = this.$refs.addCompanyWrap;
				// addObj.style.cssText = "display:block";
			})
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
		clickStartFn2($event){
			$event.preventDefault();
			this.popupVisible2 = ! this.popupVisible2; 
		},
		ab(event){
			////console.log(event)
		},
		onAddressChange(picker, values) {
			
				this.$nextTick(()=>{
					let sheng = Object.keys(s);
				 

					if(!values[0] ){
						 //处理 values为undefined 情况
						 // 通过mouted 钩子触发change事件 -- 每次change事件触发3次
						return 
					}
				 
					////console.log("我undefined 报错了",values[0])
					let shi = Object.keys(s[values[0]]);
					////console.log(shi);
					//设置第一组
					picker.setSlotValues(1, shi);  
					let index = shi.indexOf(values[1]); 
					if(index <  0 ){
						return
					}

					////console.log("index",index)
					let xian = s[values[0]][shi[index]];
					////console.log(" s[values[0]]", s[values[0]])
 
					//设置第二组
	 				picker.setSlotValues(2, Object.keys(xian));	
	 				////console.log("22222222222222", picker.getValues() )

					this.xianObj = xian; 
				//	//console.log(xian)
					this.addressProvince =  picker.getValues()[0];
				    this.addressCity = picker.getValues()[1];
				    this.addressXian = picker.getValues()[2];
				    return false
		   })
		},
		onStreetChange(picker, values){
	      this.addressStreet = values[0]
	    },
	    onAddressChange2(picker2, values) {
				this.$nextTick(()=>{
					let sheng = Object.keys(s);  
					if(!values[0] ){
						 //处理 values为undefined 情况
						 // 通过mouted 钩子触发change事件 -- 每次change事件触发3次
						return 
					} 
					////console.log("我undefined 报错了",values[0])
					let shi = Object.keys(s[values[0]]);
					////console.log(shi);
					//设置第一组
					picker2.setSlotValues(1, shi);  
					let index = shi.indexOf(values[1]); 
					if(index <  0 ){
						return
					} 
					////console.log("index",index)
					let xian =s[values[0]][shi[index]];
					////console.log(" s[values[0]]", s[values[0]])
 
					//设置第二组
	 				picker2.setSlotValues(2, Object.keys(xian));	
	 				////console.log("22222222222222", picker.getValues() ) 
					this.xianObj2 = xian; 
				//	//console.log(xian)
					this.addressProvince2 =  picker2.getValues()[0];
				    this.addressCity2 = picker2.getValues()[1];
				    this.addressXian2 = picker2.getValues()[2]; 
		   })
		},
		onStreetChange2(picker, values){
      this.addressStreet2 = values[0]
    },
		openAd($event) {
			$event.preventDefault();
			// document.getElementsByTagName("html")[0].style.overflowY = "hidden";
			if (!this.status) {
				this.popupVisible = !this.popupVisible;
			}
	   	 	$event.stopPropagation()
	   	 
	  },
  	openAd2($event){
  		$event.preventDefault();
  	  // document.getElementsByTagName("html")[0].style.overflowY = "hidden";	
  	  if (!this.status) {
  	 		this.popupVisible2 = !this.popupVisible2;
  	  }
  	  $event.stopPropagation()
    },
    //确定1
    closeAd($event){
    	$event.preventDefault();
    	//关闭模态三级
    	// document.getElementsByTagName("html")[0].style.overflowY = "scroll"
	    this.popupVisible = !this.popupVisible;
	    $event.stopPropagation()
			this.province1 = this.addressProvince;
			this.city1 = this.addressCity;
	    this.area1 = this.addressXian;
    },
    cancelAd($event){
    	$event.preventDefault();
    	this.popupVisible = !this.popupVisible;
	    $event.stopPropagation();
	    this.addressProvince = this.province1;
	    this.addressCity = this.city1;
	    this.addressXian = this.area1;
    },
    closeAd2($event){
    	//关闭模态三级
    	$event.preventDefault();
    	// document.getElementsByTagName("html")[0].style.overflowY = "scroll"
    	this.popupVisible2 = !this.popupVisible2;
    	$event.stopPropagation()
    	this.province2 = this.addressProvince2;
			this.city2 = this.addressCity2;
	    this.area2 = this.addressXian2;
    },
    ...mapActions(
    	"comfirmOrder",["request_data_goCompany"] 
    ),
    cancelAd2($event){
    	$event.preventDefault();
    	this.popupVisible2 = !this.popupVisible2;
	    $event.stopPropagation();
	    this.addressProvince2 = this.province2;
	    this.addressCity2 = this.city2;
	    this.addressXian2 = this.area2;
    },
    //修改调用
    modify(val){
    	var taxpayerType = null;
    	if (this.companyName&&this.headerImage&&this.socialCreditCode) {
 				if (this.taxpayerType=="一般纳税人") {
 					taxpayerType = 0;
 				}else if(this.taxpayerType=="小规模纳税人"){
 					taxpayerType = 1;
 				}
 				var params = {
 					Id:val,
					SocialCreditCode:this.socialCreditCode,
					Name:this.companyName,
					BusinessLicensePic:this.headerImage,
					TaxpayersType:taxpayerType,
					BankName:this.bank,
					BankAccount:this.bankAccount,
					TaxIdAddressProvince:this.addressProvince,
					TaxIdAddressCity:this.addressCity,
					TaxIdAddressArea:this.addressXian,
					TaxIdAddress:this.invoiceAddress,
					CompanyAddressProvince:this.addressProvince2,
					CompanyAddressCity:this.addressCity2,
					CompanyAddressArea:this.addressXian2,
					CompanyAddress:this.companyAddress,
					legalRepresentative:this.legalRepresentative,
					establishmentDate:this.establishmentDate,
					enterpriseType:this.enterpriseType,
					Phone:this.phone,
					datatype:"json"
 				}
 				//console.log(params)
 				getd.cusCompanySave(params)
 				.then((res)=>{
 					//console.log(res)
 					// this.$router.go(0);
   					window.location.reload()
 					this.editor = "编辑";
 				})
 				.catch((error)=>{
 					Toast({
					  message: error.data.msg, 
					  duration: 2000
					});
 				})
 			}else{
 					Toast({
					  message: '信息还未完善', 
					  duration: 2000
					});
 			}
    },
 		//确定新增
 		increased(){
 			this.modify();
 		},
 		//小规模纳税人
 		sTaxpayer(){
 			this.taxpayerType = "小规模纳税人";
 		},
 		//一般纳税人
 		gTaxpayer(){
 			this.taxpayerType = "一般纳税人";
 		},
 		actionSheet(){
 			if(this.editor != "编辑"){
 				this.sheetVisible = true;
 			}
 		},
 		showAction(){
 			if(this.editor != "编辑"){
 				this.showBank =!this.showBank;
 				document.getElementById("noticeWrap").style.display = "none";
 				this.enterBtn = false;
 			}
 		},
 		//去编辑
 		goEdit(val){
 			if (val == "编辑") {
				 if(this.ReviewStatus==1){
					 Toast({
					  message: "公司已审核，不能编辑", 
					  duration: 2000
					});
					 return
				 }
 				this.isShow = true;
	 			this.status = false;
	 			this.editor = "完成";
	 			this.province1 = this.addressProvince;
				this.city1 = this.addressCity;
				this.area1 = this.addressXian;
				
				this.province2 = this.addressProvince2;
				this.city2 = this.addressCity2;
				this.area2 = this.addressXian2;
 			}else if (val == "完成") {
 				this.modify(this.companyId)
 			}
 		},
 		//web获取营业执照
			upload(){
				var self = this;
				// 选择的文件对象
				var file = null;
				var baseStr = null;
				var eleFile = document.querySelector('#upload');
				// 压缩图片需要的一些元素和对象
				var reader = new FileReader(), img = new Image();
				file = eleFile.files[0];
				if(!eleFile.files.length) return;
		    // 选择的文件是图片
		    if (file.type.indexOf("image") == 0) {
		        reader.readAsDataURL(file);    
		    }
				// 缩放图片需要的canvas
				var canvas = document.createElement('canvas');
				var context = canvas.getContext('2d');
				
				// base64地址图片加载完毕后
				img.onload = function () {
				    // 图片原始尺寸
				    var originWidth = this.width;
				    var originHeight = this.height;
				    // 最大尺寸限制
				    var maxWidth = 400, maxHeight = 400;
				    // 目标尺寸
				    var targetWidth = originWidth, targetHeight = originHeight;
				    // 图片尺寸超过400x400的限制
				    if (originWidth > maxWidth || originHeight > maxHeight) {
				        if (originWidth / originHeight > maxWidth / maxHeight) {
				            // 更宽，按照宽度限定尺寸
				            targetWidth = maxWidth;
				            targetHeight = Math.round(maxWidth * (originHeight / originWidth));
				        } else {
				            targetHeight = maxHeight;
				            targetWidth = Math.round(maxHeight * (originWidth / originHeight));
				        }
				    }
				        
				    // canvas对图片进行缩放
				    canvas.width = targetWidth;
				    canvas.height = targetHeight;
				    // 清除画布
				    context.clearRect(0, 0, targetWidth, targetHeight);
				    // 图片压缩
				    context.drawImage(img, 0, 0, targetWidth, targetHeight);
				    baseStr = canvas.toDataURL("image/png");//压缩后base64数据    
					};
					
					// 文件base64化，以便获知图片原始尺寸
					reader.onload = function(e) {
						//压缩前base64数据    
						var imgData = e.target.result;
						imgData = imgData.substring(imgData.indexOf(",")+1);
						
						
						axios({
						  	method: 'post',
						  	url: 'https://dm-58.data.aliyun.com/rest/160601/ocr/ocr_business_license.json',
						  	data: {
							  	"inputs": [
							    {
							      "image": {
							        "dataType": 50,
							        "dataValue": imgData
							      }
							    }
							  ]
							},
						  headers:{'Authorization':'APPCODE d941f350729443bfb8e1c6884d66dfab'},
						})
				  	.then(function (response) {
				  		//console.log(response)
					  	Indicator.close();
					    var obj = JSON.parse(response.data.outputs[0].outputValue.dataValue);
					    
					    //传给后台
					    
							var acv = new FormData();
							acv.append('file', file);
							acv.append('Token',self.getToken());
							acv.append('type', 'businessLicense');
							
							getd.upNetImage(acv)
							.then((res)=>{
								self.headerImage = res.data.storeResult.path;
								////console.log(res.data.storeResult.path,4545446)
							})
							.catch((error)=>{
								//console.log(error);
							})
					    
					    //判断是否识别出
					    if(obj.name&&(obj.name!="FailInRecognition")){
					    	self.companyName = obj.name;
					    }else{
					    	self.companyName = "";
					    }
					    if(obj.reg_num&&(obj.reg_num!="FailInRecognition")){
					    	self.socialCreditCode = obj.reg_num;
					    }else{
					    	self.socialCreditCode = "";
					    }
					    if(obj.person&&(obj.person!="FailInRecognition")){
					    	self.legalRepresentative = obj.person;
					    }else{
					    	self.legalRepresentative = "";
					    }
					    if(obj.establish_date&&(obj.establish_date!="FailInRecognition")){
					    	self.establishmentDate = obj.establish_date.substring(0,4)+"-"+obj.establish_date.substring(4,6)+"-"+obj.establish_date.substring(6);
					    }else{
					    	self.establishmentDate = "";
					    }
					    if(obj.address&&(obj.address!="FailInRecognition")){
					    	self.companyAddress = obj.address;
					    }else{
					    	self.companyAddress = "";
					    }
				  	})
				  	.catch(function (error) {
					    //console.log(error);
					    self.headerImage = "";
					    self.companyName = "";
					    self.socialCreditCode = "";
					    self.companyAddress = "";
					    alert("请重新上传清晰图像");
						});
						//调用上面的img.load
					  img.src = e.target.result;
					};
				},
			
       //上传营业执照
	 	toChoose(){
	 			if(ua.match(/wqbol/i)=="wqbol"&&this.isShow){
	 				this.showActionSheet();
	 			}
	 	},
	 	//点击事件，弹出选择摄像头和相册的选项
		showActionSheet() {  
			 	var self = this;
				var bts = [{    
				    title: "拍照"    
				}, {    
				    title: "从相册选择"    
				}];    
				plus.nativeUI.actionSheet({    
			        cancel: "取消",    
			        buttons: bts    
			    },    
			    function(e) {    
				    if (e.index == 1) {    
				        //检测相机权限
								var pp = plus.navigator.checkPermission('CAMERA');
								switch(pp){
									case 'authorized':
										self.getImage();
									break;
									case 'notdeny':
										self.getImage();
									break;
									case 'denied':
										//用户禁止了相机权限
	      								self.isShowMessageBox = true;
									break;
									case 'undetermined':
										self.getImage();
									break;
									case 'unknown':
										plus.nativeUI.alert('无法查询相机权限');
									break;
									default:
										plus.nativeUI.alert('不支持相机权限');
									break;
								}
				    } else if (e.index == 2) {    
				        self.galleryImgs();    
				    }    
			    });    
		},
		//拍照
		getImage(){
				// 获取设备默认的摄像头对象 
				var self = this;
				var cmr = plus.camera.getCamera(1);
				cmr.captureImage(
					function(capturedFile) {
						//通过URL参数获取目录对象或文件对象
						plus.io.resolveLocalFileSystemURL(capturedFile, function(entry) {    
				           
				           var task = plus.uploader.createUpload( "https://api.wqbol.com/Upload/Save", {}, function ( t, status ) {
											// 上传完成
											if ( status == 200 ) {
												//console.log( "Upload success: " + JSON.stringify(t) );
												self.headerImage = JSON.parse(t.responseText).data.storeResult.path;
											} else {
												//console.log( "Upload failed: " + status );
											}
										});
										task.addFile( entry.toLocalURL(), {key:"testdoc"} );
										task.addData( "type", "businessLicense" );
										task.addData( "file", entry.toLocalURL() );
										task.addData( "Token", self.getToken());
										task.start();
										
										self.compressImage(entry.toLocalURL(),entry.name);
				       	}, function(e) {    
				           plus.nativeUI.toast("读取拍照文件错误：" + e.message);    
				       	});
					},
					function(error) {
						//console.log('拍照失败'+error.code+error.message)
					},
					{    
				       	filter: 'image'   
				   	}
				)
		},
		//压缩图片    
		compressImage(url,filename){    
		   		var self = this;
			   	var name="_doc/upload/"+filename;  
			   	plus.zip.compressImage({    
			           src:url,//src: (String 类型 )压缩转换原始图片的路径    
			           dst:name,//压缩转换目标图片的路径    
			           quality:40,//quality: (Number 类型 )压缩图片的质量.取值范围为1-100    
			           overwrite:true//overwrite: (Boolean 类型 )覆盖生成新文件    
			   	},    
			   	function(zip) {  
			       //页面显示图片  
			       self.showPics(zip.target,name);  
			   	},function(error) {    
			       	plus.nativeUI.toast("压缩图片失败，请稍候再试");    
			   	});    
		},
	    //显示图片
		showPics(url,name){
		 	var self = this;
			//根据路径读取到文件   
	   		plus.io.resolveLocalFileSystemURL(url,function(entry){  
	   			entry.file( function(file){  
	       			var fileReader = new plus.io.FileReader();  
	       			fileReader.readAsDataURL(file);
					fileReader.onloadend = function(e) {
						var img = e.target.result.toString();
						var picUrl = e.target.result.toString();
						picUrl = picUrl.substring(picUrl.indexOf(",")+1);
						axios({
						  	method: 'post',
						  	url: 'https://dm-58.data.aliyun.com/rest/160601/ocr/ocr_business_license.json',
						  	data: {
							  	"inputs": [
							    {
							      "image": {
							        "dataType": 50,
							        "dataValue": picUrl
							      }
							    }
							  ]
							},
						  headers:{'Authorization':'APPCODE d941f350729443bfb8e1c6884d66dfab'},
						})
					  	.then(function (response) {
						  	Indicator.close();
						    var obj = JSON.parse(response.data.outputs[0].outputValue.dataValue);
						    //判断是否识别出
						    if(obj.name&&(obj.name!="FailInRecognition")){
						    	self.companyName = obj.name;
						    }else{
						    	self.companyName = "";
						    }
						    if(obj.reg_num&&(obj.reg_num!="FailInRecognition")){
						    	self.socialCreditCode = obj.reg_num;
						    }else{
						    	self.socialCreditCode = "";
						    }
						    if(obj.person&&(obj.person!="FailInRecognition")){
						    	self.legalRepresentative = obj.person;
						    }else{
						    	self.legalRepresentative = "";
						    }
						    if(obj.establish_date&&(obj.establish_date!="FailInRecognition")){
						    	self.establishmentDate = obj.establish_date.substring(0,4)+"-"+obj.establish_date.substring(4,6)+"-"+obj.establish_date.substring(6);
						    }else{
						    	self.establishmentDate = "";
						    }
						    if(obj.address&&(obj.address!="FailInRecognition")){
						    	self.companyAddress = obj.address;
						    }else{
						    	self.companyAddress = "";
						    }
						})
					  	.catch(function (error) {
						    //console.log(error);
						    self.headerImage = "";
						    self.companyName = "";
						    self.socialCreditCode = "";
						    self.companyAddress = "";
						    alert("请重新上传清晰图像");
						});
					}
				});	
			});
		},
		//从相册选择照片  
	   	galleryImgs() {   
	   	 	var self = this;
		    plus.gallery.pick(function(e) {    
		    	var task = plus.uploader.createUpload( "https://api.wqbol.com/Upload/Save", {}, function ( t, status ) {
						// 上传完成
						if ( status == 200 ) {
							//console.log(self.getToken(),"token")
							//console.log( "Upload success: " + JSON.stringify(t) );
							self.headerImage = JSON.parse(t.responseText).data.storeResult.path;
						} else {
							//console.log( "Upload failed: " + status );
						}
					});
					task.addFile( e, {key:"testdoc"} );
					task.addData( "type", "businessLicense" );
					task.addData( "file", e );
					task.addData( "Token", self.getToken());
					task.start();
		        var name = e.substr(e.lastIndexOf('/') + 1);  
		       	self.compressImage(e,name);  
		    }, function(e) {    
		    }, {    
		        filter: "image"    
		    });    
	    },
	    goMap(){
	    	//console.log("地图");
	    	this.$router.replace({'name':'mapAdd',params:{'add':this.companyAddress}})
	    },
	    //扫一扫弹窗组件
	    toClose(){
	    	this.isShowMessageBox = false;
	    }
	},
	watch: {
   // 'addressXian': {
    	//改变街道
      // handler(val, oval){
      //   let street = this.xianObj[this.addressXian]
      //   this.streetSlots[0].values = street
      // }
   // }
  },
 
	computed:{
		srollHeight(){
			var heightObj = window.screen.height || document.documentElement.clientHeight;
			var obj  = {height:(heightObj - 44 -12)  +"px" , background:"#fff" };
			return obj;
		},
		...mapState( 
			"comfirmOrder",["payMethods","currentIndex"] 
		 ),
  
	},
	created(){
		getd.REQUEST_COMPANYDATA_GOCOMPANY()
		.then((res)=>{
			this.companyList = res.data;
			res.data.forEach((val)=>{
				this.comId.push(val.Id);
				var params = {
					id:val.Id
				}
				getd.getCompanyOrderList(params)
				.then((item)=>{
					this.comLength.push(item.data.list.length);
				})
			})
		})
		.catch((error)=>{
			//console.log(error)
		})
	},
}
 

</script>

<style lang="less" type="stylesheet/css" scoped>
	@import "../../common/index.less";
	#goCompany1{
     height: 100%;
}
 #goCompany{
     height: 100%;
     padding-top:0;
    /*/
     / height: 22.43243243243243rem;
     */
     background: #EFEFF4;
}
 #companyDetailWrap{
     height: 100%;
	 padding:0.1px;
}
 .popularity_return {
     z-index: 3;
     height: 1.1891891891891893rem;
     width: 100%;
     text-align: center;
     line-height: 1.162162162162162rem;
     font-size: 0.4864864864864865rem;
     color: #1F1F1F;
     border-bottom: 1px solid #EBE5E1;
     background-color: #fff;
}
 .return{
     position: absolute;
     height: 1.0810810810810811rem;
     width: 0.6486486486486487rem;
     top:0;
     left:0.40540540540540543rem;
     .bg-image('../../assets/images/tabBar/nav_back');
     background-size: 100%;
     background-position:0rem 0.24324324324324326rem;
}
 .pAdd{
     font-size: 0.3783783783783784rem;
     position: absolute;
     right: 0.40540540540540543rem;
     .themeC;
}
 //选择公司 
 .companyWrap{
     margin-top: 0.266667rem;
     background: #fff;
     li{
         position:relative;
         height:1.3783783783783783rem ;
         line-height: 1.3513513513513513rem;
         .border-1pxB(#EBE5E1);
		 padding:0 0.35135135135135137rem;
		 font-size: 0.3783783783783784rem; 
         .spanIndex{
             display: inline-block;
             .textIndex1(8.108108108108109rem);
        }
    }
     .cIcon{
         position: absolute;
         right: 0.32432432432432434rem;
         top:0.5405405405405406rem;
         .bg-image('../../assets/images/comfirm-order/rightS');
         background-size: 0.43243243243243246rem 0.32432432432432434rem;
         width: 0.6216216216216216rem;
         height: 0.6216216216216216rem;
    }
}
 //新增公司 
 #addCompanyWrap{
     position: absolute;
     top:0;
     left:0;
     width: 100%;
     height: 100%;
     .companyUl{
         padding:0.1px;
         li:nth-last-child(2) , li:nth-last-child(3){
             margin-top: 0.32432432432432434rem;
        }
         li.ad{
             height: 2.7027027027027026rem;
             overflow: hidden;
             padding:0 0 0 0.32432432432432434rem;
             >div:nth-child(1){
                 float:left;
                 height: 100%;
                 width:2.4324324324324325rem;
                 margin-right: 0.7027027027027027rem;
            }
             >div:nth-child(2){
                 display: flex;
                 .border-1pxB(#8C8C8C);
                 span{
                     display: inline-flex;
                     flex:1 1 2.1621621621621623rem;
                     text-align: center;
                     &:nth-child(1){
                         text-align: left;
                         flex:1 1 1.7567567567567568rem;
                    }
                     >strong{
                         display: block;
                         width: 100%;
                         white-space: nowrap;
                         text-overflow: ellipsis;
                    }
                }
            }
             div.other{
                 float:left;
                 width: 5.405405405405405rem;
            }
        }
         .cIcon{
             position: absolute;
             top:0.35135135135135137rem;
             right: 0.10810810810810811rem;
             .bg-image('../../assets/images/tabBar/right_arrow');
             background-size: 0.21621621621621623rem 0.3783783783783784rem;
             background-position: right center;
             width: 0.6216216216216216rem;
             height: 0.6216216216216216rem;
        }
    }
}
 //三级联动 
 .liandongWrap{
     position: fixed;
     z-index: 88;
     top: 0;
     left: 0;
     width:100%;
     height: 100%;
     background: rgba(0, 0, 0, 0.39);
     .liandong{
         position: absolute;
         bottom:0;
         left:0;
         width:100%;
         height: 4.108108108108108rem;
         background: #fff;
    }
     .choiceWrap{
         display: flex;
         background: #EDEDED;
         height: 1.1891891891891893rem;
         line-height: 1.1891891891891893rem;
         p{
             display: inline-flex;
             flex:1 1 50%;
             span{
                 .c(#30A1F8);
                 display: block;
                 font-size: 0.43243243243243246rem;
                 width: 100%;
            }
        }
         p:first-child{
             span{
                 text-align: left;
                 padding-left:0.43243243243243246rem;
            }
        }
         p:last-child{
             span{
                 text-align: right;
                 padding-right:0.43243243243243246rem;
            }
        }
    }
}
 //三级联动 END
  .mint-popup{
     top:auto;
     bottom:0;
     width: 100%;
}
 .generalWtap{
     width: 100%;
     background:#efeff4;
     margin-top: 0.266667rem;
}
 .general .items{
     >span{
         margin-right:0rem;
    }
}
 .items:nth-child(2) div,.items:nth-child(3) div,.items:nth-child(4) div,.items:nth-child(5) div,.items:nth-child(6) div,.items:nth-child(9) div{
     padding-left:0.7567567567567568rem;
     float: right;
}
 .items:nth-child(1) .upload input{
     width: 3.2432432432432434rem;
}
 .items.selected{
     padding-left: 0.13513513513513514rem;
}
 .items{
     background-color: #fff;
     line-height: 1.3513513513513513rem;
     height:1.3783783783783783rem;
	 padding:0 0.3783783783783784rem 0 0.32432432432432434rem;
	 font-size: 0.3783783783783784rem; 
     .border-1pxB(#EBE5E1);
     >span{
         float: left;
         width: 31%;
         height: 1.0810810810810811rem;
         font-size: 0.40540540540540543rem;
    }
     >div{
         height: 1.0810810810810811rem;
        /*color:#888;
         */
         line-height: 1.3513513513513513rem;
         text-align: right;
    }
     >div.active{
         text-align: left;
         height:1.3513513513513513rem;
         line-height: 1.3513513513513513rem;
         padding-left: 0;
         float: left;
    }
     .company{
         overflow: hidden;
         white-space: nowrap;
         text-overflow: ellipsis;
         width: 64%;
    }
     >input{
         float: left;
         height: 1.3513513513513513rem;
         // color: black;
         width: 66%;
    }
     .gIcon{
         float:right;
         margin-top:0.40540540540540543rem;
         .bg-image('../../assets/images/comfirm-order/more');
         background-size: 0.6216216216216216rem 0.6216216216216216rem;
         width: 0.6216216216216216rem;
         height: 0.6216216216216216rem;
    }
}
 .noticeWrap{
	 font-size:0.32rem;
     padding:0.24324324324324326rem 0.32432432432432434rem 0rem;
     .c(#FF6767);
     line-height: 0.4594594594594595rem;
     padding: 0.24324324324324326rem 0.32432432432432434rem 0rem;
     height: 2.324324324324324rem;
     background: #efeff4;
}
 .inProcess{
     width: 100%;
    /*height: 2.4864864864864864rem;
     */
     padding: 0.32432432432432434rem;
     background: #FFF;
}
 .inProcess span{
     display: block;
     text-align: center;
     color: #000;
     .fs15;
}
 .inProcess ul{
     background: #fff;
     overflow: hidden;
     width: 100%;
}
 .inProcess ul li {
     display: block;
     float: left;
     margin: 0.32432432432432434rem 0.2702702702702703rem 0 0;
     padding: 0.16216216216216217rem 0.2702702702702703rem;
     border: 1px solid #30A1F8;
     border-radius: 0.08108108108108109rem;
     font-size: 0.32432432432432434rem;
}
 .orderBtn{
     background: #fff;
     font-size: 0.43243243243243246rem;
     padding: 0.2702702702702703rem 0;
     span{
         display: inline-block;
         width:90%;
         height: 1.135135135135135rem;
         line-height: 1.135135135135135rem;
         text-align: center;
         .c(#fff);
         background: linear-gradient(to right, #ff7600, #fd6701, #FA5102);
         margin: 0 auto ;
         display: block;
    }
}
 //选择银行 
 #bankDetailWrap{
     position: absolute;
     z-index:3;
     top:0;
     left: 0;
     width: 100%;
     height: 100%;
     background: #EFEFF4;
}
 .mainWrap{
    //  margin-top: 1.5135135135135136rem;
}
 //修改上传样式 
 .upload{
     height: 1.162162162162162rem;
     width: 66%;
     float: right;
     margin-top: 0.21621621621621623rem;
     -webkit-tap-highlight-color:rgba(0,0,0,0);
}
 #upload{
    /*width: 5.405405405405405rem;
     */
     height: 1.4054054054054055rem;
     margin: -0.2702702702702703rem -0.2702702702702703rem;
}
 .items .upload input{
     width: 4.891891891891892rem;
     height: 0.6216216216216216rem;
     float: right;
     margin-top: 0.21621621621621623rem;
     opacity: 0;
     filter: alpha(opacity=0);
}
 .picture {
     width: 1.2432432432432432rem;
     height: 0.972972972972973rem;
     overflow: hidden;
     background-position: center center;
     background-repeat: no-repeat;
     background-size: cover;
}
 input[type="text"]:disabled{
     background-color: #fff;
}
 .company_amount {
     border-radius: 0.2972972972972973rem;
     text-align: center;
     line-height: 0.5405405405405406rem;
     color:#000;
     position: absolute;
     right: 0.32432432432432434rem;
     top: 0.43243243243243246rem;
     z-index: 9;
     float: right;
     height: 0.5405405405405406rem;
     width: 0.8108108108108109rem;
     background-color: #30A1F8;
     color: #FFF;
     .fs15;
}
 .goCompanyNull{
     height: 100%;
     overflow: hidden;
     width: 100%;
     background: #FFF;
     .bg-image('../../assets/images/mine/nullCart');
     background-size: 60%;
     background-position: center 20%;
}
 .goCompanyNull span{
     margin-top: 85%;
     text-align: center;
     width: 100%;
     display: block;
     float: LEFT;
}
 #goCompany1 /deep/ .mint-actionsheet{
     position: fixed;
     background: none;
     width: 95%;
     text-align: center;
     bottom: 0.16216216216216217rem;
     left: 50%;
}
 //iphone5 兼容问题
  @media screen and (max-width:8.64864864864865rem){
     .items > input{
         width: 5.135135135135135rem;
    }
     .upload{
         width: 5.405405405405405rem;
    }
     #addCompanyWrap .companyUl li.ad > div:nth-child(1){
         margin-right: 0;
    }
}
.addressAB{
	.textIndex1(67%);
}
 
</style>
