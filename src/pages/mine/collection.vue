<template>
	<div id="collection">
		<div class="collection-header">
			<span class="return" @click="goBack()"></span>
			<span class="title">我的收藏</span>
			<span class="edit" @click="edit()" v-show="!(collectionList.length==0&&invalidData.length==0) && navType === 1">{{editor}}</span>
      <span class="edit" @click="edit()" v-show="newCollectList.length !==0 && navType === 2">{{editor}}</span>
		</div>
		<!-- 导航   -->
		<div class="c-nav">
			<span class="nav-after" @click="setNavType(1)" :class="{'active': navType ===1}">商品收藏</span>
			<span @click="setNavType(2)" :class="{'active': navType ===2}">内容收藏</span>
		</div>



		<!--收藏列表-->
		<div class="wrap" >
      <!-- 商品收藏 -->
			<div class="wrap-content" v-show="navType===1">
          <mt-cell-swipe :class="invalidData.length == 0 && editor == '完成' && index == collectionList.length-1?'selected':''"  class="promotion_list" v-if="collectionList.length>0"
					    v-for="(data,index) in collectionList" @click.native="goProduct(data.ProductId,data.Type)" :key="index"
			  			:right="[{content:'取消收藏',
			  			style:{background:'red',color:'#FFF'},
			  			handler: () => deleteCol(data,index,'0')}]">
		  			<div class="promotion_list_detail">
		  				<!-- 编辑状态时左边的小圆圈 -->
		  				<div :class="{checkList:editor=='编辑'?true:false, edi_check:editor=='编辑'?false:true}" @click.stop.prevent="selectPro(index,data,0)" >
		  					<div v-show="isEdit" :class="{redCircle:arr[index]==index,circle:arr[index]!=index}"></div>
		  				</div>
		  				<!-- 产品图片 -->
			  			<div class="promotion_img"><img :src="data.ThumbImgURL"/></div>
			  			<!-- 产品信息 -->
			  			<div class="promotion_particulars">
			  				<div class="title">
			  					<span class="promotion_name">{{data.Name}}</span>
			  					<span class="promotion_activity">
			  						<label v-show="data.Discount&&((data.Discount/10)!=10)">折扣</label>
			  					</span>
			  				</div>
			  				<div class="xiangqig">{{data.Title}}</div>
			  				<div class="promotion_money">
			  					<span class="discount">¥ {{data.Price}}<label></label></span>
			  					<del class="abolish" v-if="+data.Price < +data.OldPrice">¥{{data.OldPrice}}</del>
			  					<span class="sales_volume">销量：{{data.SalesVolume}}</span>
			  				</div>
			  			</div>
		  			</div>
		  		</mt-cell-swipe>
				
				<!--已失效-->
				<div class="invalid" :class="collectionList.length>0 ? 'active' :''" v-if="invalidData.length>0">
					<mt-cell-swipe  class="promotion_list"
						    v-for="(data,index) in invalidData" @click.native="goProductN(data.ProductId,data.Type)" :key="index"
				  			:right="[{content:'取消收藏',
				  			style:{background:'red',color:'#FFF'},
				  			handler: () => deleteCol(data,index,'1')}]">
			  			<div class="promotion_list_detail">
			  				<!-- 编辑状态时左边的小圆圈 -->
			  				<div class="checkList" @click.stop.prevent="selectPro(index,data,1)" >
			  					<div v-show="isEdit" class="circle" :class="arr2[index]==index ? 'redCircle' : ''" ></div>
			  				</div>
			  				<!-- 产品图片 -->
				  			<div class="promotion_img"><div class="mongolia">已失效</div></div>
				  			<!-- 产品信息 -->
				  			<div class="promotion_particulars">
				  				<div>
				  					<span class="promotion_name">{{data.Name}}</span>
				  					<span class="promotion_activity">
				  						<label v-show="data.Discount&&((data.Discount/10)!=10)">折扣</label>
				  					</span>
				  				</div>
				  				<div class="xiangqig">{{data.Title}}</div>
				  				<div class="promotion_money">
				  					<span class="discount">¥ {{data.Price}}<label></label></span>
				  					<del class="abolish">¥{{data.OldPrice}}</del>
				  					<span class="sales_volume">销量：{{data.SalesVolume}}</span>
				  				</div>
				  			</div>
			  			</div>
			  		</mt-cell-swipe>
				</div>
			</div>
      <!-- 内容收藏 -->
      <ul class="news-content"  v-show="navType===2"  id="list">
        <li class="list" v-for="item in newCollectList" :key="item.id">
          <div class="new-list"
            @touchstart.stop="touchStart"
            @touchmove="touchMove"
            @touchend="touchEnd"
          >
            <div class="new-check" v-show="isCheckNewCollect" @click="checkNewDeletCollect(item)"><i :class="{'chack-active':item.IsHot }"></i></div>
            <div class="new-item" @click.stop="gotTextNewDetails(item.NewsType,item.Id,item.ReviewState )">
              <div class="item-img">
                <img v-lazy="item.ThumbImgURL" :alt="item.Name">
                <img v-if="item.NewsType == 1" class="play_i" src="../../assets/images/tabBar/videoPaly@3x.png">
              </div>
              <div class="item-text">
                <h2 class="title">{{item.Title}}</h2>
                <div class="name">
                  <span>{{item.SourceInfo}}</span>
                  <span class="num">{{item.ReadNum + item.ReadBase }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="delete" @click.stop="deleted(item.CollectId)">取消收藏</div>
        </li>
      </ul>

		</div>
  		<div class="collect" v-show="isCollect" :class="(cancelColl.length>0||cancelColl2.length>0)?'selected':''"  @click.stop.prevent="collect( )">取消收藏</div>
      <div class="collect" v-show="isCheckNewCollect" :class="ischeckNewCollects ? 'selected':''"  @click.stop.prevent="collect()">取消收藏</div>
  		<!--无产品时候显示  -->
	    <div class="dataNull" v-if="collectionList.length==0&&invalidData.length==0 && navType===1">
  			<span>您没有关注任何产品，不如先</span>
  			<div @click="toServer(1)">去逛逛</div>
  		</div>
      <!-- 无新闻收藏列表 -->
      <div class="dataNull" v-if="newCollectList.length==0 && navType===2">
  			<span>您还没有收藏任何内容哦！</span>
  			<div @click="toServer(2)">去逛逛</div>
  		</div>
  		<mt-actionsheet :actions= "data1" class="genders" v-model="genders"></mt-actionsheet>
	</div>
</template>

<script>
import getd from "../../vuex/getData.js";
import { CellSwipe, MessageBox, Toast } from "mint-ui";
import Actionsheet from "mint-ui";
import Vue from "vue";

// //console.log(1);
export default {
  data() {
    return {
      navType: 1, // 显示导航
      data1: [
        {
          name: "确定删除1个商品吗？",
          method: this.confidentiality
        },
        {
          name: "确定",
          method: this.cancelCollFn
        }
      ],
      collectionList: [], // 收藏列表
      isEdit: false, // 是否显示左边的小圈圈
      genders: false, // 是否显示取消收藏
      isCollect: false, // 界面下方的取消收藏按钮是否显示
      editor: "编辑",
      arr: [], // 让左边的小圈圈在选中时不被互相影响
      arr2: [], // 让左边的小圈圈在选中时不被互相影响(失效)
      cancelColl: [], // 需要传递给后台取消收藏的产品id
      cancelColl2: [], // 需要传递给后台取消收藏的产品id(失效)
      invalidData: [], // 失效商品

      newCollectList: [],
      isCheckNewCollect: false, //是否编辑新闻内容
      ischeckNewCollects: false, //是否选中其中一个及以上编辑
      newDeletCollectParmaStr: "", //取消收藏id 串

      CustomerInfo: [], //用户信息
      // checkList:this.editor=='编辑'?true:false,
      // edi_check:this.editor=='编辑'?false:true,
    };
  },
  created() {
    this.touch = {};
    //获取产品收藏列表
    getd.getCollection().then(res => {
      //console.log(res)
      res.data.list.forEach((val, index) => {
        //1为失效
        if (val.ProductStatus == 1) {
          this.invalidData.push(val);
        } else {
          this.collectionList.push(val);
        }
      });
    });
    getd.getCustomerInfo().then(CustomerRes => {
      //console.log('用户信息',CustomerRes);
      this.CustomerInfo = CustomerRes.data;
      this.getNewColletData();
    });
  },
  methods: {
    //返回
    goBack() {
      this.$router.push("/mine");
    },
    touchStart(e) {
      this.touch.startX = e.touches[0].pageX;
      console.log("冒泡");
      // 初始化
      this.init();
    },
    touchMove(e) {
      // 滑动最小距离
      const MIN_LENGTH = 30;
      // e.currentTarget 获取当前元素， this.$refs只能获取一个，不能多个
      let toouchDom = e.currentTarget;

      // 滑动的距离
      this.touch.MoveX = e.touches[0].pageX - this.touch.startX;
      // 获取删除按钮的的宽度，如果做自适应，肯定是要动态获取的额（nextElementSibling 兼容IE9）
      this.touch.delectDom = toouchDom.nextElementSibling.offsetWidth;

      // 获取滑动后返回最小距离
      this.touch.EndX = Math.min(
        this.touch.delectDom,
        Math.abs(this.touch.MoveX)
      );

      // 判断是左滑还是右滑，右滑不做操作
      if (this.touch.MoveX < 0 && this.touch.EndX > MIN_LENGTH) {
        toouchDom.parentElement.style.transform = `translate3d(${-this.touch
          .delectDom}px, 0, 0)`;
        toouchDom.parentElement.style.transition = `all .3s`;
      }
    },
    touchEnd() {
      this.touch.MoveX = 0;
      this.touch.EndX = 0;
    },
    deleted(colletId) {
      // 点击删除当前的

      var collectParma = {
        params: {
          ids: colletId
        }
      };
      getd.get_NewDelCollect(collectParma).then(res => {
        Toast({
          message: "取消收藏成功",
          position: "middle",
          duration: 2000
        });
        this.getNewColletData(); //更新列表数据
        //重置
        this.ischeckNewCollects = false;
      });
      // 初始化
      this.init();
    },
    init() {
      //初始化所有位置
      let list = document.querySelector("#list").children;
      for (var i = 0, len = list.length; i < len; i++) {
        list[i].style.transform = `translate3d(0, 0, 0)`;
      }
    },
    getNewColletData() {
      //获取新闻收藏列表
      var newCollectionParma = {
        params: {
          id: this.CustomerInfo.Id
        }
      };
      getd.get_NewCollectList(newCollectionParma).then(res => {
        //console.log('新闻收藏列表：',res);
        this.newCollectList = res.data.list;
      });
    },
    //跳转详情页
    goProduct(id, type) {
      //编辑状态下不能跳详情
      if(this.editor=='完成'){
        return
      }
      this.$router.push({
        path: "/home/productDetails",
        query: { id: id, type: type }
      });
    },
    //失效商品点击
    goProductN(id, type) {
      /* MessageBox({
				  title: '提示',
				  message: '该商品已下架'
				}); */
      this.$router.push({
        path: "/home/productDetails",
        query: { id: id, type: type }
      });
    },
    //逛一逛
    toServer(type) {
      if(type === 1){
          console.log(1111)
          this.$router.push("/serve");
      }else if(type === 2){
          console.log(222)
          this.$router.push("/enterpriseNewsCenter");
      }
      
    },
    collect: function() {
      if (this.navType == 1) {
        if (this.cancelColl.length > 0 || this.cancelColl2.length > 0) {
          var total = this.cancelColl.length + this.cancelColl2.length;
          this.data1[0].name = "确定删除" + total + "个商品吗？";
          this.genders = true;
        }
      } else if (this.navType == 2) {
        var collectParma = {
          params: {
            ids: this.newDeletCollectParmaStr
          }
        };
        if(this.newDeletCollectParmaStr){
          getd.get_NewDelCollect(collectParma).then(res => {
            Toast({
              message: "取消收藏成功",
              position: "middle",
              duration: 2000
            });
            this.getNewColletData(); //更新列表数据
            //重置
            this.isCheckNewCollect = false;
            this.ischeckNewCollects = false;
            this.editor = "编辑";
          });

        }else {
          Toast({
            message: "请先选择要删除的列表",
            position: "middle",
            duration: 2000
          });
        }

      } else {
      }
    },
    selectPro(index, data, num) {
      //选择被编辑的产品
      //0:没失效
      if (num == 0) {
        if (this.arr[index] != index) {
          Vue.set(this.arr, index, index);

          this.cancelColl.push(data);
        } else {
          Vue.set(this.arr, index, -1);
          this.cancelColl.pop();
        }
      } else {
        if (this.arr2[index] != index) {
          Vue.set(this.arr2, index, index);
          this.cancelColl2.push(data);
        } else {
          Vue.set(this.arr2, index, -1);
          this.cancelColl2.pop();
        }
      }
    },
    //导航切换
    setNavType(nowNavIndex) {
      if (this.editor == "编辑") {
        this.navType = nowNavIndex;
      } else {
        Toast({
          message: "请您先完成当前页面编辑",
          position: "middle",
          duration: 2000
        });
        return;
      }
    },
    //编辑
    edit() {
      if (this.navType == 1) {
        if (this.editor == "编辑") {
          this.isEdit = !this.isEdit;
          this.arr = [];
          this.arr2 = [];
          this.isCollect = true;
          this.editor = "完成";
        } else {
          this.isEdit = false;
          this.isCollect = false;
          this.editor = "编辑";
          this.cancelColl = [];
          this.cancelColl2 = [];
        }
      } else if (this.navType == 2) {
        if (this.editor == "编辑") {
          this.isCheckNewCollect = true;
          this.editor = "完成";
        } else {
          this.isCheckNewCollect = false;
          this.editor = "编辑";
        }
      } else {
      }
    },
    //商品取消收藏
    deleteCol(val, i, num) {
      //0:没失效
      if (num == 0) {
        Vue.set(this.arr, i, -1);
        this.cancelColl.pop();
        this.collectionList.splice(i, 1);
      } else {
        Vue.set(this.arr2, i, -1);
        this.cancelColl2.pop();
        this.invalidData.splice(i, 1);
      }
      var params = {
        ids: val.Id
      };
      getd
        .removeCollection(params)
        .then(res => {
          if (this.collectionList.length == 0 && this.invalidData.length == 0) {
            this.isCollect = false;
          }
          //console.log("0000",res);
        })
        .catch(error => {
          //console.log(error)
        });
    },
    cancelCollFn() {
      //找到相同商品id删除
      for (var i = 0; i < this.cancelColl.length; i++) {
        this.collectionList.forEach((val, index) => {
          if (this.cancelColl[i].Id == val.Id) {
            this.collectionList.splice(index, 1);
          }
        });
      }
      //找到相同失效商品id删除
      for (var i = 0; i < this.cancelColl2.length; i++) {
        this.invalidData.forEach((val, index) => {
          if (this.cancelColl2[i].Id == val.Id) {
            this.invalidData.splice(index, 1);
          }
        });
      }
      var ids = [];
      this.cancelColl.forEach(items => {
        ids.push(items.Id);
      });
      this.cancelColl2.forEach(items => {
        ids.push(items.Id);
      });
      let _ids = ids.join("|");
      var params = {
        ids: _ids
      };
      getd.removeCollection(params).then(res => {
        //console.log(res)
        this.cancelColl = [];
        this.cancelColl2 = [];
        this.isEdit = false;
        this.isCollect = false;
        this.editor = "编辑";
      });
    },
    //新闻详情跳转
    gotTextNewDetails(type, id, state) {
      //编辑状态下不可点击进详情
      if(this.editor=='完成'){
        return;
      }
      if (state == 2) {
        Toast({
          message: "抱歉！该热闻已被删除，已无法查看详情",
          position: "middle",
          duration: 2000
        });
      } else {
        if (type === 0) {
          this.$router.push({
            path: "/enterpriseNewsCenter/textNewDetails",
            query: { newsId: id }
          });
        } else if (type === 1) {
          this.$router.push({
            path: "/enterpriseNewsCenter/moveNewDetails",
            query: { newsId: id }
          });
        } else {
        }
      }
    },
    //新闻取消收藏 参数形成
    checkNewDeletCollect(arrItem) {
      arrItem.IsHot = !arrItem.IsHot;
      const isTrueFn = value => value.IsHot == true;
      var checkArr = this.newCollectList.filter(isTrueFn);

      if (checkArr.length > 0) {
        this.ischeckNewCollects = true;
        var checkStrArr = [];
        checkArr.forEach(element => {
          checkStrArr.push(element.CollectId);
        });
        this.newDeletCollectParmaStr = checkStrArr.join("|");
        //console.log('新闻收藏取消id字符串',this.newDeletCollectParmaStr);
      } else {
        this.ischeckNewCollects = false;
        this.newDeletCollectParmaStr = ''

      }
    }
  }
};

//<style lang="less" type="stylesheet/css"   > 修改了scoped
</script>

<style lang="less" type="stylesheet/css"  >
@import "../../common/index.less";
#collection {
     width: 100%;
     background: #fff;
     position: absolute;
     left: 0;
     top: 0;
     bottom: 0;
     //修改列表样式问题 
     .mint-cell-title {
         display: none;
    }
}
 #collection .collection-header {
     height: 1.1891891891891893rem;
     text-align: center;
     line-height: 1.1891891891891893rem;
     position: absolute;
     top: 0rem;
     z-index: 999;
     width: 100%;
     background: #fff;
     border-bottom: 1px solid #ebe5e1;
}
 #collection .wrap {
     position: relative;
     left: 0;
     bottom: 0;
     //top: 2.4054054054054053rem;
     overflow: auto;
     width: 100%;
}
 .mint-cell-swipe-button {
     line-height: 3.135135135135135rem !important;
     background: #ff6b5f !important;
}
 #collection .return {
     float: left;
     width: 15%;
     height: 100%;
    /*padding-left: 0.40540540540540543rem;
     */
     .bg-image("../../assets/images/tabBar/nav_back");
     background-size: 38%;
     background-position: 0.40540540540540543rem 0.32432432432432434rem;
}
 #collection .collection-header .edit {
     width: 15%;
     color: #333;
     font-size: 0.43243243243243246rem;
     float: right;
}
 #collection .collection-header .title {
     font-size: 0.4864864864864865rem;
     color: #000;
     font-weight: normal;
     display: block;
     margin: 0 auto;
     float: left;
     width: 70%;
}
#collection /deep/ .mint-cell .mint-cell-wrapper{
  height: 100%;
  padding-right: 0;
  // border: 1px solid #000;
}
/*#collection .promotion_list:nth-child(2){
     margin-top: 1.1891891891891893rem;
}
 */
 #collection .promotion_list.selected {
     margin-bottom: 1.3513513513513513rem;
}
 #collection .invalid .promotion_list:nth-child(2) {
     margin-top: 0rem;
}
.box{
  border-bottom: 1px solid #ebe5e1;
}
 .promotion_list {
     height: 3.1621621621621623rem;
    //  border-bottom: 1px solid #ebe5e1;
     overflow: hidden;
     transition: all 0.3s linear;
}
 .invalid {
     border-top: 0.32432432432432434rem solid #efeff4;
     padding-top: 1.1891891891891893rem;
}
 .invalid.active {
     padding-top: 0;
     border-top: 0.32432432432432434rem solid #efeff4;
     margin-bottom: 1.3513513513513513rem;
}
 .promotion_list.active {
     transform: translateX(-20%);
}
 .xiangqig {
     font-size: 0.32rem;
     display: -webkit-box;
     -webkit-box-orient: vertical;
     -webkit-line-clamp: 1;
     overflow: hidden;
     width: 100%;
}
 .promotion_list_detail {
    /*width: 80%;
     */
     height: 100%;
    /*margin-left: 0.32432432432432434rem;
     */
    //  margin-top: 0.35135135135135137rem;
     float: left;
     box-sizing: border-box;
     display: flex;
     width: 100%;
}
 .promotion_list_detail .checkList {
     width: 0.8108108108108109rem;
     display: flex;
     margin-left: -0.533333rem;
}
.promotion_list_detail .edi_check{
    width: 0.8108108108108109rem;
    display: flex;
    margin-left: 0rem;
}
 .circle {
     // display: none;
     width: 0.4864864864864865rem;
     height: 0.4864864864864865rem;
     border-radius: 50%;
     border: 1px solid #6b646b;
     margin: auto;
     // .bg-image('../../assets/images/tabBar/select_box');
     background-size: 0.4864864864864865rem 0.4864864864864865rem;
}
 .redCircle {
     width: 0.4864864864864865rem;
     height: 0.4864864864864865rem;
     border-radius: 50%;
    //  border: 1px solid #6b646b;
     margin: auto;
     .bg-image("../../assets/images/tabBar/select_boxS");
     background-size: 0.4864864864864865rem 0.4864864864864865rem;
}
 .promotion_img {
     width: 2.43243243rem;
     height: 2.43243243rem;
     /* margin-left: 0.32432432432432434rem; */
     position: relative;
     border: 1px solid #eee;
     margin-top: 13px;
}
 .promotion_img img {
     width: 100%;
     height: 100%;
}
 .mongolia {
     font-size: 0.43243243243243246rem;
     color: #fff;
     position: absolute;
     left: 0;
     top: 0;
     width: 100%;
     height: 100%;
     line-height: 2.4324324324324325rem;
     text-align: center;
     background: rgba(0, 0, 0, 0.4);
}
 .promotion_particulars {
     flex: 1;
     padding-left: 0.2972972972972973rem;
     border-bottom: 1px solid #eee;
     height: 100%;
}
 .promotion_particulars div {
     height: 0.5945945945945946rem;
     line-height: 0.5945945945945946rem;
     .cf6;
}
 .promotion_particulars .title {
    margin-top: 0.266667rem;
}
 .promotion_particulars .promotion_name {
     font-size: 0.40540540540540543rem;
     color: #000;
     display: block;
     white-space: nowrap;
     overflow: hidden;
     text-overflow: ellipsis;
     width: 5.405405405405405rem;
     float: left;
     font-size: 0.4rem;
     margin-top: 0.32rem;
}
 .promotion_particulars .promotion_activity {
     float: left;
}
 .promotion_particulars .promotion_activity label {
     width: 0.8108108108108109rem;
     height: 0.5405405405405406rem;
     padding: 0.05405405405405406rem;
     line-height: 0.40540540540540543rem;
     border: 1px solid #ff6b5f;
     border-radius: 0.05405405405405406rem;
     text-align: center;
     font-size: 0.2972972972972973rem;
     -webkit-transform: scale(0.9);
     display: inline-block;
     color: #ff6b5f;
}
 .promotion_money {
     margin-top: 0.10540540540540543rem;
}
 .promotion_money .discount {
     color: #ff6b5f;
     font-size: 0.3783783783783784rem;
}
 .promotion_money .discount label {
     font-size: 0.35135135135135137rem;
}
 .abolish {
     color: #999;
     font-size: 0.32432432432432434rem;
}
 .sales_volume {
     float: right;
     color: #999;
     font-size: 0.32432432432432434rem;
     position: absolute;
     right: 0.2702702702702703rem;
}
 .collection-cancel {
     width: 20%;
     height: 3.108108108108108rem;
     float: left;
     background: red;
     color: #fff;
     font-size: 0.43243243243243246rem;
}
 .collection-cancel p:nth-child(1) {
     height: 0.43243243243243246rem;
     margin-top: 1.1081081081081081rem;
     text-align: center;
}
 .collection-cancel p:nth-child(2) {
     text-align: center;
     height: 0.43243243243243246rem;
}
 .dataNull {
     border: 1px solid #fff;
     height: 15.567567567567568rem;
     background: #fff;
     background-size: 50%;
     background-position: 50% 20%;
     .bg-image("../../assets/images/mine/collection/collection-null");
}
 .dataNull span {
     margin-top: 72%;
     display: block;
     color: #666;
     text-align: center;
}
 .dataNull div {
     margin: 0 auto;
     margin-top: 0.6756756756756757rem;
     width: 1.945945945945946rem;
     height: 0.7567567567567568rem;
     border: 1px solid #ff6b5f;
     border-radius: 0.05405405405405406rem;
     font-size: 0.32432432432432434rem;
     color: #ff6b5f;
     text-align: center;
     line-height: 0.7567567567567568rem;
     box-sizing: content-box;
}
 .collect {
     height: 1.306667rem;
     line-height: 1.306667rem;
     text-align: center;
     width: 100%;
     font-size: 0.4rem;
     .cff;
     bottom: 0;
     // position: absolute;
     position: fixed;
     background: #ccc;
}
 .collect.selected {
     width: 10rem;
     height: 1.306667rem;
     background-color: #ff6b5f;
     background-image: none;
}
 .genders {
     padding: 0.32432432432432434rem;
     background-color: rgba(250, 250, 250, 0);
}
 @media screen and (max-width: 8.64864864864865rem) {
     .abolish {
         display: none;
    }
}
/* 导航 */
 .c-nav {
     display: flex;
     align-items: center;
     height: 1.2162162162162162rem;
     margin-top: 1.1891891891891893rem;
     text-align: center;
     border-bottom: 1px solid #ebe5e1;
     box-sizing: border-box;
     span {
         flex: 0 1 50%;
         line-height: 1.135135135135135rem;
         font-size: 0.43243243243243246rem;
         border-bottom: 0.08108108108108109rem solid transparent;
         color: #666;
    }
     .nav-after {
         position: relative;
         &::after {
             content: "";
             position: absolute;
             right: 0;
             top: 50%;
             transform: translate(0, -50%);
             width: 1px;
             height: 0.9459459459459459rem;
             background-color: #ebe5e1;
        }
    }
     .active {
         border-bottom-color: #ff6b5f;
         color: #ff6b5f;
    }
}
/* 新闻内容 */
 .news-content {
     overflow: hidden;
     padding-left: 0.32432432432432434rem;
     //margin-bottom: 1.6216216216216217rem;
     background-color: #fff;
     .list{
         position: relative;
    }
     .new-list {
         display: flex;
         align-items: center;
         height: 2.7027027027027026rem;
         position:relative;
         .play_i{
             position: absolute;
             width: 1.87733333rem !important;
             height: 1.87733333rem !important;
             position: absolute;
             left: 50%;
             top: 50%;
             margin-top: -0.93866667rem;
             margin-left: -0.93866667rem;
        }
    }
     .new-check {
         flex: 0 0 0.8108108108108109rem;
         i {
             width: 0.4864864864864865rem;
             height: 0.4864864864864865rem;
             border: 1px solid #999;
             border-radius: 0.40540540540540543rem;
        }
         .chack-active {
             border: 1px solid transparent;
             .bg-image("../../assets/images/tabBar/select_boxS");
             background-size: 100%;
        }
    }
     .new-item {
         flex: 1;
         display: flex;
         padding: 0.40540540540540543rem 0;
         border-bottom: 1px solid #ebe5e1;
         .item-img {
             position: relative;
             flex: 0 0 2.972972972972973rem;
             height: 1.8918918918918919rem;
             margin-right: 0.2702702702702703rem;
             //border: 1px solid #ccc;
             img {
                 width: 100%;
                 height: 100%;
            }
        }
         .item-text {
             flex: 1;
             .title {
                 display: -webkit-box;
                 -webkit-box-orient: vertical;
                 -webkit-line-clamp: 2;
                 overflow: hidden;
                 padding-top: 0.10810810810810811rem;
                 line-height: 1.2;
                 font-size: 0.4rem;
                 color: #333;
            }
             .name {
                 padding-top: 0.2702702702702703rem;
                 line-height: 1.2;
                 font-size: 0.32432432432432434rem;
                 color: #999;
                 .num {
                     position: relative;
                     margin-left: 0.8108108108108109rem;
                     &::before {
                         content: "";
                         position: absolute;
                         top: 0.13513513513513514rem;
                         left: -0.4864864864864865rem;
                         width: 0.3783783783783784rem;
                         height: 0.21621621621621623rem;
                         .bg-image("../../assets/images/tabBar/eyes");
                         background-size: 100%;
                    }
                }
            }
        }
    }
     .delete {
         position: absolute;
         right: -2.054054054054054rem;
         top: 0;
         height: 100%;
         width: 1.866667rem;
         color: #fff;
         font-size: 0.32rem;
         text-align: center;
         line-height: 2.7027027027027026rem;
         border-bottom: 1px solid #ebe5e1;
        //  border-top: 1px solid #ebe5e1;
         background-color: red;
    }
}
 //iphone5 兼容问题 
 @media screen and (max-width:8.64864864864865rem){
     .news-content .new-list .play_i{
         left:50%;
         margin-left: -5.5rem;
    }
}
#collection /deep/ .mint-cell-value{
  width: 100%;
  height: 100%;
} 
</style>
