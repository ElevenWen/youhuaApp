import Vue from 'vue'
import Router from 'vue-router'
import tool from '../util/tool.js'
import store from '../vuex/mine/mine.js'

import storeI from '../vuex/index.js';


import CryptoJS from 'crypto-js'
import * as types from '../vuex/mutations_types.js'
import getd from '../vuex/getData.js'


 
 
//========================================
//路由懒加载



const home = resolve => require(['pages/home/home'], resolve)
const popularity = resolve => require(['pages/home/popularity'], resolve)
const promotions = resolve => require(['pages/home/promotions'], resolve)
const productDetails = resolve => require(['pages/productDetails/productDetails'], resolve)
const discountPackage = resolve => require(['pages/productDetails/discountPackage'], resolve)
//服务2级分类
const serveClassify = resolve => require(['pages/home/serveClassify'], resolve)


const sous = resolve => require(['pages/home/sous'], resolve)
const searchList = resolve => require(['pages/home/searchList'], resolve)
const serve = resolve => require(['pages/serve/serve'], resolve)
const downloadAPP = resolve => require(['pages/home/downloadAPP'], resolve)
const scan = resolve => require(['pages/home/scan'], resolve)
const scanLogin = resolve => require(['pages/home/scanLogin'], resolve)


const activityAll = resolve => require(['pages/activity/activityAll'], resolve)
const invitePoliteness = resolve => require(['pages/activity/invitePoliteness'], resolve)
const my_invite = resolve => require(['pages/activity/inviteList'], resolve)
const newPresent = resolve => require(['pages/activity/newPresent'], resolve)


const cart = resolve => require(['pages/cart/cart'], resolve)
const comfirmOrder = resolve => require(['pages/comfirm-order/comfirm-order'], resolve)
const comfirmList = resolve => require(['pages/comfirm-order/comfirm-list'], resolve)
const payMethod = resolve => require(['pages/comfirm-order/payMethod'], resolve)
const DPayMethod = resolve => require(['pages/comfirm-order/DPayMethod'], resolve)
const transfer = resolve => require(['pages/comfirm-order/transfer'], resolve)
const transition = resolve => require(['pages/comfirm-order/transition'], resolve)
const cCoupon = resolve => require(['pages/comfirm-order/c-coupon'], resolve)
const setBill = resolve => require(['pages/comfirm-order/setBill'], resolve)
const goCompany2 = resolve => require(['pages/comfirm-order/goCompany'], resolve)
const defeated = resolve => require(['pages/comfirm-order/defeated'], resolve)
// const payMethodCheck = resolve => require(['pages/comfirm-order/payMethodCheck'], resolve)

//支付页面
const alipay = resolve => require(['pages/comfirm-order/alipay'], resolve)
const wxpay = resolve => require(['pages/comfirm-order/wxpay'], resolve)
//微信浏览器支付页面
// const webWxPay = resolve => require(['pages/comfirm-order/webWxPay'], resolve)
//支付成功
const success = resolve => require(['pages/comfirm-order/success'], resolve)
const completeInfo = resolve => require(['pages/comfirm-order/completeInfo'], resolve)

const webWxPay =  resolve => require(['pages/comfirm-order/webWxPay'], resolve)

//找人代付页面

const findFriendPay = resolve => require(['pages/comfirm-order/findFriendPay'], resolve)
const helpFriendPay = resolve => require(['pages/comfirm-order/helpFriendPay'], resolve)



const toMyOrder = resolve => require(['pages/myorder/my-order'], resolve)
const orderWaitpay = resolve => require(['pages/myorder/order-waitpay'], resolve)
const orderCancel = resolve => require(['pages/myorder/order-cancel'], resolve)
const orderServering = resolve => require(['pages/myorder/order-servering'], resolve)
const orderCompleted = resolve => require(['pages/myorder/order-completed'], resolve)
const toEvaluate = resolve => require(['pages/myorder/toEvaluate'], resolve)
//订单进度
const orderSchedule = resolve => require(['pages/myorder/orderSchedule'], resolve)
const logistics = resolve => require(['pages/myorder/logistics'], resolve)

//电子合同
const electronicContract = resolve => require(['pages/electronicContract/electronicContract'], resolve)
const identitySelect = resolve => require(['pages/electronicContract/identitySelect'], resolve)
const personageRZ = resolve => require(['pages/electronicContract/personageRZ'], resolve)
const enterpriseRZ = relolve => require(['pages/electronicContract/enterpriseRZ'], relolve)
const signature = resolve => require(['pages/electronicContract/signature'], resolve)
const signContract = resolve => require(['pages/electronicContract/signContract'], resolve)
const signedContract = resolve => require(['pages/electronicContract/signedContract'], resolve)
const addCompany = resolve => require(['pages/electronicContract/addCompany'], resolve)



