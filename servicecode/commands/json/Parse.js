"use strict";
const Helper_1 = require("../../../helpers/Helper");
const VarAddress_1 = require("../../VarAddress");
class Parse {
    getIdentifier() {
        return "json.parse";
    }
    execute(environment, parameters) {
        Helper_1.Helper.assert(parameters.length == 2 && parameters[0] instanceof VarAddress_1.VarAddress);
        let resultVar = parameters[0];
        let input = Helper_1.Helper.resolve(environment, parameters[1]);
        Helper_1.Helper.assert(Helper_1.Helper.isStream(input) || Helper_1.Helper.isString(input));
        if (Helper_1.Helper.isStream(input)) {
            return Helper_1.Helper.dumpStream(input).then(stringInput => {
                Helper_1.Helper.assert(Helper_1.Helper.isString(stringInput));
                let obj = parse(stringInput);
                environment.setVariable(resultVar, obj);
            });
        }
        else {
            let obj = parse(input);
            environment.setVariable(resultVar, obj);
        }
    }
}
exports.Parse = Parse;
function parse(input) {
    return JSON.parse(input, (key, value) => {
        if (Helper_1.Helper.isBoolean(value))
            return value ? 1 : 0;
        else
            return value;
    });
}
