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
									<select name="public-choice" v-model="logisticsCompany" class="typeselect">                                        
										<option :value="item.name"  v-for="item in cityList" >{{item.name}}</option>                                    
									</select>
								</div>
								<div style="marginBottom:10px;textAlign:center">
									<div
										style="display:inline-block;width:86px;textAlign:left"
									>
										<span style="color:red;">*</span>物流单号：
									</div>
									<Input
										v-model="logisticsNo"
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
                	title: "订单编号",
					key: "orderId",
                	align: "center"
                },
                {
                	title: "商品名称",
                	key: "productName",
                	align: "center"
                },
                {
                	title: "竞拍挡次",
                	key: "gradeName",
                	align: "center"
                },
				{
					title: "竞拍场次",
					key: "title",
					align: "center"
				},
				{
					title: "发货时间",
					key: "sendTime",
					align: "center",
					render: (h, params) => {
						if(params.row.sendTime!=null){
							return h(
									'div',
									new Date(params.row.sendTime).Format('yyyy-MM-dd hh:mm:ss')
							); /*这里的this.row能够获取当前行的数据*/
						}
					}
				},
				{
					title: '订单生成时间',
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
                	title: "成交价格",
                	key: "totalPrice",
                	align: "center"
                },
                {
                	title: "物流地址",
                	key: "orderAddress",
                	align: "center"
                },
                {
                	title: "订单状态",
                	key: "status",
                	width: 90,
                	align: "center",
					render: (h,params)=> {
						let text = params.row.status
						if(text==0){
							return h('div','已发货')
						}else if(text==1){
							return	h(
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
										nativeOn: {
											click: () => {
												this.goorder(params)
											}
										}
									},
									"发货"
								)
						}else if(text==2){
							return h('div','代付款')
						}else if(text==3){
							return h('div','超时')
						}else if(text==4){
							return h('div','确认收货')
						}
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
            console.log(params);
            let postData = this.$qs.stringify(params);
            console.log(postData)
            axios.post('/api/auction/orders/sys/init',postData)
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
			this.id=params.row.id
// 			let json={
// 				orderId:params.row.orderId
// 			};
// 			let postData = this.$qs.stringify(json);
// 			axios.post('/api/auction/orders/send',postData)
// 				.then( (response)=> {
// 				if(response.data.code==200){
// 					alert("发货成功");
// 					this.yhlbmkGetList(1, this.yhlbmkIsSearch);
// 				}else{
// 					alert("发货失败");
// 				}
// 				})
// 				.catch( (error)=> {
// 				console.log(error);
// 				});
				axios.post('/api/auction/logistics/sys/getLogisticsCompany')
					.then( (response)=> {
					if(response.data.code==200){
						var res = response.data;
						this.cityList = res.data;
						//this.yhlbmkGetList(1, this.yhlbmkIsSearch);
					}else{
						Util.error("接口获取失败"+response.data.msg);
					}
					})
					.catch( (error)=> {
					console.log(error);
				});
		},
		queryOrder(currentPage){
			if (this.yhlbmkIpVal) {
				let params= {
					pageNum: currentPage, // 当前页码
					pageSize: 10, // 每页条数
					orderId:this.yhlbmkIpVal
				};
				let postData = this.$qs.stringify(params);
				axios.post('/api/auction/orders/sys/findOrderByOrderId',postData)
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
				logisticsCompany:this.logisticsCompany,
				logisticsNo:this.logisticsNo,
				id:this.id
			};
			let postData = this.$qs.stringify(json);
			if(this.logisticsCompany=='' || this.logisticsNo==''){
				Util.error("请正确填写表单");
			}else{
				axios.post('/api/auction/orders/sys/send',postData)
					.then( (response)=> {
					if(response.data.code==200){
						Util.success("发货成功");
						this.logisticsCompany='';
						this.logisticsNo=""
						this.yhlbmkGetList(this.yhlbmktablePageData.pageNum, this.yhlbmkIsSearch);
						this.$nextTick(function() {
							this.$refs['pages'].currentPage = this.yhlbmktablePageData.pageNum;
						});
					}else{
						Util.error("发货失败"+response.data.msg);
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
		}
    }
};
</script>
