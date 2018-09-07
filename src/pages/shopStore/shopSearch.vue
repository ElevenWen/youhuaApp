<template>
  <div class="shop-search">
    <!-- 搜索顶部 -->
    <div class="head-search">
      <span class="back" @click="goBack"></span>
      <label for="search" class="search">
        <input type="text" name="search" id="search" placeholder="搜索店铺内宝贝" >
      </label>
      <router-link to="/shopStore/shopClassify" class="classifY" >分类</router-link>
      <div class="more">
        <i class="more-num">{{setMsgLeng}}</i>
        <div class="more-list">
          <p class="msg">消息  <i class="more-msg">{{setMsgLeng}}</i></p>
          <p class="home">首页</p>
          <p class="classify">分类</p>
          <p class="mine">我的</p>
        </div>
      </div>
    </div>

    <!-- 列表 -->
    <ul class="search-list">
      <li class="item" v-for="item in list" :key="item.id">
        <div class="item-img">
          <img v-lazy="item.ImgUrl" :alt="item.ClassName">
        </div>
        <div class="item-msg">
          <div class="msg-title">
            <span class="msg-name">{{item.Name}}</span>
            <span class="msg-lable">折扣</span>
            <span class="msg-lable">满减</span>
            <span class="msg-lable">套装</span>
          </div>
          <p>3天拿照，快捷安全</p>
          <div class="msg-money">
            <span class="money">￥{{item.Price}}<i></i></span>
            <s class="discounts">￥{{item.oldPrice}}</s>
            <span class="sales">销量：{{item.Sold}}</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { getSession } from "../../util/base";
export default {
  data() {
    return {
      list: [
        {
          ClassId: "d0aa8ffe-c94e-4b74-aa94-d676f47165c5",
          ClassName: "云代帐",
          Code: "YDZCZ",
          CompanyId: "a1d8e7a0-7c0c-4862-b221-b761a40a74ed",
          Id: "cbf7ea00-20fe-4053-89a4-58275567551a",
          ImgUrl:
            "https://manage.wqbol.com/Upload/images/58437192-d439-41ed-8bba-f1ae8e62c0a69bb4a487-b3ea-42e2-ac3c-6b1b41dabdff.jpg",
          Intro: "云代账",
          Name: "云代账",
          Price: "10000.00",
          oldPrice: "10000.00"
        },
        {
          ClassId: "d0aa8ffe-c94e-4b74-aa94-d676f47165c5",
          ClassName: "云代帐",
          Code: "YDZCZ",
          CompanyId: "a1d8e7a0-7c0c-4862-b221-b761a40a74ed",
          Id: "cbf7ea00-20fe-4053-89a4-58275567551a",
          ImgUrl:
            "https://manage.wqbol.com/Upload/images/58437192-d439-41ed-8bba-f1ae8e62c0a69bb4a487-b3ea-42e2-ac3c-6b1b41dabdff.jpg",
          Intro: "云代账",
          Name: "云代账",
          Price: "10000.00",
          Pro_ProductModels: null,
          Sold: 5,
          Type: 0,
          oldPrice: "10000.00"
        }
      ]
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  },
  computed: {
    ...mapState("message", {
      systemMsgLeng:'systemMsgLeng'
    }),
     setMsgLeng() {
      return this.systemMsgLeng
        ? this.systemMsgLeng
        : getSession("_systemLength_");
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../common/index.less";
.shop-search {
     background-color: #fff;
}
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
             background-color: #efeff4;
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
         color: #665d56;
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
             display: none;
             position: absolute;
             top: 1.135135135135135rem;
             right: 0.3783783783783784rem;
             width: 3.2432432432432434rem;
             padding-left: 0.972972972972973rem;
             border-radius: 0.10810810810810811rem;
             background-color: #fff;
             z-index: 1;
             p {
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
                 top: -0.40540540540540543rem;
                 right: 0.05405405405405406rem;
                 border-top: 0.21621621621621623rem solid transparent;
                 border-right: 0.21621621621621623rem solid transparent;
                 border-bottom: 0.21621621621621623rem solid #fff;
                 border-left: 0.21621621621621623rem solid transparent;
            }
        }
    }
}
/* 列表 */
 .search-list {
     .item {
         display: flex;
         padding: 0.32432432432432434rem;
         height: 3.108108108108108rem;
         border-bottom: 1px solid #ebe5e1;
         .item-img {
             flex: 0 0 2.4324324324324325rem;
             height: 2.4324324324324325rem;
             margin-right: 0.2702702702702703rem;
             background-color: red;
             img {
                 width: 100%;
                 height: 100%;
            }
        }
         .item-msg {
             flex: 1;
        }
         .msg-title {
             display: flex;
             .msg-name {
                 padding-right: 0.16216216216216217rem;
                 font-size: 0.43243243243243246rem;
                 line-height: 0.5405405405405406rem;
                 color: #1f1f1f;
            }
             .msg-lable {
                 height: 0.43243243243243246rem;
                 margin: 0.10810810810810811rem 0.05405405405405406rem;
                 padding: 1px 0.05405405405405406rem;
                 border-radius: 0.08108108108108109rem;
                 font-size: 0.32432432432432434rem;
                 color: #fa2802;
                 border: 1px solid #fa2802;
            }
        }
         p {
             font-size: 0.3783783783783784rem;
             color: #333;
             line-height: 2.2;
        }
         .msg-money {
             padding-top: 0.3783783783783784rem;
             .money {
                 font-size: 0.3783783783783784rem;
                 color: #fa2802;
                 i {
                     transform: scale(0.9);
                }
            }
             .discounts {
                 font-size: 0.32432432432432434rem;
                 color: #b2b2b2;
            }
             .sales {
                 float: right;
                 font-size: 0.3783783783783784rem;
                 color: #8c8c8c;
            }
        }
    }
}
 
</style>
