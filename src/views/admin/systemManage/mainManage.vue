<!-- 用户数据页 -->
<style lang="less" scoped>
.itemBox_yhsjlb {
    .remark_box{
        h3{
            display: inline-block;
        }
        p{
            display: inline-block;
        }
        .yhsjlb_slbox {
            float: right;
            margin-right: 40px;
            span {
                margin-right: 8px;
            }
        }
    }
    
}
.itemBox_lsltj,.itemBox_czyhtj,.itemBox_hyyhtj,.itemBox_xzyhtj,.itemBox_sbblt {
    .remark_box{
        font-size: 14px;
        color: #495060;
        font-weight: bold;
        .col_sp_left{
            margin-left: 40px;
        }
        .title_itembox{
            display: inline-block;
            font-size: 16px;
            font-weight: bold;
            color: #495060;
			margin-left: 10px;
        }
        .p_title_small{
            display: inline-block;
            margin-left: 5px;
            font-size: 12px;
            font-weight: normal;
            color: #495060;
        }
        .col_sp_right{
            margin-right: 40px;
        }
    }
    .tablepage_box{
        padding-bottom: 20px;
        .echartsBox{
            position: relative;
            .echarts{

            }
            .unitXaxis{
                position: absolute;
                right: 2%;
                bottom: 10px;
            }
            .legendSelf{
                position: absolute;
                left: 50%;
                top: 0px;
                // bottom: -60px;
                transform: translateX(-50%);
                .checkbox_div{
                    span{
                        float: left;
                        user-select:none;
                    }
                    .sp_bg{
                        width:14px;
                        height:14px;
                        margin-right: 8px;
                    }
                    .sp_text{
                        font-size: 14px;
                        line-height: 14px;
                    }
                }
            }
        }
    }
}
.itemBox_sbblt{
    .remark_box{
        .title_itembox{
            font-size: 16px;
            font-weight: bold;
            color: #495060;
        }
    }
    .tablepage_box{
        .sbblt_main{
            padding: 40px 5%;
            .sbblt_left{
                float: left;
                width: 35%;
                .echartsBox{

                }
            }
            .sbblt_right{
                float: left;
                width: 65%;
                height: 300px;
                display: flex;
                align-items: center;
                .item_sbbltBox{
                    width: 100%;
                    .sbblt_right_item{
                        float: left;
                        width: 100%;
                        .equipment_name{
                            float: left;
                            width: 30%;
                            line-height: 36px;
                            text-align: right;
                            padding-right: 16px;
                        }
                        .equipment_info{
                            float: left;
                            width: 60%;
                            height: 36px;
                            position: relative;
                            .equipment_color{
                                float: left;
                                width: 70%;
                                height: 24px;
                                margin-top: 6px;
                            }
                            .equipment_num{
                                position: absolute;
                                top: 0%;
                                left: 70%;
                                padding-left: 10px;
                                line-height: 36px;
                            }
                        }
                    }
                }
                
            }
        }
    }
}
</style>
<style lang="less">
.echartsBox{
    .legendSelf{
        .checkbox_div{
            .ivu-checkbox{
                float: left;
                margin-right: 3px; 
            }
            .ivu-checkbox-wrapper{
                font-size: 14px;
            }
        }
    }
}
.numjifen{
	color:red;
	margin-right: 10px;
}
</style>
<template>
    <div class="tabsBox_style">
        <Tabs type="card">
            <!-- 用户流失统计 -->
            <TabPane label="昨日积分概览">
                <!-- 七天同比提现金额 -->
                <div class="itemBox itemBox_lsltj">
                    <div class="remark_box">
						<Row>
							<Col span="24" style="textAlign:center; border:2px solid #EEEEEE">
								<div class="title_itembox">平台总积分数：<span class="numjifen">{{integralSum}}</span></div>
								<div class="title_itembox">返利比例：<span class="numjifen">{{returnRatio}}</span></div>
								<div class="title_itembox">返利金额：<span class="numjifen">{{returnAmount}}</span></div>
								<div class="title_itembox">提现金额：<span class="numjifen">{{tixianAmount}}</span></div>
							</Col>
						</Row>
                        <Row style="margin-top: 20px;">
                            <Col span="24" style="textAlign:center;">
                                <div class="title_itembox">七天同比提现金额</div>
                            </Col>
                        </Row>
                    </div>
                    <div class="tablepage_box" style="paddingTop:25px;">
                        <!-- echarts容器 -->
                        <div class="echartsBox">
                            <!-- echarts图 -->
                            <div 
                                class="echarts" 
                                id="lsltjEChartsLine"
                                :style="{width: '98%', height: '350px'}"
                            ></div>
                            <!-- 单位 -->
                            <div class="unitXaxis">日期</div>
                        </div>
                    </div>
                </div>
                <!-- 七天同比返利金额 -->
                <div class="itemBox itemBox_lsltj">
                    <div class="remark_box">
                        <Row>
                            <Col span="24" style="textAlign:center;">
                                <div class="title_itembox">七天同比返利金额</div>
                            </Col>
                        </Row>
                    </div>
                    <div class="tablepage_box" style="paddingTop:25px;">
                        <!-- echarts容器 -->
                        <div class="echartsBox">
                            <!-- echarts图 -->
                            <div 
                                class="echarts" 
                                id="lsyhtjEChartsLine"
                                :style="{width: '98%', height: '350px'}"
                            ></div>
                            <!-- 单位 -->
                            <div class="unitXaxis">日期</div>
                        </div>
                    </div>
                </div>
            </TabPane>
            <!-- 今日订单概览 -->
            <TabPane label="今日订单概览">
				<div class="itemBox itemBox_sbblt">
					<div class="remark_box">
						<Row>
							<Col span="24" style="textAlign:center; border:2px solid #EEEEEE">
								<div class="title_itembox">订单数：<span class="numjifen">{{orderNum}}</span></div>
								<div class="title_itembox">订单总金额：<span class="numjifen">{{orderAmountSum}}</span></div>
							</Col>
						</Row>
						<Row>
							<Col span="24" style="textAlign:center;margin-top: 20px;">
								<div class="title_itembox">按竞拍档次分类</div>
							</Col>
						</Row>
					</div>
					<div class="tablepage_box">
						<div class="sbblt_main clearfix">
							<div class="sbblt_left">
								<div 
									class="echartsBox"
									id="sbbltEChartsPie"
									:style="{width: '100%', height: '300px'}"
								></div>
							</div>
							<div class="sbblt_right">
								<div class="item_sbbltBox clearfix">
									<div class="sbblt_right_item" v-for="(item,index) in sbbltApiData" :key="index">
										<div class="equipment_name">{{item.name}}</div>
										<div class="equipment_info">
											<div class="equipment_color" :style="{width:item.percent+'%',background:item.bgcolor}"></div>
											<div class="equipment_num" :style="{left:item.percent+'%'}">{{item.value}}</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
                <div class="itemBox itemBox_czyhtj">
                    <div class="remark_box">
                        <Row>
                            <Col span="8" style="textAlign:center;height:30px"></Col>
                            <Col span="8" style="textAlign:center;">
                                <div class="title_itembox">七天同比订单数</div>
                            </Col>
                        </Row>
                    </div>
                    <div class="tablepage_box" style="paddingTop:25px;">
                        <!-- echarts容器 -->
                        <div class="echartsBox">
                            <!-- echarts图 -->
                            <div 
                                class="echarts" 
                                id="czyhtjEChartsLine"
                                :style="{width: '98%', height: '350px'}"
                            ></div>
                            <!-- 单位 -->
                            <div class="unitXaxis">{{czyhtjUnit}}</div>
                        </div>
                    </div>
                </div>
            </TabPane>
            <!-- 今日用户概览 -->
            <TabPane label="今日用户概览">
				<!-- 注意样式 itemBox_sbblt -->
                <div class="itemBox itemBox_sbblt">
                    <div class="remark_box">
                        <Row>
                        	<Col span="24" style="textAlign:center; border:2px solid #EEEEEE">
                        		<div class="title_itembox">用户总数：<span class="numjifen">{{userSumNum}}</span></div>
                        		<div class="title_itembox">今日新增用户数：<span class="numjifen">{{addUserNum}}</span></div>
                        	</Col>
                        </Row>
                        <Row>
                        	<Col span="24" style="textAlign:center;margin-top: 20px;">
                        		<div class="title_itembox">今日用户概览</div>
                        	</Col>
                        </Row>
                    </div>
					<div class="tablepage_box">
						<div class="sbblt_main clearfix">
							<div class="sbblt_left">
								<div 
									class="echartsBox"
									id="userEChartsPie"
									:style="{width: '100%', height: '300px'}"
								></div>
							</div>
							<div class="sbblt_right">
								<div class="item_sbbltBox clearfix">
									<div class="sbblt_right_item" v-for="(item,index) in userApiData" :key="index">
										<div class="equipment_name">{{item.name}}</div>
										<div class="equipment_info">
											<div class="equipment_color" :style="{width:item.percent+'%',background:item.bgcolor}"></div>
											<div class="equipment_num" :style="{left:item.percent+'%'}">{{item.value}}</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="itemBox itemBox_czyhtj">
						<div class="remark_box">
							<Row>
								<Col span="8" style="textAlign:center;height:30px"></Col>
								<Col span="8" style="textAlign:center;">
									<div class="title_itembox">七天同比新增用户数</div>
								</Col>
							</Row>
						</div>
						<div class="tablepage_box" style="paddingTop:25px;">
							<!-- echarts容器 -->
							<div class="echartsBox">
								<!-- echarts图 -->
								<div 
									class="echarts" 
									id="hyyhtjEChartsLine"
									:style="{width: '98%', height: '350px'}"
								></div>
								<!-- 单位 -->
								<div class="unitXaxis">{{hyyhtjUnit}}</div>
							</div>
						</div>
					</div>
                </div>
            </TabPane>
            <!-- 今日保证金概览 -->
            <TabPane label="今日保证金概览">
                <div class="itemBox itemBox_xzyhtj itemBox_sbblt">
                    <div class="remark_box">
                        <Row>
                        	<Col span="24" style="textAlign:center; border:2px solid #EEEEEE">
                        		<div class="title_itembox">保证金总额：<span class="numjifen">{{marginAmountSum}}</span></div>
                        	</Col>
                        </Row>
                        <Row>
                        	<Col span="24" style="textAlign:center;margin-top: 20px;">
                        		<div class="title_itembox">今日保证金概览</div>
                        	</Col>
                        </Row>
                    </div>
                    <div class="tablepage_box" style="paddingTop:25px;">
                        <!-- echarts容器 -->
                        <div class="echartsBox">
                            <!-- echarts图 -->
                            <div 
                                class="echarts" 
                                id="xzyhtjEChartsLine"
                                :style="{width: '98%', height: '350px'}"
                            ></div>
                            <div class="unitXaxis">{{xzyhtjUnit}}</div>
                        </div>
                    </div>
                </div>
            </TabPane>
        </Tabs>
    </div>
