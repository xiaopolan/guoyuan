<style scoped="scoped">
.ivu-tabs {
    background: #fff;
    padding: 10px;
}
.fanli {
	width: 90%;
    text-align: center;
    margin-top: 10px;
}
.fanli span{
	width: 220px;
	display: inline-block;
    text-align: right;
}
.ivu-tabs-tabpane {
    min-height: 500px;
}
.fximg{
	width: 150px;
	height: 150px;
}
</style>

<template>
		<div class="tabsBox_style">
			<Tabs active-key="key1">
				<TabPane label="运营设置" key="key1">
					<div class="fanli"><span>二级返利比例</span><i-input v-model="setyy.scale" placeholder="请输入二级返利比例" style="width: 300px;margin-left: 10px;"></i-input></div>
					<div class="fanli"><span>每日返利时间</span><Date-picker :value="startValue" v-modal="startValue"  @on-change="handleChange"  type="datetime" placeholder="选择日期和时间" style="width: 300px;margin-left: 10px;"></Date-picker></div>
					<div class="fanli"><span>返利比例</span><i-input v-model="setyy.flscale" placeholder="请输入返利比例" style="width: 300px;margin-left: 10px;"></i-input></div>
					<div class="fanli"><span>积分交易上限百分比</span><i-input v-model="jflimit" placeholder="请输入积分交易上限百分比" style="width: 300px;margin-left: 10px;"></i-input></div>
					
					<div class="fanli"><i-button type="success" small @click="saveyy(1)">保存</i-button></div>
				</TabPane>
				<TabPane label="抢拍轮次时间设置" key="key2">
					<div class="fanli"><span>抢拍默认时长</span><i-input v-model="setlc.mrtime" placeholder="请输入抢拍默认时长" style="width: 300px;margin-left: 10px;margin-right: 10px;"></i-input>秒</div>
					<div class="fanli"><span>等待默认时长</span><i-input v-model="setlc.waittime" placeholder="请输入抢拍默认时长" style="width: 300px;margin-left: 10px;margin-right: 10px;"></i-input>秒</div>
					<div class="fanli"><span>计算默认时长</span><i-input v-model="setlc.computetime" placeholder="请输入抢拍默认时长" style="width: 300px;margin-left: 10px;margin-right: 10px;"></i-input>秒</div>
					<div class="fanli"><i-button type="success" small  @click="saveyy(2)">保存</i-button></div>
				</TabPane>
				<TabPane label="抢拍场次设置" key="key3">
					<div class="fanli"><span>抢拍默认时长</span><i-input v-model="setcc.ccmrtime" placeholder="请输入抢拍默认时长" style="width: 300px;margin-left: 10px;margin-right: 10px;"></i-input>秒</div>
					<div class="fanli"><span>抢拍默认人数</span><i-input v-model="setcc.ccmrvalue" placeholder="请输入抢拍默认人数" style="width: 300px;margin-left: 10px;margin-right: 10px;"></i-input>个</div>
					<div class="fanli"><i-button type="success" small  @click="saveyy(3)">保存</i-button></div>
				</TabPane>
				<TabPane label="任务积分奖励设置" key="key3" id="task">
					<!-- <div class="fanli"><span>关注微信公众号</span><i-input v-model="setjf.wxnumber" placeholder="请输入关注微信公众号" style="width: 300px;margin-left: 10px;margin-right: 10px;"></i-input>个</div>
					<div class="fanli"><span>分享给好友</span><i-input v-model="setjf.friendnumber" placeholder="请输入分享给好友" style="width: 300px;margin-left: 10px;margin-right: 10px;"></i-input>个</div>
					<div class="fanli"><span>加入QQ群</span><i-input v-model="setjf.qqnumber " placeholder="请输入加入QQ群" style="width: 300px;margin-left: 10px;margin-right: 10px;"></i-input>个</div>
					<div class="fanli"><span>加入微信群</span><i-input v-model="setjf.wxqnumber " placeholder="请输入加入微信群" style="width: 300px;margin-left: 10px;margin-right: 10px;"></i-input>个</div>
					<div class="fanli"><span>邀请注册</span><i-input v-model="setjf.invitenumber" placeholder="请输入邀请注册" style="width: 300px;margin-left: 10px;margin-right: 10px;"></i-input>个</div> -->
					<div v-for="(item,index) in dailyTask" :key="index" class="fanli">
						<span>{{item.cdItemDesc}}</span>
						<input ref="inputgroup" v-model="item.cdVal" :id="item.cdItem" :placeholder="'请输入'+item.cdItemDesc" class="ivu-input ivu-input-default" style="width: 300px;margin-left: 10px;margin-right: 10px;" />
					</div>
					<div class="fanli"><i-button type="success" small  @click="saveyy(4)">保存</i-button></div>
				</TabPane>
				<!-- <TabPane label="保证金额设置" key="key3">
					<div class="fanli"><span>普通场</span><i-input v-model="setje.ptfarm" placeholder="请输入保证金额" style="width: 300px;margin-left: 10px;margin-right: 10px;"></i-input>元</div>
					<div class="fanli"><span>高级场</span><i-input v-model="setje.gjfarm " placeholder="请输入保证金额" style="width: 300px;margin-left: 10px;margin-right: 10px;"></i-input>元</div>
					<div class="fanli"><span>专家场</span><i-input v-model="setje.zjfarm " placeholder="请输入保证金额" style="width: 300px;margin-left: 10px;margin-right: 10px;"></i-input>元</div>
					<div class="fanli"><span>大师场</span><i-input v-model="setje.dsfarm" placeholder="请输入保证金额" style="width: 300px;margin-left: 10px;margin-right: 10px;"></i-input>元</div>
					<div class="fanli"><i-button type="success" small  @click="saveyy(5)">保存</i-button></div>
				</TabPane> -->
				<TabPane label="积分价格设置" key="key4">
					<div class="fanli"><span>积分价格</span><i-input v-model="integral.price" placeholder="请输入积分单价" style="width: 300px;margin-left: 10px;margin-right: 10px;"></i-input>元</div>
					<div class="fanli"><i-button type="success" small  @click="special">保存</i-button></div>
				</TabPane>
				<TabPane label="付款时限设置" key="key4">
					<div class="fanli"><span>确认付款时限</span><i-input v-model="fkValue" placeholder="请输入确认付款时限" style="width: 300px;margin-left: 10px;margin-right: 10px;"></i-input>分</div>
					<div class="fanli"><span>确认收款时限</span><i-input v-model="skValue" placeholder="请输入确认收款时限" style="width: 300px;margin-left: 10px;margin-right: 10px;"></i-input>分</div>
					<div class="fanli"><i-button type="success" small  @click="saveyy(7)">保存</i-button></div>
				</TabPane>
				<TabPane label="品鉴设置" key="key4">
					<div class="fanli"><span>商品点赞数设置</span><i-input v-model="numzan" placeholder="请输入点赞数" style="width: 300px;margin-left: 10px;margin-right: 10px;"></i-input>个</div>
					<div class="fanli"><span>点赞奖励积分</span><i-input v-model="dianzan" placeholder="请输入换取积分数" style="width: 300px;margin-left: 10px;margin-right: 10px;"></i-input>分</div>
					<div class="fanli"><span>评论奖励积分</span><i-input v-model="pinglun" placeholder="请输入换取积分数" style="width: 300px;margin-left: 10px;margin-right: 10px;"></i-input>分</div>
					<div class="fanli"><span>打赏奖励积分</span><i-input v-model="gift" placeholder="请输入积分数" style="width: 300px;margin-left: 10px;margin-right: 10px;"></i-input>分</div>
					<div class="fanli"><span>点赞数阀值</span><i-input v-model="pinjian1" placeholder="请输入点赞数" style="width: 300px;margin-left: 10px;margin-right: 10px;"></i-input>个</div>
					<div class="fanli"><span>列表长度</span><i-input v-model="pjlength" placeholder="请输入长度" style="width: 300px;margin-left: 10px;margin-right: 10px;"></i-input>个</div>
					<div class="fanli"><span>成功上架竞拍获得积分</span><i-input v-model="pinjian2" placeholder="请输入积分数" style="width: 300px;margin-left: 10px;margin-right: 10px;"></i-input>分</div>
					<div class="fanli"><span>审核通过获得积分</span><i-input v-model="pinjian3" placeholder="请输入积分数" style="width: 300px;margin-left: 10px;margin-right: 10px;"></i-input>分</div>
					<div class="fanli"><span>点赞数达到阀值获得积分</span><i-input v-model="pinjian4" placeholder="请输入积分数" style="width: 300px;margin-left: 10px;margin-right: 10px;"></i-input>分</div>
					<div class="fanli"><i-button type="success" small  @click="saveyy(8)">保存</i-button></div>
				</TabPane>
				<TabPane label="系统设置" key="key4">
					<div class="fanli"><span>客服在线时间</span><i-input v-model="kftime" placeholder="请输入客服在线时间" style="width: 300px;margin-left: 10px;margin-right: 10px;"></i-input></div>
					<div class="fanli"><span>客服电话</span><i-input v-model="kfphone" placeholder="请输入客服电话" style="width: 300px;margin-left: 10px;margin-right: 10px;"></i-input></div>
					<div class="fanli"><i-button type="success" small  @click="saveyy(9)">保存</i-button></div>
				</TabPane>
				<TabPane label="订单超时时间" key="key4">
					<div class="fanli"><span>订单超时时间</span><i-input v-model="payOutTime" placeholder="请输入订单超时时间" style="width: 300px;margin-left: 10px;margin-right: 10px;"></i-input>分钟</div>
					<div class="fanli"><span>确认收货超时时间</span><i-input v-model="confirmOutTime" placeholder="请输入订单超时时间" style="width: 300px;margin-left: 10px;margin-right: 10px;"></i-input>分钟</div>
					<div class="fanli"><i-button type="success" small  @click="saveyy(10)">保存</i-button></div>
				</TabPane>
				<TabPane label="分账" key="key4">
					<div class="fanli"><span>用户获取比例</span><i-input v-model="scale" placeholder="请输入用户获取比例" style="width: 300px;margin-left: 10px;margin-right: 10px;"></i-input></div>
					<div class="fanli"><i-button type="success" small  @click="saveyy(11)">保存</i-button></div>
				</TabPane>
				<TabPane label="下载地址" key="key4">
					<div class="fanli"><span>安卓</span><i-input v-model="andurl" placeholder="请输入地址" style="width: 300px;margin-left: 10px;margin-right: 10px;"></i-input></div>
					<div class="fanli"><span>ios</span><i-input v-model="iosurl" placeholder="请输入地址" style="width: 300px;margin-left: 10px;margin-right: 10px;"></i-input></div>
					<div class="fanli"><i-button type="success" small  @click="saveyy(12)">保存</i-button></div>
				</TabPane>
				<TabPane label="h5配置" key="key4" id="h5list">
					<!-- <div class="fanli"><span>品鉴分享</span><i-input v-model="judge" placeholder="请输入地址" style="width: 300px;margin-left: 10px;margin-right: 10px;"></i-input></div>
					<div class="fanli"><span>市场统计</span><i-input v-model="market" placeholder="请输入地址" style="width: 300px;margin-left: 10px;margin-right: 10px;"></i-input></div>
					<div class="fanli"><span>会员权益</span><i-input v-model="vipdetail" placeholder="请输入地址" style="width: 300px;margin-left: 10px;margin-right: 10px;"></i-input></div> -->
					<div v-for="(item,index) in h5list" :key="index" class="fanli">
						<span>{{item.cdItemDesc}}</span>
						<input ref="h5inputgroup" v-model="item.cdVal" :id="item.cdItem" :placeholder="'请输入'+item.cdItemDesc" class="ivu-input ivu-input-default" style="width: 300px;margin-left: 10px;margin-right: 10px;" />
					</div>
					<div class="fanli"><i-button type="success" small  @click="saveyy(13)">保存</i-button></div>
				</TabPane>
				<TabPane label="分享图片" key="key4">
					<div class="fanli">
					<img class='fximg' :src="fximg" />
					</div>
					<div class="fanli"><input style="width:150px;" type="file"  @change="addupImg"  ref="inputer" accept="image/png,image/jpeg,image/gif,image/jpg"/></div>
					<div class="fanli"><i-button type="success" small  @click="fileParam">保存</i-button></div>
				</TabPane>
				<TabPane label="h5注册" key="key4">
					<div class="fanli"><span>注册地址</span><i-input v-model="registerpage" placeholder="请输入地址" style="width: 300px;margin-left: 10px;margin-right: 10px;"></i-input></div>
					<div class="fanli"><i-button type="success" small  @click="saveyy(14)">保存</i-button></div>
				</TabPane>
				<TabPane label="礼物" key="key4">
					<div class="fanli"><span>一元人民币对应牛票</span><i-input v-model="niupiao" placeholder="请输入价格" style="width: 300px;margin-left: 10px;margin-right: 10px;"></i-input>个</div>
					<div class="fanli"><span>用户每日打赏的额度</span><i-input v-model="everylimit" placeholder="请输入价格" style="width: 300px;margin-left: 10px;margin-right: 10px;"></i-input>个</div>
					<div class="fanli"><i-button type="success" small  @click="saveyy(15)">保存</i-button></div>
				</TabPane>
				<TabPane label="版本号" key="key4">
					<div class="fanli"><span>安卓版本号</span><i-input v-model="androidv" placeholder="请输入版本号" style="width: 300px;margin-left: 10px;margin-right: 10px;"></i-input></div>
					<div class="fanli"><span>ios版本号</span><i-input v-model="iosv" placeholder="请输入版本号" style="width: 300px;margin-left: 10px;margin-right: 10px;"></i-input></div>
					<div class="fanli"><i-button type="success" small  @click="saveyy(16)">保存</i-button></div>
				</TabPane>
				<!-- <TabPane label="日常任务" key="key4">
					<div class="fanli"><span>评论任务有效上限(次数)</span><i-input v-model="comment" placeholder="请输入次数" style="width: 300px;margin-left: 10px;margin-right: 10px;"></i-input></div>
					<div class="fanli"><span>每次评论任务奖励artc数量</span><i-input v-model="comment_artc" placeholder="请输入数量" style="width: 300px;margin-left: 10px;margin-right: 10px;"></i-input></div>
					<div class="fanli"><span>点赞任务有效上限(次数)</span><i-input v-model="dianZans" placeholder="请输入次数" style="width: 300px;margin-left: 10px;margin-right: 10px;"></i-input></div>
					<div class="fanli"><span>每次点赞任务奖励artc数量</span><i-input v-model="dianZan_artc" placeholder="请输入数量" style="width: 300px;margin-left: 10px;margin-right: 10px;"></i-input></div>
					<div class="fanli"><span>分享任务有效上限(次数)</span><i-input v-model="share" placeholder="请输入次数" style="width: 300px;margin-left: 10px;margin-right: 10px;"></i-input></div>
					<div class="fanli"><span>每次分享任务奖励artc数量</span><i-input v-model="share_artc" placeholder="请输入数量" style="width: 300px;margin-left: 10px;margin-right: 10px;"></i-input></div>
					<div v-for="(item,index) in dailyTask" :key="index" class="fanli">
						<span>{{item.cdItemDesc}}</span>
						<i-input v-model="item.cdVal" :placeholder="'请输入'+item.cdItemDesc" style="width: 300px;margin-left: 10px;margin-right: 10px;"></i-input>
					</div>
					<div class="fanli"><i-button type="success" small  @click="saveyy(17)">保存</i-button></div>
				</TabPane> -->
			</Tabs>
		</div>
