<template>
  <div class="shop">
    <!-- 顶部 -->
    <div class="shop-head">
      <div class="head-search">
        <span class="back" @click="goBack"></span>
        <label for="search" class="search" @click="goSearch">
          <input type="text" name="search" id="search" placeholder="搜索店铺内宝贝" disabled>
        </label>
        <router-link to="/shopStore/shopClassify" class="classifY" >分类</router-link>
        <div class="more" @click="msgShow = !msgShow">
          <i class="more-num" v-show="msgShow">{{setMsgLeng}}</i>
          <div class="more-list" v-show="msgShow">
            <router-link to="/message" class="msg">消息  <i class="more-msg">{{setMsgLeng}}</i></router-link>
            <router-link to="/home" class="home">首页</router-link>
            <router-link to="/shopStore/shopClassify" class="classify">分类</router-link>
            <router-link to="/mine" class="mine">我的</router-link>
          </div>
        </div>
      </div>
      <div class="head-company">
        <div class="company-logo">
          <img src="../../assets/images/home/patent@3x.png" alt="logo">
        </div>
        <div class="company-title">
          <p>微企宝有限公司</p>
          <p style="line-height:1.8;">广东 深圳</p>
        </div>
        <div class="company-focuson">
          <span class="company-focuson-num">1233人</span>
          <button class="company-focuson-botton" :class="{'company-followed': followed}"  @click="companyFocuson">{{setFoucson}}</button>
        </div>
      </div>
    </div>

    <!-- 导航 -->
    <ul  class="shop-nav">
      <li v-for="(item, index) in navList" :key="item.id" @click="navTitle(index)"> <a class="nav-title " :class="{'nav-active':navIndex === index}"  href="javascript:;">{{item}}</a></li>
    </ul>

    <!-- 首页 -->
    <div v-if="navIndex === 0" style="text-align: center;">
       <!-- 优惠券 -->
      <ul class="shop-coupons">
        <li class="coupons" v-for="item in couponList" :key="item.id" @click="getCoupon(item)">
          <div class="coupons-text">
            <p class="coupons-money">{{item.money}}</p>
            <p class="coupons-num">{{item.num}}</p>
            <p class="coupons-date">{{item.date}}</p>
          </div>
        </li> 
      </ul> 
      <shop-list :list="setList"></shop-list>
      <button  class="shop-list-show" @click="goSearch"> 查看全部商品</button>
    </div>

    <!-- 全部商品 -->
    <div v-if="navIndex === 1">
      <shop-list :list="list"></shop-list>
    </div>

    <!-- 店铺介绍 -->
    <div v-if="navIndex === 2">
      <ul class="shop-introduce">
        <li>
          <span class="introduce-text">店铺名称</span>
          <span class="introduce-name">微企宝有限公司</span>
        </li>
        <li>
          <span class="introduce-text">所在地区</span>
          <span class="introduce-name">微企宝有限公司</span>
        </li>
        <li>
          <span class="introduce-text">联系方式</span>
          <span class="introduce-name">微企宝有限公司</span>
        </li>
        <li>
          <span class="introduce-text">店铺简介</span>
          <span class="introduce-name">微企宝有限公司</span>
        </li>
      </ul>

      <div class="shop-msg">
        <h4 class="msg-title">资质信息</h4>
        <div class="msg-img">
          <img src="../../assets/images/cart/add_icon@2x.png" alt="">
          <img src="../../assets/images/cart/add_icon@2x.png" alt="">
          <img src="../../assets/images/cart/add_icon@2x.png" alt="">
          <img src="../../assets/images/cart/add_icon@2x.png" alt="">
        </div>
      </div>
    </div>

    <!-- 底部 -->
    <div class="shop-footer">
      <router-link to="/shopStore/shopClassify" class="footer" href="javascrpt:;">商品分类</router-link>
      <a @click="companyFocuson" class="footer" href="javascrpt:;">关注店铺</a>
      <a class="footer" href="javascrpt:;">咨询一下</a>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { getSession } from "../../util/base";
