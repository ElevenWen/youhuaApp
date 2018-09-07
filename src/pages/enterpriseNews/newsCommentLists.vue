<template>
	<div id="newsComment">
		<div class="popularity_return">
			<span class="return" @click="goBack()"> </span>
			<span>评论列表</span>
		</div>

    <div class="ofComment">
      <scroller style="top: 44px; bottom: 40px;"
                :on-infinite="infiniteCommet"

                noDataText="没有更多了"
                ref="newsCommenListCroller"
      >
        <ul class="commentList">
          <li v-for="rewItem in newRewardList">
            <div class="titles">
              <img :src=" rewItem.CustomerIcon" alt="" class="portrait" v-if="rewItem.CustomerIcon">
              <img src="../../assets/images/tabBar/mineS@3x.png" alt="" class="portrait" v-else="rewItem.CustomerIcon">
              <span class="userName">{{ rewItem.CustomerName? rewItem.CustomerName :'匿名'}}</span>
              <span class="time">{{rewItem.CreateTime | formatDateFn}}</span>
            </div>
            <div class="comContent">{{rewItem.Content }}</div>
            <div class="customerReply" v-if="rewItem.ReviewContent">
              <span class="customer">客服：</span><span class="reply">{{rewItem.ReviewContent }}</span>
            </div>
          </li>
          <!--<li>
            <div class="titles">
              <img src="../../assets/images/tabBar/mineS@3x.png" alt="" class="portrait">
              <span class="userName">匿名</span>
              <span class="time">15:56</span>
            </div>
            <div class="comContent">服务很好，办理速度超快。好！很好！非常好！服
              务很好，办理速度超快。好！很好！非常好！</div>
            <div class="customerReply">
              <span class="customer">客服：</span><span class="reply">感谢您在我们平台购物，祝您生活愉快！</span>
            </div>
          </li>
          <li>
            <div class="titles">
              <img src="../../assets/images/tabBar/mineS@3x.png" alt="" class="portrait">
              <span class="userName">匿名</span>
              <span class="time">15:56</span>
            </div>
            <div class="comContent">服务很好，办理速度超快。好！很好！非常好</div>
          </li>
          <li>
            <div class="titles">
              <img src="../../assets/images/tabBar/mineS@3x.png" alt="" class="portrait">
              <span class="userName">匿名</span>
              <span class="time">15:56</span>
            </div>
            <div class="comContent">服务很好，办理速度超快。好！很好！非常好</div>
          </li>
          <li>
            <div class="titles">
              <img src="../../assets/images/tabBar/mineS@3x.png" alt="" class="portrait">
              <span class="userName">匿名</span>
              <span class="time">15:56</span>
            </div>
            <div class="comContent">服务很好，办理速度超快。好！很好！非常好</div>
          </li>
          <li>
            <div class="titles">
              <img src="../../assets/images/tabBar/mineS@3x.png" alt="" class="portrait">
              <span class="userName">匿名</span>
              <span class="time">15:56</span>
            </div>
            <div class="comContent">服务很好，办理速度超快。好！很好！非常好！服
              务很好，办理速度超快。好！很好！非常好！</div>
            <div class="customerReply">
              <span class="customer">客服：</span><span class="reply">感谢您在我们平台购物，祝您生活愉快！</span>
            </div>
          </li>
          <li>
            <div class="titles">
              <img src="../../assets/images/tabBar/mineS@3x.png" alt="" class="portrait">
              <span class="userName">匿名</span>
              <span class="time">15:56</span>
            </div>
            <div class="comContent">服务很好，办理速度超快。好！很好！非常好</div>
          </li>-->

        </ul>

      </scroller>

    </div>

    <div class="foot" ref="footWrap">
      <div class="inpuntBox">
        <input type="text" id="focus" maxlength="200" placeholder="发布评论" ref="inputBlur" v-model="rewardTextValue" @keyup.enter="rewardSubmit()"  @blur="out()" v-on:focus="insinte()">
        <!--<img src="../../assets/images/tabBar/biaoqing@3x.png" alt="" class="bqIcon">-->
      </div>
      <span class=""  @click="rewardSubmit()" ref="fabu">发布</span>
    </div>

	</div>
</template>

