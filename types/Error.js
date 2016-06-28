"use strict";
const SandboxObject_1 = require("./SandboxObject");
const ErrorType_1 = require("./ErrorType");
class Error extends SandboxObject_1.SandboxObject {
    constructor(message = "", type) {
        super();
        this.message = message;
        this.type = type;
    }
    getMessage() {
        return this.message;
    }
    setMessage(message) {
        this.message = message;
    }
    getType() {
        return this.type;
    }
    setType(type) {
        this.type = type;
    }
    toString() {
        return this.message;
    }
    getErrorType() {
        return ErrorType_1.ErrorType.getValueOf(this.type);
    }
}
exports.Error = Error;
