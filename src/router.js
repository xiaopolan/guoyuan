// 导入封装的库
import util from '#/libs/util';
var $Util = util;

// 全部导航（特殊登录）
const modules = {
    admin: {
		systemManage: {
			title: '主页',
			icon: 'left_nav5.png',
			list: {
				mainManage: {
					title: '统计图'
				},
				tableManage: {
					title: '统计表'
				},
				developer: {
					title: '开发者日志'
				},
			}
		},
        operationManage: {
            title: '运营管理',
            icon: 'left_nav1.png',
            list: {
				yunyinSet:{
					title:"运营设置"
				},
				yinxiaoSet:{
					title:"营销设置"
				},
				imgSet:{
					title:"图片设置"
				},
				messageSet:{
					title:"消息推送"
				},
				vipSet:{
					title:"会员权益"
				},
				giftSet:{
					title:"礼物列表"
				},
				jfscale:{
					title:"积分返利"
				},
				task:{
					title:"任务列表"
				},
				assist:{
					title:"帮助内容"
				},
            }
        },
        userManage: {
            title: '用户管理',
            icon: 'left_nav2.png',
            list: {
                userList: {
                    title: '用户信息管理'
                },
                margin: {
                    title: '保证金管理'
                },
                yueManage: {
                    title: '余额管理'
                },
                jifenManage: {
                    title: '积分管理'
                },
				mingxi:{
					title:'保证金明细'
				},
				xiaofei:{
					title:'消费记录'
				},
				admin:{
					title:'管理员帐号'
				},
				statements:{
					title:'流水明细'
				}
            }
        },
        captureManage: {
            title: '竞拍管理',
            icon: 'left_nav3.png',
            list: {
                dangciAudit: {
                    title: '竞拍档次管理'
                },
                changciAudit: {
                    title: '竞拍场次管理'
                },
                zidongAudit:{
                    title: '自动场规则管理'
                },
				robot:{
				    title: '机器人管理'
				}
            }
        },
        dataManage: {
            title: '商品管理',
            icon: 'left_nav4.png',
            list: {
                dataOverview: {
                    title: '商品管理'
                },
				verifyGoods: {
					title: '商品审核'
				},
				classifyManage:{
					title:'分类管理'
				},
                userData: {
                    title: '订单管理'
                },
				goodChoise:{
					title:'选择商品'
				}
            }
        },
		tranManage: {
		    title: '交易管理',
		    icon: 'left_nav4.png',
		    list: {
				tranData: {
					title: '交易单管理'
				},
				demand: {
					title: '交易需求管理'
				},
		    }
		}
    }
};

// 部分导航（普通登录）
const admintor = {
    admin: {
        captureManage: {
        	title: '竞拍管理',
        	icon: 'left_nav3.png',
        	list: {
        		dangciAudit: {
        			title: '竞拍档次管理'
        		},
        		changciAudit: {
        			title: '竞拍场次管理'
        		},
        		zidongAudit:{
        			title: '自动场规则管理'
        		}
        	}
        },
        dataManage: {
        	title: '商品管理',
        	icon: 'left_nav4.png',
        	list: {
        		dataOverview: {
        			title: '商品管理'
        		},
        		verifyGoods: {
        			title: '商品审核'
        		},
        		classifyManage:{
        			title:'分类管理'
        		},
        		userData: {
        			title: '订单管理'
        		},
        		tranData: {
        			title: '交易单管理'
        		},
        		demand: {
        			title: '交易需求管理'
        		},
        		goodChoise:{
        			title:'选择商品'
        		}
        	}
        }
    }
};

// 首页
const homePage = {
    path: '/index',
    name: 'home-page',
    meta: {
        title: '首页'
    }
}

// 获取菜单导航
function getMenus(actor,proid) {
    //var loginInfo = util.storage('loginInfo'); // 获取登录状态
	var loginInfo={};
	loginInfo.info=proid
    if (loginInfo) {
        if (loginInfo['info'] == 0) {
            // 特殊登录
            return modules[actor];
        } else {
            // 普通登录
            return admintor[actor];
        }
    } else {
        // 特殊登录
        return admintor[actor];
    }
    // return modules[actor]和return admintor[actor]都是返回admin对象
}

// 获取当前页面的路径（面包屑）
function getPages(actor) {
    var m = modules[actor];
    if (m) {
        return [{
            path: '/index',
            name: actor,
            component: (res) => require(['./views/index.vue'], res),
            // 子路由
            children: Modules(m, actor)
        }]
    } else {
        return null
    }
}

// 导出的变量、方法------在一个文件或模块中，export、import可以有多个，export default仅有一个
export {
    homePage,
    getMenus,
    getPages
};

// 路由信息数组
const routers = [{
    ...homePage,
    component: (res) => require(['./views/index.vue'], res)
}, {
    path: '/login',
    // 路由元信息
    meta: {
        title: '登录',
        noCheckLogin: true
    },
    component: (res) => require(['./views/login.vue'], res)
},{
	path:'/',
	redirect:'/login'
},{
    path: '/register',
    // 路由元信息
    meta: {
        title: '注册',
    },
    component: (res) => require(['./views/register.vue'], res)
},{
    path: '/result',
    // 路由元信息
    meta: {
        title: '注册结果',
    },
    component: (res) => require(['./views/result.vue'], res)
},{
    path: '/vipdetail',
    // 路由元信息
    meta: {
        title: '会员权益',
    },
    component: (res) => require(['./views/vipdetail.vue'], res)
},
{
    path: '/download',
    // 路由元信息
    meta: {
        title: '下载',
    },
    component: (res) => require(['./views/download.vue'], res)
},
{
    path: '/judge',
    // 路由元信息
    meta: {
        title: '品鉴',
    },
    component: (res) => require(['./views/judge.vue'], res)
},
{
    path: '/market',
    // 路由元信息
    meta: {
        title: '市场',
    },
    component: (res) => require(['./views/market.vue'], res)
},
{
    path: '/agreement',
    // 路由元信息
    meta: {
        title: '协议',
    },
    component: (res) => require(['./views/agreement.vue'], res)
},
{
    path: '/guide',
    // 路由元信息
    meta: {
        title: '指南',
    },
    component: (res) => require(['./views/guide.vue'], res)
}];

// 导出路由信息数组
export default routers;

// 
function Modules(_module, MN) {
    var ret = [],
        CN, AS, C, AN;
    for (CN in _module) {
        C = _module[CN];
        if (!C.dev || DEBUG) {
            AS = C.list;
            for (AN in AS) {
                createAction(AS[AN]);
            }
        }
    }

    function createAction(A) {
        if (!A.dev || DEBUG) {
            A.meta = {
                module: MN,
                control: {
                    title: C.title,
                    name: CN,
                    icon: C.icon
                },
                title: A.title
            }
            A.name = `${MN}-${CN}-${AN}`;
            A.path = `/${MN}/${CN}/${AN}`;
            A.tpl = A.tpl ? `/tpl/${A.tpl}` : A.path;
            if (A.params) {
                if (typeof A.params != 'string') {
                    A.params = A.params.map((v) => `/:${v}`).join('');
                }
                A.path += A.params;
            }
            A.components = {
                content: (res) => require([`./views${A.tpl}.vue`], res)
            }
            ret.push(A);
            // console.log(`[route] ${A.path} -> ./views${A.tpl}.vue`);
        } 32
    }

    
    return ret;
}