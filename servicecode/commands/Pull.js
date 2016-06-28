"use strict";
const Sandbox_1 = require("../Sandbox");
const VarAddress_1 = require("../VarAddress");
const Helper_1 = require("../../helpers/Helper");
const InternalError_1 = require("../../errors/InternalError");
class Pull {
    getIdentifier() {
        return "pull";
    }
    execute(environment, parameters) {
        Helper_1.Helper.assert(parameters.length >= 2 && parameters[0] instanceof VarAddress_1.VarAddress && parameters[1] instanceof VarAddress_1.VarAddress);
        let targetVar = parameters[0];
        let containerVar = parameters[1];
        let containerVarParts = Sandbox_1.Sandbox.decodeVariableAddress(containerVar);
        for (let i = 2; i < parameters.length; i++) {
            containerVarParts.push(Helper_1.Helper.resolve(environment, parameters[i]));
        }
        let container = environment.getVariable(containerVarParts);
        let entry;
        if (Helper_1.Helper.isArray(container)) {
            entry = container.pop();
        }
        else if (Helper_1.Helper.isString(container)) {
            entry = container[container.length - 1];
            environment.setVariable(containerVarParts, container.slice(0, container.length - 1));
        }
        else
            throw new InternalError_1.InternalError("Pull only works for lists and strings");
        environment.setVariable(targetVar, entry);
    }
}
exports.Pull = Pull;
