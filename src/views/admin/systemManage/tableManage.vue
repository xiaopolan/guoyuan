<!-- 统计数据 -->
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
            <!-- 统计数据 -->
                <div class="itemBox yhlb_table">
                    <div class="remark_box">
                        <Row>
                            <Col span="4">
                                <h3>统计数据</h3>
                            </Col>
                            <Col span="18" style="textAlign:center;">
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
            listobj: true,
            // 用户列表的选择器条件
            yhlbmkIpVal: '', // 用户列表的搜索条件
            yhlbmkIsSearch: false, // 是否加入搜索词
            // 用户列表表格的标题行数据（列属性名称）
            yhlbmkCols: [
				{
					title: '更新时间',
					//width: 180,
					key: 'updateTime',
					align: 'center',
					render: (h, params) => {
						return h(
							'div',
							new Date(params.row.updateTime).Format('yyyy-MM-dd hh:mm:ss')
						); /*这里的this.row能够获取当前行的数据*/
					}
				},
                {
                    title: '打赏产生金额（入金）',
                    key: 'rewardMoney',
                    //width: 280,
                    align: 'center'
                },
                {
                    title: '免费ARTC',
                    key: 'freeArtc',
                    //width: 150,
                    align: 'center'
                },
                {
                    title: '产生ARTC',
                    //width: 180,
                    key: 'produceArtc',
                    align: 'center'
                },
				{
					title: '寄售数量',
					//width: 180,
					key: 'sellArtc',
					align: 'center'
				},
				{
					title: '剩余ARTC数量',
					//width: 180,
					key: 'lastArtc',
					align: 'center'
				},
				{
					title: 'ARTC单价',
					//width: 180,
					key: 'artcPrice',
					align: 'center'
				},
				{
					title: '回购数量',
					//width: 180,
					key: 'returnArtc',
					align: 'center'
				},
				{
					title: '回购金额',
					//width: 180,
					key: 'returnMoney',
					align: 'center'
				},
				{
					title: '剩余资金',
					//width: 180,
					key: 'lastMoney',
					align: 'center'
				},
				
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
            axios
                .get('/api/auction/countData/sys/countDataPage', {params})
                .then(response => {
                    var res = response.data;
                    // this.yhlbmktablePageData = res.data;
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
                    userName: this.yhlbmkIpVal,
                    pageNum: currentPage1, // 当前页码
                    pageSize: 10 // 每页条数
                };
                let postData = this.$qs.stringify(params);
                axios
                    .post('/api/auction/groupManage/sys/findGroupByUserName', postData)
                    .then(response => {
                        var res = response.data;
                        if (res.code == 200) {
                            if (res.data == null) {
                                this.yhlbmktablePageData.list = [];
                            } else {
                                //分页切换
                                this.yhlbmktablePageData = res.data;
                                this.yhlbmktablePageData.total1 = res.data.total;
                                this.yhlbmktablePageData.pages1 = res.data.pages;
                                this.yhlbmktablePageData.pageSize1 = res.data.pageSize;
                            }
                        } else {
                            this.yhlbmktablePageData.list = [];
                        }
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
    }
};
</script>
