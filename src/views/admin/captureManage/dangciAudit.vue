<!-- 竞拍档次 -->
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
            <!-- 竞拍档次 -->
                <div class="itemBox yhlb_table">
                    <div class="remark_box">
                        <Row>
                            <Col span="23" style="textAlign:right;">
                                <Modal
                                	v-model="yhlbmkModal"
                                	title="修改档次"
                                	:loading="yhlbmkLoading"
                                	@on-ok="yhlbmkOk"
                                	@on-cancel="yhlbmkCancel"
                                >
                                	<div style="marginBottom:10px;textAlign:center">
                                		<div style="display:inline-block;width:100px;textAlign:left">
                                			竞拍档次名称：
                                		</div>
                                		<Input
                                			v-model="yhlbmkAddObj.gradeName"
                                			placeholder="请输入竞拍档次名称"
                                			style="width:150px"
                                		></Input>
                                	</div>
									<div style="marginBottom:10px;textAlign:center">
										<div style="display:inline-block;width:100px;textAlign:left">
											简介：
										</div>
										<Input
											v-model="yhlbmkAddObj.introduction"
											placeholder="请输入竞拍档次简介"
											style="width:150px"
										></Input>
									</div>
									<div style="marginBottom:10px;textAlign:center">
										<div
											style="display:inline-block;width:100px;textAlign:left"
										>
											<span style="color:red;"></span>图片：
										</div>
										<input style="width:150px;" type="file"  @change="addupImg1" ref="inputer" accept="image/png,image/jpeg,image/gif,image/jpg"/>
									</div>
                                </Modal>
								<Modal v-model="imageModal" title="图片查看" class="mymodal">
									<Carousel v-if="imageModal">
										<Carousel-Item v-for="(item,index) in imagelist" :key="index">
											<div style="margin: 0 auto;text-align: center;display: flex;align-items: center;width: 488px;height: 300px;justify-content: center;">
											<img :src="item" style="max-height:240px;max-width:440px;" alt=""/>
											</div>
										</Carousel-Item>
									</Carousel>
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
                        <div class="pageBox" :style="{marginTop: '25px',paddingBottom: '35px'}">
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
    name: "dangciAudit",
    data() {
        return {
			imagelist: [], //图片集合image
			imageModal: false,
            yhlbmkIpVal: "", // 用户列表的搜索条件
            yhlbmkIsSearch: false, // 是否加入搜索词
            // 用户列表表格的标题行数据（列属性名称）
            yhlbmkCols: [
                {
                	title: "竞拍档次id",
                	key: "id",
                	align: "center"
                },
                {
                	title: "竞拍档次名称",
                	key: "gradeName",
                	align: "center"
                },
                {
                	title: "竞拍档次简介",
                	key: "introduction",
                	align: "center"
                },
				{
						title: '图片',
						key: 'pic',
						//width: 150,
						align: 'center',
						render: (h, params) => {
								var str = params.row.gradeLogo;
								if (str) {
										return h('img', {
												attrs: {
														src: str
												},
												style: {
														width: '50px',
														height: '50px',
														margin: '10px 0'
												},
												on: {
														click: () => {
																this.showimage(str);
														}
												}
										});
								} else {
										return h('div', {}, '暂无图片');
								}
						}
				},
				{
					title: "操作",
					key: "action",
					width: 150,
					align: "center",
					render: (h, params) => {
						return h("div", [
							h(
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
									on: {
										click: () => {
											this.updateDc(
												params.row
											);
										}
									}
								},
								"修改"
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
                auctionGradeName: "", // 用户手机号
                introduction: "", // 用户密码
            }
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
            // 模拟请求接口返回的数据
			let postData = this.$qs.stringify(params);
			console.log(postData)
			axios.post('/api/auction/auctionGrade/sys/init',postData)
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
        yhlbmkSearch() {
            if (this.yhlbmkIpVal) {
                this.yhlbmkIsSearch = true; // 加入搜索词
                this.yhlbmkGetList(1, this.yhlbmkIsSearch); // 获取用户列表数据
            } else {
                Util.error("请输入BinGo号");
            }
        },
		//修改档次
		updateDc(params){
			this.yhlbmkModal=true;
			this.yhlbmkAddObj.gradeName=params.gradeName;
			this.yhlbmkAddObj.introduction=params.introduction;
			//this.yhlbmkAddObj.amount=params.amount;
			this.yhlbmkAddObj.id=params.id;
		},
		// 点击新增用户的对话框的ok
		yhlbmkOk() {
			if (this.yhlbmkAddObj.gradeName) {
// 				let params = {
// 					id:this.yhlbmkAddObj.id,
// 					auctionGradeName: this.yhlbmkAddObj.auctionGradeName,
// 					introduction: this.yhlbmkAddObj.introduction, 
// 				};
// 				let postData = this.$qs.stringify(params);
				
				let formData = new FormData();
							
				formData.append("id",this.yhlbmkAddObj.id)
				formData.append("gradeName",this.yhlbmkAddObj.gradeName)
				formData.append("introduction",this.yhlbmkAddObj.introduction)
				if (typeof this.yhlbmkAddObj.pic == 'object') {
					for (var i = 0; i < this.yhlbmkAddObj.pic.length; i++) {
							formData.append('gradeLogo', this.yhlbmkAddObj.pic[i]);
					}
				}
				let config = {
						headers: { 'Content-Type': 'multipart/form-data' }
				};
				const instance = axios.create({
						withCredentials: true
				});
				
				axios.post('/api/auction/auctionGrade/sys/updateAuctionGrade',formData,config)
					.then( (response)=> {
						console.log(response)
						if(response.data.code==200){
							Util.success("修改成功");
							this.yhlbmkGetList(this.yhlbmktablePageData.pageNum, this.yhlbmkIsSearch);
						}else{
							Util.error("修改失败"+response.data.msg);
						}
					})
					.catch( (error)=> {
						console.log(error);
					});
			} else {
				// 解决Modal表单验证中loading的bug
				Util.warning('输入正确的表单')
			}
			this.yhlbmkModal=false;
			setTimeout(() => {
				this.yhlbmkLoading = false;
				this.$nextTick(() => {
					this.yhlbmkLoading = true;
				});
			}, 10);
		},
		// 点击新增用户的对话框的取消
		yhlbmkCancel() {
			console.log("点击取消");
			// 清除表单
		},
		addupImg1(e){
			//let inputDOM = this.$refs.inputer;
			let inputDOM = e.target.files;
			// 通过DOM取文件数据
			this.yhlbmkAddObj.pic = inputDOM;
		},
		//图片查看
		showimage(imagearr) {
			this.imagelist=[];
			this.imageModal = true;
			this.imagelist.push(imagearr);
		},
    }
};
</script>
