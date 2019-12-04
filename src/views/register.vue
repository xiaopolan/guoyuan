<!-- 登录页 -->
<style scoped>
	.registerBox{
	width: 100%;
	height: 100%;
	padding-top: 40px;
	background: #FFFFFF;
}
body, div, ul, li, ol, h1, h2, h3, h4, h5, h6, input, textarea, select, p, dl, dt, dd, a, img, button, form, table, th, tr, td, tbody, article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {
	margin: 0;
	padding: 0;
}
.logo_image{
	width:93px;
	height:93px;
	background: url(../assets/img/logoreg.png) no-repeat;
	background-size: 100% 100%;
	margin: 0 auto;
}
.reg_form{
	width: 80%;
	margin: 0 auto;
	height: 250px;
}
.form_item{
	height: 50px;
	width: 100%;
	border-bottom: 1px solid rgb(204,204,204,0.5);
}
.itme_icon{
	float:left;
	width:17px;
	height: 23px;
	background: url(../assets/img/phone.png) no-repeat;
	background-size: 100% 100%;
	margin-top: 20px;
    margin-left: 10px;
}
.item_input{
	height: 30px;
	margin-top: 16px;
	margin-left: 20px;
	width: 60%;
	font-size: 13px;
}
input::-webkit-input-placeholder{
	color:#ABABAB;
	font-size: 15px;
}
.get_msg{
		float: right;
		color: #DD3138;
		font-size: 13px;
		margin-top: 20px;
}
.itme_icon_psd{
	float:left;
	width:17px;
	height: 23px;
	background: url(../assets/img/psd.png) no-repeat;
	background-size: 100% 100%;
	margin-top: 20px;
		margin-left: 10px;
}
.itme_icon_per{
	float:left;
	width:19px;
	height: 23px;
	background: url(../assets/img/person.png) no-repeat;
	background-size: 100% 100%;
	margin-top: 20px;
		margin-left: 8px;
}
.item_input_psd{
	height: 30px;
	margin-top: 16px;
	margin-left: 20px;
	width: 80%;
	font-size: 13px;
}
.reg_btn{
	width: 80%;
	margin-left: 10%;
	border-radius: 19px;
	background: #DD3138;
	height: 38px;
	margin-top: 50px;
	border: 0;
	color: #FFFFFF;
	font-size: 17px;
}
.btm_xieyi{
	height: 20px;
	width: 60%;
	margin: 0 auto;
	margin-top:10px;
}
.radio_ck{
	height: 15px;
	width: 15px;
	background: url(../assets/img/checked.png) no-repeat;
	background-size: 100% 100%;
	float: left;
	margin-top: 2px;
}
a{
    text-decoration: none; 
    border-bottom: 1px solid #DD3138; 
		color:#DD3138;
}
.error{
	color: #DD3138;
}
.errorreg{
	color: #FFFFFF;
	background: #000000;
    width: 41%;
    margin: 0 auto;
    position: absolute;
    text-align: center;
    top: 10px;
    left: 30%;
    font-size: 15px;
    border: 1px solid #ccc;
    border-radius: 15px;
		padding:15px
}
</style>
<template>
	<div class="registerBox">
		<div class="logo_image"></div>
		<div class='reg_form'>
			<div class='form_item'>
				<div class='itme_icon'></div>
				<input class="item_input" type="text" placeholder="请输入手机号码" v-model="phone" v-on:input="changephone" />
			</div>
			<div v-show="texterror" class="error">请输入正确的电话号码</div>
			<div class='form_item'>
				<div class='itme_icon'></div>
				<input class="item_input" style="width: 40%;" type="text" placeholder="请输入手机验证码" v-model="yzm" minlength="6"
				 maxlength="6" />
				<div v-if="showcode" class="get_msg" @click="getsms">获取短信验证码</div>
				<div v-else class="get_msg">{{code}}s</div>
			</div>
			<div class='form_item'>
				<div class='itme_icon_psd'></div>
				<input class="item_input_psd" type="password" placeholder="设置密码(6-20位,包含字母和数字)" v-model="password" v-on:input="changepwd" />
			</div>
			<div v-show="texterror2" class="error">密码(6-20位,包含字母和数字)</div>
			<div class='form_item'>
				<div class='itme_icon_psd'></div>
				<input class="item_input_psd" type="password" placeholder="确认密码(6-20位,包含字母和数字)" v-model="passwordagain" v-on:input="changepwdag" />
			</div>
			<div v-show="texterror3" class="error">两次输入不一致</div>
			<div class='form_item'>
				<div class='itme_icon_per'></div>
				<input class="item_input_psd" type="text" placeholder="请输入邀请码(新用户必填)" v-model="invitate" minlength="6" maxlength="6" />
			</div>
		</div>
		<div v-show="texterror4" class="errorreg">{{errmsg}}</div>
		<div v-show="texterror5" class="errorreg">{{successmsg}}</div>
		<div style="text-align: center;margin-top: 50px;">
			<a :href="href">直接下载</a>
		</div>
		<button class="reg_btn" @click="register">注册</button>
		<div class="btm_xieyi">
			<p class="radio_ck"></p>
			<router-link to='/agreement' style="float: left;font-size: 12px;margin-left: 10px;">已阅读并同意《竞拍商城用户协议》</router-link>
		</div>

	</div>
