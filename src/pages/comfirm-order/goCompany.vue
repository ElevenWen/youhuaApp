<template>
  <div id="goCompany">
    <!-- 选择公司 -->
		<div id="companyDetailWrap">
			<div class="popularity_return">
			  <span  class="return  promotion_top_right" @touchend.stop.prevent="goBack()"></span>
			  <!-- 人气专场 -->
			  <span class="title_name">选择公司</span>
			</div>
			<!-- 显示公司列表 -->
			<ul class="companyWrap"  v-show=" !showBank && !showCompany "> 
			  <li v-for="(items ,index) in  companyList"  @click.prevent.stop="checkComanyFn(items,index)">
			  	{{items.Name}} 
			  	 <!-- ==={{companyList}} -->
			  	<i :class="{cIcon:index==check,'':index!=check}"></i>
			  </li>
			</ul>
			<!-- 公司列表为空 显示空画面 -->
			<div class="nullCart" style="" v-if="companyList.length === 0 "> 
				<img :src="imagesWrap"   alt="" width="170"  height="150"/>
				<p  class="cf6">您还未添加公司</p> 
			</div>
		</div>
		<!-- /选择公司 -->
		<!-- 选择银行 -->
		<div id="bankDetailWrap" v-show="showBank">
			<div class="popularity_return">
			   <span  class="return  promotion_top_right"  @click="formBackGo()" ></span>
			  <span class="title_name">选择银行</span> 
			</div>
			<div :style="srollHeight" class="mainWrap">
				<ul class="companyWrap">
					<li v-for="(items,index) in bankArr" @click.prevent.stop="checkBankFn(index,items)">
						{{items.Name}}
						<i :class="{cIcon:index == checkBankIndex}"></i>
					</li>
				</ul>
			</div>
		</div>
		<!-- /选择银行 -->
  </div>
</template>

<script>

import Vue  from 'vue';
import tool from "../../util/tool";
import { mapState,mapActions} from 'vuex';
// import mapAdd  from '@/pages/mine/mapAdd';

