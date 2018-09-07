<template>
	<div id="setBill">
		<div class="popularity_return">  
           <span  class="return  promotion_top_right"  @click="goBack()"></span>
			<!-- 人气专场 -->
		   <span class="title_name">{{title}}</span>
           <span class="detail" v-if="0 == showIndex" @click="submitFn0">保存</span>
           <span class="detail" v-if="1 == showIndex" @click="submitFn1">保存</span>
           <span class="detail" v-if="2 == showIndex" @click="submitFn2">保存</span>
		</div>
		
		<div class="billTypeWrap">
			<div  class="title"><span>发票类型（电子票）</span></div>
			<div class="billType">
				<span v-for=" (value,index)  in  billType" @click="changeTab(index,value)" :class=" {'active':index == showIndex}" :key="index">{{value}}</span>
			</div>
			<div  class="other">
				电子发票与纸质发票具有同等法律效力，可支持报销入账。
			</div>
		</div>
		<!-- tab切换 -->
		<div class="tabContent"  >
			<div class="generalWtap"  v-show="0 == showIndex">
				<ul class="general">
					   <form @submit.prevent="submitFn0">  
							<li class="items"  >
								<input placeholder="请输入公司名称" name="Name" v-model="inputtext0.Name"   @blur="verifyC(inputtext0.Name)"/>
								<i class="gIcon"@touchend.stop.prevent ="goCompany('0',inputtext0,'goCompany')"></i>
							</li>
							<li class="items"  >
								<input placeholder="请输入税号" name="TaxIdNumber" v-model="inputtext0.TaxIdNumber"  @blur="verifyT(inputtext0.TaxIdNumber)" />
							</li>
						<!-- <div class="orderBtn"><input type="submit" value="确定"></div>    -->
					</form>
				</ul>
			</div>
			<div class="generalWtap"  v-show="1 == showIndex">
				<ul class="general">
					   <form @submit.prevent="submitFn1">  
							<li class="items" >
								<input placeholder="请输入公司名称" name="Name" v-model="inputtext1.Name"  @blur="verifyC(inputtext1.Name)" />
								<i class="gIcon" @touchend.stop.prevent="goCompany('1',inputtext1,'goCompany')"></i>
							</li>
							<li class="items"  >
								<input placeholder="请输入税号" name="TaxIdNumber" v-model="inputtext1.TaxIdNumber"  @blur="verifyT(inputtext1.TaxIdNumber)" />
							</li>
							<li class="items" >
								<input placeholder="请输入地址" name="Address" v-model="inputtext1.Address"  @blur="verifyA(inputtext1.Address)"/>  
							</li>
							<li class="items" >
								<input placeholder="请输入电话" name="Phone" v-model="inputtext1.Phone" @blur="verifyTP(inputtext1.Phone)"/> 
							</li>
							<li class="items" >
								<input placeholder="请输入开户行" name="BankName" v-model="inputtext1.BankName"  @blur="verifyB(inputtext1.BankName)" /> 
								<i class="gIcon" @touchend.stop.prevent="goCompany('1',inputtext1,'bank')"></i>
							</li>
							<li class="items"  >
								<input placeholder="请输入账号" name="BankAccount" v-model="inputtext1.BankAccount" @blur="verifyZ(inputtext1.BankAccount)"/>
							</li>		
						<!-- <div class="orderBtn"><input type="submit"  value="确定"></div>    -->
					</form>
				</ul>
			</div>
			<div class="generalWtap"  v-show="2 == showIndex">
				<ul class="general">
					   <form @submit.prevent="submitFn2">  
							<li class="items" >
								<input placeholder="请输入个人姓名" name="Name" v-model="inputtext2.Name"   @blur="verifyPer(inputtext2.Name)"/>
							</li>	
						<!-- <div class="orderBtn"><input type="submit"  value="确定"></div>    -->
					</form>
				</ul>
			</div>
			<div class="needKnow" @click="billDetail()">
				<span>
					<img src="../../assets/images/comfirm-order/dd-why@3x.png" alt="">
				</span>
				<span>发票须知 >></span>
			</div>
		</div>
		<!--/ tab切换 -->
		<!-- 发票弹出层 -->
		<div  class="billDetailWrap" v-show="showBillDetail">
			<div class="popularity_return">  
	           <span  class="return  promotion_top_right" @click="closeModle"></span>
			   <span class="title_name">设置发票信息</span> 
			</div>
		    <div class="contentWrap"> 
				<ul  class="content">
					<li>
						<h6>发票说明：</h6>
						<ul class="innerWrap">
							<br/>
							<li>
							1、为了保障消费者的合法权益，我司均为您开具由税务局监制印制的正规机打销售发票。
							</li>
							<li>2、发票是有效交易的重要凭据，纸质发票可作为单位报销的凭证，请妥善保管。</li>
							<li>3、发票金额为您购买商品实际的付款金额，使用积分等方式支付的部分不在发票金额中体现。</li>
							<li>4、发票内容默认为“招聘信息服务费”，同时不支持修改发票内容，给您带来不便请您谅解。</li>
						</ul>  
					</li>
				 	<li >
					    <h6>发票开具办法：</h6>
					    <h6>一、 普通发票 ： </h6>
					    <p>
					      个人及不具有一般纳税人资格的企业客户，均开具普通发票，请在会员服务页面，在“发我的订单—付款信息”，选择“需要普通发票”，按提示填写公司名称等信息，发票将会采用快递方式送达，发票信息与您输入的信息一致的情况下，发票一经开出，恕不退换。
					    </p>
				    </li>
				    <li>
					     <h6> 二、增值税专用发票：</h6>
					     <ul class="innerWrap">
						      <li> 1、原则上增值税一般纳税人才能开具增值税专用发票；政府机关、学校等非一般纳税人，我司将依据税法相关规定，给您开具普通机打销售发票。</li>
						      <li> 2、请在会员服务页面，在“发我的订单—付款信息”，选择“需要增值税专用发票”，并填写相关开票信息，按照《开具增值税专用发票具体操作指导》进行增值税专用发票开具的申请，请务必确保相关信息的真实准确性，我司将根据您所提供的信息进行增值税专用发票的开具，如因填写失误造成发票开具错误，将会导致贵公司不能及时入账抵扣，带来税金损失。</li>
						      <li> 3、请保您所填写的开票信息与贵司税务登记证信息一致。完成付款订单开通后，我们原则上会在2到3个工作日内，将增值税发票开出并邮寄 。</li>
						      <li>
						        4、增值税发票开具时限：请您准确填写发票收件人姓名和发票收件人电话，我司人员会在开票信息审核通过后的2-3个工作日内，为您单独寄送增值税专用发票，请注意查收，如在开票信息审核通过后7个工作日内仍未收到寄送的增值税专用发票，请及时致电我司招聘顾问或客服人员查询。
						      </li>
				     	 </ul>
				 	</li>
					<li>
					     <h6> 三、开具增值税专用发票具体操作指导：</h6>
					     <ul class="innerWrap">
						      <li> 开具增值税专用发票的企业客户在订单开通后，请将以下信息在网站后台进行登记，我司人员会在您的款项到账且开票信息审核通过后的2-3个工作日内按您填写的邮寄地址为您邮寄增值税专用发票。 温馨提示： </li>
						      <p class="detailWrap">
						      	（1）单位名称（必须是您公司营业执照上的全称）； </br>（2）纳税人识别号（必须是您公司《税务登记证》的编号，请仔细核对后输入）； </br>（3）注册地址（必须是您公司营业执照上的注册地址）； </br>（4）注册电话（请提供能与您公司保持联系的有效电话）； </br>（5）开户银行（必须是您公司银行开户许可证或者税务局备案的开户银行）； </br>（6）开户账号（必须是您公司开户许可证或者税务局备案的银行账号）； </br>
							      （7）网站根据您输入的信息开具增值税专用发票，如影响认证抵扣，网站不会受理重新开具增值税专用发票的要求，请务必认真校对所填开票信息； </br>
							      （8）发票收件人电话请尽量填写可以联系到您的手机号码，避免使用公司号码，以免影响您收票的时效性。 </br>
							      （9）请您填写正确的发票邮寄地址，保证发票能够准确送达。 </br>如有相关发票开具问题，请致电我司客服热线400-626-5151，我司人员将竭诚为您服务！ </br>
						      </p> 
					     </ul>
				    </li>
				</ul>
		    </div>   	
	    </div>
	</div> 

