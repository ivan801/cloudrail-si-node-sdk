"use strict";
const Interpreter_1 = require("../servicecode/Interpreter");
const Sandbox_1 = require("../servicecode/Sandbox");
const ErrorType_1 = require("../types/ErrorType");
const DetailErrors_1 = require("../errors/DetailErrors");
const InitSelfTest_1 = require("../servicecode/InitSelfTest");
const SERVICE_CODE = {
    "sendEmail": [
        ["callFunc", "checkMandatory", "$P0", "$P1", "fromAddress"],
        ["callFunc", "checkMandatory", "$P0", "$P2", "fromName"],
        ["callFunc", "checkMandatory", "$P0", "$P3", "toAddresses"],
        ["callFunc", "checkMandatory", "$P0", "$P4", "subject"],
        ["callFunc", "checkEmptyList", "$P0", "$P3", "toAddresses"],
        ["callFunc", "checkEmpty", "$P0", "$P1", "fromAddress"],
        ["callFunc", "checkEmpty", "$P0", "$P2", "fromName"],
        ["callFunc", "checkEmpty", "$P0", "$P4", "subject"],
        ["if==than", "$P5", null, 6],
        ["if==than", "$P6", null, 2],
        ["create", "$L26", "Error", "Either a textBody or a htmlBody must be provided!", "IllegalArgument"],
        ["throwError", "$L26"],
        ["if==than", "$P6", "", 2],
        ["create", "$L26", "Error", "Either a textBody or a htmlBody must be provided!", "IllegalArgument"],
        ["throwError", "$L26"],
        ["if==than", "$P5", "", 6],
        ["if==than", "$P6", null, 2],
        ["create", "$L26", "Error", "Either a textBody or a htmlBody must be provided!", "IllegalArgument"],
        ["throwError", "$L26"],
        ["if==than", "$P6", "", 2],
        ["create", "$L26", "Error", "Either a textBody or a htmlBody must be provided!", "IllegalArgument"],
        ["throwError", "$L26"],
        ["create", "$L0", "Object"],
        ["set", "$L0.method", "POST"],
        ["create", "$L2", "String"],
        ["string.concat", "$L2", "from=", "$P1"],
        ["create", "$L3", "String"],
        ["string.concat", "$L3", "fromname=", "$P2", "&"],
        ["create", "$L4", "Array"],
        ["set", "$L4", "$P3"],
        ["create", "$L5", "Number"],
        ["size", "$L5", "$L4"],
        ["create", "$L6", "Number", 0],
        ["create", "$L7", "String"],
        ["if<than", "$L6", "$L5", 5],
        ["create", "$L8", "String"],
        ["get", "$L8", "$L4", "$L6"],
        ["math.add", "$L6", "$L6", 1],
        ["string.concat", "$L7", "$L7", "to[]=", "$L8", "&"],
        ["jumpRel", -6],
        ["create", "$L9", "String"],
        ["string.concat", "$L9", "subject=", "$P4", "&"],
        ["create", "$L10", "String"],
        ["if!=than", "$P5", null, 2],
        ["string.urlEncode", "$L10", "$P5"],
        ["string.concat", "$L10", "text=", "$L10", "&"],
        ["if==than", "$P5", null, 1],
        ["string.concat", "$L10", ""],
        ["create", "$L11", "String"],
        ["if!=than", "$P6", null, 1],
        ["string.urlEncode", "$L11", "$P6"],
        ["string.concat", "$L11", "html=", "$L11", "&"],
        ["if==than", "$P6", null, 1],
        ["string.concat", "$L11", ""],
        ["create", "$L12", "Array"],
        ["set", "$L12", "$P7"],
        ["create", "$L15", "String"],
        ["set", "$L15", ""],
        ["if!=than", "$L12", null, 9],
        ["create", "$L13", "Number"],
        ["size", "$L13", "$L12"],
        ["create", "$L14", "Number", 0],
        ["if<than", "$L14", "$L13", 5],
        ["create", "$L16", "String"],
        ["get", "$L16", "$L12", "$L14"],
        ["math.add", "$L14", "$L14", 1],
        ["string.concat", "$L15", "$L15", "cc[]=", "$L16", "&"],
        ["jumpRel", -6],
        ["create", "$L17", "Array"],
        ["set", "$L17", "$P8"],
        ["create", "$L20", "String"],
        ["set", "$L20", ""],
        ["if!=than", "$L17", null, 9],
        ["create", "$L18", "Number"],
        ["size", "$L18", "$L17"],
        ["create", "$L19", "Number", 0],
        ["if<than", "$L19", "$L18", 5],
        ["create", "$L21", "String"],
        ["get", "$L21", "$L17", "$L19"],
        ["math.add", "$L19", "$L19", 1],
        ["string.concat", "$L20", "$L20", "bcc[]=", "$L21", "&"],
        ["jumpRel", -6],
        ["create", "$L22", "String"],
        ["string.concat", "$L22", "api_user=", "$P0.username", "&"],
        ["create", "$L23", "String"],
        ["string.concat", "$L23", "api_key=", "$P0.password", "&"],
        ["create", "$L24", "String"],
        ["string.concat", "$L24", "https://api.sendgrid.com/api/mail.send.json?", "$L20", "$L15", "$L10", "$L11", "$L7", "$L22", "$L23", "$L9", "$L3", "$L2"],
        ["set", "$L0.url", "$L24"],
        ["debug.out", "url: ", "$L0.url"],
        ["create", "$L25", "Object"],
        ["http.requestCall", "$L25", "$L0"],
        ["callFunc", "validateResponse", "$P0", "$L25"]
    ],
    "checkMandatory": [
        ["if==than", "$P1", null, 3],
        ["string.concat", "$L1", "Field ", "$P2", " is mandatory"],
        ["create", "$L0", "Error", "$L1", "IllegalArgument"],
        ["throwError", "$L0"]
    ],
    "checkEmptyList": [
        ["size", "$L0", "$P1"],
        ["if==than", "$L0", 0, 3],
        ["string.concat", "$L2", "The list ", "$P2", " cannot be empty"],
        ["create", "$L1", "Error", "$L2", "IllegalArgument"],
        ["throwError", "$L1"]
    ],
    "checkEmpty": [
        ["if==than", "$P1", "", 3],
        ["string.concat", "$L0", "Field ", "$P2", " is mandatory"],
        ["create", "$L1", "Error", "$L0", "IllegalArgument"],
        ["throwError", "$L1"]
    ],
    "validateResponse": [
        ["if>=than", "$P1.code", 400, 27],
        ["if>=than", "$P1.code", 500, 8],
        ["if!=than", "$P1.code", 503, 3],
        ["string.concat", "$L10", "The returned code was ", "$P1.code", " ", "$P1.message"],
        ["create", "$L3", "Error", "$L10", "Http"],
        ["throwError", "$L3"],
        ["if==than", "$P1.code", 503, 3],
        ["string.concat", "$L10", "The reurned code was ", "$P1.code", " ", "$P1.message"],
        ["create", "$L3", "Error", "$L10", "ServiceUnavailable"],
        ["throwError", "$L3"],
        ["json.parse", "$L0", "$P1.responseBody"],
        ["set", "$L1", "$L0.error"],
        ["set", "$L2", "$L1.message"],
        ["if==than", "$P1.code", 401, 2],
        ["create", "$L3", "Error", "$L2", "Authentication"],
        ["throwError", "$L3"],
        ["if==than", "$P1.code", 400, 2],
        ["create", "$L3", "Error", "$L2", "Http"],
        ["throwError", "$L3"],
        ["if>=than", "$P1.code", 402, 5],
        ["if<=than", "$P1.code", 509, 4],
        ["if!=than", "$P1.code", 503, 3],
        ["if!=than", "$P1.code", 404, 2],
        ["create", "$L3", "Error", "$L2", "Http"],
        ["throwError", "$L3"],
        ["if==than", "$P1.code", 404, 2],
        ["create", "$L3", "Error", "$L2", "NotFound"],
        ["throwError", "$L3"]
    ]
};
class SendGrid {
    constructor(redirectReceiver, username, password) {
        this.interpreterStorage = {};
        this.persistentStorage = [{}];
        this.instanceDependencyStorage = {
            redirectReceiver: redirectReceiver
        };
        InitSelfTest_1.InitSelfTest.initTest("SendGrid");
        this.interpreterStorage["username"] = username;
        this.interpreterStorage["password"] = password;
        let ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        if (SERVICE_CODE["init"]) {
            ip.callFunctionSync("init", this.interpreterStorage);
        }
    }
    sendEmail(fromAddress, fromName, toAddresses, subject, textBody, htmlBody, ccAddresses, bccAddresses, callback) {
        let ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("sendEmail", this.interpreterStorage, fromAddress, fromName, toAddresses, subject, textBody, htmlBody, ccAddresses, bccAddresses).then(() => {
            let error = ip.sandbox.thrownError;
            if (error != null) {
                switch (error.getErrorType()) {
                    case ErrorType_1.ErrorType.ILLEGAL_ARGUMENT:
                        throw new DetailErrors_1.IllegalArgumentError(error.toString());
                    case ErrorType_1.ErrorType.AUTHENTICATION:
                        throw new DetailErrors_1.AuthenticationError(error.toString());
                    case ErrorType_1.ErrorType.NOT_FOUND:
                        throw new DetailErrors_1.NotFoundError(error.toString());
                    case ErrorType_1.ErrorType.HTTP:
                        throw new DetailErrors_1.HttpError(error.toString());
                    case ErrorType_1.ErrorType.SERVICE_UNAVAILABLE:
                        throw new DetailErrors_1.ServiceUnavailableError(error.toString());
                    default:
                        throw new Error(error.toString());
                }
            }
        }).then(() => {
            let res;
            if (callback != null && typeof callback === "function")
                callback(undefined, res);
        }, err => {
            if (callback != null && typeof callback === "function")
                callback(err);
        });
    }
    saveAsString() {
        let ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        return ip.saveAsString();
    }
    loadAsString(savedState) {
        let sandbox = new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage);
        let ip = new Interpreter_1.Interpreter(sandbox);
        ip.loadAsString(savedState);
        this.persistentStorage = sandbox.persistentStorage;
    }
    resumeLogin(executionState, callback) {
        let sandbox = new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage);
        sandbox.loadStateFromString(executionState);
        let ip = new Interpreter_1.Interpreter(sandbox);
        ip.resumeFunction("Authenticating:login", this.interpreterStorage).then(() => callback(), err => callback(err));
    }
}
exports.SendGrid = SendGrid;
