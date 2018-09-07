<template>
  <!-- 列表 -->
  <ul class="shop-list">
    <li class="list" v-for="item in list" :key="item.id">
      <div class="list-img">
        <img v-lazy="item.PosterImgURL1" alt="">
      </div>
      <div class="list-content">
        <p class="content-money">{{item.Price}}<i></i></p>
        <p class="content-title">{{item.Name}}</p>
        <p class="content-text">{{item.Title}}</p>
      </div>
    </li>
  </ul>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    list: {
      type: Array,
      default:[]
    }
  },
  created() {},
  methods: {}
};
</script>
<style lang="less">
/* 列表 */
.shop-list {
     display: flex;
     flex-wrap: wrap;
     width: 100%;
     padding: 0 0.2702702702702703rem 1.0810810810810811rem 0;
     margin-top: 0.32432432432432434rem;
     text-align: left;
     background-color: #fff;
}
 .list {
     flex: 0 1 50%;
     height: 6.378378378378378rem;
     padding: 3.2% 0 0 3.2%;
     overflow: hidden;
     .list-img {
         width: 100%;
         height: 71.8%;
         background-color: red;
         img {
             width: 100%;
             height: 100%;
        }
    }
     .list-content {
         padding-left: 0.13513513513513514rem;
    }
     .content-money {
         font-size: 0.3783783783783784rem;
         color: #fa2802;
         padding: 0.16216216216216217rem 0;
         i {
             transform: scale(0.8);
        }
    }
     .content-title {
         padding-bottom: 0.16216216216216217rem;
         font-size: 0.43243243243243246rem;
    }
     .content-text {
         font-size: 0.3783783783783784rem;
         color: #8c8c8c;
    }
}
 

</style>