</template>




<script>

import { Indicator,Toast } from 'mint-ui';
import tool from "../../util/tool";
import headerTitle from '../components/header-title';
import getData	 from '../../vuex/getData';
import { mapState,mapActions,mapGetters} from 'vuex';

//自定义规则
 
export default {
  data() {
    return { 

      showHtml:false, 	
      title:"设置发票信息",
      billType:["增值税普通","增值税专用","个人"],
      showBillDetail:false, 
      showIndex:0,//tab选项卡索引 默认0
      inputtext0:{
	      	Name:"",
	      	TaxIdNumber:"",
      },
       inputtext1:{
	      	Name:"",
	      	TaxIdNumber:"",
	      	Address:"",
	      	Phone:"",
	      	BankName:"",
	      	BankAccount:"",
      },
       inputtext2:{
	      	Name:"",
      },
      isCompanyName:false,
      isTaxNumber:false,
      isAddress:false,
      isPhone:false,
      isBankName:false,
      isBankAccount:false,
    }
  }, 
  components: {
     headerTitle,
  },
  beforeRouteEnter(to,from,next){ 
  	if(from.name == "comfirmOrder"){
  		next((vm)=>{
			//来自comfirmOder初始化发票数据  
		 	vm.initLacal(); 
  		})
  	}else if(from.name == "goCompany2"){
  		next((vm)=>{
			//goCompany2  从本地读取
			vm.secondLacal(); 
  		})
  	}else{
  		//刷新当前页面重新请求数据 解决白屏
  		next((vm)=>{
			//来自comfirmOder初始化发票数据  
		 	vm.initLacal(); 
  		})
  	}
  	
  }, 

  created(){  
  },  
  mounted(){
  },
  update(){ 
  },
  methods: {
	  	...mapActions(
	  	"comfirmOrder",{ 
	  		 "request_data_goCompany":"request_data_goCompany",
	  		 "recently_billData":"recently_billData"		
	  		}
	  	 ),
	  	getTokenFn(){
	  		  var mes = this.commonTool.loadFromLocal('login_user_id', 'login_user_id', 'login_user_id', false).Token ;
	  		  return mes;
	  	},
	  	//验证公司名称
	  	verifyC(val){
			    if(!val.trim()){
					return;
				}
	  	 		var status = this.commonTool.regularJudgement("companyAddress",val);
	  	 		return status
				if (status) {
					this.isCompanyName = true;
				}else{
					this.isCompanyName = false;
				}
	  	},
	  	//验证税号
	  	verifyT(val){
			  if(!val.trim()){
					return;
				}
	  	 	var status = this.commonTool.regularJudgement("taxNumber",val);
	  	 	return status
			if (status) {
				this.isTaxNumber = true;
			}else{
				this.isTaxNumber = false;
			}
	  	},
	    //验证地址
	  	verifyA(val){
			  if(!val.trim()){
					return;
				}
	  	 	var status = this.commonTool.regularJudgement("companyAddress",val);
	  	 	return status
			if (status) {
				this.isAddress = true;
			}else{
				this.isAddress = false;
			}
	    },
	  	//验证电话
	  	verifyTP(val){
			  if(!val.trim()){
					return;
				}
	  	 	var status = this.commonTool.regularJudgement("telephone",val);
	  	 	return status
	    },
	    //验证开户行
	   	verifyB(val){
			   if(!val.trim()){
					return;
				}
			if (val) {
				return true;
				this.isBankName = true;
			}else{
				Toast({
				  message: '输入有误请重新输入', 
				  duration: 2000
				});
				return false;
			}
	  	},
	    //验证账号
	  	verifyZ(val){
			  if(!val.trim()){
					return;
				}
	  	 	var status = this.commonTool.regularJudgement("accountNumber",val);
	  	 	return status 
	    },
	    //个人姓名
	    verifyPer(val){
			if(!val.trim()){
					return;
				}
			var status = this.commonTool.regularJudgement("person",val);
	  	 	return status 
	    },
	  	initLacal(){
	  		//初始化数据  
	 		//从本地存储读取用户最近填写一次所有发票的记录   
 				// //console.log("从本地存储读取用户最近填写一次所有发票的记录",this.$router);

	 		//发起ajax 把发票所有最近使用数据push 页面
	 		this.recently_billData(this.getTokenFn()).then((res)=>{
	            if(this.recentBill == null){ 
	            }else{
	            	// //console.log( "this.recentBill",this.recentBill );
	                this.initFn(this.recentBill);  
	                let  paramsObj = {
	                	"params":this.recentBill
	                }

 					// //console.log("初始化数据",paramsObj );
	     //            //console.log(paramsObj ,"<===");
	     //            //console.log(this.recentBill.type ,"<===");  
	                //防止刷新当前页面vuex 数据丢失, 若vuex 无数据则从本地取用
	                if(this.recentBill == undefined){
	                	var paramsObj = this.commonTool.loadFromLocal("_SETBILL",this.getToken(),this.recentBill.Type,false);
	                	this.commonTool.saveToLocal("_SETBILL", this.getToken(),this.recentBill.Type ,paramsObj) 
						var  TypeTemp =  this.commonTool.loadFromLocal("_SETBILL", this.getToken(), Type,false);
	                	this.commonTool.saveToLocal("_SETBILL",this.getToken(), "Type" ,TypeTemp);
	                	// //console.log("我来看初始化字段>>>",TypeTemp);
	                	this.showIndex = TypeTemp;
	                }else{
	                	 //存入本地保持数据统一性 (数据) this.recentBill==> 发起请求后后台返回的最近所有发票使用记录
		                this.commonTool.saveToLocal("_SETBILL", this.getToken(),  this.recentBill.Type ,paramsObj) ;
		                 //存入本地保持数据统一性 (索引)
		                 this.commonTool.saveToLocal("_SETBILL",this.getToken(), "Type" ,this.recentBill.Type) ;
		                //切换tab 索引 
		  		   		this.showIndex = this.recentBill.Type;
	                } 
	            }
     		})  
	  	},
	  	secondLacal(){
	  		//存入本地索引 和银行
	  		var  TypeTemp =  this.commonTool.loadFromLocal("_SETBILL", this.getToken(), "Type",false); 	 
        	this.showIndex = TypeTemp;
	  		var paramsObj = this.commonTool.loadFromLocal("_SETBILL",this.getToken(),TypeTemp,false);
        	// this.initFn(paramsObj.params);
        	//本地存储数据 因为和后台返回字段不一致, 使用另外的函数调用
        	 
        	this.pushGoCompanyData( TypeTemp, paramsObj.params)
	  	},
	  	initFn(data){
	  		//把数据push 到对应的tab
  		    var init = (data)=>{
	  		    let type = data.Type;
	  		    // //console.log("initFn", data)
	  		    // //console.log("dataType",type )
	 			switch(Number(type)){
	 			 	case 0 :
	 			 		var localObj0 = data; 
	 			 		this.inputtext0 = {
					      	Name:localObj0.Name,
					      	TaxIdNumber:localObj0.TaxIdNumber,
				         }
	 			 	break;
	 			 	case 1:
	 			 		var localObj1 = data; 
		 			 	this.inputtext1 = {
					      	Name:localObj1.Name,
					      	TaxIdNumber:localObj1.TaxIdNumber,
					      	Address:localObj1.Address,
					      	Phone:localObj1.Phone,
					      	BankName:localObj1.BankName,
					      	BankAccount:localObj1.BankAccount,
				       }
	 			 	break;
	 			 	case 2:
	 			 		var localObj2 = data;
	 			 		this.inputtext2 = {
						      Name:localObj2.Name,
					      }
	 			 	break;
	 			} 
		    }
		   return init(data) ;
	  	},
	  	pushGoCompanyData(type,data){
	  		//增加后台 字段名字刷选
	  		// //console.log(type,"|||||<<<<<type" );
	  		// //console.log(data,"|||||<<<<<data" );
	  		switch(Number(type)){
 			 	case 0 :
 			 		var localObj0 = data;
 			 		// //console.log(localObj0.Name) 
 			 		this.inputtext0 = {
				      	Name:localObj0.Name,
				      	TaxIdNumber:localObj0.TaxIdNumber,
			         }
 			 	break;
 			 	case 1:
 			 		var localObj1 = data;
	 			 	this.inputtext1 = {
				      	Name:localObj1.Name,
				      	TaxIdNumber:localObj1.TaxIdNumber,//社会信用代码就是税号
				      	Address:localObj1.Address,
				      	Phone:localObj1.Phone,
				      	BankName:localObj1.BankName,
				      	BankAccount:localObj1.BankAccount,
			       }
 			 	break;
 			 	case 2:
 			 		var localObj2 = data;
 			 		this.inputtext2 = {
					      Name:localObj2.Name,
				      }
 			 	break;
 			} 

	  	},
	    hotAll() {
	      this.$router.push("/home/popularity");
	    }, 
	    changeTab(index,value){
	    	//切换tab选项卡
	    	//showIndex  
	        var  paramsObj = { 
	        	params :{
	        		Token:this.getTokenFn(),
	              	Type:index,
	        	}
	        } 
	 		//发起ajax 把当前tab选项对应的数据push 页面  

	 		// //console.log("改变I选项卡",paramsObj )
	 		this.recently_billData(paramsObj).then((res)=>{
	 			//后台吴数据 则不保存本地
	            if(this.recentBill == null){ 
	            }else{
	            	// //console.log( "this.recentBill",this.recentBill )
	                this.initFn(this.recentBill);  

	                let  paramsObjTemp = {
	                	"params":paramsObj.params
	                }
	                // //console.log(paramsObjTemp.params.Type ,"<===");
	                //存入本地保持数据统一性(内容)
	                this.commonTool.saveToLocal("_SETBILL",this.getToken(),  paramsObjTemp.params.Type ,paramsObjTemp);
	                 //存入本地保持数据统一性 (索引)
	                 if(this.recentBill.Type == undefined ||this.recentBill.Type == null || this.recentBill.Type == "" ){
	                 	//若用户本地没有数据则默认 索引为0
	                 	this.commonTool.saveToLocal("_SETBILL", this.getToken(), "Type" ,0) ;
	                 }else{
	                 	 this.commonTool.saveToLocal("_SETBILL", this.getToken(), "Type" ,this.recentBill.Type);  
	                 } 
	                 //初始化调用后台的值
	                this.initFn(this.recentBill); 
	            }
	                this.showIndex  =  index;
     		}) 
		},
		goBack(){ 
			//父亲 显示 
			this.$emit("showProps",true );
			this.$router.go(-1);
			// this.$router.replace('/cart/comfirmOrder');
		},
		billDetail(){
			//弹出发票须知
			 
			this.showBillDetail= true;
		},
		closeModle(){
			//关闭 弹出层
			this.showBillDetail = false;
		},
		submitFn0(){ 
			//增值税普通-电子票
			if( this.verifyC(this.inputtext0.Name) && this.verifyT(this.inputtext0.TaxIdNumber)   ){
				var paramsObj = {
				"params":	{
					Name:this.inputtext0.Name,
			      	TaxIdNumber:this.inputtext0.TaxIdNumber,
			      	Address:"",
			      	Phone:"",
			      	BankName:"",
			      	BankAccount:"",
			      	Type:"0",
					//customerId :"e0d3eed3-819f-4824-8be6-1be66d86e029",
					Token:this.getTokenFn()
					}
				}  
				// //console.log("|||",paramsObj.params);
	 			// //console.log("dddddd===>",paramsObj.params["Name"]);
	 			// //console.log("AAAA==>",paramsObj.params["TaxIdNumber"]);
				/*验证完毕  发起ajax	 
				* 要求
				* 1 数据保存本地
				* 2 后台接受数据后 自动跳转前一个页面其提示成功
				*/
				//头后台数据 发票保存（新增或修改）
		        this.$store.dispatch("comfirmOrder/addorEdite_billdata_comfirmorder",paramsObj).then(()=>{
	    		   	 //本地保存最近使用发票记录 方便在comfrim-order.vue 调用 
 					//存入本地保持数据统一性(内容)
	                this.commonTool.saveToLocal("_SETBILL", this.getToken(),"0" ,paramsObj);
	                //存入本地保持数据统一性 (索引)
	                this.commonTool.saveToLocal("_SETBILL", this.getToken(), "Type" ,'0') ;
	                //返回上个页面
             	    this.$router.go(-1);
		        }); 
			}
			
	      
		},
		submitFn1(){ 
			if( this.verifyC(this.inputtext1.Name) && this.verifyT(this.inputtext1.TaxIdNumber) && this.verifyA(this.inputtext1.Address) && this.verifyTP(this.inputtext1.Phone) && this.verifyB(this.inputtext1.BankName) && this.verifyZ(this.inputtext1.BankAccount)  ){
				//增值税专用-电子票
				var paramsObj = {
					"params":	{
						Name:this.inputtext1.Name,
				      	TaxIdNumber:this.inputtext1.TaxIdNumber,
				      	Address:this.inputtext1.Address,
				      	Phone:this.inputtext1.Phone,
				      	BankName:this.inputtext1.BankName,
				      	BankAccount:this.inputtext1.BankAccount,
				      	Type:"1",
						//customerId :"e0d3eed3-819f-4824-8be6-1be66d86e029",
						Token:this.getTokenFn()
					}
				}   
				//验证完毕 ajax	
				 this.$store.dispatch("comfirmOrder/addorEdite_billdata_comfirmorder",paramsObj).then(()=>{
		       		//本地保存最近使用发票记录 方便在comfrim-order.vue 调用
		       	    //存入本地保持数据统一性(内容)
	                this.commonTool.saveToLocal("_SETBILL", this.getToken(), "1" ,paramsObj);
	                // //console.log("??",this.commonTool.loadFromLocal("_SETBILL", this.getToken(), "1" ,false)  )
	                //存入本地保持数据统一性 (索引)
	                this.commonTool.saveToLocal("_SETBILL", this.getToken(), "Type" ,'1') ;
	                //返回上个页面
	                this.$router.go(-1);
		       	});
	      	}
		},
		submitFn2(){ 
			//个人 电子票
			if( this.verifyPer(this.inputtext2.Name)    ){ 
				var paramsObj = {
					"params":	{
						Name:this.inputtext2.Name,
				      	TaxIdNumber:"",
				      	Address:"",
				      	Phone:"",
				      	BankName:"",
				      	BankAccount:"",
				      	Type:"2",
						//customerId :"e0d3eed3-819f-4824-8be6-1be66d86e029",
						Token:this.getTokenFn()
					}
				}    
				//验证完毕 ajax	
				this.$store.dispatch("comfirmOrder/addorEdite_billdata_comfirmorder",paramsObj).then(()=>{
		       		//存入本地保持数据统一性(内容)
	                this.commonTool.saveToLocal("_SETBILL", this.getToken(), "2" ,paramsObj);
	                //存入本地保持数据统一性 (索引)
	                this.commonTool.saveToLocal("_SETBILL", this.getToken(), "Type" ,'2') ;
	                //返回上个页面
             	    this.$router.go(-1);
		        }); 
			} 
		},
		goCompany(Type,companyName,data){ 
			//bank 表示进入 银行列表
			//goCompany 进入  公司列表  
			/***
			*common 普通0  exclusive 专用1  person 个人2
			***/
			// //console.log(Type,  companyName,"==",  data  );
			// 给对象添加索引
			companyName.Type = Type;
			//本次存储公司名称  __navigatorName__,id, key, value
			var localObj = {
				"params":companyName
			}
			var params = {
					Token:this.getTokenFn()
			}   
			//tool.saveToLocal("_SETBILL","e0d3eed3-819f-4824-8be6-1be66d86e029",tab,localObj); 
			//打开公司可选列表  -- 通过传递参数设置 银行列表的隐藏和显示 
			// if(data == "goCompany"){
			// 	//同步更新公司列表
			if(data == "goCompany"){
				// this.request_data_goCompany().then((res)=>{
					//存入本地保持数据统一性 (索引)
					this.commonTool.saveToLocal("_SETBILL",this.getTokenFn(), "Type" ,Type);  
					//本地保存保持数据统一性 (内容)
	       	        this.commonTool.saveToLocal("_SETBILL",this.getTokenFn(),Type,localObj);
					this.$router.replace({ path: '/comfirmOrder/goCompany',query:{'active':'goCompany'}})	;


					////console.log("查看本地所有数", this.commonTool.loadFromLocal("_SETBILL",this.getToken(),"ALL",false));
				// });
			} else if(data == "bank"){
				//存入本地保持数据统一性 (索引)
				this.commonTool.saveToLocal("_SETBILL",this.getTokenFn(), "Type" ,Type) ; 
				//本地保存保持数据统一性 (内容)
       	        this.commonTool.saveToLocal("_SETBILL",this.getTokenFn(),Type,localObj);
       	       // //console.log(  this.commonTool.loadFromLocal("_SETBILL",this.getToken(),Type,false) ,">><<<")
				this.$router.replace({ path: '/comfirmOrder/goCompany',query:{'active':'bank'}} );
			}
 		 
		},

  },
  computed:{
	...mapState( 
		"comfirmOrder",{
			"tabCurrentIndex":"tabCurrentIndex",
			"recentBill":"recentBill"
		}
	),
	
  }
}

