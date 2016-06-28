"use strict";
const Interpreter_1 = require("../servicecode/Interpreter");
const Sandbox_1 = require("../servicecode/Sandbox");
const ErrorType_1 = require("../types/ErrorType");
const DetailErrors_1 = require("../errors/DetailErrors");
const InitSelfTest_1 = require("../servicecode/InitSelfTest");
const SERVICE_CODE = {
    "sendMJEMail": [
        ["callFunc", "validateParameters", "$P0", "$P1", "$P2", "$P3", "$P4", "$P5", "$P6"],
        ["create", "$L1", "Object"],
        ["set", "$L1.url", "https://api.mailjet.com/v3/send"],
        ["set", "$L1.method", "POST"],
        ["create", "$L1.requestHeaders", "Object"],
        ["set", "$L1.requestHeaders.Content-Type", "application/json"],
        ["create", "$L7", "String"],
        ["string.concat", "$L7", "$P0.clientID", ":", "$P0.clientSecret"],
        ["string.base64encode", "$L7", "$L7"],
        ["string.concat", "$L1.requestHeaders.Authorization", "Basic ", "$L7"],
        ["create", "$L2", "Object"],
        ["set", "$L2.FromEmail", "$P1"],
        ["set", "$L2.FromName", "$P2"],
        ["create", "$L3", "Array"],
        ["set", "$L3", "$P3"],
        ["callFunc", "processAddresses", "$P0", "$L20", "$L3"],
        ["set", "$L2.To", "$L20"],
        ["set", "$L2.Subject", "$P4"],
        ["if!=than", "$P5", null, 1],
        ["set", "$L2.Text-part", "$P5"],
        ["if!=than", "$P6", null, 1],
        ["set", "$L2.Html-part", "$P6"],
        ["create", "$L4", "Array"],
        ["set", "$L4", "$P7"],
        ["if==than", "$L4", null, 1],
        ["set", "$L2.Cc", null],
        ["if!=than", "$L4", null, 2],
        ["callFunc", "processAddresses", "$P0", "$L21", "$L4"],
        ["set", "$L2.Cc", "$L21"],
        ["create", "$L5", "Array"],
        ["set", "$L5", "$P8"],
        ["if==than", "$L5", null, 1],
        ["set", "$L2.Bcc", null],
        ["if!=than", "$L5", null, 2],
        ["callFunc", "processAddresses", "$P0", "$L23", "$L5"],
        ["set", "$L2.Bcc", "$L23"],
        ["json.stringify", "$L6", "$L2"],
        ["debug.out", "JSON Body: ", "$L6"],
        ["stream.stringToStream", "$L1.requestBody", "$L6"],
        ["create", "$L8", "Object"],
        ["http.requestCall", "$L8", "$L1"],
        ["create", "$L9", "String"],
        ["stream.streamToString", "$L9", "$L8.responseBody"],
        ["debug.out", "$L9"]
    ],
    "buildRequestObject": [
        ["create", "$L0", "Object"],
        ["set", "$L0", "application/json", "Content-Type"],
        ["create", "$P1", "Object"],
        ["set", "$P1.url", "https://api.mailjet.com/v3/send"],
        ["set", "$P1.method", "POST"],
        ["set", "$P1.requestHeaders", "$L0"]
    ],
    "processAddresses": [
        ["create", "$L0", "Number"],
        ["size", "$L0", "$P2"],
        ["create", "$L1", "Number", 0],
        ["create", "$L2", "String", ""],
        ["if<than", "$L1", "$L0", 5],
        ["create", "$L3", "String"],
        ["get", "$L3", "$P2", "$L1"],
        ["string.concat", "$L2", "$L2", "$L3", ","],
        ["math.add", "$L1", "$L1", 1],
        ["jumpRel", -6],
        ["size", "$L4", "$L2"],
        ["if!=than", "$L4", 0, 2],
        ["math.add", "$L4", "$L4", -1],
        ["string.substr", "$L2", "$L2", 0, "$L4"],
        ["set", "$P1", "$L2"]
    ],
    "validateParameters": [
        ["if==than", "$P1", null, 2],
        ["create", "$L0", "Error", "A valid sender address has to be provided.", "IllegalArgument"],
        ["throwError", "$L0"],
        ["if==than", "$P2", null, 2],
        ["create", "$L0", "Error", "A sender name has to be provided.", "IllegalArgument"],
        ["throwError", "$L0"],
        ["if==than", "$P3", null, 2],
        ["create", "$L0", "Error", "At least one address of a recipient has to be provided.", "IllegalArgument"],
        ["throwError", "$L0"],
        ["if==than", "$P4", null, 2],
        ["create", "$L0", "Error", "A subject has to be provided.", "IllegalArgument"],
        ["throwError", "$L0"],
        ["if==than", "$P5", null, 6],
        ["if==than", "$P6", null, 2],
        ["create", "$L0", "Error", "Either textBody or htmlBody has to be set (or both).", "IllegalArgument"],
        ["throwError", "$L0"],
        ["if==than", "$P6", "", 2],
        ["create", "$L0", "Error", "Either textBody or htmlBody has to be set (or both).", "IllegalArgument"],
        ["throwError", "$L0"],
        ["if==than", "$P5", "", 6],
        ["if==than", "$P6", null, 2],
        ["create", "$L0", "Error", "Either textBody or htmlBody has to be set (or both).", "IllegalArgument"],
        ["throwError", "$L0"],
        ["if==than", "$P6", "", 2],
        ["create", "$L0", "Error", "Either textBody or htmlBody has to be set (or both).", "IllegalArgument"],
        ["throwError", "$L0"],
        ["if==than", "$P1", "", 2],
        ["create", "$L0", "Error", "A valid sender address has to be provided.", "IllegalArgument"],
        ["throwError", "$L0"],
        ["if==than", "$P2", "", 2],
        ["create", "$L0", "Error", "A sender name has to be provided.", "IllegalArgument"],
        ["throwError", "$L0"],
        ["if==than", "$P4", "", 2],
        ["create", "$L0", "Error", "A subject has to be provided.", "IllegalArgument"],
        ["throwError", "$L0"],
        ["size", "$L1", "$P3"],
        ["if==than", "$L1", 0, 2],
        ["create", "$L0", "Error", "At least one address of a recipient has to be provided.", "IllegalArgument"],
        ["throwError", "$L0"]
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
class MailJet {
    constructor(redirectReceiver, clientID, clientSecret) {
        this.interpreterStorage = {};
        this.persistentStorage = [{}];
        this.instanceDependencyStorage = {
            redirectReceiver: redirectReceiver
        };
        InitSelfTest_1.InitSelfTest.initTest("MailJet");
        this.interpreterStorage["clientID"] = clientID;
        this.interpreterStorage["clientSecret"] = clientSecret;
        let ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        if (SERVICE_CODE["init"]) {
            ip.callFunctionSync("init", this.interpreterStorage);
        }
    }
    sendEmail(fromAddress, fromName, toAddresses, subject, textBody, htmlBody, ccAddresses, bccAddresses, callback) {
        let ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("sendMJEMail", this.interpreterStorage, fromAddress, fromName, toAddresses, subject, textBody, htmlBody, ccAddresses, bccAddresses).then(() => {
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
exports.MailJet = MailJet;