</template>


<script>
import Util from '@/libs/util';
import axios from 'axios';
export default {
    name: 'yunyinSet',
    data() {
        return {
			jflimit:'',
			pjlength:'',
			everylimit:'',
			kftime:'',
			comment:'',
			comment_artc:'',
			dianZans:'',
			dianZan_artc:'',
			share:'',
			share_artc:'',
			
			pinjian1:'',
			pinjian2:'',
			pinjian3:'',
			pinjian4:'',
			
			androidv:"",
			iosv:'',
			niupiao:'',
			registerpage:'',
			fximg:'',
			files:'',
            judge: '',
            vipdetail: '',
            andurl: '',
            iosurl: '',
            scale: '',
            confirmOutTime: '',
            gift: '',
            startValue: '',
            payOutTime: '',
            kfphone: '',
            fkValue: null,
            skValue: null,
            numzan: '',
            dianzan: '',
            pinglun: '',
            setyy: {
                scale: '',
                fltime: '',
                flscale: '',
                jfprice: ''
            },
            setlc: {
                mrtime: '',
                waittime: '',
                computetime: ''
            },
            setcc: {
                ccmrtime: '',
                ccmrvalue: ''
            },
            setjf: {
                wxnumber: '',
                friendnumber: '',
                qqnumber: '',
                wxqnumber: '',
                invitenumber: ''
            },
//             setje: {
//                 ptfarm: '',
//                 gjfarm: '',
//                 zjfarm: '',
//                 dsfarm: ''
//             },
            integral: {
                price: ''
            },
			// dailyTask:[],//每日任务
			h5list:[]
        };
    },
    created() {
        // 获取用户列表数据
        this.showlist();
    },
    methods: {
        showlist() {
            // 				var params = {param:["setyy","setlc","setcc","setjf","setje"]};
            // 				console.log(params);
            // 				let postData = this.$qs.stringify(params);
            axios
                .post('/api/auction/operate/sys/init')
                .then(response => {
                    var res = response.data;
                    var list1 = res.data.setyy;
                    var list2 = res.data.setlc;
                    var list3 = res.data.setcc;
                    // var list4 = res.data.setjf;
                    // var list5 = res.data.setje;
                    var list6 = res.data.integral;
                    var list7 = res.data.artcTradeSheet;
                    var list8 = res.data.Judge;
                    var list9 = res.data.base_manage;
                    var list10 = res.data.order;
                    var list11 = res.data.payment;
                    var list12 = res.data.downUrl;
                    var list13 = res.data.h5;
					this.h5list = res.data.h5
					var list14 = res.data.logo;
					var list15 = res.data.invitation;
					var list16 = res.data.gift;
					var list17 = res.data.android;
					var list18 = res.data.ios;
					var list19 = res.data.getARTC;
					var list20 = res.data.artc_transaction
					// var list20 = res.data.dailyTask;
					this.dailyTask=res.data.task;
                    //运营
                    this.setyy.scale = list1[3].cdVal || '';
                    this.startValue =
                        new Date(parseInt(list1[1].cdVal)).Format('yyyy-MM-dd hh:mm:ss') || '';
                    this.setyy.jfprice = list1[2].cdVal || '';
                    this.setyy.flscale = list1[0].cdVal || '';
                    this.jflimit = list20[0].cdVal || '';
                    //轮次
                    this.setlc.mrtime = list2[1].cdVal || '';
                    this.setlc.waittime = list2[2].cdVal || '';
                    this.setlc.computetime = list2[0].cdVal || '';
                    //场次
                    this.setcc.ccmrtime = list3[0].cdVal || '';
                    this.setcc.ccmrvalue = list3[1].cdVal || '';
                    //积分
//                     this.setjf.wxnumber = list4[3].cdVal || '';
//                     this.setjf.friendnumber = list4[0].cdVal || '';
//                     this.setjf.qqnumber = list4[2].cdVal || '';
//                     this.setjf.wxqnumber = list4[4].cdVal || '';
//                     this.setjf.invitenumber = list4[1].cdVal || '';
                    //金额
//                     this.setje.ptfarm = list5[2].cdVal || '';
//                     this.setje.gjfarm = list5[1].cdVal || '';
//                     this.setje.zjfarm = list5[3].cdVal || '';
//                     this.setje.dsfarm = list5[0].cdVal || '';
                    //积分价格
                    this.integral.price = list6[0].cdVal || '';

                    //付款时间设置
                    this.fkValue = list7[0].cdVal / 60000 || '';
                    this.skValue = list7[1].cdVal / 60000 || '';
                    //点赞数设置
                    this.numzan = list8[2].cdVal || '';
                    this.dianzan = list8[1].cdVal || '';
                    this.pinglun = list8[0].cdVal || '';
                    this.gift = list8[3].cdVal || '';
                    this.pjlength = list8[4].cdVal || '';
                    //客服电话
                    this.kftime = list9[0].cdVal || '';
					this.kfphone = list9[1].cdVal || '';
                    //超时时间
                    this.payOutTime = list10[1].cdVal || '';
                    this.confirmOutTime = list10[0].cdVal || '';
                    //分账
                    this.scale = list11[1].cdVal || '';
                    //url
                    this.andurl = list12[0].cdVal || '';
                    this.iosurl = list12[1].cdVal || '';
                    //h5
                    this.judge = list13[0].cdVal || '';
					this.market = list13[1].cdVal || '';
                    this.vipdetail = list13[2].cdVal || '';
					//logo
					this.fximg = list14[0].cdVal || '';
					//注册
					this.registerpage = list15[0].cdVal || '';
					//牛票价格
					this.niupiao = list16[0].cdVal || '';
					this.everylimit=list16[1].cdVal || '';
					//版本
					this.androidv = list17[0].cdVal || '';
					this.iosv = list18[0].cdVal || '';
					//品鉴点赞积分
					this.pinjian1=list19[1].cdVal || '';
					this.pinjian2=list19[2].cdVal || '';
					this.pinjian3=list19[3].cdVal || '';
					this.pinjian4=list19[0].cdVal || '';
					//每日任务
// 					this.comment=list20[0].cdVal || '';
// 					this.comment_artc=list20[1].cdVal || '';
// 					this.dianZans=list20[2].cdVal || '';
// 					this.dianZan_artc=list20[3].cdVal || '';
// 					this.share=list20[4].cdVal || '';
// 					this.share_artc=list20[5].cdVal || '';
                })
                .catch(error => {
                    console.log(error);
                });
        },
        saveyy(flag) {
            switch (flag) {
                case 1:
                    var time = new Date(this.startValue);
                    var times = time.getTime();
                    var param = [
                        {
                            cdItem: 'flscale',
                            cdType: 'setyy',
                            cdVal: this.setyy.flscale
                        },
                        {
                            cdItem: 'fltime',
                            cdType: 'setyy',
                            cdVal: times
                        },
                        {
                            cdItem: 'jfprice',
                            cdType: 'setyy',
                            cdVal: this.setyy.jfprice
                        },
                        {
                            cdItem: 'scale',
                            cdType: 'setyy',
                            cdVal: this.setyy.scale
                        },
						{
						    cdItem: 'upper_limit',
						    cdType: 'artc_transaction',
						    cdVal: this.jflimit
						}
                    ];
                    break;
                case 2:
                    var param = [
                        {
                            cdItem: 'mrtime',
                            cdType: 'setlc',
                            cdVal: this.setlc.mrtime
                        },
                        {
                            cdItem: 'waittime',
                            cdType: 'setlc',
                            cdVal: this.setlc.waittime
                        },
                        {
                            cdItem: 'computetime',
                            cdType: 'setlc',
                            cdVal: this.setlc.computetime
                        }
                    ];
                    break;
                case 3:
                    var param = [
                        {
                            cdItem: 'ccmrtime',
                            cdType: 'setcc',
                            cdVal: this.setcc.ccmrtime
                        },
                        {
                            cdItem: 'ccmrvalue',
                            cdType: 'setcc',
                            cdVal: this.setcc.ccmrvalue
                        }
                    ];
                    break;
                case 4:
                    var param = [];
					var group = document.getElementById('task').getElementsByTagName('input');

					var valuegr=this.$refs.inputgroup
					for (let i = 0; i < group.length; i++) {
						param[i]={}
						param[i].cdItem=group[i].id;
						param[i].cdType='task';
						param[i].cdVal=valuegr[i].value;
					}
                    break;
//                 case 5:
//                     var param = [
//                         {
//                             cdItem: 'ptfarm',
//                             cdType: 'setje',
//                             cdVal: this.setje.ptfarm
//                         },
//                         {
//                             cdItem: 'gjfarm',
//                             cdType: 'setje',
//                             cdVal: this.setje.gjfarm
//                         },
//                         {
//                             cdItem: 'zjfarm',
//                             cdType: 'setje',
//                             cdVal: this.setje.zjfarm
//                         },
//                         {
//                             cdItem: 'dsfarm',
//                             cdType: 'setje',
//                             cdVal: this.setje.dsfarm
//                         }
//                     ];
//                     break;
//                 case 6:
//                     var param = [
//                         {
//                             cdItem: 'price',
//                             cdType: 'integral',
//                             cdVal: this.integral.price
//                         }
//                     ];
//                     break;
                case 7:
                    var param = [
                        {
                            cdItem: 'pay_timeout',
                            cdType: 'artcTradeSheet',
                            cdVal: this.fkValue * 60000
                        },
                        {
                            cdItem: 'confirm_timeout',
                            cdType: 'artcTradeSheet',
                            cdVal: this.skValue * 60000
                        }
                    ];
                    break;
                case 8:
                    var param = [
                        {
                            cdItem: 'dianzanNum',
                            cdType: 'Judge',
                            cdVal: this.numzan
                        },
                        {
                            cdItem: 'dianzanIntegral',
                            cdType: 'Judge',
                            cdVal: this.dianzan
                        },
                        {
                            cdItem: 'commentIntegral',
                            cdType: 'Judge',
                            cdVal: this.pinglun
                        },
                        {
                            cdItem: 'gift',
                            cdType: 'Judge',
                            cdVal: this.gift
                        },
						{
						    cdItem: 'listLeng',
						    cdType: 'Judge',
						    cdVal: this.pjlength
						},
						{
							cdItem: 'dianzan',
							cdType: 'getARTC',
							cdVal: this.pinjian4
						},
						{
							cdItem: 'dianzannum',
							cdType: 'getARTC',
							cdVal: this.pinjian1
						},
						{
							cdItem: 'push',
							cdType: 'getARTC',
							cdVal: this.pinjian2
						},
						{
							cdItem: 'verify',
							cdType: 'getARTC',
							cdVal: this.pinjian3
						}
                    ];
                    break;
                case 9:
                    var param = [
                        {
                            cdItem: 'server_online_time',
                            cdType: 'base_manage',
                            cdVal: this.kftime
                        },
						{
							cdItem: 'server_phone',
							cdType: 'base_manage',
							cdVal: this.kfphone
						}
                    ];
                    break;
                case 10:
                    var param = [
                        {
                            cdItem: 'payOutTime',
                            cdType: 'order',
                            cdVal: this.payOutTime
                        },
                        {
                            cdItem: 'confirmOutTime',
                            cdType: 'order',
                            cdVal: this.confirmOutTime
                        }
                    ];
                    break;
                case 11:
                    var param = [
                        {
                            cdItem: 'payOutTime',
                            cdType: 'payment',
                            cdVal: this.scale
                        }
                    ];
                    break;
                case 12:
                    var param = [
                        {
                            cdItem: 'android',
                            cdType: 'downUrl',
                            cdVal: this.andurl
                        },
                        {
                            cdItem: 'ios',
                            cdType: 'downUrl',
                            cdVal: this.iosurl
                        }
                    ];
                    break;
                case 13:
//                     var param = [
//                         {
//                             cdItem: 'judge',
//                             cdType: 'h5',
//                             cdVal: this.judge
//                         },
// 						{
// 							cdItem: 'mark_count',
// 							cdType: 'h5',
// 							cdVal: this.market
// 						},
//                         {
//                             cdItem: 'vipdetail',
//                             cdType: 'h5',
//                             cdVal: this.vipdetail
//                         }
//                     ];
					var param = [];
					var group = document.getElementById('h5list').getElementsByTagName('input');
					var valuegr=this.$refs.h5inputgroup
					for (let i = 0; i < group.length; i++) {
						param[i]={}
						param[i].cdItem=group[i].id;
						param[i].cdType='h5';
						param[i].cdVal=valuegr[i].value;
					}
                    break;
				case 14:
					var param = [
						{
							cdItem: 'url',
							cdType: 'invitation',
							cdVal: this.registerpage
						},
					];
					break;
				case 15:
					var param = [
						{
							cdItem: 'eqValue',
							cdType: 'gift',
							cdVal: this.niupiao
						},
						{
							cdItem: 'everyDayLimit',
							cdType: 'gift',
							cdVal: this.everylimit
						},
					];
					break;
				case 16:
					var param = [
						{
							cdItem: 'version',
							cdType: 'android',
							cdVal: this.androidv
						},
						{
							cdItem: 'version',
							cdType: 'ios',
							cdVal: this.iosv
						},
					];
					break;
				case 17:
					var param = [
						{
							cdItem: 'comment',
							cdType: 'dailyTask',
							cdVal: this.comment
						},
						{
							cdItem: 'comment_artc',
							cdType: 'dailyTask',
							cdVal: this.comment_artc
						},
						{
							cdItem: 'dianZan',
							cdType: 'dailyTask',
							cdVal: this.dianZans
						},
						{
							cdItem: 'dianZan_artc',
							cdType: 'dailyTask',
							cdVal: this.dianZan_artc
						},
						{
							cdItem: 'share',
							cdType: 'dailyTask',
							cdVal: this.share
						},
						{
							cdItem: 'share_artc',
							cdType: 'dailyTask',
							cdVal: this.share_artc
						},
					];
					break;
            }

//              				console.log(typeof(param));
             				var jsondata=JSON.stringify(param)
            //console.log(typeof(jsondata))
//             				 let postData = this.$qs.stringify(param);
            				// console.log(postData)
			let formData = new FormData();
			formData.append("param",jsondata)
			let config = {
				headers:{'Content-Type':'multipart/form-data'}
				};
            axios
                .post('/api/auction/type/sys/addOrUpdate', formData,config)
                .then(response => {
                    if (response.data.code == 200) {
                        Util.success('保存成功');
                    } else {
                        Util.error('保存失败');
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        handleChange1(daterange) {
            this.fkValue = daterange;
        },
        handleChange2(daterange) {
            this.skValue = daterange;
        },
        //返利时间
        handleChange(daterange) {
            this.startValue = daterange;
        },
		fileParam(){
			let formData = new FormData();
			formData.append('file', this.files[0]);
			let param = [
				{
					cdItem: 'url',
					cdType: 'logo',
				}];
				
			let jsondata=JSON.stringify(param)
			formData.append("param",jsondata)
			axios
				.post('/api/auction/type/sys/addOrUpdate',formData)
				.then(response => {
					console.log(response);
					if (response.data.code == 200) {
						Util.success('修改成功');
						this.showlist();
					} else {
						Util.error('修改失败');
					}
				})
				.catch(error => {
					console.log(error);
				});
		},
		addupImg(e){
			let inputDOM = e.target.files;
			// 通过DOM取文件数据
			this.files = inputDOM;
		},
		special(){
			let formData = new FormData();
			let param = [
				{
					cdItem: 'price',
					cdType: 'integral',
					cdVal: this.integral.price
				}];
			let jsondata=JSON.stringify(param)
			formData.append("param",jsondata)
			axios
				.post('/api/auction/type/sys/updateSpecial',formData)
				.then(response => {
					console.log(response);
					if (response.data.code == 200) {
						Util.success('修改成功');
						this.showlist();
					} else {
						Util.error('修改失败');
					}
				})
				.catch(error => {
					console.log(error);
				});
		}
    }
};
</script>

<style>
</style>
