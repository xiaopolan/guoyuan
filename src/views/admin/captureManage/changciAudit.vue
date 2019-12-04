<!-- 竞拍场次 -->
<style lang="less" scoped>
.yhtjBox {
    .remark_box {
        h3 {
            display: inline-block;
        }
        p {
            display: inline-block;
        }
    }
}
.yhlb_table {
    .selectBox {
        display: inline-block;
        vertical-align: middle;
        span {
            margin-right: 5px;
        }
    }
    .searchBox {
        display: inline-block;
        vertical-align: middle;
    }
}
.goodselect {
    width: 150px;
    height: 25px;
    color: #515a6e;
		border:none;
}
.mymodal .ivu-modal-body {
    padding: 0 16px 16px 16px;
}
</style>
<style lang="less">
.yhlb_table {
    .ivu-table-cell {
        padding-left: 10px;
        padding-right: 10px;
    }
}
.xuanze {
    display: inline-block;
    width: 200px;
    height: 32px;
    vertical-align: middle;
    border: 1px solid #dcdee2;
    border-radius: 4px;
    line-height: 32px;
    padding: 1px 7px;
}
.typeselect {
    width: 150px;
    height: 25px;
    border: 1px solid #dcdee2;
    border-radius: 4px;
    color: #515a6e;
}
.serchinput {
    width: 150px;
    height: 25px;
    border: 1px solid #dcdee2;
    border-radius: 4px;
    color: #515a6e;
    padding: 1px 7px;
}
.serchinput-on {
    width: 60px !important;
}
.box-top {
    width: 100%;
    height: 10px;
    background: #ffffff;
}
.mygoods1 .ivu-modal {
    width: 1200px !important;
    max-height: 700px;
    overflow: scroll;
}
</style>

