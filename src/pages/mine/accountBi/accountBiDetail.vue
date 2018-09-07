<template>
  <div id="accountBiDetail">
       <div class="popularity_return title">
            <span  class="return" @click.stop.prevent="showBalanceDetailFnBackFn()"></span>
			<!-- 人气专场 --> 
            <!-- "Type": 0,					交易类型  0充值  1奖励金额提现  2消费				 -->
			<span class="title_name nameAfter" @click="showSort">记账币明细</span> 
            <div class="sortWrap"  v-show='showOrHideSortWrap'>
                <ul class="sortWrapDetail" @click.stop="sortWrapClick()">
                    <li v-for="(items,index) in  sort " @click.stop="sortClick(items,index)" :class="{'checkNow':index == sortIndex}" :key="index">
                        <i></i>{{items}}
                    </li>
                </ul>
            </div> 
      	</div>

       
      
       <ul class="balanceListWrap" 	 
       v-infinite-scroll="loadMore"   
       infinite-scroll-disabled="busing"  
       infinite-scroll-distance="60"   
       infinite-scroll-immediate-check="true"  
       v-if="coinDetail.data.list.length!=0">
          <!-- {{coinDetail.data}} -->
          <li class="balanceList" v-for="(items ,index ) in coinDetail.data.list" :key="index">   
          <p>{{items.Reason  }}</p>
          <!-- "Type": 0,交易类型 0充值 1奖励金额提现 2消费  -->  
          <p>{{ items.CreateTime | formatDate}}</p>
          <span :class="{moneyNum:true,moneyNum_F:items.Type==1,moneyNum_Z:items.Type==0}">
             {{items.Type | formSymbol }} {{items.Coin}}
          </span>
          </li> 
        </ul>

        <div  class="nullDetail" v-else>
             <p>暂无数据</p>
        </div>
        <div  class="noMore" v-if="noMore">
             <p>没有更多了</p>
        </div>
    </div>
</template>

