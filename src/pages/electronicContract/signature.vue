<template>
	<div id="signature">
		<header-title :title="title" :source ='signature' @addCompaySignature="addCompaySignature()"></header-title>
		<div class="contentWrap" ref="listScroll">
      <ul>
        <!--个人签章样式-->
        <div v-if="personSign" v-for="items in signArr2">
          <!--审核通过状态-->
          <li v-if="status == 1">
            <p class="title">个人签章</p>
            <div class="desWrap">
              <span>{{name}}</span>
              <!--<img src="" alt="">-->
            </div>
            <div class="controls">
            <div class="state">
              <div id="radio" :class="isCheckP ? 'radioCheckBg':'' " @click="onCheckThis()" ></div>
              <span class="radioText">选择签章</span>
              <!--<span class="ctl" @click="modifySign">重置</span>-->
            </div>
            </div>
          </li>
          <!--审核失败状态-->
          <li v-if="status == 2">
            <p class="title">个人签章</p>
            <div class="desWrap">
              <span>{{name}}</span>
              <!--<img src="" alt="">-->
            </div>
            <div class="controls">
              <div class="state">
                <span @click="failDetail(items)">失败详情</span>
                <img src="../../assets/images/electronicContract/wenhao.png" alt="">
                <span class="ctl" @click="modifySign">修改</span>
              </div>
            </div>
            <!--审核失败状态图-->
            <img class="closeImg" src="../../assets/images/electronicContract/qz_bg_wsh.png" alt="">
          </li>
          <!--正在审核状态-->
          <li v-if="status == 0">
            <p class="title">个人签章</p>
            <div class="desWrap">
              <span>{{name}}</span>
              <!--<img src="" alt="">-->
            </div>
            <div class="controls">
              <div class="state">
                <span>正在审核</span>

              </div>
            </div>
          </li>
          <!-- <div class="foot">
            <div v-if="!isNext" @click="goSign()">下一步</div>
            <div v-else @click="toContract">返回合同详情</div>
          </div> -->
        </div>

        <!--公司签章样式-->
        <div v-if="companySign" v-for="(items,index) in signArr" :key="index">
        <!--审核通过状态-->
          <li v-if="items.ReviewState == 1">
            <p class="title">{{items.CompanyName}}</p>
            <div class="desWrap">
              <img src="../../assets/images/electronicContract/exmperCom.png" alt="">
            </div>
            <div class="controls">
              <div class="state">
                <div id="radio" :class="(checkValue == index &&isCheck )? 'radioCheckBg':'' " @click="onCheckThisC(items,index)" ></div>
                <span class="radioText" @click="onCheckThisC(items,index)">选择签章</span>
                <span class="ctl" @click="modifySign(items,index)">修改</span>
              </div>
            </div>
          </li>
          <!--审核失败状态-->
          <li v-if="items.ReviewState == 2">
            <p class="title">{{items.CompanyName}}</p>
            <div class="desWrap">
              <img src="../../assets/images/electronicContract/exmperCom.png" alt="">
            </div>
            <div class="controls">
              <div class="state">
                <span @click="failDetail(items)">失败详情</span>
                <img src="../../assets/images/electronicContract/wenhao.png" alt="">
                <span class="ctl" @click="modifySign(items,index)">修改</span>
              </div>
            </div>
            <!--审核失败状态背景图-->
            <img class="closeImg" src="../../assets/images/electronicContract/qz_bg_wsh.png" alt="">
            <!--审核失删除按钮-->
            <img  class="delete" src="../../assets/images/electronicContract/del.png" alt="" @click="deleteCompanySig(items,index) ">
          </li>
          <!--正在审核状态-->
          <li v-if="items.ReviewState == 0">{{status}}
            <p class="title"> {{items.CompanyName}}</p>
            <div class="desWrap">
              <img src="../../assets/images/electronicContract/exmperCom.png" alt="">
            </div>
            <div class="controls">
              <div class="state">
                <span>正在审核</span>
              </div>
            </div>
          </li>
          <!-- <div class="foot">
            <div v-if="isNext" @click="goSign()">下一步</div>
            <div v-else @click="toContract">返回合同详情</div>
          </div> -->
        </div>
      </ul>
		</div>
    <div class="foot">
      <div v-if="isNext" @click="goSign()" ref="gosignP">下一步</div>
      <div v-if="isNextP" style="background:gray;">下一步</div>
      <div v-if="!isNext" @click="toContract">返回合同详情</div>
    </div>

    <!--审核失败弹窗-->
    <div class="CloseDialog" v-if="isShowCloseDialog">
      <div class="content">
        <h3>失败详情</h3>
        <div class="des">
          {{failReason}}
        </div>
        <div class="true" @click="closeDes">确定</div>
        <img  class="closeImg" src="../../assets/images/electronicContract/close@2x.png" alt="" @click="closeDes">
      </div>
    </div>
	</div>