<template>
    <div class="tabsBox_style">
            <!-- 竞拍场次 -->
                <div class="itemBox yhlb_table">
                    <div class="remark_box">
                        <Row>
                            <Col span="4">
                                <h3>竞拍场次</h3>
                            </Col>
							<Col span="4">
									<i-select v-model="model3" placeholder='请选择竞拍档次'>
											<i-option >全部</i-option>
											<i-option v-for="item in ccidlist" :value="item.id">{{ item.auctionGradeName }}</i-option>
									</i-select>
							</Col>
							<Col span="4" style="margin-left: 10px;">
									<i-select v-model="model4" placeholder='请选择生成类型'>
											<i-option >全部</i-option>
											<i-option v-for="item in typelist" :value="item.id">{{ item.name }}</i-option>
									</i-select>
							</Col>
                            <Col span="10" style="textAlign:center;">
                                <div class="searchBox clearfix">
                                    <Input
                                        v-model="searchname"
                                        size="small"
                                        placeholder="请输入商品名称"
                                        style="float:left;width: 200px"
                                    >
                                    </Input>
                                    <Button
                                        type="error"
                                        style="float:left;width:60px;marginLeft:20px;"
                                        size="small"
                                        @click="searchgoodName(1)"
                                    >查询</Button>
									<Button
										type="error"
										style="float:left;width:80px;marginLeft:20px;"
										size="small"
										@click="showchangci"
									>录入场次</Button>
									<Modal
										v-model="yhlbmkModal"
										title="录入场次"
										:loading="yhlbmkLoading"
										@on-ok="yhlbmkOk"
										@on-cancel="yhlbmkCancel"
									>
										<div style="marginBottom:10px;textAlign:center">
											<div
												style="display:inline-block;width:100px;textAlign:left"
											>
												<span style="color:red;"></span>商品名称：
											</div>
											<input class="xuanze" @click="setProduct" v-model="goodchoiced.productName" readonly="readonly"></input>
										</div>
										<div style="marginBottom:10px;textAlign:center">
											<div
												style="display:inline-block;width:100px;textAlign:left"
											>
												<span style="color:red;"></span>场次名称：
											</div>
											<Input
												v-model="yhlbmkAddObj.title"
												placeholder="请输入场次名称"
												style="width:200px"
											></Input>
										</div>
										<div style="marginBottom:10px;textAlign:center">
											<div
												style="display:inline-block;width:100px;textAlign:left"
											>
												<span style="color:red;"></span>是否加入机器人：
											</div>
											<RadioGroup v-model="robotStatus" @on-change="showrobot" style="width:200px;text-align: left;">
												<Radio :label="1">
													<span>是</span>
												</Radio>
												<Radio :label="0">
													<span>否</span>
												</Radio>
											</RadioGroup>
										</div>
										<div style="marginBottom:10px;textAlign:center" v-if="robot">
											<div
												style="display:inline-block;width:100px;textAlign:left"
											>
												<span style="color:red;"></span>机器人退出价格：
											</div>
											<Input
												v-model="yhlbmkAddObj.robotExitPrice"
												placeholder="请输入机器人退出价格"
												style="width:200px"
												type="number"
											></Input>
										</div>
										<div style="marginBottom:10px;textAlign:center" v-if="robot">
											<div
												style="display:inline-block;width:100px;textAlign:left"
											>每轮机器人数量：</div>
												<select name="public-choice" v-model="robotNum" class="typeselect" style="width: 200px;height: 32px;">                                        
													<option :value="item.groupType"  v-for="item in statusList" >{{item.groupName}}</option>                                    
												</select>
										</div>
										<div style="marginBottom:10px;textAlign:center">
											<div
												style="display:inline-block;width:100px;textAlign:left"
											>档次名称：</div>
												<select name="public-choice" v-model="model2" class="typeselect" style="width: 200px;height: 32px;">                                        
													<option :value="item.id"  v-for="item in ccidlist" >{{item.auctionGradeName}}</option>                                    
												</select>
										</div>
										<div style="marginBottom:10px;textAlign:center">
											<div
												style="display:inline-block;width:100px;textAlign:left"
											>起拍价：</div>
											<Input
												v-model="goodchoiced.productPrice"
												placeholder="请输入起拍价"
												style="width:200px"
												type="number"
											></Input>
										</div>
										<div style="marginBottom:10px;textAlign:center">
											<div
												style="display:inline-block;width:100px;textAlign:left"
											>加价：</div>
											<Input
												v-model="yhlbmkAddObj.incrementValue"
												placeholder="请输入每轮加价金额"
												style="width:200px"
												type="number"
											></Input>
										</div>
										<div style="marginBottom:10px;textAlign:center">
											<div
												style="display:inline-block;width:100px;textAlign:left"
											>开始时间：</div>
												<Date-picker :value="startValue" :options="startTimeOptions" v-modal="startValue"  @on-change="handleChange"  type="datetime" placeholder="选择日期和时间" style="width: 200px"></Date-picker>
										</div>
										<div style="marginBottom:10px;textAlign:center">
											<div
												style="display:inline-block;width:100px;textAlign:left"
											>结束时间：</div>
												<Date-picker  :value="endValue" :options="endTimeOptions" v-modal="endValue"  @on-change="handleChange1" type="datetime" placeholder="选择日期和时间" style="width: 200px"></Date-picker>
										</div>
										<div style="marginBottom:10px;textAlign:center">
											<div
												style="display:inline-block;width:100px;textAlign:left"
											>抢拍默认时长：</div>
											<Input
												v-model="yhlbmkAddObj.times"
												placeholder="请输入抢拍默认时长"
												style="width:200px"
												type="number"
											></Input>
										</div>
										<div style="marginBottom:10px;textAlign:center">
											<div
												style="display:inline-block;width:100px;textAlign:left"
											>等待默认时长：</div>
											<Input
												v-model="yhlbmkAddObj.wiat_time"
												placeholder="请输入等待默认时长"
												style="width:200px"
												type="number"
											></Input>
										</div>
										<div style="marginBottom:10px;textAlign:center">
											<div
												style="display:inline-block;width:100px;textAlign:left"
											>计算默认时长：</div>
											<Input
												v-model="yhlbmkAddObj.compute_time"
												placeholder="请输入计算默认时长"
												style="width:200px"
												type="number"
											></Input>
										</div>
										
									</Modal>
									<Modal
										v-model="updataTime"
										title="修改场次"
										:loading="yhlbmkLoading"
										@on-ok="updatatimeOk"
										@on-cancel="yhlbmkCancel"
									>
										<div style="marginBottom:10px;textAlign:center">
											<div
												style="display:inline-block;width:100px;textAlign:left"
											>
												<span style="color:red;"></span>商品名称：
											</div>
											<input class="xuanze" @click="setProduct" v-model="goodchoiced.productName" readonly="readonly"></input>
										</div>
										<div style="marginBottom:10px;textAlign:center">
											<div
												style="display:inline-block;width:100px;textAlign:left"
											>
												<span style="color:red;"></span>场次名称：
											</div>
											<Input
												v-model="updatacc.title"
												placeholder="请输入场次名称"
												style="width:200px"
											></Input>
										</div>
										<div style="marginBottom:10px;textAlign:center">
											<div
												style="display:inline-block;width:100px;textAlign:left"
											>
												<span style="color:red;"></span>是否加入机器人：
											</div>
											<RadioGroup v-model="robotStatus" @on-change="showrobot" style="width:200px;text-align: left;">
												<Radio :label="1">
													<span>是</span>
												</Radio>
												<Radio :label="0">
													<span>否</span>
												</Radio>
											</RadioGroup>
										</div>
										<div style="marginBottom:10px;textAlign:center" v-if="robot">
											<div
												style="display:inline-block;width:100px;textAlign:left"
											>
												<span style="color:red;"></span>机器人退出价格：
											</div>
											<Input
												v-model="updatacc.robotExitPrice"
												placeholder="请输入机器人退出价格"
												style="width:200px"
												type="number"
											></Input>
										</div>
										<div style="marginBottom:10px;textAlign:center" v-if="robot">
											<div
												style="display:inline-block;width:100px;textAlign:left"
											>每轮机器人数量：</div>
												<select name="public-choice" v-model="robotNum" class="typeselect" style="width: 200px;height: 32px;">                                        
													<option :value="item.groupType"  v-for="item in statusList" >{{item.groupName}}</option>                                    
												</select>
										</div>
										<div style="marginBottom:10px;textAlign:center">
											<div
												style="display:inline-block;width:100px;textAlign:left"
											>起拍价：</div>
											<Input
												v-model="updatacc.startPrice"
												placeholder="请输入起拍价"
												style="width:200px"
												type="number"
											></Input>
										</div>
										<div style="marginBottom:10px;textAlign:center">
											<div
												style="display:inline-block;width:100px;textAlign:left"
											>加价：</div>
											<Input
												v-model="updatacc.incrementValue"
												placeholder="请输入加价金额"
												style="width:200px"
												type="number"
											></Input>
										</div>
										<div style="marginBottom:10px;textAlign:center">
											<div
												style="display:inline-block;width:100px;textAlign:left"
											>开始时间：</div>
												<Date-picker :value="upstartValue" :options="upstartTimeOptions" v-modal="upstartValue"  @on-change="handleChange2" type="datetime" placeholder="选择日期和时间" style="width: 200px"></Date-picker>
										</div>
										<div style="marginBottom:10px;textAlign:center">
											<div
												style="display:inline-block;width:100px;textAlign:left"
											>结束时间：</div>
												<Date-picker :value="upendValue" :options="upendTimeOptions" v-modal="upendValue" @on-change="handleChange3" type="datetime" placeholder="选择日期和时间" style="width: 200px"></Date-picker>
										</div>
										<div style="marginBottom:10px;textAlign:center">
											<div
												style="display:inline-block;width:100px;textAlign:left"
											>档次名称：</div>
											<select name="public-choice" v-model="model2" class="typeselect" style="width: 200px;height: 32px;">                                        
												<option :value="item.id"  v-for="item in ccidlist" >{{item.auctionGradeName}}</option>                                    
											</select>
										</div>
										<div style="marginBottom:10px;textAlign:center">
											<div
												style="display:inline-block;width:100px;textAlign:left"
											>抢拍默认时长：</div>
											<Input
												v-model="updatacc.times"
												placeholder="请输入抢拍默认时长"
												style="width:200px"
												type="number"
											></Input>
										</div>
										<div style="marginBottom:10px;textAlign:center">
											<div
												style="display:inline-block;width:100px;textAlign:left"
											>等待默认时长：</div>
											<Input
												v-model="updatacc.wiat_time"
												placeholder="请输入等待默认时长"
												style="width:200px"
												type="number"
											></Input>
										</div>
										<div style="marginBottom:10px;textAlign:center">
											<div
												style="display:inline-block;width:100px;textAlign:left"
											>计算默认时长：</div>
											<Input
												v-model="updatacc.compute_time"
												placeholder="请输入计算默认时长"
												style="width:200px"
												type="number"
											></Input>
										</div>
									</Modal>
									<Modal
										v-model="goodModal"
										title="选择商品"
										:loading="yhlbmkLoading"
										@on-cancel="yhlbmkCancel"
										class-name="mygoods1"
									>
										<Row style="padding: 10px 0;">
												<Col span="5" style="textAlign:center;">
														<div class="searchBox clearfix">
																<div style="marginBottom:10px;textAlign:center">
																	<div
																		style="display:inline-block;width:70px;textAlign:center;height: 20px;"
																	>商品名称：</div>
																	<input
																			v-model="producenames"
																			size="small"
																			placeholder="请输入商品名称"
																			class="serchinput"
																	>
																	</input>
																</div>
														</div>
												</Col>
												<Col span="5">
														<div style="marginBottom:10px;textAlign:left">
															<div
																style="display:inline-block;width:70px;textAlign:center;height: 20px;"
															>价格区间：</div>
															<input
																	v-model="startPrice"
																	size="small"
																	class="serchinput serchinput-on"
															>
															</input> ——
															<input
																	v-model="endPrice"
																	size="small"
																	class="serchinput serchinput-on"
															>
															</input>
														</div>
												</Col>
												<Col span="5" style="textAlign:center;">
														<div class="searchBox clearfix">
															<div style="marginBottom:10px;textAlign:center;display: flex;">
																<div
																	style="display:inline-block;width:70px;textAlign:center;height: 20px;margin-top: 5px;"
																>商品类型：</div>
																<Cascader ref="lists" :data="typelists" v-model="model1" class="goodselect"></Cascader>
															</div>
														</div>
												</Col>
												
												<Col span="7">
														<div style="marginBottom:10px;textAlign:left;margin-left: 10px;">
															<Date-picker :value="searchValue" v-modal="searchValue"  @on-change="handleChange4" type="date" placeholder="选择开始时间" style="float:left;width: 150px"></Date-picker>
															<Date-picker :value="searchenValue" v-modal="searchenValue"  @on-change="handleChange5" type="date" placeholder="选择结束时间" style="width: 150px"></Date-picker>
														</div>
												</Col>
												<Col span="2">
															<Button
																	type="error"
																	style="width:60px;marginLeft:20px;textAlign:center"
																	size="small"
																	@click="searchgood(1)"
															>查询</Button>
													</Col>
										</Row>
										<Table
											ref="yhlbmkTable"
											border
											:columns="goodsclo"
											:data="choicegoodlist.list"
											@on-row-dblclick="selectgoods"
										></Table>
										<div class="pageBox" :style="{marginTop: '25px',paddingBottom: '35px'}">
											<!-- 分页 -->
											<Page
												:total="choicegoodlist.total"
												:page-size="choicegoodlist.pageSize"
												:current="choicegoodlist.currentPage"
												show-elevator
												@on-change="getlistgood"
											></Page>
										</div>
										<div slot="footer"></div>
									</Modal>
									<Modal v-model="imageModal" title="图片查看" class="mymodal">
										<Carousel v-if="imageModal1">
											<Carousel-Item v-for="(item,index) in imagelist" :key="index">
											<div style="margin: 0 auto;text-align: center;display: flex;align-items: center;width: 488px;height: 300px;justify-content: center;">
											<img :src="item" style="max-height:240px;max-width:440px;" alt=""/>
											</div>
											</Carousel-Item>
										</Carousel>
									</Modal>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div class="tablepage_box">
                        <!-- 用户列表数据表格 -->
                        <Table
                            ref="yhlbmkTable"
                            border
                            :columns="yhlbmkCols"
                            :data="yhlbmktablePageData.list"
                        ></Table>
                        <div class="pageBox" :style="{marginTop: '25px'}">
                            <!-- 分页 -->
                            <Page
                                :total="yhlbmktablePageData.total"
								ref="pages"
                                :page-size="yhlbmktablePageData.pageSize"
                                :current="yhlbmktablePageData.currentPage"
                                show-elevator
                                @on-change="yhlbmkPageChange"
                            ></Page>
                            <span>共&nbsp;{{yhlbmktablePageData.pages}}&nbsp;页</span>
                        </div>
                    </div>
                </div>
    </div>
