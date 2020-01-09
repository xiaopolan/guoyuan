<!-- 下载页 -->
<style scoped>
	.box{
		background: #FFFFFF;
	}
	.bg{
		height: 350px;
		width: 100%;
		background: url(../assets/img/h5img/img3.png) no-repeat center center ;
		background-size: 100% 100%;
		padding-top: 37px;
	}
	.bg1{
		height: 160px;
		width: 163px;
		background: url(../assets/img/h5img/logo@2x.png) no-repeat center center ;
		background-size: 100% 100%;
		margin:0 auto;
	}
	.t1{
		font-size:17px;
		font-family:PingFang SC;
		color:rgba(0,181,146,1);
		text-align: center;
		margin-top: -14px;
	}
	.btn{
		width:150px;
		height:35px;
		background:rgba(0,181,146,1);
		box-shadow:0px 1px 5px 0px rgba(3,143,116,0.72);
		border-radius:18px;
		margin:21px auto 13px;
		font-size:15px;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(255,255,255,1);
		line-height: 35px;
		text-align: center;
	}
	.bg2{
		height: 241px;
		width: 185px;
		background: url(../assets/img/h5img/imgs.png) no-repeat center center ;
		background-size: 100% 100%;
		margin:0 auto;
	}
	.bg3{
		height: 346px;
		width: 281px;
		background: url(../assets/img/h5img/imgs1.png) no-repeat center center ;
		background-size: 100% 100%;
		margin:52px auto 0;
	}
	.bg4{
		height: 141px;
		width: 366px;
		background: url(../assets/img/h5img/img5.png) no-repeat center center ;
		background-size: 100% 100%;
		margin:40px auto 14px;
		padding: 28px 31px;
	}
	.wxtext{
		font-size:12px;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(0,181,146,1);
		line-height:24px;
	}
	.wxdiv{
		display: flex;
		flex-direction: row;
		font-size:12px;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(142,156,176,1);
		line-height:24px;
	}
	.dleft{
		margin-right: 29px;
	}
	.d2{
		font-size:12px;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(142,156,176,1);
		line-height:24px;
	}
	.t2{
		width: 100%;
		text-align: center;
		font-size:12px;
		font-family:PingFang SC;
		color:rgba(0,181,146,1);
	}
</style>
<template>
    <div class="box">
		<div class="bg">
			<div class="bg1"></div>
			<div class="t1">神秘果商城APP</div>
			<div class="btn" @click="todown">立即安装</div>
			<div class="t2">尚未下载？点击立即下载</div>
		</div>
		<div class="bg2"></div>
		<div class="bg3"></div>
		<div class="bg4">
			<div class="wxtext">【温馨提示】</div>
			<div class="wxdiv">
				<div class="dleft">
					<div>微信公众号：果园魔术师</div>
					<div>微信小程序：神秘果商城</div>
				</div>
				<div>
					<div>客服电话：18069789307</div>
					<div>客服微信：HSSMG586</div>
				</div>
			</div>
			<div class="d2">欢迎致电客服电话（工作日9:00-19:00）</div>
		</div>
    </div>
</template>
<script>
	import Util from "@/libs/util";
	import Rule from "#/libs/rule";
	import axios from 'axios'
	import CryptoJS from 'crypto-js'
export default {
    name: "result",
    components: {},
    data() {
        return {
			link:"",
        };
    },
    created() {
		var u = navigator.userAgent;
		if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
				//安卓手机
				this.link="android"
		} else if (u.indexOf('iPhone') > -1) {
				//苹果手机
				this.link="ios"
		} else if (u.indexOf('Windows Phone') > -1) {
				//winphone手机
				this.link="android"
		}
    },
	activated(){
	},
	mounted() {
		
	},
    methods: {
		todown(){
			if(this.link=="android"){
				window.location.href = 'https://www.pgyer.com/qHuA'
			}else if(this.link=="ios"){
				window.location.href = 'itms-apps://itunes.apple.com/cn/app/id1490081768?mt=8'
			}else{
				window.location.href = 'https://www.pgyer.com/qHuA'
			}
		}	
    }
};
</script>
