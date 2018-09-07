//更新本地数据
export const UPDATE_LOCAL = 'UPDATE_LOCAL';

//清空本地数据
export const CLEAR_LOCAL = 'CLEAR_LOCAL';





export const setSysten = 'setSysten'





//初始化购物车数据
export const REQUEST_DATA_CART= 'REQUEST_DATA_CART';

//添加菜品到购物车
export const CREATE_DB_CART = 'CREATE_DB_CART';

//给购物车的菜品++
export const ADD_DB_CART = 'ADD_DB_CART';

//给购物车的菜品--
export const DES_DB_CART = 'REDUCE_DB_CART';

//删除购物车数据
export const DELETE_DB_CART = 'DELETE_DB_CART'; 

//更新当前菜品在购物车的状态
export const UPDATE_CUR_SHOP_STATUS_CART = 'UPDATE_CUR_SHOP_STATUS_CART';

//购物车提交订单
export const ORDER_DB_CART = "ORDER_DB_CART"

//检测购物车内是否存在某菜品
export const CHECK_DB_CART = 'CHECK_DB_CART';

//留言
export const LEAVE_MESSAGE = 'LEAVE_MESSAGE';

// 用户余额
export const ORDBTNPAY_REQUEST_BALANCE = 'ORDBTNPAY_REQUEST_BALANCE';

// 用户余额明细
export const REQUEST_BALANCE_DETAIL = 'REQUEST_BALANCE_DETAIL';

//用户记账币明细
export const  REQUEST_COIN_DETAIL ='REQUEST_COIN_DETAIL';
//记账币滚动分页
export const REQUEST_COIN_DETAIL_PAGE = 'REQUEST_COIN_DETAIL_PAGE';

//用户记账币规则
export const ACCOUNTBI_RELUSE = 'ACCOUNTBI_RELUSE' 

//确认订单 支付方式
export const PAYMETHODS_GOCOMPANY = "PAYMETHODS_GOCOMPANY";

//确认订单 找人代付
export const  REQUEST_DATA_MYORDER_ONLOGIN = 'REQUEST_DATA_MYORDER_ONLOGIN'
//确认订单 新增或者修改发票
export const ADDOREDITE_BILLDATA_COMFIRMORDER = "ADDOREDITE_BILLDATA_COMFIRMORDER";

//确认订单 最近使用发票列表
export const RECENTLY_BILLDATA = "RECENTLY_BILLDATA";

//确认订单 优惠卷
export const CCOUPON_COMFIRMORDER = "CCOUPON_COMFIRMORDER";

//确认定单 立即下单 ===购物车页面
export const ORDBTNPAY = "ORDBTNPAY";

//确认定单 立即下单 ===从商品详情页面
export const IMIDIATEFN = "IMIDIATEFN";

//选择公司 列表 
export const REQUEST_COMPANYDATA_GOCOMPANY = "REQUEST_COMPANYDATA_GOCOMPANY0";




//我的订单
export const REQUEST_DATA_MYORDER = "REQUEST_DATA_MYORDER";

// 我的订单   取消订单
export const REQUEST_DATA_CANCEL = "REQUEST_DATA_CANCEL";

// 我的订单   待付款
export const REQUEST_DATA_DETAIL = "REQUEST_DATA_DETAIL";

// 我的订单   删除订单
export const REQUEST_DATA_DELETE = "REQUEST_DATA_DELETE";

// 我的订单   新增订单
export const REQUEST_DATA_NEWORDER = "REQUEST_DATA_NEWORDER";

// 我的订单  待支付进度
export const REQUEST_DATA_PAY ="REQUEST_DATA_PAY";

// 我的订单 匿名支付成功判断
export const ISPAYOK = 'ISPAYOK'
// 支付成功 热销
export const QUEARYHOT = 'QUEARYHOT'
// 支付成功 热销
export const QUEARYHOT_DATA = 'QUEARYHOT_DATA'
// 我的订单  再次购买
export const REQUEST_DATA_BUYAGAIN = "REQUEST_DATA_BUYAGAIN";

// 我的订单  去评价
export const REQUEST_DATA_EVALUATE = "REQUEST_DATA_EVALUATE";

// 我的订单  联系业务员
export const REQUEST_DATA_TELPHONE = "REQUEST_DATA_TELPHONE";


// 我的订单  余额明细
export const REQUEST_BALANCE = "REQUEST_BALANCE";
//新确认订单-获取发票和优惠券总数
export const CUSINVOICE_AND_COUPON = 'CUSINVOICE_AND_COUPON';


//新确认订单-获取所需记账币
export const GET_COIN = 'GET_COIN'


//新支付方式-余额支付
export const BLANCE_COIN = 'BLANCE_COIN'


// 我的订单 我的钱包明细 myWallet.vue
export const REQUEST_MYWALLETPARTICULARS = 'REQUEST_MYWALLETPARTICULARS';
// 服务 商品分类列表
export const SERVERLIST = "SERVERLIST";

// 服务  商品服务列表获取数据
export const SERVER_PRODUCT_LIST = "SERVER_PRODUCT_LIST";

// 服务  根据分类获取产品列表请求数据
export const SERVER_PRODUCT_INFOR = "SERVER_PRODUCT_INFOR";

// 服务  根据二级分类获取产品热销榜
export const SERVER_PRODUCT_HOT = "SERVER_PRODUCT_HOT";
// 商事查询 查公司
export const queryCompany = "queryCompany";


//新增公司 查银行-正式环境
export const REQUEST_BANK_GOCOMPANY = "REQUEST_BANK_GOCOMPANY";

//新增公司 查银行-测试环境
export const REQUEST_BANK_GOCOMPANY_TEST = "REQUEST_BANK_GOCOMPANY_TEST";
// 消息 系统消息
export const systemMsg = "systemMsg";

// 消息 服务通知消息
export const serverMsg = "serverMsg";

// 消息 活动消息
export const activeMsg = "activeMsg";





export const LOGIN = 'login';

export const LOGOUT = 'logout';

export const STORAGE = 'storage';

export const JUDGE = 'judge';

export const FIRST = 'first';

export const LOAD = 'load';

export const COUNT = 'count';

export const ID = 'ID';

//是否显示弹出框
export const SHOWCASE = 'SHOWCASE';
//版本号信息
export const VERMES = 'VERMES';

//确认订单-最后结算金额
export const SETTLEMENT = 'SETTLEMENT'

//代付获取记账币
export const GET_COIN_BYORDERNUM = 'GET_COIN_BYORDERNUM'

//订单支付校验
export const CHECK_ORDER = 'CHECK_ORDER'
