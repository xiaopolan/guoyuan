/*===== 通用核心方法 =====*/

import jquery from "jquery"; // 引入jquery
import axios from 'axios';
import $_util from 'axios/lib/utils';
import $Cookies from 'js-cookie'; // 操作cookie的插件
import $iView from 'iview'; // iview组件库
import $Config from '#/libs/config';

import {
    getPages
} from '#/router';

import $Tea from '#/libs/crypto/tea';
import TeaClient from '#/libs/crypto/tea/encrypt';
import Md5 from '#/libs/crypto/md5';

/*
	babel-runtime（优于后者）和babel-polyfill作用相同：模拟一个ES2015的环境，使ES6代码能运行
*/
import Promise from 'babel-runtime/core-js/promise';
import QS from 'querystring'; // 用于 解析与格式化 查询字符串

var DEBUG;
// 根据process.env.NODE_ENV判断执行的命令
if (process.env.NODE_ENV == "development") {
    // 执行的是： npm run serve
    DEBUG = true;
} else {
    // 执行的是： npm run build
    DEBUG = false;
}

var _util = $_util,
    cookies = $Cookies,
    iView = $iView,
    Config = $Config,
    Tea = $Tea;

var N;

//数据处理（ajax/cookie/cache）
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var $data = {},
    $config = Config.params;
var $ajax = axios.create(Config.axios);

var secret;

var delimiter = ' ';

initSecret();

/**
 * 数字转字符串
 * @param {*} str 
 * @param {*} n 
 */
function _num2str(str, n) {
    return str.toString(n || 36);
}



/**
 * 字符位移32位
 * @param {*} str 
 * @param {*} encrypt 
 */
function charOffset32(str, encrypt) {
    var t = new Date();
    var ret = [],
        d = encrypt ? 32 : -32;
    for (var i = 0, n = str.length; i < n; i++) {
        ret.push(String.fromCharCode(str.charCodeAt(i) + d));
    }

    return ret.join('');
}

function initSecret() {
    var body = document.body,
        key = 'color';
    secret = _num2str(parseInt((body.getAttribute(key) || '').substr(1), 16)) + 'livecast';
    body.removeAttribute(key);
}

/**
 * 过滤参数键值对{a:1,b:2,c:3,d:4,e:5}
 * Array：原封不动的移过来 [a,b,c]
 * JSON(k:K)：更改名字移过来 {A:a,B:b,C:c,D:d,E:e}
 * JSON(k:fun)：更改名字移过来 {A:fn(A),B:fn(B),C:fn(C),D:fn(D),E:fn(E)}
 * 
 * @param {*} params 原参数
 * @param {*} props 原封不动
 * @param {*} pairs 预处理
 * @param {*} ret 新参数
 * @param {*} ignore 
 */
function filter(params, props, pairs, ret, ignore) {
    if (!ret) ret = {};
    var k, v, value;

    if (!_util.isFunction(ignore)) {
        //是否保留空的参数 0:==null || == '',1:==null,2:===undefined,4:不忽略,
        switch (ignore || 0) {
            case 0:
                ignore = (_k, _v) => _v == N || _v === '';
                break;
            case 1:
                ignore = (_k, _v) => _v == N;
                break;
            case 2:
                ignore = (_k, _v) => _v === N;
            case 3:
                ignore = (_k) => _k[0] == '_';
                break;
        }
    }

    if (props) {
        for (var i = 0, n = props.length; i < n; i++) {
            k = props[i];
            if (!(ignore && ignore(k, params[k]))) {
                ret[k] = params[k];
            }
        }
    }

    if (pairs) {
        for (k in pairs) {
            value = pairs[k];
            if (_util.isFunction(value)) {
                ret[k] = value(params[k], params);
            } else {
                if (!(ignore && ignore(value, params[value]))) {
                    ret[k] = params[value];
                }
            }
        }
    }

    return ret;
}

/**
 * ajax请求预处理
 * @param {*} path 
 * @param {*} params 
 * @param {*} opt 
 * @param {*} ajax 
 * @param {*} data 
 */
