"use strict";
const Helper_1 = require("../../helpers/Helper");
class Return {
    getIdentifier() {
        return "return";
    }
    execute(environment, parameters) {
        Helper_1.Helper.assert(parameters.length == 0);
        environment.codeLineStack[environment.codeLineStack.length - 1] = Number.MAX_SAFE_INTEGER;
    }
}
exports.Return = Return;
