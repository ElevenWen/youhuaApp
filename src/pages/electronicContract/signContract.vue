<template>
	<div id="electronicContract">
		<!-- <header-title title="签署合同"></header-title> -->
		<div class="returnWrap" v-if="showOne">
            <span class="return" @click.stop.prevent="goBack()"></span>
            <span>签署合同</span>
        </div>
		<div class="returnWrap" v-else>
            <span class="return" @click.stop.prevent="goAPP()"></span>
            <span>签署合同</span>
        </div>
		<!-- @load="load($event)" -->
		<iframe :src="isShowContract"   width="100%" frameborder="0" id="iframeS"></iframe>

		<div class="contractBottom" v-if="isShowDown">
			<ul>
				<li @click="customerService" id="contactC">联系客服</li>
				<li @click="downContract" id="dowLoad">下载合同</li>
			</ul>
		</div>
	</div>
</template>

<style type="text/css" lang="less" >
	@import "../../common/index.less";
	// @media screen and (max-width: 1024px) and (min-width: 750px){
		#toolbar{
			height:11111111111px!important;
		}
	// }
    html,body{
		height: 100%;
	}
	#iframeS{
		padding-top: 1.162162162162162rem;
	}
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
	.contractBottom{
		height: 1.3513513513513513rem;
		width: 100%;
		position: fixed;
		bottom: 0;
		border-top: 1px solid #CCC;
		background: #FFF;
		li{
			width: 50%;
			float: left;
			display: block;
			text-align: center;
			line-height: 1.3513513513513513rem;
		}
		li:nth-child(1){
			.cf6;
			.fs16;
		}
		li:nth-child(2){
			.cf0;
			.fs16;
			background: #fabc7a;
		}
	}
 
</style>

