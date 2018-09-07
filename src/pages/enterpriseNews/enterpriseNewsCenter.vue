<template>
	<div id="enterpriseCenter">
		<div class="popularity_return">
			<span class="return" @click="goBack()"> </span>
			<span>企业热闻</span>
      <img src="../../assets/images/tabBar/search22@3x.png" alt="" class="search" @click="toRouter('/enterpriseNewsCenter/newSous')">
      <messageIcon   source="cart"  class="messges cartInformationWrap"></messageIcon>
		</div>
    <div id="topNav" class="navWrap swiper-container" ref='swiperContainer'>
      <!-- <ul class="nav-list swiper-wrapper" id="newNav-list" ref="tab">
        <li class="item swiper-slide" @click="setNav(0,0)"  :class="{'nav-active': navType === 0}" ref="tablist">最新</li>
        <li class="item swiper-slide" ref="tablist"
            v-for="(item, index) in newNavList"
            :key="index"
            :class="{'nav-active': navType === index+1}"
            @click="setNav(index+1, item.Id)"
        >{{item.Name}}</li>
      </ul> -->
      <div class="swiper-wrapper" id="newNav-list">
        <div class="swiper-slide" @click.stop="setNav(0,0)"  :class="{'nav-active': navType === 0}">最新</div>
        <div class="swiper-slide"
            v-for="(item, index) in newNavList"
            :key="index"
            :class="{'nav-active': navType === index+1}"
            @click.stop="setNav(index+1, item.Id)"
        >{{item.Name}}
        </div>
      </div>
    </div>

    <div class="ContenrWrap">
      <scroller style="top: 2.3783783783783785rem; bottom: 1.0810810810810811rem;"
                :on-refresh.stop="refresh"
                :on-infinite="infinite"
                noDataText="没有更多了"
                ref="myscroller"
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


        </ul>
      </scroller>

    </div>

	</div>
</template>

