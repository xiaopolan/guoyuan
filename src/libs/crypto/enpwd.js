/*===== 密码加密算法 3des-cbc-pkcs5 =====*/

/**
 * 一定要按这个顺序导入包
 */
import tripledes from 'crypto-js/tripledes';
import pkcs7 from 'crypto-js/pad-pkcs7';
import _utf8 from 'crypto-js/enc-utf8';
import base64 from 'crypto-js/enc-base64';
import core from 'crypto-js/core';

var utf8 = _utf8;

var iv = utf8.parse('56910372');
var key = utf8.parse('1bd4ac3849917342b1fb247c22a59d03');

export default function (str) {
    var encrypted = tripledes.encrypt(str, key, {
        iv: iv,
        mode: core.mode.CBC,
        padding: pkcs7
    });

    return base64.stringify(utf8.parse(encrypted.toString()));
}