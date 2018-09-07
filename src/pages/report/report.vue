<template>
	<div id="accountTax">
		<!--头部-->
		<div class="back">
			<span class="return" @click="goBack()"></span>
			<span  @click="toChoose">{{value}}</span>
			<span class="triangle" @click="toChoose"></span>
		</div>
		
		<!--日期弹出框-->
		<div class="mask" @click="toCancel" v-show="isShowDate" @touchmove.prevent></div>
		<transition name="date">
			<div class="datePickerPop" v-show="isShowDate" @touchmove.prevent>
				<div class="datePickerHead">
					<div class="cancel" @click="toCancel">取消</div>
					<div class="choose">请选择期数</div>
					<div class="enter" @click="toEnter">确定</div>
				</div>
				<div class="datePicker-content">
					<ul class="year-month">
						<li>年份</li>
						<li>月份</li>
					</ul>
				</div>
				<mt-picker :itemHeight="itemHeight"   :visibleItemCount="visibleItemCount"   :slots="yearForm" @change="onValuesChange"></mt-picker>
				
			</div>
		</transition>
		<div class="tab-forms">
			<ul>
				<li :class="currentIndex==0?'active':''" @click="toChooseTab(0)">资产负债表</li>
				<li :class="currentIndex==1?'active':''" @click="toChooseTab(1)">利润表</li>
				<!--<li :class="currentIndex==2?'active':''" @click="toChooseTab(2)">现金流量表</li>-->
			</ul>
		</div>
		<div class="accountTax-content">
			<!--资产负债表-->
			<div class="scroll-content" id="scroll-content" v-show="currentIndex==0">
				<div class="scroll-body">
					<!--tab切换-->
					<div class="tab">
						<ul>
							<li :class="isSelected?'active':''" @click="toSelected(1)"><span>资产</span></li>
							<li :class="isSelected?'':'active'" @click="toSelected(2)"><span>负债和所有者权益</span></li>
						</ul>
					</div>
					<div id="main-content">
						<mt-tab-container v-model="active" >
						  <mt-tab-container-item id="tab-container1">
					    	<!--资产-->
							<div class="main-content">
								<div class="content">
									<ul>
										<li>项目</li>
										<li>期末余额</li>
										<li>年初余额</li>
									</ul>
								</div>
								<!--流动资产-->
								<div v-show="noAssetData">
									<div class="exhibition" @click="toShow('floating')">
										<span></span>
										流动资产
										<span :class="isShowFloating?'up':''"></span>
									</div>
									<transition-group  name="list">
										<div v-if="isShowFloating" class="floatingCapital" v-for="(data,index) in floatingCapitalArr1" :key="index">
											<ul>
												<li>{{data.name}}</li>
												<li>{{data.end}}</li>
												<li>{{data.init}}</li>
											</ul>
										</div>
									</transition-group>
									<!--非流动资产-->
									<div class="exhibition" @click="toShow('nonLiquid')">
										<span></span>
										非流动资产
										<span :class="isShowNonLiquid?'up':''"></span>
									</div>
									<transition-group  name="list" class="floating">
										
										<div v-if="isShowNonLiquid" class="floatingCapital" v-for="(data,index) in nonLiquidAssetArr1" :key="index">
											<ul>
												<li>{{data.name}}</li>
												<li>{{data.end}}</li>
												<li>{{data.init}}</li>
											</ul>
										</div>
									</transition-group>
								</div>
							</div>
							<div class="bottom" v-if="currentIndex==0 && isSelected" v-show="noAssetData">
								<span>资产总计：</span>
								<span>{{totalAssets.end}}</span>
								<span>{{totalAssets.init}}</span>
							</div>
							
							<!--无数据-->
							<div class="cash" v-show="!noAssetData">
								暂无数据
							</div>
						  </mt-tab-container-item>
						  <mt-tab-container-item id="tab-container2">
						    <!--负债和所有者权益-->
							<div class="main-content">
								<div class="content">
									<ul>
										<li>项目</li>
										<li>期末余额</li>
										<li>年初余额</li>
									</ul>
								</div>
								<!--流动负债-->
								<div v-show="noAssetData">
									<div class="exhibition" @click="toShow('liabilities')">
										<span></span>
										流动负债
										<span :class="isShowLiabilities?'up':''"></span>
									</div>
									<transition-group  name="list">
										<div v-if="isShowLiabilities" class="floatingCapital" v-for="(data,index) in floatingLiabilitiesArr1" :key="index">
											<ul>
												<li>{{data.name}}</li>
												<li>{{data.end}}</li>
												<li>{{data.init}}</li>
											</ul>
										</div>
									</transition-group>
									<!--非流动资产-->
									<div class="exhibition" @click="toShow('nonLiabilities')">
										<span></span>
										非流动负债
										<span :class="isShowNonLiabilities?'up':''"></span>
									</div>
									<transition-group  name="list">
										<div v-if="isShowNonLiabilities" class="floatingCapital" v-for="(data,index) in nonLiabilitiesArr1" :key="index">
											<ul>
												<li>{{data.name}}</li>
												<li>{{data.end}}</li>
												<li>{{data.init}}</li>
											</ul>
										</div>
									</transition-group>
									<!--所有者权益（或股东权益）-->
									<div class="exhibition" @click="toShow('shareholder')">
										<span></span>
										所有者权益（或股东权益）
										<span :class="isShowShareholder?'up':''"></span>
									</div>
									<transition-group  name="list" class="floating">
										<div v-if="isShowShareholder" class="floatingCapital" v-for="(data,index) in shareholderArr1" :key="index">
											<ul>
												<li>{{data.name}}</li>
												<li>{{data.end}}</li>
												<li>{{data.init}}</li>
											</ul>
										</div>
									</transition-group>
								</div>
							</div>
							<div class="bottom liabilities" v-if="currentIndex==0 && !isSelected" v-show="noAssetData">
								<span>负债和所有者权益总计：</span>
								<span>{{totalLiabilities.end}}</span>
								<span>{{totalLiabilities.init}}</span>
							</div>
							<!--无数据-->
							<div class="cash" v-show="!noAssetData">
								暂无数据
							</div>
						  </mt-tab-container-item>
						</mt-tab-container>
					</div>
				</div>
			</div>
			
			<!--利润表-->
			<div id="operation-content" v-show="currentIndex==1">
				<div class="content">
					<ul>
						<li>项目</li>
						<li>本年金额</li>
						<li>本期金额</li>
					</ul>
				</div>
				<div class="operation-show" v-show="noBalanceData">
					<div class="operationRevenue">
						<ul v-for="data in operationRevenueArr1">
							<li>{{data.name}}</li>
							<li>{{data.year}}</li>
							<li>{{data.cur}}</li>
						</ul>
					</div>
					<div class="operatingProfit">
						<ul v-for="data in operatingProfitArr1">
							<li>{{data.name}}</li>
							<li>{{data.year}}</li>
							<li>{{data.cur}}</li>
						</ul>
					</div>
					<div class="totalProfit">
						<ul v-for="data in totalProfitArr1">
							<li>{{data.name}}</li>
							<li>{{data.year}}</li>
							<li>{{data.cur}}</li>
						</ul>
					</div>
					<div class="retainedProfits">
						<ul v-for="data in retainedProfitsArr1">
							<li>{{data.name}}</li>
							<li>{{data.year}}</li>
							<li>{{data.cur}}</li>
						</ul>
					</div>
					<div class="earnings">
						<ul v-for="data in earningsArr1">
							<li>{{data.name}}</li>
							<li>{{data.year}}</li>
							<li>{{data.cur}}</li>
						</ul>
					</div>
				</div>
				<!--无数据-->
				<div class="cash" v-show="!noBalanceData">
					暂无数据
				</div>
			</div>
			
			<!--现金流量表-->
			<div id="cash-content" v-show="currentIndex==2">
				<div class="cash">
					暂无数据
				</div>
			</div>
			
		</div>
	</div>
