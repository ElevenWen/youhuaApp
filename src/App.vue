<template>
  <div id="appApp">
      
      <keep-alive>     
          <router-view v-if="$route.meta.keepAlive" class="child-view"></router-view>    
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive" class="child-view" ref="childView"/>

      <!-- <transition :name="transitionName">
        <router-view v-if="!$route.meta.keepAlive" class="child-view" ref="childView"/>
      </transition> -->
      

  </div>
</template>


<script>
export default {
  name: "app",
  data() {
    return {
      transitionName: "",
      childView: null
    };
  },
  methods: {},
  updated() {},
  watch:{
    /* 
    '$route':function(to, from){  
      if(!document.querySelector('#appApp .child-view')){
        return false
      }
          // 地址编辑页 增加路由动画切换
        if(to.path =='/mine/shippingAddress' || to.path =='/mine/updateNikeName' || to.path == '/home/sous' || to.path =='/mine/myInformation' || to.path =='/cart/comfirmOrder'){
          this.$nextTick(()=>{
              document.querySelector('#appApp .child-view').style.transition = 'all .5s cubic-bezier(.55,0,.1,1)';  
          })  
           this.transitionName = 'slide-left';   
           
        }else if(to.path =='/xxx'){
          this.$nextTick(()=>{
                document.querySelector('#appApp .child-view').style.transition = 'all .5s cubic-bezier(.55,0,.1,1)';    
          })    
            this.transitionName = 'slide-right'; 
        }else{     
            this.$nextTick(()=>{
               //此处暂时不方 dom 获取，会引起动画切换卡顿
            })
             document.querySelector('#appApp .child-view').style.transition = 'none';
             this.transitionName = null
        }
        
      
    } */
  }
};
</script>


<style  lang='less' type='text/less' scoped >
@import "./common/index.less";
//路由切换动画
.child-view {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(100%, 0);
  transform: translate(100%, 0);
}
.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-100%, 0);
  transform: translate(-100%, 0);
}

//路由切换动画 --结束

#appApp {
  //保存截图bug
  height: 100%;
  padding: 0.1px;
}

#app > .fixBottom {
  border-top: 1px solid #efeff4;
  z-index: 999;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-wrap: no-wrap;
  background: #fff;
}
.fixBottom > li {
  background-size: 24px 24px;
  background-repeat: no-repeat;
  background-position: center 5px;
  display: inline-flex;
  flex: 1 0 20%;
  height: 49px;
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
    }
    &.serve {
      .bg-image("./assets/images/tabBar/serveS");
    }
    &.cart {
      .bg-image("./assets/images/tabBar/cartS");
    }
    &.discover {
      .bg-image("./assets/images/tabBar/discoverS");
    }
    &.mine {
      .bg-image("./assets/images/tabBar/mineS");
    }
  }
  > p {
    text-align: center;
    width: 100%;
    padding-top: 32px;
  }
}
</style>
