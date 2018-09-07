<template style="background:white;">
	<div id="discover">
	  <!-- 头部 -->
    <div class="search_box">
	    <span  class="richscan"><img @click="richscan" src="../../assets/Images/tabBar/scanS@3x.png" class="erweima"></span>
	    <!--扫一扫-->
	  	<input type="text" @click="sous" value="输入您想要办理的服务名称" class="search_in" readonly/>
	  	<label class="search"><img src="../../assets/images/tabBar/search@3x.png" ></label>
	  	<messageIcon   class="cartInformationWrap"   source="discover"></messageIcon>
	</div>

    <!--2.0滑屏优化  -->
    <div class="contentWrap">
      <div class="leftNav"  ref="leftNav" id="tabbar">
        <mt-navbar v-model="selected" class="tabbar">
          <mt-tab-item  :id="item.Id" class="swiper" v-for="(item,index) in arr" :key="index" @click.native="changeSelected(item,index)">
            {{ item.Name }}
			    </mt-tab-item>
        </mt-navbar>
      </div>
      <div class="rightNav" ref="rightNav" id="classify">
        <div class="classify">
          <!-- 全部分类 -->
          <div class="hotSale hotSale_one">
            <div class="promotion_top">
              <span class="promotion_top_left">全部分类</span>
            </div>
          </div>
          <mt-tab-container v-model="selected">
            <mt-tab-container-item  id="item.Id" style="display:block;"  v-for="(item) in arr" :key="item.Id" @click.stop>
              <div class="headerIcon">
                <ul>
                  <li v-for="(item,index) in list" :key="index"  @click.stop="serveClassify(item,index)">
                    <div>
                      <img v-if="item.ImgUrl" :src="item.ImgUrl">
                      <img v-else src="../../assets/images/productDetails/engraved@3x.png">
                      <span>{{ item.Name }}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </mt-tab-container-item>
          </mt-tab-container>
          <!-- 热销服务 -->
          <div class="hotSale">
          	<!--<div>{{dataProductHotFn}}</div>-->
            <div class="promotion_top">
              <span class="promotion_top_left">热销服务</span>
            </div>
          </div>
          <div :class="product.length>=3?'promotion':'promotion1'">
            <div class="promotion_body">
              <div class="promotion_list" v-for="(item,index) in dataProductHotFn" :key="index" @click="toProductInfo(item,index)">
                <!-- <div>{{item}}</div> -->
                <div class="promotion_img">
                  <img :src="item.ImgUrl">
                </div>
                <div class="promotion_particulars">
                  <div>
                    <span class="promotion_name">{{ item.Name }}</span>
                    <!--<span class="promotion_activity">
                        <label v-if="item.Discount&&((item.Discount/10)!=10) ">折扣</label>
                        <label v-if="item.IsSeckill == true">促销</label>
                    </span>-->
                    </div>
                    <!--<div class="promotion_title">{{ item.Title }}</div>-->
                    <div class="promotion_money">
                       <!-- <span class="themeC nowPrice">{{value.Price | formatPrice | currency}}<b>{{value.Price|formatPriceX}}</b>
                            </span> -->
                        <span class="discount">{{ item.Price| formatPrice |currency}}<b>{{item.Price | formatPriceX}} </b></span>
                        <span class="sales_volume">销量：{{item.Sold}}</span>
                    </div>
                </div>
              </div>
              <!-- 已经到底了 -->
              <div class="footerLine">————已经到底了————</div>
            </div>
          </div>
          <div ref="abcdef" style="display: none;"></div>
        </div>
      </div>
    </div>
	<!-- 底部导航栏 -->
    <footer-nav></footer-nav>
	</div>
