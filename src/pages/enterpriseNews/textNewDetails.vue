<template>
	<div id="textNewDetails">
		<div class="popularity_return">
			<span class="return" @click="goBack()"> </span>
			<span>热文详情</span>
      <img src="../../assets/images/tabBar/zfx_share@3x.png" alt="" class="search" @click="shareNew()">
		</div>

		<div class="contenrWrap">

			<div class="titleConten">
        <h2>{{newsDate.Title}}</h2>
        <p class="newTitleDes"><span>{{newsDate.SourceInfo}}</span><span style="margin-left: 0.2702702702702703rem ;">{{newsDate.ReviewDateTime | formatDateFn}}</span></p>
        <div class="conten" v-html="newsDate.Content" ref="conten" id="conten">

          <!--新华社北京4月21日电（记者张晓松、朱基钗）全国网络安全和信息化工作会议20日至21日在北京召开。中共中央总书记、国家主席、中央军委主席、中央网络安全和信息化委员会主任习近平出席会议并发表重要讲话。他强调，信息化为中华民族带来了千载难逢的机遇。
          <div class="textImg">
          <img src="" alt="" class="">
          </div>

            新华社北京4月21日电（记者张晓松、朱基钗）全国网络安全和信息化工作会议20日至21日在北京召开。中共中央总书记、国家主席、中央军委主席、中央网络安全和信息化委员会主任习近平出席会议并发表重要讲话。他强调，信息化为中华民族带来了千载难逢的机遇。
                    <div class="moveImg">
            <img src="" alt="" class="">
          </div>
          <div class="proDuct">
            <div class="imgWrap"><img src="" alt=""></div>
            <div class="desList">
              <h3>高新专项审计报告</h3>
              <div class="des">3天拿照，快捷安全</div>
              <div class="prices">
                <span class="nowPrice">￥199.00</span> <span class="oldPrice">￥500.00</span>
                <span class="bug">立即购买</span>
              </div>
            </div>
          </div>-->
        </div>


			</div>

      <div style="height: 0.2702702702702703rem;width: 100%; background-color: #f4f4f4" class="line"></div>

			<div class="labelsAndchannel">
				<div class="lables">
          <span v-if="newsDate.KeyWord1" @click="searchOfNewList(newsDate.KeyWord1)">{{newsDate.KeyWord1}}</span>
          <span v-if="newsDate.KeyWord2" @click="searchOfNewList(newsDate.KeyWord2)">{{newsDate.KeyWord2}}</span>
          <span v-if="newsDate.KeyWord3" @click="searchOfNewList(newsDate.KeyWord3)">{{newsDate.KeyWord3}}</span>
          <span v-if="newsDate.KeyWord4" @click="searchOfNewList(newsDate.KeyWord4)">{{newsDate.KeyWord4}}</span>
          <span v-if="newsDate.KeyWord5" @click="searchOfNewList(newsDate.KeyWord5)">{{newsDate.KeyWord5}}</span>
				</div>
				<div class="channel">
					<h3>{{newsDate.DataDictionaryName}}</h3>
					<span class="des">进入{{newsDate.DataDictionaryName}}服务频道</span>
					<span class="goChannel" @click="goChanneListNews(newsDate.DataDictionary_Id,newsDate.DataDictionaryName)">进入频道</span>
				</div>
			</div>

      <div style="height: 0.2702702702702703rem;width: 100%; background-color: #f4f4f4" class="line"></div>

			<div class="ofRecommend">
				<div class="title">有关推荐</div>
				<ul>
					<li class="texType" v-for="itemRec in recommendNews3" @click="gotTextNewDetails(itemRec.NewsType,itemRec.Id)">
            <div class="textTitle">{{itemRec.Title}}</div>
            <div class="OriginateAndBrowse">
              <span>{{itemRec.SourceInfo == null? '荣灿新闻网':itemRec.SourceInfo}}</span>
              <img src="../../assets/images/tabBar/eyes@3x.png" alt="" class="eysIcon">
              <span>{{itemRec.ReadNum}}</span>
            </div>
            <div class="ImgWrap"><img :src="itemRec.ThumbImgURL" alt=""></div>
          </li>
				</ul>
			</div>

      <div style="height: 0.2702702702702703rem;width: 100%; background-color: #f4f4f4" class="line"></div>

			<div class="ofComment">
				<div class="title">有关评论</div>
        <div class="noHaveComment" v-if="newRewardList.recordCount == 0">还没评论，赶快来一个</div>
        <ul class="commentList">
          <li v-for="rewItem in newRewardListData.slice(0,3)">
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

          <div class="moreComment"  @click="goCommentList()" v-if="newRewardList.recordCount > 3">
            查看更多全部{{newRewardList.recordCount}}条评论
          </div>

        </ul>
			</div>

      <div class="line noMOre" >——————已经到底了——————</div>


		</div>


		<div class="foot" ref="footWrap">
			<div class="inpuntBox">
				<input type="text"  id="focus" maxlength="200" placeholder="发布评论" ref="inputBlur" v-model="rewardTextValue" @keyup.enter="rewardSubmit()"  @blur="out()" v-on:focus="insinte()">
				<!--<img src="../../assets/images/tabBar/biaoqing@3x.png" alt="" class="bqIcon">-->
			</div>
      <!-- 点赞 -->
      <img src="../../assets/images/tabBar/hs_zan@3x.png" alt="" class="zan" v-if="!isPointLove && !isPiontReward" @click="PointLoveNew">
      <img src="../../assets/images/tabBar/hs_zan2@3x.png" alt="" class="zan" v-if="isPointLove && !isPiontReward" @click="PointLoveNew">
      <!-- 收藏 -->
      <img src="../../assets/images/tabBar/he_sc@3x.png" alt="" class="xin" v-if="!isCollect && !isPiontReward" @click="CollectNew(1)">
      <img src="../../assets/images/tabBar/hs_sc@3x.png" alt="" class="xin" v-if="isCollect && !isPiontReward" @click="CollectNew(0)">
      <span class="" v-if="isPiontReward" @click="rewardSubmit()" ref="fabu">发布</span>
		</div>

	</div>
