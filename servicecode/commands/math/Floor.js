"use strict";
const Helper_1 = require("../../../helpers/Helper");
const VarAddress_1 = require("../../VarAddress");
class Floor {
    getIdentifier() {
        return "math.floor";
    }
    execute(environment, parameters) {
        Helper_1.Helper.assert(parameters.length == 2 && parameters[0] instanceof VarAddress_1.VarAddress);
        let resultVar = parameters[0];
        let input = Helper_1.Helper.resolve(environment, parameters[1]);
        Helper_1.Helper.assert(Helper_1.Helper.isNumber(input));
        let res = Math.floor(input);
        environment.setVariable(resultVar, res);
    }
}
exports.Floor = Floor;
