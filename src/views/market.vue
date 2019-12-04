<!-- 市场统计 -->
<style scoped>
	body, div, ul, li, ol, h1, h2, h3, h4, h5, h6, input, textarea, select, p, dl, dt, dd, a, img, button, form, table, th, tr, td, tbody, article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {
		margin: 0;
		padding: 0;
	}
	.mainBox{
		width: 100%;
		height: 100%;
		background: #FFFFFF;
	}
	.user{
		height: 2.02rem;
		width: 100%;
		background:url(../assets/img/market.png) no-repeat no-repeat;
		background-size: 100% 100%;
		padding-top: 0.53rem;
		padding-left: 0.18rem;
	}
	.userbox{
		height: 0.42rem;
		line-height: 0.42rem;
	}
	.userbox img{
		height: 0.42rem;
		width: 0.42rem;
		border-radius:50%;
		float: left;
	}
	.username{
		font-size:0.17rem;
		font-weight:bold;
		color:rgba(255,255,255,1);
		margin-left: 0.12rem;
		font-family:PingFang SC;
		float:left
	}
	.fenlei{
		width: 100%;
		height: 2.81rem;
		background:url(../assets/img/box1.png) no-repeat no-repeat;
		background-position: center center;
		background-size: contain;
		position: absolute;
		top: 1.43rem;
		left: 0;
		padding-top: 0.07rem;
	}
	.titlebox{
		width: 2.34rem;
		height: 0.33rem;
		background:url(../assets/img/titlebox.png) no-repeat no-repeat;
		background-size: 100% 100%;
		margin: 0 auto;
		font-size:0.14rem;
		font-weight:bold;
		color:rgba(255,255,255,1);
		font-family:PingFang SC;
		text-align: center;
		line-height: 0.33rem;
	}
	.box{
		width:1.2rem;
		height:0.18rem;
		background:linear-gradient(270deg,rgba(253,186,109,1) 0%,rgba(254,95,91,1) 100%);
		border-radius:0.09rem;
		line-height: 0.18rem;
		text-align: center;
		font-size:0.12rem;
		font-family:Microsoft YaHei;
		font-weight:400;
		color:rgba(255,255,255,1);
		position: absolute;
		top: 0.6rem;
		left: 1.27rem;
	}
	.box1{
		width:1.63rem;
		height:0.45rem;
		background:rgba(255,255,255,1);
		box-shadow:0 0 0.05rem 0 rgba(248, 91, 103, 0.35);
		border-radius:0.21rem;
		margin:0.3rem auto 0;
		line-height: 0.55rem;
		text-align: center;
		font-size:0.2rem;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(251,84,82,1);
	}
	.boxgroup{
		height: 0.5rem;
		width: 100%;
		padding: 0 0.4rem;
		margin-top: 0.21rem;
	}
	.boxgroup div{
		float: left;
		width: 1.3rem;
		height: 0.5rem;
		background:url(../assets/img/box3.png) no-repeat no-repeat;
		background-size: 100% 100%;
		text-align: center;
	}
	.boxp1{
		font-size:0.11rem;
		font-family:Microsoft YaHei;
		font-weight:400;
		color:rgba(102,102,102,1);
		margin-top: 0.05rem;
	}
	.boxp2{
		font-size:0.15rem;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(248,103,91,1);
	}
	.chart{
		position: absolute;
		top: 4.25rem;
		width: 100%;
		height: 5.56rem;
		background:url(../assets/img/box2.png) no-repeat no-repeat;
		background-size: 100% 100%;
		padding-top: 0.07rem;
	}
	.title15{
		margin-top: 0.24rem;
		width: 100%;
		height: auto;
		padding: 0 0.32rem;
		font-size:0.12rem;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(51,51,51,1);
	}
	.title15 div{
		float: left;
	}
	.dian{
		width: 0.06rem;
		height: 0.06rem;
		background:rgba(237,48,51,1);
		border-radius:50%;
		margin-top: 0.07rem;
	}
	.echartsBox{
		position: relative;
		.echarts{

		}
		.unitXaxis{
			position: absolute;
			right: 2%;
			bottom: 0.1rem;
		}
		.legendSelf{
			position: absolute;
			left: 50%;
			top: 0;
			transform: translateX(-50%);
			.checkbox_div{
				span{
					float: left;
					user-select:none;
				}
				.sp_bg{
					width:0.14rem;
					height:0.14rem;
					margin-right: 0.08rem;
				}
				.sp_text{
					font-size: 0.14rem;
					line-height: 0.14rem;
				}
			}
		}
	}