</template>

<script>
  import getd from '../../vuex/getData.js';
  import tool from '../../util/tool'
  import {getSession} from '../../util/base'
  import store from '../../vuex/mine/mine.js'
  import { Toast } from 'mint-ui';
  import messageIcon from '../message/messageIcon.vue'

	export default {
		data(){
			return {
        newsDate: [],
        recommendNews3: [], //新闻推荐
        newRewardList: [],  //有关评论
        newRewardListData:[],     //有关评论数据
        rewardTextValue:'', //评论内容
        isPointLove: false, //是否点赞
        isCollect: false,   //是否收藏
        isPiontReward: false, //是否点击评论框
        activityMes:{},       //分享信息
        CustomerInfo:[] ,          //用户信息
        macUUID:''
			}
		},
		created(){
      //获取当前新闻信息
      var newDetailParme = {
          id: this.$route.query.newsId,
        type:0
      }
      getd.get_textTypeNewtDate(newDetailParme)
        .then((res)=>{
          //console.log('新闻详情',res);
          this.newsDate = res.data;
          //内容处理
          var contentStr = ''
          contentStr = this.newsDate.Content;
          contentStr = contentStr.replace(
            '<video class="edui-upload-video  vjs-default-skin video-js" controls="" preload="none"',
            '<video class="edui-upload-video  vjs-default-skin video-js" controls="controls" preload="meta"'
          )
          this.newsDate.Content = contentStr;

          //新闻有关推荐
          var classIdParme ={
            id: this.newsDate.DataDictionary_Id,
            pageIndex: 1,
            pageSize: 3,
            sort: 1   //按浏览量排序
          }
          //请求该类 新闻列表
          getd.get_nowNewListDate(classIdParme)
            .then((res)=>{
              this.recommendNews3 = res.data.list;
              //console.log('推荐新闻列表',this.recommendNews3);
            })
          //分享信息 赋值
          this.activityMes.LinkName = this.newsDate.Title;
          this.activityMes.Remark = this.newsDate.Subtitle;
          this.activityMes.ThumbImgURL = this.newsDate.ThumbImgURL;
          this.activityMes.LinkWebSite = `https://host.wqbol.com/enterpriseNewsCenter/textNewDetails?newsId=${this.$route.query.newsId}`;

        })

     //评论信息
      this.getRewardListData();

      //用户信息
      getd.getCustomerInfo()
        .then((CustomerRes)=>{
          this.CustomerInfo = CustomerRes.data;
          //用户 阅读增加
          //uuid 设备号获取
          if(tool.is_app()){
            setTimeout(()=>{
              this.macUUID  = plus.device.uuid;
              this.readNewsAdd()
            },30)
          }else{
            return false; //pc端浏览暂时不支持   
          }
        })
        .catch((err)=>{
          //游客 阅读增加
          //uuid 设备号获取
           if(tool.is_app()){
            setTimeout(()=>{
              this.macUUID  = plus.device.uuid;
              this.readNewsAdd()
            },30)
          }else{
            return false; //pc端浏览暂时不支持   
          }

        })
     
     
     //页面是否已收藏 初始化
      var isCollectParma = {
        params:{
          id:this.$route.query.newsId
        }
      }
      getd.get_NewIsCollect(isCollectParma)
        .then((res)=>{
          if(res.data.isCollect == 1){
            this.isCollect = true
          }else {}
        })


    },
		mounted(){
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

			//获取评论信息
      getRewardListData(){
        //获取有关评论
        var RewardParme = {
          id: this.$route.query.newsId,
        }
        getd.get_newRewardList(RewardParme)
          .then((res)=>{
            this.newRewardList = res.data;
            this.newRewardListData = res.data.list;
            //console.log('新闻评论列表',this.newRewardList);
          })
      },
			//评论列表跳转
      goCommentList(){
          this.$router.push({path:'/enterpriseNewsCenter/newsCommentLists',query:{commentListId:this.$route.query.newsId}})
      },
      //进入频道
      goChanneListNews(channeId,channeName){
          this.$router.push({path:'/enterpriseNewsCenter/channelList',query:{channeId:channeId,channeName:channeName}})
      },
      //新闻详情跳转
      gotTextNewDetails(type,id){
        if(id == this.$route.query.newsId){
            window.self.location.reload()
        }
        if(type === 0){
          this.$router.push({path:'/enterpriseNewsCenter/textNewDetails',query:{newsId:id}})
        }else if (type === 1){
          this.$router.push({path:'/enterpriseNewsCenter/moveNewDetails',query:{newsId:id}})
        }else {}

      },
      //关键字搜索跳转
      searchOfNewList(keyWrold){
        this.$router.push({path:'/enterpriseNewsCenter/newSous',query:{searchName:keyWrold}})
      },
			//新闻分享
			shareNew(){
          var newShartParam ={
              id:this.$route.query.newsId
          }
        getd.get_newShares(newShartParam)
          .then((res)=>{
              //console.log('分享成功',this.activityMes)

          wrhShare().sendShare(
            "新闻详情",//bussType_param, bussId_param, title_param, content_param, img_param, href_param
            "000100",
            this.activityMes.LinkName,
            this.activityMes.Remark,
            this.activityMes.ThumbImgURL,
            this.activityMes.LinkWebSite
          )


          })

			},
      //点赞
      PointLoveNew(){
        var PiontParma = {
          id:this.$route.query.newsId,
          datatype:"json"
        }
        getd.get_NewPiontLove(PiontParma)
          .then((res)=>{
            Toast({
              message: '点赞成功！',
              position: 'middle',
              duration: 2000
            });
            this.isPointLove = true
          })
      },
      //收藏
      CollectNew(type){

          if(store.state.token){
            if(type == 1){//收藏
              var collectParma = {
                id:this.$route.query.newsId,
                datatype:"json"
              }
              getd.get_NewAddCollect(collectParma)
                .then((res)=>{
                  this.isCollect = true
                  Toast({
                    message: '收藏成功！',
                    position: 'middle',
                    duration: 2000
                  });
                })
                .catch((err)=>{
                  if(err.data.msg == '已收藏！'){
                    Toast({
                      message: err.data.msg,
                      position: 'middle',
                      duration: 2000
                    });
                    this.isCollect = true
                  }
                })
            }else if(type ==0){//取消收藏
              var DellecollectParma = {
                params: {
                  id: this.$route.query.newsId,
                }
              }

              getd.get_NewDelCollectInfo(DellecollectParma)
                .then((res)=>{
                  this.isCollect =false
                  Toast({
                    message: '取消收藏成功',
                    position: 'middle',
                    duration: 2000
                  });
                })

            }else {}
          }else {
              this.$router.push('/mine/login')
          }

      },
      //评论
      rewardSubmit(){
        this.$refs.inputBlur.blur();
        if(this.CustomerInfo.Id){//已经登录
          var rewardParma = {
            id:this.$route.query.newsId,
            cid: this.CustomerInfo.Id,
            content:this.rewardTextValue.trim()
          }
        }else {//未登录
          var rewardParma = {
            id:this.$route.query.newsId,
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
      //进来阅读数量增加
      readNewsAdd(){

       // console.log('macUUID设备：：',this.macUUID);
        if(this.CustomerInfo.Id) {//已经登录
          var readParma = {
            params:{
              id:this.$route.query.newsId,
              cid: this.CustomerInfo.Id,
              mac:this.macUUID
            }

          }
          getd.get_NewReadAdd(readParma)
            .then((res)=>{
              //console.log('增加阅读++1')
            })

        }else {
          var readParma = {
            params:{
              id:this.$route.query.newsId,
              mac:this.macUUID
            }
          }
          getd.get_NewReadAdd(readParma)
            .then((res)=>{
              //console.log('游客增加阅读++1')
            })
        }
      },
      //评论焦点事件
      out: function(event){
        this.$refs.inputBlur.blur();
        this.isPiontReward = false
        this.$nextTick(()=>{
          document.querySelector('.inpuntBox').style.width = '7.1rem';
        })
      },
      insinte: function(){
        this.isPiontReward = true
        this.$nextTick(()=>{
          document.querySelector('.inpuntBox').style.width = '7.1rem';
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

<style lang="less" type="stylesheet/css" scoped >
@import "./textNewDetails.less";


</style>
