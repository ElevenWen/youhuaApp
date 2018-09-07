<template>
   
  <div id="fixBottomWrap">
      <ul class="fixBottom" v-cloak> 
         <router-link :to="{path:'/home'}" tag="li" exact class="home"><p>首页</p></router-link>
         <router-link :to="{path:'/serve'}" tag="li" exact  class="serve"><p>服务</p></router-link>
         <!-- <router-link :to="{path:'/discover'}"  tag="li" exact  class="discover"><p>discover</p></router-link> -->
         <router-link :to="{path:'/cart'}" tag="li" exact  class="cart"><p>购物车<span class="spotIcon" v-show="cartNumQ!=0"><i class="font9 cartNum">{{cartNumQ}}</i></span></p></router-link>
         <router-link :to="{path:'/mine'}" tag="li" exact  class="mine"><p>我的</p></router-link>
      </ul>
      
  </div>
</template>

<script>
import tool from "./util/tool";

export default {
  props: {
    cartNum: {
      //接受来自购物车的值
    }
  },
  data() {
    return {
      cartNumQ: ""
    };
  },
  activated() {
    this.getCartNum();
  },
  deactivated() {
    this.getCartNum();
  },
  mounted() {
    // console.log('===================================================',this.getToken)
    //用户登录则 获取购物车数量
    this.getCartNum();
  },
  methods: {
    getCartNum() {
      if (this.getToken()) {
        this.$store.dispatch("request_data_cart").then(() => {
          let tempObj = this.$store.state.cart.cartInfos.list;
          let sum = 0;
          if (tempObj == undefined || tempObj.length == 0) {
            this.cartNumQ = 0;
          } else {
            tempObj.forEach(items => {
              sum += items.Num;
            });
            this.cartNumQ = sum;
          }
        });
      }
      this.$watch("cartNum", (n, o) => {
        this.cartNumQ = this.cartNum;
      });
    }
  }
};
</script> 

<style  lang='less' type='text/less' scoped>
@import "./common/index.less";
#fixBottomWrap {
  position: fixed;
  bottom: 0px;
  z-index: 99999;
  width: 100%;
}

#fixBottomWrap > .fixBottom {
  width: 100%;
  display: flex;
  flex-wrap: no-wrap;
  background: #fff;
  .border-1pxT(#ebe5e1);
}

.fixBottom > li {
   background-size: 0.6486486486486487rem 0.6486486486486487rem;
 background-repeat: no-repeat;
 background-position: center 0.1891891891891892rem;
 display: inline-flex;
 flex: 1 0 20%;
 height: 1.3243243243243243rem;
 
  .border-1pxB(#ccc);
  &.home {
    .bg-image("./assets/images/tabBar/home");
  }
  &.serve {
    .bg-image("./assets/images/tabBar/serve");
  }
  &.cart {
    .bg-image("./assets/images/tabBar/cart");
  }
  &.discover {
    .bg-image("./assets/images/tabBar/discover");
  }
  &.mine {
    .bg-image("./assets/images/tabBar/mine");
  }
  &.router-link-active {
    &.home {
      .bg-image("./assets/images/tabBar/homeS");
      color: #fa2802;
    }
    &.serve {
      .bg-image("./assets/images/tabBar/serveS");
      color: #fa2802;
    }
    &.cart {
      .bg-image("./assets/images/tabBar/cartS");
      color: #fa2802;
    }
    &.discover {
      .bg-image("./assets/images/tabBar/discoverS");
      color: #fa2802;
    }
    &.mine {
      .bg-image("./assets/images/tabBar/mineS");
      color: #fa2802;
    }
  }
  > p {
    text-align: center;
 width: 100%;
 padding-top: 0.8648648648648649rem;
 font-size: 0.32432432432432434rem;
 
  }
}
li.cart {
  position: relative;
}
.spotIcon {
  position: absolute;
 top: 0.13513513513513514rem;
 left: 1.4864864864864864rem;
 text-align: center;
 color: #ff2a00;
 border-radius: 0.35135135135135137rem;
 border: 1px solid #ff2a00;
 padding: 0 0.05405405405405406rem;
 height: 0.34rem;
 line-height:0.32rem;
 background: #fff; 
 
}
</style>