</template>

<script>
	import getData from '../../vuex/getData.js';
	import tool from '../../util/tool'
	import { Picker } from 'mint-ui';
	export default{
		data(){
			return {
				visibleItemCount:3,
				itemHeight:72,//三级联动
				currentIndex:0,//第一层tab
				isSelected:true,//第二层tab
				isShowFloating:true,//流动资金是否显示
				isShowNonLiquid:false,//非流动资金是否显示
				isShowLiabilities:true,//流动负债是否显示
				isShowNonLiabilities:false,//非流动负债是否显示
				isShowShareholder:false,//所有者权益（或股东权益）是否显示
				floatingCapitalArr:[],//流动资产数组
				nonLiquidAssetArr:[],//非流动资产数组
				floatingLiabilitiesArr:[],//流动负债数组
				nonLiabilitiesArr:[],//非流动负债数组
				shareholderArr:[],//所有者权益（或股东权益）数组
				operationRevenueArr:[],//营业收入数组
				operatingProfitArr:[],//营业利润数组
				totalProfitArr:[],//利润总额数组
				retainedProfitsArr:[],//净利润数组
				earningsArr:[],//每股收益数组
				active:"tab-container1",
				isShowDate:false,//选择日期
				yearForm:[{
					flex: 1, 
					textAlign:'center',
					className: 'slot1', 
					values:[], 
					
				},{
					flex: 1, 
					textAlign:'center',
					className: 'slot2', 
					values:['01','02','03','04','05','06','07','08','09','10','11','12'],
				}],//年份选择
				isFirstSelect:true,
				value:'2018 年 01 月',
				valueTime:'',
				oldVal:'',//设置日期选择器的取消功能
				oldIndex:'',//记录年下标
				oldMonIndex:'',//记录月下标
				picker:'',
				values:[],
				totalAssets:{},//资产总计
				totalLiabilities:{},//负债和所有者权益总计
				id:'',//java后台需要的账套id
				noAssetData:true,//没有资产数据
				noBalanceData:true,//没有资产数据
			}
		},
		created(){
			//适配不同手机的 三级 联动 
			var  dpr = document.documentElement.getAttribute('data-dpr');
			if(dpr <2){
				this.itemHeight = 36;
			}else if(dpr <=2){
				this.itemHeight = 72;
			}else{
				this.itemHeight = 108;
			}

			this.id = tool.loadFromLocal('accountID','accountID','accountID','ALL');
			//给年加数据
			this.$nextTick(()=>{
				var year = new Date().getFullYear();
				this.yearForm[0].values.unshift(year.toString());
				for(var i=0;i<28;i++){
					year--;
					this.yearForm[0].values.unshift(year.toString());
				}
			})
			//请求资产数据		
			let cYear = new Date().getFullYear();
			let cMonth = new Date().getMonth()+1;
			cMonth = cMonth.toString().length==1 ? '0'+cMonth : cMonth.toString();
			
			let params = {
				params:{
					period:cYear + '-' + cMonth,
					accountID:this.id
				}
			}
			this.getReportData(params);

			


		},
		mounted(){ 
			//监听当前tab改变class
			this.$watch('active',(n,o)=>{
				if(n == 'tab-container1'){
					this.isSelected = true;
				}else if(n == 'tab-container2'){
					this.isSelected = false;
				}
			})
			
			//监听第一层tab
			this.$watch('currentIndex',(n,o)=>{
				if(n == 1){
					this.operationRevenueArr = [];
					this.operatingProfitArr = [];
					this.totalProfitArr = [];
					this.retainedProfitsArr = [];
					this.earningsArr = [];
					this.getIncomeData();
				}else if(n == 0){
					this.nonLiabilitiesArr = [];
					this.floatingCapitalArr = [];
					this.nonLiquidAssetArr = [];
					this.floatingLiabilitiesArr = [];
					this.shareholderArr = [];
					
					let params = {
						params:{
							period:this.valueTime,
							accountID:this.id
						}
					}
					this.getReportData(params);
				}
			})
			
			//监听当前时间，改成后台所需形式
			this.$watch('value',(newVal,oldVal)=>{
				let year = newVal.substring(0,4);
				let month = newVal.substring(7,9);
				this.valueTime = year + '-' + month;
			});
		},
		computed:{
			floatingCapitalArr1(){
				return this.initNumber(this.floatingCapitalArr);
			},
			nonLiquidAssetArr1(){
				return this.initNumber(this.nonLiquidAssetArr);
			},
			floatingLiabilitiesArr1(){
				return this.initNumber(this.floatingLiabilitiesArr);
			},
			nonLiabilitiesArr1(){
				return this.initNumber(this.nonLiabilitiesArr);
			},
			shareholderArr1(){
				return this.initNumber(this.shareholderArr);
			},
			operationRevenueArr1(){
				return this.initNumberA(this.operationRevenueArr);
			},
			operatingProfitArr1(){
				return this.initNumberA(this.operatingProfitArr);
			},
			totalProfitArr1(){
				return this.initNumberA(this.totalProfitArr);
			},
			retainedProfitsArr1(){
				return this.initNumberA(this.retainedProfitsArr);
			},
			earningsArr1(){
				return this.initNumberA(this.earningsArr);
			},
		},
		methods:{
			//当前tab
			toSelected(num){
				if(num==1){
					this.isSelected = true;
					this.active = "tab-container1";
				}else{
					this.isSelected = false;
					this.active = "tab-container2";
				}
			},
			// 格式化数字为带两位小数的金额 
		    initNumber(val) {
		    	if(val){
		    		for(var i = 0;i<val.length;i++){
						if(val[i].end === null){
							val[i].end = 0+'.00';
							if(val[i].init === null){
								val[i].init = 0+'.00';
							}else{
								val[i].init = Number(val[i].init).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
							}
						}else{
							//console.log(val[i])
							val[i].end = Number(val[i].end).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
							if(val[i].init === null){
								val[i].init = 0+'.00';
							}else{
								val[i].init = Number(val[i].init).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
							}
						}
					}
			    	return val;
		    	}else{
		    		return [];
		    	}
		    	
		    },
		    //资产
		    getReportData(params){
		    	getData.getReport(params)
				.then((res)=>{
					this.noAssetData = true;
					document.getElementsByTagName('body')[0].style="overflow:visible";
					//资产总计
					this.totalAssets.end = res.msg.sheet[0].endTotalOfAssets.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
					this.totalAssets.init = res.msg.sheet[0].initTotalOfAssets.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
					
					//负债和所有者权益总计
					this.totalLiabilities.end = res.msg.sheet[0].endTotalOfLiabilitiesAndOwnersEquity.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
					this.totalLiabilities.init = res.msg.sheet[0].initTotalOfLiabilitiesAndOwnersEquity.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
					
					
					//流动资产
					var arr = ["货币资金","交易性金融资产","应收票据","应收账款","预付款项","应收利息","应收股利","其他应收款","存货","一年内到期的非流动资产","其他流动资产","流动资产合计"]
					//期末余额
					var endArr = [res.msg.sheet[0].endCash,res.msg.sheet[0].endTransactionMonetaryAssets,res.msg.sheet[0].endNotesReceivable,
					res.msg.sheet[0].endAccountsReceivable,res.msg.sheet[0].endAccountsPrepaid,res.msg.sheet[0].endInterestReceivable,
					res.msg.sheet[0].endDividendReceivable,res.msg.sheet[0].endOtherReceivables,res.msg.sheet[0].endInventories,
					res.msg.sheet[0].endNonCurrentAssetsDueInOneYear,res.msg.sheet[0].endOtherCurrentAssets,res.msg.sheet[0].endTotalCurrentAssets];
					//期初余额
					var initArr = [res.msg.sheet[0].initCash,res.msg.sheet[0].initTransactionMonetaryAssets,res.msg.sheet[0].initNotesReceivable,
					res.msg.sheet[0].initAccountsReceivable,res.msg.sheet[0].initAccountsPrepaid,res.msg.sheet[0].initInterestReceivable,
					res.msg.sheet[0].initDividendReceivable,res.msg.sheet[0].initOtherReceivables,res.msg.sheet[0].initInventories,
					res.msg.sheet[0].initNonCurrentAssetsDueInOneYear,res.msg.sheet[0].initOtherCurrentAssets,res.msg.sheet[0].initTotalCurrentAssets];
					//循环添加值
					for(var i=0;i<arr.length;i++){
						var obj = {
							name:arr[i],
							end:endArr[i],
							init:initArr[i]
						}
						this.floatingCapitalArr.push(obj);
					}
					
					//非流动资产
					var nonArr = ["可供出售金融资产","持有至到期投资","长期应收款","长期股权投资","投资性房地产","固定资产","在建工程","工程物资","固定资产清理","生产性生物资产","油气资产"
					,"无形资产","开发支出","商誉","长期待摊费用","递延所得税资产","其他非流动资产","非流动资产合计"]
					
					//期末余额
					var nonEndArr = [res.msg.sheet[0].endAvailableForSaleFinancialAssets,res.msg.sheet[0].endHeldToMaturityInvestmen,res.msg.sheet[0].endLongTermReceivables,
					res.msg.sheet[0].endLongTermEquityInvestment,res.msg.sheet[0].endInvestmentRealEstates,res.msg.sheet[0].endFixedAssets,
					res.msg.sheet[0].endConstructionInProgress,res.msg.sheet[0].endConstructionSupplies,res.msg.sheet[0].endFixedAssetsPendingDisposal,
					res.msg.sheet[0].endBearerBiologicalAssets,res.msg.sheet[0].endOilAndNaturalGasAssets,res.msg.sheet[0].endIntangibelAssets,
					res.msg.sheet[0].endResearchAndDevelopmentCosts,res.msg.sheet[0].endGoodwill,res.msg.sheet[0].endLongTermDeferredExpenses,
					res.msg.sheet[0].endDeferredTaxAssets,res.msg.sheet[0].endOtherNonCurrentAssets,res.msg.sheet[0].endTotalOfNonCurrentAsses];
					
					//期初余额
					var nonInitArr = [res.msg.sheet[0].initAvailableForSaleFinancialAssets,res.msg.sheet[0].initHeldToMaturityInvestmen,res.msg.sheet[0].initLongTermReceivables,
					res.msg.sheet[0].initLongTermEquityInvestment,res.msg.sheet[0].initInvestmentRealEstates,res.msg.sheet[0].initFixedAssets,
					res.msg.sheet[0].initConstructionInProgress,res.msg.sheet[0].initConstructionSupplies,res.msg.sheet[0].initFixedAssetsPendingDisposal,
					res.msg.sheet[0].initBearerBiologicalAssets,res.msg.sheet[0].initOilAndNaturalGasAssets,res.msg.sheet[0].initIntangibelAssets,
					res.msg.sheet[0].initResearchAndDevelopmentCosts,res.msg.sheet[0].initGoodwill,res.msg.sheet[0].initLongTermDeferredExpenses,
					res.msg.sheet[0].initDeferredTaxAssets,res.msg.sheet[0].initOtherNonCurrentAssets,res.msg.sheet[0].initTotalOfNonCurrentAsses];
					//循环添加值
					for(var i=0;i<nonArr.length;i++){
						var obj = {
							name:nonArr[i],
							end:nonEndArr[i],
							init:nonInitArr[i]
						}
						this.nonLiquidAssetArr.push(obj);
					}
					
					//流动负债
					var floatingArr = ["短期借款","交易性金融负债","应付票据","应付账款","预收款项","应付职工薪酬","应交税费","应付利息","应付股利","其他应付款","一年内到期的非流动负债","其他流动负债","流动负债合计"]
					
					//期末余额
					var floatingEndArr = [res.msg.sheet[0].endShortTermLoan,res.msg.sheet[0].endTradableFinancialLiabilities,res.msg.sheet[0].endNotesPayable,
					res.msg.sheet[0].endAccountsPayable,res.msg.sheet[0].endAdvanceReceipts,res.msg.sheet[0].endAccruedPayroll,
					res.msg.sheet[0].endAccruedTax,res.msg.sheet[0].endAccruedInterestPayable,res.msg.sheet[0].endDividendPayable,
					res.msg.sheet[0].endOtherPayables,res.msg.sheet[0].endCurrentLiailitiesFallingDueWithinOneYear,res.msg.sheet[0].endOtherCurrentLiabilities,
					res.msg.sheet[0].endTotalOfCurrentLiabilities];
					
					//期初余额
					var floatingInitArr = [res.msg.sheet[0].initShortTermLoan,res.msg.sheet[0].initTradableFinancialLiabilities,res.msg.sheet[0].initNotesPayable,
					res.msg.sheet[0].initAccountsPayable,res.msg.sheet[0].initAdvanceReceipts,res.msg.sheet[0].initAccruedPayroll,
					res.msg.sheet[0].initAccruedTax,res.msg.sheet[0].initAccruedInterestPayable,res.msg.sheet[0].initDividendPayable,
					res.msg.sheet[0].initOtherPayables,res.msg.sheet[0].initCurrentLiailitiesFallingDueWithinOneYear,res.msg.sheet[0].initOtherCurrentLiabilities,
					res.msg.sheet[0].initTotalOfCurrentLiabilities];
					//循环添加值
					for(var i=0;i<floatingArr.length;i++){
						var obj = {
							name:floatingArr[i],
							end:floatingEndArr[i],
							init:floatingInitArr[i]
						}
						this.floatingLiabilitiesArr.push(obj);
					}
					
					//非流动负债
					var nonFloatingArr = ["长期借款","应付债券","长期应付款","专项应付款","预计负债","递延所得税负债","其他非流动负债","非流动负债合计","负债合计"]
					
					//期末余额
					var nonFloatingEndArr = [res.msg.sheet[0].endLongTermLoan,res.msg.sheet[0].endBondsPayable,res.msg.sheet[0].endLongTermAccountsPayable,
					res.msg.sheet[0].endAccountsPayableForSpecialisedTerms,res.msg.sheet[0].endProvisionForLiabilities,res.msg.sheet[0].endDeferredIncomeTaxLiabilities,
					res.msg.sheet[0].endOtherNonCurrentLiabilities,res.msg.sheet[0].endTotalOfNonCurrentLiabilities,res.msg.sheet[0].endTotalOfLiabilities];
					
					//期初余额
					var nonFloatingInitArr = [res.msg.sheet[0].initLongTermLoan,res.msg.sheet[0].initBondsPayable,res.msg.sheet[0].initLongTermAccountsPayable,
					res.msg.sheet[0].initAccountsPayableForSpecialisedTerms,res.msg.sheet[0].initProvisionForLiabilities,res.msg.sheet[0].initDeferredIncomeTaxLiabilities,
					res.msg.sheet[0].initOtherNonCurrentLiabilities,res.msg.sheet[0].initTotalOfNonCurrentLiabilities,res.msg.sheet[0].initTotalOfLiabilities];
					//循环添加值
					for(var i=0;i<nonFloatingArr.length;i++){
						var obj = {
							name:nonFloatingArr[i],
							end:nonFloatingEndArr[i],
							init:nonFloatingInitArr[i]
						}
						this.nonLiabilitiesArr.push(obj);
					}
					
					//所有者权益（或股东权益）
					var shareholderArr = ["实收资本（或股本）","资本公积","减:库存股","盈余公积","未分配利润","所有者权益（或股东权益）合计"]
					
					//期末余额
					var shareholderEndArr = [res.msg.sheet[0].endCapital,res.msg.sheet[0].entCapitalReserves,res.msg.sheet[0].endLessTreasuryStock,
					res.msg.sheet[0].endEarningsReserve,res.msg.sheet[0].endRetainedEarnings,res.msg.sheet[0].endTotalOfOwnersEquity];
					
					//期初余额
					var shareholderInitArr = [res.msg.sheet[0].initCapital,res.msg.sheet[0].initCapitalReserves,res.msg.sheet[0].initLessTreasuryStock,
					res.msg.sheet[0].initEarningsReserve,res.msg.sheet[0].initRetainedEarnings,res.msg.sheet[0].initTotalOfOwnersEquity];
					//循环添加值
					for(var i=0;i<shareholderArr.length;i++){
						var obj = {
							name:shareholderArr[i],
							end:shareholderEndArr[i],
							init:shareholderInitArr[i]
						}
						this.shareholderArr.push(obj);
					}
				})
				.catch((error)=>{
					//console.log(132,error)
					this.noAssetData = false;
					document.getElementsByTagName('body')[0].style="overflow:hidden";

					this.nonLiabilitiesArr = [];
					this.floatingCapitalArr = [];
					this.nonLiquidAssetArr = [];
					this.floatingLiabilitiesArr = [];
					this.shareholderArr = [];
				})
		    },
		    getIncomeData(){
		    	//请求利润表
		    	let params = {
		    		params:{
		    			period:this.valueTime,
		    			accountID:this.id
		    		}
		    	}
				getData.getIncome(params)
				.then((res)=>{
					this.noBalanceData = true;
					document.getElementsByTagName('body')[0].style="overflow:visible";					

					//营业收入
					var operationRevenueArr = ["一、营业收入","减：营业成本","营业税金及附加","销售费用","管理费用","财务费用","资产减值损失","加：公允价值变动收益（损失以“-”号填列）","投资收益（损失以“-”号填列）","其中：对联营企业和合营企业的投资收益"]
					
					//本期金额
					var operationRevenueCurArr = [res.msg.sheet[0].currentSalesFromOperati,res.msg.sheet[0].currentLessOperatingCosts,
					res.msg.sheet[0].currentOperatingTaxAndAdditions,res.msg.sheet[0].currentSellingExpenses,
					res.msg.sheet[0].currentGeneralAndAdministrativeExpense,res.msg.sheet[0].currentFinaneiaExpense,
					res.msg.sheet[0].currentLossesOnTheAssetImpairment,res.msg.sheet[0].currentAddProfitsOrLossesOntheChangesInFairValue,
					res.msg.sheet[0].currentInvestmentIncome,res.msg.sheet[0].currentAmongInvestmentIncomeFromAffiliatedBusiness];
					
					//本年金额
					var operationRevenueLesArr = [res.msg.sheet[0].yearSalesFromOperati,res.msg.sheet[0].yearLessOperatingCosts,
					res.msg.sheet[0].yearOperatingTaxAndAdditions,res.msg.sheet[0].yearSellingExpenses,
					res.msg.sheet[0].yearGeneralAndAdministrativeExpense,res.msg.sheet[0].yearFinaneiaExpense,
					res.msg.sheet[0].yearLossesOnTheAssetImpairment,res.msg.sheet[0].yearAddProfitsOrLossesOntheChangesInFairValue,
					res.msg.sheet[0].yearInvestmentIncome,res.msg.sheet[0].yearAmongInvestmentIncomeFromAffiliatedBusiness];
					//循环添加值
					for(var i=0;i<operationRevenueArr.length;i++){
						var obj = {
							name:operationRevenueArr[i],
							cur:operationRevenueCurArr[i],
							year:operationRevenueLesArr[i]
						}
						this.operationRevenueArr.push(obj);
					}
					
					//营业利润
					var operatingProfitArr = ["二、营业利润（亏损以“-”号填列）","加：营业外收入","减：营业外支出","其中：非流动资产处置损失"]
					
					//本期金额
					var operatingProfitCurArr = [res.msg.sheet[0].currentOperatingIncome,res.msg.sheet[0].currentAddNonOperatingIncome,
					res.msg.sheet[0].currentLessNonOperatingExpense,res.msg.sheet[0].currentIncludingLossesFromDisposalOfNonCurrentAssets];
					
					//本年金额
					var operatingProfitLesArr = [res.msg.sheet[0].yearOperatingIncome,res.msg.sheet[0].yearAddNonOperatingIncome,
					res.msg.sheet[0].yearLessNonOperatingExpense,res.msg.sheet[0].yearIncludingLossesFromDisposalOfNonCurrentAssets];
					//循环添加值
					for(var i=0;i<operatingProfitArr.length;i++){
						var obj = {
							name:operatingProfitArr[i],
							cur:operatingProfitCurArr[i],
							year:operatingProfitLesArr[i]
						}
						this.operatingProfitArr.push(obj);
					}
					
					//利润总额
					var totalProfittArr = ["三、利润总额（亏损总额以“-”号填列）","减：所得税费用"]
					
					//本期金额
					var totalProfitCurArr = [res.msg.sheet[0].currentIncomeBeforeTax,res.msg.sheet[0].currentLessIncomeTax];
					
					//本年金额
					var totalProfitLesArr = [res.msg.sheet[0].yearIncomeBeforeTax,res.msg.sheet[0].yearLessIncomeTax];
					//循环添加值
					for(var i=0;i<totalProfittArr.length;i++){
						var obj = {
							name:totalProfittArr[i],
							cur:totalProfitCurArr[i],
							year:totalProfitLesArr[i]
						}
						this.totalProfitArr.push(obj);
					}
					
					//净利润
					var retainedProfitsArr = ["四、净利润（净亏损以“-”号填列）"]
					
					//本期金额
					var retainedProfitsCurArr = [res.msg.sheet[0].currentEntIncome];
					
					//本年金额
					var retainedProfitsLesArr = [res.msg.sheet[0].yearEntIncome];
					//循环添加值
					for(var i=0;i<retainedProfitsArr.length;i++){
						var obj = {
							name:retainedProfitsArr[i],
							cur:retainedProfitsCurArr[i],
							year:retainedProfitsLesArr[i]
						}
						this.retainedProfitsArr.push(obj);
					}
					
					//每股收益
					var earningsArr = ["五、每股收益：","（一）基本每股收益","（二）稀释每股收益"]
					
					//本期金额
					var earningsCurArr = [res.msg.sheet[0].currentEarningsPerShare,res.msg.sheet[0].currentBasicEps,res.msg.sheet[0].currentDilutedEps];
					
					//本年金额
					var earningsLesArr = [res.msg.sheet[0].yearEarningsPerShare,res.msg.sheet[0].yearBasicEps,res.msg.sheet[0].yearDilutedEps];
					//循环添加值
					for(var i=0;i<earningsArr.length;i++){
						var obj = {
							name:earningsArr[i],
							cur:earningsCurArr[i],
							year:earningsLesArr[i]
						}
						this.earningsArr.push(obj);
					}
				})
				.catch((error)=>{
					this.noBalanceData = false;
					document.getElementsByTagName('body')[0].style="overflow:hidden";
					this.operationRevenueArr = [];
					this.operatingProfitArr = [];
					this.totalProfitArr = [];
					this.retainedProfitsArr = [];
					this.earningsArr = [];
				})
		    },
		    // 格式化数字为带两位小数的金额 
		    initNumberA(val) {
		    	for(var i = 0;i<val.length;i++){
					if(val[i].cur === null){
						val[i].cur = 0+'.00';
						if(val[i].year === null){
							val[i].year = 0+'.00';
						}else{
							val[i].year = Number(val[i].year).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
						}
					}else{
						
						val[i].cur = Number(val[i].cur).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
						if(val[i].year === null){
							val[i].year = 0+'.00';
						}else{
							val[i].year = Number(val[i].year).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
						}
					}
				}
		    	return val;
		    },
			toShow(val){
				if(val == 'floating'){
					//控制流动资金
					this.isShowFloating = !this.isShowFloating;
					this.isShowNonLiquid = !this.isShowFloating;
				}else if(val == 'nonLiquid'){
					//控制非流动资金
					this.isShowNonLiquid = !this.isShowNonLiquid;
					this.isShowFloating = !this.isShowNonLiquid;
				}else if(val == 'liabilities'){
					//控制流动负债
					//控制上一个要为false
					this.isShowShareholder = false;
					//展开/收缩当前
					this.isShowLiabilities = !this.isShowLiabilities;
					//控制下一个搜索/展开
					this.isShowNonLiabilities = !this.isShowLiabilities;
				}else if(val == 'nonLiabilities'){
					//控制非流动负债
					this.isShowLiabilities = false;
					this.isShowNonLiabilities = !this.isShowNonLiabilities;
					this.isShowShareholder = !this.isShowNonLiabilities;
				}else if(val == 'shareholder'){
					//控制所有者权益（或股东权益）
					this.isShowNonLiabilities = false;
					this.isShowShareholder = !this.isShowShareholder;
					this.isShowLiabilities = !this.isShowShareholder;
				}
			},
			goBack(){
				this.$router.go(-1)
			},
			//第一层tab选择
			toChooseTab(val){
				this.currentIndex = val;
			},
			
			
			//选择日期
			toChoose(){
				//显示日期
				this.isShowDate = true;
				//记录当前时间
				this.oldVal = this.value;
				//记录当前年对应数组的下标
				this.oldIndex = this.yearForm[0].values.indexOf(this.oldVal.substring(0,4).toString());
				//记录当前月对应数组的下标
				this.oldMonIndex = this.yearForm[1].values.indexOf(this.oldVal.substring(7,9).toString());
			},
			//取消
			toCancel(){
				//关闭日期
				this.isShowDate = false;
				//将顶部时间重置
				this.value = this.oldVal;
				this.onValuesChange(this.picker,this.values,true)
			},
			//确定
			toEnter(){
				this.isShowDate = false;
				
				if(this.currentIndex == 0){
					this.nonLiabilitiesArr = [];
					this.floatingCapitalArr = [];
					this.nonLiquidAssetArr = [];
					this.floatingLiabilitiesArr = [];
					this.shareholderArr = [];
					
					let params = {
			    		params:{
			    			period:this.valueTime,
			    			accountID:this.id
			    		}
			    	}
					this.getReportData(params);
				}else if(this.currentIndex == 1){
					this.operationRevenueArr = [];
					this.operatingProfitArr = [];
					this.totalProfitArr = [];
					this.retainedProfitsArr = [];
					this.earningsArr = [];
					this.getIncomeData();
					
				}
			},
 			//弹出框日期选择
			onValuesChange(picker,values,isTrue){
				this.picker = picker;
				this.values = values;
				if(!values[0]){
	               this.$nextTick(()=>{
	                    if(this.isFirstSelect){
	                    	//默认年
	                    	var yearLen = this.yearForm[0].values.length-1;
	                    	//默认月（注意，字符串和数字的类型）
	                    	var monLen = new Date().getMonth()+1;
	                    	monLen = monLen.toString().length==1 ? '0'+monLen : monLen.toString();
	                    	monLen = this.yearForm[1].values.indexOf(monLen);
	                         // 赋默认值     setValues(第一个参数对应第一个slot的默认值，第二个参数对应第二个slot的默认值)
	                         picker.setValues([this.yearForm[0].values[yearLen],this.yearForm[1].values[monLen]])
	                    }else{
	                        	
	                    }
	               });
	            }else{
	            	//设置顶部时间
	            	this.value = values[0]+' 年 '+values[1]+' 月';
	            	//是否点击取消
	            	if(isTrue){
	            		//重置时间
	            		picker.setValues([this.yearForm[0].values[this.oldIndex],this.yearForm[1].values[this.oldMonIndex]])
	            	}
	            	
	            }
			}
		},
		beforeDestroy(){
			    document.getElementsByTagName('body')[0].style="overflow:visible"; 
		}
	}
</script>

<style lang="less" type="stylesheet/css" scoped>
	@import "./report.less";
	@import "../../common/index.less";
</style>