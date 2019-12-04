<!-- 下载页 -->
<style scoped>
	.dmBox {
    width: 100%;
    height: 100%;
    background: #000000 !important;
}
.padtop {
    background: #000000;
    height: 75px;
    width: 100%;
    padding: 20px 15px;
}
.user {
    width: 170px;
    height: 35px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 16px;
}
.user img {
    height: 34px;
    width: 34px;
    object-fit: cover;
    border-radius: 16px;
    float: left;
}
.danmu {
    height: 115px;
    width: 100%;
    position: relative;
}
.imagebox {
    height: 260px;
    width: 100%;
}
.swiper-slide img {
    height: 260px;
    width: 100%;
    object-fit: cover;
}
.username {
    float: left;
    color: rgba(255, 255, 255, 1);
    margin-left: 5px;
	height: 35px;
}
.pname{
	line-height: 35px;
}
.p1 {
    font-size: 12px;
}
.p2 {
    font-size: 12px;
    opacity: 0.8;
}
.gift {
    height: 45px;
    width: 43px;
    object-fit: cover;
    margin: 8px 12px;
}
.userbtm img {
    width: 18px;
    height: 18px;
    border-radius: 18px;
    float: left;
    margin-left: 12px;
}
.btmname {
    float: left;
    color: rgba(255, 255, 255, 1);
    margin-left: 5px;
    font-size: 14px;
}
.blank{
	height: 150px;
	background: #000000;
}
.intro {
    height: 60px;
    width: 50%;
    color: rgba(255, 255, 255, 1);
    font-size: 14px;
    margin: 10px 12px;
}
.showmore {
    color: rgba(225, 57, 59, 1);
    margin-left: 5px;
}
.comtext {
    float: left;
    width: 37%;
    height: 35px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 35px;
    margin-left: 12px;
}
.comtext1 {
    width: 94%;
    height: 35px;
    background:rgba(231,231,232,1);
    border-radius: 35px;
    margin-left: 12px;
		margin-top:60px;
}
.comtext::-webkit-input-placeholder {
    color: rgba(238, 238, 238, 1);
}
.bottom {
    height: 35px;
    width: 100%;
    position: relative;
}
.bottom img {
    float: left;
    width: 9%;
}
.firstimg {
    height: 39px;
    margin-left: 7%;
}
.otherimg {
    height: 34px;
    margin-left: 4%;
}
.totalnum {
    width: 16px;
    height: 16px;
		line-height: 16px;
    background: rgba(247, 73, 63, 1);
    border-radius: 50%;
    text-align: center;
    color: #ffffff;
}
.num1 {
    position: absolute;
    top: -4px;
    left: 65%;
}
.num2 {
    position: absolute;
    top: -4px;
    left: 79%;
}
.detailbox {
    background:rgba(255,255,255,1);
		border-radius:10px;
    width: 80%;
    height: 50%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
		z-index: 99999;
		margin-left: 10%;
		padding:0 15px
}
.box-top{
	text-align: center;
	height: 40px;
	line-height: 40px;
	width:100%;
	font-size: 14px;
	font-weight: bold;
	border-bottom:1px solid rgba(238,238,238,1);
}
.box-top img{
	height: 12px;
	width: 12px;
	float: right;
    margin-top: 12px;
}
.p3{
	font-size: 14px;
	font-weight: bold;
	color:rgba(51,51,51,1);
}
.p4{
	font-size: 12px;
	color:rgba(153,153,153,1);
}
.proname{
	font-size: 14px;
	font-weight: bold;
	color:rgba(51,51,51,1);
	clear: both;
	margin:20px 7px;
}
.commentbox{
	background:rgba(255,255,255,1);
	border-radius:10px 10px 0 0;
	width: 100%;
	height: 440px;
	position: fixed;
	bottom: 0;
	z-index: 9999;
}
.cotop{
	text-align: center;
	font-size: 15px;
height: 50px;
line-height: 50px;
padding: 0 15px;
font-weight: bold;
}
.cotop img{
	width: 9px;
	height: 15px;
float: left;
margin-top: 18px;
}
.comdiv{
	height: 270px;
	overflow: scroll;
}
.listdiv{
	clear: both;
	padding: 15px 0;
	position: relative;
}
.listdiv img,.listname,.zanicon{
	float: left;
}
.zanicon{
	width: 20%;
}
.zanicon img{
	width: 14px;
	height: 14px;
	margin-left: 60%;
}
.listdiv>img{
	height: 36px;
	width: 36px;
	border-radius:50%;
	margin-left: 15px;
}
.listname{
	margin-left: 10px;
	width: 60%;
}
.listborder{
	width:80%;
height:1px;
background: rgba(238,238,238,1);
    margin-left: 10%;
    margin-top: -6px;
}
.fivideo{
    /* object-fit:fill;  */
}
.gradeclass{
	position: absolute;
	top: 120%;
	left: 10%;
	height: 15px;
	width: 15px;
}
.gradeclass2{
	background: url(../assets/img/v2.png) no-repeat;
	background-size: 100% 100%;
}
.gradeclass0{
	background: url(../assets/img/v0.png) no-repeat;
	background-size: 100% 100%;
}
.gradeclass1{
	background: url(../assets/img/v1.png) no-repeat;
	background-size: 100% 100%;
}
.gradeclass3{
	background: url(../assets/img/v3.png) no-repeat;
	background-size: 100% 100%;
}
.gradeclass4{
	background: url(../assets/img/v4.png) no-repeat;
	background-size: 100% 100%;
}
.gradeclass5{
	background: url(../assets/img/v5.png) no-repeat;
	background-size: 100% 100%;
}
.guanzhu{
	float: right;
	width:45px;
	height:20px;
	background:linear-gradient(45deg,rgba(231,109,100,1) 0%,rgba(225,57,59,1) 100%);
	border-radius:10px;
	margin-top: 7px;
	margin-right: 8px;
	font-size:12px;
	font-family:Microsoft YaHei;
	font-weight:400;
	color:rgba(255,255,255,1);
	text-align: center;
	line-height: 20px;
}
</style>
<template>
	<div class="dmBox">
		<div class="padtop">
			<div class="user">
				<img v-bind:src="info.icon" />
				<div :class="[username,{'pname':classa}]">
					<p class='p1'>{{info.userName}}</p>
					<p class="p2">{{info.area}}</p>
				</div>
				<div class="guanzhu" @click="toregister"><span>+</span>关注</div>
			</div>
		</div>
		<div class="danmu"></div>

		<div class="imagebox">
			<div class="swiper-container">
				<div class="swiper-wrapper">
					<div class="swiper-slide" v-if="flag">
						<video id="video" class="fivideo" width="100%" height="260" :poster="videoPic" controls>
							<source :src="videourl" type="video/mp4">
						</video>
					</div>
					<div class="swiper-slide" v-for="item in imglist" :key="item"><img :src="item" /></div>
				</div>
			</div>
		</div>
		<img class="gift" src="../assets/img/gift.png" @click="toregister" />
		<div class="blank">
			<div class="userbtm">
				<img v-bind:src="info.icon" />
				<div class="btmname">{{info.userName}}</div>
				<div style="clear: both;"></div>
			</div>
			<div class="intro">
				商品简介：{{info.productDetailslice}}<span class='showmore' @click="detailbox=true">查看更多></span>
			</div>
			<div class="bottom">
				<input class="comtext" type="text" placeholder="    说点什么 ~ " />
				<img class="firstimg" src="../assets/img/build.png" @click="toregister" />
				<img class="otherimg" src="../assets/img/good.png" @click="toregister" />
				<img class="otherimg" src="../assets/img/comment.png" @click="commentbox=true" />
				<img class="otherimg" src="../assets/img/share.png" @click="toregister" />
				<div class='totalnum num1'>{{info.dianzanNum}}</div>
				<div class='totalnum num2'>{{info.commentNum}}</div>
			</div>
		</div>
		<div v-show="detailbox" class="detailbox">
			<div class="box-top">
				详情
				<img src="../assets/img/close.png" @click="detailbox=false" />
			</div>
			<div class="user" style="width: 100%;margin-top: 15px;">
				<img v-bind:src="info.icon" />
				<div class="username">
					<p class='p1 p3'>{{info.userName}}</p>
					<p class="p2 p4">{{showtime}}<span style="margin-left: 10px;">{{info.explainInfo}}</span></p>
				</div>
				<div style="clear: both;"></div>
			</div>
			<p class="proname">{{info.productName}}</p>
			<div style="margin-left: 7px;line-height: 21px;">{{info.productDetail}}</div>
		</div>
		<div v-show="commentbox" class="commentbox">
			<div class="cotop">
				<img src="../assets/img/fanhui@3x.png" @click="commentbox=false" />
				评论</div>
			<div class="comdiv">
				<div class="listdiv" v-for="(item,index) in commentlist" :key=index>
					<img v-bind:src="item.icon" />
					<div v-bind:class=[gradeclass,gradeclass+item.grade]></div>
					<div class="listname">
						<p class='listp1'>{{item.userName}} <span style="color:rgba(153,153,153,1);">{{showtime}}</span></p>
						<p class="listp2">{{item.content}}</p>
					</div>
					<div class="zanicon">
						<img src="../assets/img/zan.png" /><span style="margin-left: 5px;">{{item.dianZanNum}}</span>
					</div>
					<div v-if="index>0" class="listborder"></div>
				</div>
			</div>
			<input class="comtext1" type="text" placeholder="    说点什么 ~ " />
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
			return {
				username: 'username',
				classa: true,
				gradeclass: 'gradeclass',
				link: '',
				info: {
					productDetail: '',
					productDetailslice: '',
					area: ''
				},
				showtime: '',
				showtime1: '',
				detailbox: false,
				commentbox: false,
				commentlist: [],
				videoPic: '',
				videourl: '',
				flag: false,
				pId: '',
				userId: '',
				imglist:[]
			};
		},
		created() {
			pId = this.$route.query.pId;
			userId = this.$route.query.userId;
			this.initFormatter();
		},
		mounted() {
			var mySwiper = new Swiper('.swiper-container', {
				observer: true //修改swiper自己或子元素时，自动初始化swiper
				// 			observeParents:true,//修改swiper的父元素时，自动初始化swiper
				// 			loop: true, // 循环模式选项
			});
			this.getdata();
		},
		methods: {
			getdata() {
				axios
					.get('/api/auction/judge/sys/getProductDetailInfo', {
						params: {
							pId: pId,
							userId: userId
						}
					})
					.then(response => {
						var res = response.data;
						// this.yhlbmktablePageData = res.data;
						if (res.code == 200) {
							this.info = res.data;
							if (this.info.area) {
								this.classa = false
							}
							if (this.info.productDetail.length >= 29) {
								this.info.productDetailslice = this.info.productDetail.slice(0, 28)
							} else {
								this.info.productDetailslice = this.info.productDetail
							}
							this.showtime = new Date(this.info.pushTime).Format('MM-dd hh:mm:ss');
							if(res.data.pic){
								var str = res.data.pic;
								str = str.substring(0, str.lastIndexOf(','));
								this.imglist = str.split(',');
							}
							if (res.data.videoUrl) {
								this.flag = true;
								this.videourl = res.data.videoUrl;
							}
							
						}
					})
					.catch(error => {
						console.log(error);
					});
				axios
					.get('/api/auction/judge/sys/getProHistoryComment', {
						params: {
							pId: pId,
							userId: userId
						}
					})
					.then(response => {
						var res = response.data;
						// this.yhlbmktablePageData = res.data;
						if (res.code == 200) {
							this.commentlist = res.data;
							console.log(this.commentlist);
							this.showtime1 = new Date(this.commentlist.createTime).Format(
								'MM-dd hh:mm:ss'
							);
						}
					})
					.catch(error => {
						console.log(error);
					});
			},
			initFormatter() {
				Date.prototype.Format = function(fmt) {
					//
					let o = {
						'M+': this.getMonth() + 1, //月份
						'd+': this.getDate(), //日
						'h+': this.getHours(), //小时
						'm+': this.getMinutes(), //分
						's+': this.getSeconds(), //秒
						'q+': Math.floor((this.getMonth() + 3) / 3), //季度
						S: this.getMilliseconds() //毫秒
					};
					if (/(y+)/.test(fmt))
						fmt = fmt.replace(
							RegExp.$1,
							(this.getFullYear() + '').substr(4 - RegExp.$1.length)
						);
					for (var k in o)
						if (new RegExp('(' + k + ')').test(fmt))
							fmt = fmt.replace(
								RegExp.$1,
								RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
							);
					return fmt;
				};
			},
			toregister() {
				this.$router.push({
					path: '/register'
				});
			}
		}
	};
	$(function() {
		// 			Util.post('/auction/product/init', params).then(function (res) {
		// 		if (res && res.code == 0) {
		// 			return res.data;
		// 		} else {
		// 			return res.msg;
		// 		}
		// 	})
		axios
			.get('/api/auction/judge/sys/getProductDetailInfo', {
				params: {
					pId: pId,
					userId: userId
				}
			})
			.then(response => {
				var res = response.data;
				// this.yhlbmktablePageData = res.data;
				if (res.code == 200) {
					var datas = res.data;
					var arri = [];
					var comment = datas.comments;
					for (let i = 0; i < comment.length; i++) {
						var item = {};
						if (i % 3 == 0) {
							item.top = 10;
						} else if (i % 2 == 0) {
							item.top = 40;
						} else {
							item.top = 70;
						}
						item.img = comment[i].icon;
						item.info = comment[i].content;
						arri.push(item);
					}
					var timer;
					var index = 0;
					timer = setInterval(function() {
						if (index >= arri.length) {
							clearInterval(timer);
						} else {
							$('.danmu').barrager(arri[index]);
						}
						index++;
					}, 800);
				}
			})
			.catch(error => {
				console.log(error);
			});
	});
</script>
