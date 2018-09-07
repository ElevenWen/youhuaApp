<style type="text/css" lang="less" scoped>
	@import "../../common/index.less";
	@import '../../../node_modules/mint-ui/lib/swipe/style.css';
	@import 'newRegister.less';

</style>
<template>
	<div id="newRegister">
		<header-title title="忘记密码"></header-title>
		<div class="register_input">
			<form  @submit.prevent="submit"   >
				<div class="phone_numbor"><span>手机号</span>
					<input type="number" v-model="register.phone" placeholder="请输入手机号" @blur="verifyP"/>
					<span class="eliminate" @click.stop.prevent="empty('phone')" v-if="register.phone"></span>
				</div>
				<div class="verification">
					<span class="code">验证码</span>
					<input v-model="register.noteCode" placeholder="短信验证码" @blur="verifyM"/>
					<span class="get_verification" @click.stop.prevent="getVerification" v-if="isGet">获取验证码</span>
					<span class="get_verification" v-if="!isGet">重新获取{{time}}s</span>
				</div>
				<div class="phone_numbor"><span>新密码</span>
					<input type="number" v-model="register.enterPassword" placeholder="请设置新密码" @blur="verifyEnterPassword"/>
					<span class="eliminate" @click.stop.prevent="empty('enterPassword')" v-if="register.enterPassword"></span>
				</div>
				<div class="referrer">
					<span class="queryM">确认密码</span>
					<input placeholder="请再次输入密码" v-if="!isDis" v-model="register.rec"/> 
				</div>
				<div class="register_button" :class="{active:register.phone&&register.noteCode&&allChecked}">
					<button type="submit" :disabled="!register.phone||!register.noteCode||!allChecked">确认重置</button>
				</div>
			</form>
		</div>
	</div>
</template>
<script type="text/javascript">
import headerTitle from '../components/header-title';
	export default {
		data(){
			return {
				ab:"aa",
            	allChecked:true,
            	 register: {
                    phone: "",
                    password:"",
                    enterPassword:"",
                    noteCode:"",
                    rec:"",
                }  ,
                time:45,
                isPhone:false,//判断手机号
                isCode:false,//判断验证码
                isGet:true,//是否获取验证码
                isLogin:false,//是否可以点击注册
                isDis:false,//推荐人是否可以编辑
                something:""
			}
		},
		components:{
			headerTitle,
		},
		methods:{
			verifyP(){

			},
			verifyM(){

			},
			verifyEnterPassword(){

			},
		}
	}
</script>