function _ajax(path, params, opt, ajax, data) {
    if (!opt) opt = {};

    if (params) {
        if (params.page && !opt.noPage) {
            params.pageSize = config('pageSize');
        }
        path += '?' + QS.stringify(params);
    }

    if (data && data.page && !opt.noPage) {
        data.pageSize = config('pageSize');
    }

    //缓存配置
    if (opt.cache) {
        if (!_util.isObject(opt.cache)) {
            if (_util.isNumber(opt.cache)) {
                opt.cache = {
                    key: `${path}#${QS.stringify(data)}`,
                    time: opt.cache
                };
            } else {
                opt.cache = {
                    key: opt.cache
                };
            }
        }
        var cache = apiStorage(opt.cache.key);
        if (cache != N) {
            return new Promise(function (resolve) {
                resolve({
                    code: 0,
                    data: cache
                });
            });
        }
    }

    if (!DEBUG) {
        var index = path.indexOf('/', 1) + 1;
        path = path.substr(0, index) + TeaClient(path.substr(index), secret);
    }
    return ajax(path).then(_then).catch(_catch);
}

/**
 * 发送get请求
 * @param {string} path url路径
 * @param {json} params url参数
 * @param {json} opt 其他请求配置
 */
function get(path, params, opt) {
    return _ajax(path, params, opt, (_path) => {
        return $ajax.get(_path, opt);
    });
}
/**
 * 发送post请求
 * @param {string} path url路径
 * @param {json} params url参数
 * @param {json} data post请求的数据
 * @param {json} opt 其他请求配置
 */
function post(path, params, data, opt) {
    return _ajax(path, params, opt, (_path) => {
        return $ajax.post(_path, data, opt);
    });
}

/**
 * 获取api全路径
 * @param {*} path 
 */
function api(path, params) {
    var url = $Config.axios.baseURL + path;
    if (params) url += '?' + QS.stringify(params);
    return url;
}

/**
 * 状态拦截处理
 * @param {Response} res 
 */
function _then(res) {
    var data = res.data;
    if (data.code != 0 && data.msg) {
        switch (data.code) {
            case 10300: //{"code":10300,"msg":"用户未登录","data":null}
            case 20500: //{"code":20500,"msg":"登录失效","data":null}
            case 20801: //cookie中的token丢失
                goLogin();
                break;
            default:
                break;
        }
        iView.Message.error(`${data.msg} (code：${data.code})`);
    } else if (res.config.cache) {
        var cache = res.config.cache;
        apiStorage(cache.key, data.data, cache.time, cache.encrypt);
    }
    return data;
}

/**
 * 错误拦截处理
 * @param {Error} err 
 */
function _catch(err) {
    var res = err.response;
    if (res && res.data) {
        if (_util.isString(res.data)) {
            res.data = {
                msg: res.data,
                code: -1
            }
        }
        error(`${res.data.msg || '未知错误，请重试！'} (${res.data.code})`);
    } else {
        error(`服务器请求失败，请重试！ (${err.message})`);
    }
}

/**
 * api缓存快捷方法
 * @param {*} name 
 * @param {*} value 
 * @param {*} time 
 * @param {*} encrypt 
 * @param {*} isUpdate 
 */
function apiStorage(name, value, time, encrypt, isUpdate) {
    if (isUpdate) {
        var val = storage(`@api：${name}`);
        clone(value, N, val);
        storage(`@api：${name}`, val, time || 0, encrypt);
    } else {
        if (value === N) {
            return storage(`@api：${name}`);
        } else {
            storage(`@api：${name}`, value, time || 0, encrypt);
        }
    }
}

/**
 * 获取或者设置cookie
 * @param {string} name 
 * @param {string?} value 
 * @param {json} daysOrOptions 
 */
function cookie(name, value, daysOrOptions) {
    if (value === N) {
        return cookies.get(name);
    } else {
        if (value != N) {
            return cookies.set(name, value, daysOrOptions);
        } else {
            return cookies.remove(name, daysOrOptions);
        }
    }
}

/**
 * 清空缓存
 */
function clearCookie() {
    var cs = cookies.getJSON();
    for (var c in cs) {
        cookies.remove(c);
    }
}

/**
 * 缓存
 * @param {*} k 缓存键
 * @param {*} v 缓存值
 * @param {*} t 过期时间：-1永不过期，0关闭浏览器后过期，>0 为过期时间（秒），默认t=0
 * @param {*} encrypt 是否加密
 */
