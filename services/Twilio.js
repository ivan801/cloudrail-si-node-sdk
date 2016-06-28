"use strict";
const Interpreter_1 = require("../servicecode/Interpreter");
const Sandbox_1 = require("../servicecode/Sandbox");
const ErrorType_1 = require("../types/ErrorType");
const DetailErrors_1 = require("../errors/DetailErrors");
const InitSelfTest_1 = require("../servicecode/InitSelfTest");
const SERVICE_CODE = {
    "sendSMSTW": [
        ["callFunc", "validateUserInput", "$P0", "$P1", "$P2", "$P3"],
        ["create", "$L0", "Object"],
        ["set", "$L0.method", "POST"],
        ["string.concat", "$L0.url", "https://api.twilio.com/2010-04-01/Accounts/", "$P0.accountSid", "/Messages.json"],
        ["string.urlEncode", "$P1", "$P1"],
        ["string.urlEncode", "$P2", "$P2"],
        ["string.urlEncode", "$P3", "$P3"],
        ["string.concat", "$L1", "From=", "$P1", "&To=", "$P2", "&Body=", "$P3"],
        ["stream.stringToStream", "$L3", "$L1"],
        ["set", "$L0.requestBody", "$L3"],
        ["create", "$L0.requestHeaders", "Object"],
        ["string.concat", "$L4", "$P0.accountSid", ":", "$P0.authToken"],
        ["string.base64encode", "$L5", "$L4"],
        ["string.concat", "$L0.requestHeaders.Authorization", "Basic ", "$L5"],
        ["set", "$L0.requestHeaders.Content-Type", "application/x-www-form-urlencoded"],
        ["create", "$L6", "Object"],
        ["http.requestCall", "$L6", "$L0"],
        ["callFunc", "validateResponse", "$P0", "$L6"],
        ["stream.streamToString", "$L7", "$L6.responseBody"],
        ["debug.out", "$L7"]
    ],
    "validateUserInput": [
        ["if==than", "$P1", null, 2],
        ["create", "$L1", "Error", "One of the arguments is 'null'. You need to assign a value to it.", "IllegalArgument"],
        ["throwError", "$L1"],
        ["if==than", "$P2", null, 2],
        ["create", "$L1", "Error", "One of the arguments is 'null'. You need to assign a value to it.", "IllegalArgument"],
        ["throwError", "$L1"],
        ["if==than", "$P3", null, 2],
        ["create", "$L1", "Error", "One of the arguments is 'null'. You need to assign a value to it.", "IllegalArgument"],
        ["throwError", "$L1"],
        ["size", "$L2", "$P1"],
        ["if==than", "$L2", 0, 2],
        ["create", "$L1", "Error", "The 'From' number parameter is empty.", "IllegalArgument"],
        ["throwError", "$L1"],
        ["size", "$L2", "$P2"],
        ["if==than", "$L2", 0, 2],
        ["create", "$L1", "Error", "The 'To' number parameter is empty.", "IllegalArgument"],
        ["throwError", "$L1"],
        ["size", "$L2", "$P3"],
        ["if==than", "$L2", 0, 2],
        ["create", "$L1", "Error", "The message is empty.", "IllegalArgument"],
        ["throwError", "$L1"],
        ["size", "$L2", "$P1"],
        ["if<than", "$L2", 21, 4],
        ["string.lastIndexOf", "$L0", "$P1", "+"],
        ["if!=than", "$L0", 0, 2],
        ["create", "$L1", "Error", "The 'From' phone number or ID is wrong. It should be either a phone number in E.164 format (e.g. +16175551212) or a MessagingServiceSid (e.g. MGec9516eb5a051a6b2901748b925a5a43).", "IllegalArgument"],
        ["throwError", "$L1"],
        ["if>than", "$L2", 34, 2],
        ["create", "$L1", "Error", "The 'From' phone number or ID is wrong. It should be either a phone number in E.164 format (e.g. +16175551212) or a MessagingServiceSid (e.g. MGec9516eb5a051a6b2901748b925a5a43).", "IllegalArgument"],
        ["throwError", "$L1"],
        ["string.lastIndexOf", "$L0", "$P2", "+"],
        ["if!=than", "$L0", 0, 2],
        ["create", "$L1", "Error", "The 'To' phone number isn't in E.164 format. Example: +16175551212", "IllegalArgument"],
        ["throwError", "$L1"],
        ["size", "$L2", "$P2"],
        ["if>than", "$L2", 16, 2],
        ["create", "$L1", "Error", "The 'To' phone number is too big, it should have maximum 15 digits. Example: +16175551212", "IllegalArgument"],
        ["throwError", "$L1"],
        ["size", "$L2", "$P3"],
        ["if>than", "$L2", 1600, 2],
        ["create", "$L1", "Error", "The length of the message exceeds the 1600 allowed characters.", "IllegalArgument"],
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
class Twilio {
    constructor(redirectReceiver, accountSid, authToken) {
        this.interpreterStorage = {};
        this.persistentStorage = [{}];
        this.instanceDependencyStorage = {
            redirectReceiver: redirectReceiver
        };
        InitSelfTest_1.InitSelfTest.initTest("Twilio");
        this.interpreterStorage["accountSid"] = accountSid;
        this.interpreterStorage["authToken"] = authToken;
        let ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        if (SERVICE_CODE["init"]) {
            ip.callFunctionSync("init", this.interpreterStorage);
        }
    }
    sendSMS(fromName, toNumber, content, callback) {
        let ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("sendSMSTW", this.interpreterStorage, fromName, toNumber, content).then(() => {
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
exports.Twilio = Twilio;
