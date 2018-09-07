<template>
	<div id="newSous">
		<div class="search_box" id="search_box">
				<input type="search" value="" placeholder="请输入关键字" class="search_in newsS" v-model="value" id="myinput" ref="inputBlur" @keyup.enter="search(value)" autocomplete="off"/>
				<label class="search"><img src="../../assets/images/tabBar/search@3x.png" /></label>
				<a @click="close" class="information">取消</a>
		</div>

    <transition name="slide-left">
        <div v-if="!isSeachShow" class="child-view">
          <div class="hotSearch">
            <p>热门搜索
              <!--<a href="#/home/productDetails?type=0&id=9f60498a-a0c4-4241-bdf5-0418728a0485">点我啊</a>--></p>
            <div class="hidden_record">
              <span v-for="value in hotListDate" @click="search(value.KeyWord)" id="historyRecord">{{value.KeyWord}}</span>
            </div>
          </div>

          <div class="history" >
            <div class="hidden_sous">
              <span>历史搜索</span>
              <span @click="cleanSearchList"></span>
            </div>
            <div class="hidden_record">
              <span v-for="value in searchRecord" @click="search(value)">{{value}}</span>
            </div>
          </div>
        </div>
        
    </transition>
      
    <transition name="slide-left" class="child-view">
      <div class="searchBeforWrap" v-if="isSeachShow">
        <div class="noDateStyle" v-if="newsDataList.length == 0">
          <img src="../../assets/images/mine/nullCart@2x.png" alt="">
          <p>抱歉，未搜索到相关信息</p>
        </div>
        <ul v-if="newsDataList.length > 0" style="padding-top: 1px">
          <li v-for="newItem in newsDataList" class="texType" @click="gotTextNewDetails(newItem.NewsType,newItem.Id)">
            <div :class="newItem.NewsType == 0? 'textTitle':'moveTitle'" >
              {{newItem.Title}}
              </div>
            <div :class="newItem.NewsType == 0? 'ImgWrap':'moveImgWrap'" >
              <img v-lazy="newItem.ThumbImgURL" alt="">
              <img v-if="newItem.NewsType == 1" class="play_img" src="../../assets/images/tabBar/videoPaly@3x.png" alt="">
            </div>
            <div class="OriginateAndBrowse">
              <span>{{newItem.SourceInfo == null? '荣灿新闻网':newItem.SourceInfo}}</span>
              <img src="../../assets/images/tabBar/eyes@3x.png" alt="" class="eysIcon">
              <span>{{newItem.ReadNum + newItem.ReadBase }}</span>
            </div>
          </li>
        </ul>
      </div>
    </transition>  
    
	</div>
</template>

