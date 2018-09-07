
<template>
		<div class="signedContract" style="heigth:100%">
			<div class="contract" style="heigth:100%;">
        <!--<div>{{seeContract}}</div>-->
				<!-- 带签章 -->
				<iframe :src="seeContract" width="100%" height="100%" frameborder="0" name="iframeS" id="iframeS" @load="toLoad"></iframe>
			</div>
            <!-- v-if="false" -->
			<!-- <div class="contractBottom">
				<ul>
					<li @click="customerService">联系客服</li>
					<li @click="downContract">下载合同</li>
				</ul>
			</div> -->
		</div>
	<!-- </div>	 -->
</template>

<style type="text/css" lang="less" scoped>
	@import "../../common/index.less";
    @import "./electronicContract.less";
    .returnWrap {
        position: fixed;
        height: 1.1891891891891893rem;
        width: 100%;
        text-align: center;
        line-height: 1.162162162162162rem;
        font-size: 0.4864864864864865rem;
        color: #1F1F1F;
        border-bottom: 1px solid #EBE5E1;
        top: 0;
        left: 0;
        background:white;
        z-index: 999;
    }
    .return{
        padding-left: 0.40540540540540543rem;
        height:100%;
        width: 1.0810810810810811rem;
        .bg-image('../../assets/images/tabBar/nav_back');
        background-size: 0.5405405405405406rem;
        background-position: 0.40540540540540543rem 0.24324324324324326rem;
        position: absolute;
        left: 0;
    }
    .contract{
        height: 100%;
    }
 
</style>

<script>
import headerTitle from '../components/header-title';
import tool from '../../util/tool';
import { Indicator,MessageBox,Toast } from 'mint-ui';
import { mapState,mapActions,mapGetters} from 'vuex';
import getData from "../../vuex/getData";
	export default {
		data(){
			return {
                seeContract:"",
                orderId:"",
                imgList2:[],
			}
		},
		components:{
			headerTitle,
		},
		computed:{

		},
		created(){

    },

		mounted(){
//            this.seeContract = this.$route.query.viewpdf_url;

            var getQuery =  tool.getQueryString('viewpdf_url');
            //console.log('w shi 参数');
            //console.log( getQuery )
            this.seeContract = getQuery;
            // console.log(plus,456656)
            // console.log(JSON.stringify(plus),456)
            // let localInfo = plus.storage.getItem("orderDetail");
            // console.log("localInfo",localInfo);
            // console.log("5555555".this.$route.query.id);
            console.log("5555555555555")
          //console.log(this.seeContract)
        },
        methods:{
            toLoad(){
                //console.log(1);
			//    console.log("电子合同模板第二部",localStorage.getItem("orderDetail123"))

            //     let info = JSON.parse(localStorage.getItem("orderDetail123"));
            //     console.log("00info",info);
            //     console.log(typeof(info))
            //     console.log("info.orderDetail123",info.orderDetail123);
            //     console.log("info.orderDetail123",info.orderDetail123.orderDetail123);
            //     console.log("info.orderDetail123",info.orderDetail123.orderDetail123.Id);
            //     console.log('5s 后再搞')

			},
        }
	}
</script>
