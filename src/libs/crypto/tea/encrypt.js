/*===== tea加密方法 =====*/

var xffffffff = 0xffffffff,
    x80 = 0x80,
    x3f = 0x3f,
    x9E3779B9 = 0x9E3779B9;
var StringFromCharCode = String.fromCharCode;

var dic = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_';

/**
 * 加密
 * @param {*} str 明文
 * @param {*} key 密钥 16位
 * @param {Boolean} utf8 是否需要转码
 */
export default function (str, key, utf8) {
    if (utf8 || utf8 === undefined) str = utf16ToUtf8(str);
    return encrypt(str, key);

    /**
     * 加密
     * @param {*} str 
     * @param {*} key 
     */
    function encrypt(str, key) {
        if (str == '') return '';
        var v = str2long(str, true);
        var k = str2long(key, false);

        if (k.length < 4) {
            k.length = 4;
        }
        var n = v.length - 1;

        var z = v[n],
            y = v[0];
        var mx, e, p, q = Math.floor(6 + 52 / (n + 1)),
            sum = 0;
        while (0 < q--) {
            sum = sum + x9E3779B9 & xffffffff;
            e = sum >>> 2 & 3;
            for (p = 0; p < n; p++) {
                y = v[p + 1];
                mx = (z >>> 5 ^ y << 2) + (y >>> 3 ^ z << 4) ^ (sum ^ y) + (k[p & 3 ^ e] ^ z);
                z = v[p] = v[p] + mx & xffffffff;
            }
            y = v[0];
            mx = (z >>> 5 ^ y << 2) + (y >>> 3 ^ z << 4) ^ (sum ^ y) + (k[p & 3 ^ e] ^ z);
            z = v[n] = v[n] + mx & xffffffff;
        }

        return long2bit64(v);
    }

    function str2long(s, w) {
        var len = s.length;
        var v = [];
        for (var i = 0; i < len; i += 4) {
            v[i >> 2] = s.charCodeAt(i) |
                s.charCodeAt(i + 1) << 8 |
                s.charCodeAt(i + 2) << 16 |
                s.charCodeAt(i + 3) << 24;
        }
        if (w) {
            v[v.length] = len;
        }

        return v;
    }

    function long2bit64(v) {
        for (var i = 0, vl = v.length, k; i < vl; i++) {
            k = i % 3;
            if (k == 0) {
                v[i] = str_x3f(26) + str_x3f(20) + str_x3f(14) + str_x3f(8) + str_x3f(2) + dic[(v[i] & 0x3) << 4 | v[i + 1] >> 28 & 0xf];
            } else if (k == 1) {
                v[i] = str_x3f(22) + str_x3f(16) + str_x3f(10) + str_x3f(4) + dic[(v[i] & 0xf) << 2 | v[i + 1] >> 30 & 0x3];
            } else {
                v[i] = str_x3f(24) + str_x3f(18) + str_x3f(12) + str_x3f(6) + str_x3f(0);
            }

            function str_x3f(offset) {
                return dic[v[i] >> offset & x3f];
            }
        }
        return v.join('');


    }

    /**
     * UTF-16转UTF-8
     * @param {*} s 
     */
    function utf16ToUtf8(s) {
        if (!s) {
            return;
        }

        var i, code, ret = [],
            len = s.length;
        for (i = 0; i < len; i++) {
            code = s.charCodeAt(i);
            if (code > 0x0 && code <= 0x7f) {
                //单字节  
                //UTF-16 0000 - 007F  
                //UTF-8  0xxxxxxx  
                ret.push(s.charAt(i));
            } else if (code >= x80 && code <= 0x7ff) {
                //双字节  
                //UTF-16 0080 - 07FF  
                //UTF-8  110xxxxx 10xxxxxx  
                ret.push(
                    //110xxxxx  
                    StringFromCharCode(0xc0 | ((code >> 6) & 0x1f)),
                    //10xxxxxx  
                    StringFromCharCode(x80 | (code & x3f))
                );
            } else if (code >= 0x800 && code <= 0xffff) {
                //三字节  
                //UTF-16 0800 - FFFF  
                //UTF-8  1110xxxx 10xxxxxx 10xxxxxx  
                ret.push(
                    //1110xxxx  
                    StringFromCharCode(0xe0 | ((code >> 12) & 0xf)),
                    //10xxxxxx  
                    StringFromCharCode(x80 | ((code >> 6) & x3f)),
                    //10xxxxxx  
                    StringFromCharCode(x80 | (code & x3f))
                );
            }
        }

        return ret.join('');
    }
}