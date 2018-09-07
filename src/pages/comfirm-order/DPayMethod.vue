<template>
  <div id="paymethod">
	 <!-- 遮罩层 -->
	<div class="model" v-if="modelS"></div> 
  	<headerTitle  :title="title" :source="source"  @showProps="showPropsFn"></headerTitle>
	<div class="payMoney">
		<span>
			应付金额
		</span>
		<!-- <span class="num">
			￥2345. <i>00</i>
		</span> -->
		<span  class="num">
           ￥{{this.$route.query.actPrice | formatPrice}}<b>{{this.$route.query.actPrice | formatPriceX}}</b>
		</span>
	</div>
	<div class="discountsB" v-if="DFCoin.isUsed"> 
           <span>可用{{DFCoin.Coin}}记账币抵扣{{DFCoin.RMB}}元<img @click="ruleB_Show" height="0.5135135135135135rem " width="0.5135135135135135rem " src="../../assets/images/daiFu/explain@2x.png" alt=""></span>
           <span><mt-switch v-model="value" @change="coinChange"></mt-switch></span> 
    </div>
	<div class="wqb_pay">
		<div class="one_d">
			<p>
				<span class="span_b">
					<img src="../../assets/images/daiFu/wqbF@2x.png" height="0.4594594594594595rem " width="0.4594594594594595rem " alt="">
					<span class="one">微企宝支付</span>
					<span class="tow">微企宝旗下官方支付，安全快捷</span>
				</span>
			</p>
		</div>
		<div class="tow_d">
			<span class="img_span">
				<img src="../../assets/images/daiFu/wallet@2x.png" height="0.6756756756756757rem " width="0.6756756756756757rem " alt="">
				<span>
					<span class="balance_title">钱包余额</span>
					<span class="no_balance" v-if="BalanceUnuse&&balanceE">可用余额不足</span>
				</span>
			</span>
			<span class="span_num">
				<span v-if="!BalanceUnuse">可用余额</span>
				<!-- <span>￥3600. <i>00</i></span> -->
				<span v-if="!BalanceUnuse">
				￥{{AccountBalance | formatPrice}}<b>{{AccountBalance | formatPriceX}}</b>
				</span>
				<i :class="{uncheck_y:!balanceCheck,check_y:balanceCheck,BalanceUnuse:BalanceUnuse}" @click="balancePay(this,$event)" ref="balanceDom"></i>
			</span>
				
		</div>
	</div>
  	<div class="mainWrap">
  		<div><i class="icon"></i>其它支付方式<i></i></div>
  		<ul> 
  			<li @click="chooseMethods(items,index)"   v-for="(items,index) in methodsArr" :key="index" v-show="!(items == '支付宝'&&isWx)">
  				<i class="icon"></i>{{items}} <span v-if="items == '余额'">:¥{{_balanceMoney}}</span><i ref="liDom" :class="{check:index===check,uncheck:!(index===check)}"></i>	 
  			</li> 
  		</ul>
  	</div>
	  <div class="confirmB" @click="comfirmM">
		  <span>使用{{method}}支付￥{{totalPrice | formatPrice}}<b>{{totalPrice | formatPriceX}}</b></span> 
	  </div>
	  <!-- 支付成功弹窗 -->
	  <!-- <div class="successModel" v-if="successShow">
		  <div class="img_div">
			  <img src="../../assets/images/daiFu/payS@2x.png" height="1.2162162162162162rem " width="1.2162162162162162rem " alt="">
		  </div>
		  <p>支付成功，查看我的订单</p>
		  <div class="button_box">
			  <span @click="goOrder">查看订单</span>
			  <span @click="goHome">回首页</span>
		  </div>
	  </div> -->
	  <!-- 完善信息弹窗 -->
    <div class="sortWrap" v-if="successShow" @touchmove.stop.prevent>
      <div class="windowWrap" id="windowWrap">
        <div class="windowHeader">
          <div>支付成功！</div>
          <div>为了更好的为您提供服务，请完善公司信息</div>
        </div>
        <div class="contentWrap">
          <div class="companyNameWrap">
            <div>公司名称</div>
            <!-- <div>{{isSelected}}<span :class="selectCompany ? 'addCompany' : 'deleteCompany'" @click="selectC"></span></div> -->
            <input type="text" placeholder="请输入公司名称" v-model="isSelected" @blur="checkName" @focus.stop.prevent="focusName">
            <span :class="selectCompany ? 'addCompany' : 'deleteCompany'" @click="selectC"></span>
            <!-- 隐藏下拉框 -->
            <div class="hiddenWrap" v-if="!selectCompany">
              <div class="hiddenCompany" v-for="(item,index) in companyListArr" :key="index" @click="filingCompany(item)">{{item.CompanyName}}</div>
            </div>
          </div>
          <div class="personWrap">
            <div>联系人</div>
            <input type="text" placeholder="请输入联系人" v-model="person" @blur="checkPerson">
          </div>
          <div class="telWrap">
            <div>联系电话</div>
            <input type="text" placeholder="请输入联系电话" v-model="personTel" @blur="checkTel">
          </div>
          <div class="sureBthWrap">
            <div class="sureBth" @click="submitInfo">完善资料</div>
          </div>
        </div>
      </div>
    </div>
	  <!-- 支付失败弹窗 -->
	  <div class="successModel" v-if="lost">
		  <div class="img_div">
			  <img src="../../assets/images/daiFu/payL@2x.png" height="1.2162162162162162rem " width="1.2162162162162162rem " alt="">
		  </div>
		  <p>糟糕，支付失败!</p>
		  <div class="button_box">
			  <span @click="payAgain">重新支付</span>
		  </div>
	  </div>
	  <!-- 记账币规则弹窗 -->
    <div class="accountB_M" v-if="ruleB">
      <h3>记账币使用规则</h3>
      <img @click="ruleB_hide" src="../../assets/images/comfirm-order/x@2x.png" width="0.24324324324324326rem " height="0.24324324324324326rem " alt="">
      <!-- <p v-html="ACCOUNTBI_RELUSE_DATA">{{ACCOUNTBI_RELUSE_DATA}}</p> -->
	  <p>1、记账币仅限购买“智能云记账”产品，不可用于购买其他产品</p>
      <p>2、记账币也可用于帮他人代付“智能云记账”产品</p>
      <span class="know" @click="ruleB_hide">我知道了</span>
    </div>
  </div>
