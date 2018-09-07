<template>
	<div id="accountBook" :class="isShow?'active':''">
		<!--头部-->
		<div class="back">
			<span class="return" @click="goBack()"></span>
			<span  @click="toChoose">{{valueTitle}}</span>
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
				<mt-picker  :visibleItemCount="visibleItemCount"   :itemHeight="itemHeight"    :slots="yearForm" @change="onValuesChange"></mt-picker>
			</div>
		</transition>
		
		<!--搜索结果候选(暂时这么处理)-->
		<div class="search-list" v-show="isShow">
			<ul class="search-record" v-show="!isShowResult">
				<li class="history">搜索历史<span @click="searchList"></span></li>
				<li v-for="data in searchRecord" @click="toChooseList(data)">{{data.subCode}}-{{data.subName}}</li>
			</ul>
			<ul class="search-result" v-show="isShowResult">
				<li v-for="data in searchResult" @click="toChooseList(data)">{{data.subCode}}-{{data.subName}}</li>
			</ul>
		</div>
		
		<div class="wrap" :class="isNoData ? 'active' : ''">
			<!--总账、明细账、余额表tab-->
			<div class="tab-forms">
				<ul>
					<li :class="currentIndex==0?'active':''" @click="toChooseTab(0,'ledger')">总账</li>
					<li :class="currentIndex==1?'active':''" @click="toChooseTab(1,'detailAccount')">明细账</li>
					<li :class="currentIndex==2?'active':''" @click="toChooseTab(2,'balance')">科目余额表</li>
				</ul>
			</div>
			
			<!--公司搜索-->
			<div class="company-search">
				<!--搜索框-->
				<div class="search">
					<div class="search-bar">
						<div></div>
						<input type="text" placeholder="搜索关键字" v-model="value" @focus="toShowSearchList" @blur="toCloseSearchList"/>
					</div>
					
					
				</div>
			</div>
			
			<!--内容-->
			<div class="content">
				
				<div class="ledger" v-show="isNoData">
					<div class="ledger-list" v-for="data in ledgerData">
						
						<div class="ledger-head">
							<span></span>
							{{data.subCode}}-{{data.subName}}
						</div>
						<!--总账、明细账-->
						<div class="ledger-content ledgerDetail" v-if="isLedger">
							<ul class="ledger-out">
								<li>
									<ul class="ledger-in">
										<li></li>
										<li>借方</li>
										<li>贷方</li>
										<li>余额</li>
									</ul>
								</li>
								<li>
									<ul class="ledger-in">
										<li>期初：</li>
										<li>{{data.initDebitBalance}}</li>
										<li>{{data.initCreditBalance}}</li>
										<li>{{data.initBlance}}</li>
									</ul>
								</li>
								<li>
									<ul class="ledger-in">
										<li>本期：</li>
										<li>{{data.currentAmountDebit}}</li>
										<li>{{data.currentAmountCredit}}</li>
										<li>{{data.totalBalance}}</li>
									</ul>
								</li>
								<li>
									<ul class="ledger-in">
										<li>本年：</li>
										<li>{{data.yearAmountDebit}}</li>
										<li>{{data.yearAmountCredit}}</li>
										<li>{{data.totalBalance}}</li>
									</ul>
								</li>
							</ul>
						</div>
						<!--科目余额表-->
						<div class="ledger-content balance" v-if="!isLedger">
							<ul class="ledger-out">
								<li>
									<ul class="ledger-in">
										<li></li>
										<li>借方</li>
										<li>贷方</li>
									</ul>
								</li>
								<li>
									<ul class="ledger-in">
										<li>期初余额：</li>
										<li>{{data.initDebitBalance}}</li>
										<li>{{data.initCreditBalance}}</li>
									</ul>
								</li>
								<li>
									<ul class="ledger-in">
										<li>本期发生额：</li>
										<li>{{data.currentAmountDebit}}</li>
										<li>{{data.currentAmountCredit}}</li>
									</ul>
								</li>
								<li>
									<ul class="ledger-in">
										<li>本年发生额：</li>
										<li>{{data.yearAmountDebit}}</li>
										<li>{{data.yearAmountCredit}}</li>
									</ul>
								</li>
								<li>
									<ul class="ledger-in">
										<li>期末余额：</li>
										<li>{{data.endingBalanceDebit}}</li>
										<li>{{data.endingBalanceCredit}}</li>
									</ul>
								</li>
							</ul>
						</div>
					</div>
				</div>
				
				<div class="cash" v-show="!isNoData">
					暂无数据
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import getData from '../../vuex/getData.js';
	import { Picker } from 'mint-ui';
	import tool from '../../util/tool'
	export default{
		data(){
			return {
				visibleItemCount:3,
				itemHeight:72,
				currentIndex:0,//第一层tab
				currentName:"ledger",//当前tab名字
				value:"",//搜索内容
				isShow:false,//搜索历史
				isShowResult:false,//搜索历史
				searchRecord:[],//搜索结果数组
				searchResult:[],//搜索结果
				isLedger:true,//是否为总账明细账
				isShowDate:false,//选择日期
				yearForm:[{
					flex: 1, 
					textAlign:'center',
					className: 'slot1', 
					values:[],
					defaultIndex:0,
					
				},{
					flex: 1, 
					textAlign:'center',
					className: 'slot2', 
					values:['01','02','03','04','05','06','07','08','09','10','11','12'],
					defaultIndex:0,
				}],//年份选择
				isFirstSelect:true,
				valueTitle:'2018 年 01 月',
				valueTime:'',
				oldVal:'',//设置日期选择器的取消功能
				oldIndex:'',//记录年下标
				oldMonIndex:'',//记录月下标
				picker:'',//记录
				values:[],
				ledgerData:[],//总账明细账数据
				id:'',//java后台需要的账套id
				isNoData:true,//是否有数据
			}
		},
		computed:{
		},
		created(){
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
			
			// 请求总账
			let cYear = new Date().getFullYear();
			let cMonth = new Date().getMonth()+1;
			cMonth = cMonth.toString().length==1 ? '0'+cMonth : cMonth.toString();
			
			let params = {
				params:{
					period:cYear + '-' + cMonth,
					accountID:this.id
				}
			}
			getData.getLedger(params)
			.then((res)=>{
				this.isNoData = true;
				this.toDeal(res.msg);
				document.getElementsByTagName('body')[0].style="overflow:visible";
			})
			.catch((error)=>{
				//console.log(error)
				this.isNoData = false;
				this.ledgerData = [];
				document.getElementsByTagName('body')[0].style="overflow:hidden";
			})
			
			
			//读取本地历史记录
			this.searchRecord = tool.readRecord(this.currentName,"");
			

			//适配不同手机的 三级 联动 
			var  dpr = document.documentElement.getAttribute('data-dpr');
			var fontSize =  document.documentElement.getAttribute('style');
			if(dpr <2){
				this.itemHeight = 36;
			}else if(dpr <=2){
				this.itemHeight = 72;
			}else{
				this.itemHeight = 108;
			}
		},
		mounted(){
 
			
			
			var timer = null;
			//在用户输入一次后和再次输入之间的时间间隔大于500ms就让第一次发送
			this.$watch('value',(newVal,oldVal)=>{
				var params = {
					params:{
						period:this.valueTime,
				        keyWord:newVal,
				        accountID:this.id
					}
		        };
		        clearTimeout(timer)
		        if(newVal.length!=0){
			        if(this.currentIndex==0){
			        	timer = setTimeout(() => {
				          	getData.getLedger(params)
				            .then((res) => {
 
				              this.isNoData = true;
				              this.isShowResult = true;
				              this.searchResult = res.msg;
				            })
				            .catch((error)=>{
								//console.log(error)
								this.isNoData = false;
							});
				        }, 500);
			        }else if(this.currentIndex==1){
			        	timer = setTimeout(() => {
				          	getData.getDetailAccount(params)
				            .then((res) => {
				              console.log(res)
				              this.isNoData = true;
				              this.isShowResult = true;
				              this.searchResult = res.msg;
				            })
				            .catch((error)=>{
								//console.log(error)
								this.isNoData = false;
							});
				        }, 500);
			        }else{
			        	timer = setTimeout(() => {
				          	getData.getBalance(params)
				            .then((res) => {

				              this.isNoData = true;
				              this.isShowResult = true;
				              this.searchResult = res.msg.subMessages;
				            })
				            .catch((error)=>{
								//console.log(error)
								this.isNoData = false;
							});
				        }, 500);
			        }
		        }else{
		        	this.isShowResult = false;
		        }
			});
			
			//监听当前tab以请求数据
			this.$watch('currentIndex',(newVal,oldVal)=>{
				//修改历史记录对应tab
				this.searchRecord = tool.readRecord(this.currentName,"");
				
				let params = {
						params:{
							period:this.valueTime,
							accountID:this.id
						}
					}
				this.ledgerData = [];
				if(newVal == 1){
						//请求明细账
						getData.getDetailAccount(params)
						.then((res)=>{
							this.toDeal(res.msg);
							this.isNoData = true;
						})
			            .catch((error)=>{
							//console.log(error)
							this.isNoData = false;
							this.ledgerData = [];
						});
						
						
				}else if(newVal == 2){
						//请求科目余额表
						getData.getBalance(params)
						.then((res)=>{
							this.toDeal(res.msg.subMessages);
							this.isNoData = true;
						})
			            .catch((error)=>{
							//console.log(error)
							this.isNoData = false;
							this.ledgerData = [];
						});
					
				}else{
						getData.getLedger(params)
						.then((res)=>{

							this.toDeal(res.msg);
							this.isNoData = true;
						})
			            .catch((error)=>{
							//console.log(error)
							this.isNoData = false;
							this.ledgerData = [];
						});
				}
			});
			
			//监听当前时间，改成后台所需形式
			this.$watch('valueTitle',(newVal,oldVal)=>{
				let year = newVal.substring(0,4);
				let month = newVal.substring(7,9);
				this.valueTime = year + '-' + month;
			});
		},
		methods:{
			goBack(){
				this.$router.go(-1)
			},
			//处理总账、明细账数据
			toDeal(val){

				this.ledgerData = val;
				for(var i=0;i<this.ledgerData.length;i++){
					//期初余额（余额）
					var initVal = this.ledgerData[i].initDebitBalance - this.ledgerData[i].initCreditBalance;

					this.ledgerData[i].initBlance = Number(initVal).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
					
					//本期合计（余额）1:借方，2：贷方
					var initVal = null;
					if(this.ledgerData[i].debitCreditDirection == 1){
						initVal = this.ledgerData[i].endingBalanceDebit - this.ledgerData[i].endingBalanceCredit;
						this.ledgerData[i].totalBalance = initVal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
					}else{
						initVal = this.ledgerData[i].endingBalanceCredit - this.ledgerData[i].endingBalanceDebit;
						this.ledgerData[i].totalBalance = initVal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
					}
					
					//期初余额(借方)
					this.ledgerData[i].initDebitBalance = Number(this.ledgerData[i].initDebitBalance).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
					//期初余额(贷方)
					this.ledgerData[i].initCreditBalance = Number(this.ledgerData[i].initCreditBalance).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
					//本期发生额(借方)
					this.ledgerData[i].currentAmountDebit = Number(this.ledgerData[i].currentAmountDebit).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
					//本期发生额(贷方)
					this.ledgerData[i].currentAmountCredit = Number(this.ledgerData[i].currentAmountCredit).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
					//本年累计发生额(借方)
					this.ledgerData[i].yearAmountDebit = Number(this.ledgerData[i].yearAmountDebit).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
					//本年累计发生额(贷方)
					this.ledgerData[i].yearAmountCredit = Number(this.ledgerData[i].yearAmountCredit).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
					//期末余额(借方)
					this.ledgerData[i].endingBalanceDebit = Number(this.ledgerData[i].endingBalanceDebit).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
					//期末余额(贷方)
					this.ledgerData[i].endingBalanceCredit = Number(this.ledgerData[i].endingBalanceCredit).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
				}

			},
			//第一层tab选择
			toChooseTab(num,val){
				this.currentIndex = num;
				this.currentName = val;
				if(num == 2){
					this.isLedger = false;
				}else{
					this.isLedger = true;
				}
			},
			//选择日期
			toChoose(){
				//显示日期
				this.isShowDate = true;
				//记录当前时间
				this.oldVal = this.valueTitle;
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
				this.valueTitle = this.oldVal;
				this.onValuesChange(this.picker,this.values,true)
			},
			//确定
			toEnter(){
				this.ledgerData = [];
				this.isShowDate = false;
				
				//选择相应时间的报表
				var params = {
					params:{
						period:this.valueTime,
						accountID:this.id
					}
				}
				if(this.currentIndex == 0){
					//总账
					getData.getLedger(params)
					.then((res)=>{
//						//console.log(res);
						this.isNoData = true;
						this.toDeal(res.msg);
					})
		            .catch((error)=>{
						//console.log(error)
						this.isNoData = false;
						this.ledgerData = [];
					});
				}else if(this.currentIndex == 1){
					//明细账
					getData.getDetailAccount(params)
					.then((res)=>{
//						//console.log(res);
						this.isNoData = true;
						this.toDeal(res.msg);
					})
		            .catch((error)=>{
						//console.log(error)
						this.isNoData = false;
						this.ledgerData = [];
					});
				}else{
					//科目余额表
					getData.getBalance(params)
					.then((res)=>{
//						//console.log(res);
						this.isNoData = true;
						this.toDeal(res.msg.subMessages);
					})
		            .catch((error)=>{
						//console.log(error)
						this.isNoData = false;
						this.toDeal(res.msg);
						this.ledgerData = [];
					});
				}
			},
//			弹出框日期选择
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
	            	this.valueTitle = values[0]+' 年 '+values[1]+' 月';
	            	//是否点击取消
	            	if(isTrue){
	            		//重置时间
	            		picker.setValues([this.yearForm[0].values[this.oldIndex],this.yearForm[1].values[this.oldMonIndex]])
	            	}
	            	
	            }
			},
			//清除历史记录
			searchList() {
				if (this.searchRecord) { 
					this.searchRecord = this.searchRecord;
					return tool.cleanSearchList(this.currentName,"","searchRecord",this);
				}; 
			},
			//搜索
//			search(){
//				if (this.value) {
//					//存入本地
//					tool.judgment(this.currentName,"",this.value,1)
//				};
//				return false;
//			},
			//获取焦点
			toShowSearchList(){
				this.isShow = true;
			},
			//失去焦点
			toCloseSearchList(){
				this.isShow = false;
			},
			toChooseList(val){
				this.value = '';
				var arr = [];
				arr.push(val)
				this.toDeal(arr);
				//存入本地
				tool.judgment(this.currentName,"",val,1);
				
				//读取本地历史记录
				this.searchRecord = tool.readRecord(this.currentName,"");
			}
		},
		beforeDestroy(){
			    document.getElementsByTagName('body')[0].style="overflow:visible"; 
		}
	}
</script>

<style lang="less" type="stylesheet/css" scoped>
	@import "../../common/index.less";
	@import "./accountBook.less";
	
</style>