const mine1 = resolve => require(['pages/mine/mine'], resolve)
const register = resolve => require(['pages/mine/register'], resolve)
const login = resolve => require(['pages/mine/login'], resolve)
const toAgreement = resolve => require(['pages/mine/agreement'], resolve)
const coupon = resolve => require(['pages/mine/coupon'], resolve)
const getCoupon = resolve => require(['pages/mine/getCoupon'], resolve)
const myInformation = resolve => require(['pages/mine/myInformation'], resolve)
const updateCompany = resolve => require(['pages/mine/updateCompany'], resolve)
const integral = resolve => require(['pages/mine/integral'], resolve)
const goCompany1 = resolve => require(['pages/mine/myCompany'], resolve)
const updateNikeName = resolve => require(['pages/mine/updateNikeName'], resolve)
const toLogin = resolve => require(['pages/mine/login'], resolve)
const toRegister = resolve => require(['pages/mine/inviteRegister'], resolve)
const shareRecommend = resolve => require(['pages/mine/shareRecommend'], resolve)
const collection = resolve => require(['pages/mine/collection'], resolve)
const feedback = resolve => require(['pages/mine/feedback'], resolve)
const settings = resolve => require(['pages/mine/settings'], resolve)
const about = resolve => require(['pages/mine/about'], resolve)
const integralDetail = resolve => require(['pages/mine/integralDetail'], resolve)
const redeem = resolve => require(['pages/mine/redeem'], resolve)
const integralRule = resolve => require(['pages/mine/integralRule'], resolve)
const bundlePhone = resolve => require(['pages/mine/bundlePhone'], resolve)
//地图
const mapAdd = resolve => require(['pages/mine/mapAdd'], resolve)
const forgetPassword = resolve => require(['pages/mine/forgetPassword'], resolve)

//收货地址
const shippingAddress = resolve => require(['pages/mine/shippingAddress'], resolve)
//新增收货地址
// const newSite = resolve => require(['pages/mine/newSite'], resolve)
// 限时优惠
const discount = resolve => require(['pages/mine/discount'], resolve)

//余额
const balance = resolve => require(['pages/mine/balance'], resolve)

//商事查询
const selectBrand = resolve => require(['pages/businessQuery/selectBrand'], resolve)
const selectCompany = resolve => require(['pages/businessQuery/selectCompany'], resolve)
const brandResult = resolve => require(['pages/businessQuery/brandResult'], resolve)
const companyResult = resolve => require(['pages/businessQuery/companyResult'], resolve)
const brandParticulars = resolve => require(['pages/businessQuery/brandParticulars'], resolve)
const selectPatent = resolve => require(['pages/businessQuery/selectPatent'], resolve)
const patentResult = resolve => require(['pages/businessQuery/patentResult'], resolve)
const patentParticulars = resolve => require(['pages/businessQuery/patentParticulars'], resolve)
const selectShareholder = resolve => require(['pages/businessQuery/selectShareholder'], resolve)
const shareholderResult = resolve => require(['pages/businessQuery/shareholderResult'], resolve)
const shareholderParticulars = resolve => require(['pages/businessQuery/shareholderParticulars'], resolve)
const companyDetails = resolve => require(['pages/businessQuery/companyDetails'], resolve)
const shareholderDeWeight = resolve => require(['pages/businessQuery/shareholderDeWeight'], resolve)

// 消息
const message = resolve => require(['pages/message/message'], resolve)
const activeMessage = resolve => require(['pages/message/activeMessage'], resolve)
const messageDetail = resolve => require(['pages/message/messageDetail'], resolve)
const serverMessage = resolve => require(['pages/message/serverMessage'], resolve)
const systemMessage = resolve => require(['pages/message/systemMessage'], resolve)

//记账报税
const report = resolve => require(['pages/report/report'], resolve)
const reportEntry = resolve => require(['pages/report/reportEntry'], resolve)
const moreNews = resolve => require(['pages/report/moreNews'], resolve)
const accountBook = resolve => require(['pages/report/accountBook'], resolve)
const newsDetail = resolve => require(['pages/report/newsDetail'], resolve)

