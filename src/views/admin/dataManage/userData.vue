<!-- 订单管理 -->
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
</style>

<template>
    <div class="tabsBox_style">
            <!-- 订单管理 -->
                <div class="itemBox yhlb_table">
                    <div class="remark_box">
                        <Row>
                            <Col span="4">
                                <h3>订单管理</h3>
                            </Col>
                            <Col span="12" style="textAlign:center;">
                                <div class="searchBox clearfix">
                                    <Input
                                        v-model="yhlbmkIpVal"
                                        size="small"
                                        placeholder="请输入订单号"
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
                                </div>
                            </Col>
							<Col span="4">
							    <select style="width:150px" name="public-choice" v-model="modelName" class="typeselect" @change="getmodel(1)">
							    	<option :value="item.orderStatus" :key='item' v-for="item in statusList" >{{item.name}}</option>                                    
							    </select>
							</Col>
							<Modal
								v-model="yhlbmkModal"
								title="物流信息"
								:loading="yhlbmkLoading"
								@on-ok="yhlbmkOk"
								@on-cancel="yhlbmkCancel"
							>
								<div style="marginBottom:10px;textAlign:center">
									<div
										style="display:inline-block;width:86px;textAlign:left"
									>
										<span style="color:red;">*</span>物流公司：
									</div>
									<Input
										v-model="wlgongsi"
										placeholder="请输入物流公司"
										style="width:150px"
									></Input>
								</div>
								<div style="marginBottom:10px;textAlign:center">
									<div
										style="display:inline-block;width:86px;textAlign:left"
									>
										<span style="color:red;">*</span>物流单号：
									</div>
									<Input
										v-model="wlid"
										placeholder="请输入物流单号"
										style="width:150px"
									></Input>
								</div>
								
							</Modal>
                        </Row>
                    </div>
                    <div class="tablepage_box">
                        <!-- 导出按钮 -->
                        <div class="exportBtnBox clearfix">
                           <Button class="exportBtn" type="primary" size="small" @click="exportData(1)">
                           		    <Icon class="icon_export" type="ios-download-outline"></Icon>导出数据
                           		</Button>
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
								@on-change="yhlbmkPageChange1"
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
			listobj:true,
			modelName:100,
			statusList:[{
				orderStatus:100,
				name:"全部订单"
			},{
				orderStatus:-1,
				name:"取消"
			},{
				orderStatus:0,
				name:"未支付"
			},{
				orderStatus:1,
				name:"已支付"
			},{
				orderStatus:2,
				name:"支付失败"
			}],
			wlgongsi:'',
			wlid:'',
            yhtjtableData: [], // 用户统计表格数据
            yhlbmkIpVal: "", // 用户列表的搜索条件
            yhlbmkIsSearch: false, // 是否加入搜索词
            // 用户列表表格的标题行数据（列属性名称）
            yhlbmkCols: [
                {
                	title: "订单编号",
					key: "orderId",
                	align: "center"
                },
				{
					title: "手机号",
					key: "mobile",
					align: "center"
				},
                {
                	title: "用户名",
                	key: "userName",
                	align: "center"
                },
				{
					title: "商品名称",
					key: "productName",
					align: "center"
				},
				{
					title: '创建时间',
					key: 'createTime',
					align: 'center',
				},
				{
					title: '支付时间',
					key: 'payTime',
					align: 'center',
				},
                {
                	title: "成交价格",
                	key: "totalPrice",
                	align: "center"
                },
                {
                	title: "购买数量",
                	key: "productNumbre",
                	align: "center"
                },
				{
					title: "神秘株数量",
					key: "limitNumber",
					align: "center"
				},
				{
					title: "快递单号",
					key: "logisticsNumber",
					align: "center"
				},
				{
					title: "物流公司",
					key: "logisticsCompany",
					align: "center"
				},
                {
                	title: "订单状态",
                	key: "status",
                	width: 90,
                	align: "center",
					render: (h,params)=> {
						let text = params.row.orderStatus
						if(text==0){
							return h('div','待支付')
						}else if(text==1){
							return h('div','交易成功')
						}else if(text==2){
							return h('div','支付失败')
						}else if(text==-1){
							return h('div','支付取消')
						}
					}
                },
				{
					title: "操作",
					key: "status",
					width: 90,
					align: "center",
					render: (h, params) => {
						return h(
							"Button", {
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
										this.goorder(params)
									}
								}
							},
							"添加物流"
						)
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
            },
			model1:'',
			cityList:[],
			orderId:'',
			logisticsCompany:'',
			logisticsNo:'',
			id:'',
			dangci:{}
        };
    },
    created() {
		// var json= this.$route.params.id
        // 获取用户列表数据
        this.yhlbmkGetList(1, this.yhlbmkIsSearch);
		
    },
    methods: {
        // 用户列表的页码改变
        yhlbmkPageChange(currentPage) {
            this.yhlbmkGetList(currentPage, this.yhlbmkIsSearch); // 获取用户列表数据
        },
		yhlbmkPageChange1(currentPage) {
		    this.getmodel(currentPage, this.yhlbmkIsSearch); // 获取用户列表数据
		},
		getmodel(currentPage){
			this.listobj=false;
			this.yhlbmktablePageData.currentPage=1;
			var params
			if(this.modelName==100){
				params = {
				    pageNum: currentPage, // 当前页码
				    pageSize: 10, // 每页条数
				};
			}else{
				params = {
				    pageNum: currentPage, // 当前页码
				    pageSize: 10, // 每页条数
					orderStatus:this.modelName
				};
			}
			axios.get('/api/manage/orders/getOrdersSuccess',{params})
				.then( (response)=> {
				var res = response.data;
				this.yhlbmktablePageData=res.data;
				})
				.catch( (error)=> {
				console.log(error);
				});
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
            axios.get('/api/manage/orders/getOrders',{params})
            	.then( (response)=> {
            	var res = response.data;
            	this.yhlbmktablePageData=res.data;
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
                Util.error("请输入电话号码号");
            }
        },
		goorder(params){
			this.yhlbmkModal=true;
			this.orderId=params.row.orderId
		},
		queryOrder(currentPage){
			if (this.yhlbmkIpVal) {
				let params= {
					pageNum: currentPage, // 当前页码
					pageSize: 10, // 每页条数
					orderId:this.yhlbmkIpVal
				};
				// let postData = this.$qs.stringify(params);
				axios.get('/api/manage/orders/findOrder',{params})
					.then( (response)=> {
					var res = response.data;
					this.yhlbmktablePageData=res.data;
					})
					.catch( (error)=> {
						console.log(error);
					});
			} else {
				this.yhlbmkGetList(1, this.yhlbmkIsSearch);
			}
		},
		yhlbmkOk(){
			
			let json={
				orderId:this.orderId,
				logisticsCompany:this.wlgongsi,
				logisticsNumber:this.wlid,
			};
			let postData = this.$qs.stringify(json);
			if(this.wlgongsi=='' || this.wlid==''){
				Util.error("请正确填写表单");
			}else{
				axios.post('/api/manage/logistics/addLogistics',postData)
					.then( (response)=> {
					if(response.data.code==200){
						Util.success("添加成功");
						this.wlgongsi='';
						this.wlid=""
						this.yhlbmkGetList(this.yhlbmktablePageData.pageNum, this.yhlbmkIsSearch);
						this.$nextTick(function() {
							this.$refs['pages'].currentPage = this.yhlbmktablePageData.pageNum;
						});
					}else{
						Util.error("添加失败"+response.data.msg);
					}
					})
					.catch( (error)=> {
					console.log(error);
					});
				this.yhlbmkModal=false
			}
			setTimeout(() => {
				this.yhlbmkLoading = false;
				this.$nextTick(() => {
					this.yhlbmkLoading = true;
				});
			}, 10);
		},
		//导出表格
		exportData (type) {
			if (type === 1) {
				this.$refs.yhlbmkTable.exportCsv({
					filename: '原始数据'
				});
			} else if (type === 2) {
				this.$refs.table.exportCsv({
					filename: '排序和过滤后的数据',
					original: false
				});
			} else if (type === 3) {
				this.$refs.table.exportCsv({
					filename: '自定义数据',
					columns: this.columns8.filter((col, index) => index < 4),
					data: this.data7.filter((data, index) => index < 4)
				});
			}
		} 
    }
};
</script>
