<template>
	<div id="orderSchedule">
		<div class="popularity_return" id="title">
            <span  class="return" @click.stop.prevent="goBack()"></span>
			<span id="title_name">办理进度</span>
		</div>
		
		<div class="swipe-wrapper" ref="swipe_wrapper" id="swipe_wrapper">
	        <mt-swipe :auto="0" ref="swipeWrapper" :show-indicators="false">
	            <mt-swipe-item class="swip-item-1 item" v-for="(items,index) in companyArr" :key="index">
	            	<div class="scheduleTop">
	            		<div class="schedule">
		            		<div class="scheduleImg">
		            			<!-- <img src="../../assets/images/home/book.png"> -->
								<img :src="items.Image">
		            		</div>
		            		<span>{{items.ProductName}}</span>
		            		<span>{{items.TypeName}}</span>
		            		<span>X{{items.Num}}</span>
		            	</div>
	            	</div>
					<div class="companyName">{{pullCompany}}<span @click="moreCompany"></span></div>
	            	<div class="progressBar" v-if="isProcess">
	            		<div class="progressOne" v-for="(items,index) in processArr" :key="index">
	            			<ul>
	            				<li><span>{{items.month}}</span><span>{{items.hours}}</span></li>
	            				<li :class="{isCompleted:items.TaskState == 2,isProcess:items.TaskState == 1,noStart:items.TaskState == 0}">
	            					<span class="processStep"></span>
									<span :class="{noStartWord:items.TaskState == 0}" v-if="items.TaskState == 0">未开始</span>
									<span :class="{isProcessWord:items.TaskState == 1}" v-if="items.TaskState == 1">进行中</span>
									<span :class="{isCompletedWord:items.TaskState == 2}" v-if="items.TaskState == 2">已完成</span>
									<div class="proDetail">
										<span>{{items.Name}} <span v-show="items.TaskState != 2">（预估{{items.WorkHour}}）</span></span>
										<span v-if="items.TaskExpressName">{{items.TaskExpressName}}：<span @click="toLogistics" v-if="items.TaskExpressNo">{{items.TaskExpressNo}}</span></span>
									</div>
	            				</li>
	            			</ul>
	            		</div>
	            	</div>
					<!-- 没有服务进度时 -->
					<div class="noProcess" v-else>
						<!-- <img src="../../assets/images/businessQuery/bgD@2x.png" alt=""> -->
						<div></div>
						<div>服务进度暂未更新，请耐心等待~</div>
					</div>
	            </mt-swipe-item>
	        </mt-swipe>
	        <div class="button-wrapper">
		        <button class="prev-button flex-item" @click="prev"></button>
		        <button class="next-button flex-item" @click="next"></button>
		    </div>
			<!-- 公司弹窗 -->
			<div class="companyWindow" v-if="isShowWindow">
				<div class="windowWrap">
					<div class="windowTitle">请选择服务商品</div>
					<li v-for="(items,index) in nameArr" :key="index" :class="{windowName:index == isSelect,windowNameB: !(index == isSelect)}" @click.stop.prevent="selectCompany(items,index)">{{items.ProductName}}-{{items.CompanyName}}
						<span :class="{isSelectName:index == isSelect}"></span>
					</li>
					<div class="cancelBtn" @click="cancelWindow">取消</div>
				</div>
			</div>
	    </div>
	</div>
</template>

