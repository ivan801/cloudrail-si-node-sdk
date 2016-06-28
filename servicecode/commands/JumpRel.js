"use strict";
const Helper_1 = require("../../helpers/Helper");
class JumpRel {
    getIdentifier() {
        return "jumpRel";
    }
    execute(environment, parameters) {
        Helper_1.Helper.assert(parameters.length === 1);
        let relativeEndPos = Helper_1.Helper.resolve(environment, parameters[0]);
        Helper_1.Helper.assert(Helper_1.Helper.isNumber(relativeEndPos));
        environment.incrementCurrentServiceCodeLine(relativeEndPos);
    }
}
exports.JumpRel = JumpRel;
