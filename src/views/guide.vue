<!-- 登录页 -->
<style scoped>
	body, div, ul, li, ol, h1, h2, h3, h4, h5, h6, input, textarea, select, p, dl, dt, dd, a, img, button, form, table, th, tr, td, tbody, article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {
		margin: 0;
		padding: 0;
	}
	.vipBox{
		width: 100%;
		height: 100%;
		background: #FFFFFF;
	}
	.vipdetail{
		padding:15px 10px 20px 10px;
	}
	.vipline{
		height: 24px;
		width: 231px;
		background: url(../assets/img/vipline.png) no-repeat no-repeat;
		background-size: 100% 4px;
		margin: 10px auto;
	}
	.viptext{
		text-align: center;
		font-size:14px;
		font-family:MicrosoftYaHei;
		color:rgba(196,160,110,1);
		line-height:2px;
	}
	.viptextd{
		font-size:14px;
		font-family:MicrosoftYaHei;
		color:rgba(51,51,51,1);
		line-height:20px;
		margin-bottom: 10px;
		font-weight: 500;
		text-indent: -14px;
		margin-left: 16px;
	}
	.vipfenge{
		height: 5px;
		width: 100%;
		background:rgba(196,160,110,0.14);
	}
	.vipdetail2{
		height: auto;
		padding:15px 15px 20px 15px;
	}
	.viptable{
		/* border: 1px solid #eee; */
		border-collapse: collapse;
		width: 100%;
		font-size: 10px;
		text-align: center;
		word-break:break-all; word-wrap:break-word; table-layout:fixed; 
		color:rgba(102,102,102,1);
	}
	td{
		border: 1px solid rgba(238,238,238,1);
	}
		
	th{
		
		border: 1px solid rgba(238,238,238,1);
	}
	.colortd{
		background:rgba(246,246,246,1);
	}
	.tabletd{
		width: 16%;
		height: 40px;
	}
	.firsttd{
		background:rgba(246,246,246,1);
		border: 1px solid rgba(238,238,238,1);
		font-weight: bold;
	}
	.tiplog{
		font-size:12px;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(153,153,153,1);
		line-height:21px;
		margin-top: 15px;
	}
	.nowtext{
		font-size:12px;
		font-family:Microsoft YaHei;
		font-weight:400;
		color:rgba(172,134,81,1);
		position: absolute;
		top: 132px;
		left: 20px;
	}
	.artctext{
		font-size:14px;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(51,51,51,1);
		line-height:21px;
		margin-top: 10px;
	}
	ul li {
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.tab-tilte{
		width: 100%;
		height: 45px;
	}
	.tab-tilte li{
		float: left;
		width: 33.3%;
		text-align: center;
		height: 45px;
		font-size: 14px;
		line-height: 45px;
		color: #999999;
		cursor: pointer;
		position: relative;
	}
 /* 点击对应的标题添加对应的背景颜色 */
	.tab-tilte .active{
		background:rgba(255,255,255,1);
		color: #333333;
		font-weight: bold;
		height: 45px;
	}
	.tab-tilte .active:after{
		content: '';
		height: 2px;
		position: absolute;
		top: 35px;
		left: 54px;
		width: 17px;
		border-top: 2px solid #ED3033;
	}
	.fgline{
		background: #eee;
		height: 10px;
		width: 100%;
	}
	.buy1{
		height: 260px;
		width: 329px;
		background: url(../assets/img/buy1.png) no-repeat no-repeat;
		background-size: 100% 100%;
		margin: 29px auto;
	}
	.buy2{
		height: 260px;
		width: 329px;
		background: url(../assets/img/buy2.png) no-repeat no-repeat;
		background-size: 100% 100%;
		margin: 11px auto;
	}
	.buy3{
		height: 229px;
		width: 329px;
		background: url(../assets/img/buy3.png) no-repeat no-repeat;
		background-size: 100% 100%;
		margin: 11px auto;
	}
	.sell1{
		height: 256px;
		width: 330px;
		background: url(../assets/img/sell1.png) no-repeat no-repeat;
		background-size: 100% 100%;
		margin: 29px auto;
	}
	.sell2{
		height: 266px;
		width: 329px;
		background: url(../assets/img/sell2.png) no-repeat no-repeat;
		background-size: 100% 100%;
		margin: 11px auto;
	}
	.sell3{
		height: 230px;
		width: 330px;
		background: url(../assets/img/sell3.png) no-repeat no-repeat;
		background-size: 100% 100%;
		margin: 11px auto;
	}
</style>
<template>
    <div class="vipBox">
		<ul class="tab-tilte">
			<li @click="cur=0" :class="{active:cur==0}">交易指南</li>
			<li @click="cur=1" :class="{active:cur==1}">购买路径图</li>
			<li @click="cur=2" :class="{active:cur==2}">出售路径图</li>
		</ul>
		<div class="fgline"></div>
		<div class="tab-content">
			<div v-show="cur==0">
				<div class='vipdetail'>
					<div class="artctext">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="font-weight: bold;">ARTC (ART CURRENCY)</span> 是由杭州幻世电子商务 有限公司限量发行的一款平台通证，在小牛趣拍内进行是由杭州幻世电子商务 有限公司限量发行的一款平台通证，在小牛趣拍内进行 交易或完成任务可获得，持有数量影响小牛趣拍用户等 级，可用于小牛趣拍内的交易与抽奖活动。</div>
					<div class="artctext">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="font-weight: bold;">ARTC</span>可通过完成新手任务，日常任务和打赏获得， 等级在V1及以上用户还可以通过购买获得。</div>
					<ol style="margin-top: 19px;">
						<li class="viptextd">1. 当前留存ARTC影响用户等级、等级越高权益越大。</li>
						<li class="viptextd">2. 用户等级由系统自动判定、无需申请。</li>
					</ol>
				</div>
				<div class='vipdetail2'>
					<div class="vipline">
						<p class="viptext">会员权益体系</p>
					</div>
					 <table class="viptable" >           
						<tr v-for="(item,index) in headerList" :key="index">
							<td class="colortd" style="width: 22%">{{item.value}}</td>
							<th class="tabletd" v-if='index==0' v-for="(items,indexs) in bodyList1" :key="indexs">V{{items.grade}}</th>
							<td class="tabletd" v-if='index==1' v-for="(items,indexs) in bodyList1" :key="indexs">
								<div>{{items.countNum}}</div>
							</td>
							<td class="tabletd" v-if='index==2' v-for="(items,indexs) in bodyList1" :key="indexs">{{items.integralScale}}</td>
							<td class="tabletd" v-if='index==3' v-for="(items,indexs) in bodyList1" :key="indexs">
								<div v-if="indexs==0">/</div>
								<div v-else>{{items.serverCharge*1000/10}}%</div>
							</td>
							<td class="tabletd" v-if='index==4' v-for="(items,indexs) in bodyList1" :key="indexs">
								<div v-if="indexs==0">/</div>
								<div v-else-if="indexs==1">500</div>
								<div v-else>{{items.countNum*jflimit}}</div>
							</td>
						</tr>
				    </table>
					<div class="tiplog">备注：自由交易下限为500ARTC。</div>
				</div>
			</div>
			<div v-show="cur==1">
				<div class="buy1"></div>
				<div class="buy2"></div>
				<div class="buy3"></div>
			</div>
			<div v-show="cur==2">
				<div class="sell1"></div>
				<div class="sell2"></div>
				<div class="sell3"></div>
			</div>
		</div>
		
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name: "result",
    components: {},
    data() {
        return {
			cur:0,
			headerList:[{
				value:"会员等级"
			},
			{
				value:"拥有ARTC数量"
			},
			{
				value:"获取ARTC比例(打赏，竞拍)"
			},
			{
				value:"寄售手续费"
			},
			{
				value:"每日寄售上限"
			},],
			bodyList:[],
			bodyList1:[],
			jflimit:''
        };
    },
    created() {
		this.getlist();
		this.getvip();
		this.showlist();
    },
	mounted() {
			
	},
    methods: {
		showlist() {
			axios
				.post('/api/auction/operate/sys/init')
				.then(response => {
					var res = response.data;
					var list20 = res.data.artc_transaction
					this.jflimit = list20[0].cdVal || '';
				})
				.catch(error => {
					console.log(error);
				});
		},
		getlist(){
			axios.get('/api/auction/member/sys/getList').then(response => {
				var res = response.data;
				if (res.code == 200) {
					if (res.data == null) {
						this.bodyList = [];
					} else {
						this.bodyList = res.data;
						let bodylists=[]
						// this.bodyList.shift()
						for (let i=0;i<this.bodyList.length;i++) {
							// if(i!=0){
								bodylists.push(this.bodyList[i])
							// }
						}
						this.bodyList1=bodylists
					}
				} else {
					this.bodyList = [];
				}
			})
			.catch(error => {
					console.log(error);
			});
		},
		getvip(){
			axios.get('/api/auction/member/sys/getMemberByUserId',{params:{
							 userId: '1001', 
						 }}).then(response => {
				var res = response.data;
				if (res.code == 200) {
					if (res.data == null) {
						this.bodyList = [];
					} else {
						this.bodyList = res.data;
					}
				} else {
					this.bodyList = [];
				}
			})
			.catch(error => {
					console.log(error);
			});
		}
		
    }
};
</script>
