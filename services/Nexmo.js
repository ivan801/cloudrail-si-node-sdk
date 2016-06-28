"use strict";
const Interpreter_1 = require("../servicecode/Interpreter");
const Sandbox_1 = require("../servicecode/Sandbox");
const ErrorType_1 = require("../types/ErrorType");
const DetailErrors_1 = require("../errors/DetailErrors");
const InitSelfTest_1 = require("../servicecode/InitSelfTest");
const SERVICE_CODE = {
    "SendNexmoSMS": [
        ["callFunc", "validateUserInput", "$P0", "$P1", "$P2", "$P3"],
        ["create", "$L0", "Object"],
        ["create", "$L1", "Object"],
        ["create", "$L2", "Object"],
        ["create", "$L3", "String"],
        ["create", "$L4", "String"],
        ["string.urlEncode", "$L3", "$P3"],
        ["string.urlEncode", "$L5", "$P1"],
        ["string.concat", "$L0.url", "https://rest.nexmo.com/sms/json?api_key=", "$P0.clientID", "&api_secret=", "$P0.clientSecret", "&to=", "$P2", "&from=", "$L5", "&text=", "$L3"],
        ["set", "$L0.method", "POST"],
        ["set", "$L1.Content-Type", "application/x-www-form-urlencoded"],
        ["set", "$L1.Content-Length", "0"],
        ["set", "$L0.requestHeaders", "$L1"],
        ["debug.out", "$L0.url"],
        ["http.requestCall", "$L2", "$L0"],
        ["debug.out", "$L2"],
        ["callFunc", "checkError", "$P0", "$L2"]
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
        ["if>than", "$L2", 16, 2],
        ["create", "$L1", "Error", "The 'From' phone number is too big, it should have maximum 15 digits. Example: +16175551212", "IllegalArgument"],
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
    "checkError": [
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
        ["throwError", "$L3"],
        ["stream.streamToString", "$L11", "$P1.responseBody"],
        ["create", "$L12", "Object"],
        ["json.parse", "$L12", "$L11"],
        ["debug.out", "$L12"],
        ["set", "$L13", "$L12.messages.0.status"],
        ["set", "$L14", "$L12.messages.0.error-text"],
        ["debug.out", "$L13"],
        ["if!=than", "$L13", "0", 2],
        ["create", "$L15", "Error", "$L14", "Http"],
        ["throwError", "$L15"]
    ]
};
class Nexmo {
    constructor(redirectReceiver, clientID, clientSecret) {
        this.interpreterStorage = {};
        this.persistentStorage = [{}];
        this.instanceDependencyStorage = {
            redirectReceiver: redirectReceiver
        };
        InitSelfTest_1.InitSelfTest.initTest("Nexmo");
        this.interpreterStorage["clientID"] = clientID;
        this.interpreterStorage["clientSecret"] = clientSecret;
        let ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        if (SERVICE_CODE["init"]) {
            ip.callFunctionSync("init", this.interpreterStorage);
        }
    }
    sendSMS(fromName, toNumber, content, callback) {
        let ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("SendNexmoSMS", this.interpreterStorage, fromName, toNumber, content).then(() => {
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
exports.Nexmo = Nexmo;
