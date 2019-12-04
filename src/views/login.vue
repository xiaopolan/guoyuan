<!-- 登录页 -->
<style scoped>
.loginBox {
    height: 100%;
    background: url(../assets/img/login_bg.png) no-repeat top #26adff;
    background-size: 100% auto;
    position: relative;
}
.login{
    position: absolute;
    width: 100%;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-55%);
}
.login_logo {
    text-align: center;
    margin-bottom: 40px;
}
.login_logo img {
    display: inline-block;
    width: 134px;
    margin-bottom: 10px;
}
.login_logo h2 {
    width: 100%;
    font-size: 30px;
    line-height: 1;
    font-weight: bold;
    text-align: center;
    color: #fff;
    text-shadow: 0px 5px 5px #000;
}
.login_cardBox{
    /* width: 1250px; */
    height: 350px;
    background: url(../assets/img/login_form_bg.png) no-repeat;
    background-size: 100% 100%;
    margin: 0 auto;
    padding-top: 47px;
}
.login_card{
    width: 355px;
    /* height: 275px; */
    height: 246px;
    margin: 0 auto;
    padding: 26px 22px 27px 22px;
    background: #fff;
    border-radius: 5px;
}
.login_card p{
    font-size: 26px;
    line-height: 1;
    color: #777777;
    text-align: center;
    margin-bottom: 20px;
}
.btn_login{
    padding: 6px 30px;
}
.login_b_r{
    float: right;
    margin-top: 2px;
}
.cb_zdlogin{
    color: #999999;
}
.sp_wjpwd{
    color: #F19149;
    cursor: pointer;
}
.errStr{
    position: absolute;
    top: 100%;
    left: 0;
    line-height: 1;
    padding-top: 6px;
    color: #ed3f14;
}

</style>
<template>
    <div class="loginBox">
        <!--  :style="{height: bodyHeight+'px'}" -->
        <div class="login">
            <!-- logo部分 -->
            <div class="login_logo">
                <img src="../assets/img/logoreg.png" alt>
                <h2>小牛趣拍</h2>
            </div>
            <!-- 表单部分 -->
            <div class="login_cardBox">
                <div class="login_card">
                    <p>登录账户</p>
                    <!-- Form 表单： model-表单数据对象，rules-表单验证规则 -->
                    <Form ref="form" :model="form" :rules="rule">
                        <!-- prop：对应表单域 model 里的字段 -->
                        <FormItem prop="user">
                            <!-- @on-enter：Input events，按下回车键时触发 -->
                            <Input
                                type="text"
                                v-model="form.user"
                                size="large"
                                icon="ios-person-outline"
                                placeholder="请输入用户名"
                                @on-enter="$refs.pwd.focus()"
                            >
                                
                            </Input>
                        </FormItem>
                        <FormItem prop="pwd">
                            <Input
                                ref="pwd"
                                type="password"
                                v-model="form.pwd"
                                size="large"
                                icon="ios-locked-outline"
                                placeholder="请输入密码"
                                @on-enter="login"
                            >
                            </Input>
                        </FormItem>
                        <FormItem>
                            <!-- loading：设置按钮为加载中状态  -->
                            <Button
                                class="btn_login"
                                type="primary"
                                @click="login"
                                size="large"
                                :loading="loading"
								long
                            >
                                <span v-if="!loading">登录</span>
                                <span v-else>登录中...</span>
                            </Button>
                            <!-- 登录的报错信息 -->
                            <div class="errStr">{{errstr}}</div>

                        </FormItem>
                    </Form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// 引入通用的库文件
import Util from "@/libs/util";
import Rule from "#/libs/rule";
import axios from 'axios'
export default {
    name: "login",
    components: {},
    data() {
        return {
            // 是否记住登录
            autoLogin: false,
            // 登录的报错信息
            errstr: "",
            // 登录的loading状态
            loading: false,
            // 表单数据对象
            form: {
                user: Util.user().account || "", // Util.user()：保存用户标记（本地存储）
                pwd: ""
            },
            // 表单验证规则
            rule: {
                user: Rule("请填写用户名"),
                pwd: Rule.pwd
            }
        };
    },
    created() {
        // this.bodyHeight = document.body.clientHeight; // 获取屏幕高度，更新loginBox的高度
    },
    // activated在keep-alive组件激活时调用，当页面存在缓存的时候执行该函数
    activated() {
        Util.clearUser(); // 清除本地存储中的信息
    },
    methods: {
        // 登录
        login() {
            this.errstr = "";
            var $this = this;
            // 表单验证
            Rule.form(this.$refs.form, form => {
                // 表单验证成功
                this.loading = true; // loading开始
                // 参数对象
                var params = {
                    account: $this.form.user, 
                    pwd: $this.form.pwd ,
										//permissionSign:0
                };
				let postData = this.$qs.stringify(params);
				axios.post('/api/auction/sysUser/sys/login',postData)
					.then( (response)=> {
					if(response.data.code==200){
						var res = response.data;
						$this.loading = false;
						sessionStorage.setItem('objStr', JSON.stringify(res.data))
						 $this.$router.push({
							name:'home-page',
							params:params,
						});
					}else{
						$this.loading = false;
						Util.error("登录失败，请重新登录");
					}
					})
					.catch( (error)=> {
					console.log(error);
					});
//                 console.log(params);
// 				sessionStorage.setItem('objStr', JSON.stringify(params))
//                //跳转到首页
//                 setTimeout(function(){
//                     $this.loading = false; // loading结束
//                     $this.$router.push({
// 						name:'home-page',
// 						params:params,
// 					});
//                 },2000);
            });
        },
    }
};
</script>
