<!-- 消费历史 -->
<style lang="less" scoped>
.itemBox_yhtsxx {
    .remark_box {
        h3 {
            display: inline-block;
        }
        p {
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
<style lang="less">
.itemBox_yhtsxx {
    .tablepage_box {
        .ivu-btn-warning {
            background: #ff5402;
            border-color: #ff5402;
        }
    }
}
.typeselect {
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
                    <Col span="3">
                        <h3>消费历史</h3>
                    </Col>
					<Col span="4" style="textAlign:center;">
							<div class="searchBox clearfix">
									<div style="marginBottom:3px;textAlign:center">
										<input
											v-model="yhlbmkIpVal"
											size="small"
											placeholder="请输入手机号码"
											class="serchinput"
										>
										</input>
									</div>
							</div>
					</Col>
					<Col span="4">
							<div style="marginBottom:10px;textAlign:left">
								<Date-picker :value="startVa" v-modal="startVa"  @on-change="handleChange1" type="datetime" placeholder="选择开始日期" style="float:left"></Date-picker>
							</div>
					</Col>
					<Col span="4">
							<div style="marginBottom:10px;textAlign:left">
								<Date-picker :value="endVa" v-modal="endVa"  @on-change="handleChange2" type="datetime" placeholder="选择结束日期" style="float:left"></Date-picker>
							</div>
					</Col>
					<Col span="2">
								<Button
										type="error"
										style="width:60px;marginLeft:20px;textAlign:center"
										size="small"
										@click="yhlbmkSearch(1)"
								>查询</Button>
						</Col>
                </Row>
            </div>
            <div class="tablepage_box">
                <!-- 导出按钮 -->
                <div class="exportBtnBox clearfix">
                </div>
                <!-- 用户投诉信息数据表格 -->
                <Table
                    ref="yhtsxxTable"
                    border
                    :columns="yhtsxxCols"
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
                		@on-change="yhtsxxPageChange"
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
    name: 'mingxi',
    data() {
        return {
            yhlbmkIpVal: '',
            listobj: true,
            startVa: '',
            endVa: '',
            userid: '',
            model1: '',
            auctionGradeId: '',
            // 用户投诉信息的选择器条件
            yhtsxxSlObj: [],
            // 用户投诉信息表格的标题行数据（列属性名称）
            yhtsxxCols: [
                {
                    title: '用户名称',
                    key: 'userName',
                    align: 'center'
                },
                {
                    title: '用户手机号',
                    key: 'phone',
                    align: 'center'
                },
                {
                    title: '交易类型',
                    key: 'type',
                    align: 'center',
                    render: (h, params) => {
                        let text = params.row.type;
                        if (text == 1) {
                            return h('div', '充值');
                        }
                        if (text == 2) {
                            return h('div', '消费');
                        }
                    }
                },
                {
                    title: '消费数额',
                    key: 'limitNo',
                    align: 'center'
                },
                {
                    title: '礼物名称',
                    key: 'giftName',
                    align: 'center'
                },
                {
                    title: '礼物个数',
                    key: 'giftNum',
                    align: 'center'
                },
				{
					title: '剩余牛票',
					key: 'surplus',
					align: 'center'
				},
                {
                    title: '消费时间',
                    key: 'createTime',
                    align: 'center',
                    render: (h, params) => {
                        return h(
                            'div',
                            new Date(params.row.createTime).Format('yyyy-MM-dd hh:mm:ss')
                        );
                    }
                }
            ],
            // 用户投诉信息表格分页数据
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
            }
        };
    },
    created() {},
    activated() {
        // 获取用户列表数据
        let json = this.$route.params.userId;
        let auctionGradeId = this.$route.params.auctionGradeId;
        if (json) {
            this.userid = json;
        }
        if (auctionGradeId) {
            this.auctionGradeId = auctionGradeId;
        }
        this.yhtsxxGetList(1);
    },
    methods: {
        yhtsxxPageChange(currentPage) {
            this.yhtsxxGetList(currentPage);
        },
        searchepageChange(currentPage) {
            this.yhlbmkSearch(currentPage);
        },
        yhtsxxGetList(currentPage) {
            // currentPage：当前页数
            console.log('获取第' + currentPage + '页数据');
            // 参数对象
            var params = {
                pageNum: currentPage, // 当前页码
                pageSize: 10 // 每页条数
            };
            console.log(params);
            let postData = this.$qs.stringify(params);
            axios
                .get('/api/auction/eqValueInfo/sys/getList', { params })
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
        handleChange1(daterange) {
            this.startVa = daterange;
        },
        handleChange2(daterange) {
            this.endVa = daterange;
        },
        // 点击用户列表的查询
        yhlbmkSearch(currentPage) {
            this.listobj = false;
            var time1 = '';
            var time2 = '';
            if (this.startVa) {
                let data = new Date(this.startVa);
                time1 = data.getTime();
            }
            if (this.endVa) {
                let data2 = new Date(this.endVa);
                time2 = data2.getTime();
            }
            if (this.yhlbmkIpVal || this.startVa || this.endVa) {
                let params = {
                    pageNum: currentPage, // 当前页码
                    pageSize: 10, // 每页条数
                    phone: this.yhlbmkIpVal,
                    startTime: time1,
                    endTime: time2
                };
                //let postData = this.$qs.stringify(params);
                axios
                    .get('/api/auction/eqValueInfo/sys/getListByExample', { params })
                    .then(response => {
                        var res = response.data;
                        if (res.code == 200) {
                            if (res.data == null) {
                                this.yhlbmktablePageData.list = [];
                            } else {
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
                this.yhtsxxGetList(1, this.yhlbmkIsSearch);
                //页码重置为1
                this.$nextTick(function() {
                    this.$refs['pages'].currentPage = 1;
                });
            }
        }
    }
};
</script>
