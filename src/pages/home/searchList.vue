<template>
	<div id="searchList">
		<div class="search_box">
			<span class="return"><span @click="goBack"></span> </span>
		  	<input type="text" placeholder="公司注册" class="search_in" autocomplete="off" @keyup.enter="search()" v-model="value"/>
		  	<label class="search"><img src="../../assets/images/tabBar/search@3x.png" /></label>
		  	<!--<a href="#" class="information">
		  		<i></i>
		  		<label>9</label>
		  	</a>-->
		</div>
		<div class="search-list" v-if="isShow">
			<ul>
				<li v-for="data in searchData" @click="goProductA(data.name)">{{data.name}}</li>
			</ul>
		</div>
  		<div class="promotion_list" v-for="data in productList" @click="goProduct(data.Id,data.Type)">
  			<div class="promotion_img"><img :src="data.ThumbImgURL"/></div>
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
  		<div class="dataNull" v-if="productList.length==0">
  			<span>您寻找的"{{value}}"还未上架<br/>换个词试试</span>
  		</div>
	</div>
</template>

<script>
import getd from "../../vuex/getData.js";
import tool from "../../util/tool.js";
import { getSession } from "../../util/base";
export default {
  data() {
    return {
      productList: [],
      value: "",
      isId: this.$route.query.id ? true : false,
      isSearchName: this.$route.query.searchName ? true : false,
      isShow: false,
      searchResult: []
    };
  },
  created() {
    console.log("------", this.$route.query.classId);
    if (this.$route.query.id) {
      var params = {
        id: this.$route.query.id
      };

      getd.getProductList(params).then(res => {
        this.productList = res.data.list;
      });
    } else if (this.$route.query.searchName) {
      //  模糊搜索用户名，服务分类
      this.value = this.$route.query.searchName;
      if (getSession("_sous_") === 1) {
        this.getSearchList();
      } else {
        this.getSearchListAll();
      }
    }
  },
  methods: {
    // 根据大类的ID查找详情，Id必传
    getSearchListAll() {
      const newObj = {
        params: {
          searchName: this.$route.query.searchName,
          classId: this.$route.query.classId
        }
      };
      getd.searchListAll(newObj).then(res => {
        this.productList = res.data.list;
      });
    },
    // 以前的模糊搜索，可以搜索全部
    getSearchList() {
      const newObj = {
        params: {
          searchName: this.$route.query.searchName
        }
      };
      getd.searchList(newObj).then(res => {
        this.productList = res.data.list;
      });
    },
    //返回判断
    goBack() {
      // if (this.$route.query.style == 0) {
      //   //返回优惠券
      //   this.$router.push("/mine/coupon");
      // } else if (this.$route.query.style == 1) {
      //   //返回搜索页
      //   if (getSession("_sous_") === 1) {
      //     this.$router.push("/home/sous");
      //   } else {
      //      this.$router.push("/home/serveClassify");
      //    /*  this.$router.go(-1); */
      //   }
      // } else if (this.$route.query.style == 2) {
      //   //返回领券中心
      //   this.$router.push("/mine/getCoupon");
      // } else {
      //  console.log('什么什么',this.value)
      //   if(this.value){
      //       this.$router.replace({
      //       path: "/home/searchList",
      //       query: { searchName: this.value, style: this.$route.query.style }
      //     });
      //   }else{
      this.$router.go(-1);
      // }
      // }
    },
    goProduct(id, type) {
      this.$router.push({
        path: "/home/productDetails",
        query: { id: id, type: type }
      });
    },
    search() {
      if (this.value) {
        //存入本地
        tool.judgment("pro", "", this.value);
        this.$router.replace({
          path: "/home/searchList",
          query: { searchName: this.value, style: this.$route.query.style }
        });
        this.isShow = false;
      }
    },
    goProductA(val) {
      this.isShow = false;
      tool.judgment("pro", "", val);
      this.$router.replace({
        path: "/home/searchList",
        query: { searchName: val, style: this.$route.query.style }
      });

      //    this.$router.go(0);
    }
  },
  watch: {
    //路由变化刷新
    $route: function(route) {
      var newObj = {
        params: {
          searchName: this.value
        }
      };
      getd.searchList(newObj).then(res => {
        this.productList = res.data.list;
      });
    }
  },
  computed: {
    //模糊查询
    searchData: function() {
      var value0 = this.$route.query.searchName;
      var value1 = this.value;
      if (value1.length > 0) {
        return tool.fuzzySearch(value1, this.searchResult);
      }
      //			 	else{
      //					return this.productList.filter(v => new RegExp(value0, 'g').test(v.Name));
      //				};
    }
  },
  mounted() {
    //在用户输入一次后和再次输入之间的时间间隔大于500ms就让第一次发送
    this.$watch("value", (newVal, oldVal) => {
      tool.sendSearchName(
        newVal,
        oldVal,
        "value",
        "isShow",
        "searchResult",
        "/Product/GetIndistinctList",
        this,
        1
      );
    });
  }
};
</script>

