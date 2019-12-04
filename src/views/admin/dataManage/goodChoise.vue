<!-- 商品选择 -->
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
.typeselect{
	width: 150px;
    height: 25px;
    border: 1px solid #dcdee2;
    border-radius: 4px;
    color: #515a6e;
}
.serchinput{
	width: 150px;
    height: 25px;
    border: 1px solid #dcdee2;
    border-radius: 4px;
    color: #515a6e;
		padding: 1px 7px;
}
</style>

<template>
    <div class="tabsBox_style">
            <!-- 商品选择 -->
                <div class="itemBox yhlb_table">
                    <div class="remark_box">
                        <Row>
                            <Col span="2">
                                <h3>商品选择</h3>
                            </Col>
                            <Col span="4" style="textAlign:center;">
                                <div class="searchBox clearfix">
																		<div style="marginBottom:10px;textAlign:center">
																			<div
																				style="display:inline-block;width:86px;textAlign:left"
																			>商品名称：</div>
																			<input
																					v-model="yhlbmkIpVal"
																					size="small"
																					placeholder="请输入商品名称"
																					class="serchinput"
																			>
																			</input>
																		</div>
                                </div>
                            </Col>
														<Col span="5" style="textAlign:center;">
																<div class="searchBox clearfix">
																	<div style="marginBottom:10px;textAlign:center">
																		<div
																			style="display:inline-block;width:86px;textAlign:left"
																		>商品类型：</div>
																		<select name="public-choice" v-model="model1" class="typeselect">                                        
																			<option :value="item.cdTypeDesc"  v-for="item in cityList" >{{item.cdTypeDesc}}</option>                                    
																		</select>
																	</div>
																</div>
														</Col>
														<Col span="4">
																<div style="marginBottom:10px;textAlign:left">
																	<div
																		style="display:inline-block;width:86px;textAlign:left"
																	>价格区间：</div>
																	<input
																			v-model="yhlbmkIpVal"
																			size="small"
																			placeholder="请输入商品名称"
																			class="serchinput"
																	>
																	</input>
																	<input
																			v-model="yhlbmkIpVal"
																			size="small"
																			placeholder="请输入商品名称"
																			class="serchinput"
																	>
																	</input>
																</div>
														</Col>
														<Col span="4">
																<div style="marginBottom:10px;textAlign:left">
																	<div
																		style="display:inline-block;width:86px;textAlign:left;float: left;"
																	>商品类型：</div>
																	<Date-picker type="date" placeholder="选择生成日期" style="float:left;width: 150px"></Date-picker>
																</div>
														</Col>
														<Col span="4">
																	<Button
																			type="error"
																			style="width:60px;marginLeft:20px;textAlign:center"
																			size="small"
																			@click="yhlbmkSearch"
																	>查询</Button>
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
    name: "userList",
    data() {
        return {
			cityList: [],//商品类型
            model1: '',
            // 用户列表相关
            // 用户列表的选择器条件
            yhlbmkIpVal: "", // 用户列表的搜索条件
            yhlbmkIsSearch: false, // 是否加入搜索词
            // 用户列表表格的标题行数据（列属性名称）
            yhlbmkCols: [
                {
                	title: "商品id",
                	key: "id",
                	width: 70,
                	align: "center"
                },
                {
                	title: "商品名称",
                	key: "productName",
                	align: "center"
                },
                {
                	title: "商品主图",
                	key: "pic",
                	align: "center"
                },
                {
                	title: "商品类型",
                	key: "productType",
                	align: "center"
                },
                {
                	title: "商品价格",
                	width: 70,
                	key: "productPrice",
                	align: "center"
                },
                {
                	title: "商品简介",
                	key: "introduction",
                	width: 90,
                	align: "center"
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
                productName: "", // 商品名称
                pic: {}, // 商品主图
                productType: "", // 商品类型
                productPrice: "" ,// 商品价格
								introduction:"",//商品简介
								id: "", // 商品id
            }
        };
    },
    created() {
        // 获取用户列表数据
        this.yhlbmkGetList(1, this.yhlbmkIsSearch);
    },
	mounted:function(){
		this.showtype();
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
                pageSize: 10 // 每页条数
            };
            if (isSearch) {
                // 加入搜索词
                params.searchId = this.yhlbmkIpVal;
            }
			let postData = this.$qs.stringify(params);
			console.log(postData)
			axios.post('/api/auction/product/sys/init',postData)
				.then( (response)=> {
				var res = response.data;
				this.yhlbmktablePageData=res.data;
				})
				.catch( (error)=> {
				console.log(error);
				});
				/* Util.post('/auction/product/init', params).then(function (res) {
					if (res && res.code == 0) {
						return res.data;
					} else {
						return res.msg;
					}
				}) */
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
				let params= {};
				params.productName=this.yhlbmkIpVal
				let postData = this.$qs.stringify(params);
				axios.post('/api/auction/product/sys/findProduct',postData)
					.then( (response)=> {
					var res = response.data;
					this.yhlbmktablePageData.list=res.data;
					})
					.catch( (error)=> {
						console.log(error);
					});
            } else {
                this.yhlbmkGetList(1, this.yhlbmkIsSearch);
            }
        },
		// 点击新增用户的对话框的ok
		yhlbmkOk() {
			if (this.yhlbmkAddObj.productName) {
				// 参数对象
// 				let params = {
// 					productName: this.yhlbmkAddObj.productName, 
// 					pic: this.$qs.stringify(this.yhlbmkAddObj.pic), 
// 					productType: this.model1 ,
// 					productPrice: this.yhlbmkAddObj.productPrice ,
// 					introduction: this.yhlbmkAddObj.introduction 
// 				};
// 				let postData = this.$qs.stringify(params);
				 let formData = new FormData();
				 formData.append("productName",this.yhlbmkAddObj.productName)
				 for (var i = 0; i < this.yhlbmkAddObj.pic.length; i++) {
					  formData.append('pic', this.yhlbmkAddObj.pic[i])
					}
				// formData.append("pic",this.yhlbmkAddObj.pic[0])
				 formData.append("productType",this.model1)
				 formData.append("productPrice",this.yhlbmkAddObj.productPrice)
				 formData.append("introduction",this.yhlbmkAddObj.introduction )
				 console.log(formData)
				let config = {
					headers:{'Content-Type':'multipart/form-data'}
				  };
			  const instance=axios.create({
			  withCredentials: true
			 }) 
				//console.log(postData)
				axios.post('/api/auction/product/sys/addProduct',formData,config)
					.then( (response)=> {
						console.log(response)
						if(response.data.code==200){
							alert("添加成功");
							this.yhlbmkGetList(1, this.yhlbmkIsSearch);
						}else{
							alert("添加失败"+response.data.msg);
						}
					})
					.catch( (error)=> {
						console.log(error);
					});
				this.yhlbmkLoading = false; // 关闭加载状态
				this.yhlbmkModal = false; // 关闭当前模态
				// 清除表单
				this.yhlbmkAddObj.productName = "";
				this.yhlbmkAddObj.pic = "";
				this.model1 = "";
				this.yhlbmkAddObj.productPrice = "";
				this.yhlbmkAddObj.introduction = "";

			} else {
				if (!this.yhlbmkAddObj.productName) {
					this.$Message.info("请填写商品名称");
				}else {
					this.$Message.info("请正确填写表单");
				}
				// 解决Modal表单验证中loading的bug
				setTimeout(() => {
					this.yhlbmkLoading = false;
					this.$nextTick(() => {
						this.yhlbmkLoading = true;
					});
				}, 10);
			}
		},
		//查询商品类型
		showtype(){
			let params={};
			params.cd_type="product_type";
			let postData = this.$qs.stringify(params);
			axios.post('/api/auction/type/sys/getTypeByParam',postData)
				.then( (response)=> {
				var res = response.data;
				this.cityList=res.data;
				})
				.catch( (error)=> {
					console.log(error);
				});
		},
    }
};
</script>
