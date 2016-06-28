"use strict";
const Helper_1 = require("../../../helpers/Helper");
const VarAddress_1 = require("../../VarAddress");
class Concat {
    getIdentifier() {
        return "string.concat";
    }
    execute(environment, parameters) {
        Helper_1.Helper.assert(parameters.length >= 2 && parameters[0] instanceof VarAddress_1.VarAddress);
        let resultVar = parameters[0];
        let str = "";
        for (let i = 1; i < parameters.length; i++) {
            let strPart = Helper_1.Helper.resolve(environment, parameters[i]);
            str += strPart.toString();
        }
        environment.setVariable(resultVar, str);
    }
}
exports.Concat = Concat;
