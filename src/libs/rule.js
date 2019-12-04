/*===== 表单规则通用方法 =====*/
import Util from '#/libs/util';
import Config from '#/libs/config';

var N;

function rule(message, pattern, opts, trigger, required) {
    if (!opts) opts = {};
    opts.required = required == N ? true : required;
    opts.trigger = trigger || 'blur,change';
    if (pattern) opts.pattern = pattern;
    Util.isFunction(message) ? opts.validator = message : opts.message = message;
    return opts;
}
/**
 * 
 */
rule.notempty = function (tip, isempty) {
    if (!isempty) isempty = (v) => v == N;
    tip += '不能为空';
    return rule((rule, value, callback) => {
        if (isempty(value)) {
            callback(new Error(tip));
        } else {
            callback();
        }
    }, N, N, 'change');
};

rule.datePicker = function (tip) {
    return rule((rule, value, callback) => {
        if (!value || !value[0] || !value[0]) {
            callback(new Error(tip));
        } else {
            callback();
        }
    }, N, N, 'change');
};

rule.hexId = function (tip) {
    return rule(tip, Config.regex.hexId, N, 'change');
};

rule.mobile = rule('请填写有效的手机号', Config.regex.mobile, N, 'change');

rule.pwd = [
    rule('请填写密码', N, N, 'change'),
    rule('密码长度不能小于6位', N, {
        type: 'string',
        min: 6
    }, 'change')
];

function required(name, trigger) {
    return rule(`${name}不能为空`, N, N, trigger || 'change');
}

rule.required = required;

rule.len = function (name, min, max, _required) {
    var str;
    if (!min) str = `${name}的不能超过 ${max} 字符`;
    else if (!max) str = `${name}的不能少于 ${min} 字符`;
    else str = `${name}的长度应在 ${min} ~ ${max} 之间`;
    var ruleLen = rule(str, N, {
        type: 'string',
        min: min,
        max: max
    }, 'change', false);

    return _required || _required === N ? [required(name), ruleLen] : ruleLen;
};

rule.form = function ($form, promise) {
    var form = $form.model;
    if (form.loading) return;
    $form.validate(valid => {
        if (valid) {
            var ret = promise(form, $form);
            if (ret) {
                form.loading = true;
                ret.then(function () {
                    form.loading = false;
                });
            }
        } else {
            Util.error('请按提示填写表单！');
        }
    });
};

rule.modelForm = function (error, $form, promise, $table) {
    var form = $form.model;
    $form.validate(valid => {
        if (valid) {
            var ret = promise(form, $form);
            if (ret) {
                ret.then(function (success) {
                    if (success) {
                        $form.resetFields();
                        $table && $table.updateList();
                        error();
                    } else {
                        error(true);
                    }
                });
            }
        } else {
            Util.error('请按提示填写表单！');
            error(true);
        }
    });
};

export default rule;