export default {
	data(){
		return {
			title:"发票须知",
			showCompany:false, //显示公司
			showCompanyBtn:true,//新增 按钮 显示新增公司 
			showBank:false,//显示银行 
			checkBankIndex:0,//默认选择中国银行索引
			companyName :'',
			check:99,
			popupVisible:false,
			popupVisible2:false,
			imagesWrap:[require('@/assets/images/mine/nullCart@3x.png')],
		}
	},
	components:{
	    // mapAdd:mapAdd
	},
	beforeRouteEnter (to, from, next) {	  		
	    next(vm => {    
			let active = vm.$router.currentRoute.query.active;  
			//后台默认可以用的银行 ==正式
    			  vm.request_bank_gocompany();
  			 // 后台默认可用的银行 ==测试
			 // vm.request_bank_gocompany_test();
			 
	    	// 初始化 公司列表  	
			// 解决 组建  银行  显示和隐藏问题
			if(active == "bank" ){  
	      		//隐藏 新增按钮
				vm.showBank =true;
				//从本地获取 用户目前选择公司 若不存在返回false  解决刷新当前页面问题
	  			let localCompany =  tool.loadFromLocal("_SETBILL",vm.getToken(),"1",false);
	  			if(!localCompany){
	  				//若没数据则返回 
	  				return
	  			}
	  			//console.log("银行",localCompany.params.BankName, vm.bankArr )
	  			for(var index in vm.bankArr){
	  				if(vm.bankArr[index] == localCompany.params.BankName){
	  					// 找到匹配银行 
	  					vm.checkBankIndex = index; 
	  				}
	  			}

			}else if(active == "goCompany" ){
				vm.showBank = false;
				////console.log("router里面的index",vm._tabCurrentIndex);
				//读取当前本地索引
	  			var Type = tool.loadFromLocal("_SETBILL", vm.getToken(),  "Type",false) ;
	  			 
				//从本地获取 用户目前选择公司 若不存在返回false  解决刷新当前页面问题
	  			var localCompany =  tool.loadFromLocal("_SETBILL",vm.getToken(),Type,false);

	  			////console.log("本地索引>>==",Type);
	  			////console.log(">>>>>本地数据",localCompany)
	  			////console.log(">>本地ALL数据",  tool.loadFromLocal("_SETBILL",vm.getToken(),"ALL",false))
	  			if(!localCompany){
	  				//若没数据则返回 
	  				return
	  			} 
	  			////console.log("???????",localCompany);

	  			for(var p in localCompany){
	  				//获取当前公司名称 
	  				 
	  				var nowCompany ={
	  					Name: localCompany[p].Name
	  				};
	  			}  

	  			vm.request_data_goCompany().then((res)=>{
	  			//	//console.log(vm.companyList,"请求公司列白哦");
	  				for(var indexTemp in vm.companyList){ 
		  				////console.log("2===", vm.companyList[indexTemp].Type,nowCompany.Type)
		  				// if(vm.companyList[indexTemp].Name == nowCompany.Name && vm.companyList[indexTemp].Type == nowCompany.Type ){
		  			    //根据名字 唯一判断
		  				if(vm.companyList[indexTemp].Name == nowCompany.Name){
		  					 
		  					//给对应的公司 打上钩
		  					vm.check  = indexTemp;
		  					break;
		  				}
		  			}
	  			})

	  			
			} 
	    });	
    },
    beforeRouteLeave(to, from, next) {
    	next()
    },
    watch:{
    },
	methods:{ 
		 
		goBack(){
			//返回	 
			this.$router.replace('/cart/comfirmOrder/setBill');
		},
		showCompanyFn(){ 
			//显示 新增公司 隐藏公司列表 且隐藏银行列表
			this.showCompany = true;
			this.showBank = false;
		},
		checkBankFn(index,items){
			//选择银行
			this.checkBankIndex = index;
 			var initBank  = tool.loadFromLocal("_SETBILL",this.getToken(),"1",false);
 		//	//console.log("银行中",initBank)
 			let tempBank = initBank;
 			tempBank.params.BankName  = items.Name; 
		//	//console.log("银行中..",tempBank)
			 //把本地数据取出 重新赋值
			 tool.saveToLocal("_SETBILL",this.getToken(),'1',tempBank) 
			// //console.log(tool.loadFromLocal("_SETBILL",this.getToken(),"1",false))
			// 后退
			//this.$router.go(-1);   
			this.$router.replace("/cart/comfirmOrder/setBill");
			 
		},
		checkComanyFn(items,index){
			//选择公司
			this.check = index;
 		 	//这里需要改变key
 		 	let itemsTemp = {
 		 		Name:items.Name,
		      	TaxIdNumber:items.SocialCreditCode,
		      	Address:items.CompanyAddress,
		      	Phone:items.Phone,
		      	BankName:items.BankName,
		      	BankAccount:items.BankAccount, 
 		 	}
 
       		//获取本地最新  索引 
            var Type = this.commonTool.loadFromLocal("_SETBILL",this.getToken(), "Type" ,false)  
            let paramsObj = {
            	params:itemsTemp
            }

            //把对应 索引的公司列表更新
       		var data = tool.loadFromLocal("_SETBILL", this.getToken(),Type,false) ;
       		//本地同步更新选择的公司列表
       		tool.saveToLocal("_SETBILL",this.getToken(),Type ,paramsObj) 
       		var data222 = tool.loadFromLocal("_SETBILL", this.getToken(),Type,false) ;
       		//返回setBill 页面
			this.$router.replace('/cart/comfirmOrder/setBill');
		},
		formBackGo(){
			// 从选择银行 返回
			this.showBank = !this.showBank;
			//若url带有active 参数 则go(-1) 否则判断此次点击来源url为  我的-公司 菜单
			////console.log("this.$router",this.$router )
			if(this.$router.currentRoute.query.active =="bank"  ){
				//返回setBill 页面
				//console.log('sasasasa') 
 				this.$router.replace('/cart/comfirmOrder/setBill');
			}
			
		},
		addComBtn(){
			//
			this.showCompany = true;
			 
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
   	 
        ...mapActions(
        	"comfirmOrder",["request_data_goCompany",'request_bank_gocompany_test','request_bank_gocompany'] 
        ),
 
	},
	watch: {
  
   }, 
	computed:{
		srollHeight(){
			var heightObj = window.screen.height || document.documentElement.clientHeight;
		//	//console.log(heightObj - 44 -12);
			var obj  = {height:(heightObj - 44 -12)  +"px" , background:"#fff" };
			return obj;
		},
		...mapState( 
			"comfirmOrder",["payMethods",'bankArr',"currentIndex","companyList","tabCurrentIndex"] 
		 ),
  		_tabCurrentIndex:{
  			get:function(){
  				// //console.log("thithis.companyListthis.companyListthis.companyLists.companyList",this.tabCurrentIndex);
  				if(this.tabCurrentIndex == undefined){
  					var loacaltabIndex = tool.loadFromLocal("_SETBILL","tabBtn",'tabIndex',false); 
  						// //console.log("loacaltabIndex",loacaltabIndex);
 					loacaltabIndex == false?loacaltabIndex=0:loacaltabIndex=loacaltabIndex;
 					// //console.log( "loacaltabIndex",loacaltabIndex );
  					return loacaltabIndex;
  				}
  				return this.tabCurrentIndex;
  			},
  			set:function(){

  			}
  		}
	}
}
 

</script>

<style lang="less" type="stylesheet/css" scoped>
	@import "../../common/index.less";
	#goCompany{
     height: 100%;
     padding-top:0;
     // height: 22.43243243243243rem;
     background: #EFEFF4;
}
 #companyDetailWrap{
     padding:0.1px;
}
 //header Bar 
 .popularity_return {
     position: fixed;
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
     margin-top: 1.466667rem;
     background: #fff;
     li{
         position:relative;
         height:1.3783783783783783rem ;
         line-height: 1.3513513513513513rem;
         .border-1pxB(#EBE5E1);
		 padding:0 0.35135135135135137rem;
		 font-size: .4rem;
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
 //选择公司为空 
 .nullCart {
     height: 16.83783783783784rem;
     padding-top: 1.1891891891891893rem;
     text-align: center;
     background: #fff;
     >img {
         margin-top: 1.5135135135135136rem;
         margin-bottom: 0.6756756756756757rem;
    }
     >p {
         margin-bottom: 0.6756756756756757rem;
         font-size: 0.32432432432432434rem;
    }
     >span {
         font-size: 0.35135135135135137rem;
         display: inline-block;
         background: #fff;
         height: 0.7297297297297297rem;
         width: 1.9189189189189189rem;
         line-height: 0.6756756756756757rem;
         .border-1px(#FA2802);
    }
}
 .noticeWrap{
     padding:0.24324324324324326rem 0.32432432432432434rem 0rem;
     .c(#FF6767);
     line-height: 0.4594594594594595rem;
}
 .orderBtn{
     background: #efeff4;
     font-size: 0.43243243243243246rem;
     span{
         display: inline-block;
         width:9.08108108108108rem;
         height: 1.135135135135135rem;
         line-height: 1.135135135135135rem;
         text-align: center;
         .c(#fff);
         background: linear-gradient(to right, #ff7600, #fd6701, #FA5102);
         margin:0.8108108108108109rem 0 0 0.5405405405405406rem ;
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
     margin-top: 1.5135135135135136rem;
}
 
		
</style>