</template>
<script>
import footerNav from "../../footer-nav";
import { Navbar, TabItem } from "mint-ui";
import util from "../../util/tool";
import messageIcon from "../message/messageIcon";
import BScroll from "better-scroll";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import { setSession, removeSession } from "../../util/base";
export default {
  name: "serve",
  data() {
    return {
      // selected:"c91cddc8-4a12-4e85-a7e4-1861aa633dca", //tab选项卡默认选中第一个
      selected: util.loadFromLocal('sever_index','sever_index','sever_index',false).id?util.loadFromLocal('sever_index','sever_index','sever_index',false).id:"7c057018-a1a1-4fab-8951-57be6cfc8acb", //tab选项卡默认选中第一个
      imgs: [
        { image: "../../assets/images/productDetails/registration@3x.png" },
        { image: "../../assets/images/productDetails/engraved@3x.png" },
        { image: "../../assets/images/productDetails/toreport@3x.png" },
        { image: "../../assets/images/productDetails/change@3x.png" }
      ],
      nowAllIndexId: "",
      t1: null,
      oneServerId: "",
      oneServerName: "",
    };
  },
  created() {
    // 商品分类列表获取数据（tab切换一级菜单）
    var self = this;
    //初始化 请求数据
    this.initData(self);
  },
  updated() {
    this._initScrollTwo(); //bug点击事件触发多次 事件初增加目前解决方案
  },
  mounted() {
 
  },

  computed: {
    ...mapState("serve", ["abc"]),
    ...mapGetters("serve", ["dataProductHotFn"]),
    arr() {
      //商品一级分类列表获取数据
      var arrTemp = this.$store.state.serve.dataValue.list;
      if (!arrTemp) {
        return;
      }
      return arrTemp;
    },
    list() {
      //商品二级服务列表获取数据
      var listTemp = this.$store.state.serve.dataList.list;
      if (!listTemp || !listTemp.length) {
        return;
      }
      this.nowAllIndexId = listTemp[0].Id;
      return listTemp;
    },
    product() {
      //根据三级分类获取产品列表请求数据
      var productTemp = this.$store.state.serve.dataProduct;
      // 如果列表数据超过4条  则截取前4条数据展示
      if (productTemp.length > 4) {
        productTemp = productTemp.slice(0, 10);
      }
      return productTemp;
    }
  },
  components: {
    footerNav,
    Navbar,
    TabItem,
    messageIcon
  },
  methods: {
    ...mapActions("serve", {
      server_data_list: "server_data_list",
      server_product_list: "server_product_list",
      server_product_infor: "server_product_infor",
      server_product_hot: "server_product_hot"
    }),
    //左右滑屏初始化
    _initScrollTwo() {
      if (!this.$refs.leftNav) {
        return;
      }
      this.$nextTick(() => {
        let scroll1 = new BScroll(this.$refs.leftNav, {
          scrollX: false,
          scrollY: true,
          click: true //配置对象 触发点击
        });

        let scroll2 = new BScroll(this.$refs.rightNav, {
          scrollX: false,
          scrollY: true,
          click: true //配置对象 触发点击
        });
      });
    },
    richscan() {
      this.$router.push("/home/scan");
    },
    initData(self) { //初始化时-云服务的数据
      //一级菜单
       var _id = util.loadFromLocal('sever_index','sever_index','sever_index',false).id
       var _name = util.loadFromLocal('sever_index','sever_index','sever_index',false).name
      this.server_data_list().then(res => {
        // console.log("res", res);
        var firstMenu = self.$store.state.serve.dataValue.list; 
       
        let data = {                        
          params: {
            classId: _id?_id:firstMenu[0].Id
          }
        };
        //二级菜单
        this.server_product_list(data).then(() => {
          let id = this.$store.state.serve.dataList.list;
          if (!id || !id.length) {
            return;
          }
          let data = {
            params: {
              classId:  _id?_id:firstMenu[0].Id,
              num: 10000
            }
          };
          //三级菜单
          this.server_product_hot(data).then(() => {});
        });
        this.oneServerId =  _id?_id:firstMenu[0].Id;
        this.oneServerName = _name?_name:firstMenu[0].Name;
      });
    },
    secondData(self, value) {
      this.server_data_list().then(res => {
        var firstMenu = self.$store.state.serve.dataValue.list;
        let data = {
          params: {
            classId: value
          }
        };
        //二级菜单
        this.server_product_list(data).then(() => {
          let id = this.$store.state.serve.dataList.list;
          if (!id || !id.length) {
            return;
          }
          let data = {
            params: {
              classId: value,
              num: 10000
            }
          };
          //三级菜单
          this.server_product_hot(data).then(() => {});
        });
      });
    },
    changeSelected(value,index) {
      //解决滑屏点击bug
      if (this.t1 == null) {
        this.t1 = new Date().getTime();
      } else {
        var t2 = new Date().getTime();
        if (t2 - this.t1 < 500) {
          this.t1 = t2;
          return;
        } else {
          this.t1 = t2;
        }
      }
      //改变tab的v-model 对应的id
      //使用滑屏插件触发多次该事件
      this.selected = value.Id;
      this.oneServerId = value.Id;
      this.oneServerName = value.Name;
      //用户选中后重新传值
      let self = this;
      this.secondData(self, value.Id);
      let obj = {
        'id':value.Id,
        'name':value.Name
      }
      util.saveToLocal('sever_index','sever_index','sever_index',obj)
    },
    hotAll() {
      this.$router.push("/home/popularity");
    },
    serveClassify(itme, i) {
      console.log( this.oneServerName )
      let index = i + 1;
      this.$router.push({
        path: "/home/serveClassify",
        query: {
          id: this.oneServerId,
          name: encodeURI(this.oneServerName),
          index: 0,
          classIndex: index
        }
      });
      util.saveToLocal('_serveQuery_','_serveQuery_','_serveQuery_',{
        name: this.oneServerName,
        classId: this.oneServerId,
        navIndex:index
      })
      // setSession("_serveQuery_", {
      //   name: this.oneServerName,
      //   classId: this.oneServerId,
      //   navIndex:index
      // });
      removeSession("_selected_");
    },
    toProductInfo(value, index) {
      //点击列表进入相应的商品详情页面
      //解决滑屏点击bug
      if (this.t1 == null) {
        this.t1 = new Date().getTime();
      } else {
        var t2 = new Date().getTime();
        if (t2 - this.t1 < 500) {
          this.t1 = t2;
          return;
        } else {
          this.t1 = t2;
        }
      }
      this.$router.push({
        path: "/home/productDetails",
        query: { id: value.Id, type: value.Type }
      });
    },
    sous() {
      this.$router.push("/home/sous");
      setSession("_sous_", 1);
    },
    my_message() {
      //跳转到消息页面
      this.$router.push("/message");
    }
  },
  filters: {
    formatPrice(detail) {
      return util.formatPrice(detail);
    },
    formatPriceX(detail) {
      return util.formatPriceX(detail);
    },
    currency(detail) {
      return util.currency(detail);
    }
  }
};
</script>

<style lang="less" type="stylesheet/css"  scoped>
@import "../../common/index.less";
@import "./serve.less";
@import "../../common/base.less";
</style>
