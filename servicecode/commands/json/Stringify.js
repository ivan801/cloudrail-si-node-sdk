"use strict";
const Helper_1 = require("../../../helpers/Helper");
const VarAddress_1 = require("../../VarAddress");
class Stringify {
    getIdentifier() {
        return "json.stringify";
    }
    execute(environment, parameters) {
        Helper_1.Helper.assert(parameters.length == 2 && parameters[0] instanceof VarAddress_1.VarAddress);
        let resultVar = parameters[0];
        let input = Helper_1.Helper.resolve(environment, parameters[1]);
        let str = JSON.stringify(input);
        environment.setVariable(resultVar, str);
    }
}
exports.Stringify = Stringify;
