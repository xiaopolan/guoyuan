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
						<Button type="error" style="float:left;width:60px;marginLeft:20px;" size="small" @click="addgood">录入</Button>
					</div>
					<Modal v-model="upModal" title="修改" :loading="yhlbmkLoading" @on-ok="updateOk" @on-cancel="yhlbmkCancel">
						<div style="marginBottom:10px;textAlign:center">
							<div style="display:inline-block;width:86px;textAlign:left">value：</div>
							<Input v-model="yhlbmkAddObj.value" placeholder="" style="width:150px"></Input>
						</div>
						<div style="marginBottom:10px;textAlign:center">
							<div style="display:inline-block;width:86px;textAlign:left">vdesc：</div>
							<Input v-model="yhlbmkAddObj.vdesc" placeholder="" style="width:150px"></Input>
						</div>
						<div style="marginBottom:10px;textAlign:center">
							<div style="display:inline-block;width:86px;textAlign:left">kdesc：</div>
							<Input v-model="yhlbmkAddObj.kdesc" placeholder="" style="width:150px"></Input>
						</div>
					</Modal>
					<Modal v-model="yhlbmkModal" title="新增" :loading="yhlbmkLoading" @on-ok="yhlbmkOk" @on-cancel="yhlbmkCancel">
						<div style="marginBottom:10px;textAlign:center">
							<div style="display:inline-block;width:86px;textAlign:left">value：</div>
							<Input v-model="yhlbmkAddObj.value" placeholder="" style="width:150px"></Input>
						</div>
						<div style="marginBottom:10px;textAlign:center">
							<div style="display:inline-block;width:86px;textAlign:left">vdesc：</div>
							<Input v-model="yhlbmkAddObj.vdesc" placeholder="" style="width:150px"></Input>
						</div>
						<div style="marginBottom:10px;textAlign:center">
							<div style="display:inline-block;width:86px;textAlign:left">kkey：</div>
							<Input v-model="yhlbmkAddObj.kkey" placeholder="" style="width:150px"></Input>
						</div>
						<div style="marginBottom:10px;textAlign:center">
							<div style="display:inline-block;width:86px;textAlign:left">kdesc：</div>
							<Input v-model="yhlbmkAddObj.kdesc" placeholder="" style="width:150px"></Input>
						</div>
						<div style="marginBottom:10px;textAlign:center">
							<div style="display:inline-block;width:86px;textAlign:left">vkey：</div>
							<Input v-model="yhlbmkAddObj.vkey" placeholder="" style="width:150px"></Input>
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
				<Table ref="yhlbmkTable" border :columns="yhlbmkCols" :data="yhlbmktablePageData"></Table>
				<div v-if="listobj" class="pageBox" :style="{marginTop: '25px',paddingBottom: '35px'}">
					<!-- 分页 -->
					
				</div>
				<div v-else class="pageBox" :style="{marginTop: '25px',paddingBottom: '35px'}">
					<!-- 分页 -->
					
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
				goodModal: false,
				// 商品列表表格分页数据
				choicegoodlist: {
					list: [], // 表格列表
					total: 0, // 总条数
					pages: 0, // 总页数
					pageSize: 0, // 每页条数
					currentPage: 0 // 当前页码
				},
				goodsclo: [{
						title: "value",
						key: "value",
						align: "center"
					},
					{
						title: "vdesc",
						key: "vdesc",
						align: "center"
					},
					{
						title: "kkey",
						key: "kkey",
						align: "center"
					},
					{
						title: "kdesc",
						key: "kdesc",
						align: "center"
					},
					{
						title: "vkey",
						key: "vkey",
						align: "center"
					},
					{
						title: "用户状态",
						key: "status",
						width: 90,
						align: "center",
						render: (h, params) => {
							let text = params.row.openno
							if (text == 0) {
								return h('div', '启用');
							} else {
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
				yhlbmkCols: [{
						title: "value",
						key: "value",
						align: "center"
					},
					{
						title: "vDesc",
						key: "vDesc",
						align: "center"
					},
					{
						title: "vKey",
						key: "vKey",
						align: "center"
					},
					{
						title: "vDesc",
						key: "vDesc",
						align: "center"
					},
					{
						title: "kKey",
						key: "kKey",
						align: "center"
					},
					{
						title: '操作',
						key: 'action',
						width: 150,
						align: 'center',
						render: (h, params) => {
							return h('div', [
								h(
									'Button', {
										props: {
											type: 'warning',
											size: 'small'
										},
										style: {
											// width: "70px",
										},
										on: {
											click: () => {
												this.deleteGood(params.row);
											}
										}
									},
									'删除'
								),
								h(
									'Button', {
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
				yhlbmktablePageData: [],
				yhlbmkModal: false, // 添加新增用户的对话框显示状态
				yhlbmkLoading: true, // 添加新增用户的对话框加载状态
				upModal: false, // 添加修改用户的对话框显示状态
				// 新增用户的对话框表单
				yhlbmkAddObj: {
					yzm: '',
					groupNum: '',
					id: '',
					pic: {}
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
					.get('/api/manage/baseParam/getList')
					.then(response => {
						var res = response.data;
						// this.yhlbmktablePageData = res.data;
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
			deleteGood(row) {
				let params = {};
				params.kKey = row.kKey;
				params.vKey = row.vKey;
				axios
					.get('/api/manage/baseParam/deleteParam', {params})
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
					value: this.yhlbmkAddObj.value,
					vDesc: this.yhlbmkAddObj.vdesc,
					kKey: this.yhlbmkAddObj.kkey,
					kDesc: this.yhlbmkAddObj.kdesc,
					vKey: this.yhlbmkAddObj.vkey,
				};
				// let postData = this.$qs.stringify(params);
				if (this.yhlbmkAddObj.value == '' || this.yhlbmkAddObj.vdesc == '' ) {
					Util.error('正确填写表单');
				} else {
					axios
						.post('/api/manage/baseParam/addParam', params)
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
				this.yhlbmkAddObj.value = '';
				this.yhlbmkAddObj.vdesc = '';
				this.yhlbmkAddObj.kkey = '';
				this.yhlbmkAddObj.kdesc = '';
				this.yhlbmkAddObj.vkey = '';
			},
			//点击修改
			updateGood(params) {
				this.upModal = true;
				this.yhlbmkAddObj.value = params.value;
				this.yhlbmkAddObj.vdesc = params.vDesc;
				this.yhlbmkAddObj.kdesc = params.kDesc;
				this.model1 = params.kKey;
				this.model2 = params.vKey;
			},
			//修改
			updateOk() {
				// 参数对象

				let params = {
					value: this.yhlbmkAddObj.value,
					vDesc: this.yhlbmkAddObj.vdesc,
					//pic: this.yhlbmkAddObj.pic,
					kKey: this.model1,
					vKey: this.model2,
					kDesc: this.yhlbmkAddObj.kdesc,
				};
				// let postData = this.$qs.stringify(params);
				axios
					.post('/api/manage/baseParam/updateParam', params)
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
					.get('/api/auction/user/sys/init', {
						params
					})
					.then(response => {
						var res = response.data;
						if (res.code == 200) {
							if (res.data == null) {
								this.choicegoodlist.list = [];
							} else {
								this.choicegoodlist = res.data;
							}
						} else {
							this.choicegoodlist.list = [];
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
						.get('/api/auction/user/sys/getUserByPhone', {
							params
						})
						.then(response => {
							var res = response.data;
							// this.choicegoodlist = res.data;
							//this.goodModal=true
							if (res.code == 200) {
								if (res.data == null) {
									this.choicegoodlist.list = [];
								} else {
									this.choicegoodlist = res.data;
								}
							} else {
								this.choicegoodlist.list = [];
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