<script>
  import tool from '../../util/tool'
  import getd from '../../vuex/getData.js';
  import messageIcon from '../message/messageIcon.vue'
  import { Toast } from 'mint-ui'

	export default {
		data(){
			return {
        newRewardList:[],
        pageIndex: 1,       //新闻列表 默认页码
        pageSize: 10,        //每页数量 常量
        isNoDate: '',        //是否加载完毕
        rewardTextValue:''   //评论内容
			}
		},
		created(){
		    //获取评论列表 第一次请求
        this.getRewardListData()

		},
		mounted(){
      this.$refs.inputBlur.focus();
		},
		components: {

		},
		methods: {
      toRouter(path){
        this.$router.push(path)
      },
      goBack(){
        this.$router.go(-1)
      },
      getRewardListData(){
        var RewardParme = {
          id: this.$route.query.commentListId,
          pageIndex: 1,
          pageSize: this.pageSize
        }
        getd.get_newRewardList(RewardParme)
          .then((res)=>{
            this.newRewardList = res.data.list;
            ////console.log('新闻评论列表',this.newRewardList);
          })
      },
      rewardSubmit(){
        this.$refs.inputBlur.blur();
        if(this.$route.query.userId){//已经登录
          var rewardParma = {
            id:this.$route.query.commentListId,
            cid: this.$route.query.userId,
            content:this.rewardTextValue.trim()
          }
        }else {//未登录
          var rewardParma = {
            id:this.$route.query.commentListId,
            content:this.rewardTextValue.trim()
          }
        }
        if(this.rewardTextValue.trim()){
          getd.get_newReward(rewardParma)
            .then((res)=>{
              this.rewardTextValue = ''
              Toast({
                message: '评论成功，已提交审核',
                position: 'middle',
                duration: 2000
              });
              //重置更新
              this.rewardTextValue = '';
              //this.getRewardListData();  需要审核 所有不需要重新获取新闻列表
            })
        }else {
          Toast({
            message: '评论内容不能为空',
            position: 'middle',
            duration: 1000
          });
          this.rewardTextValue = '';
        }

      },
      infiniteCommet(done){

        if(this.isNoDate) {
          this.$refs.newsCommenListCroller.finishInfinite(true);
          return;
        }
        this.pageIndex = this.pageIndex + 1;
        //console.log('当前请求页数',this.pageIndex);

        var RewardParme = {
          id: this.$route.query.commentListId,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
        getd.get_newRewardList(RewardParme)
          .then((res)=>{
            var NewListDate = res.data.list;
            if( NewListDate.length === 0){ //加载完毕
              this.isNoDate = true;
              setTimeout(()=>{
                this.$refs.newsCommenListCroller.finishInfinite(true); //已加载完全
              })
            }else {
              NewListDate.forEach(elem => {
                this.newRewardList.push(elem);
              });
              done()
            }

          })

      },
      //评论焦点事件
      out: function(event){
        this.$refs.inputBlur.blur();
        this.$nextTick(()=>{
          document.querySelector('.inpuntBox').style.width = '7.027027027027027rem';

        })
      },
      insinte: function(){

        this.$nextTick(()=>{
          document.querySelector('.inpuntBox').style.width = '7.027027027027027rem';
        })

      }
		},
    filters: {
      formatDateFn: value => {
        return tool.formatDateTime(value);
      },

    },
    watch:{
      rewardTextValue: function (val,oldVal) {
        if(val.trim().length>0){
          this.$nextTick(()=>{
            this.$refs.fabu.style.color = '#30a1f8'
          })
        }else {
          this.$nextTick(()=>{
            this.$refs.fabu.style.color = '#666666'
          })
        }
      }
    }
	};
</script>

<style lang="less" type="stylesheet/css" scoped="scoped">

 @import "enterpriseNewsCenter.less";

  #newsComment{
     width: 100%;
     background: #ffffff;
     overflow: hidden;
     .popularity_return {
         position: fixed;
         top:-0.1px;
         left: 0;
         z-index: 50;
         height: 1.1891891891891893rem;
         width: 100%;
         text-align: center;
         line-height: 1.1891891891891893rem;
         font-size: 0.4864864864864865rem;
         color: #1a1715;
         background: #FFF;
         border-bottom: 1px solid #CCCCCC;
         .return {
             position: absolute;
             top:0.2702702702702703rem;
             left: 0.40540540540540543rem;
             height: 0.5675675675675675rem;
             width: 0.5135135135135135rem;
             line-height: 1.1891891891891893rem;
             background-repeat: no-repeat;
             background-size: 100%;
             .bg-image('../../assets/images/cart/nav_back');
        }
    }
     //评论 
     .ofComment{
         width: 100%;
         padding-top: 1.88rem;
         padding-bottom: 1.2162162162162162rem;
         .title{
             padding: 0 0.2702702702702703rem;
             width: 100%;
             height: 1.2162162162162162rem;
             font-size: 0.40540540540540543rem;
             line-height: 1.2162162162162162rem;
             color: #333333;
             border-bottom: solid 1px #ebe5e1;
        }
         .commentList{
             padding-bottom: 1.2162162162162162rem;
             width: 100%;
             height: 100%;
             background: #fff;
             overflow: auto;
             li{
                 border-bottom: solid 1px #ebe5e1;
                 background-color: #fff;
                 .titles{
                     margin-top: 0.40540540540540543rem;
                     padding: 0 0.2702702702702703rem;
                     position: relative;
                     width: 100%;
                     height: 0.8108108108108109rem;
                     .portrait{
                         width: 0.8108108108108109rem;
                         height: 0.8108108108108109rem;
                         border-radius: 50%;
                         vertical-align: middle;
                    }
                     .userName{
                         margin-left: 0.2702702702702703rem;
                         font-size: 0.40540540540540543rem;
                    }
                     .time{
                         position: absolute;
                         top: 0.13513513513513514rem;
                         right: 0.2702702702702703rem;
                         font-size: 0.32432432432432434rem;
                         color: #999999;
                    }
                }
                 .comContent{
                     padding: 0.2702702702702703rem 0 0.2702702702702703rem 1.3513513513513513rem;
                     font-size: 0.3783783783783784rem;
                     line-height: 0.5405405405405406rem;
                     color: #1f1f1f;
                }
                 .customerReply{
                     padding: 0.43243243243243246rem 0.2702702702702703rem;
                     line-height: 1.2;
                     //min-height: 1.2162162162162162rem;
                     //line-height: 1.0810810810810811rem;
                     font-size: 0.3783783783783784rem;
                     background-color: #f5f5f5;
                     .customer{
                         color: #fa2802;
                    }
                     .reply{
                         color: #666666;
                    }
                }
            }
        }
         .loading-layer{
             //padding-bottom: 0.8108108108108109rem;
             height: 2.7027027027027026rem;
        }
    }
     //底部评论 
     .foot{
         position: absolute;
         left: 0;
         bottom: 0;
         width: 100%;
         height: 1.2162162162162162rem;
         line-height: 1.2162162162162162rem;
         background-color: #ffffff;
         box-shadow: inset 0rem 1px 0rem 0rem #d9d9d9;
         img{
             width: 0.5405405405405406rem;
             height: 0.5405405405405406rem;
             vertical-align: middle;
        }
         .inpuntBox{
             position: relative;
             display: inline-block;
             margin: 0 0.5405405405405406rem 0 0.40540540540540543rem;
             vertical-align: middle;
             width: 7.027027027027027rem;
             height: 0.8648648648648649rem;
             border-radius: 0.43243243243243246rem;
             border: solid 1px #e8e8e8;
             overflow: hidden;
             input{
                 width: 100%;
                 padding-left: 0.2702702702702703rem;
                 padding-right: 0.8108108108108109rem;
                 position: absolute;
                 top: 0;
                 left: 0;
                 height: 0.8648648648648649rem;
                 background-color: #f4f5f6;
                 border-radius: 0.43243243243243246rem;
            }
             .bqIcon{
                 position: absolute;
                 right: 0.16216216216216217rem;
                 top: 0.13513513513513514rem;
                 z-index: 5 
            }
        }
         .zan{
             margin-right: 0.40540540540540543rem;
        }
         span{
             font-size: 0.40540540540540543rem;
             color: #666666;
        }
    }
}
 


</style>
