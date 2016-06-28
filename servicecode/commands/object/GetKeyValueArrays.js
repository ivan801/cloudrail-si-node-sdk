"use strict";
const Helper_1 = require("../../../helpers/Helper");
const VarAddress_1 = require("../../VarAddress");
class GetKeyValueArrays {
    getIdentifier() {
        return "object.getKeyValueArrays";
    }
    execute(environment, parameters) {
        Helper_1.Helper.assert(parameters.length === 3 && parameters[0] instanceof VarAddress_1.VarAddress && parameters[1] instanceof VarAddress_1.VarAddress && parameters[2] instanceof VarAddress_1.VarAddress);
        let resultKeysVar = parameters[0];
        let resultValuesVar = parameters[1];
        let container = Helper_1.Helper.resolve(environment, parameters[2]);
        let keys = Object.keys(container);
        let values = [];
        for (let key of keys)
            values.push(container[key]);
        environment.setVariable(resultKeysVar, keys);
        environment.setVariable(resultValuesVar, values);
    }
}
exports.GetKeyValueArrays = GetKeyValueArrays;
