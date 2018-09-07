<template>
	<div id="channelList">
		<div class="popularity_return">
			<span class="return" @click="goBack()"> </span>
			<span>{{thisTitle}}</span>
		</div>

    <div class="ContenrWrap" >
      <scroller style="top: 1.1891891891891893rem ; bottom: 1.0810810810810811rem ;"
                :on-refresh.stop="refresh"
                :on-infinite="infinite"
                noDataText="没有更多了"
                ref="mysChanneCroller"
      >
        <ul>
          <li v-for="newItem in newsDataList" class="texType" @click="gotTextNewDetails(newItem.NewsType,newItem.Id)">
            <div :class="newItem.NewsType == 0? 'textTitle':'moveTitle'" >
              {{newItem.Title}}
            </div>
            <div :class="newItem.NewsType == 0? 'ImgWrap':'moveImgWrap'" ><img v-lazy="newItem.ThumbImgURL" alt="" class="showImg">
              <img src="../../assets/images/tabBar/videoPaly@2x.png" alt="" class="play" v-if="newItem.NewsType == 1">
            </div>
            <div class="OriginateAndBrowse">
              <span>{{newItem.SourceInfo == null? '荣灿新闻网':newItem.SourceInfo}}</span>
              <img src="../../assets/images/tabBar/eyes@3x.png" alt="" class="eysIcon">
              <span>{{newItem.ReadNum + newItem.ReadBase }}</span>
            </div>
          </li>
          <!--<li class="texType" @click="gotTextNewDetails()">
            <div class="textTitle">
              习近平出席全国网络安全和信息化工作会议
            </div>
            <div class="OriginateAndBrowse">
              <span>荣灿新闻网</span>
              <img src="../../assets/images/tabBar/eyes@3x.png" alt="" class="eysIcon">
              <span>2666</span>
            </div>
            <div class="ImgWrap"></div>
          </li>
          <li class="texType">
            <div class="textTitle">
              习近平出席全国网络安全和
              信息化工作会议并发表重要
              讲话
            </div>
            <div class="OriginateAndBrowse">
              <span>荣灿新闻网</span>
              <img src="../../assets/images/tabBar/eyes@3x.png" alt="" class="eysIcon">
              <span>2666</span>
            </div>
            <div class="ImgWrap"></div>
          </li>
          <li class="moveType">
            <div class="textTitle">
              习近平出席全国网络安全和信息化工作会议
            </div>
            <div class="ImgWrap"></div>
            <div class="OriginateAndBrowse">
              <span>荣灿新闻网</span>
              <img src="../../assets/images/tabBar/eyes@3x.png" alt="" class="eysIcon">
              <span>8666</span>
            </div>
          </li>
          <li class="moveType">
            <div class="textTitle">
              习近平出席全国网络安全和信息化工作会议
            </div>
            <div class="ImgWrap"></div>
            <div class="OriginateAndBrowse">
              <span>荣灿新闻网</span>
              <img src="../../assets/images/tabBar/eyes@3x.png" alt="" class="eysIcon">
              <span>8666</span>
            </div>
          </li>-->

        </ul>
      </scroller>

    </div>


	</div>
</template>

<script>
  import getd from '../../vuex/getData.js';
  import messageIcon from '../message/messageIcon.vue'

	export default {
		data(){
			return {
        thisTitle: this.$route.query.channeName,
        newsDataList:[],    //当前新闻列表信息
        pageIndex: 1,       //新闻列表 默认页码
        pageSize: 8,        //每页数量 常量

        isNoDate: '',       //是否加载完毕
			}
		},
		created(){
      //console.log('当前id',this.$route.query.channeId);
      var classIdParme ={
        id: this.$route.query.channeId,
        pageIndex: 1,
        pageSize: this.pageSize
      }
      //请求该类 新闻列表
      getd.get_nowNewListDate(classIdParme)
        .then((res)=>{
          this.newsDataList = res.data.list;
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
      //新闻详情跳转
      gotTextNewDetails(type,id){
        if(type === 0){
          this.$router.push({path:'/enterpriseNewsCenter/textNewDetails',query:{newsId:id}})
        }else if (type === 1){
          this.$router.push({path:'/enterpriseNewsCenter/moveNewDetails',query:{newsId:id}})
        }else {}

      },
      refresh (done) {
        //防止下拉完毕后 重新重置
        this.pageIndex = 1;
        this.isNoDate = '';
        this.$refs.mysChanneCroller.finishInfinite(false);

        var ClassIdParme ={
          id: this.$route.query.channeId,
          pageIndex: 1,
          pageSize: 6
        }
        getd.get_nowNewListDate(ClassIdParme)
          .then((res)=>{
            this.newsDataList = res.data.list;
            done()
          })

      },
      infinite(done){
        //console.log('当前了下拉执行',this.isNoDate);
        if(this.isNoDate) {
          //console.log('加载完毕log');
          this.$refs.mysChanneCroller.finishInfinite(true);
          return;
        }
        this.pageIndex = this.pageIndex + 1;
        //console.log('当前请求页数',this.pageIndex);

        var ClassIdParme ={
          id: this.$route.query.channeId,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
        getd.get_nowNewListDate(ClassIdParme)
          .then((res)=>{
            var NewListDate = res.data.list;
            if( NewListDate.length === 0){ //加载完毕
              this.isNoDate = true;
              setTimeout(()=>{
                this.$refs.mysChanneCroller.finishInfinite(true); //已加载完全
              })
            }else {
              NewListDate.forEach(elem => {
                this.newsDataList.push(elem);
              });
              done()
            }

          })


      }

		},
	};
</script>

<style lang="less" type="stylesheet/css" scoped="scoped">
 @import "enterpriseNewsCenter.less";

  #channelList{
     .ContenrWrap{
       padding-top: 1.88rem;
       ul{
         height: 100%;
         overflow: auto;
       }
     }
  }


</style>
