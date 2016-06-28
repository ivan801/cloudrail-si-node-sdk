"use strict";
const Helper_1 = require("../../../helpers/Helper");
const VarAddress_1 = require("../../VarAddress");
class StringTransform {
    constructor(identifier, transform) {
        this.identifier = identifier;
        this.transform = transform;
    }
    getIdentifier() {
        return this.identifier;
    }
    execute(environment, parameters) {
        Helper_1.Helper.assert(parameters.length === 2 && parameters[0] instanceof VarAddress_1.VarAddress);
        let resultVar = parameters[0];
        let sourceString = Helper_1.Helper.resolve(environment, parameters[1]);
        Helper_1.Helper.assert(Helper_1.Helper.isString(sourceString));
        let res = this.transform(sourceString);
        environment.setVariable(resultVar, res);
    }
}
exports.StringTransform = StringTransform;