<style lang="less" scoped>
@import "../../../common/index.less";
@import "./accountBi.less";
// 返回头部
.popularity_return {
     position: fixed;
     height: 1.1891891891891893rem;
     width: 100%;
     text-align: center;
     line-height: 1.162162162162162rem;
     font-size: 0.4864864864864865rem;
     color: #1f1f1f;
     border-bottom: 1px solid #ebe5e1;
     top: 0;
     // right: 0;
     left: 0;
     background: white;
     z-index: 999;
}
 .return {
     padding-left: 0.40540540540540543rem;
     height: 100%;
     width: 1.0810810810810811rem;
     .bg-image("../../../assets/images/tabBar/nav_back");
     background-size: 0.5405405405405406rem;
     background-position: 0.40540540540540543rem 0.24324324324324326rem;
     position: absolute;
     left: 0;
}
 #accountBiDetail {
     padding-top: 1.1891891891891893rem;
     .balanceListWrap {
         background: white;
         .balanceList {
             position: relative;
             padding: 0.40540540540540543rem 0.32432432432432434rem;
             height: 2.027027027027027rem;
             font-size: 0.373333rem;
             .border-1pxB(#ebe5e1);
             p {
                 &:nth-child(1) {
                     padding-bottom: 0.2702702702702703rem;
                     font-size: .373333rem;
                }
                 &:nth-child(2) {
                     .c(#8c8c8c);
                     font-size: .346667rem;
                }
            }
             .moneyNum {
                 position: absolute;
                 right: 0.2702702702702703rem;
                 top: 50%;
                 transform: translateY(-50%);
                 font-size: .533333rem;
            }
             .moneyNum_Z{
                 color: #fa2802;
                 font-size: .533333rem;
            }
             .moneyNum_F{
                 color: #5fb337;
                 font-size: .533333rem;
            }
        }
    }
}
 .nameAfter {
     position: relative;
}
 .nameAfter::after {
     content: "";
     position: absolute;
     top: 0.2702702702702703rem;
     left: 2.5675675675675675rem;
     width: 0;
     height: 0;
     border-left: 0.13513513513513514rem solid transparent;
     border-right: 0.13513513513513514rem solid transparent;
     border-top: 0.16216216216216217rem solid black;
}
 //余额明细表 排序 
 .sortWrap {
     text-align: left;
     .sortWrapDetail {
         height: 100vh;
         background: rgba(0, 0, 0, 0.2);
    }
     li {
         background: #fff;
         padding-left: 0.40540540540540543rem;
         line-height: 1.2162162162162162rem;
         font-size: 0.3783783783783784rem;
         .border-1pxT(#ccc);
    }
     i {
         width: 0.5405405405405406rem;
         height: 0.5405405405405406rem;
         background-size: 100%;
         margin-right: 0.13513513513513514rem;
         vertical-align: text-bottom;
    }
     li:nth-child(1) {
         i {
             .bg-image("../../../assets/images/comfirm-order/all");
        }
    }
     li:nth-child(2) {
         i {
             .bg-image("../../../assets/images/comfirm-order/income");
        }
    }
     li:nth-child(3) {
         i {
             .bg-image("../../../assets/images/comfirm-order/expend");
        }
    }
     li.checkNow:nth-child(1) {
         color: #ff5000;
         i {
             .bg-image("../../../assets/images/comfirm-order/allS");
        }
    }
     li.checkNow:nth-child(2) {
         color: #ff5000;
         i {
             .bg-image("../../../assets/images/comfirm-order/incomeS");
        }
    }
     li.checkNow:nth-child(3) {
         color: #ff5000;
         i {
             .bg-image("../../../assets/images/comfirm-order/expendS");
        }
    }
}
 //余额明细没有数据 
 #accountBiDetail .nullDetail {
     position: relative;
     height: 50vh;
     width: 100%;
     background-size: 71%;
     background-position: center;
     .bg-image("../../../assets/images/tabBar/noB");
     p {
         text-align: center;
         margin-bottom: 0;
         position: absolute;
         bottom: 0;
         width: 100%;
    }
}
 //没有更多了 
 .noMore {
     padding: 0.2702702702702703rem;
     text-align: center;
     color: #999999;
     font-size: .346667rem;
}
 
 
</style>

<script>
import headerTitle from "../../components/header-title";
import tool from "../../../util/tool";
import { mapState, mapActions, mapGetters } from "vuex";
import { setSession, getSession } from "../../../util/base";

export default {
  data() {
    return {
      title: "记账币明细",
      money: "",
      ab: require("@/assets/images/comfirm-order/defeated@3x.png"),
      showCode: true, //是否弹出二维码
      // showBalanceDetail: true, //余额明细列表
      showOrHideSortWrap: false, //展开余额明细列表 排序
      sort: ["全部", "支出", "收入"],
      sortIndex: 0, //默认余额明细列表排序 为全部
      noMore: false, //没有更多
      busing: false,
      type: "", //传给后台的值 类型（0=收入 1=支出），可空，默认空=获取全部记录
      pageIndex: "1" //初始化显示第一页
    };
  },
  computed: {
    ...mapState("mine_index", {
      myWalletParticulars: "myWalletParticulars", //获取  记账币余额 奖励佣金 记账币 积分
      coinDetail: "coinDetail" // 记账币明细
    })
  },
  created() {
    //获取记账币金额
    //this.REQUEST_MYWALLETPARTICULARS();
    var params = {
      type: this.type,
      pageIndex: this.pageIndex, //	（选填）当前页码
      pageSize: "10" //	（选填）数量（默认为10）
    };
    //记账币明细
    this.REQUEST_COIN_DETAIL(params).then(() => {
        console.log(this.coinDetail); 
        if (this.coinDetail.data.list.length >= this.coinDetail.data.recordCount ){
         //  this.busing = true 择不触发滚动
          this.busing = true;
          this.noMore = true;
          return
        }
    });
  },
  methods: {
    ...mapActions("mine_index", {
      REQUEST_MYWALLETPARTICULARS: "REQUEST_MYWALLETPARTICULARS", //获取  记账币余额 奖励佣金 记账币 积分
      REQUEST_COIN_DETAIL: "REQUEST_COIN_DETAIL" //获取记账币明细详情
    }),
    ...mapActions("comfirmOrder", {
      getBalance_comfirmorder: "getBalance_comfirmorder"
    }),
    showBalanceDetailFn(value) {
      // 来自子组件 component/header-title.vue
      this.showBalanceDetail = !this.showBalanceDetail;
    },
    // showSort() {
    //   //展开余额明细排序showOrHideSortWrap
    //   this.showOrHideSortWrap = !this.showOrHideSortWrap;
    //   document.body.style.overflow = Boolean(this.showOrHideSortWrap)
    //     ? "hidden"
    //     : "visible";
    // },
    loadMore() {
      //滚动加载  用户滚动到底部自动加载更多
      console.log(
        this.coinDetail.data.list.length,
        this.coinDetail.data.recordCount
      );
      if (
        this.coinDetail.data.list.length >= this.coinDetail.data.recordCount
      ) {
        //  this.busing = true 择不触发滚动
        this.busing = true;
        this.noMore = true; //没有更多了
        return;
      }
      //第一次触发
      //  this.busing = true 择不触发滚动
      this.busing = true;
      console.log(this.pageIndex);
      var params = {
        type: this.type,
        pageIndex: ++this.pageIndex, //	（选填）当前页码
        pageSize: "10" //	（选填）数量（默认为10）
      };
      //获取用户余额详情
      this.REQUEST_COIN_DETAIL(params).then(() => {
        console.log("加载更多========================");
        console.log(this.coinDetail);
        this.busing = false;
      });
    },

    showSort() {
      //展开余额明细排序showOrHideSortWrap
      this.showOrHideSortWrap = !this.showOrHideSortWrap;
      document.body.style.overflow = Boolean(this.showOrHideSortWrap)
        ? "hidden"
        : "visible";
    },
    showOrHideSortWrapFn() {
      //展开余额明细排序
      // this.showOrHideSortWrap
    },
    sortWrapClick() {
      this.showOrHideSortWrap = false;
      //恢复滚动
      document.body.style.overflow = Boolean(this.showOrHideSortWrap)
        ? "hidden"
        : "visible";
    },
    sortClick(value, index) {  
      //排序 全部 支出  收入  点击事件
      this.sortIndex = index;
      switch(value){
        case '全部':
        this.type = "";
        break;
        case '收入':
        this.type = "0";//收入
        break;
        case '支出':
        this.type = "1";//支出
        break;
      };
      this.pageIndex= '1';//初始化为第一页
      //  this.busing = true 择不触发滚动
      this.busing = true;  
      var params = {
        type:this.type,
        pageIndex:this.pageIndex,//	（选填）当前页码
        pageSize:"10",//	（选填）数量（默认为10）
      }
       //获取用户余额详情
      this.REQUEST_COIN_DETAIL(params).then(()=>{ 
         if (this.coinDetail.data.list.length >= this.coinDetail.data.recordCount ){
            //  this.busing = true 择不触发滚动
            this.busing = true; 
            this.noMore = true;//没有更多了  
         }else{
             this.busing = false; 
         }
         this.showSort();// 模态窗口关闭 
      }) 
    },
    goRecharge() {
      //余额充值
      // https://host.wqbol.com/home/productDetails?id=&type=0
      this.$router.push({
        path: "/home/productDetails",
        query: { id: "83ec5bf4-8f5a-40de-a92d-43ee5d6c655e", type: "0" }
      });
    },
    userBalance() {
      //余额使用
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
    showBalanceDetailFnBackFn(){//清空数据
      var params = {
        type:'-1',
        pageIndex:this.pageIndex,//	（选填）当前页码
        pageSize:"10",//	（选填）数量（默认为10）
      }
      
      this.REQUEST_COIN_DETAIL(params).then(()=>{
        console.log(this.coinDetail.data.list.length , this.coinDetail.data.recordCount ,'? created1  ')
        if (this.coinDetail.data.list.length >= this.coinDetail.data.recordCount ){
          //  this.busing = true 择不触发滚动
            this.pageIndex = 1;
            this.sortIndex = 0;
            this.type = ''; 
            this.noMore = false;
            //不触发滚动
            this.busing = true; 
        }

        this.$router.go(-1); 
      }); 
    },
    beforeDestroy(){
      var params = {
        type:'-1',
        pageIndex:this.pageIndex,//	（选填）当前页码
        pageSize:"10",//	（选填）数量（默认为10）
      }
      
      this.REQUEST_COIN_DETAIL(params).then(()=>{
         
      });
    }
  },
  filters:{
    toFixed2(value){
      if(!value || value =='--') return ;
      return value.toFixed(2);
    },
    formatDate(value) {
        let _value = value.replace(/\D/gi, "");
        return tool.formatDate(_value, "yyyy-MM-dd hh:mm:ss");
    },
    formSymbol(value){
      let  _value = null;
      // console.log(value ,'11111111111')
      switch(value.toString()){
        case '0':
        _value ='+';
        break;
        case '1':
        _value ='-';
        break;
        case '2':
        _value ='-';
        break;
      }
      
      return _value
    },
    formType(value){
      // "Type": 0,					交易类型  0充值  1奖励金额提现  2消费														
      // console.log('valuevaluevalue',value)
      if(!value){return };
      let  _value = null;
      switch(value.toString()){
        case '0':
        _value ='充值';
        break;
        case '1':
        _value ='奖励金额提现';
        break;
        case '2':
        _value ='消费';
        break;
      }
      
      return _value
    }
  },
  components: {
    headerTitle
  }
};
</script>