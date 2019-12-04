<!-- 开发者日志 -->
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
            <!-- 开发者日志 -->
                <div class="itemBox yhlb_table">
                    <div class="remark_box">
                        <Row>
                            <Col span="4">
                                <h3>开发者日志</h3>
                            </Col>
							<Modal v-model="modal2">
								<p slot="header" style="color:#f60;text-align:center">
									<Icon type="information-circled"></Icon>
									<span>响应</span>
								</p>
								<div style="text-align:center;width: 100%;overflow: auto;">
								{{msg}}</div>
								<div slot="footer">
								</div>
							</Modal>
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
            msg: '',
            modal2: false,
            listobj: true,
            yhtjtableData: [], // 用户统计表格数据
            // 用户列表相关
            // 用户列表的选择器条件
            yhlbmkSlObj: {
                attr: 'all', // 属性筛选
                sort: '1' // 列表排序
            },
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
										title: '请求接口',
										key: 'url',
										align: 'center'
								},
								{
										title: '请求数据',
										key: 'data',
										align: 'center'
								},
                {
                    title: '路由',
                    key: 'fullPath',
                    align: 'center'
                },
                {
                    title: '传输方式',
                    key: 'method',
                    align: 'center'
                },
                {
                    title: '返回数据',
                    key: 'resdata',
                    align: 'center',
					render: (h, params) => {
						var str = params.row.resdata;
						return h('div', {
								style: {
									overflow: 'hidden',
									whiteSpace:'nowrap',
									textOverflow: 'ellipsis'
								},
								on: {
									click: () => {
										this.modal2=true
										this.msg=str
									}
								}
						},str);
					},
                },
                {
                    title: '响应状态',
                    key: 'status',
                    align: 'center'
                },
                {
                    title: '响应文本',
                    key: 'statusText',
                    align: 'center',
                },
                {
                    title: '时间',
                    key: 'updateTime',
                    align: 'center',
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
            // 新增用户的对话框表单
            yhlbmkAddObj: {
                phone: '', // 用户手机号
                pwd: '', // 用户密码
                nickName: '', // 用户昵称
                hotbirdNum: '' // 用户BinGo号
            }
        };
    },
    created() {
        // 获取用户列表数据
        this.yhlbmkGetList(1);
    },
    methods: {
        // 获取用户统计数据（调用接口的）---接口
        // 用户列表的页码改变
        yhlbmkPageChange(currentPage) {
            this.yhlbmkGetList(currentPage, this.yhlbmkIsSearch); // 获取用户列表数据
        },
        // 获取用户列表数据（调用接口的）---接口
        yhlbmkGetList(currentPage, isSearch) {
            // currentPage：当前页数   isLimitTime：是否限制时间段
            console.log('获取第' + currentPage + '页数据');

            // 参数对象
            var params = {
                pageNum: currentPage, // 当前页码
                pageSize: 20 // 每页条数
            };
            // let postData = this.$qs.stringify(params);
            axios
                .get('/api/auction/manageLog/sys/findPageList', { params })
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
        },
        // 用户列表的选择器发生变化
        yhlbmkSlChange(currentPage) {
            // console.log("选择器变化");
            // 获取用户列表数据
            this.yhlbmkGetList(currentPage, this.yhlbmkIsSearch);
        },
        searchepageChange(currentPage) {
            this.yhlbmkSearch(currentPage);
        },
    }
};
</script>