import ShopList from "./shopList";
export default {
  data() {
    return {
      followed: false,
      navList: ["首页", "全部商品", "店铺介绍"],
      navIndex: 0,
      msgShow: false,
      couponList: [
        {
          money: "¥50",
          num: "本店满2000.00元使用",
          date: "2018.03.31前有效",
          id: 11
        },
        {
          money: "¥50",
          num: "本店满2000.00元使用",
          date: "2018.03.31前有效",
          id: 22
        },
        {
          money: "¥50",
          num: "本店满2000.00元使用",
          date: "2018.03.31前有效",
          id: 33
        },
        {
          money: "¥50",
          num: "本店满2000.00元使用",
          date: "2018.03.31前有效",
          id: 44
        }
      ],
      productList: [
        {
          Title: "专业代理，助力变更心仪的企业名称",
          Name: "公司名称变更",
          Price: "688.00",
          PosterImgURL1:
            "https://manage.wqbol.com/Upload/images/0653c58d-47b3-4701-bb4c-0839abc1171d\bcb8e7a9-9894-4477-ba70-ef91c74fa538.jpg"
        },
        {
          Title: "专业代理，助力变更心仪的企业名称",
          Name: "公司名称变更",
          Price: "688.00",
          PosterImgURL1:
            "https://manage.wqbol.com/Upload/images/0653c58d-47b3-4701-bb4c-0839abc1171d\bcb8e7a9-9894-4477-ba70-ef91c74fa538.jpg"
        },
        {
          Title: "专业代理，助力变更心仪的企业名称",
          Name: "公司名称变更",
          Price: "688.00",
          PosterImgURL1:
            "https://manage.wqbol.com/Upload/images/0653c58d-47b3-4701-bb4c-0839abc1171d\bcb8e7a9-9894-4477-ba70-ef91c74fa538.jpg"
        },
        {
          Title: "专业代理，助力变更心仪的企业名称",
          Name: "公司名称变更",
          Price: "688.00",
          PosterImgURL1:
            "https://manage.wqbol.com/Upload/images/0653c58d-47b3-4701-bb4c-0839abc1171d\bcb8e7a9-9894-4477-ba70-ef91c74fa538.jpg"
        },
        {
          Title: "专业代理，助力变更心仪的企业名称",
          Name: "公司名称变更",
          Price: "688.00",
          PosterImgURL1:
            "https://manage.wqbol.com/Upload/images/0653c58d-47b3-4701-bb4c-0839abc1171d\bcb8e7a9-9894-4477-ba70-ef91c74fa538.jpg"
        },
        {
          Title: "专业代理，助力变更心仪的企业名称",
          Name: "公司名称变更",
          Price: "688.00",
          PosterImgURL1:
            "https://manage.wqbol.com/Upload/images/0653c58d-47b3-4701-bb4c-0839abc1171d\bcb8e7a9-9894-4477-ba70-ef91c74fa538.jpg"
        },
        {
          Title: "专业代理，助力变更心仪的企业名称",
          Name: "公司名称变更",
          Price: "688.00",
          PosterImgURL1:
            "https://manage.wqbol.com/Upload/images/0653c58d-47b3-4701-bb4c-0839abc1171d\bcb8e7a9-9894-4477-ba70-ef91c74fa538.jpg"
        },
        {
          Title: "专业代理，助力变更心仪的企业名称",
          Name: "公司名称变更",
          Price: "688.00",
          PosterImgURL1:
            "https://manage.wqbol.com/Upload/images/0653c58d-47b3-4701-bb4c-0839abc1171d\bcb8e7a9-9894-4477-ba70-ef91c74fa538.jpg"
        },
        {
          Title: "专业代理，助力变更心仪的企业名称",
          Name: "公司名称变更",
          Price: "688.00",
          PosterImgURL1:
            "https://manage.wqbol.com/Upload/images/0653c58d-47b3-4701-bb4c-0839abc1171d\bcb8e7a9-9894-4477-ba70-ef91c74fa538.jpg"
        },
        {
          Title: "专业代理，助力变更心仪的企业名称",
          Name: "公司名称变更",
          Price: "688.00",
          PosterImgURL1:
            "https://manage.wqbol.com/Upload/images/0653c58d-47b3-4701-bb4c-0839abc1171d\bcb8e7a9-9894-4477-ba70-ef91c74fa538.jpg"
        },
        {
          Title: "专业代理，助力变更心仪的企业名称",
          Name: "公司名称变更",
          Price: "688.00",
          PosterImgURL1:
            "https://manage.wqbol.com/Upload/images/0653c58d-47b3-4701-bb4c-0839abc1171d\bcb8e7a9-9894-4477-ba70-ef91c74fa538.jpg"
        },
        {
          Title: "专业代理，助力变更心仪的企业名称",
          Name: "公司名称变更",
          Price: "688.00",
          PosterImgURL1:
            "https://manage.wqbol.com/Upload/images/0653c58d-47b3-4701-bb4c-0839abc1171d\bcb8e7a9-9894-4477-ba70-ef91c74fa538.jpg"
        },
        {
          Title: "专业代理，助力变更心仪的企业名称",
          Name: "公司名称变更",
          Price: "688.00",
          PosterImgURL1:
            "https://manage.wqbol.com/Upload/images/0653c58d-47b3-4701-bb4c-0839abc1171d\bcb8e7a9-9894-4477-ba70-ef91c74fa538.jpg"
        }
      ],
      setList: []
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 获取数据
    getList() {
      this.setList = this.productList.splice(0, 12); // splice 会改变数组
      this.list = [...this.setList, ...this.productList];
    },
    // 返回
    goBack() {
      this.$router.go(-1);
    },
    // 点击关注
    companyFocuson() {
      this.followed = !this.followed;
    },
    // 导航切换
    navTitle(index) {
      this.navIndex = index;
    },
    // 跳转搜索列表
    goSearch() {
      this.$router.push("/shopStore/shopSearch");
    },
    // 点击优惠券，同一种只能领取一次
    getCoupon(item) {
      console.log(item);
    }
  },
  computed: {
    ...mapState("message", {
      systemMsgLeng:'systemMsgLeng'
    }),
    setFoucson() {
      return this.followed ? "已关注" : "关注";
    },
    setMsgLeng() {
      console.log(this.systemMsgLeng)
      return this.systemMsgLeng
        ? this.systemMsgLeng
        : getSession("_systemLength_");
    }
  },
  components: {
    ShopList
  }
};
</script>
<style lang="less" scoped>
@import "../../common/index.less";
.shop {
     line-height: 1;
     &::-webkit-scrollbar {
         display: none;
    }
}
/* 顶部 */
 .shop-head {
     background-color: #333;
     .head-search {
         display: flex;
         align-items: center;
         height: 1.1891891891891893rem;
         .back {
             flex: 0 0 0.2702702702702703rem;
             display: block;
             height: 0.5405405405405406rem;
             margin: 0.32432432432432434rem 0.3783783783783784rem;
             .bg-image("../../assets/images/tabBar/back");
             background-size: 100%;
             background-position: 0 0.08108108108108109rem;
        }
         .search {
             position: relative;
             width: 6.621621621621622rem;
             height: 0.7837837837837838rem;
             input {
                 width: 100%;
                 height: 100%;
                 border-radius: 0.10810810810810811rem;
                 padding-left: 0.8918918918918919rem;
                 box-sizing: border-box;
                 font-size: 0.3783783783783784rem;
                 color: #b2b2b2;
                 background-color: #fff;
            }
             &::before {
                 content: "";
                 display: block;
                 position: absolute;
                 top: 0.1891891891891892rem;
                 left: 0.2702702702702703rem;
                 width: 0.40540540540540543rem;
                 height: 0.40540540540540543rem;
                 .bg-image("../../assets/images/report/search");
                 background-size: 100%;
            }
        }
         .classifY {
             flex: 0 0 1.4864864864864864rem;
             position: relative;
             height: 1.0810810810810811rem;
             font-size: 0.2702702702702703rem;
             padding-top: 0.5945945945945946rem;
             text-align: center;
             color: #fff;
             &::before {
                 content: "";
                 display: block;
                 position: absolute;
                 top: 0.40540540540540543rem;
                 left: 50%;
                 width: 0.4864864864864865rem;
                 height: 0.32432432432432434rem;
                 transform: translate(-50%, -50%);
                 .bg-image("../../assets/images/report/search");
                 background-size: 100%;
            }
        }
         .more {
             position: relative;
             flex: 0 0 0.9459459459459459rem;
             display: block;
             height: 1.0810810810810811rem;
             &::before {
                 content: "";
                 position: absolute;
                 top: 50%;
                 left: 0;
                 width: 0.5405405405405406rem;
                 height: 0.21621621621621623rem;
                 transform: translate(0, -50%);
                 .bg-image("../../assets/images/report/search");
                 background-size: 100%;
            }
             .more-num, .more-msg {
                 position: absolute;
                 top: 0;
                 right: 0.05405405405405406rem;
                 border-radius: 1.3513513513513513rem;
                 transform: scale(0.8);
                 padding: 0.08108108108108109rem;
                 font-size: 0.2702702702702703rem;
                 color: #fff;
                 background-color: #ff2a00;
            }
             .more-msg {
                 top: 0.21621621621621623rem;
                 right: 0.2702702702702703rem;
            }
             .more-list {
                 position: absolute;
                 top: 1.135135135135135rem;
                 right: 0.3783783783783784rem;
                 width: 3.2432432432432434rem;
                 padding-left: 0.972972972972973rem;
                 border-radius: 0.10810810810810811rem;
                 animation: showing 0.3s linear;
                 background-color: #fff;
                 z-index: 1;
                 a {
                     display: block;
                     position: relative;
                     padding: 0.2702702702702703rem 0;
                     font-size: 0.3783783783783784rem;
                     color: #333;
                     border-bottom: 1px solid #f0f0f0;
                     &::before {
                         content: "";
                         position: absolute;
                         top: 50%;
                         left: -0.5405405405405406rem;
                         width: 0.4864864864864865rem;
                         height: 0.4864864864864865rem;
                         transform: translate(-50%, -50%);
                         .bg-image("../../assets/images/report/search");
                         background-size: 100%;
                    }
                }
                 &::before {
                     content: "";
                     position: absolute;
                     top: -0.43243243243243246rem;
                     right: 0.10810810810810811rem;
                     border-top: 0.21621621621621623rem solid transparent;
                     border-right: 0.21621621621621623rem solid transparent;
                     border-bottom: 0.21621621621621623rem solid #fff;
                     border-left: 0.21621621621621623rem solid transparent;
                }
                 @keyframes showing {
                     0% {
                         height: 0%;
                         overflow: hidden;
                    }
                     100% {
                         height: 100%;
                         overflow: hidden;
                    }
                }
            }
        }
    }
     .head-company {
         display: flex;
         align-items: center;
         height: 1.6756756756756757rem;
         .company-logo {
             flex: 0 0 1.0810810810810811rem;
             height: 1.0810810810810811rem;
             margin-left: 0.40540540540540543rem;
             img {
                 width: 100%;
                 height: 100%;
            }
        }
         .company-title {
             flex: 0 1 4.864864864864865rem;
             font-size: 0.3783783783783784rem;
             color: #fff;
             margin-left: 0.3783783783783784rem;
        }
         .company-focuson {
             display: flex;
             align-items: center;
             flex: 0 1 3.675675675675676rem;
             height: 100%;
             font-size: 0.2702702702702703rem;
             color: #fff;
             .company-focuson-num {
                 padding: 0.40540540540540543rem 0.2702702702702703rem;
                 position: relative;
                 &::before {
                     content: "";
                     position: absolute;
                     top: 0;
                     left: 0;
                     width: 1px;
                     height: 100%;
                     background-color: #fff;
                }
            }
             .company-focuson-botton {
                 position: relative;
                 width: 1.3513513513513513rem;
                 height: 0.4864864864864865rem;
                 border: 0;
                 border-radius: 0.5405405405405406rem;
                 margin-right: 0.40540540540540543rem;
                 text-align: right;
                 padding: 0 0.16216216216216217rem 0 0;
                 line-height: 1.2;
                 background-image: linear-gradient(-90deg, #f95008 0%, #fe760a 100%), linear-gradient(#fff, #fff);
                 color: #fff;
                 &::before {
                     content: "";
                     display: block;
                     position: absolute;
                     top: 0.13513513513513514rem;
                     left: 0.13513513513513514rem;
                     width: 0.2702702702702703rem;
                     height: 0.2702702702702703rem;
                     .bg-image("../../assets/images/mine/collect");
                     background-size: 100%;
                }
                 &:focus {
                     outline: none;
                }
            }
             .company-followed {
                 text-align: center;
                 padding: 0;
                 &::before {
                     content: "";
                     display: none;
                }
            }
        }
    }
}
/* 导航 */
 .shop-nav {
     display: flex;
     justify-content: space-around;
     height: 1.0810810810810811rem;
     background-color: #fff;
     li {
         width: 100%;
         text-align: center;
    }
     .nav-title {
         display: inline-block;
         width: 2rem;
         line-height: 1rem;
         text-align: center;
         border-bottom: 0.08108108108108109rem solid transparent;
         font-size: 0.3783783783783784rem;
         color: #333;
    }
     .nav-active {
         border-bottom: 0.08108108108108109rem solid #fa2802;
    }
}
/* 优惠券 */
 .shop-coupons {
     display: flex;
     flex-direction: row;
     height: 2.1621621621621623rem;
     padding: 0.21621621621621623rem 0.2702702702702703rem;
     overflow-y: scroll;
     color: #fff;
     text-align: left;
     background-color: #fff;
     margin-top: 0.32432432432432434rem;
     .coupons {
         flex: 0 0 3.891891891891892rem;
         padding-right: 0.2702702702702703rem;
         white-space: nowrap;
    }
     .coupons-text {
         background-color: #fe760a;
         padding-left: 0.2702702702702703rem;
         height: 100%;
    }
     .coupons-money {
         font-size: 0.43243243243243246rem;
         padding: 0.2702702702702703rem 0 0.16216216216216217rem 0;
    }
     .coupons-num {
         font-size: 0.2702702702702703rem;
         padding-bottom: 0.10810810810810811rem;
    }
     .coupons-date {
         font-size: 0.2702702702702703rem;
         color: #995d42;
    }
}
 .shop-list-show {
     height: 0.918918918918919rem;
     width: 86%;
     padding: 0;
     background-color: #f95008;
     font-size: 0.43243243243243246rem;
     color: #fff;
     border: 0;
     border-radius: 0.10810810810810811rem;
     margin: 0.5405405405405406rem 0 1.6216216216216217rem 0;
}
 .shop-introduce {
     padding: 0.21621621621621623rem 0.2702702702702703rem;
     margin-top: 0.32432432432432434rem;
     background-color: #fff;
     li {
         display: flex;
         padding: 0.16216216216216217rem 0;
         line-height: 1.3;
         font-size: 0.3783783783783784rem;
    }
     .introduce-text {
         flex: 0 0 2.054054054054054rem;
         color: #333;
    }
     .introduce-name {
         flex: 1;
         color: #666;
    }
}
 .shop-msg {
     margin-top: 0.32432432432432434rem;
     background-color: #fff;
     .msg-title {
         height: 1.0810810810810811rem;
         padding-left: 0.2702702702702703rem;
         line-height: 1.0810810810810811rem;
         font-size: 0.3783783783783784rem;
    }
     .msg-img {
         display: flex;
         flex-direction: row;
         padding: 0.40540540540540543rem 0 0.40540540540540543rem 0.40540540540540543rem;
         overflow-y: scroll;
         img {
             flex: 0 0 3.108108108108108rem;
             height: 3.7837837837837838rem;
             padding-right: 0.40540540540540543rem;
        }
    }
}
/* 底部 */
 .shop-footer {
     display: flex;
     align-items: center;
     justify-content: space-around;
     position: fixed;
     bottom: 0;
     left: 0;
     width: 100%;
     height: 1.2162162162162162rem;
     background-color: #fff;
     border-top: 1px solid #dfdfdf;
     .footer {
         flex: 1;
         position: relative;
         text-align: center;
         font-size: 0.3783783783783784rem;
         color: #333;
         &::after {
             content: "";
             position: absolute;
             top: 50%;
             right: 0;
             transform: translate(0, -50%);
             width: 1px;
             height: 0.8108108108108109rem;
             background-color: #ebe5e1;
        }
         &:last-child {
             &::after {
                 content: "";
                 display: none;
            }
        }
    }
}
 
</style>