</template>

<script>

import headerTitle from '../components/header-title';
import { mapState,mapActions,mapGetters} from 'vuex';
import tool from '../../util/tool.js'
import getData from "../../vuex/getData"
export default {
	data(){
		return {
			source:{
				'name':'选择支付方式',
				'flag':this.$route.query.isOwn  //返回做标记，如果是自己付就返回订单，代付返回上一页
			},
			title:'选择支付方式',
			methodsArr:["微信","支付宝","银联"], 
			check:'-99',
			index:'',   //下标
			Code:'',//支付编码 用来排除云记账 和 充值服务
			successShow:false, //成功弹窗
			modelS:false, //模态框显示隐藏
			lost:false,  //失败弹窗
			ruleB:false,  //记账币规则弹窗
			value:'', //记账币开关
			balanceCheck:false,  //钱包余额是否选中
			BalanceUnuse:false,  //者余额不可用变灰
			balanceE:false, //余额不足
			payM:'',  //最终付款方式
			blancePrice:'',  //余额计算应付金额
			totalPrice:'',   //最后应付金额
			method:'',  //支付方式
			isWx:tool.is_weixn(),
			selectCompany:true,
			isSelected:"",
			customerId:"",
			companyListArr:[],
			personTel:'',
			person:"",
		}
	},
	components:{
	   headerTitle,
	},
	computed:{
		...mapState(
			"comfirmOrder", ["pay",'AccountBalance','IsisBalacne','coin','payS','DFCoin']
		),
		...mapState(
			"mine_index",{
				ACCOUNTBI_RELUSE_DATA: "ACCOUNTBI_RELUSE", //记账币规则
			}
		) ,
		...mapGetters(
			"comfirmOrder", ["_balanceMoney"]
		),
		isBalanceEnough(){ //余额是否足够支付
			if(this.value){
				if(this.value - this.$route.query.actPrice >=0){
					return this.BalanceUnuse = true 
				}else{
					return this.blancePrice = this.AccountBalance + this.DFCoin.RMB - this.$route.query.actPrice
				}
			}else{
				return this.blancePrice = this.AccountBalance - this.$route.query.actPrice
			}
		},
	},
	methods:{
		...mapActions(
        "comfirmOrder",{
         	"payMethods_comfirmorder":"payMethods_comfirmorder",
         	"getBalance_comfirmorder":"getBalance_comfirmorder",
			 "getCoinByOrderNum":"getCoinByOrderNum",
			 "balanceAndCoin":"balanceAndCoin" //余额支付及记账币完全支付
        }
		),
		...mapActions(
			"mine_index",{
				"ACCOUNTBI_RELUSE":"ACCOUNTBI_RELUSE" //记账币规则
			}
		),
		showPropsFn(childProps){
			//传值给父组件 的一个过渡
			//comfirm-order已经定义了
			 this.$emit("showProps",childProps );
		},
		//记账币开关切换
		coinChange(){
			if(this.value){
				this.balanceE = false;
				if(this.DFCoin.RMB - this.$route.query.actPrice >=0){
					// console.log('进了记账币1111')
					this.method = '记账币';
					this.BalanceUnuse = true;
					var liArr = this.$refs.liDom
					for(var i=0;i<liArr.length;i++){
						liArr[i].setAttribute('class',"uncheck")
					}
					this.totalNum();
				}else{
					if(!this.IsisBalacne || this.isBalanceEnough < 0){ //余额不可用选择圈圈制灰
						this.BalanceUnuse = true;
						// this.check = 0; //余额不够用且不可用，默认选中微信
						// console.log('进来微信')
						this.method = '微信'
						var liArr = this.$refs.liDom
						for(var i=0;i<liArr.length;i++){
							liArr[0].setAttribute('class',"check")
						}
						this.totalNum();
					}else{
						// console.log('进了余额')
						this.BalanceUnuse = false;
						this.balanceCheck = true;
						this.method = '余额';
						this.check = false;
						this.totalNum();
					}
				}
			}else{
				if(!this.IsisBalacne || this.isBalanceEnough < 0){ //余额不可用选择圈圈制灰
						this.balanceE = true;
						// console.log('进了微信22222')
						this.BalanceUnuse = true;
						// this.check = 0; //余额不够用且不可用，默认选中微信
						this.method = '微信'
						var liArr = this.$refs.liDom
						for(var i=0;i<liArr.length;i++){
							console.log('来了吗')
							liArr[0].setAttribute('class',"check")
						}
						this.totalNum();
					}else{
						// console.log('进了余额222222')
						this.BalanceUnuse = false;
						this.balanceCheck = true;
						this.method = '余额';
						this.check = false;
						this.totalNum();
					}
			}
		},
		//点击其它支付方式
		chooseMethods(items,index){
			if(this.value&&this.DFCoin.RMB-this.$route.query.actPrice>=0){
				return;
			}
			if(this.$refs.balanceDom.hasAttributes('check_y')){
				this.balanceCheck = false;
				//改变选中状态
				var liArr = this.$refs.liDom
				if(index==0){
					for(var i=0;i<liArr.length;i++){
						liArr[0].setAttribute('class',"check")
					}
				}else{
					for(var i=0;i<liArr.length;i++){
						liArr[0].setAttribute('class',"uncheck")
					}
				}
				this.check = index;
				//console.log('改变下包',index,items)
				this.method = items; 
				//本地保存用户支付方式  
				this.commonTool.saveToLocal("_SETBILL","paymethod","payObj",items);
				// this.$router.go("-1"); 
				this.totalNum()
			}
		},
		totalNum(){ 
			if(this.DFCoin.isUsed && this.value){ //记账币可用并使用记账币
				if(this.DFCoin.RMB >= this.$route.query.actPrice){
					//如果可用记账币且记账币可一次性抵扣
					this.method = '记账币'
					this.totalPrice = this.$route.query.actPrice
				}else{ //如果可用记账币但记账币不够
					if(this.balanceCheck){
						this.totalPrice = this.$route.query.actPrice - this.DFCoin.RMB
						this.balanceE = false;
					}else{
						this.balanceE = true;
						if(this.value){
							this.totalPrice = this.$route.query.actPrice - this.DFCoin.RMB
						}else{
							this.totalPrice = this.$route.query.actPrice 
						}
					}
				}
			}else{
				if(this.balanceCheck){
					this.balanceE = false;
					this.totalPrice = this.$route.query.actPrice
				}else{
					this.totalPrice = this.$route.query.actPrice
					this.balanceE = true;
				}
			}
		},
		//点击确认付款
		comfirmM(){
			// console.log('动词哦草难度会',tool.loadFromLocal('login_user_id',"login_user_id","login_user_id",false))
			var _cid = tool.loadFromLocal('login_user_id',"login_user_id","login_user_id",false)
			if(_cid){
				if(_cid.Token){
					var cid = _cid.Id?_cid.Id:'';
				}
			}
			if(this.method == '余额'){
				if(this.value){ //余额和记账币一起付
					var params = {
						"orderNo":this.$route.query.orderNum,
						"bookkeepCurrency":this.DFCoin.RMB,
						"cid":cid
					}
				}else{ //纯余额付
					var params = {
						"orderNo":this.$route.query.orderNum,
						"cid":cid
					}
				}
				this.balanceAndCoin(params).then(res=>{
					if(this.payS){
						this.successShow = true;
						// this.modelS = true;
					}
				},err=>{
					this.lost = true;
					this.modelS = true;
				})
			}else if(this.method == "微信"){
					tool.removeLocal("_CART");
                    tool.removeLocal("_SETBILL");
					//跳转微信页面
					if(this.value){ //记账币和微信
						if(tool.is_weixn()){
							window.location.href = `https://api.wqbol.com/Payment/ProductsJson?out_trade_no=${this.$route.query.orderNum.toString()}&actPrice=${this.$route.query.actPrice}&bookkeepCurrency=${this.DFCoin.RMB}&flag=${this.$route.query.flag}&cid=${cid}`
						}else{
							this.$router.push({"name":"wxpay","query":{"out_trade_no":this.$route.query.orderNum.toString(),"bookkeepCurrency ":this.DFCoin.RMB,
							"actPrice": this.$route.query.actPrice,
							"flag":this.$route.query.flag,"cid":cid
							}})
						}
					}else{ //纯微信
						if(tool.is_weixn()){
							 window.location.href = `https://api.wqbol.com/Payment/ProductsJson?out_trade_no=${this.$route.query.orderNum.toString()}&actPrice=${this.$route.query.actPrice}&flag=${this.$route.query.flag}&cid=${cid}`
						}else{
							this.$router.push({"name":"wxpay","query":{"out_trade_no":this.$route.query.orderNum.toString(),
							"actPrice": this.$route.query.actPrice,
							"flag":this.$route.query.flag,"cid":cid}})
						}
					}
			}else if(this.method =="支付宝"){  
                    //清空本地数据
                    tool.removeLocal("_CART");
                    tool.removeLocal("_SETBILL");
					//跳转支付宝页面
					if(this.value){ //记账币和支付宝
						this.$router.push({"name":"alipay","query":{"out_trade_no":this.$route.query.orderNum.toString(),"bookkeepCurrency ":this.DFCoin.RMB,
						 "actPrice": this.$route.query.actPrice,
						 "flag":this.$route.query.flag,"cid":cid}})
					}else{ //纯支付宝
						this.$router.push({"name":"alipay","query":{"out_trade_no":this.$route.query.orderNum.toString(),
						 "actPrice": this.$route.query.actPrice,
						 "flag":this.$route.query.flag,"cid":cid}})  
					}
			} 
			else if(this.method == '银联'){
                    tool.removeLocal("_CART");
                    tool.removeLocal("_SETBILL");
					 //跳转银联页面
					if(this.value){ //记账币和银联一起
						this.$router.push({"name":"ylPay","query":{"out_trade_no":this.$route.query.orderNum.toString(),"bookkeepCurrency ":this.DFCoin.RMB,
						"actPrice": this.$route.query.actPrice,
						"flag":this.$route.query.flag,"cid":cid}})
					}else{  //纯银联
						this.$router.push({"name":"ylPay","query":{"out_trade_no":this.$route.query.orderNum.toString(),
						 "actPrice": this.$route.query.actPrice,
						 "flag":this.$route.query.flag,"cid":cid}})  
					}
			}
			else if(this.method == '记账币'){
				var params = {
					"orderNo":this.$route.query.orderNum,
					"bookkeepCurrency":this.DFCoin.RMB,
					"cid":cid
				}
				this.balanceAndCoin(params).then(res=>{
					if(this.payS){
						this.successShow = true;
						// this.modelS = true;
					}
				},err=>{
					this.lost = true;
					this.modelS = true;
				})
			}
		},
		//跳查看订单页
		// goOrder(){
		// 	this.modelS = false;
		// 	this.successShow = false;
		// 	this.$router.push('/mine/toMyOrder')
		// },
		//返回首页
		// goHome(){
		// 	this.modelS = false;
		// 	this.successShow = false;
		// 	this.$router.push('/')
		// },
		//重新支付
		payAgain(){
			this.lost = false;
			this.modelS = false;
			window.location.reload();
		},
		//记账币弹框显示
		ruleB_Show(){
		this.ruleB = true;
		this.modelS = true;
		},
		ruleB_hide(){
		this.ruleB = false;
		this.modelS = false;
		},
		//点击钱包余额
		balancePay(a,that){
			if(that.target.className=='BalanceUnuse'){
				return;
			}else if(that.target.className=='uncheck_y'){
				this.balanceCheck = true;
				this.check = false;
				if(this.balanceCheck){
					this.method = '余额'
				}
				//支付状态保存到本地
				if(this.balanceCheck){
					this.commonTool.saveToLocal("_SETBILL","paymethod","payObj","余额支付");
				}
			}else if(that.target.className=='check_y'){
				this.balanceCheck = false;
				this.check = 0;
				this.method = '微信支付'
			}
			this.totalNum();
		},
		focusName(){
        // console.log("99999",document.documentElement.scrollTop,document.documentElement.clientHeight,document.getElementById("windowWrap").offsetTop)
        // if(tool.is_android){
            window.onresize = () => {
                // alert(document.getElementById("windowWrap").offsetTop)
                if(document.getElementById("windowWrap").offsetTop < 16){
                  document.getElementById("windowWrap").style.bottom = "0px";
                }else{
                  document.getElementById("windowWrap").style.bottom = "10%";
                }
            }
        // }
        
    	},
		checkName(){
			let status = tool.regularJudgement("companyAddress",this.isSelected);
			if(!status){
				return false
			}
		},
		checkTel(){
			let status = tool.regularJudgement("phone",this.personTel);
			if(!status){
				return false
			}
		},
		checkPerson(){
			let status = tool.regularJudgement("person",this.person);
			if(!status){
				return false
			}
		},
		selectC(){
			this.selectCompany = !this.selectCompany;
			},
			filingCompany(val){
			console.log("val",val)
			this.isSelected = val.CompanyName;
			this.person = val.Name;
			this.selectCompany = !this.selectCompany;
		},
		// 获取我的公司列表
		requestMyList(params){
			getData.GetList(params).then((res) => {
				// console.log("获取我的公司列表",res)
				this.companyListArr = res.data.list;
				if(this.companyListArr.length != 0){
					this.person = this.companyListArr[0].Name;
					this.isSelected = this.companyListArr[0].CompanyName;
				}
			})
		},
		// 获取最近公司信息
        recentCompany(){
            let params = {
                params : {
					// Id : this.customerId
					Id : this.$route.query.orderNum
                }
            }
            getData.GetInfo(params).then((res) => {
                // console.log("获取最近公司信息",res)
                if(res.data.CompanyName){
                    this.isSelected = res.data.CompanyName;
                }
                if(res.data.Name){
                    this.person = res.data.Name;
                }
                if(res.data.Mobile){
                    this.personTel = res.data.Mobile;
                }
            })
        },
		// 完善资料提交信息
		submitInfo(){
            if(this.isSelected.length >= 2 && this.personTel.length == 11 && this.person.length >= 2){
                this.requestInfo();
            }
        },
        requestInfo(){
            let params = {
                params:{
                    // Id : this.customerId,
                    CompanyName : this.isSelected,
                    Name : this.person,
                    Mobile : this.personTel,
                    OrderId : this.$route.query.orderNum
                }
            }
            getData.EditCompanyInfo(params).then((res) => {
                // console.log("完善资料提交信息",res)
				// this.$router.push({path:"/mine/toMyOrder/orderServering",query:{id:res.data.Id,name:'defaultContract'}})
				this.$router.push("/mine/toMyOrder");
            }).catch(err => {
                console.log(err)
            })
        }
	},
	filters:{
        //价钱格式化
        formatPrice (value) {   
			let _value = Number(value).toFixed(2);
          	return tool.formatPrice( _value );   
        },
        formatPriceX:value =>{ 
			let _value = Number(value).toFixed(2);
          	return tool.formatPriceX(_value);
        },
        currency :value =>   {  
			let _value = Number(value).toFixed(2);
          	return tool.currency(_value);
        } 
      },
	created(){
			//----------------------------------------------------------
			// 记账币规则
			var params = {
				key:'jzb'
			}
			this.ACCOUNTBI_RELUSE(params).then(()=>{
			})
         //----------------------------------------------------------
		//记账币
		var params = {
			params:{
				"orderNo":this.$route.query.orderNum
			}
		} 
		console.log("this.$route.query.orderNum",this.$route.query.orderNum)
		this.getCoinByOrderNum(params).then(res=>{
			this.value = this.DFCoin.isUsed;
			//获取余额或余额是否可用-也有支付方式获取-但这次再后台给接口前直接把支付方式写死了-你可以改-也可以顺着我的逻辑来-你开心就好
			var params = {
				"orderNum" : this.$route.query.orderNum
			}
			this.payMethods_comfirmorder(params).then(res=>{
				if(this.value){
					if(this.DFCoin.RMB - this.$route.query.actPrice >=0){
						// console.log('是不是进了这个1')
						this.method = '记账币'
						this.BalanceUnuse = true;
					}else{
						if(!this.IsisBalacne || this.isBalanceEnough < 0){ //余额不可用选择圈圈制灰
						// console.log('是不是进了这个3')
							this.BalanceUnuse = true;
							this.check = 0; //余额不够用且不可用，默认选中微信
							this.method = '微信'
						}else{
							// console.log('是不是进了这个4')
							this.BalanceUnuse = false;
							this.balanceCheck = true;
							this.method = '余额'
						}
					}
				}else{
					if(!this.IsisBalacne || this.isBalanceEnough < 0){ //余额不可用选择圈圈制灰
						// console.log('是不是进了这个5')
						this.BalanceUnuse = true;
						this.check = 0; //余额不够用且不可用，默认选中微信
						this.method = '微信'
					}else{
						// console.log('是不是进了这个6')
						this.BalanceUnuse = false;
						this.balanceCheck = true;
						this.method = '余额'
					}
				}
				// if(!this.IsisBalacne || this.isBalanceEnough < 0){ //余额不可用选择圈圈制灰
				// 	this.BalanceUnuse = true;
				// 	this.check = 0; //余额不够用且不可用，默认选中微信
				// 	this.method = '微信'
				// }else{
				// 	this.BalanceUnuse = false;
				// 	this.balanceCheck = true;
				// 	this.method = '余额'
				// }
				//计算要支付的总价
				this.totalNum();
			}) 
		})	

		// "ae101b58-2651-4bca-9392-736792f5338f"
		this.customerId = this.$route.query.customerId;
		// this.personTel = "13424291200";
		let data = {
			params:{
				// Id : this.customerId,
				OrderNo : this.$route.query.orderNum,
			}
		}
		this.requestMyList(data);
		this.recentCompany();
	},
}
</script>