</script>



<style lang="less" type="stylesheet/css" scoped>
   @import "../../common/index.less"; 
::-webkit-input-placeholder { /* WebKit browsers */
    color:    #999;
}
	#setBill{
	 background:#fff;
	 height: 100%;
}
#setBill input{
	font-size: 0.373333rem;
}
 .popularity_return {
     position: fixed;
     top:0;
     left:0;
     height: 1.1891891891891893rem;
     width: 100%;
     text-align: center;
     line-height: 1.162162162162162rem;
     font-size: 0.4864864864864865rem;
     color: #1F1F1F;
     border-bottom: 1px solid #EBE5E1;
     background-color: #fff;
     z-index: 999;
}
 .return{
     position: absolute;
     height:100%;
     width: 0.6486486486486487rem;
     top:0;
     left:0;
     padding-left:0.40540540540540543rem;
     .bg-image('../../assets/images/tabBar/nav_back');
     background-size: 100%;
     background-position:0.40540540540540543rem 0.1891891891891892rem;
}
 .detail{
     font-size: 0.3783783783783784rem;
     position: absolute;
     right: 0.40540540540540543rem;
     .cf6;
}
 .billTypeWrap{
     padding:0 0.32432432432432434rem;
     margin-top: 1.466667rem;
     background-color: #fff;
     .title{
		 font-size:0.4rem ;
         height: 1.135135135135135rem;
         line-height: 1.135135135135135rem;
         >i{
             float:left;
             width: 0.5405405405405406rem;
             margin-top: 0.2972972972972973rem;
             height: 0.5405405405405406rem;
             margin-right: 0.16216216216216217rem;
             .bg-image('../../assets/images/comfirm-order/payMethod');
             background-size:0.4864864864864865rem;
        }
         span{
             float:left;
        }
    }
}
 .billType{
     .cf6;
     span{
         font-size: 0.35135135135135137rem;
         margin-right:0.2702702702702703rem;
         padding: 0 0.13513513513513514rem;
         display: inline-block;
		 margin-bottom:0.2702702702702703rem;
		 width: 2.8rem;
		 height: 0.8rem;
		 font-size: 0.4rem;
		 text-align: center;
		 line-height: 0.8rem;
		 border-radius: 0.08rem;
		 background-color: #f8f8f8;
		 border: solid 1px #dddddd;
		 color: #999999;
         &:last-child{
			 margin-right:0;
			 width: 2rem;
        }
         &.active{
			 background-color: #ffebe9;
			 border: solid 1px #ff6b5f;
			 color: #ff6b5f;
        }
    }
}
 .other{
     color: #999;
     .fs12;
     padding-bottom: 0.4594594594594595rem;
     line-height: 0.40540540540540543rem;
}
/*tab选项内容*/
 .tabContent{
     overflow: hidden;
     margin-top: 0.32432432432432434rem;
     white-space: nowrap;
}
 .generalWtap{
     width: 100%;
     background:#efeff4;
}
.needKnow{
	margin-top: 0.48rem;
	margin-left: 0.333333rem;
	font-size: 0.4rem;
	color: #666;
	img{
		width: 0.546667rem;
		height: 0.546667rem;
		vertical-align: middle;
	}
}
 .general .items{
     input{
         border:none;
		 outline:none;
		 .textIndex1(5.4rem);
    }
     >span{
         margin-right:0rem;
    }
}
 .items{
     background-color: #fff;
     line-height: 1.3513513513513513rem;
     height:1.3783783783783783rem;
     padding:0 0.32432432432432434rem;
     .border-1pxB(#EBE5E1);
     >span{
         float: left;
         width: 2.4324324324324325rem;
         font-size: 0.40540540540540543rem;
         margin-right: 0.7027027027027027rem;
    }
     >input{
         float: left; 
         margin-top:0.406667rem; 
         .c(#333333);
         @media only screen and (min-device-width:8.64864864864865rem ) {
             width:4.486486486486487rem;
        }
         @media (min-device-width:10.135135135135135rem ) and (max-device-width:32.432432432432435rem ) {
             width: 5.405405405405405rem;
        }
    }
     .gIcon{
         position: absolute;
         right: 0.32432432432432434rem;
         margin-top:0.40540540540540543rem;
         .bg-image('../../assets/images/comfirm-order/dd-plus-name');
         background-size: 0.6216216216216216rem 0.6216216216216216rem;
         width: 0.6216216216216216rem;
         height: 0.6216216216216216rem;
    }
}
/*tab选项内容 END*/
 .orderBtn{
     width:100%;
     font-size: 0.43243243243243246rem;
     text-align: center;
     margin-top: 0.8108108108108109rem;
     .c(#fff);
     input{
         background: linear-gradient(to right, #ff7600, #fd6701, #FA5102);
         border:0;
         height: 1.135135135135135rem;
         line-height: 1.135135135135135rem;
         .c(#fff);
         outline: none;
         -webkit-tap-highlight-color:transparent!important;
         display: block;
         margin: 0 auto;
         width: 90%;
	}
}
 //弹出层 
 .billDetailWrap{
     position: absolute;
     top:0;
     left:0;
     background:#fff;
}
 .contentWrap{
     padding:0.3783783783783784rem;
	 line-height: 0.5405405405405406rem;
	 margin-top: 1.173333rem;
}
 .innerWrap li{
     text-indent: 0.4864864864864865rem;
}
 .content{
	 font-size: 0.333333rem;
     padding:0.1px;
     >li:nth-child(1)~li{
         margin-top: 0.6756756756756757rem;
    }
}
 li >p {
     text-indent: 0.4864864864864865rem;
}
 .detailWrap{
     padding-left: 0.4864864864864865rem;
}
 

</style>
