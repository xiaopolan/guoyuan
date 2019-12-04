<!-- 会员权益 -->
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
            <!-- 会员权益 -->
                <div class="itemBox yhlb_table">
                    <div class="remark_box">
                        <Row>
                            <Col span="4">
                                <h3>会员权益</h3>
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
											<span style="color:red;"></span>会员等级：
										</div>
										<Input
											type="number"
											v-model="yhlbmkAddObj.grade"
											placeholder="请输入会员等级"
											style="width:200px"
										></Input>
									</div>
									<div style="marginBottom:10px;textAlign:center">
										<div
											style="display:inline-block;width:120px;textAlign:left"
										>
											<span style="color:red;"></span>积分数量：
										</div>
										<Input
											type="number"
											v-model="yhlbmkAddObj.countNum"
											placeholder="请输入积分数量"
											style="width:200px"
										></Input>
									</div>
									<div style="marginBottom:10px;textAlign:center">
										<div
											style="display:inline-block;width:120px;textAlign:left"
										>
											<span style="color:red;"></span>获取积分比例（%）：
										</div>
										<Input
											type="number"
											v-model="yhlbmkAddObj.integralScale"
											placeholder="请输入获取积分比例"
											style="width:200px"
										></Input>
									</div>
									<div style="marginBottom:10px;textAlign:center">
										<div
											style="display:inline-block;width:120px;textAlign:left"
										>
											<span style="color:red;"></span>交易手续费（%）：
										</div>
										<Input
											type="number"
											v-model="yhlbmkAddObj.serverCharge"
											placeholder="请输入交易手续费"
											style="width:200px"
										></Input>
									</div>
									<div style="marginBottom:10px;textAlign:center">
										<div
											style="display:inline-block;width:120px;textAlign:left"
										>
											<span style="color:red;"></span>交易市场下限：
										</div>
										<Input
											type="number"
											v-model="yhlbmkAddObj.lowerLimit"
											placeholder="请输入交易市场下限"
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
											<span style="color:red;"></span>会员等级：
										</div>
										<Input
											type="number"
											v-model="yhlbmkAddObj.grade"
											placeholder="请输入会员等级"
											style="width:200px"
										></Input>
									</div>
									<div style="marginBottom:10px;textAlign:center">
										<div
											style="display:inline-block;width:120px;textAlign:left"
										>
											<span style="color:red;"></span>积分数量：
										</div>
										<Input
											type="number"
											v-model="yhlbmkAddObj.countNum"
											placeholder="请输入积分数量"
											style="width:200px"
										></Input>
									</div>
									<div style="marginBottom:10px;textAlign:center">
										<div
											style="display:inline-block;width:120px;textAlign:left"
										>
											<span style="color:red;"></span>获取积分比例（%）：
										</div>
										<Input
											type="number"
											v-model="yhlbmkAddObj.integralScale"
											placeholder="请输入获取积分比例"
											style="width:200px"
										></Input>
									</div>
									<div style="marginBottom:10px;textAlign:center">
										<div
											style="display:inline-block;width:120px;textAlign:left"
										>
											<span style="color:red;"></span>交易手续费（%）：
										</div>
										<Input
											type="number"
											v-model="yhlbmkAddObj.serverCharge"
											placeholder="请输入交易手续费"
											style="width:200px"
										></Input>
									</div>
									<div style="marginBottom:10px;textAlign:center">
										<div
											style="display:inline-block;width:120px;textAlign:left"
										>
											<span style="color:red;"></span>交易市场下限：
										</div>
										<Input
											type="number"
											v-model="yhlbmkAddObj.lowerLimit"
											placeholder="请输入交易市场下限"
											style="width:200px"
										></Input>
									</div>
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
			upModal:false,
            yhtjtableData: [], // 用户统计表格数据
            yhlbmkIsSearch: false, // 是否加入搜索词
            // 用户列表表格的标题行数据（列属性名称）
            yhlbmkCols: [
                {
                	title: "会员等级",
                	key: "grade",
                	align: "center",
					render: (h,params)=> {
						return h('div',"V"+params.row.grade)
					}
                },
                {
                	title: "ARTC数量",
                	key: "countNum",
                	align: "center"
                },
				{
					title: "获取ARTC比例",
					key: "integralScale",
					align: "center"
				},
				{
					title: "交易手续费(%)",
					key: "serverCharge",
					align: "center",
					render: (h,params)=> {
						return h('div',params.row.serverCharge*1000/10+"%")
					}
				},
				{
					title: "交易市场限制(数量)",
					align: "center",
					render: (h,params)=> {
						if(params.row.grade==0 || params.row.grade==1){
							return h("div","500")
						}else{
							return h("div",params.row.lowerLimit+' - '+params.row.upperLimit)
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
			id:'',
			jflimit:''
        };
    },
    created() {
        // 获取用户列表数据
        this.yhlbmkGetList(1, this.yhlbmkIsSearch);
		this.showlist()
    },
    methods: {
        // 用户列表的页码改变
        yhlbmkPageChange(currentPage) {
            this.yhlbmkGetList(currentPage, this.yhlbmkIsSearch); // 获取用户列表数据
        },
		showlist() {
			axios
				.post('/api/auction/operate/sys/init')
				.then(response => {
					var res = response.data;
					var list20 = res.data.artc_transaction
					this.jflimit = list20[0].cdVal || '';
				})
				.catch(error => {
					console.log(error);
				});
		},
        // 获取用户列表数据（调用接口的）---接口
        yhlbmkGetList(currentPage, isSearch) {
            // currentPage：当前页数   isLimitTime：是否限制时间段
            axios.get('/api/auction/member/sys/getList')
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
            // console.log("选择器变化");
            // 获取用户列表数据
            this.yhlbmkGetList(1, this.yhlbmkIsSearch);
        },
		yhlbmkOk(){
			this.yhlbmkModal=false;
			
			let json={
				grade:this.yhlbmkAddObj.grade,
				countNum:this.yhlbmkAddObj.countNum,
				integralScale:this.yhlbmkAddObj.integralScale,
				serverCharge:this.yhlbmkAddObj.serverCharge/100,
				lowerLimit:this.yhlbmkAddObj.lowerLimit,
				upperLimit:this.yhlbmkAddObj.countNum*this.jflimit
			};
			if(this.yhlbmkAddObj.grade==0 || this.yhlbmkAddObj.grade==1){
				json.lowerLimit=json.upperLimit=500
			}
			let postData = this.$qs.stringify(json);
			axios.post('/api/auction/member/sys/addMember',postData)
				.then( (response)=> {
				if(response.data.code==200){
					Util.success("录入成功");
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
			this.yhlbmkAddObj.grade = '';
			this.yhlbmkAddObj.countNum = '';
			this.yhlbmkAddObj.integralScale = '';
			this.yhlbmkAddObj.serverCharge = '';
			this.yhlbmkAddObj.lowerLimit = '';
			this.yhlbmkModal = true;
		},
		deleteGood(id) {
			if(confirm('是否确认删除')==true){
			let params = {};
			params.id = id;
			let postData = this.$qs.stringify(params);
			axios
				.post('/api/auction/member/sys/deleteMember',postData)
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
			this.id=params.id;
			this.yhlbmkAddObj.grade = params.grade;
			this.yhlbmkAddObj.countNum = params.countNum;
			this.yhlbmkAddObj.integralScale = params.integralScale;
			this.yhlbmkAddObj.serverCharge = params.serverCharge*100;
			this.yhlbmkAddObj.lowerLimit = params.lowerLimit;
		},
		//修改
		updateOk() {
			// 参数对象
			let params = {
				id:this.id,
				grade:this.yhlbmkAddObj.grade,
				countNum:this.yhlbmkAddObj.countNum,
				integralScale:this.yhlbmkAddObj.integralScale,
				serverCharge:this.yhlbmkAddObj.serverCharge/100,
				lowerLimit:this.yhlbmkAddObj.lowerLimit,
				upperLimit:this.yhlbmkAddObj.countNum*this.jflimit
			};
			if(this.yhlbmkAddObj.grade==0 || this.yhlbmkAddObj.grade==1){
				params.lowerLimit=params.upperLimit=500
			}
			let postData = this.$qs.stringify(params);
			axios.post('/api/auction/member/sys/updateMember',postData)
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
			setTimeout(() => {
				this.yhlbmkLoading = false;
				this.$nextTick(() => {
					this.yhlbmkLoading = true;
				});
			}, 10);
		},
    }
};
</script>
