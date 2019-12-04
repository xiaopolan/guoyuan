/*===== 表格创建通用方法 =====*/
import $Util from '#/libs/util';
import $Enum from '#/libs/enum';
import Time from '#/libs/time';

// 引入组件
import TimeCell from '#/components/table/time-cell.vue'; // 

var Util = $Util,
    Enum = $Enum,
    N;


const CENTER = 'center',
    RIGHT = 'right';

/**
 * 创建列
 * @param {*} title
 * @param {*} key
 * @param {*} width
 * @param {*} align
 * @param {*} _render
 */
function col(title, key, width, align, _render) {
    return {
        title: title,
        key: key,
        width: width,
        align: align,
        render: _render
    };
}

/**
 * iview表格数据处理转换器
 */
function render(json, key) {
    if (json) {
        if (!Util.isFunction(json)) {
            var _json = json;
            json = (val) => _json[val];
        }
        return (h, params) => {
            var row = params.row;
            var ret = json(row[key || params.column.key], row, h);
            if (Util.isString(ret) || Util.isNumber(ret)) {
                return h('span', ret);
            }
            return ret;
        };
    }

}

col.render = render;

col.expand = function (_render, width) {
    return {
        type: 'expand',
        width: width || 40,
        render: _render
    };
};
//空列
col.empty = {
    title: ' '
};
//添加行的隐藏属性
col.hide = function (_col, hide) {
    _col.hide = hide === N ? true : hide;
    return _col;
};

//是否含有行
col.has = function (_col, has) {
    _col.has = has === N ? true : has;
    return _col;
};

//过滤要显示的行
col.cols = function (_cols) {
    return _cols.filter((v) => {
        if (v.has === N || v.has) return v;
    });
};

col.select = function () {
    return {
        type: 'selection',
        align: CENTER,
        width: 32,
        className: 'nopading-cell',
    };
};

function noselect(_col) {
    return _class(_col, 'noselect-cell');
}

col.noselect = noselect;

col.filter = function (_col, list, filter, multiple) {
    var filters = [];
    for (var k in list) {
        if (list[k]) {
            filters.push({
                label: list[k],
                value: k
            });
        }
    }
    _col.filters = filters;
    _col.filterMultiple = !!multiple;
    _col.filterMethod = filter;
    return _col;
};

function _class(_col, name) {
    if (_col.className) _col.className += ' ' + name;
    else _col.className = name;
    return _col;
}

col.class = _class;

function ellipsis(_col) {
    _col.ellipsis = true;
    return _col;
}

col.ellipsis = ellipsis;

/**
 * 类型
 */
//用户昵称
col.user = function (key, title, _render) {
    return col(title || '昵称', key || 'userName', 120, '', render(_render, key));
};
//性别
col.gender = function (key, _render, title) {
    return col(title || '性别', key || 'sex', 50, CENTER,
        _render ? render((v, r) => {
            return Enum.Gender[_render(v, r)];
        }, key) : render(Enum.Gender, key));
};
//邮箱
col.email = function (key, title) {
    return col(title || '邮箱', key || 'email', 160);
};
col.ip = function (key, title) {
    return col(title || 'IP', key || 'ip', 110);
};
//qq
col.qq = function (key, title) {
    return col(title || 'QQ', key || 'qq', 100);
};
//年龄
col.age = function (title, key) {
    return col(title || '年龄', key || 'age', 45, CENTER);
};
//地址
col.address = function (key, title, _render) {
    return col((title || '') + '地址', key || 'address', 200, '', render(_render, key));
};
//手机号
col.phone = function (key, title, _render) {
    return col(title || '手机号', key || 'phone', 100, '', render(_render, key));
};
//链接
col.url = function (key, title, _render) {
    return col(title, key, 360, N, render(_render, key));
};
//可复制属性
col.touchUrl = function (key, title, expression, width) {
    return ellipsis(col(title, key, width, N, render((url, row, h) => {
        if (!url) return;
        if (expression) url = expression(url, row);
        return h('Tooltip', [h('div', {
            style: {
                wordBreak: "keep-all",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis"
            }
        }, url), h('div', {
            style: {
                whiteSpace: "normal",
                wordBreak: "break-all",
                wordWrap: "break-word"
            },
            slot: 'content'
        }, url)]);
    }, key)));
};
//编号
col.id = function (key, title, _render, pad) {

    if (!pad) pad = 6;
    var padstr = new Array(pad + 1).join('0');
    if (!_render) _render = (v) => {
        if (v == N) return '（空）';
        return padstr.substring(0, padstr.length - (v + '').length) + v;
    };
    return col((title || '') + '编号', key || 'id', pad * 8 + 20, CENTER, render(_render, key));
};
//32位hex
col.hex = function (key, title, _render) {
    return col((title || '') + '编号', key || 'id', 245, '', render(_render, key));
};



