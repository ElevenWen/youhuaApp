<template>
  <div class="shop-classify">
    <div class="shop-header">
      <span class="back" @click="goBack" ></span>
      <h2 class="title">店铺分类</h2>
      <span class="more">横过</span>
    </div>

    <div class="shop-all" @click="goSearch">
      <a href="javascript:;">全部商品</a>
    </div>

    <!-- 分类 -->
    <div class="shop-list-classify">
      <div class="list-title" :class="{'list-arrow':isArrow}">
        <span class="title">工商服务</span>
        <span v-show="!isArrow" class="title-all">查看全部</span>
      </div>
      <div class="list-item">
        <a class="item" href="javascript:;">公司注册</a>
        <a class="item"  href="javascript:;">公司注册</a>
        <a class="item"  href="javascript:;">公司注册</a>
        <a class="item"  href="javascript:;">公司注册</a>
        <a class="item"  href="javascript:;">公司注册</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isArrow: true,
      classifyList: []
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    goSearch() {
      this.$router.push("/shopStore/shopSearch");
    },
  }
};
</script>
<style lang="less" scoped>
@import "../../common/index.less";
a {
     text-decoration: none;
     color: #333;
}
/* 顶部 */
 .shop-header {
     display: flex;
     align-items: center;
     justify-content: space-between;
     height: 1.1891891891891893rem;
     background-color: #fff;
     .back {
         flex: 0 0 0.2702702702702703rem;
         display: block;
         height: 0.5405405405405406rem;
         margin: 0.32432432432432434rem 0.3783783783783784rem;
         .bg-image("../../assets/images/tabBar/back");
         background-size: 100%;
         background-position: 0 0.08108108108108109rem;
    }
     .title {
         flex: 0 1 80%;
         text-align: center;
         font-size: 0.4864864864864865rem;
         color: #1a1715;
    }
     .more {
         flex: 0 0 1.0810810810810811rem;
         height: 100%;
         line-height: 1.1891891891891893rem;
    }
}
/* 查看全部 */
 .shop-all, .list-title {
     position: relative;
     padding-left: 0.32432432432432434rem;
     margin-top: 0.32432432432432434rem;
     line-height: 1.2162162162162162rem;
     background-color: #fff;
     a {
         display: block;
         font-size: 0.43243243243243246rem;
    }
     &::after {
         content: "";
         display: block;
         position: absolute;
         top: 50%;
         right: 0.16216216216216217rem;
         width: 0.21621621621621623rem;
         height: 0.4864864864864865rem;
         transform: translate(-50%, -50%);
         .bg-image("../../assets/images/tabBar/right_arrow");
         background-size: 100%;
    }
}
 .list-title {
     font-size: 0.43243243243243246rem;
     &::after {
         content: "";
         display: none;
    }
     .title-all {
         float: right;
         padding-right: 0.32432432432432434rem;
         font-size: 0.2702702702702703rem;
         color: #999;
    }
}
 .list-arrow {
     &::after {
         content: "";
         display: block;
         position: absolute;
         top: 50%;
         right: 0.16216216216216217rem;
         width: 0.21621621621621623rem;
         height: 0.4864864864864865rem;
         transform: translate(-50%, -50%);
         .bg-image("../../assets/images/tabBar/right_arrow");
         background-size: 100%;
    }
}
 .list-item {
     display: flex;
     flex-wrap: wrap;
     background-color: #fff;
     .item {
         flex: 0 1 49.3%;
         height: 1.3513513513513513rem;
         margin: 0 1.3% 1.3% 0;
         padding-left: 0.32432432432432434rem;
         line-height: 1.3513513513513513rem;
         background-color: #f3f3f3;
         &:nth-child(2n) {
             margin: 0;
        }
         &:nth-last-child(1) {
             margin-bottom: 0;
        }
         &:nth-last-child(2) {
             margin-bottom: 0;
        }
    }
}
 
</style>

