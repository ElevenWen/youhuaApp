<style lang="less" scoped>
@import "../../common/index.less";
    .popularity_return {
        position: fixed;
        height: 1.1891891891891893rem;
        width: 100%;
        text-align: center;
        line-height: 1.162162162162162rem;
        font-size: 0.4864864864864865rem;
        color: #1F1F1F;
        border-bottom: 1px solid #EBE5E1;
        top: 0;
        right: 0;
        left: 0;
        background:white;
        z-index: 999;
    }
    .return{
        padding-left:0.4rem;
        height: 1.0810810810810811rem;
        width: 0.6486486486486487rem;
        .bg-image('../../assets/images/tabBar/nav_back');
        background-size: 100%;
        background-position:0.4rem 0.24324324324324326rem;
        position: absolute;
        left: 0;
    }
    .shareIcon{
        float: right;
        width: .666667rem;
        height: .666667rem;
        .bg-image("../../assets/images/productDetails/share");
        background-size: 100% 100%;
        position: absolute;
        top: .266667rem;
        right: .266667rem;
    }
    .contentWrap{
        margin-top: 1.173333rem;
        img{
            width: 100%;
            height: 100%;
        }
    }
</style>
<template>
    <div id="completeInfo">
        <div class="popularity_return" id="title">
            <span  class="return" @click.stop.prevent="goBack()" v-if="hasTitle"></span>
			<span id="title_name">默认合同详情</span>
            <span class="shareIcon" @click="toShare" v-if="hasTitle"></span>
		</div>
        <div class="contentWrap">
            <div v-for="(items,index) in imgsArr" :key="index" class="content">
                <img :src="items.ECImage" alt="">
            </div>
        </div>
    </div>
</template>
<script>
import getData from '../../vuex/getData.js'
import tool from '../../util/tool.js'
export default {
    data(){
        return {
            imgsArr:[],
            pdfUrl:"",
            hasTitle:true,
        }
    },
    mounted(){
        let params = {
            params : {
                Id : this.$route.query.id
            }
        }
        getData.GetDefaultContractByOrderId(params).then(res => {
            // console.log("获取默认合同详情",res)
            this.imgsArr = res.data.Imgs;
            this.pdfUrl = res.data.PdfUrl
        }) 
        // 分享之后不展示返回按钮
        if(this.$route.query.name == 'contract'){
            this.hasTitle = false;
        }
        // 不在app内时不展示分享按钮
        if(!tool.is_app){
            this.hasTitle = false;
        }
    },
    methods:{
        goBack(){
            this.$router.go(-1);
        },
        //分享
        toShare(){
            wrhShare().sendShare(
                "活动",//bussType_param, bussId_param, title_param, content_param, img_param, href_param
                "000000",
                "默认合同",
                "默认合同详情",
                'https://host.wqbol.com/shareLogo.png',
                `https://host.wqbol.net/completeInfo?id=${this.$route.query.id}&name=contract`
                // 'https://api.wqbol.net/Upload/contract/20180815/027b4c13-e509-42e3-ae18-504d66cfb37b.pdf'
            );
        },
    }
}
</script>
