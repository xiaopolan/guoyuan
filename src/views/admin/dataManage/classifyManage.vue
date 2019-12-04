<!-- 分类设置 -->
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
            <!-- 分类设置 -->
                <div class="itemBox yhlb_table">
                    <div class="remark_box">
                        <Row>
                            <Col span="4">
                                <h3>分类设置</h3>
                            </Col>
                            <Col span="18" style="textAlign:center;">
                                <div class="searchBox clearfix">
                                    <Input
                                        v-model="yhlbmkIpVal"
                                        size="small"
                                        placeholder="请输入类目名称"
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
										style="float:left;width:100px;marginLeft:20px;"
										size="small"
										@click="addgood"
									>录入二级目录</Button>
									<Button
										type="error"
										style="float:left;width:100px;marginLeft:20px;"
										size="small"
										@click="addparent"
									>录入一级目录</Button>
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
											<span style="color:red;">*</span>类目名称：
										</div>
										<Input
											v-model="yhlbmkAddObj.typeName"
											placeholder="请输入类目名称"
											style="width:150px"
										></Input>
									</div>
									<div style="marginBottom:10px;textAlign:center">
										<div
											style="display:inline-block;width:86px;textAlign:left"
										>
											<span style="color:red;">*</span>类目描述：
										</div>
										<Input
											v-model="yhlbmkAddObj.descInfo"
											placeholder="请输入类目描述"
											style="width:150px"
										></Input>
									</div>
									<div v-if="showparent" style="marginBottom:10px;textAlign:center">
										<div
											style="display:inline-block;width:86px;textAlign:left"
										>上级目录：</div>
										<select name="public-choice" v-model="model4" class="typeselect">     
											<option :value="item.value" :key='item'  v-for="item in statusList" >{{item.label}}</option>                                   
										</select>
									</div>
									<div style="marginBottom:10px;textAlign:center">
										<div
											style="display:inline-block;width:86px;textAlign:left"
										>
											<span style="color:red;"></span>介绍图片：
										</div>
										<input style="width:150px;" type="file" id='file5'  @change="addupImg" ref="inputer"  accept="image/png,image/jpeg,image/gif,image/jpg"/>
									</div>
									<div style="marginBottom:10px;textAlign:center">
										<div
											style="display:inline-block;width:86px;textAlign:left"
										>
											<span style="color:red;"></span>类型图片：
										</div>
										<input style="width:150px;" type="file" id='file6'  @change="addupImg1" ref="inputer"  accept="image/png,image/jpeg,image/gif,image/jpg"/>
									</div>
								</Modal>
								<Modal
									v-model="yhlbmkModal"
									title="新增子级"
									:loading="yhlbmkLoading"
									@on-ok="yhlbmkOk(1)"
									@on-cancel="yhlbmkCancel"
								>
									<div style="marginBottom:10px;textAlign:center">
										<div
											style="display:inline-block;width:86px;textAlign:left"
										>
											<span style="color:red;"></span>类目名称：
										</div>
										<Input
											v-model="yhlbmkAddObj.typeName"
											placeholder="请输入类目名称"
											style="width:150px"
										></Input>
									</div>
									<div style="marginBottom:10px;textAlign:center">
										<div
											style="display:inline-block;width:86px;textAlign:left"
										>
											<span style="color:red;"></span>类目描述：
										</div>
										<Input
											v-model="yhlbmkAddObj.descInfo"
											placeholder="请输入类目描述"
											style="width:150px"
										></Input>
									</div>
									<div style="marginBottom:10px;textAlign:center">
										<div
											style="display:inline-block;width:86px;textAlign:left"
										>上级目录：</div>
										<select name="public-choice" v-model="model3" class="typeselect" @change="yhtsxxSlChange">     
											<!-- <option >自定义</option> -->
											<option :value="item" :key='item'  v-for="item in statusList" >{{item.label}}</option>                                   
										</select>
									</div>
									<div style="marginBottom:10px;textAlign:center">
										<div
											style="display:inline-block;width:86px;textAlign:left"
										>
											<span style="color:red;"></span>介绍图片：
										</div>
										<input style="width:150px;" type="file" id='file1'  @change="addchImg" ref="inputer"  accept="image/png,image/jpeg,image/gif,image/jpg"/>
									</div>
									<div style="marginBottom:10px;textAlign:center">
										<div
											style="display:inline-block;width:86px;textAlign:left"
										>
											<span style="color:red;"></span>类型图片：
										</div>
										<input style="width:150px;" type="file" id='file2'  @change="addchImg1" ref="inputer"  accept="image/png,image/jpeg,image/gif,image/jpg"/>
									</div>
									
									<!-- <div style="marginBottom:10px;textAlign:center" v-if="myinput">
										<div
											style="display:inline-block;width:86px;textAlign:left"
										>
											<span style="color:red;">*</span>自定义：
										</div>
										<Input
											v-model="yhlbmkAddObj.pname"
											placeholder="请输入上级类目名称"
											style="width:150px"
										></Input>
									</div> -->
								</Modal>
								<Modal
									v-model="pamodal"
									title="新增上级"
									:loading="yhlbmkLoading"
									@on-ok="yhlbmkOk(2)"
									@on-cancel="yhlbmkCancel"
								>
									<div style="marginBottom:10px;textAlign:center">
										<div
											style="display:inline-block;width:86px;textAlign:left"
										>
											<span style="color:red;"></span>类目名称：
										</div>
										<Input
											v-model="yhlbmkAddObj.typeName"
											placeholder="请输入类目名称"
											style="width:150px"
										></Input>
									</div>
									<div style="marginBottom:10px;textAlign:center">
										<div
											style="display:inline-block;width:86px;textAlign:left"
										>
											<span style="color:red;"></span>类目描述：
										</div>
										<Input
											v-model="yhlbmkAddObj.descInfo"
											placeholder="请输入类目描述"
											style="width:150px"
										></Input>
									</div>
									<div style="marginBottom:10px;textAlign:center">
										<div
											style="display:inline-block;width:86px;textAlign:left"
										>
											<span style="color:red;"></span>介绍图片：
										</div>
										<input style="width:150px;" type="file" id='file3'  @change="addpaImg" ref="inputer" accept="image/png,image/jpeg,image/gif,image/jpg"/>
									</div>
									<div style="marginBottom:10px;textAlign:center">
										<div
											style="display:inline-block;width:86px;textAlign:left"
										>
											<span style="color:red;"></span>类型图片：
										</div>
										<input style="width:150px;" type="file" id='file4'  @change="addpaImg1" ref="inputer" accept="image/png,image/jpeg,image/gif,image/jpg"/>
									</div>
								</Modal>
								<Modal v-model="imageModal" title="图片查看" class="mymodal">
									<Carousel v-if="imageModal1">
										<Carousel-Item v-for="(item,index) in imagelist" :key="index">
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
			imagelist: [], //图片集合image
			imageModal: false,
			imageModal1: false,
			showparent:true,
			pamodal:false,
			goodModal:false,
			// 商品列表表格分页数据
			choicegoodlist: {
				list: [], // 表格列表
				total: 0, // 总条数
				pages: 0, // 总页数
				pageSize: 0, // 每页条数
				currentPage: 0 // 当前页码
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
                    title: '类目名称',
                    key: 'typeName',
                    //width: 280,
                    align: 'center'
                },
                {
                    title: '上级目录',
                    key: 'parentNodeName',
                    //width: 150,
                    align: 'center',
                },
				{
						title: '介绍图片',
						key: 'introductionPic',
						//width: 150,
						align: 'center',
						render: (h, params) => {
								var str = params.row.introductionPic;
								if (str) {
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
																this.showimage(str);
														}
												}
										});
								} else {
										return h('div', {}, '暂无图片');
								}
						}
				},
				{
						title: '类型图片',
						key: 'pic',
						//width: 150,
						align: 'center',
						render: (h, params) => {
								var str = params.row.pic;
								if (str) {
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
																this.showimage(str);
														}
												}
										});
								} else {
										return h('div', {}, '暂无图片');
								}
						}
				},
				{
					title: '类目描述',
					key: 'descInfo',
					//width: 150,
					align: 'center',
				},
				{
					title: '创建时间',
					key: 'createTime',
					//width: 150,
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
                                            this.deleteGood(params.row);
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
				pname:'',
				chpic:{},
				papic:{},
				chpic1:{},
				papic1:{},
				uppic:{},
				uppic1:{},
            },
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
                .post('/api/auction/productType/sys/init', postData)
                .then(response => {
                    var res = response.data;
                    this.yhlbmktablePageData = res.data;
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
                    typeName: this.yhlbmkIpVal,
                    pageNum: currentPage1, // 当前页码
                    pageSize: 10 // 每页条数
                };
                let postData = this.$qs.stringify(params);
                axios
                    .post('/api/auction/productType/sys/findProductTypeByName', postData)
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
        deleteGood(json) {
			if(confirm('是否确认删除')==true){
				let params = {};
				params.id = json.id;
				params.pId = json.pid;
				params.videoClassId = json.videoClassId;
				let postData = this.$qs.stringify(params);
				console.log(postData);
				axios
					.post('/api/auction/productType/sys/deleteNode', postData)
					.then(response => {
						if (response.data.code == 200) {
							Util.success('删除成功');
							this.yhlbmkGetList(1, this.yhlbmkIsSearch);
						} else {
							Util.error('删除失败,'+response.data.msg);
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
        yhlbmkOk(flag) {
                // 参数对象
				if(this.yhlbmkAddObj.typeName=='' || this.yhlbmkAddObj.descInfo==''){
					Util.error('正确填写表单');
				}else{
						let formData = new FormData();
						
						 formData.append("typeName",this.yhlbmkAddObj.typeName)
						formData.append("descInfo",this.yhlbmkAddObj.descInfo)
						if(flag==1){
							formData.append("pId",this.model3.value)
							formData.append("videoClassId",this.model3.videoClassId)
							for (var i = 0; i < this.yhlbmkAddObj.chpic.length; i++) {
									formData.append('introductionPic', this.yhlbmkAddObj.chpic[i]);
							}
							for (var i = 0; i < this.yhlbmkAddObj.chpic1.length; i++) {
									formData.append('pic', this.yhlbmkAddObj.chpic1[i]);
							}
						}
						if(flag==2){
							formData.append("pId",0)
							formData.append("videoClassId",-1)
							for (var i = 0; i < this.yhlbmkAddObj.papic.length; i++) {
									formData.append('introductionPic', this.yhlbmkAddObj.papic[i]);
							}
							for (var i = 0; i < this.yhlbmkAddObj.papic1.length; i++) {
									formData.append('pic', this.yhlbmkAddObj.papic1[i]);
							}
						}
						let config = {
								headers: { 'Content-Type': 'multipart/form-data' }
						};
						const instance = axios.create({
								withCredentials: true
						});
//					}
// 					let config = {
// 							headers: { 'Content-Type': 'application/json',}
// 					};
					//let postData = this.$qs.stringify(params);
						axios
							.post('/api/auction/productType/sys/addNode', formData,config)
							.then(response => {
								console.log(response);
								if (response.data.code == 200) {
									Util.success('添加成功');
									this.showtype();
									this.yhlbmkGetList(1, this.yhlbmkIsSearch);
								} else {
									Util.error('添加失败,'+response.data.msg);
								}
							})
							.catch(error => {
								console.log(error);
							});
						this.yhlbmkLoading = false; // 关闭加载状态
						this.pamodal=false;
						this.yhlbmkModal = false; // 关闭当前模态
						// 清除表单
						this.yhlbmkAddObj.typeName = '';
						this.yhlbmkAddObj.descInfo = '';
						this.model3 = '';
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
        //增加子集
        addgood() {
			document.getElementById('file1').value='';
			document.getElementById('file2').value='';
			// 清除表单
			this.yhlbmkAddObj.typeName = '';
			this.yhlbmkAddObj.descInfo = '';
			this.model3 = '';
			this.yhlbmkAddObj.id = '';
            this.yhlbmkModal = true;
        },
		//增加父级
		addparent(){
			document.getElementById('file3').value='';
			document.getElementById('file4').value='';
			// 清除表单
			this.yhlbmkAddObj.typeName = '';
			this.yhlbmkAddObj.descInfo = '';
			this.model3 = '';
			this.yhlbmkAddObj.id = '';
			this.pamodal=true
		},
		//点击修改
        updateGood(params) {
			document.getElementById('file5').value='';
			document.getElementById('file6').value='';
			this.showparent=true
			if(params.pid==0){
				this.showparent=false
			}
            this.upModal = true;
            this.yhlbmkAddObj.typeName = params.typeName;
            this.yhlbmkAddObj.descInfo = params.descInfo;
			this.yhlbmkAddObj.videoClassId = params.videoClassId;
			this.yhlbmkAddObj.id = params.id;
			this.model4=params.pid
        },
		//修改
        updateOk() {
            // 参数对象
			
			let formData = new FormData();
						
			formData.append("typeName",this.yhlbmkAddObj.typeName)
			formData.append("descInfo",this.yhlbmkAddObj.descInfo)
			formData.append("videoClassId",this.yhlbmkAddObj.videoClassId)
			formData.append("pId",this.model4)
			formData.append("id",this.yhlbmkAddObj.id)
			if(this.yhlbmkAddObj.uppic.length>0){
				for (var i = 0; i < this.yhlbmkAddObj.uppic.length; i++) {
						formData.append('introductionPic', this.yhlbmkAddObj.uppic[i]);
				}
			}
			if(this.yhlbmkAddObj.uppic1.length>0){
				for (var i = 0; i < this.yhlbmkAddObj.uppic1.length; i++) {
						formData.append('pic', this.yhlbmkAddObj.uppic1[i]);
				}
			}
			let config = {
					headers: { 'Content-Type': 'multipart/form-data' }
			};
			const instance = axios.create({
					withCredentials: true
			});
            axios
                .post('/api/auction/productType/sys/updateNode',formData,config)
                .then(response => {
                    console.log(response);
                    if (response.data.code == 200) {
                        Util.success('修改成功');
                        this.yhlbmkGetList(this.yhlbmktablePageData.pageNum, this.yhlbmkIsSearch);
// 						this.$nextTick(function(){
// 							this.$refs['pages'].currentPage = this.yhlbmktablePageData.pageNum;
// 						})
                    } else {
                        Util.error('修改失败,'+response.data.msg);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
            // 清除表单
            this.yhlbmkAddObj.id = '';
            this.yhlbmkAddObj.descInfo = '';
            this.model4 = '';
            this.yhlbmkAddObj.typeName = '';
            this.yhlbmkLoading = false; // 关闭加载状态
            this.upModal = false;
        },
		//图片查看
        showimage(imagearr) {
			this.imagelist=[];
            this.imageModal = true;
			this.imageModal1 = true;
            this.imagelist.push(imagearr);
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
				.post('/api/auction/user/sys/init', postData)
				.then(response => {
					var res = response.data;
					this.choicegoodlist = res.data;
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
					.post('/api/auction/user/sys/getUserByPhone', postData)
					.then(response => {
						var res = response.data;
						// this.choicegoodlist = res.data;
						if(res.code==200){
							if(res.data==null){
								this.choicegoodlist.list=[];
							}else{
								this.choicegoodlist = res.data;
							}
						}else{
							this.choicegoodlist.list=[];
						}
						//this.goodModal=true
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
		// 用户投诉信息的选择器任意一个发生变化
		yhtsxxSlChange() {
		},
		showtype(){
			axios.get('/api/auction/productType/sys/getParentNode')
					.then(response => {
							var res = response.data;
							this.statusList = res.data;
					})
					.catch(error => {
							console.log(error);
					});
		},
		//添加父级图片
		addpaImg(e) {
				//let inputDOM = this.$refs.inputer;
				let inputDOM = e.target.files;
				// 通过DOM取文件数据
				this.yhlbmkAddObj.papic = inputDOM;
		},
		addpaImg1(e) {
				//let inputDOM = this.$refs.inputer;
				let inputDOM = e.target.files;
				// 通过DOM取文件数据
				this.yhlbmkAddObj.papic1 = inputDOM;
		},
		//添加子级图片
		addchImg(e){
			//let inputDOM = this.$refs.inputer;
			let inputDOM = e.target.files;
			// 通过DOM取文件数据
			this.yhlbmkAddObj.chpic = inputDOM;
		},
		addchImg1(e){
			//let inputDOM = this.$refs.inputer;
			let inputDOM = e.target.files;
			// 通过DOM取文件数据
			this.yhlbmkAddObj.chpic1 = inputDOM;
		},
		addupImg(e){
			//let inputDOM = this.$refs.inputer;
			let inputDOM = e.target.files;
			// 通过DOM取文件数据
			this.yhlbmkAddObj.uppic = inputDOM;
		},
		addupImg1(e){
			//let inputDOM = this.$refs.inputer;
			let inputDOM = e.target.files;
			// 通过DOM取文件数据
			this.yhlbmkAddObj.uppic1 = inputDOM;
		},
    }
};
</script>
