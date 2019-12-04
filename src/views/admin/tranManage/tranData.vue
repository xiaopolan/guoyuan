<!-- 交易单管理 -->
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
.layout_content .tablepage_box {
    padding: 20px 40px;
    text-align: center;
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
.typeselect{
	width: 150px;
    height: 25px;
    border: 1px solid #dcdee2;
    border-radius: 4px;
    color: #515a6e;
}
</style>

<template>
    <div class="tabsBox_style">
            <!-- 交易单管理 -->
                <div class="itemBox yhlb_table">
                    <div class="remark_box">
                        <Row>
                            <Col span="4">
                                <h3>交易单管理</h3>
                            </Col>
                            <Col span="12" style="textAlign:center;">
                                <div class="searchBox clearfix">
                                    <Input
                                        v-model="yhlbmkIpVal"
                                        size="small"
                                        placeholder="请输入交易单号"
                                        style="float:left;width: 200px"
                                    >
                                        <Icon
                                            type="ios-search-strong"
                                            slot="append"
                                            @click="yhlbmkSearch"
                                        ></Icon>
                                    </Input>
                                    <Button
                                        type="error"
                                        style="float:left;width:60px;marginLeft:20px;"
                                        size="small"
                                        @click="queryOrder(1)"
                                    >查询</Button>
                                </div>
								<Modal
									v-model="upModal"
									title="修改"
									:loading="yhlbmkLoading"
									@on-ok="updateOk"
									@on-cancel="yhlbmkCancel"
								>
									<div style="marginBottom:10px;textAlign:center">
										<div
											style="display:inline-block;width:120px;textAlign:left"
										>备注
										</div>
										<Input
											type="textarea"
											v-model="retain"
											placeholder="请输入备注"
											style="width:200px"
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
                                :current="yhlbmktablePageData.currentPage"
                                show-elevator
                                @on-change="yhlbmkPageChange"
                            ></Page>
                            <span>共&nbsp;{{yhlbmktablePageData.pages}}&nbsp;页</span>
                        </div>
						<div v-else class="pageBox" :style="{marginTop: '25px',paddingBottom: '35px'}">
							<!-- 分页 -->
							<Page
								:total="yhlbmktablePageData.total"
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
import Util from "@/libs/util";
import axios from 'axios'
export default {
    name: "userList",
    data() {
        return {
			retain:'',
			upModal:false,
            yhlbmkIpVal: "", // 用户列表的搜索条件
            yhlbmkIsSearch: false, // 是否加入搜索词
            // 用户列表表格的标题行数据（列属性名称）
            yhlbmkCols: [
                {
                	title: "订单编号",
					key: "sheetNo",
                	align: "center"
                },
                {
                	title: "交易方式",
                	key: "type",
                	align: "center",
					render: (h,params)=> {
						let text = params.row.type
						if(text==1){
							return h('div','买入')
						}
						if(text==2){
							return h('div','卖出')
						}
					}
                },
                {
                	title: "数量",
                	key: "artcNum",
                	align: "center"
                },
				{
					title: "需求提供方",
					key: "provider",
					align: "center"
				},
				{
					title: "需求承接方",
					key: "underTasker",
					align: "center"
				},
				{
					title: "交易单状态",
					key: "sheetState",
					align: "center",
					render: (h,params)=> {
						let text = params.row.sheetState
						if(text==0){
							return h('div','下单')
						}
						if(text==1){
							return h('div','成功')
						}
						if(text==2){
							return h('div','失败')
						}
						if(text==3){
							return h('div','作废')
						}
						
					}
				},
				{
					title: "交易状态",
					key: "tradeState",
					align: "center",
					render: (h,params)=> {
						let text = params.row.tradeState
						if(text==1){
							return h('div','已承接')
						}
						if(text==2){
							return h('div','已付款')
						}
						if(text==3){
							return h('div','完成')
						}
						
					}
				},
				{
					title: "总金额",
					key: "totalPrice",
					align: "center"
				},
				{
					title: "支付方式",
					key: "payType",
					align: "center",
					render: (h,params)=> {
						let text = params.row.payType
						if(text==1){
							return h('div','银行卡')
						}
						if(text==2){
							return h('div','支付宝')
						}
						if(text==3){
							return h('div','微信')
						}
						
					}
				},
				{
					title: "支付帐号",
					key: "account",
					align: "center"
				},
				{
					title: "户名",
					key: "accountName",
					align: "center"
				},
				{
					title: "创建时间",
					key: "createTime",
					align: "center",
					render: (h, params) => {
						return h(
							'div',
							new Date(params.row.createTime).Format('yyyy-MM-dd hh:mm:ss')
						); /*这里的this.row能够获取当前行的数据*/
					}
				},
				{
					title: "备注",
					key: "retain",
					align: "center"
				},
				{
					title: '操作',
					key: 'action',
					align: 'center',
					render: (h, params) => {
						let sheetState = params.row.sheetState;
						let tradeState = params.row.tradeState;
						if (sheetState == 0 && tradeState ==1) {
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
												this.cancletran(params.row.sheetId);
											}
										}
									},
									'取消交易'
								)
							]);
						}else if(sheetState == 0 && tradeState == 2){
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
												this.cancletran(params.row.sheetId);
											}
										}
									},
									'取消交易'
								)
							]);
						}else{
							return h('div', '无法取消');
						}
					}
				}
            ],
            // 用户列表表格分页数据
            yhlbmktablePageData: {
                list: [], // 表格列表
                total: 0, // 总条数
                pages: 0, // 总页数
                pageSize: 0, // 每页条数
                currentPage: 0 // 当前页码
            },
            yhlbmkModal: false, // 添加新增用户的对话框显示状态
            yhlbmkLoading: true, // 添加新增用户的对话框加载状态
            // 新增用户的对话框表单
            yhlbmkAddObj: {
                phone: "", // 用户手机号
                pwd: "", // 用户密码
                nickName: "", // 用户昵称
                hotbirdNum: "" // 用户BinGo号
            },
			model1:'',
			cityList:[],
			orderId:'',
			logisticsCompany:'',
			logisticsNo:'',
			id:'',
			dangci:{}
        };
    },
    created() {
        // 获取用户列表数据
        this.yhlbmkGetList(1, this.yhlbmkIsSearch);
		
    },
    methods: {
        // 用户列表的页码改变
        yhlbmkPageChange(currentPage) {
            this.yhlbmkGetList(currentPage, this.yhlbmkIsSearch); // 获取用户列表数据
        },
        // 获取用户列表数据（调用接口的）---接口
        yhlbmkGetList(currentPage, isSearch) {
            // currentPage：当前页数   isLimitTime：是否限制时间段
            console.log("获取第" + currentPage + "页数据");

            // 参数对象
            var params = {
                pageNum: currentPage, // 当前页码
                pageSize: 10, // 每页条数
            };
            console.log(params);
             let postData = this.$qs.stringify(params);
            console.log(postData)
            axios.get('/api/auction/artcPayDetail/sys/getArtcPayDetailList',{
				params:{
					pageNum: currentPage, // 当前页码
					pageSize: 10, // 每页条数
				}
			})
            	.then( (response)=> {
            	var res = response.data;
            	this.yhlbmktablePageData=res.data;
            	})
            	.catch( (error)=> {
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
        yhlbmkSearch() {
            if (this.yhlbmkIpVal) {
                this.yhlbmkIsSearch = true; // 加入搜索词
                this.yhlbmkGetList(1, this.yhlbmkIsSearch); // 获取用户列表数据
            } else {
                Util.error("请输入电话号码");
            }
        },
		queryOrder(currentPage){
			if (this.yhlbmkIpVal) {
				let params= {
					pageNum: currentPage, // 当前页码
					pageSize: 10, // 每页条数
					sheetId:this.yhlbmkIpVal
				};
				//let postData = this.$qs.stringify(params);
				axios.get('/api/auction/artcPayDetail/sys/getArtcPayDetailBySheetId',{params})
					.then( (response)=> {
					var res = response.data;
					if(res==null){
						this.yhlbmktablePageData=[];
					}else{
						this.yhlbmktablePageData=res.data;
					}
					})
					.catch( (error)=> {
						console.log(error);
					});
			} else {
				this.yhlbmkGetList(1, this.yhlbmkIsSearch);
			}
		},
		cancletran(row){
			this.upModal = true;
			this.canid=row
		},
		updateOk() {
			// let params = {
			// 	id:this.canid,
			// 	retain:this.retain
			// };
			// let postData = this.$qs.stringify(params);
			axios
				.post('/api/auction/artcTradeSheet/sys/cancel', {
				id:this.canid,
				retain:this.retain
			})
				.then(response => {
						if (response.data.code == 200) {
								Util.success('取消交易成功');
								this.yhlbmkGetList(1, this.yhlbmkIsSearch);
						} else {
								Util.error('取消交易失败'+response.data.msg);
						}
						//var res = response.data;
						//this.yhlbmktablePageData.list=res.data;
				})
				.catch(error => {
						console.log(error);
				});
			setTimeout(() => {
				this.yhlbmkLoading = false;
				this.$nextTick(() => {
					this.yhlbmkLoading = true;
				});
			}, 10);
			 this.upModal = false;
		},
    }
};
</script>