function storage(k, v, t, encrypt) {
    if (!DEBUG) k = Md5(k);
    try {
        if (!k) return;
        var ss = sessionStorage,
            ls = localStorage,
            data;
        if (v === N) {
            data = ss.getItem(k) || ls.getItem(k);
            if (!data) return null;
            data = parse(data);
            if (data.t) return data.t * 1000 < getNowTick() ? null : data.o ? JSON.parse(data.v) : data.v;
            if (data.k) {
                if (data.k > 1e9 + 1e8 && data.k * 1000 < getNowTick()) return null;
                v = Tea(charOffset32(data.v, false), secret + data.k.toString(36), true);
                return data.o ? JSON.parse(v) : v;
            }
            return data.o ? JSON.parse(data.v) : data.v;
        } else {
            if (v === null) {
                ss.removeItem(k);
                ls.removeItem(k);
            } else {
                if (encrypt) {
                    var key;
                    if (t > 0) key = Math.floor(getNowTick() / 1000) + t;
                    else if (t == 0 || !t) key = Math.random() * 1e8 | 0 + 1e9;
                    else key = Math.floor(getNowTick() / 1000) + 1e10;
                    data = {
                        k: key
                    };
                    if (_util.isObject(v)) {
                        v = JSON.stringify(v);
                        data.o = (Math.random() * 1e6 | 0) + 1e6;
                    }
                    data.v = charOffset32(Tea(v, secret + key.toString(36)), true);
                } else {
                    data = {};
                    if (!_util.isString(v)) {
                        data.v = JSON.stringify(v);
                        data.o = (Math.random() * 1e6 | 0) + 1e6;
                    } else {
                        data.v = v;
                    }
                }
                if (t == 0 || !t) {
                    if (ls.getItem(k)) ls.removeItem(k);
                    ss.setItem(k, stringify(data));
                } else {
                    if (ss.getItem(k)) ss.removeItem(k);
                    if (t > 0 && !encrypt) data.t = Math.floor(getNowTick() / 1000 + t);
                    ls.setItem(k, stringify(data));
                }
            }
        }
    } catch (e) {
        return null;
    }

    function getNowTick() {
        return new Date().getTime();
    }

    function parse(str) {
        var arr = str.split(delimiter);
        if (arr.length >= 3) {
            var data = {
                v: arr.slice(3).join(delimiter)
            };
            val('t', arr[0]);
            val('k', arr[1]);
            val('o', arr[2]);

            return data;

            function val(k, v) {
                if (v) {
                    data[k] = parseInt(v, 36);
                }
            }
        }
    }

    function stringify(data) {
        return [val(data.t), val(data.k), val(data.o), data.v].join(delimiter);

        function val(v) {
            return v ? _num2str(v) : ''
        }
    }
}
/**
 * 
 * @param {Boolean} deep 是否深度清理
 * @param {Regex|String} key 要清理缓存的键的范围
 */
function clearStorage(deep, key) {
    try {
        if (key) {
            var ss = sessionStorage,
                k,
                check = _util.isObject(key) ? (v) => {
                    return key.test(v);
                } : (v) => {
                    return key == v;
                };
            if (deep) {
                var ls = localStorage;
                for (k in ls) {
                    if (check(k)) ls.removeItem(k);
                }
            }
            for (k in ss) {
                if (check(k)) ss.removeItem(k);
            }
        } else {
            if (deep) {
                localStorage.clear();
            }
            sessionStorage.clear();
        }
    } catch (e) {
        return null;
    }
}
/**
 * 写入内存
 * @param {*} k 
 * @param {*} v 
 */
function data(k, v) {
    if (v !== N) $data[k] = v;
    else return $data[k];
}

/**
 * 获取/设置配置
 * @param {string} key 
 * @param {*} value 
 * @param {*} encrypt 是否加密
 */
function config(key, value, encrypt, expire) {
    if (value !== N) {
        $config[key] = value;
        storage(`@config：${key}`, value, expire != N ? expire : -1, encrypt);
    } else {
        return storage(`@config：${key}`) || $config[key];
    }
}

/**
 * 拼接资源服务器根路径
 * @param {*} url 
 */
