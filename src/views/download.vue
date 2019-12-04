<!-- 下载页 -->
<style scoped>
	#body{
		background: #FFFFFF !important;
	}
	.registerBox{
		padding-top: 50px;
	}
	.success{
		width:100%;
		text-align: center;
		height:80px;
		line-height: 40px;
		font-size: 20px;
		color:#BA3238
	}
	.failed{
		width:100%;
		text-align: center;
		height:80px;
		line-height: 40px;
		font-size: 20px;
		color: #333333;
	}
	.msgtext{
		font-size: 16px;
	}
	.logo_image{
		width:80px;
		height:80px;
		background: url(../assets/img/success.png) no-repeat;
		background-size: 100% 100%;
		margin: 0 auto;
	}
	.logo_image2{
		width:50px;
		height:50px;
		background: url(../assets/img/fail.png) no-repeat;
		background-size: 100% 100%;
		margin: 0 auto;
		margin-bottom: 20px;
	}
	.down_image{
		width:120px;
		height:120px;
		background: url(../assets/img/down.png) no-repeat;
		background-size: 100% 100%;
		margin: 0 auto;
		margin-top: 20px;
	}
	.saomiao{
		font-size: 10px;
	}
</style>
<template>
    <div class="registerBox">
		<div class="success">
			<p class="msgtext">正在跳转到下载页...</p>
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
					window.location.href=res.data
				}
			})
			.catch(error => {
				console.log(error);
			});
    },
	activated(){
	},
	mounted() {
			
	},
    methods: {
			
    }
};
</script>
