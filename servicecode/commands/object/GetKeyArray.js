"use strict";
const Helper_1 = require("../../../helpers/Helper");
const VarAddress_1 = require("../../VarAddress");
class GetKeyArray {
    getIdentifier() {
        return "object.getKeyArray";
    }
    execute(environment, parameters) {
        Helper_1.Helper.assert(parameters.length === 2 && parameters[0] instanceof VarAddress_1.VarAddress && parameters[1] instanceof VarAddress_1.VarAddress);
        let resultVar = parameters[0];
        let container = Helper_1.Helper.resolve(environment, parameters[1]);
        let keys = Object.keys(container);
        environment.setVariable(resultVar, keys);
    }
}
exports.GetKeyArray = GetKeyArray;
