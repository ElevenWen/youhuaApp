<template>
	<div id="sous">
		<div class="search_box" id="search_box">
				<input type="search" value="" placeholder="公司注册" class="search_in" v-model="value" id="myinput" @keyup.enter="search()" autocomplete="off"/>
				<label class="search"><img src="../../assets/images/tabBar/search@3x.png" /></label>
				<a @click="home" class="information">取消</a>
		</div>
		<div class="search-list" v-show="isShow">
			<ul>
				<li v-for="(data,index) in searchData" @click="goProduct(data.name)" :key="index">{{data.name}}</li>
			</ul>
		</div>
    <div class="hot">
			<div class="hidden_sous">
				<span>热门搜索</span>
			</div>
			<div class="hidden_record">
				<span>remen</span>
				<span>remen</span>
				<span>remen</span>
				<span>remen</span>
				<span>remen</span>
				<span>remen</span>
				<span>remen</span>
			</div>
		</div>
		<!-- <div class="history">
			<div class="hidden_sous">
				<span>搜索记录</span>
				<span @click="searchList"></span>
			</div>
			<div class="hidden_record">
				<span v-for="value in searchRecord" @click="goSearch(value)">{{value}}</span>
			</div>
		</div> -->
    <div class="history">
			<div class="hidden_sous">
				<span>搜索记录</span>
				<span @click="searchList"></span>
			</div>
			<div class="hidden_record">
        <ul>
          <li v-for="(value,index) in searchRecord" @click="goSearch(value)" :key="index">
            <div class="line">{{value}}</div>
          </li>
        </ul>
			</div>
		</div>
	</div>
</template>

<script>
import footerNav from "../../footer-nav";
//	import getd from '../../vuex/getData.js';
import { Search, MessageBox } from "mint-ui";
import tool from "../../util/tool.js";
import { getSession, removeSession } from "../../util/base";
export default {
  data() {
    return {
      value: "",
      searchResult: [],
      isShow: false,
      searchRecord: []
    };
  },
  components: {
    footerNav
  },
  methods: {
    //清除历史记录
    searchList() {
      if (this.searchRecord) {
        this.searchRecord = this.searchRecord;
        return tool.cleanSearchList("pro", "", "searchRecord", this);
      }
    },
    home() {
      if (getSession("_sous_") === 1) {
        this.$router.push("/home");
        removeSession("_sous_");
      } else {
        this.$router.go(-1);
      }
    },
    goProduct(val) {
      // 获取新值跳转
      tool.judgment("pro", "", val);
      this.$router.push({
        path: "/home/searchList",
        query: {
          searchName: val,
          classId: this.$route.query.classId,
          style: 1
        }
      });
    },
    search() {
      if (this.value) {
        //存入本地
        tool.judgment("pro", "", this.value);
        this.$router.push({
          path: "/home/searchList",
          query: { searchName: this.value, style: 1 }
        });
      }
      return false;
    },
    goSearch(val) {
      // 历史记录跳转
      this.$router.push({
        path: "/home/searchList",
        query: {
          searchName: val,
          classId: this.$route.query.classId,
          style: 1
        }
      });
    }
  },
  created() {
    //读取本地历史记录
    this.searchRecord = tool.readRecord("pro", "");
  },
  computed: {
    //模糊查询
    searchData: function() {
      return tool.fuzzySearch(this.value, this.searchResult);
    }
  },
  mounted() {
    //在用户输入一次后和再次输入之间的时间间隔大于500ms就让第一次发送
    this.$watch("value", (newVal, oldVal) => {
      tool.sendSearchName(
        newVal,
        oldVal,
        "value",
        "isShow",
        "searchResult",
        "/Product/GetIndistinctList",
        this,
        1
      );
    });
  }
};
</script>

<style lang="less" type="stylesheet/css" scoped>
@import "../../common/index.less";
@import "home.less";
#sous {
     background: #fff;
     min-height: 100%;
}
 #search_box {
     background: #fff;
     padding: 0.08108108108108109rem 0.4rem !important;
     height: 1.1891891891891893rem;
     border-bottom: 1px solid #ebe5e1;
     position: fixed;
     top: 0rem;
}
 #search_box input {
     width: 7.906667rem;
     height: 0.773333rem;
     line-height: .773333rem;
     border-radius: .466667rem;
      line-height: 0.5rem;
     font-size: 0.373333rem;
     margin: 0rem;
     color: #000;
     margin-top: 0.108108rem;
    //  width: 85%;
     background: #efeff4;
     border: none;
     outline: none;
}
 #search_box label {
     padding-top: 0.12rem;
     left: 0.32432432432432434rem;
     height: 1.0810810810810811rem;
     line-height: 1.0810810810810811rem;
}
 #search_box a {
     right: .4rem;
     color: #666;
     font-size: .4rem;
     //display: block;
     width: 0.9459459459459459rem;
    //  height: 1.0810810810810811rem;
     line-height: .986667rem;
}
.search_box .search{
  top: 0.036667rem !important;
}
 .hot {
     margin-top: 1.1891891891891893rem;
     margin-bottom: 1.346667rem;
     overflow: hidden;
}
.history{
  .hidden_sous{
    margin-bottom: 0;
      span:nth-child(2){
        .bg-image("../../assets/images/tabBar/serch-delete");
        width: 0.586667rem;
        height: 0.44rem;
    }
  }
  .hidden_record{
    padding: 0;
    .line{
      padding: 0 0.32432432rem;
    }
    ul{
      li{
        height: 1.333333rem;
        line-height: 1.333333rem;
        font-size: 0.4rem;
        color: #666;
        border-bottom: 1px solid #eee;
      }
    }
  }
}
 .hidden_sous {
     height: 1.0810810810810811rem;
     line-height: 1.0810810810810811rem;
     margin-top: 0.13513513513513514rem;
     padding: 0 0.32432432432432434rem;
     .fs15;
     text-align: left;
     margin-bottom: 0.666667rem;
}
 .information {
    font-size: 0.4rem;
    margin-top: 0rem;
}
 .hidden_sous span {
     font-size: 0.48rem;
     color: #000;
}
 .hidden_sous span:nth-child(2) {
     width: 0.4rem;
     height: 0.4rem;
     float: right;
     display: block;
     background-size: 100% 100%;
     margin: 0.32432432432432434rem 0rem;
     .bg-image("../../assets/images/tabBar/deleteIcon");
}
 .hidden_record {
     padding: 0 0.32432432432432434rem;
}
 .hidden_record span {
     display: block;
     float: left;
     padding: 0.24324324324324326rem 0.43243243243243246rem;
     margin: 0rem 0.2702702702702703rem 0.4rem 0rem;
     background: #efeff4;
     border-radius: 0.4rem;
     font-size: .373333rem;
}
 .search-list {
     position: absolute;
     left: 0;
     top: 1.1891891891891893rem;
     width: 100%;
     min-height: 100%;
     background: white;
}
 .search-list ul li {
     font-size: 0.3783783783783784rem;
     line-height: 0.7027027027027027rem;
     padding-left: 0.4rem;
     padding-top: 0.4594594594594595rem;
}
 
</style>