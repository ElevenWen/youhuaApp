<template>
  <div id="serveClassify" :class="{'hidden':isShow}" >

    <div class="popularity_return">
        <span  class="return  promotion_top_right" @click="toBack"></span>
        <span class="title_name" @click="sous">
          <img src="../../assets/images/tabBar/search@3x.png" alt="">
          <span>请输入关键字</span>
        </span>
        <span class="imgSpan" @click="goMessage">
          <img src="../../assets/images/productDetails/B-Notice-H@3x.png" alt="">
        </span>
    </div>
    <div class="serveClassify">
    <div class="tabWrap">
<!-- tab切换 -->
      <div ref="wrapper"  class="wrapper"  > 
        <ul ref="tab" style="" class="seconedUl">
          <li  @click.stop.prevent="tablistFn(index,data,$event)" 
            ref="tablist" 
         
            v-for="(data,index) in datas" :key="index"
            class="swiper"  :class="{'is-selected': current == index}"
            >
            <div @mouseover.prevent.stop="fn">{{data.Name}}{{data.pclassId}}</div>
          </li>
        </ul> 
      </div>
    <!--/ tab切换 --> 
    <div class="sort moreStyle">
      <ul>
        <li @click="sortZH" :class="{active:ZH}">综合</li>
        <li @click="sort_Px(1)" :class="{active:saleStyle}">销量</li>
        <li @click="sort_Px(2)" :class="{active:priceStyle}">价格</li>
      </ul>
    </div>
    </div>
    <!-- tab内容 -->
     <ul 
        v-if="threeList.length> 0" 
        class="noTop" 
        :class="{'flex-top':flexnav}" 
        v-infinite-scroll="loadMore" 
        infinite-scroll-disabled="loading"  
        infinite-scroll-distance="60"   
        infinite-scroll-immediate-check="true"
        @touchmove = "touchmoveScroll($event)"
      >
        <li v-for="data in threeList" :key="data.id" @click="goProduct(data.Id,data.Type)" class="promotion_list"   >
          <div class="promotion_img"><img :src="data.ImgUrl"/></div>
          <div class="promotion_particulars">
            <div class="line">
              <div>
              <span class="promotion_name">{{data.Name}}</span>
              <span class="promotion_activity">
                <!--  <label>折扣</label> -->
              </span>
            </div>
            <div class="xiangqig">{{data.Intro}}</div>
            <div class="promotion_money">
              <!-- <span class="discount">{{data.Price | formatPrice}<label></label></span> -->
              <span class="discount">{{data.Price  | formatPrice |currency}}<b>{{data.Price  | formatPriceX}}</b><label></label></span> 
              <del class="abolish" v-if="data.Price < data.oldPrice">{{data.oldPrice  | formatPrice |currency}}<b>{{data.Price  | formatPriceX}}</b><label></label></del> 
              <span class="sales_volume">销量:{{data.Sold}}</span>
            </div>
            </div>
          </div>
        </li>
      </ul>
      <div v-else class="noData"> 
        <img src="../../assets/images/BusinessQuery/bgD@3x.png" alt="暂无数据！">
        <p>暂无数据！</p> 
      </div>
     
    <!--/ tab内容 -->
    
     

		</div>
     <div class="deep">————已经到底了————</div>
	</div>
</template>




<script>
import Vue from "vue";
import headerTitle from "../components/header-title";
import getd from "../../vuex/getData.js";
import { setSession, getSession } from "../../util/base";
import BScroll from 'better-scroll';
import  tool from "../../util/tool";


const PAGESIZE = 10;
export default {
  data() {
    return {
      selected: null,
      isShow: false,
      isSort: false,
      datas: [], //二级分类
      threeList: [], //三级列表
      headTitle: "", //头部名字
      pageIndex: 1,
      loading: false,
      flexnav: false,
      scroll:false,
      current:0,
       styleObj1:'position:fixed; left: 0;top: 0.5405405405405406rem;width: 100%; background-color: #fff;z-index: 88;top: 1.01rem;',
      styleObj2 : 'position:fixed; left: 0;top: 0.5405405405405406rem;width: 100%; background-color: #fff;z-index: 88;top: 2.275rem',
      styleObjStatic:'position:static; left: auto;top:0',
      ZH: true,
      saleTag: false,
      priceTag: false,
      saleStyle: false,
      priceStyle: false,
    };
  },
  mounted() {
    this.current = this.$route.query.classIndex;
    //初始化scroll
    // 返回0 默认转义为 false， 所以这个是返回字符串
    let selected = window.sessionStorage.getItem("_selected_");
    this.selected = selected
      ? getSession("_selected_")
      : parseInt(this.$route.query.classIndex);

    this.val = null;
    this.classId = this.$route.query.id;
    this.getNavList();
    window.addEventListener("scroll", this.scrollTop);
  },
  components: {
    headerTitle
  },
  methods: {
    tablistFn(index,{Id},el){ 
      console.log(1)
      this.current = index;
      this.scroll.scrollToElement(el.target, 300, true, false, 'easing') 
      this.selected = index;
      setSession("_selected_", this.selected);
      this.isShow = false;
      this.pageIndex = 1;
      this.classId = Id;
      this.threeList = [];
      this.getSortList(Id, this.pageIndex);
    },
    fn(e){
      // console.log(e)
      return false
    },
    sortZH(){
      this.getNavList();
      this.ZH = true;
      this.priceStyle = false;
      this.saleStyle = false;
      this.saleTag = false;
      this.priceTag = false;
    },
    goMessage(){
      this.$router.push('/message?length=0')
    },
    // 获取导航栏
    getNavList() {
      this.threeList = [];
      // let { name, classId, navIndex } = getSession("_serveQuery_");
      let { name, classId, navIndex } = tool.loadFromLocal(
          "_serveQuery_",
          "_serveQuery_",
          "_serveQuery_",
          false
        );
      this.pageIndex = 1;
      let titleId = classId ? classId : this.classId;
      this.headTitle = name ? name : decodeURI(this.$route.query.name);
      const param = {
        params: {
          classId: titleId,
          name: this.headTitle,
          index: this.$route.query.index || 0
        }
      };

      getd
        .SERVER_PRODUCT_HOT(param)
        .then(res => {
          this.datas = res.data.list;
          this.datas.unshift({
            Name: "所有服务",
            Id: titleId
          });

          this.$nextTick(()=>{
              // console.log(this.scroll,this.$refs.tablist)
              // console.log(this.scroll,this.$refs.tablist.length)
                  let width=0
                  for (let  i = 0; i <this.$refs.tablist.length; i++) {
                      width+=this.$refs.tablist[i].getBoundingClientRect().width; //getBoundingClientRect() 返回元素的大小及其相对于视口的位置
                  }
                  this.$refs.tab.style.width=width+'px'
                
                      if (!this.scroll) {
                        this.scroll=new BScroll(this.$refs.wrapper, {
                          startX:0,
                          probeType:3,
                          click:true,
                          scrollX:true,
                          scrollY:false, 
                          // eventPassthrough:'horizontal',
                          tap :true, 
                        });
                        for (let  i = 0; i <this.$refs.tablist.length; i++) {
                            if(this.$route.query.classIndex==i){
                              console.log('made',this.$refs.tablist[i])
                              this.scroll.scrollToElement(this.$refs.tablist[i], 300, true, true, 'easing') 
                            }
                        }
                      }else{
                        this.scroll.refresh()
                      } 
            })

        })
        .then(() => {
          // console.log(navIndex, this.selected);
          let ID;
          if (!isNaN(this.selected)) {
            ID = JSON.stringify(this.selected) ? this.selected : navIndex;
          } else {
            ID = navIndex;
            this.selected = navIndex;
          }
          // console.log(ID);
          this.getSortList(this.datas[ID].Id, this.pageIndex);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //根据二级分类获取三级产品
    tabCelect(Id, index) {
      this.selected = index;
      setSession("_selected_", this.selected);
      this.isShow = false;
      this.pageIndex = 1;
      this.classId = Id;
      this.threeList = [];
      this.getSortList(Id, this.pageIndex);
    },
    // 排序数据请求
    getSortList(id, pageIndex, sort = "") {
      const paramThree = {
        params: {
          classId: id,
          pageSize: PAGESIZE,
          pageIndex: pageIndex,
          sort: sort
        }
      };
      getd.getProductThree(paramThree).then(res => {
        let dataList = res.data.list;
        this.threeList.push(...dataList);
        this.loading = dataList.length >= PAGESIZE ? false : true;
      });
    },

    //排序
    sort_Px(val) {
      if(val == 2){
        if(!this.saleTag){
          val = 2
          this.saleTag = true;
        }else{
          val = 3
          this.saleTag = false;
        }
        this.saleStyle = false;
        this.ZH = false;
        this.priceStyle = true;
        this.priceTag = false;
      }else if(val == 1){
        if(!this.priceTag){
          val = 1
          this.priceTag = true;
        }else{
          val = 4
          this.priceTag = false;
        }
        this.saleStyle = true;
        this.ZH = false;
        this.priceStyle = false;
        this.saleTag = false;
      }
      this.flexnav = false;
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      this.val = val;
      this.isShow = false;
      this.threeList = [];
      this.pageIndex = 1;
      let ID = this.datas[this.selected].Id;
      this.getSortList(ID, this.pageIndex, this.val);
    },
    loadMore() {
      this.pageIndex++;
      let ID = this.datas[this.selected].Id;
      if (!this.loading) {
        this.getSortList(ID, this.pageIndex, this.val);
      }
    },
    sous() {
      //  this.$router.push("/home/sous");
      this.$router.push({
        path: "/home/sous",
        query: { classId: this.classId }
      });
    },
    sort_ZH() {
      this.isShow = !this.isShow;
    },
    sort_SX() {
      this.isSort = !this.isSort;
    },
    toBack() {
      this.$router.go(-1);
      // this.$router.push("/serve");
    },
    goProduct(id, type) {
      this.$router.push({
        path: "/home/productDetails",
        query: { id: id, type: type }
      });
    },

   //  吸顶导航
    scrollTop() {
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
        var x =window.getComputedStyle(document.documentElement,null).getPropertyValue("font-size")
        let ab =x.substring(0,x.indexOf('px')) 
        this.flexnav = scrollTop >= 1.066668*ab ? true : false;
    
       if(this.flexnav ){
         
             document.getElementsByClassName('tabWrap')[0].style= this.styleObj1
         
            //  document.getElementsByClassName('wrapper')[0].style= this.styleObj1
            //  document.getElementsByClassName('sort')[0].style=  this.styleObj2 
          }else{
             document.getElementsByClassName('tabWrap')[0].style= this.styleObjStatic
            
            // document.getElementsByClassName('wrapper')[0].style= this.styleObjStatic
            //  document.getElementsByClassName('sort')[0].style= this.styleObjStatic
          }
    },
    touchmoveScroll(event){
        // if(tool.is_ios()){
        //   return 
        // }
        var target = event.targetTouches[0];//这个target就是目标元素 
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;   
        var x =window.getComputedStyle(document.documentElement,null).getPropertyValue("font-size")
        let ab =x.substring(0,x.indexOf('px')) 
        this.flexnav = scrollTop >= 1.066668*ab ? true : false; 

      console.log('come  bay' , scrollTop , this.flexnav )
        
         if(dpr <2){
        this.itemHeight = 36;
      }else if(dpr <=2){
        this.itemHeight = 72;
      }else{
        this.itemHeight = 108;
      }
         if(this.flexnav ){
            document.getElementsByClassName('tabWrap')[0].style= this.styleObj1
            //  document.getElementsByClassName('wrapper')[0].style= this.styleObj1
            //  document.getElementsByClassName('sort')[0].style=  this.styleObj2;
          }else{
             document.getElementsByClassName('tabWrap')[0].style= this.styleObjStatic
            
            // document.getElementsByClassName('wrapper')[0].style= this.styleObjStatic
            //  document.getElementsByClassName('sort')[0].style= this.styleObjStatic
          } 
    }
  }, 
  beforeDestroy() {
    window.removeEventListener("scroll", this.scrollTop);
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
    isEquality :value => {
      return tool.isEquality(value)
    }
  }
};
</script>

<style lang="less" type="stylesheet/css" scoped>
@import "../../common/index.less";
@import "./serveClassify.less";


.tabWrap{
  position: relative;
  background: white;
}
</style>