</template>

<script>
	import headerTitle from '../components/header-title';
	import {MessageBox,Toast,Indicator } from 'mint-ui';
  import BScroll from 'better-scroll';
  import getData from "../../vuex/getData";
  import tool from '../../util/tool';
	export default{
	    data(){
	        return{
	          title: '个人签章选择',
            signature:'',
            isNext: false,
            isNextP: false,
            checkValue: '',
            isCheck: false,
            isShowCloseDialog: false ,  //审核失败弹窗

            personSign:false, //个人签章
            companySign:false,//公司签章
            name:"",//签章名字
            status:'',//审核状态  0=未审核,1=已审核,2=审核不通过
            signArr:[], //公司签章列表
            signTem:"",//法大大合同页面
            signId:"", //客户签章id
            _id:'',
            failReason:"",//失败原因
            signArr2:[], //个人签章列表
            num:'',//记录当前选中下标
          }
      },
    mounted(){
      console.log(tool.loadFromLocal("orderDetail123","ALL") );
      this._initScroll();
      // if(1==1){ //根据路由跳转 个人公司签章 是否可新增
      //   this.signature = 'signature'
      // }

      if(this.$route.query.type == 'person'){
        this.personSign = true;
        this.title = "个人签章选择";
        let params = { //个人
          Type: 0,
          datatype: "json",
        }
        this.request_signlist(params,1);
        if(this.status == 1){
          this.isNext = true;
        }else {
          this.isNext = false;
          this.isNextP = true;
        }
      }else if(this.$route.query.type == 'company'){
        this.companySign = true;
        this.title = "公司签章选择";
        this.signature = 'signature'
        this.isNext = false;
      }

      // 对接客户签章列表接口
      if(this.personSign){
        let params = { //个人
          Type: 0,
          datatype: "json",
        }
        this.request_signlist(params,1);
      }else if(this.companySign){
        let params = { //企业
          Type: 1,
          datatype: "json",
        }
        this.request_signlist(params,2);
      }
    },

    methods:{
      // 对接客户签章列表接口
      request_signlist(params,type){  //type 1== 个人 2==公司
        getData.signList(params).then((res) => {
          if(res.data.length == 0){
            if(type == 1){ //个人认证页面
              this.$router.push("/electronicContract/personageRZ");
            }else if(type == 2){ //企业认证流程页面
              this.$router.push("/electronicContract/enterpriseRZ");
            }
          }else {
            if(type == 1 ){ //个人签章
              this.name = res.data[0].TrueName;
              this.status = res.data[0].ReviewState;
              this.signId = res.data[0].Id;
              this.signArr2 = res.data;
            }else if(type == 2){ //公司签章
              this.signArr = res.data;
            }
          }
        })
      },
      //滑屏初始化
      _initScroll(){
        this.$nextTick(()=>{
          let scroll =  new BScroll(this.$refs.listScroll,{
            scrollX: false,
            scrollY:true,
            click: true, //配置对象 触发点击
          })
        })

      },
      //选择
      onCheckThis(){
        this.isCheckP = !this.isCheckP;
        // this.checkValue = index;
        this.isNext = !this.isNext;
      },
      onCheckThisC(val,i){
      	if(this.num == i){
      		this.isCheck = !this.isCheck;
      		this.isNext = !this.isNext;
      	}else{
      		this.num = i;
      		this.isCheck = true;
      		this.isNext = true;
      	}
      	this.checkValue = i;
      	this.signId = val.Id;
      },
      //失败弹窗
      failDetail(val){
      	console.log(val)
        this.isShowCloseDialog = !this.isShowCloseDialog;
        this.failReason = val.ReviewFeedback;
      },
      closeDes(){
        this.isShowCloseDialog = !this.isShowCloseDialog;
      },
      //删除提示
      deleteCompanySig(val,i){
        MessageBox.confirm('确定删除该公司签章吗?').then(action => {
          this.signArr.forEach((items,index) => {
            if(i == index){
              this.signId = items.Id
            }
          })
            let params = {
              id:this.signId,
              datatype:"json",
            }
            getData.deletSign(params)
            .then((res) => {
            	this.signArr.splice(i,1);
	              Toast({
	                message: '成功删除该签章',
	                duration: 2000
	              });
            })
            .catch(err=>{
              console.log("errrrr",err);
              if(err.data.success == false){
                Indicator.close();
                Toast({
                  message: err.data.msg,
                  duration: 2000
                });
              }
            })
        })
      },
      //新增公司签章
      addCompaySignature(){
        if(this.signArr.length > 5){
          Toast({
            message: '企业不能超过5个签章喔',
            duration: 2000
          });
        }else {
          
          this.$router.push('/electronicContract/enterpriseRZ');
          
        }
          
      },
      //进入合同签署页
      goSign(){
          // console.log("0000",this.signId)
        let info = tool.loadFromLocal("orderDetail123","ALL");
        let aaa = info.orderDetail123.orderDetail123.IsSignedElectronicContract;
        console.log("aaa",aaa);
        if(!aaa){
          this.$router.push({path:'/electronicContract/signContract',query:{id:this.signId,orderId:info.orderDetail123.orderDetail123.Id}});
        }else{
          Toast({
            message: '亲，已经签署过了喔',
            duration: 2000
          });
        }
      },
      // goSignP(){
      //   console.log("0000",this.signId);
      //   this.$router.push({path:'/electronicContract/signContract',query:{id:this.signId}});
      // },
      // 修改签章
      modifySign(val,i){
        if(this.personSign){ //个人
          this.$router.push({path:"/electronicContract/personageRZ",query:{signId:this.signId}});
        }else if(this.companySign){ //公司
          this.signArr.forEach((items,index) => {
            if(i == index){
                this.signId = items.Id;
            }
          })
          // this.$router.push({params:"/electronicContract/enterpriseRZ",name:{signId:this.signId}});
            this.$router.push({name:"enterpriseRZ",params:{signId:this.signId}});
        }
      },
      // 返回合同
      toContract(){
        this.$router.push('/electronicContract/electronicContract');
      },
    },
    components:{
      headerTitle
    }


  }

