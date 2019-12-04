<!-- 自动场规则管理 -->
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
.mygoods .ivu-modal {
    width: 1200px !important;
    max-height: 700px;
    overflow: scroll;
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
    width: 60px;
}
.typeselect {
    width: 150px;
    height: 25px;
    border: 1px solid #dcdee2;
    border-radius: 4px;
    color: #515a6e;
}
.goodselect {
    width: 150px;
    height: 25px;
    color: #515a6e;
		border:none;
}
</style>

<template>
    <div class="tabsBox_style">
            <!-- 自动场规则管理 -->
                <div class="itemBox yhlb_table">
                    <div class="remark_box">
                        <Row>
                            <Col span="5">
                                <h3>自动场规则管理</h3>
                            </Col>
                            <Col span="18" style="textAlign:center;">
                                <div class="searchBox clearfix">
                                    <Input
                                        v-model="yhlbmkIpVal"
                                        size="small"
                                        placeholder="请输入商品名称"
                                        style="float:left;width: 200px"
                                    >
                                    </Input>
                                    <Button
                                        type="error"
                                        style="float:left;width:60px;marginLeft:20px;"
                                        size="small"
                                        @click="yhlbmkSearch(1)"
                                    >查询</Button>
									<Button
										type="error"
										style="float:left;width:90px;marginLeft:20px;"
										size="small"
										@click="inquiry"
									>添加自动场次</Button>
                                </div>
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
								<input class="xuanze" @click="setProduct"  v-model="goodchoiced.productName" readonly="readonly"></input>
							</div>
							<div style="marginBottom:10px;textAlign:center">
								<div
									style="display:inline-block;width:100px;textAlign:left"
								>规则描述：</div>
								<Input
									v-model="yhlbmkAddObj.desc"
									placeholder="请输入规则描述"
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
									style="display:inline-block;width:100px;textAlign:left;height: 20px;"
								>时间规则：</div>
								<select name="public-choice" v-model="yhlbmkAddObj.cron" class="typeselect" style="width: 200px;">                                        
									<option :value="item.value"  v-for="item in guizilist" >{{item.label}}</option>                                 																							
								</select>
								<!-- <i-select :model.sync="yhlbmkAddObj.cron" style="width:200px">
									<i-option v-for="item in guizilist" :value="item.value">{{ item.label }}</i-option>
								</i-select> -->
							</div>
							<div style="marginBottom:10px;textAlign:center">
								<div
									style="display:inline-block;width:100px;textAlign:left"
								>规则表达式：</div>
								<Input
									v-model="yhlbmkAddObj.cron"
									placeholder="请输入规则表达式"
									style="width:200px"
								></Input>
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
								>开始时间：</div>
									<Date-picker :value="startValue" v-modal="startValue"  @on-change="handleChange"  type="datetime" placeholder="选择日期和时间" style="width: 200px"></Date-picker>
							</div>
							<div style="marginBottom:10px;textAlign:center">
								<div
									style="display:inline-block;width:100px;textAlign:left"
								>结束时间：</div>
									<Date-picker  :value="endValue" v-modal="endValue"  @on-change="handleChange1" type="datetime" placeholder="选择日期和时间" style="width: 200px"></Date-picker>
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
									v-model="yhlbmkAddObj.wiatTime"
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
									v-model="yhlbmkAddObj.computeTime"
									placeholder="请输入计算默认时长"
									style="width:200px"
									type="number"
								></Input>
							</div>
						</Modal>
						<Modal
							v-model="goodModal"
							title="选择商品"
							class-name="mygoods"
						>
							<Row style="padding: 10px 0;">
									<Col span="5" style="textAlign:center;">
											<div class="searchBox clearfix">
													<div style="marginBottom:10px;textAlign:center">
														<div
															style="display:inline-block;width:100px;textAlign:center;height: 20px;"
														>商品名称：</div>
														<input
																v-model="producenames"
																size="small"
																placeholder="请输入商品名称"
																class="serchinput"
																style="width: 120px;"
														>
														</input>
													</div>
											</div>
									</Col>
									<Col span="5" style="textAlign:center;">
											<div class="searchBox clearfix">
												<div style="marginBottom:10px;textAlign:center;display: flex;">
													<div
														style="display:inline-block;width:100px;textAlign:center;height: 20px;margin-top: 5px;"
													>商品类型：</div>
													<Cascader ref="lists" :data="typelists" v-model="model1" class="goodselect"></Cascader>
												</div>
											</div>
									</Col>
									<Col span="6">
											<div style="marginBottom:10px;textAlign:left">
												<div
													style="display:inline-block;width:100px;textAlign:center;float: left;height: 30px;line-height: 30px;"
												>生成日期：</div>
												<Date-picker :value="searchValue" v-modal="searchValue"  @on-change="handleChange4" type="datetime" placeholder="选择生成日期" style="float:left;width: 150px"></Date-picker>
											</div>
									</Col>
									<Col span="6">
											<div style="marginBottom:10px;textAlign:left">
												<div
													style="display:inline-block;width:100px;textAlign:center;height: 20px;"
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
							<div v-if="listobjgood" class="pageBox" :style="{marginTop: '25px',paddingBottom: '35px'}">
									<!-- 分页 -->
									<Page
											:total="choicegoodlist.total"
											:page-size="choicegoodlist.pageSize"
											show-elevator
											ref="pages1"
											@on-change="goodpageChange"
									></Page>
									<span>共&nbsp;{{choicegoodlist.pages}}&nbsp;页</span>
							</div>
							<div v-else class="pageBox" :style="{marginTop: '25px',paddingBottom: '35px'}">
									<!-- 分页 -->
									<Page
											:total="choicegoodlist.total1"
											:page-size="choicegoodlist.pageSize1"
											show-elevator
											@on-change="segoodpageChange"
									></Page>
									<span>共&nbsp;{{choicegoodlist.pages1}}&nbsp;页</span>
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
								>规则描述：</div>
								<Input
									v-model="updatacc.desc"
									placeholder="请输入描述"
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
									placeholder="请输入每轮加价金额"
									style="width:200px"
									type="number"
								></Input>
							</div>
							<div style="marginBottom:10px;textAlign:center">
								<div
									style="display:inline-block;width:100px;textAlign:left;height: 20px;"
								>时间规则：</div>
								<select name="public-choice" v-model="updatacc.cron" class="typeselect" style="width: 200px;">                                        
									<option :value="item.value"  v-for="item in guizilist" >{{item.label}}</option>                                 																							
								</select>
								<!-- <i-select :model.sync="yhlbmkAddObj.cron" style="width:200px">
									<i-option v-for="item in guizilist" :value="item.value">{{ item.label }}</i-option>
								</i-select> -->
							</div>
							<div style="marginBottom:10px;textAlign:center">
								<div
									style="display:inline-block;width:100px;textAlign:left"
								>规则表达式：</div>
								<Input
									v-model="updatacc.cron"
									placeholder="请输入规则表达式"
									style="width:200px"
								></Input>
							</div>
							<div style="marginBottom:10px;textAlign:center">
								<div
									style="display:inline-block;width:100px;textAlign:left"
								>档次名称：</div>
									<select name="public-choice" v-model="model3" class="typeselect" style="width: 200px;height: 32px;">                                        
										<option :value="item.id"  v-for="item in ccidlist" >{{item.auctionGradeName}}</option>                                    
									</select>
							</div>
							<div style="marginBottom:10px;textAlign:center">
								<div
									style="display:inline-block;width:100px;textAlign:left"
								>开始时间：</div>
									<Date-picker :value="upstartValue" v-modal="upstartValue"  @on-change="handleChange2" type="datetime" placeholder="选择日期和时间" style="width: 200px"></Date-picker>
							</div>
							<div style="marginBottom:10px;textAlign:center">
								<div
									style="display:inline-block;width:100px;textAlign:left"
								>结束时间：</div>
									<Date-picker :value="upendValue" v-modal="upendValue" @on-change="handleChange3" type="datetime" placeholder="选择日期和时间" style="width: 200px"></Date-picker>
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
									v-model="updatacc.wiatTime"
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
									v-model="updatacc.computeTime"
									placeholder="请输入计算默认时长"
									style="width:200px"
									type="number"
								></Input>
							</div>
						</Modal>
                            </Col>
                        </Row>
                    </div>
                    <div class="tablepage_box">
                        <!-- 导出按钮 -->
                        <div class="exportBtnBox clearfix">
                        </div>
                        <!-- 用户列表数据表格 -->
                        <Table
                            ref="yhlbmkTable"
                            border
                            :columns="yhlbmkCols"
                            :data="yhlbmktablePageData.list"
                        ></Table>
						<div v-if="listobj" class="pageBox" :style="{marginTop: '25px',paddingBottom: '35px'}">
								<!-- 分页 -->
								<Page
										:total="yhlbmktablePageData.total"
										:page-size="yhlbmktablePageData.pageSize"
										show-elevator
										ref="pages"
										@on-change="yhlbmkPageChange"
								></Page>
								<span>共&nbsp;{{yhlbmktablePageData.pages}}&nbsp;页</span>
						</div>
						<div v-else class="pageBox" :style="{marginTop: '25px',paddingBottom: '35px'}">
								<!-- 分页 -->
								<Page
										:total="yhlbmktablePageData.total1"
										:page-size="yhlbmktablePageData.pageSize1"
										show-elevator
										@on-change="searchepageChange"
								></Page>
								<span>共&nbsp;{{yhlbmktablePageData.pages1}}&nbsp;页</span>
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
    name: 'zidongAudit',
    data() {
        return {
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
			robot:false,
			robotStatus:0,
			typelists:[],//商品类型
			model3:'',
			model2:'',
			guizilist:[
				{
					label:'每15分钟',
					value:'0 0/15 * * * ?'
				},
				{
					label:'每30分钟',
					value:'0 0/30 * * * ?',
				},
				{
					label:'每小时',
					value:'0 0 * * * ？'
				},
				{
					label:'每两小时',
					value:'0 0 0/2 * * ?'
				},
				{
					label:'每四小时',
					value:'0 0 0/4 * * ?'
				},
				{
					label:'每六小时',
					value:'0 0 0/6 * * ?'
				},
			],
			listobjgood:true,
			listobj: true,
            imageModal: false,
			imageModal1: false,
			ccid:'',
            imagelist: [], //图片集合image
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
                }
            ],
            // 商品列表表格分页数据
            choicegoodlist: {
                list: [], // 表格列表
                total: 0, // 总条数
                pages: 0, // 总页数
                pageSize: 0, // 每页条数
                currentPage: 0 ,// 当前页码
				total1: 0, // 总条数
				pages1: 0, // 总页数
				pageSize1: 0, // 每页条数
				currentPage1: 0 // 当前页码
            },
            model1: '', //商品类型,
            producenames: '', //商品名称
            startPrice: '',
            endPrice: '',
            searchValue: '',
            startValue: null,
            endValue: null,
            upstartValue: null,
            upendValue: null,
            //选择商品
            updatacc: {
                cron: '', 
                productId: '', //产品id
                startPrice: '', //起拍价
                incrementValue: '', //加价
                startTime: '', //开始时间
                endTime: '', //结束时间
				desc:'',
                id: '', //商品id
				wiatTime: '', //等待默认时长
				computeTime: '', //计算时长
				times: '', //抢拍默认时长
				incrementValue:'',//加价
            },
            goodchoiced: {
                productName: '请选择',
                productPrice: '', //商品价格
				pic:'',
				pid:'',
                id: ''
            },
            goodModal: false,
            updataTime: false,
            yhtjtableData: [], // 用户统计表格数据
            // 用户列表相关
            // 用户列表的选择器条件
            yhlbmkSlObj: {
                attr: 'all', // 属性筛选
                sort: '1' // 列表排序
            },
            yhlbmkIpVal: '', // 用户列表的搜索条件
            yhlbmkIsSearch: false, // 是否加入搜索词
            // 用户列表表格的标题行数据（列属性名称）
            yhlbmkCols: [
                {
                    title: '规则id',
                    key: 'id',
                    width: 70,
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
                	title: "商品主图",
                	key: "pic",
                	width: 150,
                	align: "center",
                	render: (h, params) => {
                		console.log(params.row.pic)
                		var str=params.row.productImg
                		if(str){
//                 			str = str.substring(0, str.lastIndexOf(','))
                			var arr = str.split(',');
                			return h('img', {
                	　　　　　　　　attrs: {
                	　　　　　　　　　　src: arr,
                	　　　　　　　　},
                	　　　　　　　　style: {
                	　　　　　　　　　　width: '50px',
                						height:"50px",
                						margin:'10px 0'
                	　　　　　　　　},
                					on: {
                						click: () => {
                							this.showimage(arr);
                						}
                					}
                	　　　　　　});
                		}else{
                			return h('div', {},"暂无图片");
                		}
                		
                		
                	}
                },
                {
                    title: '档次名称',
                    key: 'gradeName',
                    align: 'center'
                },
				{
					title: '起拍价',
					key: 'startPrice',
					align: 'center'
				},
                {
                    title: '规则表达式',
                    key: 'cron',
                    align: 'center'
                },
                {
                    title: '规则描述',
                    key: 'descInfo',
                    width: 90,
                    align: 'center'
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
                    title: '状态',
                    key: 'action',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        let text = params.row.statusno;
                        if (text == 0) {
                            return h(
                                'Button',
                                {
                                    props: {
                                        type: 'dashed',
                                        size: 'small'
                                    },
                                    style: {
                                        width: '70px',
                                        marginLeft: '10px'
                                    },
                                    nativeOn: {
                                        click: () => {
                                            this.openCC(params);
                                        }
                                    }
                                },
                                '启用中'
                            );
                        } else {
                            return h(
                                'Button',
                                {
                                    props: {
                                        type: 'dashed',
                                        size: 'small'
                                    },
                                    style: {
                                        width: '70px',
                                        marginLeft: '10px'
                                    },
                                    nativeOn: {
                                        click: () => {
                                            this.openCC(params);
                                        }
                                    }
                                },
                                '禁用中'
                            );
                        }
                    }
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 200,
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
															this.deleteGood(params.row.id);
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
                                        size: 'small',
                                    },
                                    style: {
                                        // width: "70px",
										marginLeft: '10px'
                                    },
                                    on: {
                                        click: () => {
                                            this.updateAuto(params.row);
                                        }
                                    }
                                },
                                '配置自动场次'
                            )
                        ]);
                    }
                }
            ],
            // 用户列表表格分页数据
            yhlbmktablePageData: {
                list: [], // 表格列表
                total: 0, // 总条数
                pages: 0, // 总页数
                pageSize: 0, // 每页条数
                currentPage: 0 ,// 当前页码
				total1: 0, // 总条数
				pages1: 0, // 总页数
				pageSize1: 0, // 每页条数
				currentPage1: 0 // 当前页码
            },
            yhlbmkModal: false, // 添加新增用户的对话框显示状态
            yhlbmkLoading: true, // 添加新增用户的对话框加载状态
            // 新增用户的对话框表单
            yhlbmkAddObj: {
                cron: '', //规则表达式
                desc: '', //规则描述
                startTime: '', //开始时间
                endTime: '' ,//结束时间
				wiatTime: '', //等待默认时长
				computeTime: '', //计算时长
				times: '', //抢拍默认时长
				incrementValue:'',//加价
            },
			ccidlist: {} //场次id
        };
    },
    created() {
        // 获取用户列表数据
        this.yhlbmkGetList(1, this.yhlbmkIsSearch);
    },
    mounted: function() {
        this.showtype();
		this.gettimes();
		this.showdctype();
    },
    methods: {
        // 列表的页码改变
        yhlbmkPageChange(currentPage) {
            this.yhlbmkGetList(currentPage, this.yhlbmkIsSearch); // 获取用户列表数据
        },
		//查询页码改变
		searchepageChange(currentPage) {
				this.yhlbmkSearch(currentPage);
		},
		//商品列表页码改变
		goodpageChange(currentPage) {
			this.getlistgood(currentPage); // 获取用户列表数据
		},
		//查询商品页面改变
		segoodpageChange(currentPage) {
			this.searchgood(currentPage);
		},
        // 获取用户列表数据（调用接口的）---接口
        yhlbmkGetList(currentPage, isSearch) {
            // currentPage：当前页数   isLimitTime：是否限制时间段
            // 参数对象
            var params = {
                pageNum: currentPage, // 当前页码
                pageSize: 10 // 每页条数
            };
            console.log(params);
            let postData = this.$qs.stringify(params);
            console.log(postData);
            axios
                .post('/api/auction/autoClassRule/sys/init', postData)
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
        // 点击用户列表的查询
        yhlbmkSearch(currentPage) {
			this.listobj = false;

            if (this.yhlbmkIpVal) {
                let params = {
                    productName: this.yhlbmkIpVal,
                    pageNum: currentPage, // 当前页码
                    pageSize: 10 // 每页条数
                };
                let postData = this.$qs.stringify(params);
                axios
                    .post('/api/auction/autoClassRule/sys/findAutoClassRuleByproductName', postData)
                    .then(response => {
                        var res = response.data;
						if(res.code==200){
							if(res.data==null){
								this.yhlbmktablePageData.list=[];
							}else{
								this.yhlbmktablePageData = res.data;
								this.yhlbmktablePageData.total1=res.data.total;
								this.yhlbmktablePageData.pages1=res.data.pages;
								this.yhlbmktablePageData.pageSize1=res.data.pageSize
							}
						}else{
							this.yhlbmktablePageData.list=[];
						}
                        
                    })
                    .catch(error => {
                        console.log(error);
                    });
            } else {
				this.listobj = true;
                this.yhlbmkGetList(1, this.yhlbmkIsSearch); // 获取用户列表数据
				//页码重置为1
				this.$nextTick(function(){
					this.$refs['pages'].currentPage = 1;
				})
            }
        },
        openCC(rows) {
            let stsno;
            if (rows.row.statusno == 1) {
                stsno = 0;
            } else {
                stsno = 1;
            }
            var params = {
                id: rows.row.id,
                statusno: stsno
            };
            console.log(params);
            let postData = this.$qs.stringify(params);
            console.log(postData);
            axios
                .post('/api/auction/autoClassRule/sys/isUse', postData)
                .then(response => {
                    if (response.data.code == 200) {
                        Util.success('操作成功');
                        this.yhlbmkGetList(1, this.yhlbmkIsSearch);
                    }else {
                        Util.error('操作失败,'+response.data.msg);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        inquiry() {
            this.yhlbmkModal = true;
			this.gettimes();
        },
        //跳转出查询商品
        setProduct() {
            //this.yhlbmkModal = false; // 关闭当前模态
			this.model1=this.producenames=this.startPrice=this.endPrice=this.searchValue='';
            this.goodModal = true;
            // 参数对象
            this.getlistgood(1);
        },
        searchgood(currentPage) {
			if(this.model1 !=''){
				this.model1=this.$refs['lists'].tmpSelected[1].label;
			}
			this.listobjgood = false;
            if (
                this.model1 ||
                this.producenames ||
                this.startPrice ||
                this.endPrice ||
                this.searchValue
            ) {
                var seartime = this.searchValue;
                seartime = seartime.replace(/-/g, '');
                var params = {
                    pageNum: currentPage, // 当前页码
                    pageSize: 10, // 每页条数
                    productName: this.producenames,
                    productType: this.model1,
                    startPrice: this.startPrice,
                    endPrice: this.endPrice,
                    createTime: seartime
                };
                let postData = this.$qs.stringify(params);
                axios
                    .post('/api/auction/product/sys/selectProduct', postData)
                    .then(response => {
                        var res = response.data;
                        // this.choicegoodlist = res.data;
						if(res.code==200){
							if(res.data==null){
								this.choicegoodlist.list=[];
							}else{
								this.choicegoodlist = res.data;
							}
						}else{
							this.choicegoodlist.list=[];
						}
                        //this.goodModal=true
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
        selectgoods(row) {
            this.goodchoiced = row;
			this.yhlbmkAddObj.desc=this.goodchoiced.productName
			this.updatacc.desc=this.goodchoiced.productName
            console.log(this.goodchoiced.productPrice);
            this.goodModal = false;
            //this.yhlbmkModal = true;
        },
        getlistgood(currentPage) {
            var params = {
                pageNum: currentPage, // 当前页码
                pageSize: 10 // 每页条数
            };
            let postData = this.$qs.stringify(params);
            axios
                .post('/api/auction/product/sys/init', postData)
                .then(response => {
                    var res = response.data;
                    this.choicegoodlist = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
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
        //选择开始时间
        handleChange(daterange) {
            this.startValue = daterange;
        },
        //选择结束时间
        handleChange1(daterange) {
            this.endValue = daterange;
        },
        //修改开始时间
        handleChange2(daterange) {
            this.upstartValue = daterange;
        },
        //修改结束时间
        handleChange3(daterange) {
            this.upendValue = daterange;
        },
        handleChange4(daterange) {
            this.searchValue = daterange;
        },
        //显示图片
        showimage(imagearr) {
            this.imageModal = true;
			this.imageModal1 = true;
            this.imagelist = imagearr;
        },
        // 点击新增用户的对话框的ok
        yhlbmkOk() {
            // 参数对象
            var data = new Date(this.startValue);
            var time1 = data.getTime();
            var data2 = new Date(this.endValue);
            var time2 = data2.getTime();
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
                descInfo: this.yhlbmkAddObj.desc,
				productImg:this.goodchoiced.pic,
                productId: this.goodchoiced.id,
				productType:this.goodchoiced.pid,
                startPrice: this.goodchoiced.productPrice,
                cron: this.yhlbmkAddObj.cron,
                startTime: time1,
                endTime: time2,
				incrementValue: this.yhlbmkAddObj.incrementValue,
				times: this.yhlbmkAddObj.times,
				wiatTime: this.yhlbmkAddObj.wiatTime,
				computeTime: this.yhlbmkAddObj.computeTime,
				gradeId:this.model2,
				robotStatus:this.robotStatus,
				robotExitPrice:this.yhlbmkAddObj.robotExitPrice,
				robotMinNum:robotMinNum,
				robotMaxNum:robotMaxNum
            };
			if(params.descInfo=='' || params.gradeId=='' || params.productImg=='' || params.productId=='' || params.startPrice=='' || params.cron=='' || params.startTime=='' || params.endTime=='' || params.incrementValue=='' || params.times=='' || params.wiatTime=='' || params.computeTime==''){
				Util.error('正确填写表单');
			}else{
				this.yhlbmkLoading = false; // 关闭加载状态
				this.yhlbmkModal = false; // 关闭当前模态
				// 清除表单
				let postData = this.$qs.stringify(params);
				console.log(postData);
				axios
					.post('/api/auction/autoClassRule/sys/addAutoClassRule', postData)
					.then(response => {
						if (response.data.code == 200) {
							Util.success('添加成功');
							this.yhlbmkAddObj.desc = '';
							this.goodchoiced.productName = '请选择';
							this.goodchoiced.productType = ''; //选择商品清空
							this.goodchoiced.id = ''; //选择商品清空
							this.goodchoiced.productPrice = '';
							this.goodchoiced.pic = '';
							this.yhlbmkAddObj.cron = '';
							this.yhlbmkAddObj.incrementValue = '';
							this.robotNum ='';
							this.robot=false;
							this.robotStatus=0;
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
		updateAuto(row){
			this.updataTime=true
			this.ccid=row.id
			this.model3=row.gradeId
			this.updatacc.cron=row.cron
			this.updatacc.productId=row.productId
			this.goodchoiced.productName=row.productName
			this.updatacc.startPrice=row.startPrice
			this.updatacc.desc=row.descInfo
			this.upstartValue=new Date(row.startTime).Format('yyyy-MM-dd hh:mm:ss')
			this.upendValue=new Date(row.endTime).Format('yyyy-MM-dd hh:mm:ss')
			this.updatacc.incrementValue=row.incrementValue
			this.updatacc.times=row.times
			this.updatacc.computeTime=row.computeTime
			this.updatacc.wiatTime=row.wiatTime
			
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
		},
		updatatimeOk(){
			var data= new Date(this.upstartValue)
			var time1=data.getTime();
			var data2= new Date(this.upendValue)
			var time2=data2.getTime();
			let podid;
			if(this.goodchoiced.id){
				podid=this.goodchoiced.id
			}else{
				podid=this.updatacc.productId
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
				id:this.ccid,
				productId: podid,
				startPrice: this.updatacc.startPrice, 
				productType:this.goodchoiced.pid,
				cron: this.updatacc.cron, 
				startTime: time1, 
				endTime: time2, 
				descInfo: this.updatacc.desc, 
				incrementValue: this.updatacc.incrementValue, 
				times: this.updatacc.times, 
				computeTime: this.updatacc.computeTime, 
				wiatTime: this.updatacc.wiatTime, 
				gradeId:this.model3,
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
			axios.post('/api/auction/autoClassRule/sys/updateAutoClassRule', postData)
				.then(response => {
					if (response.data.code == 200) {
						Util.success('修改成功');
						this.yhlbmkAddObj.cron=''
						this.goodchoiced.productName='请选择'
						this.goodchoiced.id=''//选择商品清空
						this.yhlbmkAddObj.startPrice=''
						this.startValue=''
						this.endValue=''
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
			this.updataTime=false;
		},
		//获取轮次时长
		gettimes(){
			axios.post('/api/auction/operate/sys/init')
				.then( (response)=> {
					var res = response.data;
					var list=res.data.setlc;
					this.yhlbmkAddObj.times=list[1].cdVal || ""
					this.yhlbmkAddObj.wiatTime=list[2].cdVal || ""
					this.yhlbmkAddObj.computeTime=list[0].cdVal || ""
				})
				.catch( (error)=> {
				console.log(error);
				}); 
		},
		deleteGood(id) {
			if(confirm('是否确认删除')==true){
				let params = {};
				params.id = id;
				let postData = this.$qs.stringify(params);
				console.log(postData);
				axios
						.post('/api/auction/autoClassRule/sys/deleteAutoClassRuleById', postData)
						.then(response => {
								if (response.data.code == 200) {
										Util.success('删除成功');
										this.yhlbmkGetList(1, this.yhlbmkIsSearch);
								} else {
										Util.error('删除失败'+response.data.msg);
								}
								//var res = response.data;
								//this.yhlbmktablePageData.list=res.data;
						})
						.catch(error => {
								console.log(error);
						});
			}
				//this.sqlbmkApplyHandle(id, -1); // 申请处理
				// 重新获取申请列表数据
				//this.sqlbmkGetList(1, this.sqlbmkIsSearch);
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
