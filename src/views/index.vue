<style lang="less">
/* iview */
.layout {
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-header-bar {
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
body {
    font-size: 14px;
    // color: #000;
}
/* 自己 */
.layout_header {
    position: fixed;
    width: 100%;
    height: 78px;
    padding: 0px 130px 0px 200px;
    top: 0;
    background: #fff;
    z-index: 95;
    box-shadow: 0 2px 3px 2px rgba(0,0,0,.1);
    .breadcrumb {
    }
}
.layout_left {
    position: fixed;
    height: 100vh;
    left: 0;
    top: 0;
    overflow: auto;
    background: #ffffff;
    border: none;
    z-index: 96;
    .logo {
        background: #1e87f0;
        h1 {
            height: 78px;
            line-height: 78px;
            font-size: 20px;
            color: #fff;
            font-weight: bold;
            text-align: center;
        }
    }
    .ivu-menu {
        font-size: 16px;
        color: #000;
        .icon_title {
            float: left;
            margin-right: 15px;
            margin-top: 4px;
            width: 12px;
            height: 14px;
        }
        .ivu-menu-item {
            font-size: 16px;
        }
    }
    .layout-menu-item.ivu-menu-item-active,
    .layout-menu-item.ivu-menu-item-selected {
        background: #1e87f0;
    }
    .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu){
        color: #fff;
        background: #1e87f0;
    }
    .ivu-menu-submenu .ivu-menu-item{
        font-size: 15px;
    } 
}
.layout_content {
    margin: 98px 20px 0px 220px;
    border-radius: 5px;
    background: #f5f7f9;
    // min-height: 850px;
}
.layout_logout {
    position: fixed;
    right: 32px;
    top: 20px;
    z-index: 97;
    cursor: pointer;
    .logout_btn {
        width: 96px;
        height: 36px;
        padding: 0px;
        color: #57a3f3;
        border-color: #57a3f3;
    }
}
</style>
<template>
    <div class="layout">
        <!-- Layout：布局容器，其下可嵌套 HeaderSiderContentFooter或 Layout 本身，可以放在任何父容器中。 -->
        <Layout>
            <!-- Sider：侧边栏 -->
            <Sider class="layout_left" :width="menuWidth">
                <!-- logo -->
                <div class="logo">
                    <h1>小牛趣拍后台系统</h1>
                </div>
                <!-- 
                    Menu：导航菜单。为页面和功能提供导航的菜单列表，常用于网站顶部和左侧 
                        theme：主题
                        accordion：是否开启手风琴模式，开启后每次至多展开一个子菜单
                        active-name：激活菜单的 name 值
                -->
                <Menu
                    ref="menu"
                    theme="light"
                    :accordion="true"
                    :active-name="currentMenuItem"
                    width="auto"
                >
                    <Submenu
                        ref="submenus"
                        v-for="(menu,cname) in menus"
                        :name="cname"
                        :key="cname"
                        v-if="!menu.notMenu"
                    >
                        <!-- 一级标题 -->
                        <template slot="title">
                            <!-- 
                                <img :src="'../assets/img/icon/'+menu.icon" class="icon_title">
                                这样获取不到图片
                            -->
                            <img :src="require('../assets/img/icon/'+menu.icon)" class="icon_title">
                            {{menu.title}}
                            <small v-if="menu.dev">（开发中）</small>
                        </template>
                        <!-- 二级菜单 -->
                        <MenuItem
                            class="layout-menu-item"
                            v-for="(item,aname) in menu.list"
                            :name="`${actor}-${cname}-${aname}`"
                            :key="aname"
                            v-if="!item.notMenu && (DEBUG || !menu.dev)"
                            @click.native="jump(cname,aname)"
                        >
                            <!-- MenuItem：菜单项，name属性：菜单项的唯一标识，必填 -->
                            {{item.title}}
                            <!-- 给vue组件绑定事件时候，必须加上native ，不然不会生效 -->
                            <small v-if="item.dev">（开发中）</small>
                        </MenuItem>
                    </Submenu>
                </Menu>
            </Sider>
            <!-- 首页布局 -->
            <Layout>
                <!-- Header：顶部布局 -->
                <Header class="layout_header"></Header>
                <!-- Content：内容部分 -->
                <Content class="layout_content">
                    <!-- 欢迎语：只有首页显示 -->
                    <Card v-if="$route.path=='/index' && user">欢迎{{actorName}}，{{user.nickname}}</Card>
                    <!-- 主要内容 -->
                    <!-- keep-alive包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们 -->
                    <keep-alive v-if="!$route.meta.noCache">
                        <router-view name="content"></router-view>
                    </keep-alive>
                    <router-view v-else name="content"></router-view>
                    <!-- <router-view name="content"></router-view> -->
                </Content>
            </Layout>
            <!-- 登陆者昵称和退出登录 -->
            <div class="layout_logout">
                <Button type="ghost" class="logout_btn" @click="logout">退出</Button>
            </div>
        </Layout>
    </div>
</template>
<script>
// 引入通用的库文件
import Util from '@/libs/util';
import Time from '#/libs/time';

// 引入router.js中的变量及方法
import { homePage, getMenus } from '#/router';

var DEBUG;
// console.log(process.env.NODE_ENV);
// 根据process.env.NODE_ENV判断执行的命令
if (process.env.NODE_ENV == 'development') {
    // 执行的是： npm run serve
    DEBUG = true;
} else {
    // 执行的是： npm run build
    DEBUG = false;
}

export default {
    name: 'index',
    components: {},
    data() {
        return {
            DEBUG: DEBUG,
            actor: '', //角色身份
            actors: [], //角色身份
            user: null, //用户信息
            menus: [], //菜单
            menuWidth: 200, //菜单宽度
            currentMenuItem: '', //当前菜单激活的子菜单
            breadcrumbs: [homePage], //面包屑（路径）
            loading: true, //是否在加载，用于缓冲数据加载时动画的卡顿
            version: window.App.version // 版本信息
        };
    },
    computed: {
        /**
         * 角色对应的身份
         */
        actorName() {
            return this.getActor(this.actor);
        }
    },
    created() {
        // 将身份设为admin
        this.initFormatter();
        this.actors.push('admin');
        if (this.switchActor()) {
            // 获取用户信息
            this.getUserInfo();
            // Vue中的nextTick涉及到Vue中DOM的异步更新。里面的语句会在DOM更新后执行
            this.$nextTick(() => {
                // 初始化激活的菜单
                this.initMenuActive(this.$route);
            });
        }
    },
    mounted() {
        // 设置主内容高度
        Util.setMainHeight();
    },
    methods: {
        initFormatter() {
            Date.prototype.Format = function(fmt) {
                //
                let o = {
                    'M+': this.getMonth() + 1, //月份
                    'd+': this.getDate(), //日
                    'h+': this.getHours(), //小时
                    'm+': this.getMinutes(), //分
                    's+': this.getSeconds(), //秒
                    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
                    S: this.getMilliseconds() //毫秒
                };
                if (/(y+)/.test(fmt))
                    fmt = fmt.replace(
                        RegExp.$1,
                        (this.getFullYear() + '').substr(4 - RegExp.$1.length)
                    );
                for (var k in o)
                    if (new RegExp('(' + k + ')').test(fmt))
                        fmt = fmt.replace(
                            RegExp.$1,
                            RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
                        );
                return fmt;
            };
        },
        //
        switchActor(actor) {
            if (!actor) {
                // 未传参数
                actor = Util.user().actor || this.actors[0] || 'user';
            }
            Util.initRouter(actor);
            this.actor = actor;
            //this.menus = getMenus(actor);
            var objsession = JSON.parse(sessionStorage.getItem('objStr'));
            var proid;
            if (objsession) {
                proid = objsession.permissionSign;
            }
            this.menus = getMenus('admin', proid);

            //             delete this.menus.userManage.list.userDetail; // 导航里删除用户详情
            //             delete this.menus.videoManage.list.videoSeniorDetail; // 导航里删除高级审核用户详情
            //             delete this.menus.videoManage.list.videoGeneralDetail; // 导航里删除普通审核用户详情
            //             delete this.menus.operationManage.list.userStatusTable; // 导航里删除用户状态表
			if(proid==0){
				delete this.menus.userManage.list.mingxi; // 导航里删除保证金明细
			}
            delete this.menus.dataManage.list.goodChoise; // 导航里删除商品选择
            // console.log(this.menus);
            if (this.$refs.pageTags) this.$refs.pageTags.checkTags(actor);
            return true;
        },
        /**
         * 更新激活的菜单
         */
        initMenuActive(route) {
            if (route.meta.control) {
                this.currentMenuItem = route.name;
                var submenus = this.$refs.submenus;
                if (submenus) {
                    var currentSubmenu = route.meta.control.name;
                    for (var i = 0, n = submenus.length; i < n; i++) {
                        if (!submenus[i].opened && submenus[i].name == currentSubmenu) {
                            submenus[i].handleClick();
                            break;
                        }
                    }
                }
            } else {
                this.currentMenuItem = '';
            }
        },
        /**
         * 获取用户信息
         */
        getUserInfo() {
            /** 临时代码 */
            var objsession = JSON.parse(sessionStorage.getItem('objStr'));
            this.user = {
                nickname: objsession.userName
            };
        },
        /**
         * 菜单路由跳转
         */
        jump(cname, aname) {
            // console.log(cname, aname); // statistics dataStatistics
            // console.log(`/${this.actor}/${cname}/${aname}`);  // /admin/statistics/dataStatistics
            this.$router.push(`/${this.actor}/${cname}/${aname}`);
        },
        /**
         * 获取角色身份
         */
        getActor(actor) {
            return {
                admin: '管理员'
            }[actor];
        },

        // 自己的
        logout() {
            sessionStorage.clear();
            this.$router.push('/login');
        }
    },
    watch: {
        /**
         * 监听路由变化更新面包屑和激活的菜单
         */
        $route(to) {
            // 更新面包屑和激活的菜单
            this.initMenuActive(to);
        }
    }
};
</script>
