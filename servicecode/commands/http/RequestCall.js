"use strict";
const Helper_1 = require("../../../helpers/Helper");
const VarAddress_1 = require("../../VarAddress");
class RequestCall {
    getIdentifier() {
        return "http.requestCall";
    }
    execute(environment, parameters) {
        Helper_1.Helper.assert(parameters.length == 2 && parameters[0] instanceof VarAddress_1.VarAddress && parameters[1] instanceof VarAddress_1.VarAddress);
        let resultVar = parameters[0];
        let options = Helper_1.Helper.resolve(environment, parameters[1]);
        let url = options["url"];
        let method = options["method"];
        let requestHeaders = options["requestHeaders"];
        let requestBody = options["requestBody"];
        Helper_1.Helper.assert(Helper_1.Helper.isString(url) && Helper_1.Helper.isString(method));
        Helper_1.Helper.assert(requestHeaders == null || Helper_1.Helper.isObject(requestHeaders));
        Helper_1.Helper.assert(requestBody == null || Helper_1.Helper.isStream(requestBody));
        return Helper_1.Helper.makeRequest(url, requestHeaders, requestBody, method).then(res => {
            let response = {
                code: res.statusCode,
                message: res.statusMessage,
                responseHeaders: capitalizeHeaders(res.headers),
                responseBody: res
            };
            environment.setVariable(resultVar, response);
        });
    }
}
exports.RequestCall = RequestCall;
function capitalizeHeaders(headers) {
    let ret = {};
    for (let key in headers) {
        if (headers.hasOwnProperty(key)) {
            ret[Helper_1.Helper.upperCaseFirstLetter(key)] = headers[key];
        }
    }
    return ret;
}
