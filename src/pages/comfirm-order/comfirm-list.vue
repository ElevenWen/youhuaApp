<template>
  <div id="list">
     <headerTitle :title="title"    @showProps="showPropsFn" ></headerTitle>
    
    <main class="cart-mianWrap"  >
      <ul class="cart-itemsWrap ">
        <li class="items-list singS"  v-if="list.Type == 0"  v-for="(list,index) in arr"  :key="index">
          <!-- 单品  -->
          <div >
            <!-- <div>
              	<h3 class="title"  v-if="list.Promotion!=''">
                   <span class="themeC"><strong class="font11">list.Promotion</strong></span>
                   <span>list.Promotion</span>  
                </h3>
            </div> -->
            <div class="listMain">
              <div class="infos"  >
                <div class="innerWrap">
                  <img class="listImg" :src="list.ThumbImgURL" alt="" />
                  <div class="brief">
                    <p>
                   
                     {{ list.ProductName}}
                      
                    </p>
                    <p  >
                     类型:{{list.ProductType}}
                    </p>
                  </div>
                  <div class="purchWrap">
                    <span class="themeC  nowPrice">
                        {{ list.Price | formatPrice | currency}}<b>{{list.Price | formatPriceX}} </b>
                    </span>
                    <span class="oldPrice"> 
                       {{ list.OldPrice | formatPrice | currency}}<b>{{list.OldPrice | formatPriceX}} </b>
                    </span>
                    <div class="btnWrap">
                      X{{list.Num}}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="listfooter"  v-if="list.Promotion!=''">
              <span>{{list.Promotion}}&nbsp;&nbsp;</span><span>{{list.Promotion}}</span>
            </div>
          </div>
    	<!-- /单品  -->
        </li>

        <li class="items-list singS"  >
        	 <!-- t套餐 -->
         <div   v-if="list.Type == 1"  v-for="(list,index) in arr"  :key="index">
            <div  > 
               <h3  class="title"  v-if="list.Type==1" > 
                 <span class="themeC"><strong class="font11">套装</strong></span>
                 <span class="themeC " >
                    {{list.Price| formatPrice | currency}}<b class="zero">{{list.Price | formatPriceX}} </b>
                </span>  
                 <span class="themeC"><strong class="font11">立省{{(list.OldPrice-list.Price).toFixed(2)|formatPrice | currency}}<em class="fs9">{{(list.OldPrice-list.Price).toFixed(2) | formatPriceX}} </em> </strong></span>
                  <span class="purchNum"> X{{list.Num}}</span>
               </h3>
            </div>

            <div class="listMain" v-for="arrTemp in list.ProductDetails">
              <!-- <div class="checkboxWrap "  > 
                <label  class="singLabel"    ></label>
              </div> -->
              <div class="infos">
                <div class="innerWrap">
                   <img class="listImg"   :src="arrTemp.ThumbImgURL" alt="" >
                    <div class="brief">
                         <p >
                           {{ arrTemp.Name}}
                        </p>
                        <p>
                          类型:{{arrTemp.ProductType}}
                        </p>
                    </div>
                    <div class="purchWrap"> 
                        <span class="themeC  nowPrice">{{arrTemp.Price | formatPrice | currency}}<b>{{arrTemp.Price | formatPriceX  }}</b>
                        </span>
                        <span class="oldPrice">{{arrTemp.OldPrice|currency}}</span>
                       
                    </div>
                </div> 
              </div>
            </div> 
            <!-- 预留套餐促销 -->
            <div  class="listfooter" v-if="list.Type == 2" >
                <span>促销&nbsp;&nbsp;</span><span>满199.00减50.00</span>
            </div>    
         </div> 
         <!-- /t套餐 -->
        </li>
      </ul>
    </main>
  </div>
</template>

<script>
import headerTitle from '../components/header-title';

export default {
  data() {
    return {
   		title:"商品清单",
     	ab : require('@/assets/images/test.png'), 	
    }
  },
  components: {
  		headerTitle
  },
  methods:{
    showPropsFn(childProps){
      //传值给父组件  中介 
       this.$emit("showProps",childProps);
    },
   
  },
  filters:{
    formatPrice (value) { 
   		 return Boolean(value)  ?   value.substring(0,value.indexOf(".")) : "" ;
    },
    formatPriceX:value =>{  return Boolean(value) ? value.substring(value.indexOf("."))  : ""},
    currency :value =>   {   return "¥"+value } 
  },
  computed:{
    arr(){
      //从本地获取用户产品
      let tempObj =  this.commonTool.loadFromLocal("_CART",this.getToken(),'data'); 
      return tempObj.list;
    },
  
  }
}

</script>