</script>

<style type="text/css" lang="less" >
  // @rem:46.875rem;
  #signature{
     width: 100%;
     height: 100%;
     .contentWrap{
         width: 100%;
         height: 100%;
         padding-top: 1.1891891891891893rem;
         padding-bottom: 2.7027027027027026rem;
         font-family: PingFang-SC-Medium;
         overflow: hidden;
         ul{
             width: 100%;
             padding-bottom: 2.7027027027027026rem;
             li{
                 position: relative;
                 margin: 0.32432432432432434rem auto;
                 width: 9.18918918918919rem ;
                 height: 6.027027027027027rem ;
                 background-color: #ffffff;
                 box-shadow: 0rem 1px 0.10810810810810811rem 0rem rgba(0, 0, 0, 0.08);
                 border-radius: 0.10810810810810811rem;
                 text-align: center;
                 overflow: hidden;
                 .title{
                     line-height: 1.3513513513513513rem;
                     font-size: 0.40540540540540543rem;
                     color: #333333;
                }
                 .desWrap{
                     img{
                         width: 2.4594594594594597rem ;
                         height: 2.72972972972973rem ;
                    }
                     span{
                         font-size: 1.3513513513513513rem;
                         line-height: 2.4864864864864864rem;
                         color: #333333;
                    }
                }
                 .controls{
                     position: absolute;
                     left: 0;
                     bottom: 0;
                     width: 100%;
                     height: 1.2702702702702702rem ;
                     line-height: 1.2702702702702702rem ;
                     background-color: #ffffff;
                     box-shadow: inset 0rem 1px 0rem 0rem rgba(204, 204, 204, 0.5);
                     border-radius: 0rem 0rem 0.21621621621621623rem 0.21621621621621623rem;
                     .state{
                         position: relative;
                         text-align: left;
                         #radio{
                             display: inline-block;
                             margin-left: 0.40540540540540543rem;
                             margin-top: -0.05405405405405406rem;
                             vertical-align: middle;
                             width: 0.4864864864864865rem ;
                             height: 0.4864864864864865rem ;
                             border:1px solid #666666;
                             border-radius: 50%;
                        }
                         .radioCheckBg{
                             background: url("../../assets/images/electronicContract/ture-g.png") no-repeat;
                             background-size: 100%;
                             border: none !important;
                        }
                         .radioText{
                             margin-left: 0.13513513513513514rem;
                        }
                         span{
                             margin-left: 0.40540540540540543rem;
                        }
                         img{
                             width: 0.472972972972973rem;
                             height: 0.472972972972973rem;
                             vertical-align: middle;
                             margin-left: 0.1rem;
                        }
                         .ctl{
                             position: absolute;
                             right: 0.8108108108108109rem;
                             font-size: 0.3783783783783784rem;
                             color: #666666;
                        }
                    }
                }
                 .closeImg{
                     position: absolute;
                     left: 0;
                     top: 0;
                     width: 3.54054054054054rem;
                     height: 2.7027027027027026rem;
                }
                 .delete{
                     position: absolute;
                     right: 0.2702702702702703rem;
                     top: 0.2702702702702703rem;
                     width: 0.5648648648648649rem;
                     height: 0.5648648648648649rem;
                }
            }
             //未审核背景样式 
             .wsh_bg{
                 background: url("../../assets/images/electronicContract/qz_bg_wsh.png") no-repeat;
                 // background-position: 0 ;
                 background-size: 4.54054054054054rem 3.7027027027027026rem;
            }
        }
    }
     .CloseDialog{
         position: fixed;
         top:-1.1891891891891893rem;
         bottom: 0;
         left: 0;
         right: 0;
         z-index: 1000;
         background-color: rgba(0, 0, 0, 0.4);
         font-family: PingFang-SC-Bold;
         .content{
             position: relative;
             padding: 1px;
             margin: 70% auto;
             width: 8.216216216216218rem;
             background-color: #ffffff;
             border-radius: 0.10810810810810811rem;
             text-align: center;
             h3{
                 font-size: 0.4864864864864865rem;
                 line-height: 1.1621621621621623rem;
                 color: #333333;
            }
             .des{
                 padding: 0 2.3513513513513513rem;
                 text-align: left;
                 font-size: 0.3783783783783784rem;
                 color: #333333;
                 text-align: left;
                 line-height: 0.59rem;
            }
             .closeImg{
                 position: absolute;
                 top:0.2702702702702703rem;
                 right: 0.2702702702702703rem;
                 width: 0.2864864864864865rem;
                 height: 0.2864864864864865rem;
            }
             .true{
                 width: 2.2972972972972974rem;
                 height: 1rem;
                 line-height: 1rem;
                 margin: 0.5459459459459459rem auto;
                 background-color: #fabc7a;
                 border-radius: 0.6756756756756757rem;
                 font-size: 0.3783783783783784rem;
                 color: #ffffff;
            }
        }
    }
     //底部 
     .foot{
         position: fixed;
         left:0;
         bottom: 0;
         width: 100%;
         height: 1.5027027027027026rem;
         background-color: #fabc7a;
         & > div{
             width: 100%;
             height: 100%;
             text-align: center;
             line-height: 1.5027027027027026rem;
             font-size: 0.43243243243243246rem;
             color: #ffffff;
        }
    }
}
 

</style>
