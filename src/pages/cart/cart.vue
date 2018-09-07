<style lang="less" type="stylesheet/css" scoped>
  @import "../../common/index.less"; 
  @import "./cart.less";  
</style>

<template>
  <div id="cart">
    <div class="headerWrap">
      购物车<span class="num"  v-show="checkedLenArrSum!=0">({{checkedLenArrSum}})</span>
      <p class="editBtn" @click.stop.prevent="editOrComp(false)" v-show="edit && cartInfos.recordCount!=0">
        <span  class="" >编辑</span>
      </p>
      <p class="editBtn" @click.stop.prevent="editOrComp(true)" v-show="!edit && cartInfos.recordCount!=0">
        <span  class=""  >完成</span>
      </p>
      <!-- <div class="kf">
        <i class="icon"><span class="mesg"><strong class="font10">9+</strong></span></i>
      </div> -->
      <!--<span @click.stop.prevent="guidePage()" class="information" >
        <img src="../../assets/images/tabBar/server@2x.png" />
        <span>·</span>
      </span>-->
      <!-- 消息图标 -->
       <messageIcon class="cartInformationWrap" source="cart"></messageIcon>
    </div>
    <!-- 产品列表 -->

   <main class="cart-mianWrap" v-show="cartInfos.recordCount!=0">
    <ul class="cart-itemsWrap ">
            <li class="items-list" v-for="(value,index,key) in cartInfos.list" track-by="index" :key="index" :class="value.Type == 0 ?'singS':'nSingS'" >
             <!-- 单品type0  -->
              <div v-if="value.Type == 0" class="DP">
              	<div class="enterpriseName">
	            		<!--<div class="checkboxWrap" v-if="value.ProductStatus != 1">-->
	            		<div class="checkboxWrap">
	                  <label class="singLabel" :class="{'checked':Boolean(value.IsChecked)}" @click="labelFn(value,value.IsChecked)"></label>
	                  <div class="enterprise">
	                  	<span class="enterpriseLogo"></span>
	                  	深圳自创工业有限公司
	                  	<img src="../../assets/images/tabBar/right_arrow@3x.png">
	                  </div>
	                </div>
	            	</div>
                  <div>
                    <h3 class="title" v-if="value.Promotion != ''">
                      <!-- <h3 class="title"> -->
                      <span class="themeC"><strong class="font111">满减</strong></span>
                      <span>{{value.Promotion}}</span>
                      <span class="couBtn themeC" @click="goServe()">去凑单&nbsp;></span>
                    </h3>
                  </div>
                <!-- 删除Start -->
                <mt-cell-swipe
                  title=""
	                  :right="[
	                    {
	                      content: '删除',
	                      style: { background: '#ff6b5f', color: '#fff' ,width:'2rem','text-align':'center', 'justify-content': 'center'},
	                      handler: () => delectFn(value)
	                    }
	                ]">
                  <div class="listMain">
                   <!--<div class="checkboxWrap" v-if="value.ProductStatus != 1">-->
                   	<div class="checkboxWrap">
                      <!-- 是否可以选中 -->
                       <label v-show="value.ProductStatus == 1 && edit"    :class="{'singLabelF':value.ProductStatus == 1}"></label>
                      <label class="singLabel" :class="{'checked':Boolean(value.IsChecked)}" @click="labelFn(value,value.IsChecked)"></label>
                     <!--  <label v-show="edit" v-if="value.ProductStatus == 1" class="singLabelF" :class="{'checked':Boolean(value.IsChecked),'singLabelF':value.ProductStatus == 1}"></label>
                       -->
                     
                    </div>
                    <div class="infos">
                      <div class="innerWrap" @click="goProductDetails(value,value.Type)">
                        <div class="listImageWrap">
                          <div id="loseEfficacy" v-if="value.ProductStatus == 1"><span>失效<hr />Failure</span></div>
                          <img class="listImg" :src="value.ThumbImgURL" alt=""/>
                        </div>
                          <div class="brief">
                            <p>
                               {{value.ProductName}}
                            </p>
                            <p v-if="value.ProductType != null">
                              {{value.ProductType}}
                            </p>
                          </div>
                          <div class="purchWrap">
                            <span class="themeC nowPrice">{{value.Price | formatPrice | currency}}<b>{{value.Price|formatPriceX}}</b>
                            </span>
                           <span class="oldPrice"><strong>{{[value.OldPrice,value.Price]|isEquality}}</strong></span>
                            <div class="btnWrap" v-if="value.ProductStatus != 1">
                              <span :class="value.Num<=1?'desBtn':'desBtnS'" @click.stop.prevent="desFn(value,index)"></span>
                              <span class="clickNum">{{value.Num}}</span>
                              <span class="addBtn" @click.stop.prevent="addFn(value,index)"></span>
                            </div>
                          </div>
                      </div>
                    </div>
                  </div>
                </mt-cell-swipe>
                <!-- 删除END -->
                <div  class="listfooter" v-if="value.Promotion!=''" >
                      <span>促销&nbsp;&nbsp;</span><span>{{value.Promotion}}</span>
                </div>
              </div>

            <!-- 套餐 type1 -->
            <div v-if="value.Type == 1 " class="TC">
            	<!--<div class="enterpriseName">	2.0功能勿删
            		<div class="checkboxWrap" v-if="value.ProductStatus != 1">
            		<div class="checkboxWrap">
                  <label  class="singLabel" :class="{'checked':Boolean(value.IsChecked)}" @click="labelFn(value,value.IsChecked)"></label>
                  <div class="enterprise">
                  	<span class="enterpriseLogo"></span>
                  	深圳自创工业有限公司
                  	<img src="../../assets/images/tabBar/right_arrow@3x.png">
                  </div>
                </div>
            	</div>-->
                <div class="titleWrap" >
                    <!--<div class="checkboxWrap" v-if="value.ProductStatus != 1">-->
                   	<div class="checkboxWrap">
                      <label  v-show="value.ProductStatus == 1 && edit"    :class="{'singLabelF':value.ProductStatus == 1}"></label>
                      <label  class="singLabel" :class="{'checked':Boolean(value.IsChecked)}" @click="labelFn(value,value.IsChecked)"></label>
                    </div>
                   <h3  class="title">
                     <span class="themeC"><strong class="font111">套餐</strong></span>
                      <span>{{value.ProductName}} </span>
                     <!-- <span class="couBtn themeC"  @click="goServe()">去凑单&nbsp;></span> -->
                   </h3>
                </div>
              <!-- 删除Start -->
              <mt-cell-swipe
                  title=""
	                  :right="[
	                    {
	                      content: '删除',
	                      style: { background: '#ff6b5f', color: '#fff' ,width:'2rem','text-align':'center', 'justify-content': 'center'},
	                      handler: () => delectFn(value)
	                    }
	                  ]">
                  <div class="listMain" ref="listMain" @click="goProductDetails(value,value.Type)" v-for="(tempList,index) in value.ProductDetails">
                    <div class="infos">
                      <div class="innerWrap">
                          <div class="listImageWrap">
                            <div id="loseEfficacy" v-if="value.ProductStatus == 1"><span>失效<hr />Failure</span></div>
                            <img class="listImg" :src="value.ProductDetails[index].ThumbImgURL" alt="" />
                          </div>
                          <div class="brief" v-if="value.ProductStatus == 1">
                              <p>{{tempList.Name}}</p>
                              <p>{{tempList.ProductType}}</p>
                          </div>
                          <div class="brief" v-else>
                              <p>{{tempList.Name}}</p>
                              <p>{{tempList.ProductType}}</p>
                          </div>
                          <div class="purchWrap">
                              <span class="themeC nowPrice">{{tempList.Price | formatPrice | currency}}<b>{{tempList.Price | formatPriceX}}</b>
                              </span>
                              <!-- <span class="oldPrice"><strong>{{tempList.OldPrice|currency}}</strong></span> -->
                              <!-- [items.name,"百度"] | keywordFilter(items.name) -->
                              <span class="oldPrice"><strong>{{[tempList.OldPrice,tempList.Price] |isEquality}}</strong></span>
                              
                          </div>
                      </div>
                    </div>
                  </div>
                </mt-cell-swipe>
                <!-- 删除END -->
                <div class="listfooter" v-if="value.Promotion!=''">
                    <span>促销&nbsp;&nbsp;</span><span>满199.00减50.00</span>
                </div>
                <!-- 套餐价格 -->
                 <div class="nSPurchWrap">
                  <div class="priceTotal">
                      <span class="themeC">套餐价：</span>
                      <span class="themeC nowPrice">{{value.Price | formatPrice | currency}}<b>{{value.Price | formatPriceX  }}</b>
                      </span>
                     <span class="oldPrice"><strong>{{[value.OldPrice,value.Price]|isEquality}}</strong></span>
                  </div>
                  <div class="btnWrap" v-if="value.ProductStatus != 1">
                      <span :class="value.Num<=1?'desBtn':'desBtnS'" @click.stop.prevent="desFn(value,index)"></span>
                      <span class="clickNum">{{value.Num}}</span>
                      <span class="addBtn" @click.stop.prevent="addFn(value,index)"></span>
                  </div>
                </div>
             </div>
             <!-- /t套餐 -->
          </li>
    </ul>
    </main>
    <div class="allBtnWrap"    v-show="cartInfos.recordCount!=0" >
        <!-- 完成状态下的全选  -->
        <div class="checkboxWrap" v-if='edit' @click="toggleAllChecked(true)" >
          <label  :class="allChecked?'checkedAll':''" for="allId"></label>
          <span  id="allId">全选</span>
           <!-- {{allChecked}} -->
        </div>
        <!-- 编辑状态的全选 -->
        <div class="checkboxWrap" v-else='!edit' @click="toggleAllChecked(false)" >
          <label  :class="allChecked?'checkedAll':''" for="allId"></label>
          <span  id="allId">全选</span>
           <!-- {{allChecked}} -->
        </div>
        <div class="orderPrice" v-show="edit">
          <span class="total">合计：</span> <span class="themeC  nowPrice totalMoney">{{totalPrice | formatPrice |currency}}<b>{{totalPrice | formatPriceX}}</b></span>
        </div>
        <div class="ordBtn"  @click="orderBtn()"  v-show="edit" v-if="checkedLen != 0">
        	去结算(<span class="orderNum">{{checkedLen}}</span>)
        </div>
        <div class="ordBtn"  @click="orderBtn()"  v-show="edit" v-else>
        	去结算
        </div>
        <!-- 删除 -->
        <div class="delectBtn" v-show="!edit">
        	<span class="collectBtnFn" @click="collectBtnFn">加入收藏</span>
        	<span class="delectBtnFn" @click="delectBtnFn">删除</span>
        </div>
    </div>
    <!--无产品时候显示  -->
    <div class="nullCart" v-if="cartInfos.recordCount == 0" v-cloak>
      <div class="nullImageWrap">
         <img :src="imagesWrap" alt="" width="170" height="150">
      </div>
        <p class="cf6">购物车还是空的，赶紧行动吧！</p>
        <span class="themeC" @click="goServe($event)">去逛逛</span>
    </div>
   <footerNav :cartNum="checkedLenArrSum"></footerNav>
  </div>
