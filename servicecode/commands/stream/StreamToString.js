"use strict";
const Helper_1 = require("../../../helpers/Helper");
const VarAddress_1 = require("../../VarAddress");
class StreamToString {
    getIdentifier() {
        return "stream.streamToString";
    }
    execute(environment, parameters) {
        Helper_1.Helper.assert(parameters.length == 2 && parameters[0] instanceof VarAddress_1.VarAddress);
        let resultVar = parameters[0];
        let source = Helper_1.Helper.resolve(environment, parameters[1]);
        Helper_1.Helper.assert(Helper_1.Helper.isStream(source));
        return Helper_1.Helper.dumpStream(source).then((str) => {
            environment.setVariable(resultVar, str);
        });
    }
}
exports.StreamToString = StreamToString;
