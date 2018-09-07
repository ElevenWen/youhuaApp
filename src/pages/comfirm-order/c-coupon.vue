<template>
  <div id="transfer">
    <div class="popularity_return">  
       <span  class="return  promotion_top_right" @click="leave"></span>
       <span>优惠券</span>
      <!-- 人气专场 -->
      <div class="confirm" @click="toEnter">确定</div>
    </div>
   
    <div class="mainWrap"  >
    	 <ul class="itemsWrap">
    	 	<li class="items  grayBgS" v-for="(data,index) in couponData">
			    <div class="left">
    	 			<p class="price"><span>￥</span>{{data.Price}}</p>
    	 			<p class="detail">满{{data.Money}}元可用</p>
    	 		</div>
    	 		<div class="right">
    	 			<p class="condition">{{data.ProductName}}</p>
    	 			<span class="checkS" :class="{'checked':num==index }" @touchend="labelFn(data,index)"></span>
    	 			<p class="time "><strong class=" cf6 font11">{{data.ExpiryDate}}</strong></p>
    	 		</div>
    	 		<div class="items_img">
    	 			
    	 		</div>
				</li>
    	 </ul>
    </div>
    <!-- 没有优惠券的时候 -->
    <div  v-if="couponData.length == 0" class="emptyC">
        <div class="empty"></div>
        <div class="emptyWord">您还没有相关优惠卷</div>
    </div>
  </div>
</template>

<script>

import headerTitle from '../components/header-title';
import { Indicator,Toast } from 'mint-ui';
import getd from '../../vuex/getData.js';
import tool from '../../util/tool.js';
import { mapState,mapActions,mapGetters} from 'vuex';

export default {
	data(){
		return {
			title:"优惠券",
			//ab : require('@/assets/images/test.png'),
			couponData:[],//优惠券列表
			num:-1,//默认不选中
			price:"",
		}
	},
	components:{
	   headerTitle,
	},
   computed:{
    ...mapState(
      "comfirmOrder",["couponList","checkCouponPrice"]
    )
  },
   
	 created () { 
			//请求头后台数据
      let tempObj =  this.commonTool.loadFromLocal("_CART",this.getToken(),'data'); 
      // 本地获取用户之前选择数据
      var initCoupon = tool.loadFromLocal("_SETBILL","cCoupon","couponObj",false);



     //console.log("产品获取" , initCoupon)
      //从本地获取数据 判断优惠券金额
      let total  = 0;
      let _ProductIdd = [];
      tempObj.list.forEach((items,index)=>{
          if(items.Type!=1){
            total+= Number(items.Price) *  Number(items.Num);
            _ProductIdd.push(items.ProductIdd);
          }
      }) 
     //  //console.log("****",_ProductId);
    // //console.log("等等等等等等等等等等等等的",this.couponList);
     var productIdd = _ProductIdd.join("|");
    // //console.log("....",productId);
     //刷新页面 则初始化发票列表 数据    
     // 重新匹配用户上次选择项 应该根据ID 编码 
     //@productid : 套餐id 若是多个用|拼接
      var parms = { 
          total :total,
          productid : productIdd,
      }

      this.coupon_comfirmorder(parms).then((res)=>{ 
         //console.log(  '//若本地存有用户操作 数据 则自动匹配用户上次操作' )
      
          this.couponData  = this.couponList.list;
            //console.log(    this.couponData  ,'  this.couponData    this.couponData  ' )
             //console.log( initCoupon.CouponId,' initCoupon.CouponId' )
          this.couponData.forEach((items,index)=>{
            //若本地存有用户操作 数据 则自动匹配用户上次操作

            if(initCoupon){
              //console.log( items.CouponId == initCoupon.CouponId  )
              if(items.CouponId == initCoupon.CouponId  ){

                this.num = index
              } 
            }
          })  

      })

	},
  methods:{
    ...mapActions(
      "comfirmOrder",{
         "coupon_comfirmorder":"coupon_comfirmorder"
        }
    ),
    showPropsFn(childProps){
      //传值给父组件的过渡
      this.$emit("showProps",true );
    },
    labelFn(data,i){
      //选择优惠券 
    	if (this.num == i) {
    		this.num = -1;
    		this.price = "";
    	}else{
    		this.num = i;
    		this.price = data.price;
    	}

    },
    toEnter(){
      //用户点击确定 用户行为存入本地
      if(this.num<0){ 
         var couponObj = {
            "price":"-10.00",
            "index":"-99",
            "CouponId":"undefined"
          } 
          //console.log(">>>>>>>>>>>>>>>>>>")
         //console.log(  couponObj.CouponIdCouponId)
          this.$store.state.comfirmOrder.checkCouponPrice ="0.00";
          tool.saveToLocal("_SETBILL","cCoupon","couponObj",couponObj) ; 
          //console.log( couponObj ) 
          //console.log(tool.loadFromLocal("_SETBILL","cCoupon","couponObj",false) )
            //返回前一个页面 解决 防止用户点击过快 出现数据不同步问题
             this.$router.go("-1");
           
      }else{
          this.couponData.forEach((items,index)=>{ 
              if(index == this.num){
                  var couponObj = {
                    "price":items.Price,
                    "index":this.num,
                    "CouponId":items.CouponId  
                  }
                  //console.log(index , this.num,">>>>>>>>>>>")
                  //console.log(couponObj,items,items.CouponId)
                  this.$store.state.comfirmOrder.checkCouponPrice = items.Price;
                  tool.saveToLocal("_SETBILL","cCoupon","couponObj",couponObj);
                  //返回前一个页面 解决 防止用户点击过快 出现数据不同步问题
                   this.$router.go("-1");
              }
          })
           
      }
     
    },
    leave(){  
       this.$router.go("-1");
      return false
    }
  },
 
}
 

