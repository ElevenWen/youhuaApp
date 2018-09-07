<template>
  <div id="accountBi"  :class="{'overflow':coinDetail.data.list.length == 0}">
      <headerTitle :title="title" ></headerTitle>
      <div class="banner">
        <div class="rule" @click.stop="toRule">规则说明</div>
        <h3>{{myWalletParticulars.Coin}}</h3>
        <p>1记账币=1元，购物可抵现金</p>
        <span @click="user">使用</span>
      </div>
      <div class="bottom">
        <div class="to_detail" @click.stop="goCoinDetail">
          <span >收支明细</span>
          <span><img class="detail_i" src="../../../assets/images/mine/new/go@3x.png" alt=""></span>
        </div>
        <div class="content">
          <ul 
          v-infinite-scroll="loadMore"   
          infinite-scroll-disabled="busing"  
          infinite-scroll-distance="60"   
          infinite-scroll-immediate-check="true"  
          v-if="coinDetail.data.list.length!=0">
            <li v-for="(items,index) in coinDetail.data.list"  :key="index">
              <span>
                <p class="title">{{items.Reason}}</p>
                <p class="time">{{ items.CreateTime | formatDate}}</p>
              </span>
              <span :class="{'themeC':items.Type == 0 ,'green':items.Type == 1}">
                {{items.Type | formSymbol }}{{items.Coin}}
              </span>
            </li> 
          </ul>

           <div  class="nullDetail" v-else>
             <p>暂无数据</p>
          </div>

        </div>
      </div>
     

     
      <div class="noMore" v-show="noMore">
        没有更多了
      </div>
  </div>
</template>

<style lang="less" scoped>
@import "../../../common/index.less";
@import "./accountBi.less";
.nullDetail {
     position: relative;
     height: 60vh;
     width: 100%;
     bottom: 0.18666666666666668rem;
     background-size: 71%;
     background-position: center 0.5466666666666666rem;
     .bg-image("../../../assets/images/tabBar/noB");
     p {
         text-align: center;
         margin-bottom: 0;
         position: absolute;
         top: 46vh;
         width: 100%;
         font-size: 0.3783783783783784rem; 
         color:#666666;
    }
}
 .overflow{
     overflow: hidden;
}
 .green{
     color:#5fb337;
}
 .detail_i{
   width: 0.21621621621621623rem;
   height: 0.35135135135135137rem;
 }
</style>

<script>
import tool from "../../../util/tool";
import { mapState, mapActions, mapGetters } from "vuex";
import headerTitle from "../../components/header-title";
import { setSession, getSession } from "../../../util/base";

export default {
  data() {
    return {
      title: "记账币",
      pageIndex: "1", //第一页
      noMore: false, //没有更多
      busing: false, //下拉刷新
      type: "", //传给后台的值 类型（0=收入 1=支出），可空，默认空=获取全部记录
      pageIndex: "1", //初始化显示第一页
      nothing: false //没有数据
    };
  },
  computed: {
    ...mapState("mine_index", {
      myWalletParticulars: "myWalletParticulars", //获取  帐户余额 奖励佣金 记账币 积分
      coinDetail: "coinDetail" //余额明细
    })
  },
  created() {
    //获取记账币金额
    this.REQUEST_MYWALLETPARTICULARS();
    console.log(this.type)
    var params = {
      type: this.type,
      pageIndex: this.pageIndex, //	（选填）当前页码
      pageSize: "10" //	（选填）数量（默认为10）
    };
    //记账币明细
    this.REQUEST_COIN_DETAIL(params).then(() => {
      if (
        this.coinDetail.data.list.length >= this.coinDetail.data.recordCount
      ) {
        //  this.busing = true 择不触发滚动
        this.busing = true;
        return;
      }
    });
  },
  methods: {
    ...mapActions("mine_index", {
      REQUEST_MYWALLETPARTICULARS: "REQUEST_MYWALLETPARTICULARS", //获取记账币金额
      REQUEST_COIN_DETAIL: "REQUEST_COIN_DETAIL", //记账币明细
      REQUEST_COIN_DETAIL_PAGE:'REQUEST_COIN_DETAIL_PAGE',//记账币滚动分页
      ACCOUNTBI_RELUSE:'ACCOUNTBI_RELUSE',//记账币规则
    }),
    loadMore() {
      //下拉加载 
      if (
        this.coinDetail.data.list.length >= this.coinDetail.data.recordCount
      ) {
        //  this.busing = true 择不触发滚动
        this.busing = true;
        this.noMore = true;
        return;
      }
      //第一次触发
      //  this.busing = true 择不触发滚动
      this.busing = true; 
      var params = {
        type: "",
        pageIndex: ++this.pageIndex, //	（选填）当前页码
        pageSize: "10" //	（选填）数量（默认为10）
      };
      console.log("加载更多");
      this.REQUEST_COIN_DETAIL_PAGE(params).then(() => {
        console.log("加载更多========================");
        console.log(this.coinDetail);
        this.busing = false;
      });
    },
    user() {
      //记账币使用
      setSession("_selected_", "0");
      setSession("_serveQuery_", {
        name: "云服务",
        classId: "7c057018-a1a1-4fab-8951-57be6cfc8acb",
        navIndex: "0"
      });

      this.$router.push({
        path: "/home/serveClassify",
        query: {
          id: "19fc7154-d99d-412b-8284-424d08302f54",
          name: encodeURI("云服务"),
          index: 0,
          classIndex: "1"
        }
      });
    },  

    goCoinDetail() {
        this.$router.push("/mine/accountBi/accountBiDetail");
    },
    toRule() {
      
      this.$router.push("/mine/accountBiProduce");
    }
  },
  beforeDestroy(){ 
      // var params = {
      //   type:'-1',
      //   pageIndex:this.pageIndex,//	（选填）当前页码
      //   pageSize:"10",//	（选填）数量（默认为10）
      // }
      
      // this.REQUEST_COIN_DETAIL(params).then(()=>{
      //   console.log(this.coinDetail.data.list.length , this.coinDetail.data.recordCount ,'? created1  ')
      //   if (this.coinDetail.data.list.length >= this.coinDetail.data.recordCount ){
      //     //  this.busing = true 择不触发滚动
      //       this.pageIndex = 1;
      //       this.sortIndex = 0;
      //       this.type = '';
      //       this.noMore = false;
      //       //不触发滚动
      //       this.busing = true; 
      //   }  
      // });  
  },
  filters: {
    toFixed2(value){
      if(!value || value =='--') return ;
      return value.toFixed(2);
    },
    formatDate(value) {
      let _value = value.replace(/\D/gi, "");
      return tool.formatDate(_value, "yyyy-MM-dd hh:mm:ss");
    },
    formSymbol(value) {
      let _value = null;
      // console.log(value ,'11111111111')
      switch (value.toString()) {
        case "0":
          _value = "+";
          break;
        case "1":
          _value = "-";
          break;
        case "2":
          _value = "-";
          break;
      }
      return _value;
    }
  },
  components: {
    headerTitle
  }
};
</script>