</template>
<script>
// 引入通用的库文件
import Util from '@/libs/util';
import axios from 'axios';
export default {
    name: 'changciAudit',
    data() {
        return {
			robot:false,
			robotStatus:0,
			searchenValue:'',
			typelists:[],
			startTimeOptions: {}, //开始日期设置
			endTimeOptions: {}, //结束日期设置
			upendTimeOptions:{},
			upstartTimeOptions: {},
            cityList: [], //商品类型
            model2: '', //商品类型
            model3: '', //查询档次
            model4: '', //查询生成类型
            searchname: '', //查询商品名称
            typelist: [
                {
                    id: 1,
                    name: '手动'
                },
                {
                    id: 2,
                    name: '自动'
                }
            ],
            yhlbmkIsSearch: false, // 是否加入搜索词
            // 用户列表表格的标题行数据（列属性名称）
            yhlbmkCols: [
                {
                    title: '竞拍场次id',
                    key: 'id',
                    align: 'center'
                },
                {
                    title: '商品名称',
                    key: 'productName',
                    align: 'center'
                },
				{
				    title: '是否加入机器人',
				    key: 'productName',
				    align: 'center',
					render: (h, params) => {
					    let text = params.row.robotStatus;
					    if (text == 1) {
					        return h('div', '加入');
					    }
					    if (text == 0) {
					        return h('div', '不加入');
					    }
					}
				},
				{
				    title: '机器人退出价格',
				    key: 'robotExitPrice',
				    align: 'center'
				},
				{
				    title: '每轮机器人数量',
				    key: 'robotMaxNum',
				    align: 'center',
					render: (h, params) => {
						if(params.row.robotMinNum){
							return h('div',params.row.robotMinNum+'-'+params.row.robotMaxNum)
						}else{
							return h('div')
						}
					}
				},
                {
                    title: '商品主图',
                    key: 'pic',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        var str = params.row.pic;
                        if (str) {
                            //str = str.substring(0, str.lastIndexOf(','))
                            var arr = str.split(',');
                            return h('img', {
                                attrs: {
                                    src: arr[0]
                                },
                                style: {
                                    width: '50px',
                                    height: '50px',
                                    margin: '10px 0'
                                },
                                on: {
                                    click: () => {
                                        this.showimage(arr);
                                    }
                                }
                            });
                        } else {
                            return h('div', {}, '暂无图片');
                        }
                    }
                },
                {
                    title: '起拍价',
                    key: 'startPrice',
                    align: 'center'
                },
                {
                    title: '成交价',
                    key: 'endPrice',
                    align: 'center'
                },
                {
                    title: '状态',
                    key: 'status',
                    width: 90,
                    align: 'center',
                    render: (h, params) => {
                        let text = params.row.status;
                        if (text == 1) {
                            return h('div', '进行中');
                        }
                        if (text == 2) {
                            return h('div', '即将开始');
                        }
                        if (text == 3) {
                            return h('div', '已结束');
                        }
                    }
                },
                {
                    title: '生成类型',
                    key: 'status',
                    width: 90,
                    align: 'center',
                    render: (h, params) => {
                        let text = params.row.classType;
                        if (text == 1) {
                            return h('div', '手动');
                        }
                        if (text == 2) {
                            return h('div', '自动');
                        }
                    }
                },
				{
					title: "档次名称",
					key: "auctionGradeId",
					width: 90,
					align: "center",
					render: (h,params)=> {
						let text = params.row.auctionGradeId
						if(text==1){
							return h('div','汇聚一堂')
						}
						if(text==2){
							return h('div','大国工艺')
						}
						if(text==3){
							return h('div','城市脉络')
						}
						if(text==4){
							return h('div','寄情山水')
						}
						if(text==5){
							return h('div','个人专属')
						}
					}
				},
                {
                    title: '开始时间',
                    key: 'startTime',
                    align: 'center',
                    render: (h, params) => {
                        return h(
                            'div',
                            new Date(params.row.startTime).Format('yyyy-MM-dd hh:mm:ss')
                        ); /*这里的this.row能够获取当前行的数据*/
                    }
                },
                {
                    title: '结束时间',
                    key: 'endTime',
                    align: 'center',
                    render: (h, params) => {
                        return h(
                            'div',
                            new Date(params.row.endTime).Format('yyyy-MM-dd hh:mm:ss')
                        ); /*这里的this.row能够获取当前行的数据*/
                    }
                },
                {
                    title: '实际结束时间',
                    key: 'overTime',
                    align: 'center',
                    render: (h, params) => {
                        if (params.row.overTime) {
                            return h(
                                'div',
                                new Date(params.row.overTime).Format('yyyy-MM-dd hh:mm:ss')
                            ); /*这里的this.row能够获取当前行的数据*/
                        } else {
                            return h('div'); /*这里的this.row能够获取当前行的数据*/
                        }
                    }
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h(
                                'Button',
                                {
                                    props: {
                                        type: 'warning',
                                        size: 'small'
                                    },
                                    style: {
                                        // width: "70px",
                                    },
                                    on: {
                                        click: () => {
                                            this.deleteCC(params.row.id);
                                        }
                                    }
                                },
                                '删除'
                            ),
                            h(
                                'Button',
                                {
                                    props: {
                                        type: 'warning',
                                        size: 'small'
                                    },
                                    style: {
                                        // width: "70px",
                                        marginLeft: '10px'
                                    },
                                    on: {
                                        click: () => {
                                            this.updataCC(params.row);
                                        }
                                    }
                                },
                                '修改'
                            )
                        ]);
                    }
                }
            ],
            goodsclo: [
                {
                    title: '商品id',
                    key: 'id',
                    align: 'center'
                },
                {
                    title: '商品名称',
                    key: 'productName',
                    align: 'center'
                },
                {
                    title: '商品主图',
                    key: 'pic',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        var str = params.row.pic;
                        if (str) {
                            str = str.substring(0, str.lastIndexOf(','));
                            var arr = str.split(',');
                            return h('img', {
                                attrs: {
                                    src: arr[0]
                                },
                                style: {
                                    width: '50px',
                                    height: '50px',
                                    margin: '10px 0'
                                },
                                on: {
                                    click: () => {
                                        this.showimage(arr);
                                    }
                                }
                            });
                        } else {
                            return h('div', {}, '暂无图片');
                        }
                    }
                },
                {
                    title: '商品类型',
                    key: 'productType',
                    align: 'center'
                },
                {
                    title: '商品价格',
                    key: 'productPrice',
                    align: 'center'
                },
                {
                    title: '商品简介',
                    key: 'introduction',
                    ellipsis: true,
                    align: 'center'
                },
				{
					title: '生成时间',
					key: 'createTime',
					align: 'center',
					render: (h, params) => {
						return h(
							'div',
							new Date(params.row.createTime).Format('yyyy-MM-dd hh:mm:ss')
						); /*这里的this.row能够获取当前行的数据*/
					}
				},
            ],
            // 用户列表表格分页数据
            yhlbmktablePageData: {
                list: [], // 表格列表
                total: 0, // 总条数
                pages: 0, // 总页数
                pageSize: 0, // 每页条数
                currentPage: 0 // 当前页码
            },
            // 商品列表表格分页数据
            choicegoodlist: {
                list: [], // 表格列表
				list2: [], // 表格列表
                total: 0, // 总条数
                pages: 0, // 总页数
                pageSize: 0, // 每页条数
                currentPage: 0 // 当前页码
            },
            //选择商品
            goodchoiced: {
                productName: '请选择',
                productPrice: '', //商品价格
				productPic: '', //商品图片
				pid:'',
                id: ''
            },
            yhlbmkModal: false, // 添加新增用户的对话框显示状态
            goodModal: false, //选择商品模态框
            updataTime: false, //修改模态框
            yhlbmkLoading: true, // 添加新增用户的对话框加载状态
            startValue: null,
            endValue: null,
            upstartValue: null,
            upendValue: null,
            // 新增用户的对话框表单
            yhlbmkAddObj: {
                title: '', //场次名称
                productId: '', //产品id
                startPrice: '', //起拍价
                incrementValue: '', //加价
                startTime: '', //开始时间
                endTime: '', //结束时间
                auctionGradeId: '', //档次id
                wiat_time: '', //等待默认时长
                compute_time: '', //计算时长
                times: '' //抢拍默认时长
            },
            updatacc: {
                title: '', //场次名称
                productId: '', //产品id
                startPrice: '', //起拍价
                incrementValue: '', //加价
                startTime: '', //开始时间
                endTime: '', //结束时间
                auctionGradeId: '', //档次id
                wiat_time: '', //等待默认时长
                compute_time: '', //计算时长
                times: '', //抢拍默认时长
                id: '' //商品id
            },
            imagelist: [], //图片集合image
            imageModal: false,
			imageModal1: false,
            model1: '', //商品类型,
            producenames: '', //商品名称

            startPrice: '',
            endPrice: '',
            searchValue: '',
			
            ccidlist: {} ,//场次id
			statusList:[{
				groupType:1,
				groupName:"1-5"
			},{
				groupType:2,
				groupName:"5-10"
			},{
				groupType:3,
				groupName:"10-15"
			}],
        };
    },
	//每次进入页面都会执行
