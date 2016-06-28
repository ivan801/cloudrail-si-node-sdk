"use strict";
const Helper_1 = require("../../../helpers/Helper");
const VarAddress_1 = require("../../VarAddress");
class IndexOf {
    getIdentifier() {
        return "string.indexOf";
    }
    execute(environment, parameters) {
        Helper_1.Helper.assert((parameters.length === 3 || parameters.length === 4) && parameters[0] instanceof VarAddress_1.VarAddress);
        let resultVar = parameters[0];
        let sourceString = Helper_1.Helper.resolve(environment, parameters[1]);
        Helper_1.Helper.assert(Helper_1.Helper.isString(sourceString));
        let find = Helper_1.Helper.resolve(environment, parameters[2]);
        let fromIndex = 0;
        if (parameters.length === 4) {
            fromIndex = Helper_1.Helper.resolve(environment, parameters[3]);
            Helper_1.Helper.assert(Helper_1.Helper.isNumber(fromIndex));
            Helper_1.Helper.assert(fromIndex <= sourceString.length);
        }
        let res = sourceString.indexOf(find, fromIndex);
        environment.setVariable(resultVar, res);
    }
}
exports.IndexOf = IndexOf;
