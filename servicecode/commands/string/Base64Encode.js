"use strict";
const Helper_1 = require("../../../helpers/Helper");
const VarAddress_1 = require("../../VarAddress");
const base64charsDefault = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
const base64charsWebSafe = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
class Base64Encode {
    getIdentifier() {
        return "string.base64encode";
    }
    execute(environment, parameters) {
        Helper_1.Helper.assert(parameters.length >= 2 && parameters[0] instanceof VarAddress_1.VarAddress);
        let resultVar = parameters[0];
        let sourceString = Helper_1.Helper.resolve(environment, parameters[1]);
        Helper_1.Helper.assert(Helper_1.Helper.isString(sourceString));
        let lineBreak = false;
        let webSafe = false;
        if (parameters.length >= 3)
            lineBreak = !!Helper_1.Helper.resolve(environment, parameters[2]);
        if (parameters.length >= 4)
            webSafe = !!Helper_1.Helper.resolve(environment, parameters[3]);
        let resultString = Base64Encode.encode(sourceString, lineBreak, webSafe);
        environment.setVariable(resultVar, resultString);
    }
    static encode(s, lineBreak, webSafe) {
        let base64chars = webSafe ? base64charsWebSafe : base64charsDefault;
        var r = "";
        var p = "";
        var c = s.length % 3;
        if (c > 0) {
            for (; c < 3; c++) {
                p += '=';
                s += "\0";
            }
        }
        for (c = 0; c < s.length; c += 3) {
            if (lineBreak) {
                if (c > 0 && (c / 3 * 4) % 76 == 0) {
                    r += "\r\n";
                }
            }
            var n = (s.charCodeAt(c) << 16) + (s.charCodeAt(c + 1) << 8) + s.charCodeAt(c + 2);
            n = [(n >>> 18) & 63, (n >>> 12) & 63, (n >>> 6) & 63, n & 63];
            r += base64chars[n[0]] + base64chars[n[1]] + base64chars[n[2]] + base64chars[n[3]];
        }
        return r.substring(0, r.length - p.length) + p;
    }
}
exports.Base64Encode = Base64Encode;
