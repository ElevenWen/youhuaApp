<template>
  <div id="mapAdd">
  		<div class="mapHeaderWrap">
  			<div  class="mapHeader"><i class="goBack" @click.prevent.stop="goBack"> </i><span>联系地址</span></div>
  		</div>
		<div class="searchInput">
			<div class="dingwei"></div>
			<!-- 采用手动双向绑定 -->
			<input id="searchInput" type="text" :value="searchData" v-on:input="changeFn($event)" placeholder="查找小区/大厦/学校等"   @keydown.stop.prevent.enter="sousuo(searchData)"/>
		</div>
		<div id="allmap"></div>
		<div id="l-map"></div>
		<div id="searchResultPanel" style="border:1px solid #C0C0C0;width:4.054054054054054rem ;height:auto; display:none;"></div> 
		<!--面板显示-->
		<ul  id="r-result" v-if="setMapAd.length!=0">
			<li v-for="(items,index)  in  setMapAd "  @click="changeAd(items,index)" :class="current == index? 'active':''"  >
				<!-- <span>{{current}}  === {{index}}</span> -->
				<span class="spanOne" >{{items.title}}</span>
				<span class="spanTwo">{{items.address}}</span>
			</li> 
		</ul>
		<ul  id="r-result" v-else> 
			<li  style="border:0">请输入正确的地址</li>
		</ul>

  </div>
</template>

<script>
 import BMap from 'BMap'  
 import { Toast,Actionsheet } from 'mint-ui';