<script>
import headerTitle from '../components/header-title';
import tool from '../../util/tool';
import { Indicator,MessageBox,Toast } from 'mint-ui';
import getData from "../../vuex/getData";
	export default {
		data(){
			return {
				isShowContract:'', //法大大合同模板==带签章
				showOne:true, //是否是在确认签署页面
				// showTwo:false, 
				count:0,//用来记录iframe 加载次数
				backOrder:false,
				isShowDown:false, //是否展示下载合同按钮
			}
		},
		components:{
			headerTitle,
		},
		computed:{
			arr(){
				var arrTemp = this.$store.state.myorder.productDetail;
				// console.log("arrTemp1111",this.$store.state)
				this.orderId = arrTemp.Id;
				this.isSigned = arrTemp.IsSignedElectronicContract;
				// console.log("this.orderId",this.orderId,this.isSigned)
				return arrTemp;
			},
		},
        mounted(){
			console.log(tool.loadFromLocal("orderDetail123","ALL") );
				// this.$nextTick(() => {
					console.log(  document.getElementById("iframeS").src  )
					// setTimeout(()=>{
					// document.getElementById("iframeS").src = this.isShowContract;
					
					// },1000)
					console.log("this.isShowDown00",this.showOne)
					document.getElementById("iframeS").addEventListener("load",  () =>{
						this.count ++;
						console.log("count",this.count)
						if(this.count >= 2 ){
							this.showOne = false;
							this.isShowDown = true;
							console.log("this.isShowDown11",this.showOne)
							return;
						}
						console.log("我搞完了")
						console.log("this.isShowDown22",this.showOne)
						// if(this.count == 3){
						// 	console.log("当count等于3");
						// 	console.log("this.isShowDown33",this.showOne)
						// }
						
					});
				// })
			    		
			    	 
			this.iframeLoad();

			let info = tool.loadFromLocal("orderDetail123","ALL");
			let _id = this.$route.query.id;//电子合同模板
			console.log("电子合同模板前面一部",info)
			if(_id){
				let params = {
					customerSignatureId: _id,
					orderId: info.orderDetail123.orderDetail123.orderId,
					isApp: true,
					datatype: "json",
				}
				getData.customerSigned(params).then((res) => {
					console.log("res",res);
					this.isShowContract = res.data.link;
				}).catch((err) => {
					console.log("签章错误",err)
					if(err.data.success == false){
						Toast({
							message: err.data.msg,
							duration: 500
						});
					}
				})
			}
		},
		methods:{
            iframeLoad(){  //iframe宽高
                document.getElementById("iframeS").style.height=document.body.clientHeight  +'px'; 
                document.getElementById("iframeS").style.width=document.body.clientWidth +'px'; 
            },
            //等待iframe加载结束
            load(val){
            	console.log(val)
//          	//console.log(1)
			},
			goBack(){
				// console.log("showOne",this.showOne)
				this.$router.go(-1);
			},
			goAPP(){ 
				this.backOrder = true;
				let info = {};
				info.backOrder = this.backOrder;
				tool.saveToLocal("toOrder",info);
				let localInfo =  tool.loadFromLocal("orderDetail123","ALL");
               	console.log("localInfo",localInfo.orderDetail123.orderDetail123);
               	this.orderId = localInfo.orderDetail123.orderDetail123.orderId;
				let status = localInfo.orderDetail123.orderDetail123.orderstyle;
					console.log("	this.orderId",	this.orderId);
						console.log("status",status);
                if(status == "办理中"){
                    this.$router.push({path:"/mine/toMyOrder/orderServering",query:{id:this.orderId}})
                }else if(status == "待付款"){
                    this.$router.push({path:"/mine/toMyOrder/orderWaitpay",query:{id:this.orderId}})
                }else if(status == "已取消"){
                    this.$router.push({path:"/mine/toMyOrder/orderCancel",query:{id:this.orderId}})
                }else if(status == "已完成"){
                    this.$router.push({path:"/mine/toMyOrder/orderCompleted",query:{id:this.orderId}})
                }
			},
			downContract(){
                // console.log( 'dddddddddddddddd',window.sessionStorage.getItem("fadada") )
                // console.log(tool.loadFromLocal)
                let info = tool.loadFromLocal("orderDetail123","ALL");
				// let info = localStorage.getItem("orderDetail123");
				console.log("00info",info);
				console.log(typeof(info))
				console.log("info.orderDetail123",info.orderDetail123);
				console.log("info.orderDetail123",info.orderDetail123.orderDetail123);
				console.log("info.orderDetail123",info.orderDetail123.orderDetail123.Id);
				console.log('5s 后再搞')
                    
                // let localInfo = plus.storage.getItem("orderDetail");
                // //console.log(localInfo)
                // console.log("localInfo",localInfo);
                let datas = {
                    params : {
                        id:info.orderDetail123.orderDetail123.Id,
                    }
                }
                getData.REQUEST_DATA_DETAIL(datas).then((res) => {
                    console.log("订单详情",res)
                    let _id = res.data.ContractID;
                    let params = {
                        id: _id,
                        datatype: "json",
                    }
                    getData.toSignImg(params).then((res) => {
                        console.log("res",res);
                        // if(res.data == null){
                        //     Toast({
                        //         message: '系统繁忙，请稍后再试',
                        //         duration: 2000
                        //     });
                        //     return;
                        // }
                        this.imgList2 = res.data;
                        console.log("toSignImg",res,this.imgList2);
                        this.imgList2.forEach((items) => {
                            var dtask = plus.downloader.createDownload(items.ImgUrl, {});
                            dtask.start();
                            console.log(items.ImgUrl)
                            dtask.addEventListener("statechanged", function(task, status) {
                                switch(task.state) {
                                    case 1: // 开始
                                        break;
                                    case 2: //已连接到服务器
                                        break;
                                    case 3: // 已接收到数据
                                        break;
                                    case 4: // 下载完成
                                    console.log(JSON.stringify(task));
                                        plus.gallery.save( task.filename, function () {
                                            Toast({
                                                message: '已保存到相册',
                                                duration: 1000
                                            });
                                        } );
                                        break;
                                }
                            });
                        })  
                    }).catch((err) => {
                        console.log("回调err",err)
                        if(err.success == false){
                            Toast({
                                message: err.data.msg,
                                duration: 2000
                            });
                        }
                        return
                    })
                })
            },
            customerService(){
               // window.open('https://html.ecqun.com/kf/sdk/openwin.html?corpid=7331675&cstype=rand&mode=0&cskey=SqGFFE7Glw76x6szdw&scheme=0')
				this.$router.push('/userChatSever')
			},
		},
		filters:{
			
		}
	}
</script>