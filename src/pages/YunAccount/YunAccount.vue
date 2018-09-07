<template>
    <div id="YunAccount">
        <headerTitle title="限时免费试用"></headerTitle>
        <div class="top">
            <img src="../../assets/images/YunAccount/banner.png" alt="">
        </div>
        <div class="bottom">
            <div class="ulContainer">
                <ul>
                    <li>
                        <div class="left">
                            <h3>云记账（一般纳税人）</h3>
                            <p>3分钟完成一套账</p>
                            <p>一般纳税人的优质之选</p>
                        </div>
                        <div class="right" @click="notice">
                            免费试用3天
                        </div>
                    </li>
                    <li>
                        <div class="left">
                            <h3>云记账（小规模）</h3>
                            <p>每月仅需39.9元</p>
                            <p>小规模纳税人的优惠之选</p>
                        </div>
                        <div class="right"  @click="notice">
                            免费试用3天
                        </div>
                    </li>
                    <li>
                        <div class="left">
                            <h3>云记账（云代账）</h3>
                            <p>专业会计团队</p>
                            <p>高效代账流程</p>
                            <p>您的优秀之选</p>
                        </div>
                        <div class="right"  @click="notice">
                            免费试用3天
                        </div>
                        <div class="text">
                            <span>
                                备注:
                            </span>
                            <span>
                                云记账（一般纳税人/小规模），仅限1个账套单独使用云代账，可供多个账套共同使用。
                            </span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="noticeStyle" v-if="show">
            <div class="box">
                <h3>免费试用提示</h3>
                <p class="one">请电脑浏览器输入</p>
                <p class="tw" @click="goWeb">https://www.wqbol.com/</p>
                <!-- <a href="https://www.wqbol.com/">https://www.wqbol.com/</a> -->
                <p class="comfirm" @click="comfirm">知道了</p>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
    #YunAccount{
        width: 100%;
        height: 100%;
        background: rgb(239,191,62);
        .top{
            font-size: 0;
            overflow: hidden;
            margin-top: 1.1891891891891893rem;
            img{
                width: 100%;
                height: 4.093333rem;
                display: block;
                vertical-align: top;
            }
        }
        .bottom{
            .ulContainer{
                ul{
                    li{
                        height: 4.36rem;
                        padding-top: 1.493333rem;
                        padding-left: 3.133333rem;
                        position: relative;
                        width: 100%;
                        &:nth-child(1){
                            background: url('../../assets/images/YunAccount/bg1.png') no-repeat 100% 100%;
                            background-size: cover;
                            .right{
                                position: absolute;
                                right: 0.72rem;
                                top: 1.833333rem;
                            }
                        }
                        &:nth-child(2){
                            height: 3.813333rem;
                            background: url('../../assets/images/YunAccount/bg2.png') no-repeat 100% 100%;
                            background-size: cover;
                            padding-top: 1rem;
                        }
                        &:nth-child(3){
                            height:5.253333rem;
                            background: url('../../assets/images/YunAccount/bg3.png') no-repeat 100% 100%;
                            background-size: cover;
                            padding-top: 1rem;
                            position: relative;
                            .text{
                                position: absolute;
                                left: 0.746667rem;
                                bottom: 0.64rem;
                                color: rgb(105,84,29);
                                font-size: 0.32rem;
                                span{
                                    display: inline-block;
                                    &:nth-child(2){
                                        width: 8rem;
                                        line-height: 0.453333rem;
                                        margin-left: 0.833333rem;
                                    }
                                    &:nth-child(1){
                                        position: absolute;
                                        left: 0;
                                        top: 0.04rem;
                                    }
                                }
                            }
                        }
                        .left{
                            float: left;
                            h3{
                                font-size: 0.373333rem;
                                margin-bottom: 0.22rem;
                                color: rgb(60,60,60);
                            }
                            p{
                                line-height: 0.483333rem;
                                font-size: 0.32rem;
                                color: rgb(86,86,86);
                            }
                        }
                        .right{
                            float: left;
                            width: 2.4rem;
                            height:1rem;
                            line-height: 1rem;
                            background: url('../../assets/images/YunAccount/btn.png');
                            background-size: cover;
                            color: #fff;
                            font-size: 0.32rem;
                            text-align: center;
                            position: absolute;
                            right: 0.72rem;
                            top: 1.333333rem;
                        }
                    }
                }
            }
        }
        
    }
    .noticeStyle{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.4);
        position: fixed;
        left: 0;
        top: 0;
        .box{
            text-align: center;
            width: 7.333333rem;
            height: 4.293333rem;
            padding-top: 0.533333rem;
            border-radius: 0.4rem;
            background-color: #fff;
            margin: 0 auto;
            margin-top: 50%;
            h3{
                font-size: 0.426667rem;
                color: #000;
                margin-bottom: 0.533333rem;
            }
            p{
                font-size: 0.373333rem;
                &.one{
                    color: rgb(51,51,51);
                    margin-bottom: 0.266667rem;
                }
                &.tw{
                    color: rgb(14,128,254);
                    margin-bottom: 0.6rem;
                }
                &.comfirm{
                    color: rgb(14,128,254);
                    font-size: 0.426667rem;
                    border-top: 1px solid #eee;
                    padding-top: 0.366667rem;
                }

            }
            a{
                text-decoration: none;
                color: rgb(14,128,254);
                margin-bottom: 0.6rem;
                display: inline-block;
            }
        }
    }
</style>

<script>
import { MessageBox } from 'mint-ui';
import headerTitle from '../components/header-title';
    export default{
        data(){
            return{
                show: false,
            }
        },
        methods:{
            notice(){
                if(this.getToken()){
                    this.show = true;
                }else{
                    this.$router.push({path:'/mine/login',query:{tag:'YunAccount'}})
                }
                
            },
            comfirm(){
                this.show = false;
            },
            goWeb(){
                plus.runtime.openURL('https://www.wqbol.com/')
            }
        },
        components:{
            headerTitle
        }
    }
</script>   