</script>

<style lang="less" type="stylesheet/css" scoped>
 @import "../../common/index.less";

#transfer{
     background: #EFEFF4;
     height: 100%;
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
}
 .return{
     position: absolute;
     height: 100%;
     width: 0.9459459459459459rem;
     top:0rem;
     left:0rem;
     .bg-image('../../assets/images/tabBar/nav_back');
     background-size: 57%;
     background-position:0.40540540540540543rem 0.2972972972972973rem;
}
 .confirm{
     width: 1.0810810810810811rem;
     height: 1.2162162162162162rem;
     top:0;
     right: 0.5405405405405406rem;
     line-height: 1.1891891891891893rem;
     font-size: 0.43243243243243246rem;
     position: absolute;
     z-index: 9999;
     color: #FF5000;
}
 .items_img {
     height: 2.7027027027027026rem;
     line-height: 2.7027027027027026rem;
}
 .checkS {
     margin: 0.13513513513513514rem 0.2702702702702703rem;
     width: 0.5675675675675675rem;
     float: right;
     height: 0.5675675675675675rem;
     background-size: 0.5675675675675675rem;
     .bg-image("../../assets/images/comfirm-order/check");
     &.checked {
         .bg-image("../../assets/images/comfirm-order/checkS");
    }
}
 .items_img img{
     float: right;
     margin: 1.027027027027027rem 0.2702702702702703rem;
     width: 0.5675675675675675rem;
}
 .mainWrap{
     padding-top:0rem;
     margin-top: 1.6rem;
}
 .itemsWrap > li {
     background: #fff;
     height: 2.7027027027027026rem;
     background-size: 100% 2.7027027027027026rem;
     &:nth-child(1)~li{
         margin-top: 0.40540540540540543rem;
    }
     &.grayBg{
         .bg-image("../../assets/images/comfirm-order/grayBg");
    }
     &.grayBgS{
         .bg-image("../../assets/images/comfirm-order/grayBgS");
    }
     &.used{
         .bg-image("../../assets/images/comfirm-order/used");
    }
     &.nothing{
         .bg-image("../../assets/images/comfirm-order/grayBgS");
    }
}
 .items{
     .left,.right{
         float: left;
    }
     .left{
         width: 3.6216216216216215rem;
         .c(#fff);
         padding-top:0.6216216216216216rem;
         text-indent:0.35135135135135137rem;
         .price{
             font-size: 1.013333rem;
             span{
                 font-size: .4rem;
            }
        }
         .detail{
             margin-top: 0.2702702702702703rem;
             font-size: .373333rem;
        }
    }
     .right{
         padding-top: 0.5675675675675675rem;
         float: right;
         width: 62%;
         font-size: .4rem;
         .condition{
             .c(#1F1F1F);
        }
         .time{
             margin-top: 0.8648648648648649rem;
             font-size: 0;
             width: 100%;
             strong{
                 margin-left:-0.13513513513513514rem;
                 font-size: .293333rem;
            }
        }
    }
}
 .emptyC{
     background: white;
     min-height: 100%;
     padding-top: 4.054054054054054rem;
}
 .empty{
     width: 4.621621621621622rem;
     height: 4.054054054054054rem;
     .bg-image("../../assets/images/mine/coupon/ouponD");
     background-repeat: no-repeat;
     background-size: 4.621621621621622rem 4.054054054054054rem;
     margin: 0.5405405405405406rem auto;
}
 .emptyWord{
     margin: 0rem auto;
     color: #666666;
     text-align: center;
}
 //iphone5 兼容问题 
 @media screen and (max-width:8.64864864864865rem){
     .items .left{
         width: 3.2432432432432434rem;
    }
}
 
</style>

