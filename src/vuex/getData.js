import api from './getDataPack';
import report from './report';
import upload from './businessLicense';
import idCard from './idcard';
/*
*api.fech argument
* argument[0] :method
* argument[1] :url
* argument[2] :parmas
* return response.data
*/
export default {
    //cart.vue 购物车数据
    REQUEST_DATA_CART() {
        return api.fetch('get', '/ShoppingCart/List');
    },

    //cart.vue  增加数据
    CREATE_DB_CART() {
        return api.fetch('get', '/ShoppingCart/List')
    },
    //cart.vue  增加数据
    ADD_DB_CART(data) {
        return api.fetch('get', '/ShoppingCart/UpdateList', data);
    },
    //cart.vue  减少数据
    DES_DB_CART(data) {
        return api.fetch('get', '/ShoppingCart/UpdateList', data);
    },
    // cart.vue  更新选中状态
    UPDATE_CUR_SHOP_STATUS_CART(data) {
        return api.fetch('get', '/ShoppingCart/UpdateChecked', data);
    },
    //cart.vue  删除购物车数据
    DELETE_DB_CART(data) {
        return api.fetch('get', '/ShoppingCart/Remove', data);
    },
    //comfirmOrder 最近使用支付方式
    PAYMETHODS_GOCOMPANY(data) {
        return api.fetch('post', '/Customer/GetPayTypeList', data);
    },
    // comfirmOrder 最近使用 发票列表
    RECENTLY_BILLDATA(data) {
        //params == 我从vuex 中传过来的动态参数 
        return api.fetch('get', '/Customer/CusInvoiceByType', data);
    },
    //comfirmOrder  新增发票/提交发票
    ADDOREDITE_BILLDATA_COMFIRMORDER(data) {
        //不可以改为post!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        return api.fetch('get', '/Customer/CusInvoiceSave', data);
        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    },
    //comfirmOrder  优惠券
    CCOUPON_COMFIRMORDER(data) {
        //params == 我从vuex 中传过来的动态参数
        return api.fetch('get', '/Customer/GetCusUsedCouponList', data);
    },
    //comfirmOrder  立即下单== 购物车
    ORDBTNPAY_COMFIRMORDER(data) {
        //console.log(data)
        //params == 我从vuex 中传过来的动态参数
        return api.fetch('get', '/Order/CreatedOrEdit', data);
    },

    //comfirmOrder  立即下单 从商品详情页面 立即购买
    ORDBTNPAY_IMIDIATEFN_COMFIRMORDER(data) {
        //params == 我从vuex 中传过来的动态参数
        return api.fetch('get', '/Order/ImmediatelyOrder', data);
    },
    //comfirmOrder  页面 余额查询
    ORDBTNPAY_REQUEST_BALANCE(data) {
        //params == 我从vuex 中传过来的动态参数
        return api.fetch('get', '/Payment/GetCustomerBalance', data);
    },
    LEAVE_MESSAGE(data){
        return api.fetch('post', '/Order/AddOrderMessage', data);        
    },
    // goCompany.vue选择公司列表
    REQUEST_COMPANYDATA_GOCOMPANY(data) {
        return api.fetch('get', '/Customer/CusCompanyList', data);
    },

    //通过公司Id获取详情
    getCusCompanyById(data) {
        return api.fetch('post', '/Customer/GetCusCompanyById', data);
    },

    // myorder  我的订单 
    REQUEST_DATA_MYORDER(params) {
        //params == 我从vuex 中传过来的动态参数
        return api.fetch('post', '/Order/GetList', params);
    },
    
    // myorder  我的订单 不用登陆
    REQUEST_DATA_MYORDER_ONLOGIN(params) {
        //params == 我从vuex 中传过来的动态参数
        // console.log('ddddddddddddddddddddd' ,params)

        return api.fetch('post', '/Order/GetOrderInfoByOrderId', params);
    },
        // myorder  我的订单 不用登陆  判断支付状态
    ISPAYOK(params) {
        //params == 我从vuex 中传过来的动态参数
        console.log('ddddddddddddddddddddd' ,params)

        return api.fetch('post', '/Payment/GetOrderPayInfo', params);
    },
   


    // myorder——order-waitPay——取消订单
    REQUEST_DATA_CANCEL(params) {
        return api.fetch('get', '/Order/CancelOrder', params);
    },

    // myorder 删除订单
    REQUEST_DATA_DELETE(params) {
        return api.fetch('get', '/Order/Remove', params);
    },

    // myorder——订单商品详情页
    REQUEST_DATA_DETAIL(params) {
        return api.fetch('get', '/Order/GetOrderInfoById', params);
    },

    // myorder——新增订单（跳转到确认订单页面）
    // REQUEST_DATA_NEWORDER(params){
    //     return api.fetch('get','/Order/CreatedOrEdit',params)
    // },

    // order-waitpay 订单待支付页面支付进度
    REQUEST_DATA_PAY(params) {
        return api.fetch('get', '/Order/GetOrderStatusById', params);
    },

    // toEvaluate 去评价
    REQUEST_DATA_EVALUATE(params) {
        return api.fetch('get', '/ProReview/CreateOrEdit', params);
    },

    // my-order 再次购买
    REQUEST_DATA_BUYAGAIN(params) {
        return api.fetch('get', '/Order/GetOrderListById', params);
    },

    // order-servering 获取当前订单服务人员
    REQUEST_DATA_TELPHONE(params) {
        return api.fetch('get', '/Order/GetContactor', params);
    },


    //注册页面验证
    getRegister(params) {
        return api.fetch('post', '/Customer/Register', params);
    },

    //登录验证
    getLogin(params) {
        return api.fetch('post', '/Customer/Login', params);
    },

    //首页分类 
    getClassify(params) {
        return api.fetch("get", "/navi/Getlist", params);
    },

    // 首页banner图片数据
    getHomeBanner(params) {
        return api.fetch("get", "/Advertment/List", params);
    },

    //首页套餐数据
    getMealData(params) {
        return api.fetch('get', '/ProPackage/ProPackageList', params);
    },
    //首页限时抢购
    SalesList(params) {
        return api.fetch('get', '/SalesPromotion/SalesList', params);
    },
    //首页推荐数据
    getRecommendData() {
        return api.fetch('get', '/Product/GetRecommendList');
    },
    //首页活动推荐数据
    getActivityData() {
        return api.fetch("get", '/Product/GetActivityList');
    },
    //活动推荐数据全部
    getAllActivityData() {
        return api.fetch("get", '/Product/GetActivityAllList');
    },
    //请求人气专场数据
    getPopulariData(params) {
        return api.fetch("get", '/Product/GetAllList', params);
    },

    //首页商品详情
    getDetailData(path, params) {
        return api.fetch("post", path, params);
    },

    //请求评价信息
    getProReview(params) {
        return api.fetch("post", '/ProReview/List', params);
    },
    //评论总星级
    getStar(params) {
        return api.fetch("post", '/ProReview/GetStarById', params);
    },
    //加入购物车
    createdShoppingCart(params) {
        return api.fetch("post", '/ShoppingCart/CreatedOrEdit', params);
    },

    //获取手机验证码
    getVerification(params) {
        return api.fetch('post', '/Customer/SendMobileVerifyCode', params);
    },

    //优惠券列表
    couponList(params) {
        return api.fetch('post', '/Customer/GetCusCouponList', params);
    },

    //使用优惠卷
    useCusCoupon(params) {
        return api.fetch('post', '/Customer/UsedCusCoupon', params);
    },

    //领卷中心所有优惠卷
    getAllCouponList() {
        return api.fetch('get', '/Customer/GetAllCouponList');
    },

    //用户领卷
    usedCusCoupon(params) {
        return api.fetch('post', '/Customer/ReceiveCoupon', params);
    },

    //根据品类获取对应的优惠券列表
    getCouponListByClassId(params) {
        return api.fetch('post', '/Customer/GetCouponListByClassID', params);
    },

    // 服务  商品分类列表获取数据
    SERVERLIST() {
        return api.fetch("get", "/Product/GetClassList");
    },

    // 服务  商品服务列表获取数据
    SERVER_PRODUCT_LIST(params) {
        return api.fetch("get", "/Product/GetServiceList", params);
    },

    // 服务  根据分类获取产品列表请求数据  根据服务获取产品列表信息
    SERVER_PRODUCT_INFOR(params) {
        return api.fetch("get", "/Product/ProductListGetByClass", params);
    },

    //服务  二级分类列表及热销产品
    SERVER_PRODUCT_HOT(params) {
        return api.fetch("get", "/Product/GetClsAndHotProList", params);
    },

    //服务 三级列表 
    getProductThree(params) {
        return api.fetch("get", "/Product/GetProductList", params)
    },
    //根据服务获取产品列表信息
    getProductList(params) {
        return api.fetch('post', '/Customer/GetProductListByCouponType', params);
    },
    //获取当前用户可以使用的优惠券
    GetCusUsedCouponList(params) {
        return api.fetch('get', '/Customer/GetCusUsedCouponList', params);
    },
    //获取当前用户积分
    getMyScore(params) {
        return api.fetch('post', '/Customer/GetMyScore', params);
    },
    //积分获取记录详情
    getMyScoreDetails(params) {
        return api.fetch('post', '/Customer/GetMyScoreDetails', params);
    },
    //获取积分兑换商品列表
    getScoreList(params) {
        return api.fetch('post', '/ScoreMall/List', params);
    },
    //积分兑换商品
    getScoreMall(params) {
        return api.fetch('get', '/ScoreMall/Exchange', params);
    },
    //获取当前客户信息
    getCustomerInfo(params) {
        return api.fetch('get', '/Customer/GetCustomerInfo', params);
    },
    //编辑客户信息
    reviseCustomerInfo(params) {
        return api.fetch('post', '/Customer/EditCustomerInfo', params);
    },
    //获取公司详情
    getCusInvoiceById(params) {
        return api.fetch('post', '/Customer/GetCusInvoiceById', params);
    },
    //新增公司
    cusCompanySave(params) {
        return api.fetch('post', '/Customer/CusCompanySave', params);
    },
    //邀请有礼-我的奖励汇总
    getMyRebateSummary(params) {
        return api.fetch('get', '/Activity/GetMyRebateSummary', params);
    },
    //邀请有礼-获取奖励排名
    getRebateRank() {
        return api.fetch('get', '/Activity/GetRebateRank');
    },
    //邀请有礼-获取奖励排名
    getMyRebateList() {
        return api.fetch('get', '/Activity/GetMyInvitationList');
    },
    //获取最新注册用户列表
    getLatestRegisterList() {
        return api.fetch('get', '/Activity/GetLatestRegisterList');
    },
    //获取版本号控制信息
    getVersion(params) {
        return api.fetch('get', '/System/GetNewVersion', params);
    },
    //获取未更新版本
    getNotUpdatedVersion(params) {
        return api.fetch('get', '/System/GetNotUpdatedVersion', params);
    },
    //获取商品详情
    getOrderListByProductId(params) {
        return api.fetch('post', '/Order/GetOrderListByProductId', params);
    },
    //获取产品类型
    getProductTypeByProductId(params) {
        return api.fetch('post', '/Product/GetProductTypeByProductId', params);
    },
    //获取类型对应的价格变动
    getProductPriceByProductId(params) {
        return api.fetch('post', '/Product/GetProductPriceByProductIdd', params);
    },
    //根据公司编号查询公司对应的产品信息
    getCompanyOrderList(params) {
        return api.fetch('post', '/Customer/GetCompanyOrderList', params);
    },
    //获取收藏列表
    getCollection() {
        return api.fetch('get', '/CusHouse/List');
    },
    //新增、修改收藏
    createdCollection(params) {
        return api.fetch('post', '/CusHouse/CreatedOrEdit', params);
    },
    //购物车收藏
    createdOrEditForShoppingCart(params) {
        return api.fetch('post', '/CusHouse/CreatedOrEditForShoppingCart', params);
    },
    //移除收藏
    removeCollection(params) {
        return api.fetch('post', '/CusHouse/Remove', params);
    },
    //搜索
    searchList(params) {
        return api.fetch('get', '/Product/GetIndistinctList', params);
    },
    searchListAll(params){
        return api.fetch('get', '/product/ProductListGetByClassName', params);
    },
    
    //搜索接口调用
    commonSearch(method, url, params) {
        return api.fetch(method, url, params);
    },
    //意见反馈
    feedback(params) {
        return api.fetch('post', '/ComplaintAndAdvice/CreateComplaintAndAdvice', params)
    },
    //收货地址列表
    getCusDeliveryAddressList() {
        return api.fetch('get', '/CusDeliveryAddress/List');
    },
    //修改默认收货地址
    setDefault(params) {
        return api.fetch('post', '/CusDeliveryAddress/SetDefault', params);
    },
    //删除收货地址
    delectShippingAddress(params) {
        return api.fetch('get', '/CusDeliveryAddress/Remove', params);
    },
    //新增、修改收货地址
    addShippingAddress(params) {
        return api.fetch('post', '/CusDeliveryAddress/CreatedOrEdit', params);
    },
    //获取单个收货地址
    getSingAddress(params) {
        return api.fetch('post', '/CusDeliveryAddress/Get', params);
    },
    //获取订单收货地址
    getOrderAddress(params) {
        return api.fetch('post', '/Order/GetDeliveryAddressById', params);
    },
    // goCompany 查询后台可同步银行
    REQUESTBANK_GOCOMPANY_TEST(method) {
        //console.log(method,params) 
        var params = {

            params: {
                categoryid: "1FBC9847-07B6-4D7B-9A4A-DFDE4F32E6E7",
                code: 'Yh001'
            }
        }
        //categoryid  1FBC9847-07B6-4D7B-9A4A-DFDE4F32E6E7   ==>测试环境
        return api.fetch(method, "/System/GetDictionaryList", params);
    },
    // goCompany 查询后台可同步银行
    REQUESTBANK_GOCOMPANY(method) {
        ////console.log(method,params,"我是正式的") 
        var params = {
            params: {
                categoryid: "E6099808-E670-4FD0-B493-0048171E0574",
                code: 'Yh001'
            }
        }
        //categoryid :后台要求传递固定参数 E6099808-E670-4FD0-B493-0048171E0574  ==>正式环境 
        return api.fetch(method, "/System/GetDictionaryList", params);
    },
    // 商事查询——查公司
    queryCompany(method, params) {
        return api.fetch(method, "/Enterprise/GetTianYanChaApiData", params);
    },
    //忘记密码
    FORGETPASSWORD_FORGETPASSWORD(params) {
        return api.fetch('post', "/Customer/ForgetPwd", params);
    },
    // 消息 系统消息
    SYSTEM_MSG() {
        return api.fetch("get", "/NoticeMessage/SysMessage");
    },

    // 系统信息修改微已读状态
    setSystemType(params) {
        return api.fetch("get", "/NoticeMessage/GetMessage", params);
    },

    // 清空已读消息
    removeSystem() {
        return api.fetch("get", "/NoticeMessage/MessageRemove");
    },

    //APP第三方登录
    openPlatform(params) {
        return api.fetch('post', "/OpenPlatform/AppLogin", params);
    },

    //APP绑定第三方平台
    bindApp(params) {
        return api.fetch('post', "/OpenPlatform/AppBind", params);
    },


    // 消息 服务通知消息
    SERVER_MSG() {
        return api.fetch("get", "/NoticeMessage/ServiceMessage");
    },

    // 消息 活动消息
    ACTIVE_MSG() {
        return api.fetch("get", "/NoticeMessage/ActivityMessage");
    },


    upNetImage(params) {
        return api.fetch('post', "/Upload/Save", params);
    },

    //获取java后台接口(资产负债表)
    getReport(params) {
        return report.fetch("get", "/wqb/BalanceSheet/balanceSheetApp", params);
    },
    //获取java后台接口(利润表)
    getIncome(params) {
        return report.fetch("get", "/wqb/IncomeStatement/incomeStatrmentAPP", params);
    },
    //获取java后台接口(总账)
    getLedger(params) {
        return report.fetch("get", "/wqb/ledger/queryLedgerAccountAPP", params);
    },
    //获取java后台接口(明细账)
    getDetailAccount(params) {
        return report.fetch("get", "/wqb/detailAccount/queryDetailAccountAPP", params);
    },
    //获取java后台接口(科目余额表)
    getBalance(params) {
        return report.fetch("get", "/wqb/sbubalance/querySbujectBalanceAPP", params);
    },
    //获取java后台接口(app登录财税后台接口)
    getLoginMes(params) {
        return report.fetch("get", "/wqb/systemAPP/loginAPP", params);
    },
    //获取java后台接口(查询公司接口)
    searchCom(params) {
        return report.fetch("get", "/wqb/systemAPP/queryComName", params);
    },
    //获取java后台接口(选择公司)
    choiceCompany(params) {
        return report.fetch("get", "/wqb/systemAPP/choiceCompany", params);
    },
    // 三级联动省份
    provice() {
        return api.fetch("get", "/System/GetProinveList");
    },
    //三级联动市区
    cityArea(params) {
        return api.fetch("get", "/System/GetAreaListById", params);
    },
    //三级联动城市
    getAreaList() {
        return api.fetch('get', '/System/GetAllCityList');
    },
    all(params) {
        //console.log('参数' ,params )
        return api.fetch("all", '', params);
    },
    // 商品管理-获取产品列表
    getHomeServeClassify(params) {
        return api.fetch('get', '/Product/GetProductList', params);
    },

    // 个人/企业签章-实名认证
    realNameCertification(params){
        return api.fetch("post","/ElectronicContract/RealNameCertification",params);
    },
    // 获取客户签章列表
    signList(params){
        return api.fetch("post","/ElectronicContract/GetCustomerSignatureList",params);
    },

    // 通过客户签章ID获取信息
    getSignById(params){
        return api.fetch("post","/ElectronicContract/GetCustomerSignatureById",params);
    },

    // 客户签署电子合同
    customerSigned(params){
        return api.fetch("post","/ElectronicContract/CustomerSigned",params);
    },

    // 删除客户签章
    deletSign(params){
        return api.fetch("post","/ElectronicContract/CustomerSignatureRemove",params);
    },

    //阿里营业执照
    businessLicense(method,params){ 
        return upload.fetch(method,"/rest/160601/ocr/ocr_business_license.json",params);
    },

    // 身份证识别
    idcard(params){
        return idCard.fetch("post","/rest/160601/ocr/ocr_idcard.json",params);
    },
    // 第三方用户登陆我司,获取跳转地址
    GetDaoWangAccessUrl(params){
        return api.fetch("post","/OpenPlatform/GetDaoWangAccessUrl",params);
    },
    // 转图片 ==  合同模板
    toImg(params){
        return api.fetch("post","/ElectronicContract/GetContractTemplateImage",params);
    },

    // 转图片 ==  合同
    toSignImg(params){
        return api.fetch("post","/ElectronicContract/GetContractImage",params);
    },
    //我的 mine/balance 余额 资产 
    getDalance(params={}){ 
        return api.fetch("post","/Customer/GetMyAssets",params);
        
    },
    //我的 mine/balance 余额 明细
    getDalanceDetail(params={}){ 
        return api.fetch("post","/Customer/GetMyBalanceRecord",params);
    },  
    //我的 mine/accountBi/accountBi 记账币明细 
    coinDetail(params){ 
        // return api.fetch("post","/Customer/GetMyBalanceRecord",params);        
        
        return api.fetch("post","/Customer/GetMyCoinRecord",params);        
    },
    //我的钱包 myWallet.vue    ,帐户余额 奖励佣金 记账币 积分 
    REQUEST_MYWALLETPARTICULARS(params={}){
        console.log(params)
        return api.fetch("post","/Customer/GetMyAssets",params);
    },
    // 记账币 规则
    ACCOUNTBI_RELUSE(params={}){
        console.log(params)
        return api.fetch("post","/System/GetRuleDescription",params);
    },
     //获取当前用户发票信息与优惠券总数
     GetCusInvoceAndCoupon(params){ //从vuex中动态传过来
        return api.fetch('post','/Customer/GetCusInvoceAndCoupon',params)
    },
    //获取所需记账币
    GetCoin(params){
        return api.fetch('post','/Order/GetCoin',params)
    },
    //余额支付及记账币完全支付
    BalancePay(params){
        return api.fetch('post','/Payment/BalancePay',params)
    },
    //确认订单-最后结算金额
    Settlement(params){
        return api.fetch('post','/Order/Settlement',params)
    },
    //代付页面获取记账币
   getCoinByOrderId(params){
       return api.fetch('get','/Order/getCoinByOrderId',params)
   },
   //---新闻中心----
  //新闻分类列表
  get_newClassListDate(params){
    return api.fetch("get","/News/GetNewClass",params);
  },
  //最新 及对应分类列表新闻数据（支持关键字搜索，排序）
    get_nowNewListDate(params){
      return api.fetch("post","/News/List",params);
    },
    //本周热门新闻列表
    get_weekHotNewListDate(params){
      return api.fetch("post","/News/GetHotList",params);
    },
    //新闻详情信息
    get_textTypeNewtDate(params){
    return api.fetch("post","/News/GetNewsById",params);
    },
    //新闻评论列表获取
    get_newRewardList(params){
      return api.fetch("post","/News/GetRewardList",params);
    },
    //评论 当前新闻
    get_newReward(params){
      return api.fetch("post","/News/AddReward",params);
    },
    //新闻阅读 数量增加
    get_NewReadAdd(params){
      return api.fetch("get","/News/ReadNews",params);
    },
    //新闻分享
    get_newShares(params){
      return api.fetch("post","/News/Shares",params);
    },
    //新闻点赞
    get_NewPiontLove(params){
      return api.fetch("post","/News/Likes",params);
    },
    //新闻收藏
    get_NewAddCollect(params){
      return api.fetch("post","/News/AddCollect",params);
    },
    //新闻取消收藏
    get_NewDelCollect(params){
      return api.fetch("get","/News/DelCollect",params);
    },
    //新闻详情 --单个取消收藏
    get_NewDelCollectInfo(params){
      return api.fetch("get","/News/DelCollectInfo",params);
    },
    //新闻收藏列表
    get_NewCollectList(params){
      return api.fetch("get","/News/GetCollectList",params);
    },
    //详情是否已 收藏
    get_NewIsCollect(params){
      return api.fetch("get","/News/isCollect",params);
    },
    //新闻热门关键字 （用于搜索列表）
    get_KeyNewWordList(params){
      return api.fetch("get","/News/GetKeyWordList",params);
    },

  //---新闻中心----end
  //订单支付校验
  get_checkOrder(params){
    return api.fetch('post','/Order/CheckOrder',params)
  },

  //微信新用户推荐信息记录
    get_NewBindCusAndRefCode(params){
        return api.fetch("post","/Wx/BindCusAndRefCode",params);
    },
    //微信用户登录获取系统账号密码
    get_WxGetLoginInfo(params){
        return api.fetch("post","/Wx/GetUserInfo",params);
    },
    //获取微信用户openid
    get_WxGetUserOpenId(params){
        return api.fetch("post","/Wx/get_openid",params);
    },
    //是否已近关注
    get_WxGetIsFocus(params){
        return api.fetch("get","/Wx/IsFocus",params);
    },
    //获取微信后台去 授权
    get_WxShouQuan(params){
        return api.fetch("post","/Wx/get_Oauth",params);
    },
    //获取oppenid unionId
    get_WxGetOpenAndUionId(params){
        return api.fetch("post","/Wx/getopenid",params);
    },


    // 支付成功后完善资料 == 获取我的公司列表
    GetList(params){
        return api.fetch("get","/CusCompany/GetList",params);
    },
    // 完善公司信息
    EditCompanyInfo(params){
        return api.fetch("get","/CusCompany/EditCompanyInfo",params);
    },
    // 设置为默认公司
    SetDefault(params){
        return api.fetch("get","/CusCompany/SetDefault",params);
    },
    // 获取默认合同详情
    GetDefaultContractByOrderId(params){
        return api.fetch("get","/ElectronicContract/GetDefaultContractByOrderId",params);
    },
    // 获取最近公司信息
    GetInfo(params){
        return api.fetch("get","/CusCompany/GetInfo",params);
    },
    //  根据订单编号获取订单详情列表
    GetCommodityList(params){
        return api.fetch("get","/SPServiceStep/GetCommodityList",params);
    },
    // 根据流程ID获取商品服务流程信息
    GetServiceProcessById(params){
        return api.fetch("get","/SPServiceStep/GetServiceProcessById",params);
    },
    // 根据订单详情ID获取对应的公司与商品信息
    GetOrderDetailList(params){
        return api.fetch("get","/SPServiceStep/GetOrderDetailList",params);
    },
    // 根据订单详情ID获取商品名称以及流程
    GetProductProcessById(params){
        return api.fetch("get","/SPServiceStep/GetProductProcessById",params);
    },
}

