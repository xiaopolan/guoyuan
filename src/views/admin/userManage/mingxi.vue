<!-- 保证金存取 -->
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
                    <Col span="13">
                        <h3>保证金存取明细</h3>
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
                        @click="yhtsxxExportData"
                    >
                        <Icon class="icon_export" type="ios-download-outline"></Icon>导出数据
                    </Button> -->
                </div>
                <!-- 用户投诉信息数据表格 -->
                <Table
                    ref="yhtsxxTable"
                    border
                    :columns="yhtsxxCols"
                    :data="yhtsxxtablePageData.list"
                ></Table>
                <div class="pageBox" :style="{marginTop: '25px',paddingBottom: '35px'}">
                    <!-- 分页 -->
                    <Page
                        :total="yhtsxxtablePageData.total"
                        :page-size="yhtsxxtablePageData.pageSize"
                        :current="yhtsxxtablePageData.currentPage"
                        show-elevator
                        @on-change="yhtsxxPageChange"
                    ></Page>
                    <span>共&nbsp;{{yhtsxxtablePageData.pages}}&nbsp;页</span>
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
    name: "mingxi",
    data() {
        return {
			userid:'',
			model1:'',
			auctionGradeId:'',
            // 用户投诉信息的选择器条件
            yhtsxxSlObj: [],
            // 用户投诉信息表格的标题行数据（列属性名称）
            yhtsxxCols: [
                {
                    title: "保证金id",
					key: "marginId",
                    align: "center"
                },
                {
                    title: "用户名称",
                    key: "userName",
                    align: "center"
                },
                {
                    title: "支付流水号",
                    key: "payNum",
                    align: "center"
                },
                {
                    title: "交易金额",
                    key: "limitno",
                    align: "center",
					
                },
				{
					title: "交易类型",
					key: "type",
					align: "center",
					render: (h,params)=> {
						let text = params.row.typeno
						if(text==0){
							return h('div','存款')
						}
						if(text==1){
							return h('div','取款')
						}
						if(text==2){
							return h('div','平台扣除')
						}
						if(text==3){
							return h('div','冻结')
						}
					}
				},
				{
					title: "交易时间",
					key: "payTime",
					align: "center",
					render: (h, params) => {
							return h(
									'div',
									new Date(params.row.payTime).Format('yyyy-MM-dd hh:mm:ss')
							); /*这里的this.row能够获取当前行的数据*/
					}
				},
            ],
            // 用户投诉信息表格分页数据
            yhtsxxtablePageData: {
                list: [], // 表格列表
                total: 0, // 总条数
                pages: 0, // 总页数
                pageSize: 0, // 每页条数
                currentPage: 0 // 当前页码
            },
        };
    },
	created(){
	},
	activated() {
		// 获取用户列表数据
		let json= this.$route.params.userId
		let auctionGradeId=this.$route.params.auctionGradeId
		if(json){
			this.userid=json
		}
		if(auctionGradeId){
			this.auctionGradeId=auctionGradeId
		}
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
                pageSize: 10, // 每页条数
                // contentSelect: this.yhtsxxSlObj.contentSelect // 内容筛选
				userId:this.userid
            };
            console.log(params);
			let postData = this.$qs.stringify(params);
			axios.post('/api/auction/marginInfo/sys/init',postData)
				.then( (response)=> {
				var res = response.data;
					if(res.code==200){
						if(res.data==null){
							this.yhtsxxtablePageData.list=[];
						}else{
							this.yhtsxxtablePageData = res.data;
						}
					}else{
						this.yhtsxxtablePageData.list=[];
					}
				})
				.catch( (error)=> {
				console.log(error);
				});
        },
    }
};
</script>