<style lang="less" type="stylesheet/css" scoped>
@import "../../common/index.less";
#searchList {
  width: 100%;
  height: 100%;
  padding-bottom: 1.0810810810810811rem;
  background: #fff;
  position: relative;
}
.search_box {
  position: relative;
  width: 100%;
  height: 1.1891891891891893rem;
  padding: 0.2rem 0.32432432432432434rem;
  border-bottom: 1px solid #cccccc;
  background: #fff;
}
.search_box img {
  width: 0.7027027027027027rem;
  height: 0.7027027027027027rem;
}
.search_in {
  padding:0;  
  font-size: 0.373333rem;
  border-radius: 0.43243243243243246rem;
  border: none;
  color: #b3b0ad; 
  height: 0.8rem;
  line-height: 0.8rem;
  padding-left: 0.9459459459459459rem;
  margin: 0rem 0 0 0.13513513513513514rem;
  width: 76%; 
 
  border: 1px solid #ccc;
}
.search_box .search {
  position: absolute;
  top:0.234133rem;
  left: 1.1rem;
  height: 0.8108108108108109rem;
  line-height: 1.027027027027027rem;
}
.search_box label img {
  width: 0.386667rem;
  height: 0.386667rem;
  margin-left: 0.21621621621621623rem;
}
.information {
  width: 0.8108108108108109rem;
  height: 0.8108108108108109rem;
  display: block;
  float: right;
}
.information label {
  position: absolute;
  display: block;
  width: 0.4864864864864865rem;
  height: 0.4864864864864865rem;
  border-radius: 50%;
  text-align: center;
  line-height: 0.43243243243243246rem;
  background-color: #ff5000;
  color: #fff;
  -webkit-transform: scale(0.8);
  font-size: 0.2702702702702703rem;
  margin: -0.9459459459459459rem 0rem 0rem 0.40540540540540543rem;
  z-index: 999;
  float: right;
}
.search_box i {
  width: 0.7027027027027027rem;
  height: 0.7027027027027027rem;
  .bg-image("../.././assets/images/tabBar/messageS");
  background-size: 0.7027027027027027rem 0.7027027027027027rem;
}
 
 
.search_box label img {
  width: 0.43243243243243246rem;
  height: 0.43243243243243246rem;
  margin: 0.16216216216216217rem 0.32432432432432434rem;
}
.return {
  float: left;
  margin: -0.24324324324324326rem 0.32432432432432434rem 0rem -0.35135135135135137rem;
  height: 1.0810810810810811rem;
  width: 0.6486486486486487rem;
  .bg-image("../../assets/images/cart/nav_back");
  background-size: 100%;
  background-position: 0.40540540540540543rem 0.3rem;
}
.return span {
  width: 100%;
  height: 100%;
  display: block;
}
.promotion_list {
  background: #fff;
  width: 99%;
  height: 3.135135135135135rem;
  padding: 0.32432432432432434rem;
  border-bottom: 1px solid #ebe5e1;
}
.promotion_img {
  width: 2.4324324324324325rem;
  height: 2.4324324324324325rem;
  float: left;
}
.promotion_particulars {
  width: 95%;
  height: 2.4324324324324325rem;
  float: left;
  padding: 0.16216216216216217rem 0.10810810810810811rem 0.32432432432432434rem
    2.5945945945945947rem;
  position: absolute;
}
.promotion_particulars div {
  height: 0.5945945945945946rem;
  .cf6;
}
.promotion_particulars .promotion_name {
  font-size: 0.40540540540540543rem;
  color: #000;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 3.6486486486486487rem;
  float: left;
}
.promotion_particulars .promotion_activity {
  float: right;
}
.promotion_particulars .promotion_activity label {
  width: 0.8108108108108109rem;
  height: 0.5405405405405406rem;
  padding: 0.05405405405405406rem;
  line-height: 0.40540540540540543rem;
  border: 1px solid #fa2802;
  border-radius: 0.05405405405405406rem;
  text-align: center;
  font-size: 0.2972972972972973rem;
  -webkit-transform: scale(0.9);
  display: inline-block;
  color: #fa2802;
}
.promotion_money {
  margin-top: 0.40540540540540543rem;
}
.promotion_money .discount {
  color: #fa2802;
  margin-right: 0.13513513513513514rem;
}
.promotion_money .discount label {
  font-size: 0.35135135135135137rem;
}
.abolish {
  .cf6;
  font-size: 0.35135135135135137rem;
}
.sales_volume {
  float: right;
  .cf8C;
}
.mint-navbar .mint-tab-item.is-selected {
  height: 1.0810810810810811rem;
}
.search-list {
  position: absolute;
  left: 0;
  top: 1.1891891891891893rem;
  width: 100%;
  height: 100%;
  background: white;
  z-index: 99;
}
.search-list ul li {
  font-size: 0.3783783783783784rem;
  line-height: 0.7027027027027027rem;
  padding-left: 0.40540540540540543rem;
  padding-top: 0.4594594594594595rem;
}
.dataNull {
  border: 1px solid #fff;
  margin-top: -0.40540540540540543rem;
  height: 15.567567567567568rem;
  background: #fff;
  background-size: 50%;
  background-position: 50% 20%;
  .bg-image("../../assets/images/home/dataNull");
}
.dataNull span:nth-child(1) {
  margin-top: 72%;
  display: block;
  color: #666;
  text-align: center;
  font-size: 0.373333rem;
  line-height: 0.506667rem;
}
.dataNull span:nth-child(2) {
  border: 1px solid #fa2802;
  width: 1.8918918918918919rem;
  height: 0.7567567567567568rem;
  line-height: 0.7567567567567568rem;
  margin: 0.8108108108108109rem auto;
  display: block;
  color: #fa2802;
  text-align: center;
}
.xiangqig {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>