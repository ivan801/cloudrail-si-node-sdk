"use strict";
const Interpreter_1 = require("../servicecode/Interpreter");
const Sandbox_1 = require("../servicecode/Sandbox");
const ErrorType_1 = require("../types/ErrorType");
const DetailErrors_1 = require("../errors/DetailErrors");
const InitSelfTest_1 = require("../servicecode/InitSelfTest");
const SERVICE_CODE = {
    "Authenticating:login": [
        ["callFunc", "checkAuthentication", "$P0"]
    ],
    "Authenticating:logout": [
        ["delete", "$S0.oauthToken"],
        ["delete", "$S0.oauthTokenSecret"],
        ["set", "$P0.userInfo", null]
    ],
    "Profile:getIdentifier": [
        ["callFunc", "User:getInfo", "$P0"],
        ["string.concat", "$P1", "twitter-", "$P0.userInfo.screenname"]
    ],
    "Profile:getFullName": [
        ["callFunc", "User:getInfo", "$P0"],
        ["set", "$P1", "$P0.userInfo.name"]
    ],
    "Profile:getEmail": [
        ["callFunc", "User:getInfo", "$P0"],
        ["set", "$P1", "$P0.userInfo.email"]
    ],
    "Profile:getGender": [
        ["callFunc", "User:getInfo", "$P0"],
        ["set", "$P1", "$P0.userInfo.gender"]
    ],
    "Profile:getDescription": [
        ["callFunc", "User:getInfo", "$P0"],
        ["set", "$P1", "$P0.userInfo.description"]
    ],
    "Profile:getDateOfBirth": [
        ["callFunc", "User:getInfo", "$P0"],
        ["set", "$P1", "$P0.userInfo.dateOfBirth"]
    ],
    "Profile:getLocale": [
        ["callFunc", "User:getInfo", "$P0"],
        ["set", "$P1", "$P0.userInfo.locale"]
    ],
    "Profile:getPictureURL": [
        ["callFunc", "User:getInfo", "$P0"],
        ["set", "$P1", "$P0.userInfo.pictureURL"]
    ],
    "User:getInfo": [
        ["if!=than", "$P0.userInfo", null, 4],
        ["create", "$L0", "Date"],
        ["math.add", "$L0", "$L0.Time", -10000],
        ["if>than", "$P0.userInfo.lastUpdate", "$L0", 1],
        ["return"],
        ["callFunc", "User:sendInfoRequest", "$P0"]
    ],
    "User:sendInfoRequest": [
        ["callFunc", "checkAuthentication", "$P0"],
        ["create", "$L0", "Object"],
        ["set", "$L0.method", "GET"],
        ["set", "$L0.url", "https://api.twitter.com/1.1/account/verify_credentials.json"],
        ["create", "$L1", "Array"],
        ["push", "$L1", "oauth_consumer_key"],
        ["push", "$L1", "oauth_nonce"],
        ["push", "$L1", "oauth_signature_method"],
        ["push", "$L1", "oauth_timestamp"],
        ["push", "$L1", "oauth_token"],
        ["push", "$L1", "oauth_version"],
        ["callFunc", "oAuth1:signRequest", "$P0", "$L0", "$L1"],
        ["http.requestCall", "$L1", "$L0"],
        ["json.parse", "$L2", "$L1.responseBody"],
        ["callFunc", "validateResponse", "$P0", "$L1"],
        ["create", "$P0.userInfo", "Object"],
        ["create", "$L3", "Date"],
        ["set", "$P0.userInfo.lastUpdate", "$L3.Time"],
        ["set", "$P0.userInfo.screenname", "$L2.screen_name"],
        ["set", "$P0.userInfo.name", "$L2.name"],
        ["set", "$P0.userInfo.email", null],
        ["set", "$P0.userInfo.gender", null],
        ["set", "$P0.userInfo.description", "$L2.description"],
        ["create", "$P0.userInfo.dateOfBirth", "DateOfBirth"],
        ["set", "$P0.userInfo.locale", "$L2.lang"],
        ["set", "$P0.userInfo.pictureURL", "$L2.profile_image_url"]
    ],
    "oAuth1:signRequest": [
        ["if==than", "$P1.requestHeaders", null, 1],
        ["create", "$P1.requestHeaders", "Object"],
        ["create", "$L0", "Object"],
        ["set", "$L0.oauth_consumer_key", "$P0.clientID"],
        ["callFunc", "oAuth1:generateNonce", "$L0.oauth_nonce"],
        ["set", "$L0.oauth_signature_method", "HMAC-SHA1"],
        ["create", "$L1", "Date"],
        ["math.multiply", "$L1", "$L1.Time", 0.001],
        ["math.floor", "$L1", "$L1"],
        ["string.format", "$L0.oauth_timestamp", "%d", "$L1"],
        ["set", "$L0.oauth_token", "$S0.oauthToken"],
        ["set", "$L0.oauth_version", "1.0"],
        ["string.urlEncode", "$L2", "$P1.url"],
        ["string.concat", "$L1", "$P1.method", "&", "$L2", "&"],
        ["set", "$L2", ""],
        ["set", "$L3", 0],
        ["size", "$L4", "$P2"],
        ["if<than", "$L3", "$L4", 12],
        ["get", "$L5", "$P2", "$L3"],
        ["if==than", "$L5", "oauth_callback", 1],
        ["set", "$L0.oauth_callback", "$P0.redirectUri"],
        ["get", "$L6", "$L0", "$L5"],
        ["if>than", "$L3", 0, 1],
        ["string.concat", "$L2", "$L2", "&"],
        ["if==than", "$L6", null, 1],
        ["get", "$L6", "$P3", "$L5"],
        ["string.urlEncode", "$L6", "$L6"],
        ["string.concat", "$L2", "$L2", "$L5", "=", "$L6"],
        ["math.add", "$L3", "$L3", 1],
        ["jumpRel", -13],
        ["string.urlEncode", "$L2", "$L2"],
        ["string.concat", "$L1", "$L1", "$L2"],
        ["set", "$L2", "$S0.oauthTokenSecret"],
        ["if==than", "$L2", null, 1],
        ["set", "$L2", ""],
        ["string.concat", "$L2", "$P0.clientSecret", "&", "$L2"],
        ["crypt.hmac.sha1", "$L2", "$L2", "$L1"],
        ["array.uint8ToBase64", "$L2", "$L2"],
        ["string.urlEncode", "$L2", "$L2"],
        ["set", "$L0.oauth_signature", "$L2"],
        ["set", "$L2", "OAuth "],
        ["if!=than", "$L0.oauth_callback", null, 2],
        ["string.urlEncode", "$L3", "$L0.oauth_callback"],
        ["string.concat", "$L2", "$L2", "oauth_callback", "=\"", "$L3", "\"", ", "],
        ["string.concat", "$L2", "$L2", "oauth_consumer_key", "=\"", "$L0.oauth_consumer_key", "\""],
        ["string.concat", "$L2", "$L2", ", ", "oauth_nonce", "=\"", "$L0.oauth_nonce", "\""],
        ["string.concat", "$L2", "$L2", ", ", "oauth_signature", "=\"", "$L0.oauth_signature", "\""],
        ["string.concat", "$L2", "$L2", ", ", "oauth_signature_method", "=\"", "$L0.oauth_signature_method", "\""],
        ["string.concat", "$L2", "$L2", ", ", "oauth_timestamp", "=\"", "$L0.oauth_timestamp", "\""],
        ["if!=than", "$L0.oauth_token", null, 1],
        ["string.concat", "$L2", "$L2", ", ", "oauth_token", "=\"", "$L0.oauth_token", "\""],
        ["string.concat", "$L2", "$L2", ", ", "oauth_version", "=\"", "$L0.oauth_version", "\""],
        ["set", "$P1.requestHeaders.Authorization", "$L2"]
    ],
    "oAuth1:generateNonce": [
        ["create", "$L0", "Date"],
        ["string.format", "$L0", "%d", "$L0.Time"],
        ["hash.md5", "$L0", "$L0"],
        ["size", "$L1", "$L0"],
        ["set", "$L2", 0],
        ["set", "$P0", ""],
        ["get", "$L3", "$L0", "$L2"],
        ["string.format", "$L4", "%02x", "$L3"],
        ["string.concat", "$P0", "$P0", "$L4"],
        ["math.add", "$L2", "$L2", 1],
        ["if>=than", "$L2", "$L1", -5]
    ],
    "checkAuthentication": [
        ["if!=than", "$S0.oauthToken", null, 2],
        ["if!=than", "$S0.oauthTokenSecret", null, 1],
        ["return"],
        ["callFunc", "authenticate", "$P0"]
    ],
    "authenticate": [
        ["create", "$L0", "Object"],
        ["set", "$L0.method", "POST"],
        ["set", "$L0.url", "https://api.twitter.com/oauth/request_token"],
        ["create", "$L1", "Array"],
        ["push", "$L1", "oauth_callback"],
        ["push", "$L1", "oauth_consumer_key"],
        ["push", "$L1", "oauth_nonce"],
        ["push", "$L1", "oauth_signature_method"],
        ["push", "$L1", "oauth_timestamp"],
        ["push", "$L1", "oauth_version"],
        ["callFunc", "oAuth1:signRequest", "$P0", "$L0", "$L1"],
        ["http.requestCall", "$L1", "$L0"],
        ["if!=than", "$L1.code", 200, 3],
        ["stream.streamToString", "$L2", "$L1.responseBody"],
        ["create", "$L3", "Error", "$L2", "Authentication"],
        ["throwError", "$L3"],
        ["stream.streamToString", "$L2", "$L1.responseBody"],
        ["string.split", "$L2", "$L2", "&"],
        ["set", "$L3", 0],
        ["size", "$L4", "$L2"],
        ["create", "$L0", "Object"],
        ["if<than", "$L3", "$L4", 8],
        ["get", "$L5", "$L2", "$L3"],
        ["string.split", "$L6", "$L5", "=", 2],
        ["get", "$L7", "$L6", 0],
        ["get", "$L8", "$L6", 1],
        ["string.urlDecode", "$L8", "$L8"],
        ["set", "$L0", "$L8", "$L7"],
        ["math.add", "$L3", "$L3", 1],
        ["jumpRel", -9],
        ["string.concat", "$L3", "https://api.twitter.com/oauth/authenticate?oauth_token=", "$L0.oauth_token"],
        ["awaitCodeRedirect", "$L3", "$L3", "oauth_token", "oauth_verifier"],
        ["set", "$S0.oauthToken", "$L3.oauth_token"],
        ["create", "$L4", "Object"],
        ["set", "$L4.method", "POST"],
        ["set", "$L4.url", "https://api.twitter.com/oauth/access_token"],
        ["create", "$L4.requestHeaders", "Object"],
        ["set", "$L4.requestHeaders.Content-Type", "application/x-www-form-urlencoded"],
        ["string.urlEncode", "$L5", "$L3.oauth_verifier"],
        ["string.concat", "$L5", "oauth_verifier=", "$L5"],
        ["stream.stringToStream", "$L4.requestBody", "$L5"],
        ["create", "$L6", "Object"],
        ["set", "$L6.oauth_verifier", "$L3.oauth_verifier"],
        ["create", "$L7", "Array"],
        ["push", "$L7", "oauth_callback"],
        ["push", "$L7", "oauth_consumer_key"],
        ["push", "$L7", "oauth_nonce"],
        ["push", "$L7", "oauth_signature_method"],
        ["push", "$L7", "oauth_timestamp"],
        ["push", "$L7", "oauth_verifier"],
        ["push", "$L7", "oauth_version"],
        ["callFunc", "oAuth1:signRequest", "$P0", "$L4", "$L7", "$L6"],
        ["http.requestCall", "$L9", "$L4"],
        ["if!=than", "$L9.code", 200, 3],
        ["stream.streamToString", "$L10", "$L9.responseBody"],
        ["create", "$L11", "Error", "$L10", "Authentication"],
        ["throwError", "$L11"],
        ["stream.streamToString", "$L10", "$L9.responseBody"],
        ["string.split", "$L10", "$L10", "&"],
        ["set", "$L11", 0],
        ["size", "$L12", "$L10"],
        ["create", "$L13", "Object"],
        ["if<than", "$L11", "$L12", 8],
        ["get", "$L14", "$L10", "$L11"],
        ["string.split", "$L15", "$L14", "=", 2],
        ["get", "$L16", "$L15", 0],
        ["get", "$L17", "$L15", 1],
        ["string.urlDecode", "$L17", "$L17"],
        ["set", "$L13", "$L17", "$L16"],
        ["math.add", "$L11", "$L11", 1],
        ["jumpRel", -9],
        ["debug.out", "$L13"],
        ["string.urlDecode", "$S0.oauthToken", "$L13.oauth_token"],
        ["string.urlDecode", "$S0.oauthTokenSecret", "$L13.oauth_token_secret"]
    ],
    "validateResponse": [
        ["if==than", "$P1.code", 200, 1],
        ["return"],
        ["stream.streamToString", "$L2", "$P1.responseBody"],
        ["if>=than", "$P1.code", 400, 2],
        ["if<=than", "$P1.code", 509, 1],
        ["create", "$L3", "Error", "$L2", "Http"],
        ["if==than", "$P1.code", 400, 1],
        ["create", "$L3", "Error", "$L2", "Http"],
        ["if==than", "$P1.code", 401, 1],
        ["create", "$L3", "Error", "$L2", "Authentication"],
        ["if==than", "$P1.code", 404, 1],
        ["create", "$L3", "Error", "$L2", "NotFound"],
        ["if==than", "$P1.code", 503, 1],
        ["create", "$L3", "Error", "$L2", "ServiceUnavailable"],
        ["throwError", "$L3"]
    ]
};
class Twitter {
    constructor(redirectReceiver, clientID, clientSecret, redirectUri) {
        this.interpreterStorage = {};
        this.persistentStorage = [{}];
        this.instanceDependencyStorage = {
            redirectReceiver: redirectReceiver
        };
        InitSelfTest_1.InitSelfTest.initTest("Twitter");
        this.interpreterStorage["clientID"] = clientID;
        this.interpreterStorage["clientSecret"] = clientSecret;
        this.interpreterStorage["redirectUri"] = redirectUri;
        let ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        if (SERVICE_CODE["init"]) {
            ip.callFunctionSync("init", this.interpreterStorage);
        }
    }
    getIdentifier(callback) {
        let ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("Profile:getIdentifier", this.interpreterStorage, null).then(() => {
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
            res = ip.getParameter(1);
            if (callback != null && typeof callback === "function")
                callback(undefined, res);
        }, err => {
            if (callback != null && typeof callback === "function")
                callback(err);
        });
    }
    getFullName(callback) {
        let ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("Profile:getFullName", this.interpreterStorage, null).then(() => {
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
            res = ip.getParameter(1);
            if (callback != null && typeof callback === "function")
                callback(undefined, res);
        }, err => {
            if (callback != null && typeof callback === "function")
                callback(err);
        });
    }
    getEmail(callback) {
        let ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("Profile:getEmail", this.interpreterStorage, null).then(() => {
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
            res = ip.getParameter(1);
            if (callback != null && typeof callback === "function")
                callback(undefined, res);
        }, err => {
            if (callback != null && typeof callback === "function")
                callback(err);
        });
    }
    getGender(callback) {
        let ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("Profile:getGender", this.interpreterStorage, null).then(() => {
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
            res = ip.getParameter(1);
            if (callback != null && typeof callback === "function")
                callback(undefined, res);
        }, err => {
            if (callback != null && typeof callback === "function")
                callback(err);
        });
    }
    getDescription(callback) {
        let ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("Profile:getDescription", this.interpreterStorage, null).then(() => {
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
            res = ip.getParameter(1);
            if (callback != null && typeof callback === "function")
                callback(undefined, res);
        }, err => {
            if (callback != null && typeof callback === "function")
                callback(err);
        });
    }
    getDateOfBirth(callback) {
        let ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("Profile:getDateOfBirth", this.interpreterStorage, null).then(() => {
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
            res = ip.getParameter(1);
            if (callback != null && typeof callback === "function")
                callback(undefined, res);
        }, err => {
            if (callback != null && typeof callback === "function")
                callback(err);
        });
    }
    getLocale(callback) {
        let ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("Profile:getLocale", this.interpreterStorage, null).then(() => {
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
            res = ip.getParameter(1);
            if (callback != null && typeof callback === "function")
                callback(undefined, res);
        }, err => {
            if (callback != null && typeof callback === "function")
                callback(err);
        });
    }
    getPictureURL(callback) {
        let ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("Profile:getPictureURL", this.interpreterStorage, null).then(() => {
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
            res = ip.getParameter(1);
            if (callback != null && typeof callback === "function")
                callback(undefined, res);
        }, err => {
            if (callback != null && typeof callback === "function")
                callback(err);
        });
    }
    login(callback) {
        let ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("Authenticating:login", this.interpreterStorage).then(() => {
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
    logout(callback) {
        let ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("Authenticating:logout", this.interpreterStorage).then(() => {
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
exports.Twitter = Twitter;
