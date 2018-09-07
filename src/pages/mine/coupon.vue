<template>
	<div id="coupon">
		<header-title title="优惠券" source="getCoupon"></header-title>
		<mt-navbar v-model="selected" class="tabbar" >
			<mt-tab-item id="1" class="swiper" @click.native="goUnuse">未使用({{unusedData.length}})</mt-tab-item>
		  	<mt-tab-item id="0" class="swiper" @click.native="goUsed">已使用({{usedData.length}})</mt-tab-item>
		  	<mt-tab-item id="3" class="swiper" @click.native="goExpired">已过期({{expiredData.length}})</mt-tab-item>
		</mt-navbar>
		<mt-tab-container v-model="selected" style="padding:0px 0;">
		    <mt-tab-container-item id="1">
		  		<div class="unused">
		  			<div class="unused_list" v-for="(data,index) in unusedData"  :key="index">
						<div class="unused_list_left">
		  					<div>
		  						<span>¥</span>
		  						<span>{{data.Price}}</span>
		  					</div>
		  					
		  				</div>
		  				<div class="unused_list_right">
							    <div v-if="data.ProductName.indexOf('通用')!=-1">{{data.Price}} 元通用券满{{data.Money}}元可用</div> 
							    <div   v-else>{{data.Price}} 元优惠券满{{data.Money}}元可用</div> 
								
		  						 <!-- <span v-if="data.ProductName.indexOf('通用')!=-1">{{data.Price}} 元通用券满{{data.Money}}元可用</span>
		  						 <span v-else>{{data.Price}} 元优惠券满{{data.Money}}元可用</span>  -->
							     
							    <div><span>{{data.ExpiryDate}}</span></div>
								<div class="userIt" @click="toUsed(data.CouponId)"> 
									 立即使用 
								</div>
		  				</div>
						  <div style="clear:both"></div>
						
						<div class="limit">{{data.ProductName}}</div> 
		  			</div>
		  		</div>
		  		<div class="dataNull" v-if="unusedData.length==0">
		  			<span>没有券？去领券中心看看</span>
		  			<span @click="getCoupon">去看看</span>
		  		</div>
		    </mt-tab-container-item>
	    	<mt-tab-container-item id="0">
		   		<div class="already_used">
		  			<div class="unused_list" v-for="data in usedData">
		  				<div class="unused_list_left">
		  					<div>
		  						<span>¥</span>
		  						<span>{{data.Price}}</span>
		  					</div>
		  					
		  				</div>
		  				<div class="unused_list_right">
							    <div v-if="data.ProductName.indexOf('通用')!=-1">{{data.Price}} 元通用券满{{data.Money}}元可用</div> 
							    <div   v-else>{{data.Price}} 元优惠券满{{data.Money}}元可用</div> 
							    <div><span>{{data.ExpiryDate}}</span></div>
								 <!-- 已使用 -->
								<div class=" " @click="toUsed(data.CouponId)"> 
								</div>		
								<div class="useredBg"></div>		
		  				</div>
						  <div style="clear:both"></div>
						
						<div class="limit">{{data.ProductName}}</div> 
		  			</div>
		  		</div>
		  		<div class="dataNull" v-if="usedData.length==0">
		  			<!--<span>没有券？去领券中心看看</span>-->
		  			<!--<span @click="getCoupon">去看看</span>-->
		  		</div>
	  		</mt-tab-container-item>
		    <mt-tab-container-item id="3">
		    	<div class="already_expired">
		  			<div class="unused_list" v-for="data in expiredData">
		  				<div class="unused_list_left">
		  					<div>
		  						<span>¥</span>
		  						<span>{{data.Price}}</span>
		  					</div>
		  					
		  				</div>
		  				<div class="unused_list_right">
							    <div v-if="data.ProductName.indexOf('通用')!=-1">{{data.Price}} 元通用券满{{data.Money}}元可用</div> 
							    <div   v-else>{{data.Price}} 元优惠券满{{data.Money}}元可用</div> 
 
							    <div><span>{{data.ExpiryDate}}</span></div>
								<div class="userIt" @click="toUsed(data.CouponId)"> 
									 立即使用 
								</div>
		  				</div>
						  <div style="clear:both"></div>
						
						<div class="limit">{{data.ProductName}}</div> 
		  			</div>
		  		</div>
		  		<div class="dataNull" v-if="expiredData.length==0">
		  			<!--<span>没有券？去领券中心看看</span>-->
		  			<!--<span @click="getCoupon">去看看</span>-->
		  		</div>
		    </mt-tab-container-item>
		</mt-tab-container>
	</div>
</template>

<script>
import headerTitle from "../components/header-title";
import footerNav from '../../footer-nav';
import { Navbar, TabItem, Indicator } from 'mint-ui';

import getd from '../../vuex/getData.js';
export default{
    data(){
    	return {
    		selected:"1", //tab选项卡默认选中第一个，
    		unusedData:[],
    		usedData:[],
    		expiredData:[]
    	}
    },
    components:{
    	headerTitle,
    	footerNav,
	    Navbar,
	    TabItem
    },
    created(){
    	
    	var paramsOne= {
    		state:1
    	};
    	getd.couponList(paramsOne)//未使用
    	.then((res)=>{
    		this.unusedData = res.data.list;
    		Indicator.close();
    	});

    	this.goUsed();//已使用
    	this.goExpired();//已过期
    	
    },
    activated: function () { 
	    //未使用
    	var paramsOne= {
    		state:1
    	};
    	getd.couponList(paramsOne)
    	.then((res)=>{
    		this.unusedData = res.data.list;
    		Indicator.close();
    	})
	},
    methods:{
    	getCoupon(){
        	this.$router.push('/mine/getCoupon');
        },
    	toUsed(id){
    		this.$router.push({path:'/home/searchList',query:{id:id,style:0}});
    	},
    	goUnuse(){
    		//未使用
	    	var paramsOne= {
	    		state:1
	    	};
	    	getd.couponList(paramsOne)
	    	.then((res)=>{
	    		this.unusedData = res.data.list;
	    		Indicator.close();
	    	})
    	},
    	goUsed(){
    		//已使用
	    	var paramsZero= {
	    		state:0
	    	};
	    	getd.couponList(paramsZero)
	    	.then((res)=>{
	    		this.usedData = res.data.list;
	    		Indicator.close();
	    	})
    	},
    	goExpired(){
    		//已过期
	    	var paramsThird= {
	    		state:3
	    	};
	    	getd.couponList(paramsThird)
	    	.then((res)=>{
	    		this.expiredData = res.data.list;
	    		Indicator.close();
	    	})
    	}
    }
}
</script>

 <style lang="less" type="stylesheet/css" scoped>
@import "../../common/index.less";
@import './mine.less';

</style>