const customerService = resolve => require(['pages/view/customerService'], resolve)

//其他公司接入我方中转站
const transferState = resolve => require(['pages/transferState/transferState'], resolve)

const transferStateTemporary = resolve => require(['pages/transferState/transferStateTemporary'], resolve)

// 店铺
const shopStore = resolve => require(['pages/shopStore/shopStore'], resolve)
const shopClassify = resolve => require(['pages/shopStore/shopClassify'], resolve)

//记账币
const accountBi = resolve => require(['pages/mine/accountBi/accountBi'], resolve)
//记账币明细
const accountBiDetail = resolve => require(['pages/mine/accountBi/accountBiDetail'], resolve)



//记账币规则
const accountBiProduce = resolve => require(['pages/mine/accountBi/accountBiProduce'], resolve)
//我的钱包
const myWallet = resolve => require(['pages/mine/myWallet/myWallet'], resolve)
const shopSearch = resolve => require(['pages/shopStore/shopSearch'], resolve)
//银联支付
const ylPay = resolve => require(['pages/comfirm-order/yinlian'], resolve)

//企业热闻
const enterpriseNewsCenter = resolve => require(['pages/enterpriseNews/enterpriseNewsCenter'], resolve)
const newSous = resolve =>require(['pages/enterpriseNews/newSous'], resolve)
const textNewDetails = resolve =>require(['pages/enterpriseNews/textNewDetails'], resolve)
const moveNewDetails = resolve =>require(['pages/enterpriseNews/moveNewDetails'], resolve)
const channelList = resolve =>require(['pages/enterpriseNews/channelList'], resolve)
const newsCommentLists = resolve =>require(['pages/enterpriseNews/newsCommentLists'], resolve)

// 微信公众号
const unionBindBefor = resolve => require(['pages/mine/unionBindBefor'], resolve)
const unionBind = resolve => require(['pages/mine/unionBind'], resolve)
const unionBindLoding = resolve => require(['pages/mine/unionBindLoding'], resolve)

//云记账活动
const YunAccount = resolve => require(['pages/YunAccount/YunAccount'], resolve)

Vue.use(Router);