</template>
<script>
// 引入通用的库文件
import Util from "@/libs/util";
import axios from 'axios'
export default {
    name: "mainManage",
    data() {
        return {
            sbbltApiData: [], // 接口数据
            sbbltPieColor: ['#FF9900', '#E80000', '#196CF5', '#00E03F', '#00DDE0', '#B800E0'],   // 饼图颜色
			
			tixianAmount:'',
			returnRatio:'',
			returnAmount:'',
			integralSum:'',
			
			userApiData: [], // 接口数据
			
			orderNum:'',
			orderAmountSum:'',
			
			userSumNum:'',
			addUserNum:'',
			
			marginAmountSum:0
        };
    },
    created() {
        
    },
    mounted () {
        // 获取近15日用户流失数据（调用接口的）---接口
        this.getStatisticsData();
        // 获取用户设备统计数据
        //this.sbbltGetStatisticsData();
    },
    methods: {
        // 获取近15日用户流失数据（调用接口的）---接口
        getStatisticsData() {
			axios.get('/api/auction/mainPage/sys/integralOverview')
			.then( (response)=> {
				let json = response.data;
				let res=[]
				let res2=[]
				if (json.code == 200) {
					if (json.data == null) {
						res=[]
					} else {
						this.integralSum=json.data.integralSum
						this.returnAmount=json.data.returnAmount
						this.returnRatio=json.data.returnRatio
						this.tixianAmount=json.data.tixianAmount
						res=json.data.tixian7Day;
						res2=json.data.return7Day;
						// 七天同比提现
						let lsltjXAxisData = []; // x轴数据
						let lsltjLossRate = []; // 金额
			
						//  七天同比返利
						let fanlix = []; // x轴数据
						let fanliy = []; // 金额
						for(let i = 0; i<res.length;i++){
							// 七天同比提现
							lsltjXAxisData[i] = res[i].date.slice(4); // 日期去掉年份
							lsltjLossRate[i] = res[i].amount; // 金额
						}
						// 七天同比提现
						// 折线数据
						let lsltjSeriesData = [
							{
								name:'提现金额',
								data:lsltjLossRate
							}
						];
						// 绘制折线图
						this.drawLine('lsltj',lsltjSeriesData,lsltjXAxisData);
			
						// 七天同比返利
						for(let i = 0; i<res2.length;i++){
							// 七天同比提现
							fanlix[i] = res2[i].date.slice(4); // 日期去掉年份
							fanliy[i] = res2[i].amount; // 金额
						}
						// 折线数据
						let faliamount = [
							{
								name:'返利金额',
								data:fanliy
							}
						];
						
						// 绘制折线图
						this.drawLine('lsyhtj',faliamount,fanlix);
					}
				} else {
					res=[]
				}
			})
			.catch( (error)=> {
			console.log(error);
			});
            //订单
			axios.get('/api/auction/mainPage/sys/OrderOverview')
			.then( (response)=> {
				let json = response.data;
				let res=[]
				let res2=[]
				if (json.code == 200) {
					if (json.data == null) {
						res=[]
					} else {
						let fanlix = []; // x轴数据
						let fanliy = []; // 金额
						this.orderAmountSum=json.data.orderAmountSum
						this.orderNum=json.data.orderNum
						res=json.data.gradeOverviews;
						res2=json.data.orderNum7;
						// 七天同比订单
						for(let i = 0; i<res2.length;i++){
							// 七天同比提现
							fanlix[i] = res2[i].date.slice(4); // 日期去掉年份
							
							fanliy[i] = res2[i].orderNum; // 金额
						}
						// 折线数据
						let faliamount = [
							{
								name:'订单数',
								data:fanliy
							}
						];
						// 绘制折线图
						this.drawLine('czyhtj',faliamount,fanlix);
						this.sbbltGetStatisticsData(1,res)
					}
				} else {
					res=[]
				}
			})
			.catch( (error)=> {
			console.log(error);
			});
			//用户
			axios.get('/api/auction/mainPage/sys/userOverview')
			.then( (response)=> {
				let json = response.data;
				var res=[]
				var res2=[]
				if (json.code == 200) {
					if (json.data == null) {
						res=[]
					} else {
						this.userSumNum=json.data.userSumNum;
						this.addUserNum=json.data.addUserNum;
						
						let fanlix = []; // x轴数据
						let fanliy = []; // 金额
						res=json.data.userSysClass;
						res2=json.data.userNum7;
						// 七天同比订单
						for(let i = 0; i<res2.length;i++){
							// 七天同比提现
							fanlix[i] = res2[i].date.slice(4); // 日期去掉年份
							fanliy[i] = res2[i].addUserNum; // 金额
						}
						// 折线数据
						let faliamount = [
							{
								name:'用户数',
								data:fanliy
							}
						];
						// 绘制折线图
						this.drawLine('hyyhtj',faliamount,fanlix);
						this.sbbltGetStatisticsData(2,res)
					}
				} else {
					res=[]
				}
			})
			.catch( (error)=> {
			console.log(error);
			});
			//保证金
			axios.get('/api/auction/mainPage/sys/marginOverview')
			.then( (response)=> {
				let json = response.data;
				var res=[]
				var res2=[]
				if (json.code == 200) {
					if (json.data == null) {
						res=[]
					} else {
						this.marginAmountSum=json.data.marginAmountSum || 0;
						
						let fanlix = []; // x轴数据
						let fanliy = []; // 金额
						res=json.data.userSysClass;
						res2=json.data.margin7DayList;
						// 七天同比订单
						for(let i = 0; i<res2.length;i++){
							// 七天同比提现
							fanlix[i] = res2[i].date.slice(5); // 日期去掉年份
							fanliy[i] = res2[i].marginAmount; // 金额
						}
						// 折线数据
						let faliamount = [
							{
								name:'保证金',
								data:fanliy
							}
						];
						// 绘制折线图
						this.drawLine('xzyhtj',faliamount,fanlix);
					}
				} else {
					res=[]
				}
			})
			.catch( (error)=> {
			console.log(error);
			});
        },
        // 绘制折线图
        drawLine(divName, seriesData, xAxisData){
            // divId：div的id  seriesData：折线数据   xAxisData：x轴数据
            this[divName+"EchartsObj"] = this.$echarts.init(document.getElementById(divName+"EChartsLine"));
            // 颜色
            var color = ['#FF0000', '#00FFFF', '#99FF33', '#FFCD03'];
            // 折线数据
            var series = [];
            // 自定义样式的图例数据数组
            var legendDataArr = [];
            // echarts图例数据
            var legendData = [];
            for(var i=0;i<seriesData.length;i++){
                var obj = seriesData[i];
                legendDataArr[i] = {};
                legendDataArr[i].name = seriesData[i].name;
                legendDataArr[i].color = color[i];
                legendData[i]= seriesData[i].name;
                obj.type = 'line';
								// obj.smooth = true;//折线图改成曲线图
                series[i] = obj;
            }
            this[divName+"LegendData"] = legendDataArr;
            console.log(this[divName+"LegendData"]);
            // 指定图表的配置项和数据
            var option = {
                tooltip: {
                    trigger: 'axis'
                },
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
                    data: xAxisData
                },
                yAxis: {
                    type: 'value'
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
        // 图例的复选框发生变化
        legendShowChange(event,divName,name){
            // x：变化的值   name：图例的name
            // 调用echarts的api，切换图例状态
            this[divName+'EchartsObj'].dispatchAction({
                type: 'legendToggleSelect',
                // 图例名称
                name: name
            });
        },
        // 折线图数据设置
        lineDataSet(divName, dataName, lineData){
            // divName：div名字（echarts对象名字）  dataName：数据内容的名字    lineData：折线图数据
            var xAxisData = []; // x轴数据
            var yAxisData = []; // y轴数据
            for(var i = 0; i<lineData.length;i++){
                xAxisData[i] = lineData[i].key; // x轴
                yAxisData[i] = lineData[i].value; // y轴
            }
            // 折线数据
            var seriesData = [
                {
                    name: dataName,
                    data: yAxisData
                }
            ];
            // 绘制折线图
            this.drawLine(divName, seriesData, xAxisData);
        },
        // 饼状图
        sbbltGetStatisticsData(flag,res){
            // api数据---比例图右侧需要用
            let apiData = res;
            let mixNum = res[0].value; // 最大的设备量
						for(let i=1; i<res.length; i++){
							if(res[i].value > mixNum){
								mixNum = res[i].value;
							}
						}
            for(let i=0;i<apiData.length;i++){
                apiData[i].bgcolor = this.sbbltPieColor[i];
                apiData[i].percent = Math.floor((apiData[i].value/mixNum)*100);
            }
            
            // 饼图数据
			
            let pieEChartsData = res;
            // 绘制饼图
           
						if(flag==1){
							this.sbbltApiData = apiData;
							this.drawPie('sbblt', pieEChartsData, this.sbbltPieColor);
						}
						if(flag==2){
							this.userApiData = apiData;
							this.drawPie('user', pieEChartsData, this.sbbltPieColor);
						}
        },
        // 绘制饼图
        drawPie(divName, pieDate, color){
            this[divName+'EChartsObj'] = this.$echarts.init(document.getElementById(divName+'EChartsPie'));//根据id找到对应的饼图
            // 饼图数据
            var series = [];
            for(var i=0;i<pieDate.length;i++){
                series[i] = pieDate[i];
            }
            // 指定图表的配置项和数据
            var option = {
                tooltip : {
                    trigger: 'item',
                    formatter: "{b} : {c} ({d}%)"
                },
                series : [
                    {
                        name: divName+'比例图',
                        type: 'pie',
                        radius : '90%',
                        center: ['50%', '50%'],
                        data:series,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        },
                        
                        //标签
                        label: {
                            normal: {
                                show: true,
                                position: 'inside',
                                formatter: '{d}%',
                                textStyle : {                   
                                    align : 'center',
                                    baseline : 'middle',
                                    fontFamily : '微软雅黑',
                                    fontSize : 12,
                                }
                            },
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        }
                    }
                ],
                color:color
            };

            // 使用刚指定的配置项和数据显示图表。
            this[divName+'EChartsObj'].setOption(option);
        },
    }
};
</script>
