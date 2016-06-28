"use strict";
const Sandbox_1 = require("../Sandbox");
const VarAddress_1 = require("../VarAddress");
const Helper_1 = require("../../helpers/Helper");
class Delete {
    getIdentifier() {
        return "delete";
    }
    execute(environment, parameters) {
        Helper_1.Helper.assert(parameters.length >= 1 && parameters[0] instanceof VarAddress_1.VarAddress);
        let targetId = parameters[0];
        let targetIdParts = Sandbox_1.Sandbox.decodeVariableAddress(targetId);
        for (let i = 1; i < parameters.length; i++) {
            targetIdParts.push(Helper_1.Helper.resolve(environment, parameters[i]));
        }
        environment.deleteVariable(targetIdParts);
    }
}
exports.Delete = Delete;
