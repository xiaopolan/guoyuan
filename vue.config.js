// vue.config.js
var path = require('path');
var webpack = require('webpack');

// 获取开发模式
// var envMode = process.env.NODE_ENV;
// console.log(envMode);
// 执行的哪一条 npm scripts 命令
var npmScriptsName = process.env.npm_lifecycle_event;
// console.log(npmScriptsName);

// 设置端口号和接口地址
var configObj = require('./build/base.config'); // 引入项目配置文件
var portObj = configObj.port; // 端口号配置对象
var apiUrlObj = configObj.apiUrl; // 接口地址配置对象
// console.log(portObj);
// console.log(apiUrlObj);
var port = portObj[npmScriptsName]; // 端口号
var apiUrl = apiUrlObj[npmScriptsName]; // 接口地址
console.log("port"+port);
console.log("apiUrl"+apiUrl);
console.log("__dirname"+__dirname)
//吴剑
// var targeturl="http://192.168.10.50:8081"
// var targeturl="http://192.168.10.37:8080"
  //亢玉涵
	// var targeturl="http://192.168.10.49:8008"
	//生产
	var targeturl="http://auction.hz-huanshi.com"
  //支付通道
// var pay='http://www.xxsrchjc.com/Pay_Index.html'
//测试
// var targeturl="http://47.111.184.160:9092"
module.exports = {
	baseUrl: './',
    // 开发环境的配置
    devServer: {
		host:'0.0.0.0',
    	port: port, // 端口号
    	// open: true, //配置自动启动浏览器
    	// 配置跨域处理
    	proxy: {
    		'/api': {
    			target: targeturl, // 接口的真正域名及端口
    			secure: false, // 如果是https接口，需要配置这个参数为true
    			changeOrigin: true, // 如果接口跨域，需要进行这个参数配置为true
    			// 路径重写
    			pathRewrite: {
    				// '^/api': '/pro',  // 重写请求，比如我们源访问的包含/api，那么请求会将/api替换为/pro
    				'^/api': ''
    			}
    		},
// 			'/pay': {
// 				target: pay, // 接口的真正域名及端口
// 				secure: false, // 如果是https接口，需要配置这个参数为true
// 				changeOrigin: true, // 如果接口跨域，需要进行这个参数配置为true
// 				// 路径重写
// 				pathRewrite: {
// 					// '/api': '/yh/ihr/api',  // 重写请求，比如我们源访问的包含/api，那么请求会将/api替换为/yh/ihr/api
// 					'^/pay': ''
// 				}
// 			}
    	},
    },
    // webpack的配置
    configureWebpack: {
        // 设置模块如何被解析
        resolve: {
            // 创建 import 或 require 的别名，来确保模块引入变得更简单
            alias: {
                // 已经默认有'@'代表'src/'的配置了
                '#': path.resolve(__dirname, 'src/') // 组件中#代表src/
            }
        },
        // 配置插件
        plugins: [
            // jquery
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                jquery: "jquery",
                "window.jQuery": "jquery"
            })
        ],
        /*
            externals：这个配置选项提供了「从输出的 bundle 中排除依赖」的方法。
                防止将某些 import 的包(package)打包到 b undle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖。
                例如，从CDN引入echarts，而不是把它打包。
        */
        externals: {
            'vue': 'Vue',
            'vue-router': 'VueRouter',
            'jquery': 'jQuery',
            'iview': 'iview',
            'echarts': 'echarts'
        },
    }
}