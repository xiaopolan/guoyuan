<!-- 用户列表页 -->
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
            <!-- 用户统计 -->
                <div class="itemBox yhlb_table">
                    <div class="remark_box">
                        <Row>
                            <Col span="4">
                                <h3>用户列表</h3>
                            </Col>
                            <Col span="10" style="textAlign:center;">
                                <div class="searchBox clearfix">
                                    <Input
                                        v-model="yhlbmkIpVal"
                                        size="small"
                                        placeholder="请输入电话号码"
                                        style="float:left;width: 200px"
                                    >
                                    </Input>
                                    <Button
                                        type="error"
                                        style="float:left;width:60px;marginLeft:20px;"
                                        size="small"
                                        @click="yhlbmkSearch(1)"
                                    >查询</Button>
                                    
                                </div>
								
                            </Col>
                        </Row>
                    </div>
                    <div class="tablepage_box">
                        <!-- 导出按钮 -->
						<!-- <Button class="exportBtn" type="primary" size="small" @click="exportData(1)">
						    <Icon class="icon_export" type="ios-download-outline"></Icon>导出数据
						</Button> -->
                        <div class="exportBtnBox clearfix">
                        </div>
                        <!-- 用户列表数据表格 -->
                        <Table
                            ref="yhlbmkTable"
                            border
                            :columns="yhlbmkCols"
                            :data="yhlbmktablePageData.list"
                        ></Table>
                        <div class="pageBox" :style="{marginTop: '25px',paddingBottom: '35px'}">
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
            yhtjtableData: [], // 用户统计表格数据
            yhlbmkIpVal: "", // 用户列表的搜索条件
            yhlbmkIsSearch: false, // 是否加入搜索词
            // 用户列表表格的标题行数据（列属性名称）
            yhlbmkCols: [
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
					title: "牛票",
					key: "eqValue",
					align: "center"
				},
				{
					title: "用户等级",
					key: "grade",
					align: "center",
					render: (h,params)=> {
						return h('div',"V"+params.row.grade)
					}
				},
                {
                    title: "最近请求时间",
                    key: "loginTime",
                    align: "center",
					render: (h, params) => {
						if(params.row.loginTime){
							return h(
								'div',
								new Date(params.row.loginTime).Format('yyyy-MM-dd hh:mm:ss')
							); /*这里的this.row能够获取当前行的数据*/
						}
					}
                },
				{
				    title: "注册时间",
				    key: "regTime",
				    align: "center",
					render: (h, params) => {
						if(params.row.regTime){
							return h(
								'div',
								new Date(params.row.regTime).Format('yyyy-MM-dd hh:mm:ss')
							); /*这里的this.row能够获取当前行的数据*/
						}
					}
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
					title: "用户类型",
					key: "level",
					align: "center",
					render: (h,params)=> {
						let text = params.row.level
						if(text==0){
							return h('div','普通用户')
						}
						if(text==1){
							return h('div','市场用户')
						}
					}
				},
				{
					title: "用户状态",
					key: "status",
					width: 90,
					align: "center",
					render: (h,params)=> {
						let text = params.row.openno
						if(text==0){
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
										on: {
											click: () => {
												this.qiyong(params)
											}
										}
									},
									"启用中"
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
										on: {
											click: () => {
												this.qiyong(params)
											}
										}
									},
									"禁用中"
								)
						}
					}
				},
				{
					title: "变更类型",
					key: "status",
					width: 90,
					align: "center",
					render: (h,params)=> {
						return h(
								"Button",
								{
									props: {
										type: "info",
										size: "small"
									},
									style: {
										// width: "70px",
										marginLeft: "10px"
									},
									on: {
										click: () => {
											this.changeUser(params.row.id)
										}
									}
								},
								"变更"
							)
					}
				},
				{
					title: "操作",
					key: "action",
					width: 200,
					align: "center",
					render: (h, params) => {
						let phoneid=params.row.phone
						return h("div", [
							h(
								"Button",
								{
									props: {
										type: "warning",
										size: "small"
									},
									style: {
										// width: "70px",
									},
									on: {
										click: () => {
											let params={
												phone:phoneid
											}
											this.$router.push({
												name:'admin-userManage-margin',
												params:params,
											});
										}
									}
								},
								"保证金"
							),
							h(
								"Button",
								{
									props: {
										type: "warning",
										size: "small"
									},
									style: {
										// width: "70px",
										marginLeft: "10px"
									},
									on: {
										click: () => {
											let params={
												phone:phoneid
											}
											this.$router.push({
												name:'admin-userManage-yueManage',
												params:params,
											});
										}
									}
								},
								"返利"
							),
							h(
								"Button",
								{
									props: {
										type: "warning",
										size: "small"
									},
									style: {
										// width: "70px",
										marginLeft: "10px"
									},
									on: {
										click: () => {
											let params={
												phone:phoneid
											}
											this.$router.push({
												name:'admin-userManage-jifenManage',
												params:params,
											});
										}
									}
								},
								"积分"
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
            }
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
//             let postData = this.$qs.stringify(params);
             console.log(params)
            axios.get('/api/auction/user/sys/init',{params})
            	.then( (response)=> {
            	var res = response.data;
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
        yhlbmkSearch(currentPage) {
            if (this.yhlbmkIpVal) {
            let params= {
				pageNum: currentPage, // 当前页码
				pageSize: 10, // 每页条数
				phone:this.yhlbmkIpVal
			};
            // let postData = this.$qs.stringify(params);
            axios.get('/api/auction/user/sys/getUserByPhone',{params})
            	.then( (response)=> {
            	var res = response.data;
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
            	.catch( (error)=> {
            		console.log(error);
            	});
            } else {
            this.yhlbmkGetList(1, this.yhlbmkIsSearch);
            }
        },
		//启用禁用
		qiyong(params){
			let json={
				phone:params.row.phone,
			};
// 			if(params.row.openno==1){
// 				json.openno=0
// 			}
// 			if(params.row.openno==0){
// 				json.openno=1
// 			}
			json.openno=params.row.openno==1?0:1;
			let postData = this.$qs.stringify(json);
			axios.post('/api/auction/user/sys/noUser',postData)
				.then( (response)=> {
				if(response.data.code==200){
					Util.success("操作成功");
					this.yhlbmkGetList(1, this.yhlbmkIsSearch);
				}else{
					Util.error("操作失败");
				}
				})
				.catch( (error)=> {
				console.log(error);
				});
		},
		//变更用户类型
		changeUser(id) {
			if (confirm('是否确认变更类型？') == true) {
					let params = {};
					params.id = id;
					// let postData = this.$qs.stringify(params);
					axios
							.post('/api/auction/user/sys/updateLevel', params)
							.then(response => {
									if (response.data.code == 200) {
											Util.success('变更成功');
											this.yhlbmkGetList(this.yhlbmktablePageData.pageNum, this.yhlbmkIsSearch);
											this.$nextTick(function() {
													this.$refs['pages'].currentPage = this.yhlbmktablePageData.pageNum;
											});
									} else {
											Util.error('变更失败,' + response.data.msg);
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
		//导出表格
		// exportData (type) {
		// 	if (type === 1) {
		// 		this.$refs.yhlbmkTable.exportCsv({
		// 			filename: '原始数据'
		// 		});
		// 	} else if (type === 2) {
		// 		this.$refs.table.exportCsv({
		// 			filename: '排序和过滤后的数据',
		// 			original: false
		// 		});
		// 	} else if (type === 3) {
		// 		this.$refs.table.exportCsv({
		// 			filename: '自定义数据',
		// 			columns: this.columns8.filter((col, index) => index < 4),
		// 			data: this.data7.filter((data, index) => index < 4)
		// 		});
		// 	}
		// } 
    }
};
</script>
