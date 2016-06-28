"use strict";
const Helper_1 = require("../../../helpers/Helper");
const VarAddress_1 = require("../../VarAddress");
class Split {
    getIdentifier() {
        return "string.split";
    }
    execute(environment, parameters) {
        Helper_1.Helper.assert((parameters.length === 3 || parameters.length === 4) && parameters[0] instanceof VarAddress_1.VarAddress);
        let resultVar = parameters[0];
        let sourceString = Helper_1.Helper.resolve(environment, parameters[1]);
        Helper_1.Helper.assert(Helper_1.Helper.isString(sourceString));
        let separator = Helper_1.Helper.resolve(environment, parameters[2]);
        Helper_1.Helper.assert(Helper_1.Helper.isString(separator));
        let limit;
        if (parameters.length === 4) {
            limit = Helper_1.Helper.resolve(environment, parameters[3]);
            Helper_1.Helper.assert(Helper_1.Helper.isNumber(limit));
        }
        let res = sourceString.split(separator, limit);
        environment.setVariable(resultVar, res);
    }
}
exports.Split = Split;
