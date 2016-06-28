"use strict";
const VarAddress_1 = require("../VarAddress");
const Helper_1 = require("../../helpers/Helper");
class Size {
    getIdentifier() {
        return "size";
    }
    execute(environment, parameters) {
        Helper_1.Helper.assert(parameters.length === 2 && parameters[0] instanceof VarAddress_1.VarAddress && parameters[1] instanceof VarAddress_1.VarAddress);
        let targetVar = parameters[0];
        let container = environment.getVariable(parameters[1]);
        let size = -1;
        if (Helper_1.Helper.isArray(container) || Helper_1.Helper.isString(container))
            size = container.length;
        else if (Helper_1.Helper.isObject(container))
            size = Object.keys(container).length;
        environment.setVariable(targetVar, size);
    }
}
exports.Size = Size;