</style>
<template>
    <div class="mainBox">
		<div class="user">
			<div class="userbox">
				<img v-bind:src="icon"/>
				<div class="username">{{userName}}</div>
			</div>
		</div>
		<div class="fenlei">
			<div class="titlebox">统计详情</div>
			<div class="box">家族总计付费金额</div>
			<div class="box1">{{familyMoneyTotal}}元</div>
			<div class="boxgroup">
				<div class="box2">
					<p class="boxp1">直接邀请用户</p>
					<p class="boxp2">{{invitationNum}}人</p>
				</div>
				<div class="box2" style="margin-left: 0.35rem;">
					<p class="boxp1">家族成员统计</p>
					<p class="boxp2">{{familyUserNum}}人</p>
				</div>
			</div>
			<div class="boxgroup">
				<div class="box2">
					<p class="boxp1">邀请用户注册奖励</p>
					<p class="boxp2">{{invitationReward}}ARTC</p>
				</div>
				<div class="box2" style="margin-left: 0.35rem;">
					<p class="boxp1">获得二级返利</p>
					<p class="boxp2">{{levelRebate}}ARTC</p>
				</div>
			</div>
		</div>
		<div class="chart">
			<div class="titlebox">15日曲线图展示</div>
			<div class="title15">
				<div class="dian"></div>
				<div style="margin-left: 0.1rem;">15日新增用户曲线图</div>
			</div>
			<div class="echartsBox">
				<!-- echarts图 -->
				<div 
						class="echarts" 
						id="lsltjEChartsLine"
						:style="{width: '95%', height: '1.8rem',margin:'0.6rem auto 0'}"
				></div>
			</div>
			<div class="title15">
				<div class="dian"></div>
				<div style="margin-left: 0.1rem;">15日家族付费金额曲线图</div>
			</div>
			<div class="echartsBox">
				<!-- echarts图 -->
				<div 
						class="echarts" 
						id="familyEChartsLine"
						:style="{width: '95%', height: '1.8rem',margin:'0.6rem auto 0'}"
				></div>
			</div>
		</div>
    </div>
