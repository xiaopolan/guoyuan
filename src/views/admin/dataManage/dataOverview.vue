<!-- 商品管理 -->
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
.typeselect{
	width: 150px;
    height: 25px;
    border: 1px solid #dcdee2;
    border-radius: 4px;
    color: #515a6e;
}
</style>
<style lang="less">
	.yhlb_table {
    .ivu-table-cell {
        padding-left: 10px;
        padding-right: 10px;
    }
}

.mymodal .ivu-modal-body {
    padding: 0 16px 16px 16px;
}
</style>

<template>
	<div class="tabsBox_style">
		<!-- 商品管理 -->
		<div class="itemBox yhlb_table">
			<div class="remark_box">
				<Row>
					<Col span="4">
					<h3>商品管理</h3>
					</Col>
					<Col span="18" style="textAlign:center;">
					<div class="searchBox clearfix">
						<Input v-model="yhlbmkIpVal" size="small" placeholder="请输入商品名称" style="float:left;width: 200px">
						</Input>
						<Button type="error" style="float:left;width:60px;marginLeft:20px;" size="small" @click="yhlbmkSearch(1)">查询</Button>
						<Button type="error" style="float:left;width:60px;marginLeft:20px;" size="small" @click="addgood">录入商品</Button>
					</div>
					<Modal v-model="yhlbmkModal" title="添加商品" :loading="yhlbmkLoading" @on-ok="yhlbmkOk" @on-cancel="yhlbmkCancel">
						<div style="marginBottom:10px;textAlign:center">
							<div style="display:inline-block;width:86px;textAlign:left">
								<span style="color:red;"></span>商品名称：
							</div>
							<Input v-model="yhlbmkAddObj.productName" placeholder="请输入商品名称" style="width:150px"></Input>
						</div>
						<div style="marginBottom:10px;textAlign:center">
							<div
								style="display:inline-block;width:86px;textAlign:left"
							>
								<span style="color:red;"></span>商品类型：
							</div>
							<select style="width:150px" name="public-choice" v-model="model1" class="typeselect">                                        
								<option :value="item.productType" :key='item' v-for="item in statusList" >{{item.groupName}}</option>                                    
							</select>
						</div>
						<div style="marginBottom:10px;textAlign:center">
							<div
								style="display:inline-block;width:86px;textAlign:left"
							>
								<span style="color:red;"></span>树龄：
							</div>
							<select style="width:150px" name="public-choice" v-model="model3" class="typeselect">                                        
								<option :value="item.productType" :key='item' v-for="item in treeList" >{{item.groupName}}</option>                                    
							</select>
						</div>
						<div style="marginBottom:10px;textAlign:center">
							<div style="display:inline-block;width:86px;textAlign:left">
								<span style="color:red;"></span>商品主图：
							</div>
							<input style="width:150px;" type="file" id="file" @change="addImg" ref="inputer" multiple accept="image/png,image/jpeg,image/gif,image/jpg" />
						</div>
						<div style="clear: both;"></div>
						<div style="marginBottom:10px;textAlign:center">
							<div style="display:inline-block;width:86px;textAlign:left">商品价格：</div>
							<Input v-model="yhlbmkAddObj.price" placeholder="请输入商品价格" style="width:150px" type="number"></Input>
						</div>
						<div style="marginBottom:10px;textAlign:center">
							<div style="display:inline-block;width:86px;textAlign:left">打折价格：</div>
							<Input v-model="yhlbmkAddObj.finalPrice" placeholder="请输入打折价格" style="width:150px" type="number"></Input>
						</div>
						<div style="marginBottom:10px;textAlign:center">
							<div style="display:inline-block;width:86px;textAlign:left">商品主描述：</div>
							<Input v-model="yhlbmkAddObj.productDesc" placeholder="请输入商品主描述" style="width:150px"></Input>
						</div>
						<div style="marginBottom:10px;textAlign:center">
							<div style="display:inline-block;width:86px;textAlign:left">商品副描述：</div>
							<Input v-model="yhlbmkAddObj.productInfo" placeholder="请输入商品副描述" style="width:150px"></Input>
						</div>
						<div style="marginBottom:10px;textAlign:center">
							<div style="display:inline-block;width:86px;textAlign:left">魔术币：</div>
							<Input v-model="yhlbmkAddObj.currencyNum" placeholder="请输入魔术币" style="width:150px" type="number"></Input>
						</div>
						<div style="marginBottom:10px;textAlign:center">
							<div style="display:inline-block;width:86px;textAlign:left">商品总数量：</div>
							<Input v-model="yhlbmkAddObj.totalCount" placeholder="请输入商品总数量" style="width:150px" type="number"></Input>
						</div>
						<div style="marginBottom:10px;textAlign:center">
							<div style="display:inline-block;width:86px;textAlign:left">商品剩余数量：</div>
							<Input v-model="yhlbmkAddObj.lastCount" placeholder="请输入商品剩余数量" style="width:150px" type="number"></Input>
						</div>
					</Modal>
					
					
					<Modal v-model="upModal" title="修改商品" :loading="yhlbmkLoading" @on-ok="updateOk" @on-cancel="yhlbmkCancel">
						<div style="marginBottom:10px;textAlign:center">
							<div style="display:inline-block;width:86px;textAlign:left">
								<span style="color:red;"></span>商品名称：
							</div>
							<Input v-model="yhlbmkAddObj.productName" placeholder="请输入商品名称" style="width:150px"></Input>
						</div>
						<div style="marginBottom:10px;textAlign:center">
							<div
								style="display:inline-block;width:86px;textAlign:left"
							>
								<span style="color:red;"></span>商品类型：
							</div>
							<select style="width:150px" name="public-choice" v-model="model2" class="typeselect">                                        
								<option :value="item.productType" :key='item' v-for="item in statusList" >{{item.groupName}}</option>                                    
							</select>
						</div>
						<div style="marginBottom:10px;textAlign:center">
							<div
								style="display:inline-block;width:86px;textAlign:left"
							>
								<span style="color:red;"></span>树龄：
							</div>
							<select style="width:150px" name="public-choice" v-model="model4" class="typeselect">                                        
								<option :value="item.productType" :key='item' v-for="item in treeList" >{{item.groupName}}</option>                                    
							</select>
						</div>
						<div style="marginBottom:10px;textAlign:center">
							<div style="display:inline-block;width:86px;textAlign:left">
								<span style="color:red;"></span>商品主图：
							</div>
							<input style="width:150px;" type="file" id='files' @change="addImg" ref="inputer" multiple accept="image/png,image/jpeg,image/gif,image/jpg" />
						</div>
						<div style="marginBottom:10px;textAlign:center">
							<div style="display:inline-block;width:86px;textAlign:left">商品价格：</div>
							<Input v-model="yhlbmkAddObj.price" placeholder="请输入商品价格" style="width:150px" type="number"></Input>
						</div>
						<div style="marginBottom:10px;textAlign:center">
							<div style="display:inline-block;width:86px;textAlign:left">打折价格：</div>
							<Input v-model="yhlbmkAddObj.finalPrice" placeholder="请输入打折价格" style="width:150px" type="number"></Input>
						</div>
						<div style="marginBottom:10px;textAlign:center">
							<div style="display:inline-block;width:86px;textAlign:left">商品主描述：</div>
							<Input v-model="yhlbmkAddObj.productDesc" placeholder="请输入商品主描述" style="width:150px"></Input>
						</div>
						<div style="marginBottom:10px;textAlign:center">
							<div style="display:inline-block;width:86px;textAlign:left">商品副描述：</div>
							<Input v-model="yhlbmkAddObj.productInfo" placeholder="请输入商品副描述" style="width:150px"></Input>
						</div>
						<div style="marginBottom:10px;textAlign:center">
							<div style="display:inline-block;width:86px;textAlign:left">魔术币：</div>
							<Input v-model="yhlbmkAddObj.currencyNum" placeholder="请输入魔术币" style="width:150px" type="number"></Input>
						</div>
						<div style="marginBottom:10px;textAlign:center">
							<div style="display:inline-block;width:86px;textAlign:left">商品总数量：</div>
							<Input v-model="yhlbmkAddObj.totalCount" placeholder="请输入商品总数量" style="width:150px" type="number"></Input>
						</div>
						<div style="marginBottom:10px;textAlign:center">
							<div style="display:inline-block;width:86px;textAlign:left">商品剩余数量：</div>
							<Input v-model="yhlbmkAddObj.lastCount" placeholder="请输入商品剩余数量" style="width:150px" type="number"></Input>
						</div>
					</Modal>
					<Modal v-model="imageModal" title="图片查看" class="mymodal">
						<Carousel v-if="imageModal1" v-model="indexcu">
							<Carousel-Item v-for="(item,index) in imagelist" :key="index">
								<div style="margin: 0 auto;text-align: center;display: flex;align-items: center;width: 488px;height: 300px;justify-content: center;">
									<img :src="item" style="max-height:240px;max-width:440px;" alt="" />
								</div>
							</Carousel-Item>
						</Carousel>
					</Modal>
					<Modal v-model="imageModal2" title="视频" class="mymodal" @on-ok="stopvideo" @on-cancel="stopvideo" width='840'>
						<div>
							<video style="display: block;margin: 0 auto;width: 800px;height: 600px;" :src="video" :key="video" id="video"
							 controls="controls"></video>
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
				<Table ref="yhlbmkTable" border :columns="yhlbmkCols" :data="yhlbmktablePageData.list"></Table>
				<div v-if="listobj" class="pageBox" :style="{marginTop: '25px',paddingBottom: '35px'}">
					<!-- 分页 -->
					<Page :total="yhlbmktablePageData.total" :page-size="yhlbmktablePageData.pageSize" show-elevator ref="pages"
					 @on-change="yhlbmkPageChange"></Page>
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
	import Util from '@/libs/util';
	import axios from 'axios';
	export default {
		name: 'userList',

		data() {
			return {
				statusList:[{
					productType:1,
					groupName:"果树"
				},{
					productType:2,
					groupName:"果子"
				},{
					productType:3,
					groupName:"礼包"
				}],
				treeList:[{
					productType:0,
					groupName:"5年"
				},{
					productType:1,
					groupName:"10年"
				},{
					productType:2,
					groupName:"15年"
				}],
				imageModal2: false,
				indexcu: 0,
				cityList: [], //商品类型
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
						title: '商品id',
						key: 'id',
						//	width: 120,
						align: 'center'
					},
					{
						title: '商品名称',
						key: 'productName',
						//width: 280,
						align: 'center'
					},
					{
						title: '商品类型',
						key: 'productName',
						//width: 280,
						align: 'center',
						render: (h,params)=> {
							let text = params.row.productType
							if(text==1){
								return h('div','果树')
							}
							if(text==2){
								return h('div','果子')
							}
							if(text==3){
								return h('div','礼包')
							}
						}
					},
					{
						title: '树龄',
						key: 'productSubType',
						//width: 280,
						align: 'center',
						render: (h,params)=> {
							let text = params.row.productSubType
							if(text==0){
								return h('div','5年')
							}
							if(text==1){
								return h('div','10年')
							}
							if(text==2){
								return h('div','15年')
							}
						}
					},
					{
						title: '魔术币',
						key: 'currencyNum',
						//width: 280,
						align: 'center'
					},
					{
						title: '总数量',
						key: 'totalCount',
						//width: 280,
						align: 'center'
					},
					{
						title: '剩余数量',
						key: 'lastCount',
						//width: 280,
						align: 'center'
					},
					{
						title: '商品主图',
						key: 'pic',
						//width: 150,
						align: 'center',
						render: (h, params) => {
							if (params.row.productImgs.length>0) {
								var str = params.row.productImgs[0].img;
								if (str) {
									if (str.lastIndexOf(',') > 0) {
										str = str.substring(0, str.lastIndexOf(','));
									}
									var arr = str.split(',');
									return h('img', {
										attrs: {
											src: str
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
							} else {
								return h('div', {}, '暂无图片');
							}

						}
					},
					{
						title: '商品价格',
						//width: 180,
						key: 'price',
						align: 'center'
					},
					{
						title: '打折价格',
						//width: 180,
						key: 'finalPrice',
						align: 'center'
					},
					{
						title: '商品主描述',
						key: 'productDesc',
						align: 'center',
						ellipsis: true
					},
					{
						title: '商品副描述',
						key: 'productInfo',
						align: 'center',
						ellipsis: true
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
					{
						title: '操作',
						width: '150px',
						key: 'action',
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
												this.deleteGood(params.row.id);
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
				upModal: false, // 添加修改用户的对话框显示状态
				// 新增用户的对话框表单
				yhlbmkAddObj: {
					productName: '', // 商品名称
					productImgs: {}, // 商品主图
					productType: '', // 商品类型
					productPrice: '', // 商品价格
					introduction: '', //商品简介
					id: '' // 商品id
				},
				imagelist: [], //图片集合image
				imageModal: false,
				imageModal1: false
			};
		},
		created() {
			// 获取用户列表数据
			this.yhlbmkGetList(1, this.yhlbmkIsSearch);
		},
		mounted: function() {

		},
		methods: {
			addImg(e) {
				//let inputDOM = this.$refs.inputer;
				let inputDOM = e.target.files;
				console.log(typeof inputDOM);
				console.log(typeof this.yhlbmkAddObj.productImgs);
				// 通过DOM取文件数据
				this.yhlbmkAddObj.productImgs = inputDOM;
			},
			// 用户列表的页码改变
			yhlbmkPageChange(currentPage) {
				this.yhlbmkGetList(currentPage, this.yhlbmkIsSearch); // 获取用户列表数据
			},
			searchepageChange(currentPage) {
				this.yhlbmkSearch(currentPage);
			},
			// 获取商品列表数据（调用接口的）---接口
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
				axios
					.get('/api/manage/product/getList', {params})
					.then(response => {
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
						productName: this.yhlbmkIpVal,
						pageNum: currentPage1, // 当前页码
						pageSize: 10 // 每页条数
					};
					let postData = this.$qs.stringify(params);
					axios
						.post('/api/manage/product/findProduct', postData)
						.then(response => {
							var res = response.data;
							this.yhlbmktablePageData = res.data;
							this.yhlbmktablePageData.total1 = res.data.total;
							this.yhlbmktablePageData.pages1 = res.data.pages;
							this.yhlbmktablePageData.pageSize1 = res.data.pageSize;
						})
						.catch(error => {
							console.log(error);
						});
				} else {
					this.listobj = true;
					this.yhlbmkGetList(1, this.yhlbmkIsSearch);
					//页码重置为1
					this.$nextTick(function() {
						this.$refs['pages'].currentPage = 1;
					});
				}
			},
			deleteGood(id) {
				if (confirm('是否确认删除') == true) {
					let params = {
						id:id
					};
					let postData = this.$qs.stringify(params);
					axios
						.post('/api/manage/product/delProduct', postData)
						.then(response => {
							if (response.data.code == 200) {
								Util.success('删除成功');
								this.yhlbmkGetList(this.yhlbmktablePageData.pageNum, this.yhlbmkIsSearch);
								this.$nextTick(function() {
									this.$refs['pages'].currentPage = this.yhlbmktablePageData.pageNum;
								});
							} else {
								Util.error('删除失败,' + response.data.msg);
							}
							//var res = response.data;
							//this.yhlbmktablePageData.list=res.data;
						})
						.catch(error => {
							console.log(error);
						});
				}
			},
			// 点击新增用户的对话框的ok
			yhlbmkOk() {
				let formData = new FormData();
				formData.append('productName', this.yhlbmkAddObj.productName);
				for (var i = 0; i < this.yhlbmkAddObj.productImgs.length; i++) {
					formData.append('productImgs', this.yhlbmkAddObj.productImgs[i]);
				}
				// formData.append("pic",this.yhlbmkAddObj.pic[0])
				formData.append('price', this.yhlbmkAddObj.price);
				formData.append('productType', this.model1);
				formData.append('productSubType', this.model3);
				formData.append('finalPrice', this.yhlbmkAddObj.finalPrice);
				formData.append('productDesc', this.yhlbmkAddObj.productDesc);
				formData.append('productInfo', this.yhlbmkAddObj.productInfo);
				formData.append('currencyNum', this.yhlbmkAddObj.currencyNum);
				formData.append('totalCount', this.yhlbmkAddObj.totalCount);
				formData.append('lastCount', this.yhlbmkAddObj.lastCount);
				if (
					this.yhlbmkAddObj.productImgs.length == 0 ||
					this.yhlbmkAddObj.price == '' ||
					this.yhlbmkAddObj.productName == '' ||
					this.yhlbmkAddObj.productDesc == '' ||
					this.yhlbmkAddObj.productInfo == '' ||
					this.yhlbmkAddObj.currencyNum == '' ||
					this.yhlbmkAddObj.totalCount == '' ||
					this.yhlbmkAddObj.lastCount == ''
				) {
					Util.error('正确填写表单');
				} else {
					console.log(formData);
					let config = {
						headers: {
							'Content-Type': 'multipart/form-data'
						}
					};
					const instance = axios.create({
						withCredentials: true
					});
					//console.log(postData)
					axios
						.post('/api/manage/product/addProduct', formData, config)
						.then(response => {
							console.log(response);
							if (response.data.code == 200) {
								Util.success('添加成功');
								this.yhlbmkGetList(1, this.yhlbmkIsSearch);
							} else {
								Util.error('添加失败,' + response.data.msg);
							}
						})
						.catch(error => {
							console.log(error);
						});
					this.yhlbmkLoading = false; // 关闭加载状态
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
				// 清除表单
			},
			//增加商品
			addgood() {
				this.yhlbmkAddObj.productName = '';
				this.yhlbmkAddObj.productImgs = '';
				this.yhlbmkAddObj.price = '';
				this.yhlbmkAddObj.finalPrice = '';
				this.yhlbmkAddObj.productDesc = '';
				this.yhlbmkAddObj.productInfo = '';
				this.yhlbmkAddObj.currencyNum = '';
				this.yhlbmkAddObj.totalCount = '';
				this.yhlbmkAddObj.lastCount = '';
				let file = document.getElementById('file');
				file.value = '';
				this.yhlbmkModal = true;
			},
			updateGood(params) {
				let file = document.getElementById('files');
				file.value = '';
				this.upModal = true;
				this.yhlbmkAddObj.productName = params.productName;
				this.yhlbmkAddObj.productImgs = '';
				//this.model2 = params.productTypeId;
				this.yhlbmkAddObj.price = params.price || '';
				this.yhlbmkAddObj.finalPrice = params.finalPrice || '';
				this.yhlbmkAddObj.productDesc = params.productDesc;
				this.yhlbmkAddObj.id = params.id;
				this.model2=params.productType
				this.model4=params.productSubType
				this.yhlbmkAddObj.productInfo = params.productInfo
				this.yhlbmkAddObj.currencyNum = params.currencyNum
				this.yhlbmkAddObj.totalCount = params.totalCount
				this.yhlbmkAddObj.lastCount = params.lastCount
			},
			updateOk() {
				// 参数对象
				let formData = new FormData();
				formData.append('id', this.yhlbmkAddObj.id);
				formData.append('productName', this.yhlbmkAddObj.productName);
				if (typeof this.yhlbmkAddObj.productImgs == 'object') {
					for (var i = 0; i < this.yhlbmkAddObj.productImgs.length; i++) {
						formData.append('productImgs', this.yhlbmkAddObj.productImgs[i]);
					}
				}
				formData.append('price', this.yhlbmkAddObj.price);
				formData.append('finalPrice', this.yhlbmkAddObj.finalPrice);
				formData.append('productType', this.model2);
				formData.append('productSubType', this.model4);
				formData.append('productDesc', this.yhlbmkAddObj.productDesc);
				formData.append('productInfo', this.yhlbmkAddObj.productInfo);
				formData.append('currencyNum', this.yhlbmkAddObj.currencyNum);
				formData.append('totalCount', this.yhlbmkAddObj.totalCount);
				formData.append('lastCount', this.yhlbmkAddObj.lastCount);
				console.log(formData);
				let config = {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				};
				const instance = axios.create({
					withCredentials: true
				});

				axios
					.post('/api/manage/product/updateProduct', formData, config)
					.then(response => {
						console.log(response);
						if (response.data.code == 200) {
							Util.success('修改成功');
							this.yhlbmkGetList(this.yhlbmktablePageData.pageNum, this.yhlbmkIsSearch);
							this.$nextTick(function() {
								this.$refs['pages'].currentPage = this.yhlbmktablePageData.pageNum;
							});
						} else {
							Util.error('修改失败,' + response.data.msg);
						}
					})
					.catch(error => {
						console.log(error);
					});
				this.yhlbmkLoading = false; // 关闭加载状态
				this.upModal = false;
			},
			showimage(imagearr) {
				this.imageModal = true;
				this.imageModal1 = true;
				this.indexcu = 0; //初始化为第一张图片
				// $('.ivu-carousel-track').css("transform","translate3d(0,0,0)")
				this.imagelist = imagearr;
			},
			showvideo(imagearr) {
				this.imageModal2 = true;
				this.video = imagearr;
			},
		}
	};
</script>