<style lang="less" type="stylesheet/css" scoped>
	 @import "../../common/index.less";
	 // 完善信息弹窗
.sortWrap{
  width: 100%;
  height: 100%;
  position:fixed;
  top:0px;
  bottom:0;
  left:0;
  right:0;
  z-index: 999;
  background-color:rgba(0, 0, 0, 0.4); 
}
.windowWrap{
  position: absolute;
  width: 8.533333rem;
  // height: 11.733333rem;
  left: 30px;
  bottom: 10%;
  .windowHeader{
    width: 8.533333rem;
    height: 3.333333rem;
    .bg-image("../../assets/images/comfirm-order/header");
    background-size: 100% 100%;
    position: relative;
    div:nth-child(1){
      font-size: .426667rem;
      color: #fff;
      font-weight: 600;
      text-align: center;
      padding-top: 1.933333rem;
    }
    div:nth-child(2){
      font-size: .346667rem;
      margin-top: .32rem;
      color: #fff;
      text-align: center;
    }
  }
  .contentWrap{
    background: #fff;
    border-radius: .266667rem;
    margin-top: -0.266667rem;
    .companyNameWrap{
      margin: 0 .4rem;
      padding: .26667rem 0;
      border-bottom: 1px solid rgb(235,229,225);
      position: relative;
      div:nth-child(1){
        font-size: .4rem;
        color: rgb(102,102,102);
        margin-top: .52rem;
      }
      input:nth-child(2){
        width: 90%;
        // height: .426667rem;
        margin-top: .4rem;
        font-size: .4rem;
      }
      .addCompany,.deleteCompany{
        display: inline-block;
        width: .56rem;
        height: .56rem;
        background-size: 100% 100%;
        float: right;
        margin-top: 0.353333rem;
      }
      .addCompany{
        .bg-image("../../assets/images/comfirm-order/more");
      }
      .deleteCompany{
        .bg-image("../../assets/images/comfirm-order/add2");
      }
      .hiddenWrap{
        width: 8rem;
        height: 6.053333rem;
        background: rgb(247,247,247);
        margin-left: -0.13333rem;
        position: absolute;
        top: 2.44rem;
        border-radius: .133333rem;
        overflow-y: scroll;
        .hiddenCompany{
          height: 0.946667rem;
          font-size: .373333rem;
          padding: 0 .12rem;
          border-bottom: 1px solid #dfdfdf;
          line-height: 0.746667rem; 
          margin: 0.253333rem .133333rem 0 .133333rem;
          color: #000;
        }
        .hiddenCompany:nth-last-child(1){
          border-bottom: none;
        }
      }
    }
    .personWrap,.telWrap{
      margin: 0 .4rem;
      padding: .26667rem 0;
      border-bottom: 1px solid rgb(235,229,225);
      div:nth-child(1){
        font-size: .4rem;
        color: rgb(102,102,102);
      }
      input:nth-child(2){
        width: 80%;
        margin-top: .4rem;
        font-size: .4rem;
      }
    }
    .sureBthWrap{
      margin: 0 0.4rem;
      padding: 0.8rem 0;
    }
    .sureBth{
      width: 7.746667rem;
      height: 1.093333rem;
      background: linear-gradient(to right, rgb(252,115,3), rgb(249,80,8));
      line-height: 1.093333rem;
      text-align: center;
      border-radius: .133333rem;
      color: #fff;
      font-size: .426667rem;
    }
  }
}
	#paymethod{
		background: #EFEFF4;
		height: 100%;
		.payMoney{
			margin-top: 1.5135135135135136rem;
			width: 100%;
			height: 1.3513513513513513rem;
			line-height: 1.3513513513513513rem;
			background-color: #fff;
			padding: 0rem 0.32432432432432434rem;
			display: flex;
			justify-content: space-between;
			span:nth-child(1){
				font-size: .373333rem;
			}
			.num{
				color: #fa2802;
				font-size: .373333rem;
				b{
					font-size: .32rem;
				}
			}
		}
		.wqb_pay{
			background: #fff;
			margin-top: 0.32432432432432434rem;
			.one_d{
				border-bottom: 1px solid #eee;
				padding: 0.2702702702702703rem;
				p{
					height: 0.7027027027027027rem;
					line-height: 0.7027027027027027rem;
					img{
						vertical-align: middle;
						margin-right: 0.10810810810810811rem;
					}
					.span_b{
						.one{
							font-size: .4rem;
							margin-right: 0.16216216216216217rem;
						}
						.tow{
							font-size: .32rem;
							color: #999;
						}
					}
				}
			}
			.tow_d{
				position: relative;
				.img_span{
					padding: 0.2702702702702703rem;
					height: 1.3513513513513513rem;
					line-height: 1.3513513513513513rem;
					font-size: 0.43243243243243246rem;
					color: #333;
					img{
						width: .666667rem;
						height: .666667rem;
						vertical-align: middle;
						margin-right: 0.13513513513513514rem;
					}
				}
				.span_num{
					line-height: 1.3513513513513513rem;
					position: absolute;
					right: 0;
					padding-left: 20%;
					color: #666;
					font-size: 0.32432432432432434rem;
					span{
						i{
							line-height: 0.6756756756756757rem;
							font-size: 0.32432432432432434rem;
						}
						&:nth-child(2){
							color: #fa2802;
							margin-right: 0.2702702702702703rem;
						}
					}
				}
				i{
					width: 0.32432432432432434rem;
					height: 0.7027027027027027rem;
					display: inline-block;
					vertical-align: middle;
					background-size: 0.7027027027027027rem;
					&.uncheck_y{
						width: 0.4864864864864865rem;
						height: 0.4864864864864865rem;
						float:right;
						margin-right: 0.32432432432432434rem;
						margin-top: 0.4594594594594595rem;
						.bg-image("../../assets/images/tabBar/select_box");
						background-size:cover;
					}
					&.check_y{
						width: 0.4864864864864865rem;
						height: 0.4864864864864865rem;
						float:right;
						margin-right: 0.32432432432432434rem;
						margin-top: 0.4594594594594595rem;
						.bg-image("../../assets/images/tabBar/select_boxS");
						background-size:cover;
					}
					&.BalanceUnuse{
						width: 0.4864864864864865rem;
						height: 0.4864864864864865rem;
						float:right;
						margin-right: 0.32432432432432434rem;
						margin-top: 0.4594594594594595rem;
						.bg-image("../../assets/images/tabBar/BalanceUnuse");
						background-size:cover;
					}
				}
			}
		}
		.confirmB{
			width: 100%;
			height: 1.3513513513513513rem;
			line-height: 1.3513513513513513rem;
			text-align: center;
			position: absolute;
			bottom: 0rem;
			background: linear-gradient(to right, #ff7600, #fd6701, #FA5102);
			color: #fff;
			span{
				font-size: .453333rem;
				b{
					font-size: .4rem;
				}
			}
		}
		.successModel{
			width: 60%;
			height: 5.135135135135135rem;
			background :#fff;
			text-align: center;
			padding: 0.5405405405405406rem 0 0.8108108108108109rem 0;
			position: absolute;
			top: 32%;
			left: 20%;
			border-radius: 0.21621621621621623rem;
			z-index: 1001;
			.img_div{
				margin: 0 auto;
				margin-bottom: 0.5405405405405406rem;
			}
			p{
				margin-bottom: 0.9459459459459459rem;
				font-size: 0.3783783783783784rem;
				color: #333;
			}
			.button_box{
				span{
					display: inline-block;
					width: 2.1621621621621623rem;
					height: 0.7027027027027027rem;
					line-height: 0.7027027027027027rem;
					color: #fabc7a;
					border-radius: 0.7027027027027027rem;
					&:nth-child(1){
						color: #fff;
						background-color: #fabc7a;
						margin-right: 0.13513513513513514rem;
					}
					&:nth-child(2){
						border: 1px solid #fabc7a;
						margin-left: 0.13513513513513514rem;
					}
				}
			}
		}
	}
	.mainWrap{
		margin-top: 0.32432432432432434rem;
		background: #fff;
	}
	.mainWrap>div{
		height: 0.9459459459459459rem;
		line-height: 0.9459459459459459rem;
		margin-left: 0.35135135135135137rem;
		font-size: .4rem;
		.icon{
			width: 0.4864864864864865rem;
			height: 0.4864864864864865rem;
			margin-top: 0.24324324324324326rem;
			margin-right: 0.2702702702702703rem;
			.bg-image("../../assets/images/comfirm-order/payMethod");
			background-size: 0.4864864864864865rem;
			vertical-align: top;
		}
	}
	.mainWrap>ul{
		li{
			height: 1.2162162162162162rem;
			line-height: 1.1891891891891893rem;
			.border-1pxT(#EFEFF4);
			padding-left: 0.24324324324324326rem;
			font-size: .373333rem;
			&:nth-child(1){
				i{
					.bg-image("../../assets/images/comfirm-order/wxPay");
				}
			}
			&:nth-child(2){
				i{
					.bg-image("../../assets/images/comfirm-order/aliPay");
				}
			}
			&:nth-child(3){
				i{
					.bg-image("../../assets/images/comfirm-order/YL");
				}
			}
			&:nth-child(4){
				i{
					.bg-image("../../assets/images/comfirm-order/otherPay");
				}
			}
			// &:nth-child(5){
				// i{
					// .bg-image("../../assets/images/comfirm-order/");
					// 
				// }
				// 
			// }
			i{
				width: 0.7027027027027027rem;
				height: 0.7027027027027027rem;
				display: inline-block;
				vertical-align: middle;
				margin-right: 0.24324324324324326rem;
				background-size: 0.7027027027027027rem;
				&.uncheck{
					width: 0.4864864864864865rem;
					height: 0.4864864864864865rem;
					float:right;
					margin-right: 0.32432432432432434rem;
					margin-top: 0.30432432432432434rem;
					.bg-image("../../assets/images/tabBar/select_box");
					background-size:cover;
				}
				&.check{
					width: 0.4864864864864865rem;
					height: 0.4864864864864865rem;
					float:right;
					margin-right: 0.32432432432432434rem;
					// margin-top: 0.30432432432432434rem;
					margin-top: .32rem;
					.bg-image("../../assets/images/tabBar/select_boxS");
					background-size:cover;
				}
			}
		}
	}
	.model{
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,0.4);
		z-index: 1000;
		position: absolute;
		top: 0;
	}
	.discountsB{
		height: 1.3513513513513513rem;
		line-height: 1.3513513513513513rem;
		padding-left: 0.35135135135135137rem;
		font-size: 0.3783783783783784rem;
		border-top: 1px solid #eee;
		background: #fff;
		span:nth-child(1){
			img{
				width: .48rem;
				height: .48rem;
			}
		}
		span {
			&:nth-child(2) {
				float: right;
				margin-right:0.21621621621621623rem;
				background-size: 0.21621621621621623rem 0.3783783783783784rem;
				background-position:right center;
			}
		}
	}
	.discountsB img{
		vertical-align: middle;
		margin-left: 0.32432432432432434rem;
	}
	.discountsB span{
		display: inline-block;
		line-height: 1.3513513513513513rem;
		height: 100%;
	}
	.discountsB /deep/ .mint-switch{
		margin-top: 0.2702702702702703rem;
	}
	.discountsB /deep/ .mint-switch-input:checked + .mint-switch-core{
		background-color: #4dd965;
		border-color: #4dd965;
	}
	//记账币规则弹框 
	.accountB_M{
		width: 80%;
		height: 6.756756756756757rem;
		background-color: #fff;
		position: absolute;
		top: 28%;
		left: 10%;
		padding: 0.8108108108108109rem 0.40540540540540543rem 0.8108108108108109rem 0.5405405405405406rem;
		margin: 0 auto;
		z-index: 1001;
		h3{
			font-size: 0.4594594594594595rem;
			color: #333;
			font-weight: bold;
			text-align: center;
			margin-bottom: 0.8918918918918919rem;
		}
		img{
			position: absolute;
			right: 0.2702702702702703rem;
			top: 0.2702702702702703rem;
		}
		p{
			line-height: 0.5945945945945946rem;
		}
		.know{
			display: inline-block;
			margin-top: 0.8108108108108109rem;
			width: 2.189189189189189rem;
			height: 0.7027027027027027rem;
			line-height: 0.7027027027027027rem;
			text-align: center;
			background-color: #fabc7a;
			border-radius: 0.6756756756756757rem;
			color: #fff;
			border-color: #fabc7a;
			position: absolute;
			bottom: 0.8108108108108109rem;
			left: 50%;
			margin-left: -1.0810810810810811rem;
		}
	}
	.no_balance{
		font-size: .32rem;
		position: absolute;
		right: 1.135135135135135rem;
		color: #666;
		height: 0.35135135135135137rem;
	}
	.balance_title{
		position: absolute;
		left: 1.2162162162162162rem;
		line-height: 1.3783783783783783rem;
		height: 0.6756756756756757rem;
		font-size: .373333rem;
	}
 
</style>