// 打包要注释history模式  放服务器上打开
const router = new Router({
 mode: 'history',
  routes: [
    {
      path: '/customerService',
      name: 'customerService',
      component: customerService
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      meta: {
        keepAlive: true,
        index:0 //缓存
      },
    },
    {
      path: '/home/promotions',
      component: promotions,
      meta: {
        keepAlive: true //促销缓存
      },
    },
    {
      path: '/home/popularity',
      component: popularity,
      meta: {
        keepAlive: true //人气缓存
      },
    },
    {
      path: '/home/productDetails',
      component: productDetails,
      name: "productDetails",
      meta: {
        keepAlive: false,
        index:1 //缓存 
      },
      children: [{
        path: '/discountPackage',
        name: 'discountPackage',
        component: discountPackage
      }]
    },
    {
      path: '/home/downloadAPP',
      name: 'downloadAPP',
      component: downloadAPP
    },
    //服务2级分类
    {
      path: '/home/serveClassify',
      name: 'serveClassify',
      component: serveClassify,
      meta: {
        keepAlive: false // 不缓存
      }
    },
    {
      path: '/message',
      name: 'message',
      meta: {
        requireAuth: true, // 表示进入这个路由是需要登录的
      },
      component: message,
    },
    {
      path: '/message/activeMessage',
      name: 'activeMessage',
      component: activeMessage,
    },
    {
      path: '/electronicContract/electronicContract',
      name: 'electronicContract',
      component: electronicContract,
    },
    {
      path: '/electronicContract/identitySelect',
      name: 'identitySelect',
      component: identitySelect,
    },
    {
      path: '/electronicContract/personageRZ',
      name: 'personageRZ',
      component: personageRZ,
    },
    {//签章
      path: '/electronicContract/signature',
      name: 'signature',
      component: signature,
    },
    {
      path: '/electronicContract/enterpriseRZ',
      name: 'enterpriseRZ',
      component: enterpriseRZ,
    },
    {
      path: '/electronicContract/signContract',
      name: 'signContract',
      component: signContract,
    },
    {
      path: '/electronicContract/signedContract',
      name: 'signedContract',
      component: signedContract,
    },
    {
      path: '/electronicContract/addCompany',
      name: 'addCompany',
      component: addCompany,
    },
    {
      path: '/message/messageDetail',
      name: 'messageDetail',
      component: messageDetail,
    },
    {
      path: '/message/serverMessage',
      name: 'serverMessage',
      component: serverMessage,
    },
    {
      path: '/message/systemMessage',
      name: 'systemMessage',
      component: systemMessage,
    },
    {
      path: '/home/scan',
      name: 'scan',
      component: scan
    },
    {
      path: '/home/scanLogin',
      name: 'scanLogin',
      component: scanLogin
    },
    {
      path: "/activityAll",//活动 总页面
      name: "activityAll",
      component: activityAll
    },
    {
      path: '/activity/invitePoliteness',// 邀请赚收益
      name: 'invitePoliteness',
      component: invitePoliteness
    },
    {
      path: '/activity/inviteList',// 我的邀请记录
      name: 'my_invite',
      component: my_invite
    },
    {
      path: '/activity/newPresent',//注册有礼
      name: 'newPresent',
      component: newPresent
    },
    {
      path: '/reportEntry/report',
      name: 'report',
      component: report

    },
    {
      path: '/reportEntry/accountBook',
      name: 'accountBook',
      component: accountBook
    },
    {
      path: '/reportEntry/newsDetail',
      name: 'newsDetail',
      component: newsDetail
    },
    {
      path: '/reportEntry',
      name: 'reportEntry',
      component: reportEntry,
      meta: {
        requireAuth: true, // 表示进入这个路由是需要登录的
      },
      children: [{
        path: '/reportEntry/moreNews',
        name: 'moreNews',
        component: moreNews
      }]
    },
    {
      path: '/serve', //服务
      name: 'serve',
      component: serve,
      meta: {
        keepAlive: false
      },
    },
    {
      path: '/cart', //购物车
      name: 'cart',
      meta: {
        requireAuth: true, // 表示进入这个路由是需要登录的
      },
      component: cart
    },
    {
      path: '/cart/comfirmOrder',
      name: 'comfirmOrder',
      component: comfirmOrder,
      meta: {
        requireAuth: true, // 表示进入这个路由是需要登录的,
        keepAlive: false //不缓存
      },
      children: [{
        name: "setBill",
        path: 'setBill',
        component: setBill,
        meta: {
          keepAlive: false //不缓存
        },
      },
      {
        name: "cCoupon",
        path: 'cCoupon',
        component: cCoupon
      },
      {
        name: "comfirmList",
        path: 'comfirmList',
        component: comfirmList
      }
      ]
    },
    {
      name: "payMethod", //支付方式
      path: '/cart/comfirmOrder/payMethod',
      component: payMethod
    },
    {
      name: "DPayMethod", //代付-支付方式
      path: '/DPayMethod',
      component: DPayMethod
    },
    // {
    //   path: '/payMethodCheck',
    //   name: "payMethodCheck",
    //   component: payMethodCheck
    // },
    {
      name: "success", //代付-支付方式
      path: '/success',
      component: success
    },
    {
      name: "completeInfo", //默认电子合同
      path: '/completeInfo',
      component: completeInfo
    },
    {
      path: '/comfirmOrder/goCompany',
      name: 'goCompany2',
      component: goCompany2,
      meta: {
        keepAlive: false //不缓存
      },
    },
    {
      path: "/alipay",//支付宝支付页面
      name: "alipay",
      component: alipay,
    },
    {
      path: "/wxpay",//微信支付页面
      name: "wxpay",
      component: wxpay,
    },
    {
      path: "/webWxPay",//微信支付页面
      name: "webWxPay",
      component: webWxPay,
    },
    {
      path: "/findFriendPay",//找人代付
      name: "findFriendPay",
      component: findFriendPay,
    },
    { 
      path: "/helpFriendPay",//帮TA付款
      name: "helpFriendPay",
      component: helpFriendPay,
    },
    {
      //支付完成跳转页面
      path: '/transition',
      name: 'transition',
      component: transition,
      // meta: {
      //   keepAlive: false //不缓存
      // },
    },
    {
      //支付失败跳转页面
      path: '/defeated',
      name: 'defeated',
      component: defeated,
      // meta: {
      //   keepAlive: false //不缓存
      // },
    },
    {
      path: '/mine',
      name: 'mine1',
      component: mine1,
      meta: { keepAlive: false }
    },
    {
      path: '/mine/toMyOrder',
      name: 'toMyOrder',
      component: toMyOrder,
      meta: {
        requireAuth: true, // 表示进入这个路由是需要登录的
      },
      children: [{
        name: "orderWaitpay",
        path: "orderWaitpay",
        component: orderWaitpay
      },
      {
        name: "orderCancel",
        path: "orderCancel",
        component: orderCancel
      },
      {
        name: "orderCompleted",
        path: "orderCompleted",
        component: orderCompleted
      },
      {
        name: "orderServering",
        path: "orderServering",
        component: orderServering
      },
      ]
    },
    {
      path: '/mine/toMyOrder/toEvaluate',
      name: "toEvaluate",
      component: toEvaluate
    },
    {//订单进度
      path: '/mine/toMyOrder/orderSchedule',
      name: "orderSchedule",
      component: orderSchedule
    },
    {//物流进度
      path: '/mine/toMyOrder/logistics',
      name: "logistics",
      component: logistics
    },
    {
      path: '/mine/updateCompany',
      name: "updateCompany",
      component: updateCompany
    },
    {
      path: '/mine/register',
      name: "register",
      component: register
    },
    {
      path: '/mine/login',
      name: "login",
      component: login
    },
    {
      path: '/mine/agreement',
      name: 'agreement',
      component: toAgreement
    },
    {
      path: '/mine/forgetPassword',
      name: 'forgetPassword',
      component: forgetPassword
    },
    {
      path: '/mine/coupon',
      name: 'coupon',
      meta: {
        requireAuth: true, // 表示进入这个路由是需要登录的
      },
      component: coupon
    },
    {
      path: '/mine/mapAdd/:add',
      name: 'mapAdd',
      component: mapAdd
    },
    {
      path: '/home/sous',
      name: 'sous',
      component: sous,
      meta: {
        isAnimation: true //动画
      },

    },
    {
      path: '/home/searchList',
      name: 'searchList',
      component: searchList
    },
    {
      path: '/mine/getCoupon',
      name: 'getCoupon',
      component: getCoupon
    },
    // {
    //   path: '/mine/customerService',
    //   name: 'customerService',
    //   component: customerService
    // },
    {
      path: '/mine/myInformation',
      name: 'myInformation',
      component: myInformation,
      meta: {
        keepAlive: false,
        requireAuth: true
      }

    },
    {
      path: '/mine/feedback',
      name: 'feedback',
      component: feedback
    },
    {
      path: '/mine/integral',
      name: 'integral',
      meta: {
        requireAuth: true, // 表示进入这个路由是需要登录的
      },
      component: integral
    },
    {
      path: '/mine/integral/integralDetail',
      name: 'integralDetail',
      component: integralDetail
    },
    {
      path: '/mine/integral/redeem',
      name: 'redeem',
      component: redeem
    },
    {
      path: '/mine/integral/integralRule',
      name: 'integralRule',
      component: integralRule
    },
    {
      path: '/mine/collection',
      name: 'collection',
      meta: {
        requireAuth: true, // 表示进入这个路由是需要登录的
      },
      component: collection
    },
    {
      path: '/mine/goCompany',
      name: 'goCompany1',
      meta: {
        requireAuth: true, // 表示进入这个路由是需要登录的
      },
      component: goCompany1,
      props: true
    },
    {
      path: '/mine/updateNikeName',
      name: 'updateNikeName',
      component: updateNikeName
    },
    
    {
      path: '/mine/login',
      name: 'toLogin',
      component: toLogin
    },
    {
      path: '/mine/discount',
      name: 'discount',
      component: discount
    },
    {
      path: '/mine/balance',
      name: 'balance',
      component: balance,
      meta: {
        requireAuth: true, // 表示进入这个路由是需要登录的
      },
    },
    {
      path: '/mine/inviteRegister',
      name: 'toRegister',
      component: toRegister
    },
    {
      path: '/mine/settings',
      name: 'settings',
      component: settings
    },
    {
      path: '/mine/about',
      name: 'about',
      component: about
    },
    {
      path: '/mine/bundlePhone',
      name: 'bundlePhone',
      component: bundlePhone
    },
    //收货地址
    {
      path: '/mine/shippingAddress',
      name: 'shippingAddress',
      component: shippingAddress
    },
    //新增收货地址
    // {
    // 	path: '/mine/newSite',
    // 	name: 'newSite',
    // 	component: newSite
    // },
    {
      path: '/mine/shareRecommend',
      name: 'shareRecommend',
      meta: {
        requireAuth: true, // 表示进入这个路由是需要登录的
      },
      component: shareRecommend
    },
    {
      path: '/businessQuery/selectBrand',
      name: 'selectBrand',
      component: selectBrand
    },
    {
      path: '/businessQuery/selectCompany',
      name: 'selectCompany',
      component: selectCompany
    },
    {
      path: '/businessQuery/brandResult',
      name: 'brandResult',
      component: brandResult
    },
    {
      path: '/businessQuery/companyResult',
      name: 'companyResult',
      component: companyResult
    },
    {
      path: '/businessQuery/companyDetails',
      name: 'companyDetails',
      component: companyDetails
    },
    {
      path: '/businessQuery/brandParticulars',
      name: 'brandParticulars',
      component: brandParticulars
    },
    {
      path: '/businessQuery/selectPatent',
      name: 'selectPatent',
      component: selectPatent
    },
    {
      path: '/businessQuery/patentResult',
      name: 'patentResult',
      component: patentResult
    },
    {
      path: '/businessQuery/patentParticulars',
      name: 'patentParticulars',
      component: patentParticulars
    },
    {
      path: '/businessQuery/selectShareholder',
      name: 'selectShareholder',
      component: selectShareholder
    },
    {
      path: '/businessQuery/shareholderResult',
      name: 'shareholderResult',
      component: shareholderResult
    },
    {
      path: '/businessQuery/shareholderParticulars',
      name: 'shareholderParticulars',
      component: shareholderParticulars
    },
    {
      path: '/businessQuery/shareholderDeWeight',
      name: 'shareholderDeWeight',
      component: shareholderDeWeight
    },
    {
      path: '/transferState/transferState',
      name: 'transferState',
      component: transferState
    },
    {
      path: '/transferState/transferStateTemporary',
      name: 'transferStateTemporary',
      component: transferStateTemporary
    },
    // 店铺
    {
      path: '/home/shopStore',
      name: 'shopStore',
      component: shopStore
    },
    // 店铺分类页
    {
      path: '/home/shopClassify',
      name: 'shopClassify',
      component: shopClassify
    },
    {
      path: '/shopStore/shopSearch',
      name: 'shopSearch',
      component: shopSearch
    },
    //企业热闻
    {
      path: '/enterpriseNewsCenter',
      name: 'enterpriseNewsCenter',
      component: enterpriseNewsCenter,
      meta: {
        keepAlive: false //不缓存
      },
    },
    {
      path: '/enterpriseNewsCenter/textNewDetails',
      name: 'textNewDetails',
      component: textNewDetails
    },
    {
      path: '/enterpriseNewsCenter/moveNewDetails',
      name: 'moveNewDetails',
      component: moveNewDetails
    },
    {
      path: '/enterpriseNewsCenter/newSous',
      name: 'newSous',
      component: newSous
    },
    {
      path: '/enterpriseNewsCenter/channelList',
      name: 'newChannelList',
      component: channelList
    },
    {
      path: '/enterpriseNewsCenter/newsCommentLists',
      name: 'newsCommentLists',
      component: newsCommentLists
    },
    {
      path: '*',//匹配所有路由
      name: 'all',
      component: home,
      redirect: "/home"
    },
    {//记账币
      path: '/mine/accountBi',
      name: 'accountBi',
      component: accountBi,
      meta: {
        keepAlive: false // 不缓存
      }
    },
    {//记账币规则
      path: '/mine/accountBiProduce',
      name: 'accountBiProduce',
      component: accountBiProduce
    },
    {//记账币明细
      path: '/mine/accountBi/accountBiDetail',
      name: 'accountBiDetail',
      component: accountBiDetail
    },
    {//我的钱包
      path: '/mine/myWallet',
      name: 'myWallet',
      component: myWallet,
      meta: {
        requireAuth: true, // 表示进入这个路由是需要登录的
      },
	
    },
    {//银联支付
      path: '/ylPay',
      name: 'ylPay',
      component: ylPay
    },
    {//微信公众号 及分享页
      path: '/mine/unionBindBefor',
      name: 'unionBindBefor',
      component: unionBindBefor
    },
    {
      path: '/mine/unionBind',
      name: 'unionBind',
      component: unionBind
    },
    {
      path: '/mine/unionBindLoding',
      name: 'unionBindLoding',
      component: unionBindLoding
    },
    {
      path: '/YunAccount',
      name: 'YunAccount',
      component: YunAccount
    },

  ],


  scrollBehavior(to, from, savedPosition) { //记住滚动值 unionBindLoding
    // console.log(to)
    // console.log(from)
    // console.log(savedPosition)

    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }

  }




})