</template>
<script>
import Util from "@/libs/util";
import axios from 'axios'
import url from '../assets/img/userHead.png'
export default {
    name: "result",
    components: {},
    data() {
        return {
					userId:'',
					invitationNum:'',
					familyUserNum:'',
					invitationReward:'',
					familyMoneyTotal:'',
					levelRebate:'',
					userName:'',
					icon:url
        };
    },
    created() {
			this.userId=this.$route.query.userId
			this.getlist();
			this.initFormatter()
    },
	mounted() {
			
	},
    methods: {
		getlist(){
			var params = {
				userId:this.userId
			};
			axios.get('/api/auction/markCount/sys/getPageList',{params}).then(response => {
				let res = response.data;
				if (res.code == 200) {
					this.invitationNum=res.data.invitationNum
					this.familyUserNum=res.data.familyUserNum
					this.invitationReward=res.data.invitationReward
					this.familyMoneyTotal=res.data.familyMoneyTotal
					this.levelRebate=res.data.levelRebate
					this.userName=res.data.userName
					if(res.data.icon){
						this.icon=res.data.icon
					}
				
					let res1=res.data.countNewUsers;
					let lsltjXAxisData = []; // x轴数据
					let lsltjLossRate = []; // 金额
					for(let i = 0; i<res1.length;i++){
						// 七天同比提现
						let data=new Date(parseInt(res1[i].key)).Format('yyyy-MM-dd hh:mm:ss')
						lsltjXAxisData[i] = data.substring(8,10); // 日期去掉年份
						lsltjLossRate[i] = parseInt(res1[i].value); // 金额
					}
					let lsltjSeriesData = [
						{
							name:'',
							data:lsltjLossRate
						}
					];
					// 绘制折线图
					this.drawLine('lsltj',lsltjSeriesData,lsltjXAxisData);
					
					//家族
					let res2=res.data.countFamilyMoneys;
					let familyx = []; // x轴数据
					let familyvalue = []; // 金额
					for(let i = 0; i<res2.length;i++){
						// 七天同比提现
						let data=new Date(parseInt(res2[i].key)).Format('yyyy-MM-dd hh:mm:ss')
						familyx[i] = data.substring(8,10); // 日期去掉年份
						familyvalue[i] = parseInt(res2[i].value); // 金额
					}
					let familydata = [
						{
							name:'',
							data:familyvalue
						}
					];
					this.drawLine('family',familydata,familyx);
				}
			})
			.catch(error => {
					console.log(error);
			});
		},
		// 绘制折线图
		drawLine(divName, seriesData, xAxisData){
			// divId：div的id  seriesData：折线数据   xAxisData：x轴数据
			this[divName+"EchartsObj"] = this.$echarts.init(document.getElementById(divName+"EChartsLine"));
			// 颜色
			var color = ['#ED3033', '#FF8000'];
			// 折线数据
			var series = [];
			// 自定义样式的图例数据数组
			var legendDataArr = [];
			// echarts图例数据
			var legendData = [];
			var tool={}
			if(divName=="lsltj"){
				for(var i=0;i<seriesData.length;i++){
					var obj = seriesData[i];
					legendDataArr[i] = {};
					legendDataArr[i].name = seriesData[i].name;
					legendDataArr[i].color = color[i];
					legendData[i]= seriesData[i].name;
					obj.type = 'line';
					obj.lineStyle={
						normal:{
							color:'#ED3033'
						}
					}
					obj.areaStyle={
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: "#ED3033" },
						{ offset: 1, color: "#FFA5A6" }
						])
					}
					}
					obj.smooth = true;//折线图改成曲线图
					series[i] = obj;
					tool={
						// trigger: 'axis'
						heigth:20,
						backgroundColor: '#E43737',
						borderRadius: 8,//边框圆角
						padding: [0,10,0,10],
						formatter: function(params, ticket, callback) {
								return params.value;
						}
					}
				}
			}else{
				for(var i=0;i<seriesData.length;i++){
					var obj = seriesData[i];
					legendDataArr[i] = {};
					legendDataArr[i].name = seriesData[i].name;
					legendDataArr[i].color = color[i];
					legendData[i]= seriesData[i].name;
					obj.type = 'line';
					obj.lineStyle={
						normal:{
							color:'#FF8000'
						}
					}
					obj.areaStyle={
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: "#FF8000" },
						{ offset: 1, color: "#FFF4EA" }
						])
					}
					}
					obj.smooth = true;//折线图改成曲线图
					series[i] = obj;
				}
				tool={
					// trigger: 'axis'
					heigth:20,
					backgroundColor: '#E43737',
					borderRadius: 4,//边框圆角
					padding: [0,10,0,10],
					formatter: function(params, ticket, callback) {
							return "￥"+params.value;
					}
				}
			}
			
			this[divName+"LegendData"] = legendDataArr;
			console.log(this[divName+"LegendData"]);
			// 指定图表的配置项和数据
			var option = {
				tooltip: tool,
				legend: {
					show:false,
					data: legendData,
				},
				grid: {
					left: '3%',
					right: '4%',
					top:'3%',
					bottom: '3%',
					containLabel: true
				},
				// toolbox: {
				//     feature: {
				//         saveAsImage: {}
				//     }
				// },
				xAxis: {
					type: 'category',
					"axisTick":{       //y轴刻度线
						"show":false
					},
					"splitLine": {     //网格线
						"show": true
					},
					axisLine: {
						lineStyle: {
							color: '#999', // 颜色
							width: 1 // 粗细
						}
					},
					// axisLabel:{'interval':0,rotate:40},//x轴旋转
					data: xAxisData
				},
				yAxis: {
					type: 'value',
					"axisTick":{       //y轴刻度线
						"show":true
					},
					"splitLine": {     //网格线
					  "show": false
					},
// 					axisLabel : {
// 						formatter: function(){
// 							  return "";
// 						}
// 					},
					axisLine: {
						lineStyle: {
							color: '#999', // 颜色
							width: 1 // 粗细
						}
					},
				},
				series: series,
				color: color
			};
			// 特殊处理
	//             if(divName == 'lsltj'){
	//                 option.tooltip.formatter = '{a0}：{c0}%';
	//             }
			// 使用刚指定的配置项和数据显示图表。
			this[divName+"EchartsObj"].setOption(option);
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
    }
};
</script>
