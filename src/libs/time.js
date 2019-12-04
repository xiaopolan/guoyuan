import $Util from '#/libs/util';

var Util = $Util;

function date() {
    return new Date(...arguments);
}

var math = Math,
    regex = RegExp;

var ceil = math.ceil;

var _now = date();
var today = date(_now.toLocaleDateString());
var s = 1000,
    i = s * 60,
    h = i * 60,
    d = h * 24,
    w = d * 7,
    y = d * 365,
    m = y / 12;
var str_today = '今天',
    str_w = '星期',
    str_m = '个月',
    str_y = '年',
    str_before = '前',
    str_after = '后';
var fmt_y = 'yyyy',
    fmt_ym = fmt_y + '-MM',
    fmt_d = fmt_ym + '-dd',
    fmt_dh = fmt_d + ' HH',
    fmt_$s = fmt_dh + ':mm',
    fmt_t = fmt_$s + ':ss';
var todayRange = [today, after(d - 1)];

// 
function format(dt, fmt) {
    if (!fmt) fmt = fmt_d;
    else if (format[fmt]) fmt = format[fmt];
    if (!dt) return;
    if (!Util.isDate()) dt = date(dt);
    var o = {
        'M+': dt.getMonth() + 1, //月份 
        'd+': dt.getDate(), //日 
        'H+': dt.getHours(), //小时 
        'm+': dt.getMinutes(), //分 
        's+': dt.getSeconds(), //秒 
        'q+': (dt.getMonth() + 3) / 3 | 0, //季度 
        'S': dt.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(regex.$1, (dt.getFullYear() + '').substr(4 - regex.$1.length));
    }
    for (var k in o) {
        if (new regex('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(regex.$1, (regex.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
        }
    }
    return fmt;
}

format.y = fmt_y;
format.ym = fmt_ym;
format.d = fmt_d;
format.dh = fmt_dh;
format['!s'] = fmt_$s;
format.t = fmt_t;

/**
 * 获取相对时间
 * @param {*} time 
 * @param {*} exact 是否精确
 */
function relative(time, exact) {
    if (time == null) return '';
    var t = date(time) - (exact ? date() : today);
    if (isNaN(t)) return '';
    return len(t, exact) + (t < 0 ? str_before : str_after);
}

function len(t, exact) {
    if (!exact && t >= 0 && t < d) return str_today;
    var span;
    if (t < 0) {
        t = -t;
    } else {
        if (!exact) t -= d - 1;
    }

    if (exact) {
        if (t < i) {
            span = (t / s | 0) + '秒';
        } else if (t < h) {
            span = (t / i | 0);
            t = (t - span * i) / s | 0;
            span += '分' + (t ? _pad(t) + '秒' : '钟');
        } else if (t < d) {
            span = t / h | 0;
            t = (t - span * h) / i | 0;
            span += '小时' + (t ? _pad(t) + '分钟' : '');
        } else {
            _span();
        }
    } else {
        _span();
    }

    return span;

    function _span() {
        if (t < m) {
            span = ceil(t / d) + '天';
        } else if (t < y - (m / 2)) {
            span = (t / m | 0) + str_m;
        } else if (t < y + (m / 2)) {
            span = 1 + str_y;
        } else {
            span = t / y | 0;
            span += str_y + ((t - span * y) / m | 0) + str_m;
        }
    }

    function _pad(v) {
        return v > 9 ? v : '0' + v;
    }
}

function before(t) {
    return date(today.getTime() - t);
}

function after(t) {
    return date(today.getTime() + t);
}

// 
function options(isRange, isAfter, disabled, refer) {
    var time;
    if (Util.isFunction(refer)) {
        time = refer;
    } else {
        if (!refer) refer = today;
        else if (!Util.isDate(refer)) refer = date(refer);
        time = () => refer;
    }

    var offset, unit, firstTime;
    if (isRange) {
        unit = '';
        firstTime = todayRange;
        if (isAfter) {
            offset = (t) => {
                return [time(), date(time().getTime() + t)];
            };
        } else {
            offset = (t) => [date(time().getTime() - t), time()];
        }
    } else {
        firstTime = today;
        if (isAfter) {
            offset = (t) => date(time().getTime() + t);
            unit = str_after;
        } else {
            offset = (t) => date(time().getTime() - t);
            unit = str_before;
        }
    }

    var opt = {
        shortcuts: [{
            text: str_today,
            value: () => firstTime
        }, {
            text: 1 + str_w + unit,
            value: () => offset(w)
        }, {
            text: 1 + str_m + unit,
            value: () => offset(m)
        }, {
            text: 3 + str_m + unit,
            value: () => offset(m * 3)
        }, {
            text: 6 + str_m + unit,
            value: () => offset(m * 6)
        }, {
            text: 1 + str_y + unit,
            value: () => offset(y)
        }]
    };

    if (disabled) {
        opt.disabledDate = Util.isFunction(disabled) ? disabled :
            isAfter ? (t) => t < time() : (t) => t > time();
    }

    return opt;
}


function span(t1, t2, re_str) {
    if (!Util.isDate(t1)) t1 = date(t1);
    if (!Util.isDate(t2)) t2 = date(t2);
    if (!isNaN(t1) && !isNaN(t2)) {
        return re_str ? `（${ceil((t2 - t1) / d * 2) / 2} 天）` : ceil((t2 - t1) / d);
    }
    return '';
}

export default {
    now: _now,
    today: today,
    todayRange: todayRange,
    date: date,
    format: format,
    relative: relative,
    options: options,
    span: span,
    after: after,
    before: before,
    len: len
};