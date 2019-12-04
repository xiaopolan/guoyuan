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
	.viptop{
		height: 219px;
		width: 100%;
		background: url(../assets/img/viptop.png) no-repeat no-repeat;
		background-size: 100% 100%;
		padding-top: 78px;
	}
	.vipicon{
		height: 66px;
		width: 76px;
		background: url(../assets/img/vipicon.png) no-repeat no-repeat;
		background-size: 100% 100%;
		margin: 0 auto;
	}
	.vipdetail{
		height: 200px;
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
		font-size:12px;
		font-family:MicrosoftYaHei;
		color:rgba(51,51,51,1);
		line-height:20px;
		margin-bottom: 10px;
		font-weight: bold;
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
	.gradeline{
		width: 300px;
		height: 14px;
		margin: 20px auto 0 auto;
		position: relative;
	}
	.gradeline>div{
		float: left;
	}
	.vipnum{
		height: 14px;
		width: 20px;
		background: url(../assets/img/vipbox.png) no-repeat no-repeat;
		background-size: 100% 100%;
		font-size:12px;
		font-family:STZhongsong;
		font-weight:bold;
		font-style:italic;
		color:rgba(255,255,255,1);
		line-height: 14px;
		text-align: center;
	}
	.vipgress{
		width: 260px;
		height: 5px;
		background:rgba(187,152,103,1);
		opacity:0.4;
		border-radius:3px;
		margin-top: 4px;
	}
	.vipgress1{
		height:5px;
		background:rgba(172,138,91,1);
		border-radius:3px;
		position: absolute;
		top: 4px;
		left: 20px;
	}
	.jifentext{
		width: 100%;
		text-align: center;
		font-family:PingFang SC;
		font-size: 12px;
		font-weight:500;
		color:rgba(124,98,63,1);
	}
</style>
<template>
    <div class="vipBox">
		<div class="viptop">
			<div class="vipicon"></div>
			<div class="nowtext">当前等级</div>
			<div class="gradeline">
				<div class="vipnum">V{{grade}}</div>
				<div class="vipgress"></div>
				<div v-if="grade==5" class="vipnum" style="color:rgba(235,210,153,1);">V5</div>
				<div v-else class="vipnum" style="color:rgba(235,210,153,1);">V{{grade+1}}</div>
				<div class="vipgress1" :style="'width:'+ 260*integral/nextCountNum +'px;'"></div>
			</div>
			<div v-if="integral>50000" class="jifentext">积分值：{{integral}}/max</div>
			<div v-else class="jifentext">积分值：{{integral}}/{{nextCountNum}}</div>
		</div>
		<div class='vipdetail'>
			<div class="vipline">
				<p class="viptext">会员等级说明</p>
			</div>
			<ol>
				<li class="viptextd">1. 当前留存ARTC影响用户等级、等级越高权益越大。</li>
				<li class="viptextd">2. 用户等级由系统自动判定、无需申请。</li>
			</ol>
		</div>
		<div class="vipfenge"></div>
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
</template>
<script>
import axios from 'axios'
export default {
    name: "result",
    components: {},
    data() {
        return {
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
			grade:'',
			integral:'',
			userId:'',
			nextCountNum:'',
			jflimit:''
        };
    },
    created() {
		this.userId=this.$route.query.userId
		this.getlist();
		this.getvip();
		this.showlist()
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
							 userId: this.userId, 
						 }}).then(response => {
				var res = response.data;
				if (res.code == 200) {
					this.grade=res.data.grade
					this.integral=res.data.integral
					this.nextCountNum=res.data.nextCountNum
				}
			})
			.catch(error => {
					console.log(error);
			});
		}
		
    }
};
</script>
