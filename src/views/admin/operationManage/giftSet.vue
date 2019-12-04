<!-- 礼物列表 -->
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
            <!-- 礼物列表 -->
                <div class="itemBox yhlb_table">
                    <div class="remark_box">
                        <Row>
                            <Col span="4">
                                <h3>礼物列表</h3>
                            </Col>
                            <Col span="3" style="textAlign:center;">
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
											style="display:inline-block;width:120px;textAlign:left"
										>
											<span style="color:red;"></span>礼物名称：
										</div>
										<Input
											type="text"
											v-model="yhlbmkAddObj.giftName"
											placeholder="请输入礼物名称"
											style="width:200px"
										></Input>
									</div>
									<div style="marginBottom:10px;textAlign:center">
										<div
											style="display:inline-block;width:120px;textAlign:left"
										>
											<span style="color:red;"></span>礼物图片：
										</div>
										<input style="width:200px;" type="file" id="file"  @change="addImg" ref="inputer" accept="image/png,image/jpeg,image/gif,image/jpg"/>
									</div>
									<div style="marginBottom:10px;textAlign:center">
										<div
											style="display:inline-block;width:120px;textAlign:left"
										>
											<span style="color:red;"></span>礼物价值：
										</div>
										<Input
											type="text"
											v-model="yhlbmkAddObj.value"
											placeholder="请输入获取礼物价值"
											style="width:200px"
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
											style="display:inline-block;width:120px;textAlign:left"
										>
											<span style="color:red;"></span>礼物名称：
										</div>
										<Input
											type="text"
											v-model="yhlbmkAddObj.giftName"
											placeholder="请输入礼物名称"
											style="width:200px"
										></Input>
									</div>
									<div style="marginBottom:10px;textAlign:center">
										<div
											style="display:inline-block;width:120px;textAlign:left"
										>
											<span style="color:red;"></span>礼物图片：
										</div>
										<input style="width:200px;" type="file" id="files"  @change="addImg" ref="inputer" accept="image/png,image/jpeg,image/gif,image/jpg"/>
									</div>
									<div style="marginBottom:10px;textAlign:center">
										<div
											style="display:inline-block;width:120px;textAlign:left"
										>
											<span style="color:red;"></span>礼物价值：
										</div>
										<Input
											type="text"
											v-model="yhlbmkAddObj.value"
											placeholder="请输入获取礼物价值"
											style="width:200px"
										></Input>
									</div>
								</Modal>
								<Modal v-model="imageModal" title="图片查看" class="mymodal">
									<Carousel v-if="imageModal1" v-model="indexcu">
										<Carousel-Item v-for="(item,index) in imagelist" :key="index" >
											<div style="margin: 0 auto;text-align: center;display: flex;align-items: center;width: 488px;height: 300px;justify-content: center;">
											<img :src="item" style="max-height:240px;max-width:440px;" alt=""/>
											</div>
										</Carousel-Item>
									</Carousel>
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
			imageModal1: false,
			imagelist: [], //图片集合image
			indexcu:0,
			imageModal:false,
			goodModal:false,
			upModal:false,
            yhtjtableData: [], // 用户统计表格数据
            yhlbmkIsSearch: false, // 是否加入搜索词
            // 用户列表表格的标题行数据（列属性名称）
            yhlbmkCols: [
                {
                	title: "礼物名称",
                	key: "giftName",
                	align: "center",
                },
                {
                	title: "礼物图片",
                	key: "pic",
                	align: "center",
					render: (h, params) => {
						var str = params.row.pic;
						if (str) {
								//str = str.substring(0, str.lastIndexOf(','));
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
					title: "礼物价值",
					key: "value",
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
            yhlbmkModal: false, // 添加新增用户的对话框显示状态
            yhlbmkLoading: true, // 添加新增用户的对话框加载状态
            // 新增用户的对话框表单
            yhlbmkAddObj: {
                giftName: "", // 用户手机号
                pic: "", // 用户密码
                value: "", // 用户昵称
            },
			model1:'',
			model2:'',
			id:'',
        };
    },
    created() {
        // 获取用户列表数据
        this.yhlbmkGetList(1, this.yhlbmkIsSearch);
		
    },
    methods: {
		addImg(e) {
			//let inputDOM = this.$refs.inputer;
			let inputDOM = e.target.files;
			console.log(typeof inputDOM);
			console.log(typeof this.yhlbmkAddObj.pic);
			// 通过DOM取文件数据
			this.yhlbmkAddObj.pic = inputDOM;
		},
        // 用户列表的页码改变
        yhlbmkPageChange(currentPage) {
            this.yhlbmkGetList(currentPage, this.yhlbmkIsSearch); // 获取用户列表数据
        },
        // 获取用户列表数据（调用接口的）---接口
        yhlbmkGetList(currentPage, isSearch) {
            // currentPage：当前页数   isLimitTime：是否限制时间段
            axios.get('/api/auction/gift/sys/getList')
            	.then( (response)=> {
					var res = response.data;
					if (res.code == 200) {
						if (res.data == null) {
							this.yhlbmktablePageData.list = [];
						} else {
							this.yhlbmktablePageData.list = res.data;
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
            // 获取用户列表数据
            this.yhlbmkGetList(1, this.yhlbmkIsSearch);
        },
		yhlbmkOk(){
			let formData = new FormData();
			formData.append('giftName', this.yhlbmkAddObj.giftName);
			if(this.yhlbmkAddObj.pic){
				for (var i = 0; i < this.yhlbmkAddObj.pic.length; i++) {
						formData.append('pic', this.yhlbmkAddObj.pic[i]);
				}
			}
			// formData.append("pic",this.yhlbmkAddObj.pic[0])
			formData.append('value', this.yhlbmkAddObj.value);
			if(this.yhlbmkAddObj.pic.length==0 || this.yhlbmkAddObj.giftName=='' || this.yhlbmkAddObj.value==''){
				Util.error('正确填写表单');
				this.yhlbmkLoading = false; // 关闭加载状态
			}else{
			console.log(formData);
			let config = {
					headers: { 'Content-Type': 'multipart/form-data' }
			};
			const instance = axios.create({
					withCredentials: true
			});
			//console.log(postData)
			axios
					.post('/api/auction/gift/sys/addGift', formData, config)
					.then(response => {
							console.log(response);
							if (response.data.code == 200) {
									Util.success('添加成功');
									this.yhlbmkGetList(1, this.yhlbmkIsSearch);
							} else {
									Util.error('添加失败,'+response.data.msg);
							}
					})
					.catch(error => {
							console.log(error);
					});
			this.yhlbmkLoading = false; // 关闭加载状态
			this.yhlbmkModal = false; // 关闭当前模态
			}
			setTimeout(() => {
					this.yhlbmkLoading = false;
					this.$nextTick(() => {
							this.yhlbmkLoading = true;
					});
			}, 10);
		},
		//增加商品
		addgood() {
			var file = document.getElementById('file');
			file.value = '';
			this.yhlbmkAddObj.giftName = '';
			this.yhlbmkAddObj.value = '';
			this.yhlbmkModal = true;
		},
		deleteGood(id) {
			if(confirm('是否确认删除')==true){
			let params = {};
			params.id = id;
			let postData = this.$qs.stringify(params);
			axios
				.post('/api/auction/gift/sys/deleteGift',postData)
				.then(response => {
					if (response.data.code == 200) {
						Util.success('删除成功');
						this.yhlbmkGetList(1, this.yhlbmkIsSearch);
					} else {
						Util.error('删除失败');
					}
				})
				.catch(error => {
					console.log(error);
				});
			}
		},
		//点击修改
		updateGood(params) {
			this.upModal=true;
			this.id=params.id;
			this.yhlbmkAddObj.giftName = params.giftName;
			this.yhlbmkAddObj.value = params.value;
			var file = document.getElementById('files');
			file.value = '';
		},
		//修改
		updateOk() {
			// 参数对象
			let formData = new FormData();
			formData.append('id', this.id);
			formData.append('giftName', this.yhlbmkAddObj.giftName);
			if (typeof this.yhlbmkAddObj.pic == 'object') {
					for (var i = 0; i < this.yhlbmkAddObj.pic.length; i++) {
							formData.append('pic', this.yhlbmkAddObj.pic[i]);
					}
			}
			formData.append('value', this.yhlbmkAddObj.value);
			let config = {
					headers: { 'Content-Type': 'multipart/form-data' }
			};
			const instance = axios.create({
					withCredentials: true
			});
			if(this.yhlbmkAddObj.giftName=='' || this.yhlbmkAddObj.value==''){
				Util.error('正确填写表单');
				this.yhlbmkLoading = false; // 关闭加载状态
			}else{
			axios.post('/api/auction/gift/sys/updateGift',formData, config)
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
				this.yhlbmkLoading = false; // 关闭加载状态
		  }
		  setTimeout(() => {
		  		this.yhlbmkLoading = false;
		  		this.$nextTick(() => {
		  				this.yhlbmkLoading = true;
		  		});
		  }, 10);
		},
		showimage(imagearr) {
				this.imageModal = true;
				this.imageModal1 = true;
				this.indexcu=0;//初始化为第一张图片
				// $('.ivu-carousel-track').css("transform","translate3d(0,0,0)")
				this.imagelist = imagearr;
		},
    }
};
</script>