<script>

	import getd from '../../vuex/getData.js';
	import { Search ,MessageBox } from 'mint-ui';
	import tool from '../../util/tool.js';
	export default {
		data() {
			return {
				value:"",
        newsDataList:[],
				isShow:false,
				isSeachShow: false, //是否搜索显示
				searchRecord:[],
        hotListDate:[],
        pageIndex:1,
        pageSize: 10

			}
		},
    created(){
      let dpr = document.documentElement.getAttribute('data-dpr');
      if(dpr == 1){
        // this.$refs.historyRecord.style.fontSize = ".24rem";
        
        console.log(this.$refs.historyRecord)
      }
      //读取本地历史记录
      this.searchRecord = tool.readRecord("new_pro","");
      //获取10条热门搜索关键字
      getd.get_KeyNewWordList()
        .then((res)=>{
          //console.log('热门关键字',res);
          this.hotListDate = res.data;
        })
      //详情关键字搜索处理
      if(this.$route.query.searchName){
          this.search(this.$route.query.searchName)
      }else {}

    },
    computed:{
      //模糊查询
      searchData:function(){
        return tool.fuzzySearch(this.value,this.searchResult);
      }
    },
    mounted(){

      //在用户输入一次后和再次输入之间的时间间隔大于500ms就让第一次发送
      /* this.$watch('value',(newVal,oldVal)=>{

      }); */
    },
		components: {

		},
		methods: {
			//清除历史记录
      cleanSearchList() {
				if (this.searchRecord) {
					this.searchRecord = this.searchRecord;
					return tool.cleanSearchList("new_pro","","searchRecord",this);
				};
			},
			close(){
        if(this.isSeachShow){
            //取消重置
            this.isSeachShow = false;
            this.newsDataList = [];
            this.value = ''
        } else {
          this.$router.back(-1)
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
			search(inputText){
          this.$nextTick(()=>{
            //var input = document.getElementById("your-input-id");
            this.$refs.inputBlur.blur();
          })

         if(inputText.trim()){
           this.value = inputText;
           //搜索接口调取
           var nowNesParme = {
             Keyword: inputText,

           }
           //请求最新新闻列表
           getd.get_nowNewListDate(nowNesParme)
             .then((res)=>{
               //console.log('搜索结果',res);
               this.newsDataList = res.data.list;
               this.isSeachShow = true

             })
           if (this.value) {
             //存入本地
             tool.judgment("new_pro","",this.value);
             //读取本地历史记录
             this.searchRecord = tool.readRecord("new_pro","");
           }else {}
         } else {
             return false;
         }


			},

		},

	};
</script>

<style lang="less" type="stylesheet/css" scoped>
	@import "../../common/index.less";
  @import '../home/home.less';
  //切换动画
  .child-view {
     position: relative;
     left: 0;
     top: 0;
     width: 100%;
     height: 100%;
     transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
 .slide-left-enter, .slide-right-leave-active {
     opacity: 0;
     -webkit-transform: translate(100%, 0);
     transform: translate(100%, 0);
}
 .slide-left-leave-active, .slide-right-enter {
     opacity: 0;
     -webkit-transform: translate(-100%, 0);
     transform: translate(-100%, 0);
}
 //换动画 --结束 
 #newSous{
     background-color: #efeff4;
     min-height: 100%;
     .hotSearch{
         background-color: #ffffff;
         margin-top: 1.1891891891891893rem;
         p{
             margin-left: 0.40540540540540543rem;
             font-size: 0.40540540540540543rem;
             line-height: 0.9459459459459459rem;
        }
    }
     .searchBeforWrap{
         width: 100%;
         margin-top: 1.1891891891891893rem;
         background-color: #fff;
         .noDateStyle{
             background-color: #efeff4;
             text-align: center;
             > img{
                 width: 4.621621621621622rem;
                 height: 4.054054054054054rem;
                 margin-top: 1.3513513513513513rem;
            }
             p{
                 color: #666666;
                 margin-top: 0.5405405405405406rem;
            }
        }
         ul{
             width: 100%;
             //height: 100%;
             font-family: PingFang-SC-Medium;
             //overflow: auto;
             //padding-bottom: 1.0810810810810811rem;
             li{
                 position: relative;
                 margin: 0.40540540540540543rem auto 0;
                 padding: 1px;
                 width: 9.45945945945946rem;
                 border-bottom: 1px solid #ebe5e1;
                 min-height: 1.972972972972973rem;
                 .OriginateAndBrowse{
                     font-size: 0.32432432432432434rem;
                     line-height: 0.8108108108108109rem;
                     color: #999999;
                     .eysIcon{
                         margin-left: 0.40540540540540543rem;
                         vertical-align: middle;
                         width: 0.35135135135135137rem;
                    }
                }
            }
             .texType{
                 .textTitle{
                     margin-top: 0.13513513513513514rem;
                     width: 6.108108108108108rem;
                     font-size: 0.5135135135135135rem;
                     line-height: 0.6756756756756757rem;
                     color: #333333;
                }
                 .ImgWrap{
                     position: absolute;
                     top:0;
                     right: 0;
                     width: 2.972972972972973rem;
                     height: 1.8918918918918919rem;
                     // border: solid 1px #CCCCCC;
                     img{
                         width: 100%;
                         height: 100%;
                    }
                }
                 .moveTitle{
                     width: 9.18918918918919rem;
                     font-size: 0.5135135135135135rem;
                     line-height: 0.6756756756756757rem;
                     color: #333333;
                }
                 .moveImgWrap{
                     margin: 0.21621621621621623rem 0;
                     width: 100%;
                     height: 6.027027027027027rem;
                     //border: solid 1px #CCCCCC;
                     position:relative;
                     img{
                         width: 100%;
                         height: 100%;
                    }
                     .play_img{
                         width: 1.87733333rem;
                         height: 1.87733333rem;
                         position: absolute;
                         left: 50%;
                         top: 50%;
                         margin-top: -0.93866667rem;
                         margin-left: -0.93866667rem;
                    }
                }
            }
        }
    }
}
 #search_box {
     background: #FFF;
     padding: 0.08108108108108109rem 0.40540540540540543rem !important;
     height: 1.1891891891891893rem;
     border-bottom: 1px solid #EBE5E1;
     position: fixed;
     top: 0rem;
}
 #search_box input{
     width: 7.906667rem;
     height: 0.773333rem;
     border-radius: 0.466667rem;
     margin: 0rem;
     color: #000;
     line-height: 0.5rem;
     margin-top: 0.108108rem;
    //  width: 85%;
     background: #EFEFF4;
     border: none;
     outline: none;
}
 #search_box label{
    //  padding-top: 0.10810810810810811rem;
     left: 0.32432432432432434rem;
     height: 1.0810810810810811rem;
    //  line-height: 1.0810810810810811rem;
}
 #search_box a{
     right: .4rem;
     color: #666;
     font-size: .4rem;
     //display: block;
     width: 0.9459459459459459rem;
    //  height: 1.0810810810810811rem;
     line-height: .986667rem;
}
 .history{
     margin-top: 0.32432432432432434rem;
     background-color: #ffffff;
}
 .hidden_sous {
     height: 1.0810810810810811rem;
     line-height: 1.0810810810810811rem;
     margin-top: 0.13513513513513514rem;
     padding: 0 0.32432432432432434rem;
     .fs15;
}
 .information{
     margin-top:0rem 
}
 .hidden_sous span{
     font-size: 0.40540540540540543rem;
}
 .hidden_sous span:nth-child(2){
     width: 0.40540540540540543rem;
     height: 0.40540540540540543rem;
     float: right;
     display: block;
     background-size: 100% 100%;
     margin: 0.32432432432432434rem 0rem;
     .bg-image('../../assets/images/tabBar/deleteIcon');
}
 .hidden_record{
     overflow: hidden;
     background-color: #ffffff;
     padding: 0 0.32432432432432434rem;
}
 .hidden_record span{
     display: block;
     float: left;
     padding: 0.24324324324324326rem 0.43243243243243246rem;
     margin: 0rem 0.2702702702702703rem 0.40540540540540543rem 0rem;
     background: #EFEFF4;
     border-radius: 0.40540540540540543rem;
     font-size: .373333rem;
}
 .search-list{
     position: absolute;
     left: 0;
     top: 1.1891891891891893rem;
     width: 100%;
     min-height: 100%;
     background: white;
}
 .search-list ul li{
     font-size: 0.3783783783783784rem;
     line-height: 0.7027027027027027rem;
     padding-left: 0.40540540540540543rem;
     padding-top: 0.4594594594594595rem;
}

// .newsS{
//   width: 7.906667rem;
//   height: .773333rem;
//   border-radius: .466667rem;
//   margin-top: .133333rem !important;
// }




</style>
