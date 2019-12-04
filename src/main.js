import Vue from 'vue';
import VueRouter from 'vue-router';

// 获取环境变量和模式
// var env = process.env.NODE_ENV;
// console.log(env);

// 引入清除样式
import '#/assets/css/reset.less';
// 引入iview组件库对应的css
// import 'iview/dist/styles/iview.css';
// 引入公共样式
import '#/assets/css/common.less';
import 'swiper/dist/css/swiper.css';
import "#/assets/css/barrager.css"
// 引入根组件
import App from './App.vue';

// 引入通用的库文件
import Util from '#/libs/util';
// 引入路由信息数组
import Routers from './router';
// 引入iview组件库
import iView from 'iview';
// 引入echarts
import echarts from 'echarts';
// 引入jquery
import "jquery";
// import {nodetext} from '/src/nodetxt.js'
import QS from 'querystring';
import axios from 'axios'
Vue.prototype.$qs = QS;
Vue.prototype.$echarts = echarts; // 为vue的原型添加echarts
Vue.use(VueRouter);
Vue.use(iView);

// 路由配置
const RouterConfig = {
   // mode: 'history',
    routes: Routers
}; // 初始路由配置
var datas={}
axios.interceptors.request.use((request) => {
	datas.data=JSON.stringify(request.data) || JSON.stringify(request.params) || '';
	datas.url=request.url ||'';
	datas.method=request.method ||'';
	return request;
}, function (error) {
  // Do something with request error

  return Promise.reject(error);
});
//发送日志
function getinfo(params){
		let postData =JSON.stringify(params)
		 $.ajax({
        type:"POST",
        url:"/api/auction/manageLog/sys/add",
        data: postData,//必要
        dataType:"json",
        contentType:"application/json",
        success:function(data){
        }
    });
		
};
//防止运营商劫持
clearAdv();
function clearAdv() {
        var head = document.getElementsByTagName('head')[0];
        var children = head.childNodes;
        var res;
        var source = 'trust'; //信任资源
        for (var i in children) {
            if (children.hasOwnProperty(i)) {
                tagName = children[i].tagName;
                if (tagName && tagName == 'SCRIPT') {
                    res = children[i].dataset['res'];
                    if (res != source) {
                        head.removeChild(children[i]);
                    }
                }
            }
        }
        var body = document.getElementsByTagName('body')[0];
        if (body) {
            children = body.childNodes;
            for (var k in children) {
                if (children.hasOwnProperty(k)) {
                    var tagName = children[k].tagName;
                    if (tagName) {
                        res = children[k].dataset['res'];
                        if (res != source) {
                            body.removeChild(children[k]);
                        }
                    }
                }
            }
        }
    }

axios.interceptors.response.use((response) => {
	datas.resdata=JSON.stringify(response.data) ||'';
	datas.status=response.status ||'';
	datas.statusText=response.statusText ||'';
	datas.fullPath=router.match(location).hash
	if(datas.fullPath.indexOf("guide") != -1 || datas.fullPath.indexOf("register") != -1 || datas.fullPath.indexOf("vipdetail") != -1 || datas.fullPath.indexOf("result") != -1 || datas.fullPath.indexOf("download") != -1 || datas.fullPath.indexOf("judge") != -1 || datas.fullPath.indexOf("download") != -1 || datas.fullPath.indexOf("market") != -1 || datas.fullPath.indexOf("agreement") != -1 ){
		getinfo(datas)
	}
	return response
}, function (error) {
  return Promise.reject(error);
});

const router = new VueRouter(RouterConfig); // 新建路由对象
Util.router(router); // Util.router()：获取或者设置全局路由
// // router.beforeEach：注册一个全局前置守卫。作用是 路由跳转前验证，比如登录验证
router.beforeEach((to, from, next) => {
    // 控制进度条回到顶部
    document.documentElement.scrollTop ? document.documentElement.scrollTop = 0 : document.body.scrollTop = 0;
		if(sessionStorage.getItem('objStr')){
			var objsession=JSON.parse(sessionStorage.getItem('objStr'))
		}else{
			var objsession={
					permissionSign:2
				}
		}
		// getinfo(datas);
		//若没有登录信息 则返回登录页面
		if(to.fullPath.indexOf("guide") != -1 || to.fullPath.indexOf("register") != -1 || to.fullPath.indexOf("vipdetail") != -1 || to.fullPath.indexOf("result") != -1 || to.fullPath.indexOf("download") != -1 || to.fullPath.indexOf("judge") != -1 || to.fullPath.indexOf("download") != -1 || to.fullPath.indexOf("market") != -1 || to.fullPath.indexOf("agreement") != -1 ){
			next();
		}else{
			if(objsession.permissionSign != 0 && objsession.permissionSign != 1){
				if(to.path === '/login'){
					next()
				}else{
					next({path: '/login'})
				}
			}
		}
		if(to.meta.title){
			document.title=to.meta.title
		}
    next();
// 	// to：即将要进入的目标 路由对象，from：当前导航正要离开的路由 
// 	if (to.path != '/login' && !to.meta.noCheckLogin && (!Util.cookie('token') || (from.path != '/login' && !Util.user().actor))) {
// 		/*
// 			同时满足条件1、2、3，才会跳转到登录页 
// 				1、目标路由对象的路径不是登录
// 				2、目标路由对象的路由元的noCheckLogin为false
// 				3、没有登录的cookie  或者  当前路由对象的路径不是登录并且没有登录标记
// 		*/
// 		// 执行跳转到登录的方法
// 		Util.goLogin('0x2', to); // 0x2为N的编码
// 	} else if (to.matched.length === 0) {
// 		// to.matched：目标路由对象的的路由及子路由
// 		// 目标路由对象的的路由及子路由为空，页面不存在
// 		Util.warning('页面不存在，已重定向到首页！');
// 		next('/'); // 跳转到首页
// 	} else {
// 		iView.LoadingBar.start(); // 进度条开始
// 		next(); // 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed (确认的)。即跳转到目标导航
// 	}
});
// // router.afterEach：全局后置钩子。
// router.afterEach(() => {
// 	iView.LoadingBar.finish(); // 结束进度条
// 	window.scrollTo(0, 0); // 滚动条滑到顶部
// });

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')