//全局守卫
router.beforeEach((to, from, next) => {
  // document.documentElement.scrollTop = document.body.scrollTop = '0px'
  next((vm) => { });
})


export default router;

// 页面刷新时，重新赋值token
if (tool.loadFromLocal('login_user_id', 'login_user_id', 'login_user_id', false).Token) {
  var token = tool.loadFromLocal('login_user_id', 'login_user_id', 'login_user_id', false).Token;
  store.commit(types.LOGIN, token);
}

//进入路由前的判断
var timeID = null;
router.beforeEach((to, from, next) => { 
   console.log('------')
   
   console.log(to)
   console.log(from)
   
  if (to.name == 'home') {
    //判断是否为安卓app内，是则有更新提示，否则无
    if (tool.is_android() && tool.is_app()) {
      //请求版本号信息
      var versionData = {
        params: {
          type: 0,//安卓
        }
      }
      var obj = {};
      getd.getVersion(versionData)
        .then((res) => {
          if (res.data.VersionNumber != version) {
            //获取版本号信息
            obj = res.data;
            obj.UpdateContent = obj.UpdateContent.replace(/\n/g, "<br/>");
            //强制更新
            if (res.data.VersionLevel == 2) {
              //强制更新
              obj.isUpdated = true;
              storeI.dispatch('reviseVerMes', obj)
              //显示弹出框
              storeI.dispatch('reviseShowCase', true)
              next();
            } else if (res.data.VersionLevel == 1 || res.data.VersionLevel == 0) {//不强制更新
              //判断中间版本是否有强制更新
              var updatedVersionData = {
                params: {
                  type: 0,//安卓
                  versionNumber: version
                }
              }
              getd.getNotUpdatedVersion(updatedVersionData)
                .then((val) => {
                  for (var i = 0; i < val.data.length; i++) {
                    if (val.data[i].VersionLevel == 2) {
                      //强制更新
                      obj.isUpdated = true;
                      storeI.dispatch('reviseVerMes', obj)

                      //显示弹出框
                      storeI.dispatch('reviseShowCase', true)
                      next();
                      break;
                    } else {
                      //不强制更新
                      obj.isUpdated = false;
                      storeI.dispatch('reviseVerMes', obj)
                      //显示弹出框
                      storeI.dispatch('reviseShowCase', true)
                      next();
                    }
                  }
                })
            }
          } else {
            next();
          }
        })
    }
  } else {
    //window.scrollTo(0, 0);
  }


  //判断是否需要登录
  if (to.meta.requireAuth) {
    if (store.state.token) {
      next();
    }
    else {
      next({
        path: '/mine/login',
        // query: {redirect: to.fullPath}
      })
    }
  }
  else {
    next();
  }
})



 

