"use strict";
const Helper_1 = require("../../../helpers/Helper");
const VarAddress_1 = require("../../VarAddress");
class Substr {
    getIdentifier() {
        return "string.substr";
    }
    execute(environment, parameters) {
        Helper_1.Helper.assert((parameters.length === 3 || parameters.length === 4) && parameters[0] instanceof VarAddress_1.VarAddress);
        let resultVar = parameters[0];
        let sourceString = Helper_1.Helper.resolve(environment, parameters[1]);
        Helper_1.Helper.assert(Helper_1.Helper.isString(sourceString));
        let startIdx = Helper_1.Helper.resolve(environment, parameters[2]);
        Helper_1.Helper.assert(Helper_1.Helper.isNumber(startIdx));
        let length = sourceString.length - startIdx;
        if (parameters.length === 4) {
            length = Helper_1.Helper.resolve(environment, parameters[3]);
            Helper_1.Helper.assert(Helper_1.Helper.isNumber(length));
            Helper_1.Helper.assert(length + startIdx <= sourceString.length);
        }
        let res = sourceString.substring(startIdx, startIdx + length);
        environment.setVariable(resultVar, res);
    }
}
exports.Substr = Substr;
