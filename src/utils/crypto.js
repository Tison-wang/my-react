/*import crypto from 'crypto';
import {pubKey, privKey} from '../utils/keys';

// 加密方法
const encrypt1 = (data) => {
    // 注意，第二个参数是Buffer类型
    return crypto.publicEncrypt(pubKey, Buffer.from(data, 'utf8'));
};

// 解密方法
const decrypt1 = (encrypted) => {
    // 注意，encrypted是Buffer类型
    return crypto.privateDecrypt(privKey, encrypted);
};*/

let encrypt = (str) => {
    let res = [];
    for (let i = 0; i < str.length; i++)
        res[i] = ("00" + str.charCodeAt(i).toString(16)).slice(-4);
    return "\\u" + res.join("\\u");
}
let decrypt = (str) => {
    str = str.replace(/\\/g, "%");
    return unescape(str);
}

export default {
    encrypt,
    decrypt
}