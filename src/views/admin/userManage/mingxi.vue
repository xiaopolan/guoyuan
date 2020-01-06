<!-- 推广人订单 -->
<style lang="less" scoped>
	.itemBox_yhtsxx {
    .remark_box{
        h3{
            display: inline-block;
        }
        p{
            display: inline-block;
        }
        .yhtsxx_slbox {
            display: inline-block;
            span {
                margin-right: 8px;
            }
        }
    }
}
</style>
<style lang="less">
	.itemBox_yhtsxx {
    .tablepage_box{
        .ivu-btn-warning{
            background: #FF5402;
            border-color: #FF5402;
        }
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
		<div class="itemBox itemBox_yhtsxx">
			<div class="remark_box">
				<Row>
					<Col span="4">
					<h3>推广人订单</h3>
					</Col>
					<Col span="7">
					<div style="marginBottom:10px;textAlign:left;margin-left: 10px;">
						<Date-picker :value="searchValue" v-modal="searchValue" @on-change="handleChange4" type="datetime" placeholder="选择开始时间"
						 style="float:left;width: 200px"></Date-picker>
						<Date-picker :value="searchenValue" v-modal="searchenValue" @on-change="handleChange5" type="datetime"
						 placeholder="选择结束时间" style="width: 200px"></Date-picker>
					</div>
					</Col>
					<Col span="2">
					<Button type="error" style="width:60px;marginLeft:20px;textAlign:center" size="small" @click="searchgood(1)">查询</Button>
					</Col>
				</Row>
			</div>
			<div class="tablepage_box">
				<!-- 导出按钮 -->
				<div class="exportBtnBox clearfix">
					<Button class="exportBtn" type="primary" size="small" @click="exportData(1)">
						<Icon class="icon_export" type="ios-download-outline"></Icon>导出数据
					</Button>
				</div>
				<!-- 用户投诉信息数据表格 -->
				<Table ref="yhtsxxTable" border :columns="yhtsxxCols" :data="yhtsxxtablePageData.list"></Table>
				<!-- <div class="pageBox" :style="{marginTop: '25px',paddingBottom: '35px'}">
					<Page :total="yhtsxxtablePageData.total" :page-size="yhtsxxtablePageData.pageSize" :current="yhtsxxtablePageData.currentPage"
					 show-elevator @on-change="yhtsxxPageChange"></Page>
					<span>共&nbsp;{{yhtsxxtablePageData.pages}}&nbsp;页</span>
				</div> -->
			</div>
		</div>
	</div>
</template>
<script>
	// 引入通用的库文件
	import Util from "@/libs/util";
	import axios from 'axios'
	export default {
		name: "mingxi",
		data() {
			return {
				searchValue: '',
				searchenValue: '',
				userid: '',
				model1: '',
				auctionGradeId: '',
				// 用户投诉信息的选择器条件
				yhtsxxSlObj: [],
				// 用户投诉信息表格的标题行数据（列属性名称）
				yhtsxxCols: [{
						title: "订单编号",
						key: "orderId",
						align: "center"
					},
					{
						title: "推广人微信名",
						key: "nikeName",
						align: "center"
					},
					{
						title: "推广人手机号",
						key: "promotersMobile",
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
						key: "currencyNumber",
						align: "center"
					}
				],
				// 用户投诉信息表格分页数据
				yhtsxxtablePageData: {
					list: [], // 表格列表
					total: 0, // 总条数
					pages: 0, // 总页数
					pageSize: 0, // 每页条数
					currentPage: 0 // 当前页码
				},
				json: ''
			};
		},
		activated() {
			// 获取用户列表数据
			this.json = this.$route.params.id
			this.yhtsxxGetList(1);

		},
		methods: {
			yhtsxxPageChange(currentPage) {
				this.yhtsxxGetList(currentPage);
			},
			yhtsxxGetList(currentPage) {
				// currentPage：当前页数
				console.log("获取第" + currentPage + "页数据");
				// 参数对象
				var params = {
					pageNum: currentPage, // 当前页码
					pageSize: 50, // 每页条数
					userId: this.json
				};
				// console.log(params);
				// let postData = this.$qs.stringify(params);
				axios.get('/api/manage/tLevel/getOrderInfoByPromoters', {
						params
					})
					.then((response) => {
						var res = response.data;
						if (res.code == 200) {
							if (res.data == null) {
								this.yhtsxxtablePageData.list = [];
							} else {
								this.yhtsxxtablePageData.list = res.data;
							}
						} else {
							this.yhtsxxtablePageData.list = [];
						}
					})
					.catch((error) => {
						console.log(error);
					});
			},
			searchgood(currentPage) {
				var params = {
					pageNum: currentPage, // 当前页码
					pageSize: 10, // 每页条数
					userId: this.json,
					startSettlingTime: this.searchValue,
					endSettlingTime: this.searchenValue
				};
				// console.log(params);
				// let postData = this.$qs.stringify(params);
				axios.get('/api/manage/tLevel/getOrderInfoByPromoters', {
						params
					})
					.then((response) => {
						var res = response.data;
						if (res.code == 200) {
							if (res.data == null) {
								this.yhtsxxtablePageData.list = [];
							} else {
								this.yhtsxxtablePageData.list = res.data;
							}
						} else {
							this.yhtsxxtablePageData.list = [];
						}
					})
					.catch((error) => {
						console.log(error);
					});
			},
			handleChange4(daterange) {
				this.searchValue = daterange;
			},
			handleChange5(daterange) {
				this.searchenValue = daterange;
			},
			//导出表格
			exportData(type) {
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
	}
</script>
