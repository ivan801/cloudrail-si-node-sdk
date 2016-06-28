"use strict";
const Helper_1 = require("../../../../helpers/Helper");
const VarAddress_1 = require("../../../VarAddress");
const crypto = require("crypto");
class Sha1 {
    getIdentifier() {
        return "crypt.hmac.sha1";
    }
    execute(environment, parameters) {
        Helper_1.Helper.assert(parameters.length == 3 && parameters[0] instanceof VarAddress_1.VarAddress);
        let resultVar = parameters[0];
        let key = Helper_1.Helper.resolve(environment, parameters[1]);
        let message = Helper_1.Helper.resolve(environment, parameters[2]);
        Helper_1.Helper.assert(Helper_1.Helper.isString(key) && Helper_1.Helper.isString(message));
        let hmac = crypto.createHmac("sha1", key);
        hmac.update(message);
        let buf = hmac.digest();
        let numberArray = [];
        for (let i = 0; i < buf.length; i++) {
            numberArray.push(buf.readUInt8(i));
        }
        environment.setVariable(resultVar, numberArray);
    }
}
exports.Sha1 = Sha1;
