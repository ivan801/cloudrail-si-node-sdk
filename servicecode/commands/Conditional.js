"use strict";
const Helper_1 = require("../../helpers/Helper");
class Conditional {
    constructor(identifier, compareFunction, typeCheck) {
        this.identifier = identifier;
        this.compareFunction = compareFunction;
        this.typeCheck = typeCheck;
    }
    getIdentifier() {
        return this.identifier;
    }
    execute(environment, parameters) {
        Helper_1.Helper.assert(parameters.length == 3);
        let aObj = parameters[0];
        let bObj = parameters[1];
        let relativeEndPos = Helper_1.Helper.resolve(environment, parameters[2]);
        Helper_1.Helper.assert(Helper_1.Helper.isNumber(relativeEndPos));
        let compare = environment.compareVariables(aObj, bObj, this.identifier, this.typeCheck);
        if (!this.compareFunction(compare))
            environment.incrementCurrentServiceCodeLine(relativeEndPos);
    }
}
exports.Conditional = Conditional;
