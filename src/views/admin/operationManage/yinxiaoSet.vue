<!-- 营销设置 -->
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
.xuanze {
    display: inline-block;
    width: 150px;
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
.typeselect {
    width: 150px;
    height: 25px;
    border: 1px solid #dcdee2;
    border-radius: 4px;
    color: #515a6e;
}
.mymodal .ivu-modal-body {
    padding: 0 16px 16px 16px;
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
    width: 80px;
}
</style>

<template>
    <div class="tabsBox_style">
            <!-- 营销设置 -->
                <div class="itemBox yhlb_table">
                    <div class="remark_box">
                        <Row>
                            <Col span="4">
                                <h3>营销设置</h3>
                            </Col>
                            <Col span="18" style="textAlign:center;">
                                <div class="searchBox clearfix">
                                    <Input
                                        v-model="yhlbmkIpVal"
                                        size="small"
                                        placeholder="请输入用户名称"
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
										style="float:left;width:60px;marginLeft:20px;"
										size="small"
										@click="addgood"
									>录入</Button>
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
											style="display:inline-block;width:86px;textAlign:left"
										>
											验证码：
										</div>
										<Input
											v-model="yhlbmkAddObj.yzm"
											placeholder="请输入验证码名称"
											style="width:150px"
										></Input>
									</div>
									<div style="marginBottom:10px;textAlign:center">
										<div
											style="display:inline-block;width:86px;textAlign:left"
										>群号：</div>
										<Input
											v-model="yhlbmkAddObj.groupNum"
											placeholder="请输入群号"
											style="width:150px"
										></Input>
									</div>
									<div style="marginBottom:10px;textAlign:center">
										<div
											style="display:inline-block;width:86px;textAlign:left"
										>群地址：</div>
										<Input
											v-model="yhlbmkAddObj.groupUrl"
											placeholder="请输入群地址"
											style="width:150px"
										></Input>
									</div>
									<div style="marginBottom:10px;textAlign:center">
										<div
											style="display:inline-block;width:86px;textAlign:left"
										>状态：</div>
										<select name="public-choice" v-model="model1" class="typeselect">                                        
											<option :value="item.groupType" :key='item' v-for="item in statusList" >{{item.groupName}}</option>                                    
										</select>
									</div>
									<div style="marginBottom:10px;textAlign:center">
										<div
											style="display:inline-block;width:86px;textAlign:left"
										>群类型：</div>
										<select name="public-choice" v-model="model2" class="typeselect">                                        
											<option :value="item.groupType" :key='item' v-for="item in groupList" >{{item.groupName}}</option>                                    
										</select>
									</div>
								</Modal>
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
											验证码：
										</div>
										<Input
											v-model="yhlbmkAddObj.yzm"
											placeholder="请输入验证码名称"
											style="width:150px"
										></Input>
									</div>
									<div style="marginBottom:10px;textAlign:center">
										<div
											style="display:inline-block;width:86px;textAlign:left"
										>
											用户名称：
										</div>
										<input class="xuanze" @click="setProduct" v-model="goodchoiced.userName" readonly="readonly"></input>
									</div>
									<div style="marginBottom:10px;textAlign:center">
										<div
											style="display:inline-block;width:86px;textAlign:left"
										>群号：</div>
										<Input
											v-model="yhlbmkAddObj.groupNum"
											placeholder="请输入群号"
											style="width:150px"
										></Input>
									</div>
									<div style="marginBottom:10px;textAlign:center">
										<div
											style="display:inline-block;width:86px;textAlign:left"
										>群地址：</div>
										<Input
											v-model="yhlbmkAddObj.groupUrl"
											placeholder="请输入群地址"
											style="width:150px"
										></Input>
									</div>
									<div style="marginBottom:10px;textAlign:center">
										<div
											style="display:inline-block;width:86px;textAlign:left"
										>状态：</div>
										<select name="public-choice" v-model="model3" class="typeselect">                                        
											<option :value="item.groupType" :key='item' v-for="item in statusList" >{{item.groupName}}</option>                                    
										</select>
									</div>
									<div style="marginBottom:10px;textAlign:center">
										<div
											style="display:inline-block;width:86px;textAlign:left"
										>群类型：</div>
										<select name="public-choice" v-model="model4" class="typeselect">                                        
											<option :value="item.groupType" :key='item'  v-for="item in groupList" >{{item.groupName}}</option>                                    
										</select>
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
    name: 'userList',
	
    data() {
        return {
			goodModal:false,
			// 商品列表表格分页数据
			choicegoodlist: {
				list: [], // 表格列表
				total: 0, // 总条数
				pages: 0, // 总页数
				pageSize: 0, // 每页条数
				currentPage: 0 // 当前页码
			},
			goodsclo: [
				{
					title: "用户id",
					key: "id",
					align: "center"
				},
				{
					title: "用户名称",
					key: "userName",
					align: "center"
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
				{
					title: "用户状态",
					key: "status",
					width: 90,
					align: "center",
					render: (h,params)=> {
						let text = params.row.openno
						if(text==0){
							return h('div', '启用');
						}else{
							return h('div', '禁用');
						}
					}
				},
			],
			//选择用户
			goodchoiced: {
				userName: '请选择',
				id: ''
			},
            groupList:[{
				groupType:1,
				groupName:"qq群"
			},{
				groupType:2,
				groupName:"微信群"
			},{
				groupType:3,
				groupName:"公众号"
			}],
			statusList:[{
				groupType:0,
				groupName:"正常"
			},{
				groupType:1,
				groupName:"满员"
			}],
            model1: '',
			model2: '',
			model3: '',
			model4: '',
            listobj: true,
            yhtjtableData: [], // 用户统计表格数据
            // 用户列表相关
            // 用户列表的选择器条件
            yhlbmkIpVal: '', // 用户列表的搜索条件
            yhlbmkIsSearch: false, // 是否加入搜索词
            // 用户列表表格的标题行数据（列属性名称）
            yhlbmkCols: [
                {
                    title: 'id',
                    key: 'id',
                    //	width: 120,
                    align: 'center'
                },
                {
                    title: '验证码',
                    key: 'yzm',
                    //width: 280,
                    align: 'center'
                },
                {
                    title: '群号',
                    key: 'groupNum',
                    //width: 150,
                    align: 'center',
                },
				{
					title: '群地址',
					key: 'groupUrl',
					//width: 150,
					align: 'center',
				},
                {
                    title: '群类型',
                    key: 'groupType',
                    //width: 180,
                    align: 'center',
					render: (h, params) => {
						let text = params.row.groupType;
						if (text == 1) {
							return h('div', 'qq群');
						}
						if (text == 2) {
							return h('div', '微信群');
						}
						if (text == 3) {
							return h('div', '公众号');
						}
					}
                },
                {
                    title: '用户名称',
                    //width: 180,
                    key: 'userName',
                    align: 'center'
                },
                {
                    title: '状态',
                    key: 'status',
                    align: 'center',
					render: (h, params) => {
						let text = params.row.status;
						if (text == 0) {
							return h('div', '正常');
						}
						if (text == 1) {
							return h('div', '满员');
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
            upModal: false, // 添加修改用户的对话框显示状态
            // 新增用户的对话框表单
            yhlbmkAddObj: {
                yzm: '', 
                groupNum: '',
				id:'',
				pic:{}
            },
            imagelist: [], //图片集合image
            imageModal: false
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
        searchepageChange(currentPage) {
            this.yhlbmkSearch(currentPage);
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
            if (isSearch) {
                // 加入搜索词
                params.searchId = this.yhlbmkIpVal;
            }
            let postData = this.$qs.stringify(params);
            console.log(postData);
            axios
                .post('/api/auction/groupManage/sys/init', postData)
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
        yhlbmkSearch(currentPage1) {
            this.listobj = false;
						
            if (this.yhlbmkIpVal) {
                let params = {
                    userName: this.yhlbmkIpVal,
                    pageNum: currentPage1, // 当前页码
                    pageSize: 10 // 每页条数
                };
                let postData = this.$qs.stringify(params);
                axios
                    .post('/api/auction/groupManage/sys/findGroupByUserName', postData)
                    .then(response => {
                        var res = response.data;
						if(res.code==200){
							if(res.data==null){
								this.yhlbmktablePageData.list=[];
							}else{
								//分页切换
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
                this.yhlbmkGetList(1, this.yhlbmkIsSearch);
				//页码重置为1
				this.$nextTick(function(){
					this.$refs['pages'].currentPage = 1;
				})
            }
        },
        deleteGood(id) {
            let params = {};
            params.id = id;
            let postData = this.$qs.stringify(params);
            console.log(postData);
            axios
                .post('/api/auction/groupManage/sys/removeGroupManage', postData)
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
            //this.sqlbmkApplyHandle(id, -1); // 申请处理
            // 重新获取申请列表数据
            //this.sqlbmkGetList(1, this.sqlbmkIsSearch);
        },
        // 点击新增用户的对话框的ok
        yhlbmkOk() {
                // 参数对象
				let params = {
					yzm: this.yhlbmkAddObj.yzm,
					groupNum: this.yhlbmkAddObj.groupNum,
					groupUrl: this.yhlbmkAddObj.groupUrl,
					groupType: this.model4,
					status: this.model3,
					userId: this.goodchoiced.id
				};
				let postData = this.$qs.stringify(params);
				
// 				let formData = new FormData();
// 				formData.append('yzm', this.yhlbmkAddObj.yzm);
// 				for (var i = 0; i < this.yhlbmkAddObj.pic.length; i++) {
// 						formData.append('pic', this.yhlbmkAddObj.pic[i]);
// 				}
// 				// formData.append("pic",this.yhlbmkAddObj.pic[0])
// 				formData.append('groupNum', this.yhlbmkAddObj.groupNum);
// 				formData.append('groupType', this.model4);
// 				formData.append('status', this.model3);
// 				formData.append('userId', this.goodchoiced.id);
// 				let config = {
// 						headers: { 'Content-Type': 'multipart/form-data' }
// 				};
// 				const instance = axios.create({
// 						withCredentials: true
// 				});
				if(this.yhlbmkAddObj.yzm=='' || this.yhlbmkAddObj.groupNum=='' || this.model4==='' || this.model3==='' || this.goodchoiced.id==''){
					Util.error('正确填写表单');
				}else{
						axios
							.post('/api/auction/groupManage/sys/addGroupManage', postData)
							.then(response => {
								console.log(response);
								if (response.data.code == 200) {
									Util.success('添加成功');
									this.yhlbmkGetList(1, this.yhlbmkIsSearch);
								} else {
									Util.error('添加失败');
								}
							})
							.catch(error => {
								console.log(error);
							});
						this.yhlbmkModal = false; // 关闭当前模态
						
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
        },
        //增加商品
        addgood() {
            this.yhlbmkModal = true;
			this.yhlbmkAddObj.yzm = '';
			this.yhlbmkAddObj.pic = '';
			this.yhlbmkAddObj.groupNum = '';
			this.yhlbmkAddObj.groupUrl = '';
			this.model3 = '';
			this.model4 = '';
			this.goodchoiced.id="";
			this.goodchoiced.userName="请选择";
        },
		//点击修改
        updateGood(params) {
            this.upModal = true;
            this.yhlbmkAddObj.yzm = params.yzm;
            this.yhlbmkAddObj.groupNum = params.groupNum;
			this.yhlbmkAddObj.groupUrl = params.groupUrl;
			this.model1 = params.status;
            this.model2 = params.groupType;
			this.yhlbmkAddObj.id = params.id;
        },
		//修改
        updateOk() {
            // 参数对象

			let params = {
				id:this.yhlbmkAddObj.id,
				yzm: this.yhlbmkAddObj.yzm,
				//pic: this.yhlbmkAddObj.pic,
				status: this.model1 ,
				groupType: this.model2 ,
				groupNum: this.yhlbmkAddObj.groupNum ,
				groupUrl: this.yhlbmkAddObj.groupUrl,
			};
            let postData = this.$qs.stringify(params);
            axios
                .post('/api/auction/groupManage/sys/updateGroupManage', postData)
                .then(response => {
                    console.log(response);
                    if (response.data.code == 200) {
                        Util.success('修改成功');
                        this.yhlbmkGetList(1, this.yhlbmkIsSearch);
                    } else {
                        Util.error('修改失败');
                    }
                })
                .catch(error => {
                    console.log(error);
                });
            // 清除表单
            this.yhlbmkAddObj.id = '';
            this.yhlbmkAddObj.yzm = '';
            this.model1 = '';
			this.model2 = '';
            this.yhlbmkAddObj.groupNum = '';
			this.yhlbmkAddObj.groupUrl = '';
            this.yhlbmkLoading = false; // 关闭加载状态
            this.upModal = false;
        },
		//图片查看
        showimage(imagearr) {
            this.imageModal = true;
            this.imagelist = imagearr;
        },
		//跳转出查询用户
		setProduct() {
			//this.yhlbmkModal = false; // 关闭当前模态
			this.goodModal = true;
			// 参数对象
			this.getlistgood(1);
		},
		//用户初始化
		getlistgood(currentPage) {
			var params = {
				pageNum: currentPage, // 当前页码
				pageSize: 10 // 每页条数
			};
			let postData = this.$qs.stringify(params);
			axios
				.get('/api/auction/user/sys/init', {params})
				.then(response => {
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
				.catch(error => {
					console.log(error);
				});
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
		selectgoods(row) {
			this.goodchoiced = row;
			this.goodModal = false;
			//this.yhlbmkModal = true;
		},
// 		addImg(e) {
// 				//let inputDOM = this.$refs.inputer;
// 				let inputDOM = e.target.files;
// 				console.log(typeof inputDOM);
// 				console.log(typeof this.yhlbmkAddObj.pic);
// 				// 通过DOM取文件数据
// 				this.yhlbmkAddObj.pic = inputDOM;
// 		},
    }
};
</script>
