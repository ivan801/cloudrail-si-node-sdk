"use strict";
const Sandbox_1 = require("../Sandbox");
const VarAddress_1 = require("../VarAddress");
const Helper_1 = require("../../helpers/Helper");
class Get {
    getIdentifier() {
        return "get";
    }
    execute(environment, parameters) {
        Helper_1.Helper.assert(parameters.length >= 2 && parameters[0] instanceof VarAddress_1.VarAddress && parameters[1] instanceof VarAddress_1.VarAddress);
        let targetId = parameters[0];
        let containerIdParts = Sandbox_1.Sandbox.decodeVariableAddress(parameters[1]);
        for (let i = 2; i < parameters.length; i++) {
            containerIdParts.push(Helper_1.Helper.resolve(environment, parameters[i]));
        }
        environment.setVariable(targetId, environment.getVariable(containerIdParts));
    }
}
exports.Get = Get;