<script>
  import BScroll from 'better-scroll';
  import { Navbar, TabItem } from 'mint-ui';
  import getd from '../../vuex/getData.js';
  import messageIcon from '../message/messageIcon.vue'

	export default {
		data(){
			return {
        newsDataList:[],    //当前新闻列表信息
        pageIndex: 1,       //新闻列表 默认页码
        pageSize: 8,        //每页数量 常量
        newNavList: [],     //导航列表数据

        navType: 0,         //导航切换下标
        refreshParmeId: 0,  //上拉刷新当前列表请求id  0则是最新新闻列表
        isNoDate: '',    //是否加载完毕

        scroll:false,
			}
		},
		created(){
		    var nowNesParme = {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
		    //请求最新新闻列表
        getd.get_nowNewListDate(nowNesParme)
        .then((res)=>{
          this.newsDataList = res.data.list;
          if(this.$route.query.homeComeDate && this.$route.query.homeComeDate.Id){
            this.newsDataList.splice(this.$route.query.shiftIndex, 1);
            this.newsDataList.unshift(this.$route.query.homeComeDate); //头部插入数据
          }else {

          }
        })
        //请求新闻导航列表数据
      getd.get_newClassListDate()
        .then((res)=>{
          //console.log('新闻分类',res);
          this.newNavList = res.data.list;


        this.$nextTick(()=>{
         

         var mySwiper = new Swiper('#topNav', {
            freeMode: true,
            freeModeMomentumRatio: 0.5,
            slidesPerView: 'auto',
          });
          //console.log('滑块',mySwiper)
          let swiperWidth = mySwiper.$el[0].clientWidth;
          let maxTranslate = mySwiper.maxTranslate();
          let maxWidth = -maxTranslate + swiperWidth / 2;
          //console.log('ss',swiperWidth,maxTranslate,maxWidth)

          /* this.$refs.swiperContainer.addEventListener('touchStart',function(e){
             e.preventDefault() 
          }) */

          mySwiper.on('click', function(swiper, e) {
            //console.log('函数参数',swiper)
            let slide = swiper.target
            let slideLeft = slide.offsetLeft
            let slideWidth = slide.clientWidth
            let slideCenter = slideLeft + slideWidth / 2
            // 被点击slide的中心点

            mySwiper.setTransition(300) //过度时间

            if (slideCenter < swiperWidth / 2) {        
              mySwiper.setTranslate(0)
            } else if (slideCenter > maxWidth) {             
              mySwiper.setTranslate(maxTranslate)
            } else {
              let nowTlanslate = slideCenter - swiperWidth / 2
              mySwiper.setTranslate(-nowTlanslate)
            }

          })


       }) 

        })


		},
		mounted(){
      
		},
		components: {
      messageIcon
		},
		methods: {
      toRouter(path){
        this.$router.push(path)
      },
      goBack(){
        this.$router.go(-1)
      },
      setNav(index,newClassId) {
        //导航切换重置
        this.navType = index;
        this.refreshParmeId = newClassId;
        this.pageIndex = 1;
        this.isNoDate = '';
        this.$refs.myscroller.finishInfinite(false);
        //动画自动居中 处理
     

        //请求发送
        if(newClassId === 0){
          var nowNesParme = {
            pageIndex: this.pageIndex,
            pageSize: this.pageSize
          }
          getd.get_nowNewListDate(nowNesParme)
            .then((res)=>{
              this.newsDataList = res.data.list;
            })
        }else {
          var classIdParme ={
            id: newClassId,
            pageIndex: this.pageIndex,
            pageSize: this.pageSize
          }
          getd.get_nowNewListDate(classIdParme)
            .then((res)=>{
              this.newsDataList = res.data.list;
            })
        }

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
        this.$refs.myscroller.finishInfinite(false);

        if(this.refreshParmeId === 0){
          //请求最新新闻列表
          var RefreshNowNewsParme = {
            pageIndex: 1,
            pageSize: 6
          }

          getd.get_nowNewListDate(RefreshNowNewsParme)
            .then((res)=>{
              this.newsDataList = res.data.list;
              done()
            })
        }else {
          var ClassIdParme ={
            id: this.refreshParmeId,
            pageIndex: 1,
            pageSize: 6
          }
          getd.get_nowNewListDate(ClassIdParme)
            .then((res)=>{
              this.newsDataList = res.data.list;
              done()
            })
        }


      },
      infinite(done){
        //console.log('当前了下拉执行',this.isNoDate);
        if(this.isNoDate) {
          //console.log('加载完毕log');
          this.$refs.myscroller.finishInfinite(true);
          return;
        }
        this.pageIndex = this.pageIndex + 1;
        //console.log('当前请求页数',this.pageIndex);
        if(this.refreshParmeId ===0){
          var RefreshNowNewsParme = {
            pageIndex: this.pageIndex,
            pageSize: this.pageSize
          }
          getd.get_nowNewListDate(RefreshNowNewsParme)
            .then((res)=>{
              var NewListDate = res.data.list;
              if( NewListDate.length === 0){ //加载完毕
                this.isNoDate = true;
                setTimeout(()=>{
                  this.$refs.myscroller.finishInfinite(true); //已加载完全
                })
              }else {
                NewListDate.forEach(elem => {
                  this.newsDataList.push(elem);
                });
                done()
              }
            })
        }else {
          var ClassIdParme ={
            id: this.refreshParmeId,
            pageIndex: this.pageIndex,
            pageSize: this.pageSize
          }
          getd.get_nowNewListDate(ClassIdParme)
            .then((res)=>{
              var NewListDate = res.data.list;
              if( NewListDate.length === 0){ //加载完毕
                this.isNoDate = true;
                setTimeout(()=>{
                  this.$refs.myscroller.finishInfinite(true); //已加载完全
                })
              }else {
                NewListDate.forEach(elem => {
                  this.newsDataList.push(elem);
                });
                done()
              }

            })
        }

      }


		},
	};
</script>

<style lang="less" type="stylesheet/css" scoped >
@import "enterpriseNewsCenter.less";


</style>
