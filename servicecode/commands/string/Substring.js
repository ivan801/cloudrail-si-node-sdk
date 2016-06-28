"use strict";
const Helper_1 = require("../../../helpers/Helper");
const VarAddress_1 = require("../../VarAddress");
class Substring {
    getIdentifier() {
        return "string.substring";
    }
    execute(environment, parameters) {
        Helper_1.Helper.assert((parameters.length === 3 || parameters.length === 4) && parameters[0] instanceof VarAddress_1.VarAddress);
        let resultVar = parameters[0];
        let sourceString = Helper_1.Helper.resolve(environment, parameters[1]);
        Helper_1.Helper.assert(Helper_1.Helper.isString(sourceString));
        let startIdx = Helper_1.Helper.resolve(environment, parameters[2]);
        Helper_1.Helper.assert(Helper_1.Helper.isNumber(startIdx));
        let endIdx = sourceString.length;
        if (parameters.length === 4) {
            endIdx = Helper_1.Helper.resolve(environment, parameters[3]);
            Helper_1.Helper.assert(Helper_1.Helper.isNumber(endIdx));
            Helper_1.Helper.assert(endIdx <= sourceString.length);
        }
        let res = sourceString.substring(startIdx, endIdx);
        environment.setVariable(resultVar, res);
    }
}
exports.Substring = Substring;
