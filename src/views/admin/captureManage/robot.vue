<!-- 机器人管理 -->
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
            <!-- 机器人管理 -->
                <div class="itemBox yhlb_table">
                    <div class="remark_box">
                        <Row>
                            <Col span="4">
                                <h3>机器人管理</h3>
                            </Col>
							<Col span="3">
							     <div class="searchBox clearfix">
							    	<Button
							    		type="error"
							    		style="float:left;width:60px;marginLeft:20px;"
							    		size="small"
							    		@click="goorder"
							    	>批量开启</Button>
							    </div>
								<div class="searchBox clearfix">
									<Button
										type="error"
										style="float:left;width:60px;marginLeft:20px;"
										size="small"
										@click="deleterobot"
									>批量销毁</Button>
								</div>
							</Col>
							<Col span="3">
							     <div class="searchBox clearfix">
							    	<Button
							    		type="error"
							    		style="float:left;width:60px;marginLeft:20px;"
							    		size="small"
							    		@click="goorderall"
							    	>全部开启</Button>
							    </div>
								<div class="searchBox clearfix">
									<Button
										type="error"
										style="float:left;width:60px;marginLeft:20px;"
										size="small"
										@click="deleterobotall"
									>全部销毁</Button>
								</div>
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
											<span style="color:red;"></span>机器人数量：
										</div>
										<Input
											type="text"
											v-model="yhlbmkAddObj.count"
											placeholder="请输入机器人数量"
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
							@on-selection-change='getuserlist'
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
								ref="pages"
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
					type: 'selection',
					width: 60,
					align: 'center'
				},
                {
                	title: "id",
                	key: "id",
                	align: "center"
                },
                {
                	title: "用户名",
                	key: "userName",
                	align: "center"
                },
				{
					title: "电话号码",
					key: "phone",
					align: "center"
				},
				{
					title: "邀请人id",
					key: "invitationUserId",
					align: "center"
				},
                {
                	title: "状态",
                	key: "flag",
                	align: "center",
					render: (h,params)=> {
						let text = params.row.openno
						if(text==1){
							return h(
							"Button",
							{
								props: {
									type: 'warning',
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
							"开启"
							)
						}else{
							return h('div','启用中')
						}
					}
                },
				{
					title: '操作',
					key: 'action',
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
											this.deleterobot(params);
										}
									}
								},
								'销毁'
							),
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
			dangci:{},
			robotlist:[]
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
            axios.get('/api/auction/robot/getRobotListPage',{
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
		goorder(json){
			let userId=[]
			if(json.row){
				userId=[json.row.id]
			}else{
				userId=this.robotlist
			}
			let postData =JSON.stringify(userId);
			axios.post('/api/auction/robot/start',{
				userId:userId
			})
				.then( (response)=> {
					var res = response.data;
					if (res.code == 200) {
						Util.success("启用成功");
						// this.yhlbmkGetList(1, this.yhlbmkIsSearch);
						this.yhlbmkGetList(this.yhlbmktablePageData.pageNum, this.yhlbmkIsSearch);
						this.$nextTick(function(){
							this.$refs['pages'].currentPage = this.yhlbmktablePageData.pageNum;
						})
					} else {
						Util.error("启用失败");
					}
				})
				.catch( (error)=> {
				console.log(error);
				});
		},
		//全部开启
		goorderall(){
			if (confirm('是否确认全部开启？') == true) {
				axios.post('/api/auction/robot/start')
					.then( (response)=> {
						var res = response.data;
						if (res.code == 200) {
							Util.success("启用成功");
							// this.yhlbmkGetList(1, this.yhlbmkIsSearch);
							this.yhlbmkGetList(this.yhlbmktablePageData.pageNum, this.yhlbmkIsSearch);
							this.$nextTick(function(){
								this.$refs['pages'].currentPage = this.yhlbmktablePageData.pageNum;
							})
						} else {
							Util.error("启用失败");
						}
					})
					.catch( (error)=> {
					console.log(error);
					});
			}
		},
		yhlbmkOk(){
			this.yhlbmkModal=false;
			//let postData = this.$qs.stringify(json);
			axios.get('/api/auction/robot/add',{
				params:{
					count:this.yhlbmkAddObj.count
				}
			})
				.then( (response)=> {
				if(response.data.code==200){
					Util.success("录入成功");
					// this.yhlbmkGetList(1, this.yhlbmkIsSearch);
					this.yhlbmkGetList(this.yhlbmktablePageData.pageNum, this.yhlbmkIsSearch);
					this.$nextTick(function(){
						this.$refs['pages'].currentPage = this.yhlbmktablePageData.pageNum;
					})
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
			this.yhlbmkAddObj.count = '';
			this.yhlbmkModal = true;
		},
		deleterobot(json){
			let userId=[]
			if(json.row){
				userId=[json.row.id]
			}else{
				userId=this.robotlist
			}
			//let postData = this.$qs.stringify(json);
			let postData =JSON.stringify(userId);
			axios.post('/api/auction/robot/close',{
				userId:userId
			})
				.then( (response)=> {
					var res = response.data;
					if (res.code == 200) {
						Util.success("销毁成功");
						// this.yhlbmkGetList(1, this.yhlbmkIsSearch);
						this.yhlbmkGetList(this.yhlbmktablePageData.pageNum, this.yhlbmkIsSearch);
						this.$nextTick(function(){
							this.$refs['pages'].currentPage = this.yhlbmktablePageData.pageNum;
						})
					} else {
						Util.error("销毁失败");
					}
				})
				.catch( (error)=> {
				console.log(error);
				});
		},
		//全部销毁
		deleterobotall(){
			if (confirm('是否确认全部销毁？') == true) {
				axios.post('/api/auction/robot/close')
					.then( (response)=> {
						var res = response.data;
						if (res.code == 200) {
							Util.success("销毁成功");
							// this.yhlbmkGetList(1, this.yhlbmkIsSearch);
							this.yhlbmkGetList(this.yhlbmktablePageData.pageNum, this.yhlbmkIsSearch);
							this.$nextTick(function(){
								this.$refs['pages'].currentPage = this.yhlbmktablePageData.pageNum;
							})
						} else {
							Util.error("销毁失败");
						}
					})
					.catch( (error)=> {
					console.log(error);
					});
			}
		},
		getuserlist(list){
			for(let i=0;i<list.length;i++){
				this.robotlist.push(list[i].id)
			}
		}
    }
};
</script>
