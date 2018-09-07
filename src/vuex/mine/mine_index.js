 
import * as types from '../mutations_types.js'
import Vuex from 'vuex'
import getD  from '../getData.js'
 


const state = {
    // balanceDetail.data.list
    balanceDetail:{data:{list:[],recordCount:0}},//获取 帐户余额 奖励佣金 记账币 积分
    sortType:"",// 账户明细排序 "" 默认空=获取全部记录, （0=收入 1=支出），可空，
    myWalletParticulars:{ Balance:'--',  Coupons:'--'},//我的钱包 
    coinDetail:{data:{list:[],recordCount:0}},//获取 记账币明细
    coinSortType:'',//记账币排序"" 默认空=获取全部记录, （0=收入 1=支出），可空，
    ACCOUNTBI_RELUSE:'',//记账币规则
    ISPAYOK_DATA:'',//游客 支付状态判断
    QUEARYHOT_DATA:'',//热销人气
}


const getters = {

}

const mutations = {
	[types.REQUEST_BALANCE_DETAIL](state,{resData,params}){ //余额 balance.vue 资产明细  
        if( state.sortType != params.type ){ //判断用户是否切换全部/ 收入 /支出
            state.sortType  = params.type;
            state.balanceDetail.data.list = resData.data.list;
            state.balanceDetail.data.recordCount = resData.data.recordCount;//数据总条数     
        }else if(params.type == '-1'){//清空数据
            state.balanceDetail  =  {data:{list:[],recordCount:0}};
        }else{//用户若不切换全部/收入/支出 择push
            state.balanceDetail.data.list.push(...resData.data.list);
            state.balanceDetail.data.recordCount = resData.data.recordCount;//数据总条数
        }
    },
    //我的钱包 myWallet.vue明细 //获取 帐户余额 奖励佣金 记账币 积分
    [types.REQUEST_MYWALLETPARTICULARS](state,data){  
       state.myWalletParticulars = data.data; 
    },


    


    //记账币 金额
    [types.REQUEST_COIN_DETAIL](state,{resData,params}){  
        console.log(params.type, state.coinSortType, (params.type == state.coinSortType));
            state.coinDetail.data.list = resData.data.list;
            state.coinDetail.data.recordCount = resData.data.recordCount;//数据总条数     
        
    }, 

    //记账币滚动分页

    [types.REQUEST_COIN_DETAIL_PAGE](state,{resData,params}){  
        state.coinDetail.data.list.push(...resData.data.list);
        state.coinDetail.data.recordCount = resData.data.recordCount;//数据总条数
    }, 
    //记账币 规则
    [types.ACCOUNTBI_RELUSE](state,resData){   
        state.ACCOUNTBI_RELUSE  = resData.data.Describe; 
    },
    [types.ISPAYOK](state,resData){ //  匿名支付状态判断   
        console.log('匿名支付状态判断   ',resData )
        state.ISPAYOK_DATA  = resData.data ;//匿名支付状态判断  
    },
    [types.QUEARYHOT](state,resData){ //  热销人气榜 
            state.QUEARYHOT_DATA  = resData.data.list;//热销人气榜   
    }, 
}


const actions = {
     //余额 明细
     REQUEST_BALANCE_DETAIL({ state, commit, rootState },params){ 
         //处理后退问题
         console.log(params,'d')
        if(params.type!="-1"){
            return   getD.getDalanceDetail(params).then((resData)=>{
                return  commit(types.REQUEST_BALANCE_DETAIL, {resData , params});
             })
        }else{
            let resData =  {data:{list:[],recordCount:0}};
            return  commit(types.REQUEST_BALANCE_DETAIL, {resData  , params});
        }
        
    },
     //我的钱包 myWallet.vue  资产 ,帐户余额 奖励佣金 记账币 积分 
     REQUEST_MYWALLETPARTICULARS({ state, commit, rootState },data){
         if(data  == 'false'){
            return commit(types.REQUEST_MYWALLETPARTICULARS, {data:{ Balance:'--',  Coupons:'--'}});
         }
        return   getD.REQUEST_MYWALLETPARTICULARS().then((res)=>{
           return  commit(types.REQUEST_MYWALLETPARTICULARS, res);
        })
    },
    //记账币明细
    REQUEST_COIN_DETAIL({ state, commit, rootState },params){ 
         //处理后退问题 -1 表示不发起请求 , 其他表示发起请求
         if(params.type!="-1"){
            return   getD.coinDetail(params).then((resData)=>{
                return  commit(types.REQUEST_COIN_DETAIL, {resData , params});
             })
        }else{
            let resData =  {data:{list:[],recordCount:0}};
            return  commit(types.REQUEST_COIN_DETAIL, {resData  , params});
        }  
    },
    //记账币明细 滚动分页
    REQUEST_COIN_DETAIL_PAGE({ state, commit, rootState },params){ 
        //处理后退问题 -1 表示不发起请求 , 其他表示发起请求
        
           return   getD.coinDetail(params).then((resData)=>{
               return  commit(types.REQUEST_COIN_DETAIL_PAGE, {resData , params});
            })
       
   },
     //记账币 规则
    ACCOUNTBI_RELUSE({ state, commit, rootState },params){ 
        return   getD.ACCOUNTBI_RELUSE(params).then((resData)=>{
           return  commit(types.ACCOUNTBI_RELUSE, resData );
        })
    },
    //匿名支付状态判断       
    ISPAYOK({ state, commit, rootState },params){ 
        console.log('匿名支付状态判断')
        return   getD.ISPAYOK(params).then((resData)=>{
            console.log(resData ,'w dfwe dsfesw ')
           return  commit(types.ISPAYOK, resData );
        })
    },
    //支付完成后热销
    QUEARYHOT({ state, commit, rootState },params){ 
        return   getD.getPopulariData(params).then((resData)=>{
            console.log(resData ,'wgetPopulariDataw ')
           return  commit(types.QUEARYHOT, resData );
        })
    },
}

export default {
	namespaced: true,//命令空间
	state,
	getters,
	mutations,
	actions
}