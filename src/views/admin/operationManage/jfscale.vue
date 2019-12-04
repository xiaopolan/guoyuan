<!-- 积分返利 -->
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
            <!-- 积分返利 -->
                <div class="itemBox yhlb_table">
                    <div class="remark_box">
                        <Row>
                            <Col span="4">
                                <h3>积分返利</h3>
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
											<span style="color:red;"></span>积分数量：
										</div>
										<Input
											v-model="yhlbmkAddObj.num"
											placeholder="请输入积分数量"
											style="width:150px"
										></Input>
									</div>
									<div style="marginBottom:10px;textAlign:center">
										<div
											style="display:inline-block;width:86px;textAlign:left"
										>返利比例：</div>
										<Input
											v-model="yhlbmkAddObj.scale"
											placeholder="请输入返利比例"
											style="width:150px"
										></Input>
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
											<span style="color:red;"></span>积分数量：
										</div>
										<Input
											v-model="yhlbmkAddObj.num"
											placeholder="请输入积分数量"
											style="width:150px"
										></Input>
									</div>
									<div style="marginBottom:10px;textAlign:center">
										<div
											style="display:inline-block;width:86px;textAlign:left"
										>返利比例：</div>
										<Input
											v-model="yhlbmkAddObj.scale"
											placeholder="请输入返利比例"
											style="width:150px"
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
                    align: 'center'
                },
                {
                    title: '积分数量',
                    key: 'num',
                    //width: 280,
                    align: 'center'
                },
                {
                    title: '返利比例',
                    key: 'scale',
                    //width: 150,
                    align: 'center',
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
        // 获取用户列表数据（调用接口的）---接口
        yhlbmkGetList(currentPage, isSearch) {
            // currentPage：当前页数   isLimitTime：是否限制时间段
            // 参数对象
            axios
                .get('/api/auction/ArtcReward/sys/getList')
                .then(response => {
                    var res = response.data;
                    // this.yhlbmktablePageData = res.data;
					if(res.code==200){
						if(res.data==null){
							this.yhlbmktablePageData.list=[];
						}else{
							this.yhlbmktablePageData.list = res.data;
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
        deleteGood(id) {
            let params = {};
            params.id = id;
            axios
                .get('/api/auction/ArtcReward/sys/del', {params})
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
        },
        // 点击新增用户的对话框的ok
        yhlbmkOk() {
                // 参数对象
				let params = {
					num: this.yhlbmkAddObj.num,
					scale: this.yhlbmkAddObj.scale,
				};
				if(this.yhlbmkAddObj.scale=='' || this.yhlbmkAddObj.num==''){
					Util.error('正确填写表单');
				}else{
						axios
							.get('/api/auction/ArtcReward/sys/add', {params})
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
						// 解决Modal表单验证中loading的bug
						setTimeout(() => {
							this.yhlbmkLoading = false;
							this.$nextTick(() => {
								this.yhlbmkLoading = true;
							});
						}, 10);
						this.yhlbmkModal = false; // 关闭当前模态
						
				}
                
        },
        // 点击新增用户的对话框的取消
        yhlbmkCancel() {
            console.log('点击取消');
            // 清除表单
        },
        //增加商品
        addgood() {
			// 清除表单
			this.yhlbmkAddObj.num = '';
			this.yhlbmkAddObj.scale = '';
            this.yhlbmkModal = true;
        },
		//点击修改
        updateGood(params) {
            this.upModal = true;
            this.yhlbmkAddObj.scale = params.scale;
            this.yhlbmkAddObj.num = params.num;
			this.yhlbmkAddObj.id=params.id
        },
		//修改
        updateOk() {
            // 参数对象

			let params = {
				id:this.yhlbmkAddObj.id,
				num: this.yhlbmkAddObj.num,
				scale: this.yhlbmkAddObj.scale ,
			};
            axios
                .get('/api/auction/ArtcReward/sys/update', {params})
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
            this.yhlbmkLoading = false; // 关闭加载状态
            this.upModal = false;
        },
    }
};
</script>
