/*===== tea加密方法 =====*/

var xffffffff = 0xffffffff,
    xff = 0xff,
    x3f = 0x3f,
    x9E3779B9 = 0x9E3779B9;
var StringFromCharCode = String.fromCharCode;
var dic = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_';

/**
 * 解密
 * @param {*} str 明文/密文
 * @param {*} key 密钥 16位
 * @param {Boolean} utf8 是否需要转码
 */
module.exports = function (str, key, utf8) {

    str = decrypt(str, key);
    return utf8 || utf8 === undefined ? utf8ToUtf16(str) : str;

    /**
     * 解密
     * @param {*} str 
     * @param {*} key 
     */
    function decrypt(str, key) {
        if (str == '') return '';
        var v = bit64str2long(str);
        var k = str2long(key, false);
        if (k.length < 4) {
            k.length = 4;
        }
        var n = v.length - 1;

        var z = v[n - 1],
            y = v[0];
        var mx, e, p, q = Math.floor(6 + 52 / (n + 1)),
            sum = q * x9E3779B9 & xffffffff;
        while (sum != 0) {
            e = sum >>> 2 & 3;
            for (p = n; p > 0; p--) {
                z = v[p - 1];
                mx = (z >>> 5 ^ y << 2) + (y >>> 3 ^ z << 4) ^ (sum ^ y) + (k[p & 3 ^ e] ^ z);
                y = v[p] = v[p] - mx & xffffffff;
            }
            z = v[n];
            mx = (z >>> 5 ^ y << 2) + (y >>> 3 ^ z << 4) ^ (sum ^ y) + (k[p & 3 ^ e] ^ z);
            y = v[0] = v[0] - mx & xffffffff;
            sum = sum - x9E3779B9 & xffffffff;
        }

        return long2str(v, true);
    }

    function long2str(v, w) {
        var vl = v.length;
        var n = (vl - 1) << 2;
        if (w) {
            var m = v[vl - 1];
            if ((m < n - 3) || (m > n)) return null;
            n = m;
        }
        for (var i = 0; i < vl; i++) {
            v[i] = StringFromCharCode(v[i] & xff,
                v[i] >>> 8 & xff,
                v[i] >>> 16 & xff,
                v[i] >>> 24 & xff);
        }
        if (w) {
            return v.join('').substring(0, n);
        } else {
            return v.join('');
        }
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

    function bit64str2long(s) {
        var len = s.length;
        var v = [];
        for (var i = 0, n, k; i < len;) {
            n = i / 16 * 3 | 0, k = n % 3;
            if (k == 0) {
                v[n] = num_x3f(26) | num_x3f(20) | num_x3f(14) | num_x3f(8) | num_x3f(2) | dic.indexOf(s[i++]) >> 4;
            } else if (k == 1) {
                v[n] = (dic.indexOf(s[i - 1]) & 0xf) << 28 | num_x3f(22) | num_x3f(16) | num_x3f(10) | num_x3f(4) | dic.indexOf(s[i++]) >> 2;
            } else {
                v[n] = (dic.indexOf(s[i - 1]) & 0x3) << 30 | num_x3f(24) | num_x3f(18) | num_x3f(12) | num_x3f(6) | num_x3f(0);
            }

            function num_x3f(offset) {
                return dic.indexOf(s[i++]) << offset;
            }
        }

        return v;
    }

    /**
     * UTF-8转UTF-16
     * @param {*} s 
     */
    function utf8ToUtf16(s) {
        if (!s) {
            return;
        }

        var i, codes, bytes, ret = [],
            len = s.length;
        for (i = 0; i < len; i++) {
            codes = [];
            codes.push(s.charCodeAt(i));
            if (((codes[0] >> 7) & 0xff) == 0x0) {
                //单字节  0xxxxxxx  
                ret.push(s.charAt(i));
            } else if (((codes[0] >> 5) & 0xff) == 0x6) {
                //双字节  110xxxxx 10xxxxxx  
                codes.push(s.charCodeAt(++i));
                bytes = [];
                bytes.push(codes[0] & 0x1f);
                bytes.push(codes[1] & x3f);
                ret.push(StringFromCharCode((bytes[0] << 6) | bytes[1]));
            } else if (((codes[0] >> 4) & 0xff) == 0xe) {
                //三字节  1110xxxx 10xxxxxx 10xxxxxx  
                codes.push(s.charCodeAt(++i));
                codes.push(s.charCodeAt(++i));
                bytes = [];
                bytes.push((codes[0] << 4) | ((codes[1] >> 2) & 0xf));
                bytes.push(((codes[1] & 0x3) << 6) | (codes[2] & x3f));
                ret.push(StringFromCharCode((bytes[0] << 8) | bytes[1]));
            }
        }
        return ret.join('');
    }
};