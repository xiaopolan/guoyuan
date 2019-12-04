/*===== 常量和配置文件 =====*/
import QS from 'querystring';


export default {

    /**
     * axios配置
     */
    axios: {
        baseURL: '/api/',
        withCredentials: true,
        timeout: 60000, // 参数序列化
        transformRequest: function (params) {
            return QS.stringify(params);
        },

    },

    /**
     * 常用正则
     */
    regex: {
        mobile: /^[1][^012][0-9]{9}$/,
        hexId: /^[0-9a-zA-Z]+$/,
        CH: /[\u4e00-\u9fa5]/g
    },

    /**
     * 常用地址
     */
    url: {
        upload: '/file/upload/jsons',
        //upload: '/file/user/uploadImage.do',
        fileRoot: '/file/image/',
    },

    /**
     * 页面默认参数
     */
    params: {
        //统一分页大小
        pageSize: 10
    },

    //标题
    title: '后台管理系统'
};