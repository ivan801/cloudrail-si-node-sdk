"use strict";
const Helper_1 = require("../../helpers/Helper");
const VarAddress_1 = require("../VarAddress");
class CallFunc {
    getIdentifier() {
        return "callFunc";
    }
    execute(environment, parameters) {
        Helper_1.Helper.assert(parameters.length >= 1 && (Helper_1.Helper.isString(parameters[0]) || parameters[0] instanceof VarAddress_1.VarAddress));
        let functionName = Helper_1.Helper.resolve(environment, parameters[0]);
        if (!Helper_1.Helper.isString(functionName)) {
            functionName = functionName.toString();
        }
        let functionParameters = [];
        for (let i = 1; i < parameters.length; i++) {
            functionParameters.push(Helper_1.Helper.resolve(environment, parameters[i], false));
        }
        environment.callFunction(functionName, functionParameters);
    }
}
exports.CallFunc = CallFunc;