export default {
	data(){
		return {
			setMapAd:[],
			searchData:"",
			current:0,
			isFirst:0,
	    }
    },
    created(){  
    	
    },
    mounted(){    
		this.initMap(this.$router.currentRoute.params.add);
		console.log('111111111111111111')
    	this.mohu('first')  ;//模糊
    	this.searchData = this.$router.currentRoute.params.add;  
    },
    methods:{
    	goBack:function (argument) {
    		// body...
    		// this.$router.go(-1);
    		this.$router.replace(  {'name': 'goCompany1'})
    	},
    	sousuo:function(data){ //点input 搜索
    		console.log( 'input 搜索' )
    		var that = this;
    		this.runAsync(data).then(function(data){
			    //console.log(data);  
			    return   that.runAsync1(data);
			},function(data){
				//console.log("哎哟喂失败了,请重新输入地址")
				that.searchData = that.$router.currentRoute.params.add   ;
				//console.log( that.searchData,that.$router.currentRoute.path  )
				that.$router.push({'name':'mapAdd','params':{'add':that.searchData}});
			}).then(function(data){ 
			   that.searchData = that.$router.currentRoute.params.add   ;
			 
				//console.log('成功111'); 
				that.$router.push({'name':'mapAdd','params':{'add':that.searchData}})  
			},function(error){ 
				that.searchData = that.$router.currentRoute.params.add   ;
				//console.log( that.searchData, that.$router.currentRoute.path )
				that.$router.push({'name':'mapAdd','params':{'add':that.searchData}})
				//console.log("失败??????",error )
					// window.location.replace( location.protocol + location.hostname +  location.pathname + "?add=" +   that.searchData)
			}) 

    	},
    	changeAd:function(items,index){//切换地址
    		// //console.log("123");
    		// //console.log(map);
    		// //console.log(items);
    		this.current  = index;
    		map.clearOverlays();  
				setTimeout(function(){
					//map.centerAndZoom({ lng: items.lng,lat:items.lat} , 19); 
					map.panTo(new BMap.Point(items.lng,items.lat));
					map.addOverlay(new BMap.Marker({ lng: items.lng,lat:items.lat} )); 
				},300) 
    	},
    	runAsync:function(argument){
    	  	 var that = this;
    	  	 // document.getElementById("r-result").innerHTML= ""; 
		     var p = new Promise(function(resolve, reject){ 
		    	window.map = new BMap.Map("allmap");
				var myGeo = new BMap.Geocoder();
				var mapzhoubian = new BMap.Map("l-map");  
				//做一些异步操作
				//1 你地址查询公司经纬度  地址解析 
				// 将地址解析结果显示在地图上,并调整地图视野
				myGeo.getPoint(argument, function(point) {  
					if(point) {  
						map.enableScrollWheelZoom(true);
						// 返回坐标 
						var data = {
							map:window.map,
							myGeo:myGeo, 
							point : point ,
							mapzhoubian:mapzhoubian ,
							add:argument
						}
						resolve(data); 
					} else {
						Toast({
						  message: '您选择的地址没有解析到结果',
						  position: 'middle',
						  duration: 5000
						});
						// 返回坐标  
						reject(point)
					}
				}, ""); 
		    });
		    return p;            
		 
    	},
    	runAsync1:function({ mapzhoubian,point,map,myGeo,add}){  
    		 var that = this;
			 var p = new Promise(function(resolve, reject){   
					var options = {
						onSearchComplete: function(results) {
						//console.log("判断百度状态",local.getStatus() )  
							if(local.getStatus()  == 2){
								that.setMapAd = [];
								// //console.log(that.setMapAd  )
								// //console.log("地址有误123,请输入精确地址"); 
								reject("地址有误123,请输入精确地址");
								return 
							}
							// 判断状态是否正确
							if(local.getStatus() == BMAP_STATUS_SUCCESS) {
								var tempS = [];
								var tempPoint = []; // 存坐标 
								for(var i = 0; i < results.getCurrentNumPois(); i++) {  
									tempS.push({
										title:results.getPoi(i).title,
										address:results.getPoi(i).address,
										lng:results.getPoi(i).point.lng,
										lat:results.getPoi(i).point.lat,
									})
									that.setMapAd = tempS;
									tempPoint.push(results.getPoi(i).point);
								} 

								 
								map.centerAndZoom(tempPoint[0], 15); 
								map.clearOverlays(); 
								map.panTo(new BMap.Point( tempPoint[0].lng, tempPoint[0].lat )); 
								map.addOverlay(new BMap.Marker({lng:tempPoint[0].lng,lat:tempPoint[0].lat})); 
 								//that.searchData = that.$router.currentRoute.query.add; 

								return resolve(results);
							}
						}
					};
					var local = new BMap.LocalSearch(mapzhoubian, options);
					local.search(add, "写字楼", '公园');  
			}); 
			return p;  
    	},
    	initMap:function (argument) {
    		var map = null ;//初始化mapAdd.vue 全局变量
			var myGeo = null;
			var mapzhoubian = null; 
			var that = this; 
			this.runAsync(argument).then(function(data){
			    // //console.log('后面可以用传过来的数据做些其他操作');  
			    return   that.runAsync1(data);
			},function(data){
				// //console.log("失败2222",data)
			}).then(function(data){ 
				////console.log('33333333')
			    that.searchData = that.$router.currentRoute.params.add   ;
				
			},function(error){ 
				////console.log("失败333",error, that.$router.currentRoute.query.add);
			}) 
				
		},
		changeFn(event){
			this.searchData = event.target.value;
			if(!this.isFirst){
				console.log('gushu',event,this.isFirst)
				//用户触发改变调用模糊模板 
				this.mohu('second');
			}
			this.isFirst++;//防止input change多次调用mohu方法
		},
    	mohu:function(flag){ 
	    		var that = this;

	    		var p = new Promise(function(resolve, reject){ 
	    			//模糊 
		    		console.log(map) ; 
					var myValue;
					if(flag != 'first'){ //第一次不调用
							var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
								{"input" : "searchInput",
								"location" : map}
							); 
							ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
								var _value = e.item.value;
								myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business; 
								//document.getElementById("r-result").innerHTML= ""; 
								console.log( document.getElementById("r-result") )
								// flag
								setPlace();
							});
					}
					
					
				
					function setPlace(){
						map.clearOverlays();    //清除地图上所有覆盖物
						function myFun ( results ){ 
							if(local.getStatus()  == 2){
								that.setMapAd = [];
								Toast({
								  message: '地址有误,请输入精确地址',
								  position: 'middle',
								  duration: 5000
								});
								 
								// that.searchData = that.$router.currentRoute.query.add; 
								reject("地址有误,请输入精确地址122212");
							}
							
							// 判断状态是否正确
							if(local.getStatus() == BMAP_STATUS_SUCCESS) {
								var tempS = [];
								var tempPoint = []; // 存坐标 
								for(var i = 0; i < results.getCurrentNumPois(); i++) {  
									tempS.push({
										title:results.getPoi(i).title,
										address:results.getPoi(i).address,
										lng:results.getPoi(i).point.lng,
										lat:results.getPoi(i).point.lat,
									}) 
								};
								that.setMapAd = tempS;
								//console.log(tempS)
								
								//console.log(that.setMapAd  )
								var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
								map.centerAndZoom(pp, 18);
								map.addOverlay(new BMap.Marker(pp));    //添加标注
								that.searchData = myValue;  
							} 
						};
						 
						var local = new BMap.LocalSearch(map, { //智能搜索
						  onSearchComplete: myFun
						});
						that.searchData = myValue; 
				        // //console.log(myValue ) 
				        // //console.log("????222")
					 	local.search(myValue, "写字楼", '公园','地铁','公交站台'); 
					} 
				    resolve()
	    		})
	    		return p;
			}
    },
    watch:{
    
    	 
    },

}