</template>

<script>
	// 引入通用的库文件
	import Util from "@/libs/util";
	import Rule from "#/libs/rule";
	import axios from 'axios'
	import CryptoJS from 'crypto-js'
	let Base64 = require('js-base64').Base64;
	export default {
		name: "register",
		components: {},
		data() {
			return {
				errmsg: '请正确填写表单!',
				successmsg:'注册成功！即将跳转到下载页',
				phone: '',
				yzm: '',
				password: '',
				passwordagain: '',
				invitate: '',
				texterror: false,
				texterror2: false,
				texterror3: false,
				texterror4: false,
				texterror5: false,
				showcode: true,
				code: 60,
				link:'',
				href:''
			};
		},
		created() {
			this.invitate = this.$route.query.invitationCode
			//判断手机类型
			var u = navigator.userAgent;
			if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
					//安卓手机
					this.link="android"
			} else if (u.indexOf('iPhone') > -1) {
					//苹果手机
					this.link="ios"
			} else if (u.indexOf('Windows Phone') > -1) {
					this.link="android"
			}
			axios
				.get('/api/auction/url/sys/getUrl', {
					params:{
						desc: this.link
					}
				})
				.then(response => {
					var res = response.data;
					// this.yhlbmktablePageData = res.data;
					if(res.code==200){
						this.href=res.data
					}
				})
				.catch(error => {
					console.log(error);
				});
		},
		mounted() {},
		methods: {
			changephone() {
				if (this.phone == '' || !(/^1[34578]\d{9}$/.test(this.phone))) {
					this.texterror = true
				} else {
					this.texterror = false
				}
			},
			changepwd() {
				if (this.password == '' || !(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/.test(this.password))) {
					this.texterror2 = true
					if (this.passwordagain == '' || this.passwordagain != this.password) {
						this.texterror3 = true
					} else {
						this.texterror3 = false
					}
				} else {
					this.texterror2 = false
				}
			},
			changepwdag() {
				if (this.passwordagain == '' || this.passwordagain != this.password) {
					this.texterror3 = true
				} else {
					this.texterror3 = false
				}
			},
			register() {
				if (this.phone == '' || this.password == '' || this.passwordagain == '' || this.yzm == '' || this.invitate == '' ||
					this.texterror || this.texterror2 || this.texterror3) {
					this.texterror4 = true
					setTimeout(() => {
						this.texterror4 = false
					}, 1000);
				} else {
					const key = "1bd4ac3849917342b1fb247c22a59d03"
					const glv = "56910372"
					var pwdnew = this.Encrypt3Des(this.password, key, glv)
					var newcode = Base64.encode(pwdnew);
					var params = {
						phone: this.phone,
						pwd: newcode,
						shortMessageCode: this.yzm,
						invitationCode: this.invitate,
						regType: 2
					};
					axios
						.post('/api/auction/register/userRegister', params)
						.then(response => {
							var res = response.data;
							if (response.data.code == 200) {
								this.texterror5 = true
								setTimeout(() => {
									this.texterror5 = false
									window.location.href=this.href
								}, 1000)
							} else {
								this.errmsg = res.msg + ",请重新注册!"
								this.texterror4 = true
								setTimeout(() => {
									this.texterror4 = false
								}, 1000);
							}
						})
						.catch(error => {
							console.log(error);
						});
				}
			},
			//获取验证码
			getsms() {
				if (this.phone != '' && (/^1[34578]\d{9}$/.test(this.phone))) {
					this.showcode = false
					axios.get('/api/auction/shortMessage/sendRegCode', {
							params: {
								phone: this.phone,
							}
						})
						.then(response => {
							var res = response.data;
							if (res.code == 200) {
								var set = setInterval(() => {
									this.code--;
								}, 1000)
								setTimeout(() => {
									this.showcode = true
									this.code = 60
									clearInterval(set)
								}, 60000)
							} else {
								this.showcode = true
								this.errmsg = res.msg
								this.texterror4 = true
								setTimeout(() => {
									this.texterror4 = false
								}, 1000);
							}
						})
						.catch(error => {
							console.log(error);
						});
				}

			},

			Encrypt3Des(str, aStrKey, ivstr) {
				const KeyHex = CryptoJS.enc.Utf8.parse(aStrKey);
				const encrypted = CryptoJS.TripleDES.encrypt(str,
					KeyHex, {
						mode: CryptoJS.mode.CBC,
						padding: CryptoJS.pad.Pkcs7,
						iv: CryptoJS.enc.Utf8.parse(ivstr)
					});
				return encrypted.toString();
			}
		}
	};
</script>
