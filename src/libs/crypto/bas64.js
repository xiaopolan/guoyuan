/*===== base64 =====*/
import base64 from 'crypto-js/enc-base64';
import utf8 from 'crypto-js/enc-utf8';

export default {
    parse(str) {
        return base64.parse(utf8.parse(str));
    },
    stringify(str) {
        return utf8.stringify(base64.stringify(str));
    }
};