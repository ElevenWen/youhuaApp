<template><!--人名去重-->
	<div id="shareholderDeWeight">
		<div class="selectBrand">
			<div class="searchBox particulars">
				<span class="return" @click="goBack"><span ></span></span>
				<div>同名人员</div>
			</div>
			<div class="rank">	<!--条件查询 -->
				<ul>
					<li>不限地域</li>
					<li>不限时间</li>
				</ul>
			</div>
			<div class="paging">
				<span>搜索到<span>4</span>条同名人员数据</span>
				<span>第1/2页</span>
			</div>
			<div class="resultList">
				<div class="brandLogo">
					<img src="../../assets/images/mine/logo@3x.png">
				</div>
				<div class="shareholderList">
					<span>张三</span>
					<span>关联人员：<label>李亚云&nbsp;&nbsp;赵丽华&nbsp;&nbsp;孙启山&nbsp;&nbsp;刘松林&nbsp;&nbsp;秦书剑</label></span>
					<span>关联企业：5家</span>
				</div>
				<div class="weightlist">
					<dl> 
					    <dt><img src="../../assets/images/businessQuery/time@3x.png" /></dt> 
					    <dd class="result_dd">深圳市祥云儿计算机系统有限公司</dd> 
					    <dd class="result_dd1">
					    	<span>法人：张三</span>
					    </dd> 
					    <dd>
					    	<div class="shareholder">
							<span>高管：李四</span>
							<span>高管：张三丰</span>
							<span>高管：张三丰</span>
							<span>高管：张三丰</span>
							<span>高管：张三丰</span>
							<span>高管：张三丰</span>
						</div>
					    </dd> 
					</dl> 
				</div>
				<div class="weightlist">
					<dl> 
					    <dt><img src="../../assets/images/businessQuery/time@3x.png" /></dt> 
					    <dd class="result_dd">深圳市祥云儿计算机系统有限公司</dd> 
					    <dd class="result_dd1">
					    	<span>法人：张三</span>
					    </dd> 
					    <dd>
					    	<div class="shareholder">
							<span>高管：李四</span>
							<span>高管：张三丰</span>
							<span>高管：张三丰</span>
							<span>高管：张三丰</span>
							<span>高管：张三丰</span>
							<span>高管：张三丰</span>
						</div>
					    </dd> 
					</dl> 
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import getd from '../../vuex/getData.js';
	export default{
		methods:{
			goBack(){
				this.$router.go(-1)
			},
		},
	}
</script>

<style lang="less" type="stylesheet/css" scoped>
	@import "../../common/index.less";
	@import 'businessQuery.less';
</style>