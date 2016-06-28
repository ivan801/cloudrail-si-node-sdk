"use strict";
const Helper_1 = require("../../../helpers/Helper");
const VarAddress_1 = require("../../VarAddress");
const Base64Encode_1 = require("../string/Base64Encode");
class Uint8ToBase64 {
    getIdentifier() {
        return "array.uint8ToBase64";
    }
    execute(environment, parameters) {
        Helper_1.Helper.assert(parameters.length >= 2 && parameters[0] instanceof VarAddress_1.VarAddress && parameters[1] instanceof VarAddress_1.VarAddress);
        let resultVar = parameters[0];
        let sourceArray = Helper_1.Helper.resolve(environment, parameters[1]);
        let urlSafe = false;
        if (parameters.length > 2)
            urlSafe = !!Helper_1.Helper.resolve(environment, parameters[2]);
        Helper_1.Helper.assert(Helper_1.Helper.isArray(sourceArray));
        let buf = Buffer["from"] ? Buffer["from"](sourceArray) : new Buffer(sourceArray);
        let dataString = buf.toString("binary");
        let base64String = Base64Encode_1.Base64Encode.encode(dataString, false, urlSafe);
        environment.setVariable(resultVar, base64String);
    }
}
exports.Uint8ToBase64 = Uint8ToBase64;
