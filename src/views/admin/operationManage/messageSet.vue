<!-- 消息推送 -->
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
.serchinput {
    width: 150px;
    height: 25px;
    border: 1px solid #dcdee2;
    border-radius: 4px;
    color: #515a6e;
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
            <!-- 消息推送 -->
                <div class="itemBox yhlb_table">
                    <div class="remark_box">
                        <Row>
                            <Col span="4">
                                <h3>消息推送</h3>
                            </Col>
                            <Col span="12" style="textAlign:center;">
                                <div class="searchBox clearfix">
                                    <Input
                                        v-model="yhlbmkIpVal"
                                        size="small"
                                        placeholder="请输入消息内容"
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
											<span style="color:red;"></span>消息类型：
										</div>
										<select style="width:200px" name="public-choice" v-model="model1" class="typeselect">                                        
											<option :value="item.groupType" :key='item' v-for="item in statusList" >{{item.groupName}}</option>                                    
										</select>
									</div>
									<div style="marginBottom:10px;textAlign:center">
										<div
											style="display:inline-block;width:86px;textAlign:left"
										>
											<span style="color:red;"></span>用户id：
										</div>
										<input class="xuanze" @click="setProduct" v-model="yhlbmkAddObj.userId" readonly="readonly"></input>
									</div>
									<div style="marginBottom:10px;textAlign:center">
										<div
											style="display:inline-block;width:86px;textAlign:left"
										>
											<span style="color:red;"></span>消息内容：
										</div>
										<Input
											type="textarea"
											v-model="yhlbmkAddObj.msg"
											placeholder="请输入消息内容"
											style="width:200px"
										></Input>
									</div>
									<div style="marginBottom:10px;textAlign:center">
										<div
											style="display:inline-block;width:86px;textAlign:left"
										>时间：</div>
											<Date-picker :value="startValue" v-modal="startValue"  @on-change="handleChange"  type="datetime" placeholder="选择日期和时间" style="width: 200px"></Date-picker>
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
											<span style="color:red;"></span>消息类型：
										</div>
										<select style="width:200px" name="public-choice" v-model="model2" class="typeselect">                                        
											<option :value="item.groupType" :key='item' v-for="item in statusList" >{{item.groupName}}</option>                                    
										</select>
									</div>
									<div style="marginBottom:10px;textAlign:center">
										<div
											style="display:inline-block;width:86px;textAlign:left"
										>
											<span style="color:red;"></span>用户id：
										</div>
										<input class="xuanze" @click="setProduct" v-model="yhlbmkAddObj.userId" readonly="readonly"></input>
									</div>
									<div style="marginBottom:10px;textAlign:center">
										<div
											style="display:inline-block;width:86px;textAlign:left"
										>
											<span style="color:red;"></span>消息内容：
										</div>
										<Input
											type="textarea"
											v-model="yhlbmkAddObj.msg"
											placeholder="请输入消息内容"
											style="width:200px"
										></Input>
									</div>
									<div style="marginBottom:10px;textAlign:center">
										<div
											style="display:inline-block;width:86px;textAlign:left"
										>时间：</div>
											<Date-picker :value="startValue" v-modal="startValue"  @on-change="handleChange"  type="datetime" placeholder="选择日期和时间" style="width: 200px"></Date-picker>
									</div>
								</Modal>
								<Modal
									v-model="goodModal"
									title="选择用户"
									:loading="yhlbmkLoading"
									@on-cancel="yhlbmkCancel"
									class-name="mygoods"
								>
								<Row style="padding: 10px 0;">
										<Col span="5" style="textAlign:center;">
												<div class="searchBox clearfix">
														<div style="marginBottom:10px;textAlign:center">
															<div
																style="display:inline-block;width:86px;textAlign:center;height: 20px;"
															>手机号码：</div>
															<input
																	v-model="producenames"
																	size="small"
																	placeholder="请输入手机号码"
																	class="serchinput"
															>
															</input>
														</div>
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
											ref="pages"
											@on-change="getlistgood"
										></Page>
										<span>共&nbsp;{{choicegoodlist.pages}}&nbsp;页</span>
									</div>
									<div slot="footer"></div>
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
								ref="pages"
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
			goodsclo: [
				{
					title: "用户id",
					key: "id",
					width: 70,
					align: "center"
				},
				{
					title: "用户名称",
					key: "userName",
					align: "center"
				},
				{
					title: "用户类型",
					key: "userType",
					align: "center",
					render: (h,params)=> {
						let text = params.row.userType
						if(text==1){
							return h('div','低级')
						}
						else if(text==2){
							return h('div','中级')
						}
						else if(text==3){
							return h('div','高级')
						}else{
							return h('div','')
						}
					}
				},
				{
					title: "最近请求时间",
					key: "time",
					align: "center"
				},
				{
					title: "电话号码",
					key: "phone",
					align: "center"
				},
				{
					title: "联系地址",
					key: "address",
					align: "center"
				},
			],
            // 用户列表表格的标题行数据（列属性名称）
            yhlbmkCols: [
                {
                	title: "序号",
                	type: "index",
                	align: "center"
                },
                {
                	title: "消息类型",
                	key: "type",
                	align: "center",
					render: (h,params)=> {
						let text = params.row.type
						if(text==1){
							return h('div','系统消息')
						}
						if(text==2){
							return h('div','订单消息')
						}
						if(text==3){
							return h('div','交易消息')
						}
						if(text==4){
							return h('div','通知消息')
						}
					}
                },
                {
                	title: "消息内容",
                	key: "msg",
                	align: "center"
                },
				{
					title: "时间",
					key: "pushTime",
					align: "center"
				},
				{
					title: "用户id",
					key: "userId",
					align: "center"
				},
				{
					title: "用户类型",
					key: "userType",
					align: "center",
					render: (h,params)=> {
						let text = params.row.userType
						if(text==1){
							return h('div','低级')
						}
						else if(text==2){
							return h('div','中级')
						}
						else if(text==3){
							return h('div','高级')
						}else{
							return h('div','')
						}
					}
				},
                {
                	title: "消息状态",
                	key: "status",
                	width: 90,
                	align: "center",
					render: (h,params)=> {
						let text = params.row.status
						if(text==1){
							return h(
							"Button",
							{
								props: {
									type: "dashed",
									disabled:'disabled',
									size: "small"
								},
								style: {
									// width: "70px",
									marginLeft: "10px"
								}
							},
							"已推送"
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
									"推送"
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
            axios.get('/api/auction/message/sys/findList',{
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
			if(params.row.status==0){
				this.orderId=1
			}
			if(params.row.status==1){
				this.orderId=0
			}
			let json={
				status:this.orderId,
				id:params.row.id,
				msg:params.row.msg,
				userId:params.row.userId,
				type:params.row.type,
			};
			//let postData = this.$qs.stringify(json);
			axios.post('/api/auction/message/sys/update',json)
				.then( (response)=> {
				if(response.data.code==200){
					Util.success("推送成功");
					this.yhlbmkGetList(1, this.yhlbmkIsSearch);
				}else{
					Util.error("推送失败");
				}
				})
				.catch( (error)=> {
				console.log(error);
				});
		},
		queryOrder(currentPage){
			if (this.yhlbmkIpVal) {
				let params= {
					pageNum: currentPage, // 当前页码
					pageSize: 10, // 每页条数
					searchKey:this.yhlbmkIpVal
				};
				let postData = this.$qs.stringify(params);
				axios.get('/api/auction/message/sys/findList',{
					params:{
						pageNum: currentPage, // 当前页码
						pageSize: 10, // 每页条数
						searchKey:this.yhlbmkIpVal
					}
				})
					.then( (response)=> {
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
					.catch( (error)=> {
						console.log(error);
					});
			} else {
				this.yhlbmkGetList(1, this.yhlbmkIsSearch);
			}
		},
		yhlbmkOk(){
			this.yhlbmkModal=false;
			if(this.yhlbmkAddObj.userId=='请选择'){
				this.yhlbmkAddObj.userId=''
			}
			let json={
				msg:this.yhlbmkAddObj.msg,
				type:this.model1,
				pushTime:this.startValue,
				userId:this.yhlbmkAddObj.userId
			};
			//let postData = this.$qs.stringify(json);
			axios.post('/api/auction/message/sys/add',json)
				.then( (response)=> {
				if(response.data.code==200){
					Util.success("录入成功");
					this.logisticsCompany='';
					this.logisticsNo=""
					this.startValue=''
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
			this.model2 = '';
			this.yhlbmkAddObj.msg = '';
			this.yhlbmkAddObj.userId='请选择'
			this.yhlbmkModal = true;
		},
		deleteGood(id) {
			if(confirm('是否确认删除')==true){
			let params = {};
			params.id = id;
			//let postData = this.$qs.stringify(params);
			axios
				.post('/api/auction/message/sys/delete', params)
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
			this.model2 = params.type;
			this.yhlbmkAddObj.msg = params.msg;
			this.yhlbmkAddObj.id = params.id;
			this.startValue=params.pushTime
		},
		//修改
		updateOk() {
			// 参数对象
			if(this.yhlbmkAddObj.userId=='请选择'){
				this.yhlbmkAddObj.userId=''
			}
			let params = {
				msg:this.yhlbmkAddObj.msg,
				type:this.model2,
				id:this.yhlbmkAddObj.id,
				pushTime:this.startValue,
				userId:this.yhlbmkAddObj.userId
			};
			//let postData = this.$qs.stringify(params);
			axios.post('/api/auction/message/sys/update',params)
				.then( (response)=> {
					console.log(response)
					if(response.data.code==200){
						Util.success("修改成功");
						this.yhlbmkGetList(this.yhlbmktablePageData.pageNum, this.yhlbmkIsSearch);
						this.$nextTick(function(){
							this.$refs['pages'].currentPage = this.yhlbmktablePageData.pageNum;
						})
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
		//选择开始时间
		handleChange(daterange) {
			this.startValue = daterange;
		},
		//跳转出查询用户
		setProduct() {
			//this.yhlbmkModal = false; // 关闭当前模态
			this.goodModal = true;
			// 参数对象
			this.getlistgood(1);
		},
		getlistgood(currentPage) {
			var params = {
				pageNum: currentPage, // 当前页码
				pageSize: 10, // 每页条数
			};
			// let postData = this.$qs.stringify(params);
			axios.get('/api/auction/user/sys/init',{params})
				.then( (response)=> {
				var res = response.data;
				if(res.code==200){
					if(res.data==null){
						this.choicegoodlist.list=[];
					}else{
						this.choicegoodlist = res.data;
					}
				}else{
					this.choicegoodlist.list=[];
				}
				})
				.catch( (error)=> {
				console.log(error);
				});
		},
		selectgoods(row) {
			this.goodchoiced = row;
			this.yhlbmkAddObj.userId=this.goodchoiced.id
			this.goodModal = false;
			//this.yhlbmkModal = true;
		},
		//查询用户
		searchgood(currentPage) {
			if (this.producenames) {
				var params = {
					pageNum: currentPage, // 当前页码
					pageSize: 10, // 每页条数
					phone: this.producenames,
				};
				let postData = this.$qs.stringify(params);
				axios
					.get('/api/auction/user/sys/getUserByPhone', {params})
					.then(response => {
						var res = response.data;
						// this.choicegoodlist = res.data;
						//this.goodModal=true
						if(res.code==200){
							if(res.data==null){
								this.choicegoodlist.list=[];
							}else{
								this.choicegoodlist = res.data;
							}
						}else{
							this.choicegoodlist.list=[];
						}
					})
					.catch(error => {
						console.log(error);
					});
			} else {
				this.getlistgood(1);
			}
		},
    }
};
</script>
