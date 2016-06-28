"use strict";
const Helper_1 = require("../../../helpers/Helper");
const VarAddress_1 = require("../../VarAddress");
class MathCombine {
    constructor(identifier, combineFunction) {
        this.identifier = identifier;
        this.combineFunction = combineFunction;
    }
    getIdentifier() {
        return this.identifier;
    }
    execute(environment, parameters) {
        Helper_1.Helper.assert(parameters.length >= 2 && parameters[0] instanceof VarAddress_1.VarAddress);
        let resultVar = parameters[0];
        let elements = [];
        for (let i = 1; i < parameters.length; i++) {
            let resolved = Helper_1.Helper.resolve(environment, parameters[i]);
            if (Helper_1.Helper.isString(resolved))
                resolved = parseFloat(resolved);
            Helper_1.Helper.assert(Helper_1.Helper.isNumber(resolved));
            elements.push(resolved);
        }
        let res = this.combineFunction(elements);
        environment.setVariable(resultVar, res);
    }
}
exports.MathCombine = MathCombine;
