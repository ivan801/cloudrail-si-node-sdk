"use strict";
const Helper_1 = require("../../../helpers/Helper");
const VarAddress_1 = require("../../VarAddress");
const LimitedReadableStream_1 = require("../../../helpers/LimitedReadableStream");
class MakeLimitedStream {
    getIdentifier() {
        return "stream.makeLimitedStream";
    }
    execute(environment, parameters) {
        Helper_1.Helper.assert(parameters.length == 3 && parameters[0] instanceof VarAddress_1.VarAddress);
        let resultVar = parameters[0];
        let source = Helper_1.Helper.resolve(environment, parameters[1]);
        let limit = Helper_1.Helper.resolve(environment, parameters[2]);
        Helper_1.Helper.assert(Helper_1.Helper.isStream(source) && Helper_1.Helper.isNumber(limit));
        let resStream = new LimitedReadableStream_1.LimitedReadableStream(source, limit);
        environment.setVariable(resultVar, resStream);
    }
}
exports.MakeLimitedStream = MakeLimitedStream;
