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
.typeselect {
    width: 150px;
    height: 25px;
    color: #515a6e;
    border: none;
    float: left;
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
                                    <Input
                                        v-model="yhlbmkIpVal"
                                        size="small"
                                        placeholder="请输入商品名称"
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
									>录入商品</Button>
                                </div>
								<Modal
									v-model="yhlbmkModal"
									title="添加商品"
									:loading="yhlbmkLoading"
									@on-ok="yhlbmkOk"
									@on-cancel="yhlbmkCancel"
								>
									<div style="marginBottom:10px;textAlign:center">
										<div
											style="display:inline-block;width:86px;textAlign:left"
										>
											<span style="color:red;"></span>商品名称：
										</div>
										<Input
											v-model="yhlbmkAddObj.productName"
											placeholder="请输入商品名称"
											style="width:150px"
										></Input>
									</div>
									<div style="marginBottom:10px;textAlign:center">
										<div
											style="display:inline-block;width:86px;textAlign:left"
										>
											<span style="color:red;"></span>商品主图：
										</div>
										<input style="width:150px;" type="file" id="file"  @change="addImg" ref="inputer" multiple accept="image/png,image/jpeg,image/gif,image/jpg"/>
									</div>
									<div style="marginBottom:5px;textAlign:center;margin-top: 15px;height: 40px;">
										<div
											style="width:86px;textAlign:left;float:left;margin-left: 127px;
    line-height: 31px;"
										>商品类型：</div>
										<Cascader :data="cityList" v-model="model1" class="typeselect"></Cascader>
									</div>
									<div style="clear: both;"></div>
									<div style="marginBottom:10px;textAlign:center">
										<div
											style="display:inline-block;width:86px;textAlign:left"
										>商品价格：</div>
										<Input
											v-model="yhlbmkAddObj.productPrice"
											placeholder="请输入商品价格"
											style="width:150px"
											type="number"
										></Input>
									</div>
									<div style="marginBottom:10px;textAlign:center">
										<div
											style="display:inline-block;width:86px;textAlign:left"
										>商品介绍：</div>
										<Input
											type="textarea"
											v-model="yhlbmkAddObj.introduction"
											placeholder="请输入商品介绍"
											style="width:150px"
										></Input>
									</div>
								</Modal>
								<Modal
									v-model="upModal"
									title="修改商品"
									:loading="yhlbmkLoading"
									@on-ok="updateOk"
									@on-cancel="yhlbmkCancel"
								>
									<div style="marginBottom:10px;textAlign:center">
										<div
											style="display:inline-block;width:86px;textAlign:left"
										>
											<span style="color:red;"></span>商品名称：
										</div>
										<Input
											v-model="yhlbmkAddObj.productName"
											placeholder="请输入商品名称"
											style="width:150px"
										></Input>
									</div>
									<div style="marginBottom:10px;textAlign:center">
										<div
											style="display:inline-block;width:86px;textAlign:left"
										>
											<span style="color:red;"></span>商品主图：
										</div>
										<input style="width:150px;" type="file" id='files'  @change="addImg" ref="inputer" multiple accept="image/png,image/jpeg,image/gif,image/jpg"/>
									</div>
									<div style="marginBottom:5px;textAlign:center;margin-top: 15px;height: 40px;">
										<div
											style="width:86px;textAlign:left;float:left;margin-left: 127px;
		line-height: 31px;"
										>商品类型：</div>
										<Cascader :data="cityList" v-model="model2" class="typeselect"></Cascader>
									</div>
									<div style="marginBottom:10px;textAlign:center">
										<div
											style="display:inline-block;width:86px;textAlign:left"
										>商品价格：</div>
										<Input
											v-model="yhlbmkAddObj.productPrice"
											placeholder="请输入商品价格"
											style="width:150px"
											type="number"
										></Input>
									</div>
									<div style="marginBottom:10px;textAlign:center">
										<div
											style="display:inline-block;width:86px;textAlign:left"
										>商品介绍：</div>
										<Input
											type="textarea"
											v-model="yhlbmkAddObj.introduction"
											placeholder="请输入商品介绍"
											style="width:150px"
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
								<Modal v-model="imageModal2" title="视频" class="mymodal"  @on-ok="stopvideo"
									@on-cancel="stopvideo" width='840'>
									<div>
										<video style="display: block;margin: 0 auto;width: 800px;height: 600px;" :src="video" :key="video" id="video" controls="controls"></video>
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
					imageModal2:false,
            indexcu: 0,
            cityList: [], //商品类型
            model1: [],
            model2: [],
            listobj: true,
            yhtjtableData: [], // 用户统计表格数据
            // 用户列表相关
            // 用户列表的选择器条件
            yhlbmkIpVal: '', // 用户列表的搜索条件
            yhlbmkIsSearch: false, // 是否加入搜索词
            // 用户列表表格的标题行数据（列属性名称）
            yhlbmkCols: [
                {
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
									title: '视频',
									align: 'center',
									render: (h, params) => {
											var str = params.row.videoUrl;
											if (str) {
													return h('video', {
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
																			this.showvideo(str);
																	}
															}
													});
											} else {
													return h('div', {}, '暂无视频');
											}
									}
								},
                {
                    title: '商品主图',
                    key: 'pic',
                    //width: 150,
                    align: 'center',
                    render: (h, params) => {
                        var str = params.row.pic;
                        if (str) {
                            if(str.lastIndexOf(',')>0){
                            	str = str.substring(0, str.lastIndexOf(','));
                            }
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
                    title: '商品类型',
                    key: 'productType',
                    //width: 180,
                    align: 'center'
                },
                {
                    title: '商品价格',
                    //width: 180,
                    key: 'productPrice',
                    align: 'center'
                },
                {
                    title: '点赞数',
                    key: 'dianzanNum',
                    //width: 180,
                    align: 'center'
                },
                {
                    title: '商品来源',
                    key: 'source',
                    align: 'center',
                    render: (h, params) => {
                        var str = params.row.source;
                        if (str == 0) {
                            return h('div', '平台发布');
                        }
                        if (str == 1) {
                            return h('div', '用户发布');
                        }
                    }
                },
                {
                    title: '发布状态',
                    key: 'isAuction',
                    align: 'center',
                    render: (h, params) => {
                        var str = params.row.isAuction;
                        if (str == 0) {
                            return h('div', '未发布');
                        }
                        if (str == 1) {
                            return h('div', '已发布');
                        }
                    }
                },
                {
                    title: '竞拍状态',
                    key: 'isPush',
                    align: 'center',
                    render: (h, params) => {
                        var str = params.row.isPush;
                        if (str == 1) {
                            return h('div', '可竞拍');
                        }
                        if (str == 0) {
                            return h('div', '不可竞拍');
                        }
                    }
                },
                {
                    title: '发布人',
                    key: 'userName',
                    align: 'center'
                },
                {
                    title: '商品简介',
                    key: 'introduction',
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
                pic: {}, // 商品主图
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
        this.showtype();
    },
    methods: {
        addImg(e) {
            //let inputDOM = this.$refs.inputer;
            let inputDOM = e.target.files;
            console.log(typeof inputDOM);
            console.log(typeof this.yhlbmkAddObj.pic);
            // 通过DOM取文件数据
            this.yhlbmkAddObj.pic = inputDOM;
            // 				let file = e.target.files[0];
            // 			  let param = new FormData(); //创建form对象
            // 			  param.append('file',file,file.name);//通过append向form对象添加数据
            // 			  param.append('chunk','0');//添加form表单中其他数据
            // 			  console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
            // 			  let config = {
            // 				headers:{'Content-Type':'multipart/form-data'}
            // 			  };  //添加请求头
            // 			  this.axios.post('http://upload.qiniu.com/',param,config)
            // 			  .then(response=>{
            // 				console.log(response.data);
            //			  })
        },
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
                .post('/api/auction/product/sys/init', postData)
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
            /* Util.post('/auction/product/init', params).then(function (res) {
					if (res && res.code == 0) {
						return res.data;
					} else {
						return res.msg;
					}
				}) */
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
                    .post('/api/auction/product/sys/findProduct', postData)
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
                let params = {};
                params.id = id;
                // let postData = this.$qs.stringify(params);
                axios
                    .post('/api/auction/product/sys/removeProductById', params)
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
            //this.sqlbmkApplyHandle(id, -1); // 申请处理
            // 重新获取申请列表数据
            //this.sqlbmkGetList(1, this.sqlbmkIsSearch);
        },
        // 点击新增用户的对话框的ok
        yhlbmkOk() {
            // 参数对象
            // 				let params = {
            // 					productName: this.yhlbmkAddObj.productName,
            // 					pic: this.$qs.stringify(this.yhlbmkAddObj.pic),
            // 					productType: this.model1 ,
            // 					productPrice: this.yhlbmkAddObj.productPrice ,
            // 					introduction: this.yhlbmkAddObj.introduction
            // 				};
            // 				let postData = this.$qs.stringify(params);
            let formData = new FormData();
            formData.append('productName', this.yhlbmkAddObj.productName);
            for (var i = 0; i < this.yhlbmkAddObj.pic.length; i++) {
                formData.append('pic', this.yhlbmkAddObj.pic[i]);
            }
            // formData.append("pic",this.yhlbmkAddObj.pic[0])
            formData.append('productType', this.model1[1]);
            formData.append('productPrice', this.yhlbmkAddObj.productPrice);
            formData.append('introduction', this.yhlbmkAddObj.introduction);
            if (
                this.yhlbmkAddObj.pic.length == 0 ||
                this.model1.length == 0 ||
                this.yhlbmkAddObj.productPrice == '' ||
                this.yhlbmkAddObj.introduction == '' ||
                this.yhlbmkAddObj.productName == ''
            ) {
                Util.error('正确填写表单');
            } else {
                console.log(formData);
                let config = {
                    headers: { 'Content-Type': 'multipart/form-data' }
                };
                const instance = axios.create({
                    withCredentials: true
                });
                //console.log(postData)
                axios
                    .post('/api/auction/product/sys/addProduct', formData, config)
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
            this.yhlbmkAddObj.pic = '';
            this.model1 = [];
            this.model2 = [];
            this.yhlbmkAddObj.productPrice = '';
            this.yhlbmkAddObj.introduction = '';
            let file = document.getElementById('file');
            file.value = '';
            this.yhlbmkModal = true;
        },
        showtype() {
            axios
                .post('/api/auction/productType/sys/getAllNode')
                .then(response => {
                    var res = response.data;
                    this.cityList = res.data;
                    console.log(this.cityList);
                })
                .catch(error => {
                    console.log(error);
                });
        },
        updateGood(params) {
            let file = document.getElementById('files');
            file.value = '';
            this.upModal = true;
            this.yhlbmkAddObj.productName = params.productName;
            this.yhlbmkAddObj.pic = params.pic;
            //this.model2 = params.productTypeId;
            this.yhlbmkAddObj.productPrice = params.productPrice || '';
            this.yhlbmkAddObj.introduction = params.introduction;
            this.yhlbmkAddObj.id = params.id;
						this.yhlbmkAddObj.source=params.source
            let json = {};
            json.id = params.productTypeId;
            let postData = this.$qs.stringify(json);
            console.log(postData);
            axios
                .post('/api/auction/productType/sys/findProductTypeById', postData)
                .then(response => {
                    var res = response.data;
                    this.model2 = [res.data.pid, res.data.id];
                })
                .catch(error => {
                    console.log(error);
                });
        },
        updateOk() {
            // 参数对象
            let formData = new FormData();
            formData.append('id', this.yhlbmkAddObj.id);
            formData.append('productName', this.yhlbmkAddObj.productName);
            if (typeof this.yhlbmkAddObj.pic == 'object') {
                for (var i = 0; i < this.yhlbmkAddObj.pic.length; i++) {
                    formData.append('pic', this.yhlbmkAddObj.pic[i]);
                }
            }
            formData.append('productType', this.model2[1]);
            formData.append('productPrice', this.yhlbmkAddObj.productPrice);
            formData.append('introduction', this.yhlbmkAddObj.introduction);
						formData.append('source', this.yhlbmkAddObj.source);
            console.log(formData);
            let config = {
                headers: { 'Content-Type': 'multipart/form-data' }
            };
            const instance = axios.create({
                withCredentials: true
            });

            // 				let params = {
            // 					id:this.yhlbmkAddObj.id,
            // 					productName: this.yhlbmkAddObj.productName,
            // 					//pic: this.yhlbmkAddObj.pic,
            // 					productType: this.model1 ,
            // 					productPrice: this.yhlbmkAddObj.productPrice ,
            // 					introduction: this.yhlbmkAddObj.introduction
            // 				};
            //let postData = this.$qs.stringify(params);
            axios
                .post('/api/auction/product/sys/updateProductById', formData, config)
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
            // 清除表单
            this.yhlbmkAddObj.productName = '';
            this.yhlbmkAddObj.pic = '';
            this.model2 = [];
            this.yhlbmkAddObj.productPrice = '';
            this.yhlbmkAddObj.introduction = '';
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
        //测试支付接口
        // 		showmoeny(){
        // 				let params = {
        // 						pay_memberid: '10173',
        // 						pay_orderid	: "20190513151208971527", // 当前页码
        // 						pay_applydate: '2019-05-13 15:12:08', // 每页条数
        // 						pay_bankcode: '904',
        // 						pay_notifyurl: 'http://localhost:8080/auction/aa/auction/orders/aa',
        // 						pay_callbackurl: 'http://www.baidu.com',
        // 						pay_amount: '100',
        // 						pay_md5sign: '4239A36CC576F216D8BA3FE7515196A1',
        // 						pay_productname: '鞋子',
        // 				};
        // 				let postData = this.$qs.stringify(params);
        // 				axios
        // 						.post('/pay', postData)
        // 						.then(response => {
        // 								var res = response.data;
        // 						})
        // 						.catch(error => {
        // 								console.log(error);
        // 						});
        // 		}
    }
};
</script>