//时间
col.datetime = function (key, title) {
    return col.class(col(title + '时间', key, 110, CENTER, (h, params) => {
        var value = params.row[key];
        var time = Util.isString(value) ? value.replace(/\.\d+$/, '') : value + '';
        return h(TimeCell, {
            props: {
                time: time
            }
        });
    }), 'time-cell');
};
col.date = function (key, title) {
    return col((title || '') + '日期', key, 100, CENTER, (h, params) => {
        return Time.format(params.row[key]);
    });
};
//金额
col.money = function (key, title, _render, width) {
    if (_render == N) _render = true;
    return col(title + ' (元)', key || 'money', width || 100, RIGHT,
        render(Util.isBoolean(_render) ? function (value) {
            if (value == N) return '（空）';
            if (!_render) value /= 100;
            return (value - 0).toFixed(2);
        } : (value, row, h) => (_render(value, row, h) - 0).toFixed(2)));
};
//数值
col.num = function (key, title, _render, len) {
    return col(title, key, (len || 10) * 7 + 20, RIGHT, render(_render, key));
};
//文本
col.text = function (key, title, _render, len) {
    return col(title, key, (len || 15) * 13 + 20, N, render(_render, key));
};
//名称
col.str = function (key, title, _render, len) {
    return col(title, key, (len || 7) * 13 + 20, CENTER, render(_render, key));
};
//百分比
col.percent = (key, title, width) => {
    return col(title + '（%）', key, width || 70, RIGHT, render(val => (val * 100).toFixed(2) + '%', key));
};
//图片
col.img = function (key, title, expression, width, placement) {
    return _class(col(title || '预览图', key || 'image', width || 40, 'center', render((image, row, h) => {
        if (!image) return;
        if (expression) image = expression(image, row);
        image = Util.file(image);
        return h('Tooltip', {
            props: {
                placement: placement || 'right'
            }
        }, [
            h('img', {
                attrs: {
                    src: image
                },
                slot: 'content'
            }),
            h('img', {
                attrs: {
                    src: image
                }
            })
        ]);
    }, key)), 'img-cell');
};


/**
 * 开启关闭
 */
col.switch = function (key, change, title, text, vals, hide) {
    if (!text) text = ['关', '开'];
    if (!vals) vals = [0, 1];
    return noselect(col(title || '状态', key, 100, CENTER, (h, params) => {
        var row = params.row;

        if (!hide || !hide(row)) {
            return h('i-switch', {
                props: {
                    size: (Object.values(text).join('').length > 3) ? 'large' : 'default',
                    value: row[key],
                    falseValue: vals[0],
                    trueValue: vals[1]
                },
                on: {
                    'on-change'(status) {
                        change(status, row);
                    }
                }
            }, [
                h('span', {
                    slot: 'open'
                }, text[vals[1]]),
                h('span', {
                    slot: 'close'
                }, text[vals[0]])
            ]);
        }
    }));
};

// 含有操作功能的列的处理函数
col.action = function (btnOpts, width, flag) {
    return col.class(col('操作', '', width, '',
        (h, params) => {
            var items = [];
            btnOpts.forEach((btnOpt) => {
                if (!Util.isFunction(btnOpt.show) || btnOpt.show(params.row)) {
                    var btn,
                        _opt = {
                            props: {
                                type: btnOpt.type || 'primary',
                                size: 'small'
                            },
                            style: {
                                margin: '0 5px'
                            }
                        },
                        fn = () => btnOpt.click(flag ? params.row : params.index);
                    if (btnOpt.confirm) {
                        btn = h('Poptip', {
                            props: {
                                confirm: true,
                                title: btnOpt.confirm,
                                placement: 'left'
                            },
                            on: {
                                'on-ok': fn
                            }
                        }, [h('Button', _opt, btnOpt.text)]);
                    } else {
                        _opt.on = {
                            click: fn
                        };
                        btn = h('Button', _opt, btnOpt.text);
                    }
                    items.push(btn);
                }
            });
            return items;
        }), 'nowrap-cell noselect-cell');
};
// 含有操作功能的列的处理函数
col.yszl = function (btnOpts, width, flag) {
    return col.class(col('操作', '', width, '',
        (h, params) => {
            var items = [];
            btnOpts.forEach((btnOpt) => {
                if (!Util.isFunction(btnOpt.show) || btnOpt.show(params.row)) {
                    var btn,
                        _opt = {
                            props: {
                                type: btnOpt.type || 'primary',
                                size: 'small'
                            },
                            style: {
                                margin: '0 5px'
                            }
                        },
                        fn = () => btnOpt.click(flag ? params.row : params.index);
                    if (btnOpt.confirm) {
                        btn = h('Poptip', {
                            props: {
                                confirm: true,
                                title: btnOpt.confirm,
                                placement: 'left'
                            },
                            on: {
                                'on-ok': fn
                            }
                        }, [h('Button', _opt, btnOpt.text)]);
                    } else {
                        _opt.on = {
                            click: fn
                        };
                        btn = h('Button', _opt, btnOpt.text);
                    }
                    items.push(btn);
                }
            });
            return items;
        }), 'nowrap-cell noselect-cell');
};

function tag(name, width, key, expression, title) {
    var state, color;
    if (Util.isString(name)) {
        state = Enum[name];
        color = Enum[name + 'Color'];
    } else {
        state = name[0];
        color = name[1];
    }
    if (!key) key = 'state';
    return col(title || '状态', key, width || 120, CENTER,
        (h, params) => {
            var val = params.row[key];
            if (expression) val = expression(val, params.row);
            var text = valueOf(state);
            if (!text) {
                console.warn(`列 ${key} 的值 ${val} 不存在，${JSON.stringify(state)}，行：${JSON.stringify(params.row._index)}`);
            }
            if (text) {
                var arr = text.match(/^(.*)(\(.*\))$/);
                if (arr) {
                    text = [arr[1], h('small', arr[2])];
                }
            }
            return h('div', {
                style: {
                    color: valueOf(color),
                }
            }, text);

            function valueOf(v) {
                return Util.isFunction(v) ? v(val, params.row) : v[val] || '';
            }
        });
}

col.tag = tag;

export default col;