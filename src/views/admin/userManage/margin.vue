<!-- 保证金列表页 -->
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
</style>
<style lang="less">
.yhlb_table {
    .ivu-table-cell {
        padding-left: 10px;
        padding-right: 10px;
    }
}
</style>

<template>
    <div class="tabsBox_style">
            <!-- 用户统计 -->
                <div class="itemBox yhlb_table">
                    <div class="remark_box">
                        <Row>
                            <Col span="4">
                                <h3>保证金列表</h3>
                            </Col>
                            <Col span="10" style="textAlign:center;">
                                <div class="searchBox clearfix">
                                    <Input
                                        v-model="yhlbmkIpVal"
                                        size="small"
                                        placeholder="请输入电话号码"
                                        style="float:left;width: 200px"
                                    >
                                    </Input>
                                    <Button
                                        type="error"
                                        style="float:left;width:60px;marginLeft:20px;"
                                        size="small"
                                        @click="querybzj(1)"
                                    >查询</Button>
                                </div>
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
                        <div class="pageBox" :style="{marginTop: '25px',paddingBottom: '35px'}">
                            <!-- 分页 -->
                            <Page
                                :total="yhlbmktablePageData.total"
                                :page-size="yhlbmktablePageData.pageSize"
								ref="pages"
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
                    title: "保证金id",
                    key: "id",
                    width: 70,
                    align: "center"
                },
                {
                    title: "用户名称",
                    key: "userName",
                    align: "center"
                },
                {
                    title: "电话号码",
                    key: "phone",
                    align: "center"
                },
//                 {
//                     title: "竞拍档次名称",
//                     key: "auctionClassName",
//                     align: "center"
//                 },
                {
                    title: "保证金余额",
                    width: 150,
                    key: "amount",
                    align: "center"
                },
				{
					title: "操作",
					key: "action",
					width: 150,
					align: "center",
					render: (h, params) => {
						let user=params.row.userId
						let auctionGradeId=params.row.auctionGradeId
						return h("div", [
							h(
								"Button",
								{
									props: {
										type: "warning",
										shape:"circle",
										size: "small"
									},
									style: {
										// width: "70px",
										marginLeft: "10px"
									},
									on: {
										click: () => {
											let params={
												userId:user,
												auctionGradeId:auctionGradeId
											}
											this.$router.push({
												name:'admin-userManage-mingxi',
												params:params,
											});
										}
									}
								},
								"保证金存取明细"
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
            }
        };
    },
// 	watch: {
// 		'$route' (to, from) {
// 			this.$router.go(0);
// 		}
// 	},
    activated() {
        // 获取用户列表数据
		var json= this.$route.params.phone
		if(json){
			this.yhlbmkIpVal=json
			this.querybzj(1);
		}else{
			this.yhlbmkGetList(1, this.yhlbmkIsSearch);
		}
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
			this.$nextTick(function() {
				this.$refs['pages'].currentPage = currentPage;
			});
            // 参数对象
            var params = {
                pageNum: currentPage, // 当前页码
                pageSize: 10, // 每页条数
            };
            console.log(params);
            // 模拟请求接口返回的数据
            let postData = this.$qs.stringify(params);
            console.log(postData)
            axios.get('/api/auction/margin/sys/init',{params})
            	.then( (response)=> {
            	var res = response.data;
            	if(res.code==200){
            		if(res.data==null){
            			this.yhlbmktablePageData.list=[];
            		}else{
            			this.yhlbmktablePageData = res.data;
            		}
            	}else{
            		this.yhlbmktablePageData.list=[];
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
        // 点击用户列表的查询
        querybzj(currentPage) {
            if (this.yhlbmkIpVal) {
				let params= {
					pageNum: currentPage, // 当前页码
					pageSize: 10, // 每页条数
					phone:this.yhlbmkIpVal
				};
				axios.get('/api/auction/margin/sys/getMarginByUser',{params})
					.then( (response)=> {
					var res = response.data;
					if(res.code==200){
						if(res.data==null){
							this.yhlbmktablePageData.list=[];
						}else{
							this.yhlbmktablePageData = res.data;
						}
					}else{
						this.yhlbmktablePageData.list=[];
					}
					})
					.catch( (error)=> {
						console.log(error);
					});
            } else {
                this.yhlbmkGetList(1, this.yhlbmkIsSearch);
            }
        },
    }
};
</script>
