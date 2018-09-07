<template>
	<div id="addCompany">
        <div class="returnWrap">
            <span class="return" @click="toOrderDetail()"></span>
            <span>我的公司</span>
        </div>
        <!-- body -->
        <div class="companyWrap">
            <li v-for="(items,index) in companyList" :key="index" class="company" @click="toC(items)">{{items.Name}}</li>
        </div>
	</div>	
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
    .companyWrap{
        margin-top: 1.466667rem;
        li:nth-child(1){
            border-top: none;
        }
    }
    .company{
        height: 1.3513513513513513rem;
        background: #fff;
        border-top: 1px solid #EBE5E1;
        padding: 0 0.35135135135135137rem;
        line-height: 1.3513513513513513rem;
        font-size: .373333rem;
    }
 
</style>

<script>
import tool from '../../util/tool';
import { Indicator,MessageBox,Toast } from 'mint-ui';
import { mapState,mapActions,mapGetters} from 'vuex';
import getData from "../../vuex/getData";
	export default {
		data(){
			return {
                companyList:[],
                id:"",
			}
		},
		mounted(){
            // 调用公司列表接口
            getData.REQUEST_COMPANYDATA_GOCOMPANY().then((res) => {
                // console.log("res",res.data);
                this.companyList = res.data;
            })
        },
        methods:{
            toOrderDetail(){
                this.$router.replace("/electronicContract/enterpriseRZ");
                // this.$router.go(-1);
            },
            toC(val){
                this.id = val.Id;
                this.$router.replace({path:"/electronicContract/enterpriseRZ",query:{id:this.id}});
            }
        }
	}
</script>
