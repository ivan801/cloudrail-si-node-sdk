"use strict";
const Helper_1 = require("../../../helpers/Helper");
class Out {
    getIdentifier() {
        return "debug.out";
    }
    execute(environment, parameters) {
        Helper_1.Helper.assert(parameters.length >= 1);
        let str = "";
        for (let parameter of parameters) {
            let part = Helper_1.Helper.resolve(environment, parameter);
            if (Helper_1.Helper.isArray(part) || Helper_1.Helper.isObject(part))
                part = JSON.stringify(part);
            str += part.toString();
        }
        console.log(str);
    }
}
exports.Out = Out;