<script>
	import headerTitle from '../components/header-title';
	import { MessageBox,Toast  } from 'mint-ui';  
	import getData from '../../vuex/getData.js';
	import util from '../../util/tool';
	export default {
		data(){
			return {
				current:0,
				current1:1,
				current2:2,
				isSelect:'0',
				isShowWindow:false,
				pullCompany:"",
				isProcess:true,
				companyArr:[],
				processId:"",
				processArr:[],
				orderId:"",
				nameArr:[],
			}
		},
		mounted(){
			// console.log(window.innerHeight,document.body.clientHeight,document.body.offsetHeight,document.body.scrollHeight);
			if(this.isProcess){
				let wrapHeight = document.body.scrollHeight;
				document.getElementById("orderSchedule").style.height = wrapHeight + 44 +"px";
			}else{
				document.getElementById("orderSchedule").style.overflow = "hidden";
			}

			let params = {
				params : {
					id : this.$route.query.orderId
				}
			}
			this.getCompanyName(params);

		},
		methods:{
			goBack(){
				this.$router.go(-1);
			},
			prev() {
                this.$refs.swipeWrapper.prev();
            },
            next() {
                this.$refs.swipeWrapper.next();
			},
			selectCompany(val,i){
				this.isSelect = i;
				this.pullCompany = val.ProductName + '-' + val.CompanyName;
				this.isShowWindow = false;
				let params = {
					params : {
						id : val.ServiceStepId
					}
				}
				this.getProcess(params);
			},
			cancelWindow(){
				this.isShowWindow = false;
			},
			moreCompany(){
				this.isShowWindow = true;
			},
			toLogistics(){
				this.$router.push("/mine/toMyOrder/logistics");
			},
			getCompanyName(params){
				getData.GetCommodityList(params).then((res) => {
					console.log("getCompanyName",res)
					this.companyArr = res.data.list;
					// this.pullCompany = res.data.list[0].ProductName + '-' + res.data.list[0].CompanyName;
					// this.orderId = res.data.list[0].DetailId;
					this.companyArr.forEach((items,i) => {
						this.pullCompany = items.ProductName + '-' + items.CompanyName;
						this.orderId = items.DetailId;
					})
					console.log("getCompanyName11111111111",this.pullCompany,this.orderId)
					let params = {
						params : {
							OrderDetailId:this.orderId
						}
					}
					this.getName(params);
				})
			},
			getProcess(params){
				getData.GetServiceProcessById(params).then((res) => {
					console.log("getProcess",res)
					let arr = res.data.list;
					this.processArr = arr.reverse();
					if(this.processArr.length != 0){
						this.isProcess = true;
						for(let i = 0;i<this.processArr.length;i++){
							// 根据不同的状态来判断时间
							if(this.processArr[i].TaskState == 1){
								let currentTime1 = this.processArr[i].HandleTime.replace(/\D/gi, "");
								this.processArr[i].month = util.formatDate(currentTime1,"MM-dd");
								this.processArr[i].hours = util.formatDate(currentTime1,"hh:mm");
							}else if(this.processArr[i].TaskState == 2){
								let currentTime2 = this.processArr[i].EndTime.replace(/\D/gi, "");
								this.processArr[i].month = util.formatDate(currentTime2,"MM-dd");
								this.processArr[i].hours = util.formatDate(currentTime2,"hh:mm");
							}
						}
					}else{
						this.isProcess = false;
					}
				})
			},
			getName(params){
				getData.GetOrderDetailList(params).then(res => {
					console.log("GetOrderDetailList",res)
					this.nameArr = res.data.list;
					this.processId = res.data.list[0].ServiceStepId;
					let data = {
						params : {
							id : this.processId
						}
					}
					this.getProcess(data);
				})  
			},
			// 时间戳转换为月  日
			monthAndData(timestamp) {
				let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
				return (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-' + date.getDate() + ' '
			},
			// 时间戳转换为时分
			hourAndMinutes(timestamp) {
				let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
				return date.getHours() + ':' + date.getMinutes()
			}
		},
		components:{
		   headerTitle,
		},
	}
</script>

<style lang="less" type="stylesheet/css" scoped>
 @import "../../common/index.less";
//  @import "./order";
// 头部样式 
#title{
    background:white;
}
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
.return a{
    width: 100%;
    height: 100%;
    display: block;
}
 .swipe-wrapper{
    width: 100%;
    height: 100%;
    // height: 25rem;
    // height: calc(100% - 1.193333rem) !important;
    margin-top: 1.1891891891891893rem;
    background: #fff;
    .scheduleTop{
        height: 3.333333rem;
        width: 100%;
        background: #30a1f8;
        border: 1px solid #30a1f8;
        .schedule{
            width: 80%;
            height: 2.4324324324324325rem;
            margin:0.4rem auto;
            .scheduleImg{
                width: 2.3783783783783785rem;
                height: 2.3783783783783785rem;
                border:1px solid #FFF;
                border-radius: 0.13513513513513514rem;
                float: left;
                img{
                    width: 100%;
                    height: 100%;
                    border-radius: 0.13513513513513514rem;
               }
           }
            span{
                display: block;
                float: left;
                padding-left: 0.32432432432432434rem;
                color: #FFF;
                margin-top: 0.2702702702702703rem;
           }
            span:nth-last-child(3){
                margin-top: 0.13513513513513514rem;
                font-size: .4rem;
           }
            span:nth-last-child(2){
                font-size: .346667rem;
           }
            span:nth-last-child(1){
                width: 3.333333rem;
                margin-top: 0.7567567567567568rem;
                font-size: .373333rem;
           }
       }
   }
   .progressBar{
        height: 12.162162162162161rem;
        width: 100%;
        padding: 0.6756756756756757rem 0.5rem;
        div{
            li{
                display: inline-block;
            }
            li:nth-child(1){
                width: 1.066667rem;
                text-align: right;
                vertical-align: top;
                span:nth-child(1){
                    display: block;
                    font-size: .346667rem;
                    color: rgb(102,102,102);
                }
                span:nth-child(2){
                    display: block;
                    font-size: .32rem;
                    color: rgb(178,178,178);
                    margin-top: .133333rem;
                }
            }
            .isCompleted,.isProcess,.noStart{
                position: relative;
                width: .026667rem;
                min-height: 2.2rem;
                margin-left: .466667rem;
                vertical-align: top;
                .processStep{
                    position: absolute;
                    display: inline-block;
                    width: .5rem;
                    height: .5rem;
                    background-size: 100% 100%;
                    left: -0.239667rem;
                }
            }
            .isCompleted{
                background: rgb(0,183,39);
                .processStep{
                    .bg-image("../../assets/images/myorder/complete");
                }
            }
            .isProcess{
                // background: #FF7800;
                background: rgb(0,183,39);
                .processStep{
                    .bg-image("../../assets/images/myorder/ongoing");
                }
            }
            .noStart{
                background: rgb(216,216,216);
                .processStep{
                    .bg-image("../../assets/images/myorder/notat");
                }
            }
            li:nth-child(3){
                width: 75%;
                margin-left: .4rem;
            }
            .isCompletedWord,.isProcessWord,.noStartWord{
                position: absolute;
                width: 1.333333rem;
                margin-left: .6rem;
                font-size: .346667rem;
                display: inline-block;
                margin-top: .06rem;
            }   
            .isCompletedWord{
                color: rgb(0,183,39);
                vertical-align: top;
            }
            .isProcessWord{
                color: rgb(255,120,0);
                vertical-align: top;
            }
            .noStartWord{
                color: #000;
                vertical-align: top;
            }
        }
        div:nth-last-child(1){
            li:nth-child(2){
                background: #fff;
            }
        }
        .proDetail{
            // position: absolute;
            width: 5.333333rem;
            display: inline-block;
            // padding-left: .4rem;
            line-height: .533333rem;
            margin-top: -0.053333rem;
            margin-left: 2.1rem;
            margin-bottom: .533333rem;
            span:nth-child(1){
                color: rgb(102,102,102);
            }
            span:nth-child(2){
                color: #000;
                margin-left: .4rem;
                span{
                    color: rgb(48,161,248);
                }
            }
        }
   }
}
.button-wrapper{
    display: flex;
}
.swipe-wrapper /deep/ .mint-swipe-indicators{
    top:3.108108108108108rem;
}
.prev-button{
    border: none;
    position: absolute;
    width: 0.5945945945945946rem;
    height: 1.135135135135135rem;
    top: 2.4324324324324325rem;
    left: 0rem;
    .bg-image('../../assets/images/mine/myorder/arrowsLW');
    background: none;
    background-repeat: no-repeat;
    background-size: 0.21621621621621623rem  0.373333rem;
    background-position: 0.32432432432432434rem;
}
.next-button{
    border: none;
    position: absolute;
    width: 0.5945945945945946rem;
    height: 1.135135135135135rem;
    top: 2.4324324324324325rem;
    right: 0rem;
    .bg-image('../../assets/images/mine/myorder/arrowsR');
    background: none;
    background-repeat: no-repeat;
    background-size: 0.21621621621621623rem  0.373333rem;
    background-position: 0.05405405405405406rem;
}
b{
    font-weight: normal
}
.companyName{
    width: 9.066667rem;
    height: .8rem;
    border: 1px solid rgb(156,156,156);
    margin: .4rem auto;
    line-height: .8rem;
    padding-left: .28rem;
    border-radius: .066667rem;
    font-size: .373333rem;
    span{
        display: inline-block;
        width: .266667rem;
        height: .16rem;
        .bg-image("../../assets/images/myorder/drop-down");
        background-size: 100%;
        float: right;
        margin: .32rem .32rem 0 0;
    }
}
// 服务进度弹窗
.companyWindow{
    width: 100%;
    height: 100%;
    position:fixed;
    top:0px;
    bottom:0;
    left:0;
    right:0;
    z-index: 999;
    background-color:rgba(0, 0, 0, 0.4); 
    .windowWrap{
        width: 100%;
        // height: 7.6rem;
        background: #fff;
        position: fixed;
        bottom: 0;
        left: 0;
        .windowTitle{
            height: 1.066667rem;
            background: rgb(241,241,241);
            line-height: 1.066667rem;
            text-align: center;
            font-size: .426667rem;
        }
        .windowName,.windowNameB{
            height: 1.333333rem;
            line-height: 1.333333rem;
            font-size: .4rem;
            margin: 0 .4rem;
            border-bottom: 1px solid #ebe5e1;
        }
        .isSelectName,.noSelectName{
            display: inline-block;
            width: .373333rem;
            height: .306667rem;
            float: right;
            margin-top: .533333rem;
        }
        .isSelectName{
            .bg-image("../../assets/images/myorder/Theselected");
            background-size: 100%;
        }
        .windowName{
            color: rgb(250,40,2);
        }
        .windowNameB{
            color: #000;
        }
        .windowName::nth-last-child(1){
            border-bottom: none;
        }
        .cancelBtn{
            height: 1.2rem;
            background:rgb(214,214,214);
            line-height: 1.2rem;
            text-align: center;
            font-size: .426667rem;
        }
    }
} 
.noProcess{
    margin-top: 2rem;
    div:nth-child(1){
        width: 4.56rem;
        height: 4rem;
        .bg-image("../../assets/images/mine/nullCart");
        background-size: 100%;
        margin: 0 auto;
    }
    div:nth-child(2){
        width: 6rem;
        margin: .626667rem auto;
        font-size: .373333rem;
        color: rgb(102,102,102);
        text-align: center;
    }
}
</style>
