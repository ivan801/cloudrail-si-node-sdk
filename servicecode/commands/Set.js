"use strict";
const Sandbox_1 = require("../Sandbox");
const VarAddress_1 = require("../VarAddress");
const Helper_1 = require("../../helpers/Helper");
class Set {
    getIdentifier() {
        return "set";
    }
    execute(environment, parameters) {
        Helper_1.Helper.assert(parameters.length >= 2 && parameters[0] instanceof VarAddress_1.VarAddress);
        let targetVar = parameters[0];
        let value = Helper_1.Helper.resolve(environment, parameters[1]);
        let targetVarParts = Sandbox_1.Sandbox.decodeVariableAddress(targetVar);
        for (let i = 2; i < parameters.length; i++) {
            targetVarParts.push(Helper_1.Helper.resolve(environment, parameters[i]));
        }
        environment.setVariable(targetVarParts, value);
    }
}
exports.Set = Set;
