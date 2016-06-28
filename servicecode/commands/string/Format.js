"use strict";
const Helper_1 = require("../../../helpers/Helper");
const VarAddress_1 = require("../../VarAddress");
const InternalError_1 = require("../../../errors/InternalError");
class Format {
    getIdentifier() {
        return "string.format";
    }
    execute(environment, parameters) {
        Helper_1.Helper.assert(parameters.length === 3 && parameters[0] instanceof VarAddress_1.VarAddress);
        let resultVar = parameters[0];
        let format = Helper_1.Helper.resolve(environment, parameters[1]);
        Helper_1.Helper.assert(Helper_1.Helper.isString(format));
        let element = Helper_1.Helper.resolve(environment, parameters[2]);
        let res;
        switch (format) {
            case "%d":
                res = "" + element;
                break;
            case "%02x":
            case "%02X":
                res = toTwoCharHex(element);
                break;
            default:
                throw new InternalError_1.InternalError("Format with unsupported parameters attempted");
        }
        environment.setVariable(resultVar, res);
    }
}
exports.Format = Format;
function toTwoCharHex(element) {
    let hex = element.toString(16).toUpperCase();
    if (hex.length === 1)
        hex = "0" + hex;
    return hex;
}