function file(url) {
    if (!/^http/.test(url)) {
        return Config.url.fileRoot + url;
    } else {
        return url;
    }
}

/**
 * 移除资源服务器根路径
 * @param {*} url 
 */
function deFilePrefix(url) {
    return url ? url.replace(/http:\/\/[^/]*\/file\/image\//, '') : '';
}

/**
 * 保存用户标记
 * @param {*} account  账号
 * @param {*} actor    角色（身份）
 */
function user(account, actor) {
    if (account == N) {
        return config('user') || {
            account: N,
            actor: N
        };
    } else {
        var _user = config('user');
        if (_user) {
            if (!account) {
                account = _user.account;
            }
        }

        config('user', {
            account: account,
            actor: actor
        }, true);
    }
}

//路由相关方法
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var $router; //路由记录
const routeProps = ['name', 'meta', 'params', 'query', 'hash'];

/**
 * 获取路由名称
 * @param {*} name 
 */
function _getRouteName(name) {
    if (_util.isString(name)) {
        name = name.split('/').reverse();
    }
    var to = [];

    var meta = $router.currentRoute.meta;
    if (meta.module) to[0] = meta.module;
    if (meta.control) to[1] = meta.control.name;

    for (var i = 0; i < 3; i++) {
        if (name[i]) to[2 - i] = name[i];
    }

    return to.filter(v => v).join('-');
}

/**
 * 获取或者设置全局路由
 * @param {VueRouter} _router 
 */
function router(_router) {
    if (_router) {
        $router = _router;
        initRouter(); // 初始化路由
    } else {
        return $router;
    }
}

/**
 * 初始化路由
 * @param {*} actor 
 */
function initRouter(actor) {
    if (!actor) {
        actor = user().actor;
    }
    var routes = data('routes') || [];
    if (routes.indexOf(actor) < 0) {
        var pages = getPages(actor);
        if (pages) {
            routes.push(actor);
            data('routes', routes);
            user('', actor);
            // console.log(pages);
            $router.addRoutes(pages);
        }
    } else {
        user('', actor);
    }
}

/**
 * 跳转
 * @param {*} name 
 * @param {*} data 
 */
function go(name, data, key) {
    name = _getRouteName(name);

    if (data != N) cache(key, data, '', name);

    $router.push({
        name: name
    });
}

/**
 * 关闭并跳转
 * @param {*} name 
 * @param {*} cls 
 */
function closeAndGo(name, cls) {
    var closePageName = $router.currentRoute.name;
    go(name);
    util.closePage(closePageName)
    if (cls != N) {
        if (_util.isString(cls)) {
            cache(cls, null);
        } else {
            cls.forEach(function (cl) {
                cache(cl, null);
            });
        }
    }
}

/**
 * 跳转去登录页面
 */
function goLogin(code, from) {
    if (from === N) from = $router.app.$route;
    if (from) {
        if (from.path == '/login') return;
        var to = {};
        /*if (from.name) {
            to.query = from.query;
            to.query.redirect = from.name;
            to.query.params = JSON.stringify(from.params);
            to.hash = from.hash;
        }*/
        to.path = '/login';
        clearUser();
        $router.push(to);
        if (code) info(`登录失效，请重新登录！(code：${code})`);
    } else {
        if (location.pathname != '/login') location.href = '/login';
    }
}

function clearUser() {
    config('open-pages', null);
    //apiStorage('role', null);
    clearStorage();
    user('', '');
}

/**
 * 克隆路由
 * @param {*} from 
 * @param {*} to 
 */
function cloneRoute(from, to) {
    return clone(from, routeProps, to || {});
}

/**
 * 根据当前路由缓存
 * @param {*} name 
 * @param {*} data 
 */
function cache(name, data, expire, key) {
    key = '@route：' + key || $router.currentRoute.name;
    if (name) key += '.' + name;
    if (data !== N) {
        storage(key, {
            value: data,
            id: (Math.random()).toString(36).slice(2)
        }, expire);
    } else {
        var data = storage(key);
        return data ? data.value : null;
    }
}

function getCache(pageName, back, name, callback) {
    var key = '@route：' + $router.currentRoute.name;
    if (name) key += '.' + name;
    var data = storage(key);
    if (!data) {
        warning(`${pageName}页面已过期，请重新打开！`);
        back && closeAndGo(back);
    } else {
        if (callback) {
            callback(data.id, data.value);
        } else {
            return data.value;
        }
    }
}

//iview快捷方法
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var $msg = iView.Message;

$msg.config({
    duration: 3
});

function info(opts) {
    return $msg.info(opts);
}

function success(opts) {
    return $msg.success(opts);
}

function warning(opts) {
    return $msg.warning(opts);
}

function error(opts) {
    return $msg.error(opts);
}

function loading(callback, msg) {
    callback($msg.loading({
        content: msg || '加载中...',
        duration: 0
    }));
}

//对象处理
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * 克隆对象
 * @param {*} from 
 * @param {*} props 
 * @param {*} to 
 * @param {*} copy 
 */
function clone(from, props, to, copy) {
    if (!to) to = {};
    if (!copy) copy = (to, from) => !eq(to, from);
    var flag = false;
    if (props && props.length) {
        props.forEach(clone);
    } else {
        for (var prop in from) {
            clone(prop);
        }
    }

    function clone(prop) {
        if (copy(to[prop], from[prop])) {
            to[prop] = from[prop];
            flag = true;
        }
    }

    return flag ? to : null;
}

/**
 * 返回某个指定的值在数组中首次出现的位置。
 * @param {*} arr 
 * @param {*} compare 
 * @param {*} item 
 */
function indexOf(arr, compare, item) {
    for (var i = 0, n = arr.length; i < n; i++) {
        if (compare(arr[i], item, i)) {
            return i;
        }
    }
    return -1;
}

/**
 * 比较两个对象
 * @param {*} A 
 * @param {*} B 
 */
function eq(A, B) {
    if (A == B) return true;
    var aLen, bLen, isEqual, num;
    if (_util.isArray(A)) {
        if (!_util.isArray(B)) return false;
        aLen = A.length;
        bLen = B.length;
        if (aLen != bLen) return false;
        isEqual = true;
        num = 0;
        for (var i = 0; i < aLen; i++) {
            if (A[i] != B[i] && _util.isObject(A[i]) && _util.isObject(B[i])) {
                isEqual = eq([A[i], B[i]]);
            } else {
                isEqual = A[i] === B[i];
            }
            if (isEqual) num++;
        }
        return num === aLen;
    } else if (_util.isDate(A)) {
        return _util.isDate(B) ? A.getTime() === B.getTime() : false;
    } else if (_util.isObject(A)) {
        if (_util.isArray(B) || _util.isDate(B) || !_util.isObject(B)) {
            return false;
        } else {
            aLen = bLen = 0;
            var j;
            for (j in A) aLen++;
            for (j in B) bLen++;
            if (aLen != bLen) return false;
            isEqual = true;
            num = 0;
            for (j in A) {
                if (_util.isObject(A[j]) && _util.isObject(B[j]) && A[j] != B[j]) {
                    isEqual = eq([A[j], B[j]]);
                } else {
                    isEqual = A[j] === B[j];
                }
                if (isEqual) num++;
            }
            return num === aLen;
        }
    }
    return false;
}

/**
 * 是否是Boolean类型
 * @param {*} val 
 */
function isBoolean(val) {
    return Object.prototype.toString.call(val) === '[object Boolean]';
}

// 设置主内容高度
function setMainHeight() {
    var wdHeight = jquery(window).height();
    var headerHeight = jquery('.layout_header').height();
    var lcHeight = jquery('.layout_content').height();
    var minHeight = wdHeight - headerHeight - 20;
    // console.log(wdHeight);
    // console.log(headerHeight);
    // console.log(lcHeight);
    // console.log(minHeight);
    if (lcHeight < minHeight) {
        jquery('.layout_content').height(minHeight);
    }
}
// 日期格式化
function dateFormatting(date) {
    var dateStr = date.toLocaleString(); //把日期转换成2018/6/4 下午10:45:19 格式
    var dateArr1 = dateStr.split(" "); //把2018/6/4提取出来
    var dateArr2 = dateArr1[0].split('/'); //把年月日数字单独提出来
    var dateMonth = dateArr2[1] < 10 ? '0' + dateArr2[1] : dateArr2[1];
    var dateDay = dateArr2[2] < 10 ? '0' + dateArr2[2] : dateArr2[2];
    var dateStrFormat = dateArr2[0] + '-' + dateMonth + '-' + dateDay; //拼接成我们需要的格式返回

    // 返回格式化的日期
    return dateStrFormat;
}
// 日期时间格式化
function dateTimeFormat(time) {
    var date = time?new Date(time):new Date();
    var year = date.getFullYear();
    var monthInit = date.getMonth() + 1;
    var month = monthInit< 10 ? "0" + monthInit : monthInit;
    var day = date.getDate()< 10 ? "0" + date.getDate() : date.getDate();
    var weekDay = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六")[date.getDay()];
    var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    var minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    var second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    var format1 = year+'-'+month+'-'+day;
    var format2 = year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second;
    return {
        year:year,
        month:month,
        day:day,
        weekDay:weekDay,
        hour:hour,
        minute:minute,
        second:second,
        format1:format1,
        format2:format2,
    };
}
// 获取当前日期及n天（之前或之后）的日期
function todayAndnDay(n) {
    // n：正数表示n天后，负数表述n天前     
    var nowDate = new Date();
    var ss = 24 * 60 * 60 * 1000; //一天的毫秒数86400
    // 当前日期
    var todayDate = dateFormatting(nowDate);
    // n天（之前或之后）的日期
    var nDayDateTimestamp = nowDate.getTime(); //获取当前时间戳
    var nDay = new Date(nDayDateTimestamp + ss * n) //减去n天的国际标准日期
    var nDayDate = dateFormatting(nDay);
    // 返回今天和n天（之前或之后）的日期
    return {
        todayDate: todayDate,
        nDayDate: nDayDate
    }
}

// input输入的是否是数字
function ipIsNum(val, nocMsg, notNumMsg, callback) {
    if (val == "" || val == undefined) {
        // 没输入
        error(nocMsg);
    } else {
        var r = /^\+?[1-9][0-9]*$/;
        if (r.test(val)) {
            // 是数字
            callback();
        } else {
            // 不是数字
            error(notNumMsg);
        }
    }
}
// 判断是否是数字
function isNumPd(n) {
    var r = /^\+?[1-9][0-9]*$/;
    if (r.test(n)) {
        // 是数字
        return true;
    } else {
        // 不是数字
        return false;
    }
}

// 数组对象属性排序比较器
function compare(propertyName) {
    return function (object1, object2) {
        var value1 = parseInt(object1[propertyName]);
        var value2 = parseInt(object2[propertyName]);
        if (value2 < value1) {
            return 1;
        } else if (value2 > value1) {
            return -1;
        } else {
            return 0;
        }
    }
}

var util = {
    //数据处理（ajax/cookie/cache）
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    get: get,
    post: post,
    /**
     * 
     * @param {Function} fn 
     */
    promise(fn) {
        return new Promise(fn);
    },
    cookie: cookie,
    clearCookie: clearCookie,
    storage: storage,
    clearStorage: clearStorage,
    apiStorage: apiStorage,
    data: data,
    config: config,
    api: api,
    file: file,
    deFilePrefix: deFilePrefix,
    user: user,

    //路由相关方法
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    router: router,
    cache: cache,
    getCache: getCache,
    initRouter: initRouter,
    go: go,
    closeAndGo: closeAndGo,
    goLogin: goLogin,
    clearUser: clearUser,
    cloneRoute: cloneRoute,

    //iview快捷方法
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /**
     * 全局弹出消息
     */
    info: info,
    success: success,
    warning: warning,
    error: error,
    loading: loading,
    /**
     * 全局通知提醒
     */
    notice: iView.Notice,
    modal: iView.Modal,

    //对象处理
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    clone: clone,
    filter: filter,
    indexOf: indexOf,
    eq: eq,
    ..._util,
    isBoolean: isBoolean,

    pwd: (1982613533017).toString(36),

    // 设置主内容高度
    setMainHeight,
    // 获取当前日期及n天（之前或之后）的日期
    todayAndnDay,
    // 日期格式化
    dateFormatting,
    // input输入的是否是数字
    ipIsNum,
    // 判断是否是数字
    isNumPd,
    // 数组对象属性排序比较器
    compare,
    // 日期时间格式化
    dateTimeFormat
};

export default util;