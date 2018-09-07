<template>
	<div id="identification">
		<header-title title="合同详情"  @showProps="showPropsFn"></header-title>
		<div class="identification">
			
		</div>
	</div>
</template>

<style type="text/css" lang="less" scoped>
	@import "../../common/index.less";
	@import "./electronicContract.less";
</style>

<script>
	import headerTitle from '../components/header-title';
	import tool from '../../util/tool';
	import { Indicator,MessageBox } from 'mint-ui';
</script>