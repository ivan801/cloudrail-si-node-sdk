"use strict";
const crypto = require("crypto");
const Helper_1 = require("../../../helpers/Helper");
const VarAddress_1 = require("../../VarAddress");
class Md5 {
    getIdentifier() {
        return "hash.md5";
    }
    execute(environment, parameters) {
        Helper_1.Helper.assert(parameters.length == 2 && parameters[0] instanceof VarAddress_1.VarAddress);
        let resultVar = parameters[0];
        let message = Helper_1.Helper.resolve(environment, parameters[1]);
        Helper_1.Helper.assert(Helper_1.Helper.isString(message));
        let hash = crypto.createHash("md5");
        hash.update(message);
        let buf = hash.digest();
        let numberArray = [];
        for (let i = 0; i < buf.length; i++) {
            numberArray.push(buf.readUInt8(i));
        }
        environment.setVariable(resultVar, numberArray);
    }
}
exports.Md5 = Md5;
