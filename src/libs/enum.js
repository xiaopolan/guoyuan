/*===== 通用枚举集合 =====*/

var R = 'red',
    G = 'green',
    B = 'blue',
    Y = 'yellow',
    N = null;

export default {
    /**
     * 常量
     */
    Bool: {
        'false': '否',
        'true': '是'
    },
    BoolColor: {
        'false': N,
        'true': G
    },

    /**
     * 性别
     */
    Gender: ['女', '男', '保密'],

    shotOderStatus: {
        1: "已结算",
        0: "未结算",
    },
    shotOderStatusColor: {
        1: "red",
        0: "blue",
    }
};