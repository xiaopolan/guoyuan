<!-- 下载页 -->
<style scoped>
	.backimg {
		width: 100%;
		height: 100vh;
		background: url(../assets/img/wximg/bg.png) no-repeat no-repeat;
		background-size: 100% 100%;
		padding: 15px;
	}

	.img1 {
		width: 340px;
		height: 160px;
		background: url(../assets/img/wximg/banner.png) no-repeat no-repeat;
		background-size: 100% 100%;
		margin: 0 auto 0 auto;
	}

	.divfr {
		width: 340px;
		height: 480px;
		background: rgba(255, 255, 255, 1);
		border-radius: 5px;
		margin: 0 auto;
		padding: 0 20px;
	}

	.frtext1 {
		font-size: 14px;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(3, 125, 112, 1);
		line-height: 30px;
		padding: 25px 0 0 0;
	}

	.frtext2 {
		font-size: 12px;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(3, 125, 112, 1);
		line-height: 20px;
		text-indent: 2em;
		margin-top: 15px;
	}
	.frtext3{
		font-size:12px;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(3,125,112,1);
		line-height:20px;
		margin-top: 13px;
	}
	.frtext4{
		color: #037D70;
		font-weight: bold;
	}
	.frtext5{
		font-size:12px;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(3,125,112,1);
		line-height:20px;
		margin-top: 20px;
	}
	.frtext6{
		width: 100%;
		text-align: right;
		font-size:12px;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(3,125,112,1);
		line-height:20px;
	}
</style>
<template>
	<div class="backimg">
		<div class="img1"></div>
		<div class="divfr">
			<div class="frtext1">亲爱的果粉们：</div>
			<div class="frtext2">经过两个多月的工作，杭州幻世在完善神秘果商城小程序的同时开发了神秘果商城APP。</div>
			<div class="frtext2"> 目前，APP已进入开发后期，部分功能（神秘树、
				神秘珠、我的订单、个人信息）正在同步对接数据中，
				为了操作更简单，显示更明确，将神秘树、神秘珠进
				行区分，目前部分数据暂不显示。</div>
			<div class="frtext2">神秘果商城APP开发完成后将通过公司官方平台告知于果粉，请果粉们静候佳音。</div>
			<div class="frtext3" style="margin-top: 19px;">如有疑问可关注微信公众号：<span class="frtext4">果园魔术师</span></div>
			<div class="frtext3" style="margin-top: 19px;">神秘果商城客服微信：<span>HSSMG586</span></div>
			<div class="frtext3" style="margin-top: 19px;">如有疑问可关注微信公众号：<span>果园魔术师</span></div>
			<div class="frtext5">祝大家生活愉快！</div>
			<div class="frtext6" style="margin-top: 25px;">神秘果商城运营中心</div>
			<div class="frtext6">2019.12.25</div>
		</div>

	</div>
</template>
<script>
	import Util from '@/libs/util';
	import Rule from '#/libs/rule';
	import axios from 'axios';
	import CryptoJS from 'crypto-js';
	import Swiper from 'swiper';
	import '@/libs/jquery.barrager.js';
	var pId, userId;
	export default {
		name: 'result',
		components: {},
		data() {
			return {};
		},
		created() {},
		mounted() {},
		methods: {}
	};
</script>