</template>

<script>
  import Vue from 'vue';
  import axios from 'axios';
  import { Indicator,MessageBox,Toast ,CellSwipe  } from 'mint-ui';
  import  footerNav from '../../footer-nav';
  import  tool from "../../util/tool";
  import getd from '../../vuex/getData.js';
  import messageIcon from '../message/messageIcon';


  export default {
   data() {
      return {
        edit:true,
       // ab : require('@/assets/images/test.png')  ,
        checkedLenArr:[],
        allCheckedFlag:true,//在完成和编辑状态下, 全选条件判断的标志
        imagesWrap:[require('@/assets/images/tabBar/nullCart@3x.png')],
      }
    },
    components:{
      footerNav,
      messageIcon
    },
    created(){
      //清除服务缓存
      tool.removeLocal('sever_index')
      this.edit = true;
      this.$store.dispatch("request_data_cart"); //初始化购物车数据
    },
    mounted(){
      var that = this
      this.$nextTick(function(){
      })
    },
    // updated(){
    //   // this.$nextTick(function(){
    //   //})
    // },
    computed:{
      cartInfos(){
            var  cartInfos= this.$store.state.cart.cartInfos;
            //若后台数据 获取失败或者是 后台无数据return
            if(!cartInfos  ||  cartInfos.length ==0 ){
              return {
                length:0,
                recordCount:0,
                list:[]
              }
            }
            return cartInfos
      },
      totalPrice(){
        //循环check数据 重新计算
        let sum = 0;
        let obj = this.$store.state.cart.cartInfos;
        if(!obj || obj.length ==0 ){
          return
        }
        let tempObj = obj.list;
        tempObj.forEach( (items,index) => {
         if (items.IsChecked) sum += items.Num * items.Price *10000;
        }) ;
        return  ( Number(sum)/10000 ).toFixed(2);
      },
      allChecked:{
        get:function(){
             // console.log('真的')
            //循环数组  全选
            let obj = this.$store.state.cart.cartInfos;
            if(!obj || obj.length ==0 ){
              return
            }
            let tempObj = obj.list;
            for(var i = 0 ; i < tempObj.length ;i++){
            //只要有一个为 false 则返回false 否则为真ProductStatus:1 表示下架
            // console.log(tempObj[i].ProductStatus ,tempObj[i].IsChecked)
            //在未编辑状态 产品未上架状态 且 有一个为未选中择返回全选熄灭
              if(this.edit &&  tempObj[i].ProductStatus!= 1 && !tempObj[i].IsChecked){
                // console.log('false');
                return false;
              }else if(!this.edit  && !tempObj[i].IsChecked){ //进入编辑状态 点击全选 实现效果:更改全选状态
                return false
              }else if(!this.edit && this.allCheckedFlag ){ //进入编辑状态  不点击全选 实现效果:更改全选状态不选中
                return true
              }
            }
           
           //全部循环完毕
           return true;
        },
        set:function(newValue){
        }
      },
      checkedLen( ){ //计算购物车里的宝贝数量
        let sum = 0;
        let obj = this.$store.state.cart.cartInfos;
        if(!obj || obj.length ==0 ){
          return
        }
        let tempObj = obj.list;

        tempObj.forEach( (items,index) => {
          items.IsChecked?sum += items.Num :"";

          //this.checkedLenArr.push( items.Num)
        }) ; 
        // //console.log(">>",this.checkedLenArr);
        return  Math.round( Number(sum)  ) ; 
      },
      checkedLenArrSum(){
        let sum = 0;
        let obj = this.$store.state.cart.cartInfos;
              if(!obj || obj.length ==0 ){
                return sum
            }
        this.checkedLenArr = obj.list;
        this.checkedLenArr.forEach((items)=>{
          sum += items.Num;
        })
        tool.saveToLocal("cart-num","cart-num","cart-num",sum);
        if(sum == 0){
          return ""
        }else{
          return sum;
        }
        // return 0
      }
    },
    methods:{
    	
      goProductDetails(tempList,type){//进入订单详情页面
       /* if(tempList.ProductStatus!=1){
          if(type == 0){
             this.$router.push({name:"productDetails",query:{id:tempList.ProductId,type:tempList.Type}})
          } else{
            this.$router.push({name:"productDetails",query:{id:tempList.ProductId,type:tempList.Type}})
          };
        }else {

            return
        }*/
        if(type == 0){
          this.$router.push({name:"productDetails",query:{id:tempList.ProductId,type:tempList.Type}})
        } else{
          this.$router.push({name:"productDetails",query:{id:tempList.ProductId,type:tempList.Type}})
        }
      },
      delectFn(data){
        MessageBox.confirm('确定执行此操作?').then(action => {
          //删除当前节点且删除对应购物车数据
          this.$store.dispatch('delete_db_cart',data);
        },cancel =>{
          console.log('取消')
        });

         
      },
      editOrComp(flag){ //true 表示完成 false 表示编辑状态
        this.edit  = !this.edit;
        this.allCheckedFlag = false; //打开编辑下的全选按钮 隐藏下的全选按钮
        console.log('12123')
        
        //编辑状态所有的产品默改为不选中  且把全选改为false
        let obj = this.$store.state.cart.cartInfos;
        let tempObj = obj.list;
        console.log(this.allChecked)
        
        console.log('allChecked')
  			tempObj.forEach (items =>items.IsChecked =  false);
	     
        if(flag){
          location.reload()
        }

      },
      orderBtn:function(){ //去结算btn 跳转结算页面
        let obj = this.$store.state.cart.cartInfos;
        if(!obj || obj.length ==0 ){
            return
        }
        let tempObj = obj.list;
        let pushLocalObj = {
          "list":[],
          "recordCount":0
        }
        // 当客户没有选中任何商品时提示客户选择商品并阻止跳转到确认订单页面
        for(var i = 0 ; i < tempObj.length ;i++){
          if(this.checkedLen == 0){
            Toast({
                message: '请选择商品！',
                position: 'center',
                duration: 11500
            });
            return false;
          }
        }
        tempObj.forEach((items)=>{
          if(items.IsChecked && items.ProductStatus!= 1){//商品被选中且商品不属于下架状态 ProductStatus=1:表示下架
              pushLocalObj.list.push(items);
              pushLocalObj.recordCount++;
          }
        })
       // 当用户没有选择产品点击结算的时候
        //被选中的产品 push进入list
         //清空之前用户记录
        tool.removeLocal("");
        tool.removeLocal("_SETBILL");
        tool.removeLocal("_CART"); //删除多余的token
        //本次存储  __navigatorName__,id, key, value
        tool.saveToLocal("_CART",this.getToken(),'data',pushLocalObj);
        //进入下单页面
        window.localStorage.setItem('whichPage',this.$route.path)
         this.$router.push({path:'/cart/comfirmOrder'});
      },
      addFn(value, index){
        if(value.ProductStatus!=1){
          //节流当返回真才可以 增加
          if( this.$store.state.cart.throttle){
              let obj = this.$store.state.cart.cartInfos;
              //console.log("222222222222222222222222",obj);
              if(!obj || obj.length ==0 ){
                return
              }
            let tempObj = obj.list;
            for(var i = 0 ; i< tempObj.length ;i++){
              if(value == tempObj[i]){
                tempObj[i].IsChecked = true;
              }
            }
              this.$store.state.cart.throttle = false;
            //视图改变后,同步后台数据库
             this.$store.dispatch('add_db_cart',value).then(()=>{
                 this.$store.state.cart.throttle = true;
             })
             this.$store.dispatch('updata_cur_shop_status_cart',value);
          }
        }
       },
       desFn(value, index){
        if(value.ProductStatus!=1){
          //节流当返回真才可以 增加
          if( this.$store.state.cart.throttle){
             let obj = this.$store.state.cart.cartInfos;
              if(!obj || obj.length ==0 ){
                return
              }
            let tempObj = obj.list;
              for(var i = 0 ; i< tempObj.length ;i++){
                if(value == tempObj[i]){
                   var totalPrice = 0;
                  if(value.Num <= 1){
                    //保证至少1条数据
                    return
                  }else{
                    tempObj[i].IsChecked =true
                  }
                }
              }
              //视图改变后,同步后台数据库
             this.$store.dispatch('des_db_cart',value).then(()=>{
                 this.$store.state.cart.throttle = true;
             })
             this.$store.dispatch('updata_cur_shop_status_cart',value);
          }
        }
      },
      labelFn(value,checkedState){  //切换用户的选中状态
        let obj = this.$store.state.cart.cartInfos;
        if(!obj || obj.length ==0 ){
          return
        }
        let tempObj = obj.list;
        for(var i = 0 ; i< tempObj.length ;i++){
          if(value == tempObj[i]){
            value.IsChecked = !checkedState;
          }
        }
        if(!this.edit){//编辑状态下  不同步后台
          return 
        }
        //视图改变后,同步后台数据库 选中状态
        this.$store.dispatch('updata_cur_shop_status_cart',value);
      },
      toggleAllChecked(flag){ //全选
        // this.allCheckedFlag = flag;
        let obj = this.$store.state.cart.cartInfos;
        if(!obj || obj.length ==0 ){
            return
        }
       
          let tempObj = obj.list;
          if(this.allChecked ){//全部改为未选中状态
            tempObj.forEach (items =>{ 
                items.IsChecked =  false 
            });
            if(!this.edit){//不同步到后台edit 默认为true
              // tempObj.forEach (items =>{ 
              //   items.IsChecked =  false 
              // });
              return 
            }
          }else{
            tempObj.forEach (items =>{
              //编辑状态和完成状态切换时对失效产品的点击状态处理
              if(this.edit){
                // 0 上架 1下架
                if(items.ProductStatus == 1){
                  items.IsChecked =  false;
                }else{
                  items.IsChecked =  true;
                }
              }else{
                // 0 上架 1下架 在编辑状态下  全部改为选中且不同步到后台
                 items.IsChecked =  true  
                 return 
              }
            });
          }
          // 视图改变后,同步后台数据库 选中状态(在数据初始化已经完成isChecked 的判断)
          this.$store.dispatch('updata_cur_shop_status_cart',tempObj);
        
      },
      //收藏
      collectBtnFn(){
      	//获取购物车列表
        let obj = this.$store.state.cart.cartInfos;
            if(!obj || obj.length ==0 ){
              return
            }
            //判断用户是否选择了产品, 未选中任意产品择提示请选择商品
        var _isChecked =   obj.list.map((item )=>   item.IsChecked);
        //jushOneChecked 
        var jushOneChecked = _isChecked.some(( item) =>   item );
        if(!jushOneChecked){//未选中任意产品 择提示
           Toast({
                message: '请选择商品！',
                position: 'center',
                duration: 51100
            });
            return false; 
        }
      	let tempObj = obj.list;
      	var data = [];
      	var temp_product = [] ;
      	for(var i= 0; i<tempObj.length; i++){
      		  if(tempObj[i].IsChecked ){
      			    data.push(tempObj[i].ProductId);
      			    temp_product.push(tempObj[i].Id);
      		  }
      	}
      	let _ids = data.join("|");
      	let _temp_product = temp_product.join("|");
      	var params ={
      		  ids:_ids,
					  shoppingIds:_temp_product,
					  datatype:'json'
				}
				getd.createdOrEditForShoppingCart(params).then((res)=>{
					  Toast({message: '已收藏',position: 'middle',duration: 2000})
				}).catch((error)=>{
					if(error.data.msg == "该产品已被收藏过！"){
						Toast({message: '已收藏',position: 'middle',duration: 2000})
					}else{
						Toast({message: '收藏失败',position: 'middle',duration: 2000})
					}
				})
      	if(data.length <= 0){
      		  return
      	}
      },
      //删除
      delectBtnFn(){
         let obj = this.$store.state.cart.cartInfos;
            if(!obj || obj.length ==0 ){
              return
            }
            //判断用户是否选择了产品, 未选中任意产品择提示请选择商品
        var _isChecked =   obj.list.map((item )=>   item.IsChecked);
        //jushOneChecked 
        var jushOneChecked = _isChecked.some(( item) =>   item );
        if(!jushOneChecked){//未选中任意产品 择提示
           Toast({
                message: '请选择商品！',
                position: 'center',
                duration: 51100
            });
            return false; 
        }
        MessageBox.confirm('确定执行此操作?').then(action => {
            let tempObj = obj.list;
            var data = [];
            for(var i = 0 ; i < tempObj.length ;i++){
               if (tempObj[i].IsChecked) {//删除被选中的产品
                  data.push(tempObj.slice(i,i+1)[0]);
              }
            }
            if(data.length <=0){
              return ;
            };
            //视图改变后,同步后台数据库 删除
            this.$store.dispatch('delete_db_cart',data);
        },cancel =>{
          console.log('取消')
        });
      },
      goServe($event){
        this.$router.push({path:"/serve"})
      },
      my_message(){ //跳转到消息页面
        this.$router.push("/message");
      }

    },
    filters:{
      formatPrice (value) {
        return   tool.formatPrice(value) ;
      },
      formatPriceX:value =>{
        return tool.formatPriceX(value) ;
      },
      currency :value =>   { 
        return tool.currency(value);
      },
      isEquality :value =>   {
        console.log(value,'???')
        return tool.isEquality(value);
      },
    }
  }


</script>