<style lang="less" type="stylesheet/css" scoped>
  @import "../../common/index.less";
  #list{
     background: #efeff4;
}
 .cart-mianWrap {
     background: #fff;
     margin-top: 1.3513513513513513rem;
}
 .cart-itemsWrap {
     background: #efeff4;
     padding-bottom: 0.1px;
}
 //单品和套餐样式共享 
 .singS {
     background: #fff;
     position: relative;
     margin-bottom: 0.32432432432432434rem;
     .title {
         margin-left: 0.32432432432432434rem;
         position: relative;
         height: 0.8918918918918919rem;
         line-height: 1.027027027027027rem;
         font-size: 0rem;
         em{
            //  position: absolute;
            //  bottom: -1px;
        }
         >span:nth-child(1) {
             display: inline-block;
             height: 0.40540540540540543rem;
             line-height: 0.40540540540540543rem;
             width: 0.7027027027027027rem;
             text-align: center;
             .border-1px(#FF2A00);
        }
         >span:nth-child(2) {
             margin-left: 0.21621621621621623rem;
            //  font-size: 0.32432432432432434rem;
            font-size: .373333rem;
        }
         >span:nth-child(3) {
             margin-left: 0.24324324324324326rem;
            //  padding-right: 0.3783783783783784rem;
             display: inline-block;
             height: 0.40540540540540543rem;
             line-height: 0.40540540540540543rem;
             text-align: center;
             .border-1px(#FF2A00);
             font-size: 0.32432432432432434rem;
        }
         span.purchNum{
             float: right;
             .cf8C;
             margin-right: 0.40540540540540543rem;
             font-size: 0.3783783783783784rem;
             b{
                 .fs12;
            }
        }
    }
     .listMain {
         padding-top:0.2702702702702703rem;
         padding-bottom: 0.2702702702702703rem;
        //  height: 2.675675675675676rem;
         flex-wrap: wrap;
         display: flex;
         margin-left: 0.32432432432432434rem;
         >div {
             display: inline-flex;
             &.checkboxWrap {
                 position: absolute;
                 z-index: 88;
            }
             label {
                 display: inline-block;
                 width: 0.5135135135135135rem;
                 height: 0.5135135135135135rem;
                 .bg-image('../../assets/images/tabBar/select_box');
                 background-size: 0.5135135135135135rem;
                 margin-top: 0.9459459459459459rem;
                 &.checked {
                     .bg-image('../../assets/images/tabBar/select_boxS');
                }
            }
             &.infos {
                 position: relative;
                 flex: 1 1 0.05405405405405406rem;
            }
             .innerWrap {
                 overflow: hidden;
                 width: 100%;
                 height: 2.3783783783783785rem;
            }
             .listImg {
                 float: left;
                 width: 2.3783783783783785rem;
                 height: 2.3783783783783785rem;
                 border: 0.10810810810810811rem;
                 border-radius: .133333rem;
            }
             .brief {
                 margin-left: 0.32432432432432434rem;
                 position: relative;
                 p {
                     padding-right: 0.4594594594594595rem;
                     &:nth-child(1) {
                         padding-left: 0.32432432432432434rem;
                         position: relative;
                         .textIndex2(auto);
                         line-height: 0.4864864864864865rem;
                         margin-bottom: 0.10810810810810811rem;
                         font-size: .373333rem;
                    }
                     &:nth-child(2) {
                         padding-left: 2.3783783783783785rem;
                         .cf8C;
                         .fs13;
                         margin-bottom: 0.6486486486486487rem;
                         font-size: .346667rem;
                         
                    }
                }
            }
             //点击按钮 
             .purchWrap {
                 position: absolute;
                 bottom: 0;
                 width: 100%;
                 padding-left: 2.7027027027027026rem;
                 height: 0.7027027027027027rem;
                 line-height: 0.7027027027027027rem;
                 .nowPrice {
                     float: left;
                     font-size: .373333rem;
                }
                 b {
                     font-size: 0.32432432432432434rem;
                }
                 .oldPrice {
                     float: left;
                     text-decoration: line-through;
                     .c(#B3B0AD);
                    //  .fs12;
                     margin-left: 0.16216216216216217rem;
                     font-size: 0.32432432432432434rem;
                }
                 .purchNum{
                     float: right;
                     .cf8C;
                     margin-right: 0.40540540540540543rem;
                }
                 .btnWrap {
                     float: right;
                     width: 2.324324324324324rem;
                     height: 100%;
                     text-align: right;
                     .cf8C;
                     padding-right: 0.40540540540540543rem;
                     font-size: .373333rem;
                }
                 .btnWrap>span {
                     background-size: 0.6486486486486487rem;
                     float: left;
                     width: 0.6756756756756757rem;
                     height: 0.6756756756756757rem;
                     text-align: center;
                     line-height: 0.6756756756756757rem;
                }
                 .addBtn {
                     .bg-image("../../assets/images/cart/add_icon");
                }
                 .desBtn {
                     .bg-image("../../assets/images/cart/red_icon");
                     margin-right: -1px;
                }
                 .desBtnS {
                     .bg-image("../../assets/images/cart/red_iconS");
                     margin-right: -1px;
                }
                 .clickNum {
                     width: 0.972972972972973rem;
                     position: relative;
                     .border-1pxT(#B3B0AD);
                     .border-1pxB(#B3B0AD);
                     &:after {
                         bottom: 0.05405405405405406rem;
                    }
                }
            }
        }
    }
     .listfooter {
         padding-left: 0.32432432432432434rem;
         font-size: 0.32432432432432434rem;
         flex: 1 1 100%;
         height: 0.7027027027027027rem;
         line-height: 0.7027027027027027rem;
         background: #FFF8F5;
         span:nth-child(1) {
             .cf6;
        }
         span:nth-child(2) {
             .cf8C;
        }
    }
}
.zero{
    font-size: 0.32432432432432434rem;
}
// #mine .mainWrap {
//     margin-top: 1.32432432432432434rem !important;
// }
</style>
