<!-- 帮助内容 -->
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
.mygoods .ivu-modal {
    width: 1200px !important;
    max-height: 700px;
    overflow: scroll;
}
</style>

<template>
    <div class="tabsBox_style">
            <!-- 帮助内容 -->
                <div class="itemBox yhlb_table">
                    <div class="remark_box">
                        <Row>
                            <Col span="4">
                                <h3>帮助内容</h3>
                            </Col>
                            <Col span="4" style="textAlign:center;">
                                <div class="searchBox clearfix">
									<Button
										type="error"
										style="float:left;width:60px;marginLeft:20px;"
										size="small"
										@click="addgood"
									>录入</Button>
                                </div>
								<Modal
									v-model="yhlbmkModal"
									title="新增"
									:loading="yhlbmkLoading"
									@on-ok="yhlbmkOk"
									@on-cancel="yhlbmkCancel"
								>
									<div style="marginBottom:10px;textAlign:center">
										<div
											style="display:inline-block;width:86px;textAlign:left"
										>
											<span style="color:red;"></span>帮助标题：
										</div>
										<Input
											type="text"
											v-model="yhlbmkAddObj.title"
											placeholder="请输入帮助标题"
											style="width:300px"
										></Input>
									</div>
									<div style="marginBottom:10px;textAlign:center">
										<div
											style="display:inline-block;width:86px;textAlign:left"
										>
										</div>
										<div style="display:inline-block;width:300px;color:red;text-align: left;">
											帮助：标题使用/@/分割，换行使用\n,一段内容输入完成使用/%/表示结束<br />
											例如：
											*评论获得/@/评论商品获得奖励1个\n说明：每天可评论无数次/%/<br />
											展示效果：<br />
											*评论获得<br />
											评论商品获得奖励1个<br />
											说明：每天可评论无数次
										</div>
									</div>
									<div style="marginBottom:10px;textAlign:center">
										<div
											style="display:inline-block;width:86px;textAlign:left"
										>
											<span style="color:red;"></span>帮助内容：
										</div>
										<Input
											type="textarea"
											:rows="4"
											v-model="yhlbmkAddObj.content"
											placeholder="请输入帮助内容"
											style="width:300px"
										></Input>
									</div>
								</Modal>
								<Modal
									v-model="upModal"
									title="修改"
									:loading="yhlbmkLoading"
									@on-ok="updateOk"
									@on-cancel="yhlbmkCancel"
								>
									<div style="marginBottom:10px;textAlign:center">
										<div
											style="display:inline-block;width:86px;textAlign:left"
										>
											<span style="color:red;"></span>帮助标题：
										</div>
										<Input
											type="text"
											v-model="yhlbmkAddObj.title"
											placeholder="请输入帮助标题"
											style="width:300px"
										></Input>
									</div>
									<div style="marginBottom:10px;textAlign:center">
										<div
											style="display:inline-block;width:86px;textAlign:left"
										>
										</div>
										<div style="display:inline-block;width:300px;color:red;text-align: left;">
											帮助：标题使用/@/分割，换行使用\n,一段内容输入完成使用/%/表示结束<br />
											例如：
											*评论获得/@/评论商品获得奖励1个\n说明：每天可评论无数次/%/<br />
											展示效果：<br />
											*评论获得<br />
											评论商品获得奖励1个<br />
											说明：每天可评论无数次
										</div>
									</div>
									<div style="marginBottom:10px;textAlign:center">
										<div
											style="display:inline-block;width:86px;textAlign:left"
										>
											<span style="color:red;"></span>帮助内容：
										</div>
										<Input
											type="textarea"
											:rows="8"
											v-model="yhlbmkAddObj.content"
											placeholder="请输入帮助内容"
											style="width:300px"
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
			goodModal:false,
			startValue:'',
			statusList:[{
				groupType:1,
				groupName:"系统消息"
			},{
				groupType:2,
				groupName:"订单消息"
			},{
				groupType:3,
				groupName:"交易消息"
			},{
				groupType:4,
				groupName:"通知消息"
			}],
			upModal:false,
            yhtjtableData: [], // 用户统计表格数据
            yhlbmkIpVal: "", // 用户列表的搜索条件
            yhlbmkIsSearch: false, // 是否加入搜索词
            // 用户列表表格的标题行数据（列属性名称）
            yhlbmkCols: [
                {
                	title: "id",
                	key: "id",
                	align: "center"
                },
                {
                	title: "标题",
                	key: "title",
                	align: "center"
                },
				{
					title: "内容",
					key: "content",
					align: "center"
				},
                {
                	title: "状态",
                	key: "flag",
                	width: 90,
                	align: "center",
					render: (h,params)=> {
						let text = params.row.flag
						if(text==1){
							return h(
							"Button",
							{
								props: {
									type: "dashed",
									size: "small"
								},
								style: {
									// width: "70px",
									marginLeft: "10px"
								},
								nativeOn: {
									click: () => {
										this.goorder(params)
									}
								}
							},
							"开启中"
							)
						}else{
							return	h(
								"Button",
								{
									props: {
										type: "dashed",
										size: "small"
									},
									style: {
										// width: "70px",
										marginLeft: "10px"
									},
									nativeOn: {
										click: () => {
											this.goorder(params)
										}
									}
								},
								"禁用中"
							)
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
										size: 'small'
									},
									style: {
										// width: "70px",
										marginLeft: '10px'
									},
									on: {
										click: () => {
											this.updateGood(params.row);
										}
									}
								},
								'修改'
							)
						]);
					}
				}
            ],
            // 消息列表表格分页数据
            yhlbmktablePageData: {
                list: [], // 表格列表
                total: 0, // 总条数
                pages: 0, // 总页数
                pageSize: 0, // 每页条数
                currentPage: 0 // 当前页码
            },
			// 用户列表表格分页数据
			choicegoodlist: {
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
                hotbirdNum: "" ,
				userId:'请选择',
            },
			model1:'',
			model2:'',
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
            axios.get('/api/auction/helpContent/sys/findListPage',{
				params:{
					pageNum: currentPage, // 当前页码
					pageSize: 10, // 每页条数
				}
			})
            	.then( (response)=> {
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
                Util.error("请输入消息内容");
            }
        },
		goorder(params){
			if(params.row.flag==0){
				this.orderId=1
			}
			if(params.row.flag==1){
				this.orderId=0
			}
			let json={
				flag:this.orderId,
				id:params.row.id,
				content:params.row.content,
				title:params.row.title,
			};
			//let postData = this.$qs.stringify(json);
			axios.post('/api/auction/helpContent/sys/update',json)
				.then( (response)=> {
				if(response.data.code==200){
					Util.success("修改成功");
					this.yhlbmkGetList(1, this.yhlbmkIsSearch);
				}else{
					Util.error("修改成功");
				}
				})
				.catch( (error)=> {
				console.log(error);
				});
		},
		yhlbmkOk(){
			this.yhlbmkModal=false;
			let json={
				title:this.yhlbmkAddObj.title,
				content:this.yhlbmkAddObj.content,
				flag:"1",
			};
			//let postData = this.$qs.stringify(json);
			axios.post('/api/auction/helpContent/sys/add',json)
				.then( (response)=> {
				if(response.data.code==200){
					Util.success("录入成功");
					this.yhlbmkGetList(1, this.yhlbmkIsSearch);
				}else{
					Util.error("录入失败");
				}
				})
				.catch( (error)=> {
				console.log(error);
				});
		},
		//增加商品
		addgood() {
			this.yhlbmkAddObj.title = '';
			this.yhlbmkAddObj.content=''
			this.yhlbmkModal = true;
		},
		deleteGood(id) {
			if(confirm('是否确认删除')==true){
			let params = {};
			params.id = id;
			//let postData = this.$qs.stringify(params);
			axios
				.post('/api/auction/helpContent/sys/del', params)
				.then(response => {
					if (response.data.code == 200) {
						Util.success('删除成功');
						this.yhlbmkGetList(1, this.yhlbmkIsSearch);
					} else {
						Util.error('删除失败');
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
		//点击修改
		updateGood(params) {
			this.upModal=true;
			this.yhlbmkAddObj.title = params.title;
			this.yhlbmkAddObj.content = params.content;
			this.yhlbmkAddObj.id = params.id;
		},
		//修改
		updateOk() {
			// 参数对象
			let params = {
				title:this.yhlbmkAddObj.title,
				content:this.yhlbmkAddObj.content,
				id:this.yhlbmkAddObj.id,
			};
			//let postData = this.$qs.stringify(params);
			axios.post('/api/auction/helpContent/sys/update',params)
				.then( (response)=> {
					console.log(response)
					if(response.data.code==200){
						Util.success("修改成功");
						this.yhlbmkGetList(this.yhlbmktablePageData.pageNum, this.yhlbmkIsSearch);
					}else{
						Util.error("修改失败");
					}
				})
				.catch( (error)=> {
					console.log(error);
				});
			this.upModal=false;
			setTimeout(() => {
				this.yhlbmkLoading = false;
				this.$nextTick(() => {
					this.yhlbmkLoading = true;
				});
			}, 10);
		},
    }
};
</script>
