<template>
  <div id="myWallet">
      <headerTitle :title="title" ></headerTitle>
      <div class="one">
          <ul>
              <li @click="my_invite">
                  <span>佣金</span>
                  <div>
                    <!-- {{myWalletParticulars}} -->
                  </div>
                  <span class="num nowPrice">
                    <span class="nowPrice">{{myWalletParticulars.Reward | formatPrice }}<b>{{myWalletParticulars.Reward | formatPriceX}}</b> </span>
                      <span><img class="go_i" src="../../../assets/images/mine/new/go@3x.png" alt=""></span>
                  </span>
              </li>
              <li>
                  <span>余额</span>
                  <span class="num nowPrice" @click='goBalance'> 
                    <span class="nowPrice">{{myWalletParticulars.Balance | formatPrice }}<b>{{myWalletParticulars.Balance | formatPriceX}}</b> </span>
                      <span><img class="go_i" src="../../../assets/images/mine/new/go@3x.png" alt=""></span>
                  </span>
              </li>
              <li @click="goAccountBi">
                  <span>记账币</span>
                  <span class="num nowPrice"> 
                    <span>{{myWalletParticulars.Coin}}</span> 
                      <span><img class="go_i" src="../../../assets/images/mine/new/go@3x.png" alt=""></span>
                  </span>
              </li>
          </ul>
      </div>
      <div class="one two">
          <ul>
              <li @click.stop="coupon">
                  <span>优惠券</span>
                  <span class="num  ">
                    <span>{{myWalletParticulars.Coupons}}张可用</span> 
                      <span><img class="go_i" src="../../../assets/images/mine/new/go@3x.png" alt=""></span>
                  </span>
              </li>
              <li @click="myInformation">
                  <span>积分</span>
                  <span class="num nowPrice">
                    <span>{{myWalletParticulars.Score}}</span> 
                    <span><img class="go_i" src="../../../assets/images/mine/new/go@3x.png" alt=""></span>
                  </span>
              </li>
          </ul>
      </div>
  </div>
</template>

<style lang="less" scoped>
    .one{
     margin-top: 1.5135135135135136rem;
     ul{
         li{
             width: 100%;
             height: 1.2162162162162162rem;
             line-height: 1.2162162162162162rem;
             display: flex;
             justify-content: space-between;
             padding-left: 0.32432432432432434rem;
             background-color: #fff;
             border-bottom: 1px solid #eee;
             font-size: 0.3783783783783784rem;
             .num{
                 margin-right: 0.32432432432432434rem;
                 color: #999;
                 i{
                     font-size: 0.32432432432432434rem;
                }
                 img{
                     margin-left: 0.10810810810810811rem;
                }
            }
        }
    }
}
 .two{
     margin-top: 0.32432432432432434rem;
}
 //改变小数点样式 
 .nowPrice{
     color:black;
     font-size: 0.3783783783783784rem;
     b{
         font-size: 0.32432432432432434rem;
         font-weight: normal 
    }
}
 .nowPrice{
   color: #999;
 }
 .go_i{
  width: 0.1891891891891892rem;
  height: 0.35135135135135137rem;
 }
</style>


<script>
  import headerTitle from "../../components/header-title";
  import { mapState,mapActions,mapGetters} from 'vuex'; 
  import  tool from "../../../util/tool";
  

  export default{
    data(){
      return {
        title:'我的钱包'
      }
    },
    created(){
      // console.log(this.REQUEST_MYWALLETPARTICULARS);
      //获取  帐户余额 奖励佣金 记账币 积分 
      this.REQUEST_MYWALLETPARTICULARS();
      console.log('====================');
      console.log(this.myWalletParticulars)

    },
    methods:{
      ...mapActions( 
        'mine_index',{
          //获取记账币金额
          REQUEST_MYWALLETPARTICULARS:'REQUEST_MYWALLETPARTICULARS'
        }
      ),
      goBalance(){//余额
        console.log('余额')
        this.$router.push('/mine/balance');
      },  
			my_invite() {//佣金-我的邀请页面
				this.$router.push('/activity/inviteList');
      },
        //去记账币
      goAccountBi(){
        this.$router.push('/mine/accountBi');
      },
        //我的优惠卷
			coupon() {
				this.$router.push('/mine/coupon');
            },
            //我的积分
			myInformation() {
				this.$router.push('/mine/integral');
			},  
    },
    computed:{
      ...mapState("mine_index", { 
        myWalletParticulars:'myWalletParticulars', //获取  帐户余额 奖励佣金 记账币 积分
        balanceDetail: "balanceDetail",//余额明细
      }),

      // balanceDetail(){
      //   console.log(this.mine_index.balanceDetail)
      //   return this.mine_index.balanceDetail
      // }
    },
    components:{
      headerTitle
    },
    filters:{
      formatPrice (value) {
        if(value == undefined  || value == '--'){return } 
        let _value = value.toFixed(2).toString()
        console.log((value.toFixed(2)).toString())
        return   tool.formatPrice(_value ) ;
      },
      formatPriceX:value =>{
        if(value == undefined  || value == '--'){return }   
        console.log('dd',value)
        let _value = value.toFixed(2).toString()
        
        return tool.formatPriceX( _value ) ;
      },
      currencyFn :value =>   {
        // if(!value){return }
       
        
        // let _value = (Number(value)).toString();
        // return tool.currency( _value);
      }
    }
  }
</script>
