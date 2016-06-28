"use strict";
const Sandbox_1 = require("../Sandbox");
const VarAddress_1 = require("../VarAddress");
const Helper_1 = require("../../helpers/Helper");
const InternalError_1 = require("../../errors/InternalError");
class Push {
    getIdentifier() {
        return "push";
    }
    execute(environment, parameters) {
        Helper_1.Helper.assert(parameters.length >= 2 && parameters[0] instanceof VarAddress_1.VarAddress);
        let targetVar = parameters[0];
        let value = Helper_1.Helper.resolve(environment, parameters[1]);
        let targetVarParts = Sandbox_1.Sandbox.decodeVariableAddress(targetVar);
        for (let i = 2; i < parameters.length; i++) {
            targetVarParts.push(Helper_1.Helper.resolve(environment, parameters[i]));
        }
        let container = environment.getVariable(targetVarParts);
        if (Helper_1.Helper.isArray(container)) {
            container.push(value);
        }
        else if (Helper_1.Helper.isObject(container)) {
            container[container.length] = value;
        }
        else if (Helper_1.Helper.isString(container)) {
            environment.setVariable(targetVarParts, container.concat(value.toString()));
        }
        else
            throw new InternalError_1.InternalError("Push only works for lists, objects and strings");
    }
}
exports.Push = Push;
