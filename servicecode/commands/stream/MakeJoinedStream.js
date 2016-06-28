"use strict";
const Helper_1 = require("../../../helpers/Helper");
const VarAddress_1 = require("../../VarAddress");
const SequenceReadableStream_1 = require("../../../helpers/SequenceReadableStream");
class MakeJoinedStream {
    getIdentifier() {
        return "stream.makeJoinedStream";
    }
    execute(environment, parameters) {
        Helper_1.Helper.assert(parameters.length >= 3 && parameters[0] instanceof VarAddress_1.VarAddress);
        let resultVar = parameters[0];
        let source = Helper_1.Helper.resolve(environment, parameters[1]);
        Helper_1.Helper.assert(Helper_1.Helper.isStream(source));
        let streamStack = [];
        for (let i = parameters.length - 1; i > 0; i--) {
            let stream = Helper_1.Helper.resolve(environment, parameters[i]);
            Helper_1.Helper.assert(Helper_1.Helper.isStream(stream));
            streamStack.push(stream);
        }
        let result = joinStreams(streamStack);
        environment.setVariable(resultVar, result);
    }
}
exports.MakeJoinedStream = MakeJoinedStream;
function joinStreams(streams) {
    if (streams.length > 1) {
        return new SequenceReadableStream_1.SequenceReadableStream(streams.pop(), joinStreams(streams));
    }
    else {
        return streams.pop();
    }
}