// 	activated: function() {
// 		this.yhlbmkGetList(1, this.yhlbmkIsSearch);
// 	},
    mounted: function() {
        this.showtype();
        this.showdctype();
		this.gettimes();
    },
    created() {
        // 获取用户列表数据
        this.yhlbmkGetList(1, this.yhlbmkIsSearch);
    },
    methods: {
		showchangci(){
			this.yhlbmkModal=true;
			this.yhlbmkAddObj.title = '';
			this.goodchoiced.productName = '请选择';
			this.goodchoiced.id = ''; //选择商品清空
			this.goodchoiced.productType = ''; //选择商品清空
			this.goodchoiced.productPrice = '';
			this.goodchoiced.productPic = '';
			this.yhlbmkAddObj.incrementValue = '';
			this.yhlbmkAddObj.auctionGradeId = '';
			this.yhlbmkAddObj.robotExitPrice ='';
			
			this.startValue = '';
			this.endValue = '';
			this.robotNum ='';
			this.robot=false;
			this.robotStatus=0;
		},
        //获取档次id
        showdctype() {
            axios
                .post('/api/auction/auctionGrade/sys/getSameDayGrade')
                .then(response => {
                    var res = response.data;
                    this.ccidlist = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 用户列表的页码改变
        yhlbmkPageChange(currentPage) {
            this.yhlbmkGetList(currentPage, this.yhlbmkIsSearch); // 获取用户列表数据
        },
        // 获取用户列表数据（调用接口的）---接口
        yhlbmkGetList(currentPage, isSearch) {
            // currentPage：当前页数   isLimitTime：是否限制时间段
            console.log('获取第' + currentPage + '页数据');

            // 参数对象
            var params = {
                pageNum: currentPage, // 当前页码
                pageSize: 10 // 每页条数
            };
            let postData = this.$qs.stringify(params);
            axios
                .post('/api/auction/auctionClass/sys/init', postData)
                .then(response => {
                    var res = response.data;
                    // this.yhlbmktablePageData = res.data;
					if(res.code==200){
						if(res.data==null){
							this.yhlbmktablePageData.list=[];
						}else{
							this.yhlbmktablePageData = res.data;
						}
					}else{
						this.yhlbmktablePageData.list=[];
					}
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 用户列表的选择器发生变化
        yhlbmkSlChange() {
            // console.log("选择器变化");
            // 获取用户列表数据
            this.yhlbmkGetList(1, this.yhlbmkIsSearch);
        },
        // 点击新增用户的对话框的ok
        yhlbmkOk() {
            // 参数对象
            var data = new Date(this.startValue);
            var time1 = data.getTime();
            var data2 = new Date(this.endValue);
            var time2 = data2.getTime();
			if(time2<time1){
				Util.error('结束时间必须大于开始时间');
				setTimeout(() => {
					this.yhlbmkLoading = false;
					this.$nextTick(() => {
						this.yhlbmkLoading = true;
					});
				}, 10);
				return;
			}
			let robotMinNum,robotMaxNum=0
			if(this.robotNum==1){
				robotMinNum=1
				robotMaxNum=5
			}else if(this.robotNum==2){
				robotMinNum=5
				robotMaxNum=10
			}else if(this.robotNum==3){
				robotMinNum=10
				robotMaxNum=15
			}
            var params = {
                title: this.goodchoiced.productName,
				productType: this.goodchoiced.pid,
                productId: this.goodchoiced.id,
				productPic: this.goodchoiced.pic,
                startPrice: this.goodchoiced.productPrice,
                incrementValue: this.yhlbmkAddObj.incrementValue,
                startTime: time1,
                endTime: time2,
                auctionGradeId: this.model2,
                wiatTime: this.yhlbmkAddObj.wiat_time,
                computeTime: this.yhlbmkAddObj.compute_time,
                times: this.yhlbmkAddObj.times,
				robotStatus:this.robotStatus,
				robotExitPrice:this.yhlbmkAddObj.robotExitPrice,
				robotMinNum:robotMinNum,
				robotMaxNum:robotMaxNum
            };
			if(params.title=='' || params.productId=='' || params.productPic=='' || params.startPrice=='' || params.incrementValue=='' || params.startTime=='' || params.endTime=='' || params.auctionGradeId=='' || params.times=='' || params.wiatTime=='' || params.computeTime==''){
				Util.error('正确填写表单');
			}else{
            this.yhlbmkLoading = false; // 关闭加载状态
            this.yhlbmkModal = false; // 关闭当前模态
            // 清除表单
            let postData = this.$qs.stringify(params);
            console.log(postData);
            axios
                .post('/api/auction/auctionClass/sys/addClassAuction', postData)
                .then(response => {
                    if (response.data.code == 200) {
                        Util.success('添加成功');
                        this.yhlbmkGetList(1, this.yhlbmkIsSearch);
                    } else {
                        Util.error('添加失败,'+response.data.msg);
                    }
                    //var res = response.data;
                    //this.yhlbmktablePageData.list=res.data;
                })
                .catch(error => {
                    console.log(error);
                });
			}
            // 解决Modal表单验证中loading的bug
            setTimeout(() => {
                this.yhlbmkLoading = false;
                this.$nextTick(() => {
                    this.yhlbmkLoading = true;
                });
            }, 10);
        },
        // 点击新增用户的对话框的取消
        yhlbmkCancel() {
            console.log('点击取消');
            this.goodchoiced.productName = '请选择';
            this.goodchoiced.id = ''; //选择商品清空
			this.goodchoiced.productType = ''; //选择商品清空
            this.goodchoiced.productPrice = '';
			this.goodchoiced.productPic = '';

        },
        //删除场次
        deleteCC(id) {
			if(confirm('是否确认删除')==true){
            let params = {};
            params.id = id;
            let postData = this.$qs.stringify(params);
            console.log(postData);
            axios
                .post('/api/auction/auctionClass/sys/removeClassAuctionById', postData)
                .then(response => {
                    if (response.data.code == 200) {
                        Util.success('删除成功');
                        this.yhlbmkGetList(1, this.yhlbmkIsSearch);
                    } else {
                        Util.error('删除失败,'+response.data.msg);
                    }
                    //var res = response.data;
                    //this.yhlbmktablePageData.list=res.data;
                })
                .catch(error => {
                    console.log(error);
                });
			}
        },
        //跳转出查询商品
        setProduct() {
			this.model1=this.producenames=this.startPrice=this.endPrice=this.searchValue='';
            //this.yhlbmkModal = false; // 关闭当前模态
            this.goodModal = true;
            // 参数对象
            this.getlistgood(1);
        },
        getlistgood(currentPage) {
            var params = {
                pageNum: currentPage, // 当前页码
                pageSize: 10 // 每页条数
            };
            let postData = this.$qs.stringify(params);
            axios
                // .post('/api/auction/product/sys/getAllowProduct', postData)
                .post('/api/auction/product/sys/init', postData)
                .then(response => {
                    var res = response.data;
					if(res.code==200){
						if(res.data==null){
							this.choicegoodlist.list=[];
						}else{
							this.choicegoodlist = res.data;
							let onlygood=res.data.list;
							let listone=[]
							for(var i=0;i<onlygood.length;i++){
								if(onlygood[i].pic.length>0){
									listone.push(onlygood[i])
								}
							}
							this.choicegoodlist.list=listone
						}
					}else{
						this.choicegoodlist.list=[];
					}
                })
                .catch(error => {
                    console.log(error);
                });
        },
        selectgoods(row) {
            this.goodchoiced = row;
			this.yhlbmkAddObj.title=this.goodchoiced.productName
			this.updatacc.title=this.goodchoiced.productName
            console.log(this.goodchoiced.productPrice);
            this.goodModal = false;
            //this.yhlbmkModal = true;
        },
        //选择开始时间
        handleChange(daterange) {
            this.startValue = daterange;
			
// 			this.endTimeOptions = {
// 		          disabledDate: date => {
// 		            let startTime = this.startValue ? new Date(this.startValue).valueOf() : '';
// 		            return date && (date.valueOf() < startTime);
// 		          }
// 		        }

        },
        //选择结束时间
        handleChange1(daterange) {
            this.endValue = daterange;
// 			let endTime = this.endValue ? new Date(this.endValue).valueOf() - 1 * 24 * 60 * 60 * 1000 : '';
//        			 this.startTimeOptions = {
// 		          disabledDate(date) {
// 		            return date && date.valueOf() > endTime;
// 		          }
// 		        }
        },
        //修改开始时间
        handleChange2(daterange) {
            this.upstartValue = daterange;
// 				this.upendTimeOptions = {
// 			          disabledDate: date => {
// 			            let startTime = this.upstartValue ? new Date(this.upstartValue).valueOf() : '';
// 			            return date && (date.valueOf() < startTime);
// 			          }
// 			        }
        },
        //修改结束时间
        handleChange3(daterange) {
            this.upendValue = daterange;
// 			let endTime = this.upendValue ? new Date(this.upendValue).valueOf() - 1 * 24 * 60 * 60 * 1000 : '';
// 			       			 this.upstartTimeOptions = {
// 					          disabledDate(date) {
// 					            return date && date.valueOf() > endTime;
// 					          }
// 					        }
        },
        handleChange4(daterange) {
            this.searchValue = daterange;
        },
		handleChange5(daterange) {
			this.searchenValue = daterange;
		},
        //修改
        updataCC(row) {
            this.updataTime = true;
            this.ccid = row.id;
            this.updatacc.title = row.title;
            this.updatacc.productId = row.productId;
            this.goodchoiced.productName = row.productName;
            this.updatacc.startPrice = row.startPrice;
            this.updatacc.incrementValue = row.incrementValue;
            this.model2 = row.auctionGradeId;
            this.updatacc.compute_time = row.computeTime;
            this.updatacc.wiat_time = row.wiatTime;
            this.updatacc.times = row.times;
			
			this.robotStatus=row.robotStatus;
			this.updatacc.robotExitPrice =row.robotExitPrice;
			if(this.robotStatus==1)this.robot=true
			if(this.robotStatus==0)this.robot=false
			if(row.robotMinNum==1 && row.robotMaxNum==5){
				this.robotNum=1
			}else if(row.robotMinNum==5 && row.robotMaxNum==10){
				this.robotNum=2
			}else if(row.robotMinNum==10 && row.robotMaxNum==15){
				this.robotNum=3
			}
			
			
            this.upstartValue = new Date(row.startTime).Format('yyyy-MM-dd hh:mm:ss');
            this.upendValue = new Date(row.endTime).Format('yyyy-MM-dd hh:mm:ss');
        },
        //显示图片
        showimage(imagearr) {
			this.imageModal = true;
            this.imageModal1 = true;
            this.imagelist = imagearr;
        },
        searchgood(currentPage) {
			if(this.model1 !=''){
				this.model1=this.$refs['lists'].tmpSelected[1].label;
			}
            if (
                this.model1 ||
                this.producenames ||
                this.startPrice ||
                this.endPrice ||
                this.searchValue ||
				this.searchenValue
            ) {
				var searchValue = new Date(this.searchValue);
				var searchenValue=new Date(this.searchenValue);
				// var time1 = data.getTime();
                var params = {
                    pageNum: currentPage, // 当前页码
                    pageSize: 10, // 每页条数
                    productName: this.producenames,
                    productType: this.model1,
                    startPrice: this.startPrice,
                    endPrice: this.endPrice,
                    startTime: searchValue.getTime(),
					endTime:searchenValue.getTime()
                };
                let postData = this.$qs.stringify(params);
                axios
                    .post('/api/auction/product/sys/selectProduct', postData)
                    .then(response => {
                        var res = response.data;
                        //this.choicegoodlist = res.data;
                        //this.goodModal=true
						if(res.code==200){
							if(res.data==null){
								this.choicegoodlist.list=[];
							}else{
								this.choicegoodlist = res.data;
								let onlygood=res.data.list;
								let listone=[]
								for(var i=0;i<onlygood.length;i++){
									if(onlygood[i].pic.length>0){
										listone.push(onlygood[i])
									}
								}
								this.choicegoodlist.list=listone
							}
						}else{
							this.choicegoodlist.list=[];
						}
                    })
                    .catch(error => {
                        console.log(error);
                    });
            } else {
                this.listobjgood = true;
                this.getlistgood(1);
                this.$nextTick(function(){
                	this.$refs['pages'].currentPage = 1;
                })
            }
        },
        updatatimeOk() {
            var data = new Date(this.upstartValue);
            var time1 = data.getTime();
            var data2 = new Date(this.upendValue);
            var time2 = data2.getTime();
            let podid;
            if (this.goodchoiced.id) {
                podid = this.goodchoiced.id;
            } else {
                podid = this.updatacc.productId;
            }
			let robotMinNum,robotMaxNum=0
			if(this.robotNum==1){
				robotMinNum=1
				robotMaxNum=5
			}else if(this.robotNum==2){
				robotMinNum=5
				robotMaxNum=10
			}else if(this.robotNum==3){
				robotMinNum=10
				robotMaxNum=15
			}
            var params = {
                id: this.ccid,
                title: this.updatacc.title,
                productId: podid,
				productType:this.goodchoiced.pid,
                startPrice: this.updatacc.startPrice,
                incrementValue: this.updatacc.incrementValue,
                startTime: time1,
                endTime: time2,
                auctionGradeId: this.model2,
                wiatTime: this.updatacc.wiat_time,
                computeTime: this.updatacc.compute_time,
                times: this.updatacc.times,
				robotStatus:this.robotStatus,
				robotExitPrice:this.updatacc.robotExitPrice,
				robotMinNum:robotMinNum,
				robotMaxNum:robotMaxNum
            };
            console.log(params);
            this.yhlbmkLoading = false; // 关闭加载状态
            this.yhlbmkModal = false; // 关闭当前模态
            // 清除表单
            let postData = this.$qs.stringify(params);
            console.log(postData);
            axios
                .post('/api/auction/auctionClass/sys/updateClassAuction', postData)
                .then(response => {
                    if (response.data.code == 200) {
                        Util.success('修改成功');
                        this.yhlbmkGetList(this.yhlbmktablePageData.pageNum, this.yhlbmkIsSearch);
                        this.$nextTick(function(){
                        	this.$refs['pages'].currentPage = this.yhlbmktablePageData.pageNum;
                        })
                    } else {
                        Util.error('修改失败,'+response.data.msg);
                    }
                    //var res = response.data;
                    //this.yhlbmktablePageData.list=res.data;
                })
                .catch(error => {
                    console.log(error);
                });
            this.yhlbmkLoading = false; // 关闭加载状态
            this.updataTime = false;
        },
        showtype() {
            let params = {};
            params.cd_type = 'product_type';
            let postData = this.$qs.stringify(params);
            axios
                .post('/api/auction/productType/sys/getAllNode', postData)
                .then(response => {
                    var res = response.data;
                    this.typelists = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //查询
        searchgoodName(currentPage) {
			if(this.model4=='全部'){
				this.model4=''
			}
			if(this.model3=='全部'){
				this.model3=''
			}
            let params = {
                classId: this.model3,
                productName: this.searchname,
                classType: this.model4,
                pageNum: currentPage, // 当前页码
                pageSize: 10 // 每页条数
            };
            let postData = this.$qs.stringify(params);
            if (this.model3 != '' || this.model4 != '' || this.searchname != '') {
                axios
                    .post('/api/auction/auctionClass/sys/findAuctionClassInitVoByproductName', postData)
                    .then(response => {
                        var res = response.data;
                        // this.yhlbmktablePageData = res.data;
						if(res.code==200){
							if(res.data==null){
								this.yhlbmktablePageData.list=[];
							}else{
								this.yhlbmktablePageData = res.data;
							}
						}else{
							this.yhlbmktablePageData.list=[];
						}
                    })
                    .catch(error => {
                        console.log(error);
                    });
            } else {
                this.yhlbmkGetList(1, this.yhlbmkIsSearch);
            }
        },
		//获取轮次时长
		gettimes(){
			axios.post('/api/auction/operate/sys/init')
				.then( (response)=> {
					var res = response.data;
					var list=res.data.setlc;
					this.yhlbmkAddObj.times=list[1].cdVal || ""
					this.yhlbmkAddObj.wiat_time=list[2].cdVal || ""
					this.yhlbmkAddObj.compute_time=list[0].cdVal || ""
				})
				.catch( (error)=> {
				console.log(error);
				}); 
		},
		//竞拍场底价
		m2Select(){
			if(this.model2==1){
				this.goodchoiced.productPrice=1
			}
			if(this.model2==2){
				this.goodchoiced.productPrice=100
			}
			if(this.model2==3){
				this.goodchoiced.productPrice=500
			}
			if(this.model2==4){
				this.goodchoiced.productPrice=1000
			}
			if(this.model2==5){
				this.goodchoiced.productPrice=2000
			}
		},
		showrobot(data){
			if(data==1){
				this.robot=true
			}
			if(data==0){
				this.robot=false
			}
		}
    }
};
</script>
