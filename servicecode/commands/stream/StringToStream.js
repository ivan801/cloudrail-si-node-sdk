"use strict";
const Helper_1 = require("../../../helpers/Helper");
const VarAddress_1 = require("../../VarAddress");
class StringToStream {
    getIdentifier() {
        return "stream.stringToStream";
    }
    execute(environment, parameters) {
        Helper_1.Helper.assert(parameters.length == 2 && parameters[0] instanceof VarAddress_1.VarAddress);
        let resultVar = parameters[0];
        let source = Helper_1.Helper.resolve(environment, parameters[1]);
        Helper_1.Helper.assert(Helper_1.Helper.isString(source));
        environment.setVariable(resultVar, Helper_1.Helper.streamifyString(source));
    }
}
exports.StringToStream = StringToStream;
