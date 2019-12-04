/*===== tea加密方法 =====*/

var xffffffff = 0xffffffff, xff = 0xff, x80 = 0x80, x3f = 0x3f, x9E3779B9 = 0x9E3779B9;
var StringFromCharCode = String.fromCharCode;

/**
 * 
 * @param {*} str 明文/密文
 * @param {*} key 密钥 16位
 * @param {Boolean} utf8 是否需要转码
 * @param {Boolean} encryptOrdecrypt 加密/解密
 */
export default function (str, key, encryptOrdecrypt, utf8) {
    if (!encryptOrdecrypt) {
        if (isUtf8()) str = utf16ToUtf8(str);
        return encrypt(str, key);
    } else {
        str = decrypt(str, key);
        return isUtf8() ? utf8ToUtf16(str) : str;
    }

    function isUtf8() {
        return utf8 || utf8 === undefined;
    }

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

        var z = v[n], y = v[0];
        var mx, e, p, q = Math.floor(6 + 52 / (n + 1)), sum = 0;
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

        return long2str(v, false);
    }

    /**
     * 解密
     * @param {*} str 
     * @param {*} key 
     */
    function decrypt(str, key) {
        if (str == '') return '';
        var v = str2long(str, false);
        var k = str2long(key, false);
        if (k.length < 4) {
            k.length = 4;
        }
        var n = v.length - 1;

        var z = v[n - 1], y = v[0];
        var mx, e, p, q = Math.floor(6 + 52 / (n + 1)), sum = q * x9E3779B9 & xffffffff;
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
        }
        else {
            return v.join('');
        }
    }

    function str2long(s, w) {
        var len = s.length;
        var v = [];
        for (var i = 0; i < len; i += 4) {
            v[i >> 2] = s.charCodeAt(i)
                | s.charCodeAt(i + 1) << 8
                | s.charCodeAt(i + 2) << 16
                | s.charCodeAt(i + 3) << 24;
        }
        if (w) {
            v[v.length] = len;
        }
        return v;
    }

    /**
     * UTF-16转UTF-8
     * @param {*} s 
     */
    function utf16ToUtf8(s) {
        if (!s) {
            return;
        }

        var i, code, ret = [], len = s.length;
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
    /**
     * UTF-8转UTF-16
     * @param {*} s 
     */
    function utf8ToUtf16(s) {
        if (!s) {
            return;
        }

        var i, codes, bytes, ret = [], len = s.length;
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
}