//离开路由判断
router.afterEach((to, from) => {
  if (to.name == "toMyOrder" || to.name == "selectBrand" || to.name == "goCompany1" || to.Name == "my_invite" || to.name == "shareRecommend" || to.name == "shareRecommend" || to.name == "inviteList") {
    // clearInterval(timeID)  
    //     var timeID =    setInterval(function(){
    //         var iframeObj = document.getElementById("LRdiv0");
    //         var ab = document.getElementById("LRdiv1");
    //         var sa = document.getElementById("LRdiv2");
    //         var img = document.getElementById("LRdiv3");
    //         var xq = document.getElementById("LRMINIBar");
    //         var back = document.getElementById("LR-BTN");
    //         // //console.log( "iframeObjiframeObjiframeObj",iframeObj)
    //         if(iframeObj && ab &&sa  && img && xq && back){ 
    //             iframeObj.style.display = "block";
    //             ab.style.display = "block";
    //             sa.style.display = "none";
    //             img.style.display = "none";
    //             xq.style.left = "";
    //             xq.style.top = "";
    //             back.style.background = "#00a6f1";
    //             clearInterval(timeID)
    //         }
    // },800);
  }
  // var iframeObj = document.getElementById("LRdiv0");
  // var ab = document.getElementById("LRdiv1");
  // var sa = document.getElementById("LRdiv2");
  // var img = document.getElementById("LRdiv3"); 
  // var xq = document.getElementById("LRMINIBar");
  // var back = document.getElementById("LR-BTN");
  if (to.name == "productDetails") {
    //       clearInterval(timeID)  
    //             var timeID =    setInterval(function(){
    //             var iframeObj = document.getElementById("LRdiv0");
    //             var ab = document.getElementById("LRdiv1");
    //             var sa = document.getElementById("LRdiv2");
    //             var img = document.getElementById("LRdiv3"); 
    //             var xq = document.getElementById("LRMINIBar");
    //             var back = document.getElementById("LR-BTN");

    //             var lr = document.getElementById("LR-BTN-ICON");
    //             var lrbtn = document.getElementById("LR-BTN");
    //             var lrcircle = document.getElementById("LR-CIRCLE");
    //             var lrbubble = document.getElementById("LR-BUBBLE");
    //             var floater = document.getElementById("LRfloater0")
    //             if(iframeObj && ab &&sa  && img && xq && back && lr && lrbtn && lrcircle && lrbubble && floater){ 
    //                 iframeObj.style.display = "block";
    //                 ab.style.display = "block";
    //                 sa.style.display = "none";
    //                 img.style.display = "block";
    // //              xq.style.cssText = "left:17px;top:93%;"
    //                 xq.style.left = "17px";
    //                 xq.style.top = "93%";
    //                 back.style.background = "#9e9e9e";
    //                 lr.style.cssText= "margin: -3px 0px 0 -4px; transform: rotate(14deg);background-size: 27px 26px !important; background-position: 3px 3px !important;";
    //                 lrbtn.style.cssText="border:none;width: 28px;height: 23px;border-radius: 15px 15px 15px 5px;transform: rotate(-14deg);background: transparent;";
    //                 lrcircle.style.cssText="top: 0px;font-size: 12px;line-height: 15px;background: red;left: 18px;border:none;width: 15px ;height: 15px;display: block;transform: rotate(13deg);";
    //                 lrbubble.style.cssText="display:none !important";
    //                 floater.style.display = "none";
    //                 clearInterval(timeID)
    //             }
    //         },800);
  } else if (to.name == "serve") {
    // clearInterval(timeID)  
    //       var timeID =    setInterval(function(){
    //       var iframeObj = document.getElementById("LRdiv0");
    //       var ab = document.getElementById("LRdiv1");
    //       var sa = document.getElementById("LRdiv2");
    //       var img = document.getElementById("LRdiv3");
    //       var xq = document.getElementById("LRMINIBar");
    //       var back = document.getElementById("LR-BTN");
    //       if(iframeObj && ab &&sa  && img && xq && back){ 
    //           iframeObj.style.display = "block";
    //           ab.style.display = "block";
    //           sa.style.display = "none";
    //           img.style.display = "block";
    //           xq.style.left = "";
    //           xq.style.top = "";
    //           back.style.background = "#00a6f1";
    //           clearInterval(timeID)
    //       }  
    //   },800);
  } else if (to.name == "cart" || to.name == "mine1" || to.name == "home") {
    // clearInterval(timeID)  
    //       var timeID =    setInterval(function(){
    //       var iframeObj = document.getElementById("LRdiv0");
    //       var ab = document.getElementById("LRdiv1");
    //       var sa = document.getElementById("LRdiv2");
    //       var img = document.getElementById("LRdiv3");
    //       var xq = document.getElementById("LRMINIBar");
    //       var back = document.getElementById("LR-BTN");
    //       if(iframeObj && ab &&sa  && img && xq && back){ 
    //           iframeObj.style.display = "block";
    //           ab.style.display = "block";
    //           sa.style.display = "none";
    //           img.style.display = "block";
    //           xq.style.left = "";
    //           xq.style.top = "";
    //           back.style.background = "#00a6f1";
    //           clearInterval(timeID)
    //       }
    //   },1300);  
  } else {
    // if(iframeObj && ab &&sa  && img){
    //         // clearInterval(timeID)
    //         // iframeObj.style.display = "none";
    //         // ab.style.display = "none";
    //         // sa.style.display = "none";
    //         // img.style.display = "none";
    // }else{ 
    //     // var timeID = setInterval(function(){ 
    //     //         iframeObj = document.getElementById("LRdiv0");
    //     //         ab = document.getElementById("LRdiv1");
    //     //         sa = document.getElementById("LRdiv2");
    //     //         img = document.getElementById("LRdiv3"); 
    //     //         var xq = document.getElementById("LRMINIBar");
    //     //         if(iframeObj && ab &&sa  && img){   
    //     //             iframeObj.style.display = "none";
    //     //             ab.style.display = "none";
    //     //             sa.style.display = "none";
    //     //             img.style.display = "none";
    //     //             clearInterval(timeID)
    //     //         } 
    //     // },1300);
    // }   
  }
})
