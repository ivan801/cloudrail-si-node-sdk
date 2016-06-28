"use strict";
const VarAddress_1 = require("../VarAddress");
const Helper_1 = require("../../helpers/Helper");
const InternalError_1 = require("../../errors/InternalError");
class Clone {
    getIdentifier() {
        return "clone";
    }
    execute(environment, parameters) {
        Helper_1.Helper.assert(parameters.length == 2 && parameters[0] instanceof VarAddress_1.VarAddress);
        let targetId = parameters[0];
        let sourceObj = Helper_1.Helper.resolve(environment, parameters[1]);
        throw new InternalError_1.InternalError("Clone not implemented");
    }
}
exports.Clone = Clone;
