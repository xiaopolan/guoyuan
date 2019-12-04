<!-- 积分管理列表页 -->
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
</style>

<template>
	<div class="tabsBox_style">
		<!-- 积分管理列表页 -->
		<div class="itemBox yhlb_table">
			<div class="remark_box">
				<Row>
					<Col span="4">
					<h3>积分管理列表</h3>
					</Col>
					<Col span="10" style="textAlign:center;">
					<div class="searchBox clearfix">
						<Input v-model="yhlbmkIpVal" size="small" placeholder="请输入电话号码" style="float:left;width: 200px">
						</Input>
						<Button type="error" style="float:left;width:60px;marginLeft:20px;" size="small" @click="yhlbmkSearch(1)">查询</Button>

					</div>
					<Modal
						v-model="upModal"
						title="冻结"
						:loading="yhlbmkLoading"
						@on-ok="updateOk"
						@on-cancel="yhlbmkCancel"
					>
						<div style="marginBottom:10px;textAlign:center">
							<div
								style="display:inline-block;width:86px;textAlign:left"
							>
							</div>
							<div style="display:inline-block;width:150px;color:red;text-align: left;">
								*当前可冻结积分{{integral}}
							</div>
						</div>
						<div style="marginBottom:10px;textAlign:center">
							<div
								style="display:inline-block;width:86px;textAlign:left"
							>冻结积分数：</div>
							<Input
								v-model="yhlbmkAddObj.freezeIntegral"
								placeholder="请输入冻结积分数"
								style="width:150px"
							></Input>
						</div>
						<div style="marginBottom:10px;textAlign:center">
							<div
								style="display:inline-block;width:86px;textAlign:left"
							>描述：</div>
							<Input
								type="textarea"
								v-model="yhlbmkAddObj.desc"
								placeholder="请输入描述"
								style="width:150px"
							></Input>
						</div>
					</Modal>
					<Modal
						v-model="unfreezemo"
						title="解冻"
						:loading="yhlbmkLoading"
						@on-ok="updateOkfree"
						@on-cancel="yhlbmkCancel"
					>
						<div style="marginBottom:10px;textAlign:center">
							<div
								style="display:inline-block;width:86px;textAlign:left"
							>
							</div>
							<div style="display:inline-block;width:150px;color:red;text-align: left;">
								*可解冻积分{{freezeIntegral}}
							</div>
						</div>
						<div style="marginBottom:10px;textAlign:center">
							<div
								style="display:inline-block;width:86px;textAlign:left"
							>解冻积分数：</div>
							<Input
								v-model="yhlbmkAddObj.freezeIntegral"
								placeholder="请输入解冻积分数"
								style="width:150px"
							></Input>
						</div>
						<div style="marginBottom:10px;textAlign:center">
							<div
								style="display:inline-block;width:86px;textAlign:left"
							>描述：</div>
							<Input
								type="textarea"
								v-model="yhlbmkAddObj.desc"
								placeholder="请输入描述"
								style="width:150px"
							></Input>
						</div>
					</Modal>
					</Col>
				</Row>
			</div>
			<div class="tablepage_box">
				<!-- 导出按钮 -->
				<div class="exportBtnBox clearfix">
					<!-- <Button
                                class="exportBtn"
                                type="primary"
                                size="small"
                                @click="yhlbmkExportData"
                            >
                                <Icon class="icon_export" type="ios-download-outline"></Icon>导出数据
                            </Button> -->
				</div>
				<!-- 用户列表数据表格 -->
				<Table ref="yhlbmkTable" border :columns="yhlbmkCols" :data="yhlbmktablePageData.list"></Table>
				<div v-if="listobj" class="pageBox" :style="{marginTop: '25px',paddingBottom: '35px'}">
					<!-- 分页 -->
					<Page :total="yhlbmktablePageData.total" :page-size="yhlbmktablePageData.pageSize" :current="yhlbmktablePageData.currentPage"
					 show-elevator @on-change="yhlbmkPageChange"></Page>
					<span>共&nbsp;{{yhlbmktablePageData.pages}}&nbsp;页</span>
				</div>
				<div v-else class="pageBox" :style="{marginTop: '25px',paddingBottom: '35px'}">
					<!-- 分页 -->
					<Page :total="yhlbmktablePageData.total1" :page-size="yhlbmktablePageData.pageSize1" show-elevator @on-change="searchepageChange"></Page>
					<span>共&nbsp;{{yhlbmktablePageData.pages1}}&nbsp;页</span>
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
				freezeIntegral:'',
				integral:'',
				unfreezemo:false,
				upModal:false,
				listobj: true,
				yhtjtableData: [], // 用户统计表格数据
				// 用户列表相关
				yhlbmkIpVal: "", // 用户列表的搜索条件
				yhlbmkIsSearch: false, // 是否加入搜索词
				// 用户列表表格的标题行数据（列属性名称）
				yhlbmkCols: [{
						title: "用户名称",
						key: "userName",
						align: "center"
					},
					{
						title: "电话号码",
						key: "phone",
						align: "center"
					},
					{
						title: "手续费",
						key: "cost",
						align: "center"
					},
					{
						title: "积分变动",
						key: "limitno",
						align: "center"
					},
					{
						title: "可用积分",
						key: "integral",
						align: "center"
					},
					{
						title: "冻结积分",
						key: "freezeIntegral",
						align: "center"
					},
					{
						title: "描述",
						key: "retains",
						align: "center"
					},
					{
						title: '交易时间',
						key: 'createTime',
						align: 'center',
						render: (h, params) => {
							return h(
								'div',
								new Date(params.row.createTime).Format('yyyy-MM-dd hh:mm:ss')
							); /*这里的this.row能够获取当前行的数据*/
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
					                            this.freeze(params.row);
					                        }
					                    }
					                },
					                '冻结'
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
					                            this.unfreeze(params.row);
					                        }
					                    }
					                },
					                '解冻'
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
					currentPage: 0, // 当前页码
					total1: 0, // 总条数
					pages1: 0, // 总页数
					pageSize1: 0, // 每页条数
					currentPage1: 0 // 当前页码
				},
				yhlbmkModal: false, // 添加新增用户的对话框显示状态
				yhlbmkLoading: true, // 添加新增用户的对话框加载状态
				// 新增用户的对话框表单
				yhlbmkAddObj: {
					freezenum:'',
					desc:''
				}
			};
		},
		//     created() {
		//         // 获取用户列表数据
		//         this.yhlbmkGetList(1, this.yhlbmkIsSearch);
		//     },
		activated() {
			// 获取用户列表数据
			var json = this.$route.params.phone
			if (json) {
				this.yhlbmkIpVal = json
				this.yhlbmkSearch(1);
			} else {
				this.yhlbmkGetList(1, this.yhlbmkIsSearch);
			}
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
				if (isSearch) {
					// 加入搜索词
					params.searchId = this.yhlbmkIpVal;
				}
				console.log(params);
				// 模拟请求接口返回的数据
				let postData = this.$qs.stringify(params);
				axios.post('/api/auction/integralDetail/sys/init', postData)
					.then((response) => {
						var res = response.data;
						if (res.code == 200) {
							if (res.data == null) {
								this.yhlbmktablePageData.list = [];
							} else {
								this.yhlbmktablePageData = res.data;
							}
						} else {
							this.yhlbmktablePageData.list = [];
						}
					})
					.catch((error) => {
						console.log(error);
					});
			},
			// 用户列表的选择器发生变化
			yhlbmkSlChange(currentPage) {
				// console.log("选择器变化");
				// 获取用户列表数据
				this.yhlbmkGetList(currentPage, this.yhlbmkIsSearch);
			},
			searchepageChange(currentPage) {
				this.yhlbmkSearch(currentPage);
			},
			// 点击用户列表的查询
			yhlbmkSearch(currentPage) {
				this.listobj = false;
				if (this.yhlbmkIpVal) {
					let params = {
						pageNum: currentPage, // 当前页码
						pageSize: 10, // 每页条数
						phone: this.yhlbmkIpVal
					};
					let postData = this.$qs.stringify(params);
					axios.post('/api/auction/integralDetail/sys/findIntegralByPhone', postData)
						.then((response) => {
							var res = response.data;
							if (res.code == 200) {
								if (res.data == null) {
									this.yhlbmktablePageData.list = [];
								} else {
									this.yhlbmktablePageData = res.data;
									this.yhlbmktablePageData.total1 = res.data.total;
									this.yhlbmktablePageData.pages1 = res.data.pages;
									this.yhlbmktablePageData.pageSize1 = res.data.pageSize
								}
							} else {
								this.yhlbmktablePageData.list = [];
							}
						})
						.catch((error) => {
							console.log(error);
						});
				} else {
					this.listobj = true;
					this.yhlbmkGetList(1, this.yhlbmkIsSearch);
					//页码重置为1
					this.$nextTick(function() {
						this.$refs['pages'].currentPage = 1;
					})
				}
			},
			freeze(params){
				this.upModal = true;
				this.freezeIntegral = params.freezeIntegral;
				this.integral=params.integral;
				this.yhlbmkAddObj.userId = params.userId;
				this.yhlbmkAddObj.sourceId = params.id;
			},
			updateOk() {
			    // 参数对象
			
				let params = {
					freezeDesc:this.yhlbmkAddObj.desc,
					integralNum: this.yhlbmkAddObj.freezeIntegral,
					userId: this.yhlbmkAddObj.userId,
					sourceId: this.yhlbmkAddObj.sourceId,
				};
				let postData = this.$qs.stringify(params)
			    axios
			        .post('/api/auction/integralDetail/sys/integralFreeze', postData)
			        .then(response => {
			            console.log(response);
			            if (response.data.code == 200) {
			                Util.success('冻结成功');
			                this.yhlbmkGetList(1, this.yhlbmkIsSearch);
			            } else {
			                Util.error('冻结失败');
			            }
			        })
			        .catch(error => {
			            console.log(error);
			        });
			    // 清除表单
			    this.yhlbmkLoading = false; // 关闭加载状态
			    this.upModal = false;
			},
			unfreeze(params){
				this.unfreezemo= true;
				this.freezeIntegral = params.freezeIntegral;
				this.integral=params.integral;
				this.yhlbmkAddObj.userId = params.userId;
				this.yhlbmkAddObj.sourceId = params.id;
			},
			updateOkfree(){
				let params = {
					freezeDesc:this.yhlbmkAddObj.desc,
					integralNum: this.yhlbmkAddObj.freezeIntegral,
					userId: this.yhlbmkAddObj.userId,
					sourceId: this.yhlbmkAddObj.sourceId,
				};
				let postData = this.$qs.stringify(params)
				axios
				    .post('/api/auction/integralDetail/sys/integralUnfrozen', postData)
				    .then(response => {
				        console.log(response);
				        if (response.data.code == 200) {
				            Util.success('解冻成功');
				            this.yhlbmkGetList(1, this.yhlbmkIsSearch);
				        } else {
				            Util.error('解冻失败');
				        }
				    })
				    .catch(error => {
				        console.log(error);
				    });
				// 清除表单
				this.yhlbmkLoading = false; // 关闭加载状态
				this.upModal = false;
			}
		}
	};
</script>
