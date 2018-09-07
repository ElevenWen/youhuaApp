<template>
	<div id="moveNewDetails">
    <div class="movieNewConten">
      <div class="movieWrap">
        <img src="../../assets/images/tabBar/bs_back@3x.png" alt="" class="backImg" @click="goBack">
        <img src="../../assets/images/tabBar/vioce_0@3x.png" alt="" class="viodceImg" @click="vioceContral(false)" v-if="isHaveVoice && !isShowRemind">
        <img src="../../assets/images/tabBar/vioce_1@3x.png" alt="" class="viodceImg" @click="vioceContral(true)" v-else="isHaveVoice">

        <p v-if="isShowRemind">播放将消耗流量，是否继续播放</p>
        <span @click="continuePlay()" v-if="isShowRemind">继续播放</span>

        <video  id="newVideo" :src="putVideoSrc" width="100%" height="100%" webkit-playsinline playsinline x5-playsinline  controls="controls" v-if="!isShowRemind">

          您的浏览器不支持 video 标签。
         </video>

      </div>
      <div class="dess">
        <div class="originateAndShart">
          <span class="newOriginate">{{newsDate.SourceInfo}}</span> <span>{{newsDate.ReviewDateTime | formatDateFn}}</span>
          <span class="shart" @click="shareNew()">分享</span>
        </div>

      </div>
    </div>

    <div class="scrollerWrap">
      <div class="scroller" >
        <h2>{{newsDate.Title}}</h2>
        <div class="ofProduct">
          <div class="title">相关商品</div>
          <ul>
            <li class="proDuct" v-for="porDutItem in newsDate.NewsVideoProductModels ">
              <div class="imgWrap"><img :src="porDutItem.AppImgPath" alt=""></div>
              <div class="desList">
                <h3>{{porDutItem.Name}}</h3>
                <div class="des">{{porDutItem.Intro}}</div>
                <div class="prices">
                  <span class="nowPrice">￥{{porDutItem.Price}}</span>
                  <span class="bug" @click="bugProduct(porDutItem.ProductId,porDutItem.Type)">立即购买</span>
                </div>
              </div>
            </li>

          </ul>

        </div>

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

    </div>

    <div class="foot" ref="footWrap">
      <div class="inpuntBox">
        <input type="text" id="focus" maxlength="200" placeholder="发布评论" ref="inputBlur" v-model="rewardTextValue" @keyup.enter="rewardSubmit()"  @blur="out()" v-on:focus="insinte()">
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
  import store from '../../vuex/mine/mine.js'
  import {getSession} from '../../util/base'
  import { Toast } from 'mint-ui';

	export default {
		data(){
			return {
        newsDate: [],         //新闻数据
        newRewardList:{},     //有关评论
        newRewardListData:[],     //有关评论数据
        rewardTextValue:'',   //评论内容
        isPointLove: false,   //是否点赞
        isCollect: false,     //是否收藏
        isPiontReward: false, //是否点击评论框

        isHaveVoice: true,    //默认视频静音
        isNoPlay: true,       //wifi 环境下默认自动播放
        isShowRemind: false,  //不是wifi环境下 给予提醒
        videoSrc:'',          //视频来源
        putVideoSrc:'',       //最终放入的视频url
        activityMes:{},       //分享信息
        CustomerInfo:[],           //用户信息
        macUUID:''
			}
		},
		created(){


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

      var newDetailParme = {
        id: this.$route.query.newsId,
        type:0
      }
      getd.get_textTypeNewtDate(newDetailParme)
        .then((res)=>{
          //console.log('新闻详情',res);
          this.newsDate = res.data;
          this.videoSrc = res.data.VideoURL;

          //分享信息 赋值
          this.activityMes.LinkName = this.newsDate.Title;
          this.activityMes.Remark = this.newsDate.Subtitle;
          this.activityMes.ThumbImgURL = this.newsDate.ThumbImgURL;
          this.activityMes.LinkWebSite = `https://host.wqbol.com/enterpriseNewsCenter/moveNewDetails?newsId=${this.$route.query.newsId}`;


          this.$nextTick(()=>{
            if(!document.getElementById("newVideo")){
              return
            }
            //video媒体控制处理  静音处理
            document.getElementById("newVideo").muted = this.isHaveVoice;
            //wifi判断 播放处理
            if(!tool.is_app()){
              //浏览器
              this.putVideoSrc= this.videoSrc;
              //console.log('createdUrl222',this.putVideoSrc);
              document.getElementById("newVideo").setAttribute('autoplay','autoplay');
              this.isShowRemind=false
            }else {
              //移动端
//            let sbName = plus.os.name;

              	// 检测wifi
              	var types = {};
                types[plus.networkinfo.CONNECTION_UNKNOW] = "Unknown connection";
                types[plus.networkinfo.CONNECTION_NONE] = "None connection";
                types[plus.networkinfo.CONNECTION_ETHERNET] = "Ethernet connection";
                types[plus.networkinfo.CONNECTION_WIFI] = "WiFi connection";
                types[plus.networkinfo.CONNECTION_CELL2G] = "Cellular 2G connection";
                types[plus.networkinfo.CONNECTION_CELL3G] = "Cellular 3G connection";
                types[plus.networkinfo.CONNECTION_CELL4G] = "Cellular 4G connection";

              	if(types[plus.networkinfo.getCurrentType()] === 'WiFi connection'){
                  //视频src 嵌入及播放
                  this.putVideoSrc= this.videoSrc;
                  document.getElementById("newVideo").setAttribute('autoplay','autoplay');
                }else {
                  this.isShowRemind = true;
                }
//            if(sbName === 'Android') {
//              // var connection = navigator.connection||navigator.mozConnection||navigator.webkitConnection||{tyep:'unknown'};
//              // var type_text = ['unknown','ethernet','wifi','2g','3g','4g','none'];
//
//              if(types[plus.networkinfo.getCurrentType()] === 'WiFi connection'){
//                //视频src 嵌入及播放
//                this.putVideoSrc= this.videoSrc;
//                document.getElementById("newVideo").setAttribute('autoplay','autoplay');
//              }else {
//                this.isShowRemind = true;
//              }
//            } else if(sbName === 'iOS') {
//              if(network === 3){
//                //console.log('ios有wifi网')
//                this.putVideoSrc= this.videoSrc;
//                document.getElementById("newVideo").setAttribute('autoplay','autoplay');
//              }else {
//                this.isShowRemind = true;
//              }
//            }else {
//              //console.log('其他机型不支持')
//            }

              //全屏播放优化
              //-------方法定义
              // Android平台的视频全屏旋转
              var fullScreenOfAndroid = function() {
                if(true) {
                  // 最新5+API的支持 Android平台优化视频全屏旋转效果
                  var self = plus.webview.currentWebview();
                  self.setStyle({
                    videoFullscreen: 'landscape'
                  });
                } else {
                  document.addEventListener('webkitfullscreenchange', function() {
                    var el = document.webkitFullscreenElement; //获取全屏元素
                    if(el) {
                      plus.screen.lockOrientation('landscape'); //锁死屏幕方向为横屏
                    } else {
                      plus.screen.lockOrientation('portrait-primary'); //锁死屏幕方向为竖屏
                    }
                  });
                }
              };

              // iOS平台的视频全屏旋转
              var fullScreenOfIos = function(videoElem) {
                // 监听的事件与Android平台有很大区别
                videoElem.addEventListener('webkitbeginfullscreen', function() {
                  plus.screen.lockOrientation('landscape'); //锁死屏幕方向为横屏
                });
                videoElem.addEventListener('webkitendfullscreen', function() {
                  plus.screen.lockOrientation('portrait-primary'); //锁死屏幕方向为竖屏
                });
              };

              //------方法plusready监听 执行

              setTimeout(()=>{
                //console.log('plusready~执行了----stetime');
                var osName = plus.os.name;
                if(osName === 'Android') {
                  //console.log('全屏优化----Android');
                  fullScreenOfAndroid();
                } else if(osName === 'iOS') {
                  //console.log('全屏优化----iOS');
                  var videoD = document.getElementById("newVideo");
                  fullScreenOfIos(videoD);
                }
              },30)


            }



          })


        })

      /*//监听scroll
      window.addEventListener("scroll",this.scrollChangeBorder)*/
		},
		updated(){

    },
    beforeDestroy() {
     /* window.removeEventListener("scroll", this.scrollChangeBorder);*/
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
      scrollChangeBorder(){
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        ////console.log(scrollTop);
        if(scrollTop > 5){
            this.$nextTick(()=>{
                document.querySelector('.movieNewConten').style.borderBottom = '1px solid #ebe5e1';
            })
        }else {
          this.$nextTick(()=>{
            document.querySelector('.movieNewConten').style.borderBottom = 'none'
          })
        }
      },
      vioceContral(isVioce){
        this.$nextTick(()=>{
            if(!document.getElementById("newVideo")){
                return false;
            }
          this.isHaveVoice = isVioce;
          document.getElementById("newVideo").muted = this.isHaveVoice;
        })
      },
      continuePlay(){
          this.$nextTick(()=>{
              this.isShowRemind = false;
            //视频src 嵌入及播放
            this.putVideoSrc= this.videoSrc;
            document.getElementById("newVideo").setAttribute('autoplay','autoplay');

          })
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
          if(this.CustomerInfo.Id){
            this.$router.push({path:'/enterpriseNewsCenter/newsCommentLists',query:{commentListId:this.$route.query.newsId,userId:this.CustomerInfo.Id}})
          }else {
            this.$router.push({path:'/enterpriseNewsCenter/newsCommentLists',query:{commentListId:this.$route.query.newsId}})
          }

      },
      //关键字搜索跳转
      searchOfNewList(keyWrold){
          this.$router.push({path:'/enterpriseNewsCenter/newSous',query:{searchName:keyWrold}})
      },
      //立即购买
      bugProduct(proId,ProType){
        //console.log(proId);
        this.$router.push({path:"/home/productDetails",query:{id:proId,type:ProType}})
      },
      //进入频道
      goChanneListNews(channeId,channeName){
        this.$router.push({path:'/enterpriseNewsCenter/channelList',query:{channeId:channeId,channeName:channeName}})
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
            this.isPointLove = true
            Toast({
              message: '点赞成功！',
              position: 'middle',
              duration: 2000
            });
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
                //console.log('收藏出错',err);
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
        //console.log('macUUID设备：：',this.macUUID);
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
          document.querySelector('.inpuntBox').style.width = '7.027027027027027rem'
        })

      },
      insinte: function(){
        this.isPiontReward = true;
        this.$nextTick(()=>{
            document.querySelector('.inpuntBox').style.width = '7.027027027027027rem';
        })

      }
		},
    filters: {
      formatDateFn: value => {
        return tool.formatDateTime(value);
      }
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

<style lang="less" type="stylesheet/css"  scoped>
@import "moveNewDetails.less";


</style>
