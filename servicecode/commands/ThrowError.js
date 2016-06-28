"use strict";
const Helper_1 = require("../../helpers/Helper");
const Error_1 = require("../../types/Error");
class ThrowError {
    getIdentifier() {
        return "throwError";
    }
    execute(environment, parameters) {
        Helper_1.Helper.assert(parameters.length < 2);
        let errorObj = new Error_1.Error();
        if (parameters.length > 0) {
            errorObj = Helper_1.Helper.resolve(environment, parameters[0]);
        }
        environment.thrownError = errorObj;
    }
}
exports.ThrowError = ThrowError;