</script>

<style lang="less" type="stylesheet/css" scoped>
	@import "../../common/index.less"; 
	#mapAdd {
     height: 100%;
     width: 100%;
     background: #fff;
     overflow: hidden;
}
 .mapHeaderWrap{
     height: 7%;
     .border-1pxB(#EFEFF4);
}
 .mapHeader{
     height: 100%;
     display: table;
     text-align: center;
     .goBack{
         display: inline-block;
         height: 100%;
         width: 1.2162162162162162rem;
         .bg-image('../.././assets/images/tabBar/back');
         background-size: 28%;
         background-position:center 0.43243243243243246rem;
    }
     >span{
         font-size: 0.4864864864864865rem;
         display: table-cell;
         vertical-align: middle;
         margin: 0 auto;
         width: 86%;
    }
}
 #allmap {
     height: 42%;
     width: 100%;
}
/*#l-map {
     height: 8.108108108108109rem;
     width: 100%;
}
 */
 #r-result {
     width: 100%;
     background: #fff;
     height:43%;
     overflow-y: scroll;
     overflow-x: hidden;
     padding-bottom: 0.4864864864864865rem;
}
 .spanOne {
     display: block;
}
 .spanTwo {
     display: block;
}
 ul{
     padding: 0rem;
}
 li{
     list-style-type: none;
     padding: 0.2702702702702703rem;
     //height: 1.3513513513513513rem;
     // background: red;
     border-bottom: 1px solid #ccc;
}
 li.active span:nth-child(1){
     color: #FA2802;
}
 li span:nth-child(1){
     font-size: 0.40540540540540543rem;
}
 li span:nth-child(2){
     color:#8C8C8C;
     font-size: 0.32432432432432434rem;
}
 .searchInput{
     z-index: 999;
     width: 100%;
     height: 7%;
     background: #fff;
     padding:0 0.2702702702702703rem 0 0rem;
     padding-top: 2.2%;
}
 #searchInput{
     height: 80%;
     float: left;
     color: black;
     width: 90%;
     border-radius: 0.40540540540540543rem;
     border: none;
     background: #E7E7E7;
     padding: 0% 1% 0 7%;
}
 .dingwei{
     float: left;
     width: 10%;
     height: 100%;
     background: url("../../assets/images/tabBar/dingwei.png") no-repeat center 0.08108108108108109rem;
}
 

    
	 
</style>
