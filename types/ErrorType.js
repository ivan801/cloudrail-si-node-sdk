"use strict";
(function (ErrorType) {
    ErrorType[ErrorType["ILLEGAL_ARGUMENT"] = 0] = "ILLEGAL_ARGUMENT";
    ErrorType[ErrorType["AUTHENTICATION"] = 1] = "AUTHENTICATION";
    ErrorType[ErrorType["NOT_FOUND"] = 2] = "NOT_FOUND";
    ErrorType[ErrorType["HTTP"] = 3] = "HTTP";
    ErrorType[ErrorType["SERVICE_UNAVAILABLE"] = 4] = "SERVICE_UNAVAILABLE";
    ErrorType[ErrorType["NONE"] = 5] = "NONE";
})(exports.ErrorType || (exports.ErrorType = {}));
var ErrorType = exports.ErrorType;
var ErrorType;
(function (ErrorType) {
    function getValueOf(value) {
        switch (value) {
            case "IllegalArgument":
                return ErrorType.ILLEGAL_ARGUMENT;
            case "Authentication":
                return ErrorType.AUTHENTICATION;
            case "NotFound":
                return ErrorType.NOT_FOUND;
            case "Http":
                return ErrorType.HTTP;
            case "ServiceUnavailable":
                return ErrorType.SERVICE_UNAVAILABLE;
            default:
                return ErrorType.NONE;
        }
    }
    ErrorType.getValueOf = getValueOf;
})(ErrorType = exports.ErrorType || (exports.ErrorType = {}));
