"use strict";
const Interpreter_1 = require("../servicecode/Interpreter");
const Sandbox_1 = require("../servicecode/Sandbox");
const ErrorType_1 = require("../types/ErrorType");
const DetailErrors_1 = require("../errors/DetailErrors");
const InitSelfTest_1 = require("../servicecode/InitSelfTest");
const SERVICE_CODE = {
    "CloudStorage:getUserLogin": [
        ["callFunc", "User:about", "$P0"],
        ["set", "$P1", "$P0.userInfo.emailAddress"]
    ],
    "CloudStorage:getUserName": [
        ["callFunc", "User:about", "$P0"],
        ["set", "$P1", "$P0.userInfo.displayName"]
    ],
    "User:about": [
        ["if!=than", "$P0.userInfo", null, 4],
        ["create", "$L0", "Date"],
        ["math.add", "$L0", "$L0.Time", -1000],
        ["if>than", "$P0.userInfo.lastUpdate", "$L0", 1],
        ["return"],
        ["callFunc", "User:aboutRequest", "$P0"]
    ],
    "User:aboutRequest": [
        ["callFunc", "checkAuthentication", "$P0"],
        ["create", "$L0", "Object"],
        ["string.concat", "$L0.url", "https://api.box.com/2.0/users/me"],
        ["create", "$L0.requestHeaders", "Object"],
        ["string.concat", "$L0.requestHeaders.Authorization", "Bearer ", "$S0.access_token"],
        ["set", "$L0.method", "GET"],
        ["http.requestCall", "$L2", "$L0"],
        ["callFunc", "checkHttpErrors", "$P0", "$L2", "user about", 200],
        ["json.parse", "$L3", "$L2.responseBody"],
        ["create", "$P0.userInfo", "Object"],
        ["create", "$L4", "Date"],
        ["set", "$P0.userInfo.lastUpdate", "$L4.Time"],
        ["set", "$P0.userInfo.emailAddress", "$L3.login"],
        ["set", "$P0.userInfo.displayName", "$L3.name"]
    ],
    "CloudStorage:download": [
        ["callFunc", "validatePath", "$P0", "$P2"],
        ["callFunc", "checkAuthentication", "$P0"],
        ["callFunc", "resolvePath", "$P0", "$L0", "$P2"],
        ["create", "$L2", "Object"],
        ["string.concat", "$L3", "https://api.box.com/2.0/files/", "$L0.id", "/content"],
        ["set", "$L2.url", "$L3"],
        ["set", "$L2.method", "GET"],
        ["create", "$L2.requestHeaders", "Object"],
        ["string.concat", "$L2.requestHeaders.Authorization", "Bearer ", "$S0.access_token"],
        ["http.requestCall", "$L5", "$L2"],
        ["callFunc", "checkHttpErrors", "$P0", "$L5", "download request", 200],
        ["set", "$P1", "$L5.responseBody"]
    ],
    "CloudStorage:upload": [
        ["callFunc", "validatePath", "$P0", "$P1"],
        ["callFunc", "checkNull", "$P0", "$P2"],
        ["callFunc", "checkPositive", "$P0", "$P3"],
        ["callFunc", "checkAuthentication", "$P0"],
        ["if!=than", "$P4", 0, 4],
        ["callFunc", "resolvePath", "$P0", "$L20", "$P1", 1],
        ["if!=than", "$L20", null, 2],
        ["callFunc", "uploadOverwrite", "$P0", "$P1", "$P2", "$L20"],
        ["return"],
        ["string.lastIndexOf", "$L0", "$P1", "/"],
        ["math.add", "$L1", "$L0", 1],
        ["string.substring", "$L2", "$P1", "$L1"],
        ["string.substring", "$L3", "$P1", 0, "$L0"],
        ["if==than", "$L3", "", 1],
        ["set", "$L3", "/"],
        ["callFunc", "resolvePath", "$P0", "$L4", "$L3"],
        ["create", "$L5", "Object"],
        ["set", "$L5.name", "$L2"],
        ["create", "$L5.parent", "Object"],
        ["set", "$L5.parent.id", "$L4.id"],
        ["json.stringify", "$L6", "$L5"],
        ["string.lastIndexOf", "$L7", "$L2", "."],
        ["math.add", "$L7", "$L7", 1],
        ["string.substring", "$L7", "$L2", "$L7"],
        ["set", "$L14", "$L7"],
        ["getMimeType", "$L7", "$L7"],
        ["if==than", "$L7", null, 2],
        ["debug.out", "No MIME type could be guessed for file extension '", "$L14", "', using 'application/octet-stream' as default"],
        ["set", "$L7", "application/octet-stream"],
        ["set", "$L8", "72365asfa72138jas5685oksco05"],
        ["string.concat", "$L9", "--", "$L8", "\r\n", "Content-Disposition: form-data; name=\"attributes\"", "\r\n\r\n", "$L6", "\r\n", "--", "$L8", "\r\n", "Content-Disposition: form-data; name=\"file\"; filename=\"someName\"", "\r\n", "Content-Type: ", "$L7", "\r\n\r\n"],
        ["string.concat", "$L10", "\r\n--", "$L8", "--\r\n"],
        ["stream.stringToStream", "$L9", "$L9"],
        ["stream.stringToStream", "$L10", "$L10"],
        ["stream.makeJoinedStream", "$L11", "$L9", "$P2", "$L10"],
        ["create", "$L12", "Object"],
        ["set", "$L12.url", "https://upload.box.com/api/2.0/files/content"],
        ["set", "$L12.method", "POST"],
        ["set", "$L12.requestBody", "$L11"],
        ["create", "$L12.requestHeaders", "Object"],
        ["string.concat", "$L12.requestHeaders.Authorization", "Bearer ", "$S0.access_token"],
        ["string.concat", "$L12.requestHeaders.Content-Type", "multipart/form-data; boundary=", "$L8"],
        ["http.requestCall", "$L13", "$L12"],
        ["callFunc", "checkHttpErrors", "$P0", "$L13", "upload request", 201]
    ],
    "uploadOverwrite": [
        ["string.lastIndexOf", "$L0", "$P1", "/"],
        ["math.add", "$L1", "$L0", 1],
        ["string.substring", "$L2", "$P1", "$L1"],
        ["create", "$L5", "Object"],
        ["json.stringify", "$L6", "$L5"],
        ["string.lastIndexOf", "$L7", "$L2", "."],
        ["math.add", "$L7", "$L7", 1],
        ["string.substring", "$L7", "$L2", "$L7"],
        ["set", "$L14", "$L7"],
        ["getMimeType", "$L7", "$L7"],
        ["if==than", "$L7", null, 2],
        ["debug.out", "No MIME type could be guessed for file extension '", "$L14", "', using 'application/octet-stream' as default"],
        ["set", "$L7", "application/octet-stream"],
        ["set", "$L8", "72365asfa72138jas5685oksco05"],
        ["string.concat", "$L9", "--", "$L8", "\r\n", "Content-Disposition: form-data; name=\"attributes\"", "\r\n\r\n", "$L6", "\r\n", "--", "$L8", "\r\n", "Content-Disposition: form-data; name=\"file\"; filename=\"someName\"", "\r\n", "Content-Type: ", "$L7", "\r\n\r\n"],
        ["string.concat", "$L10", "\r\n--", "$L8", "--\r\n"],
        ["stream.stringToStream", "$L9", "$L9"],
        ["stream.stringToStream", "$L10", "$L10"],
        ["stream.makeJoinedStream", "$L11", "$L9", "$P2", "$L10"],
        ["create", "$L12", "Object"],
        ["string.concat", "$L12.url", "https://upload.box.com/api/2.0/files/", "$P3.id", "/content"],
        ["set", "$L12.method", "POST"],
        ["set", "$L12.requestBody", "$L11"],
        ["create", "$L12.requestHeaders", "Object"],
        ["string.concat", "$L12.requestHeaders.Authorization", "Bearer ", "$S0.access_token"],
        ["string.concat", "$L12.requestHeaders.Content-Type", "multipart/form-data; boundary=", "$L8"],
        ["http.requestCall", "$L13", "$L12"],
        ["callFunc", "checkHttpErrors", "$P0", "$L13", "upload request", 200]
    ],
    "CloudStorage:move": [
        ["callFunc", "validatePath", "$P0", "$P1"],
        ["callFunc", "validatePath", "$P0", "$P2"],
        ["callFunc", "checkAuthentication", "$P0"],
        ["callFunc", "resolvePath", "$P0", "$L0", "$P2", 1],
        ["if!=than", "$L0", null, 2],
        ["create", "$L0", "Error", "Destination already exists.", "Http"],
        ["throwError", "$L0"],
        ["callFunc", "resolvePath", "$P0", "$L0", "$P1"],
        ["string.lastIndexOf", "$L1", "$P2", "/"],
        ["math.add", "$L2", "$L1", 1],
        ["string.substring", "$L3", "$P2", "$L2"],
        ["string.substring", "$L4", "$P2", 0, "$L1"],
        ["if==than", "$L4", "", 1],
        ["set", "$L4", "/"],
        ["callFunc", "resolvePath", "$P0", "$L5", "$L4"],
        ["create", "$L6", "Object"],
        ["string.concat", "$L6.url", "https://api.box.com/2.0/", "$L0.type", "s/", "$L0.id"],
        ["set", "$L6.method", "PUT"],
        ["create", "$L6.requestHeaders", "Object"],
        ["string.concat", "$L6.requestHeaders.Authorization", "Bearer ", "$S0.access_token"],
        ["create", "$L7", "Object"],
        ["set", "$L7.name", "$L3"],
        ["create", "$L7.parent", "Object"],
        ["set", "$L7.parent.id", "$L5.id"],
        ["json.stringify", "$L7", "$L7"],
        ["stream.stringToStream", "$L6.requestBody", "$L7"],
        ["http.requestCall", "$L8", "$L6"],
        ["callFunc", "checkHttpErrors", "$P0", "$L8", "move request", 204]
    ],
    "CloudStorage:delete": [
        ["callFunc", "validatePath", "$P0", "$P1"],
        ["callFunc", "checkAuthentication", "$P0"],
        ["callFunc", "resolvePath", "$P0", "$L0", "$P1"],
        ["if==than", "$L0.type", "file", 2],
        ["string.concat", "$L1", "https://api.box.com/2.0/files/", "$L0.id"],
        ["jumpRel", 1],
        ["string.concat", "$L1", "https://api.box.com/2.0/folders/", "$L0.id", "?recursive=true"],
        ["create", "$L2", "Object"],
        ["set", "$L2.url", "$L1"],
        ["set", "$L2.method", "DELETE"],
        ["create", "$L2.requestHeaders", "Object"],
        ["string.concat", "$L2.requestHeaders.Authorization", "Bearer ", "$S0.access_token"],
        ["http.requestCall", "$L3", "$L2"],
        ["callFunc", "checkHttpErrors", "$P0", "$L3", "delete request", 204]
    ],
    "CloudStorage:copy": [
        ["callFunc", "validatePath", "$P0", "$P1"],
        ["callFunc", "validatePath", "$P0", "$P2"],
        ["callFunc", "checkAuthentication", "$P0"],
        ["callFunc", "resolvePath", "$P0", "$L0", "$P1"],
        ["string.lastIndexOf", "$L1", "$P2", "/"],
        ["math.add", "$L2", "$L1", 1],
        ["string.substring", "$L3", "$P2", "$L2"],
        ["string.substring", "$L4", "$P2", 0, "$L1"],
        ["if==than", "$L4", "", 1],
        ["set", "$L4", "/"],
        ["callFunc", "resolvePath", "$P0", "$L5", "$L4"],
        ["create", "$L6", "Object"],
        ["string.concat", "$L6.url", "https://api.box.com/2.0/", "$L0.type", "s/", "$L0.id", "/copy"],
        ["set", "$L6.method", "POST"],
        ["create", "$L6.requestHeaders", "Object"],
        ["string.concat", "$L6.requestHeaders.Authorization", "Bearer ", "$S0.access_token"],
        ["create", "$L7", "Object"],
        ["set", "$L7.name", "$L3"],
        ["create", "$L7.parent", "Object"],
        ["set", "$L7.parent.id", "$L5.id"],
        ["json.stringify", "$L7", "$L7"],
        ["stream.stringToStream", "$L6.requestBody", "$L7"],
        ["http.requestCall", "$L8", "$L6"],
        ["callFunc", "checkHttpErrors", "$P0", "$L8", "copy request", 201]
    ],
    "CloudStorage:createFolder": [
        ["callFunc", "validatePath", "$P0", "$P1"],
        ["callFunc", "checkAuthentication", "$P0"],
        ["string.lastIndexOf", "$L1", "$P1", "/"],
        ["math.add", "$L2", "$L1", 1],
        ["string.substring", "$L3", "$P1", "$L2"],
        ["string.substring", "$L4", "$P1", 0, "$L1"],
        ["if==than", "$L4", "", 1],
        ["set", "$L4", "/"],
        ["callFunc", "resolvePath", "$P0", "$L5", "$L4"],
        ["create", "$L6", "Object"],
        ["set", "$L6.url", "https://api.box.com/2.0/folders"],
        ["set", "$L6.method", "POST"],
        ["create", "$L6.requestHeaders", "Object"],
        ["string.concat", "$L6.requestHeaders.Authorization", "Bearer ", "$S0.access_token"],
        ["create", "$L7", "Object"],
        ["set", "$L7.name", "$L3"],
        ["create", "$L7.parent", "Object"],
        ["set", "$L7.parent.id", "$L5.id"],
        ["json.stringify", "$L7", "$L7"],
        ["stream.stringToStream", "$L6.requestBody", "$L7"],
        ["http.requestCall", "$L8", "$L6"],
        ["callFunc", "checkHttpErrors", "$P0", "$L8", "create folder request", 201]
    ],
    "CloudStorage:getMetadata": [
        ["callFunc", "validatePath", "$P0", "$P2"],
        ["if==than", "$P2", "/", 2],
        ["create", "$L2", "Error", "Root does not have MetaData", "IllegalArgument"],
        ["throwError", "$L2"],
        ["callFunc", "checkAuthentication", "$P0"],
        ["callFunc", "resolvePath", "$P0", "$L0", "$P2"],
        ["create", "$L2", "Object"],
        ["string.concat", "$L3", "https://api.box.com/2.0/", "$L0.type", "s/", "$L0.id"],
        ["set", "$L2.url", "$L3"],
        ["set", "$L2.method", "GET"],
        ["create", "$L2.requestHeaders", "Object"],
        ["string.concat", "$L2.requestHeaders.Authorization", "Bearer ", "$S0.access_token"],
        ["http.requestCall", "$L5", "$L2"],
        ["callFunc", "checkHttpErrors", "$P0", "$L5", "metadata retrieval", 200],
        ["json.parse", "$L4", "$L5.responseBody"],
        ["string.lastIndexOf", "$L6", "$P2", "/"],
        ["string.substring", "$L7", "$P2", 0, "$L6"],
        ["callFunc", "makeMeta", "$P0", "$P1", "$L4", "$L7"]
    ],
    "CloudStorage:getChildren": [
        ["callFunc", "validatePath", "$P0", "$P2"],
        ["callFunc", "checkAuthentication", "$P0"],
        ["callFunc", "resolvePath", "$P0", "$L0", "$P2"],
        ["create", "$L2", "Object"],
        ["string.concat", "$L3", "https://api.box.com/2.0/folders/", "$L0.id", "/items?fields=name,size,type"],
        ["set", "$L2.url", "$L3"],
        ["set", "$L2.method", "GET"],
        ["create", "$L2.requestHeaders", "Object"],
        ["string.concat", "$L2.requestHeaders.Authorization", "Bearer ", "$S0.access_token"],
        ["http.requestCall", "$L5", "$L2"],
        ["callFunc", "checkHttpErrors", "$P0", "$L5", "children metadata retrieval", 200],
        ["json.parse", "$L4", "$L5.responseBody"],
        ["size", "$L6", "$L4.entries"],
        ["set", "$L7", 0],
        ["create", "$P1", "Array"],
        ["if<than", "$L7", "$L6", 5],
        ["get", "$L8", "$L4.entries", "$L7"],
        ["callFunc", "makeMeta", "$P0", "$L9", "$L8", "$P2"],
        ["push", "$P1", "$L9"],
        ["math.add", "$L7", "$L7", 1],
        ["jumpRel", -6]
    ],
    "Authenticating:login": [
        ["callFunc", "checkAuthentication", "$P0"]
    ],
    "Authenticating:logout": [
        ["create", "$L0", "Object"],
        ["set", "$L0.url", "https://api.box.com/oauth2/revoke"],
        ["set", "$L0.method", "POST"],
        ["string.concat", "$L1", "client_id=", "$P0.clientId", "&client_secret=", "$P0.clientSecret", "&token=", "$S0.access_token"],
        ["stream.stringToStream", "$L0.requestBody", "$L1"],
        ["http.requestCall", "$L2", "$L0"],
        ["callFunc", "checkHttpErrors", "$P0", "$L2", "token revokation", 200],
        ["set", "$S0.access_token", null]
    ],
    "checkAuthentication": [
        ["create", "$L0", "Date"],
        ["if==than", "$S0.access_token", null, 2],
        ["callFunc", "authenticate", "$P0", "$P1", "accessToken"],
        ["return"],
        ["create", "$L1", "Date"],
        ["set", "$L1.time", "$S0.expires_in"],
        ["if<than", "$L1", "$L0", 1],
        ["callFunc", "authenticate", "$P0", "$P1", "refreshToken"]
    ],
    "authenticate": [
        ["create", "$L2", "String"],
        ["if==than", "$P2", "accessToken", 4],
        ["string.concat", "$L0", "https://account.box.com/api/oauth2/authorize?response_type=code&client_id=", "$P0.clientId", "&redirect_uri=", "$P0.redirectUri", "&state=", "$P0.state"],
        ["awaitCodeRedirect", "$L1", "$L0"],
        ["string.concat", "$L2", "client_id=", "$P0.clientId", "&redirect_uri=", "$P0.redirectUri", "&client_secret=", "$P0.clientSecret", "&code=", "$L1", "&grant_type=authorization_code"],
        ["jumpRel", 1],
        ["string.concat", "$L2", "client_id=", "$P0.clientId", "&redirect_uri=", "$P0.redirectUri", "&client_secret=", "$P0.clientSecret", "&refresh_token=", "$S0.refresh_token", "&grant_type=refresh_token"],
        ["stream.stringToStream", "$L3", "$L2"],
        ["create", "$L4", "Object"],
        ["set", "$L4", "application/x-www-form-urlencoded", "Content-Type"],
        ["create", "$L5", "Object"],
        ["set", "$L5.url", "https://api.box.com/oauth2/token"],
        ["set", "$L5.method", "POST"],
        ["set", "$L5.requestBody", "$L3"],
        ["set", "$L5.requestHeaders", "$L4"],
        ["http.requestCall", "$L6", "$L5"],
        ["if==than", "$P2", "accessToken", 2],
        ["callFunc", "checkHttpErrors", "$P0", "$L6", "authentication", 200],
        ["jumpRel", 3],
        ["if>=than", "$L6.code", 400, 2],
        ["callFunc", "authenticate", "$P0", "$P1", "accessToken"],
        ["return"],
        ["stream.streamToString", "$L7", "$L6.responseBody"],
        ["json.parse", "$L8", "$L7"],
        ["set", "$S0.access_token", "$L8.access_token"],
        ["set", "$S0.refresh_token", "$L8.refresh_token"],
        ["create", "$L10", "Date"],
        ["math.multiply", "$L9", "$L8.expires_in", 1000],
        ["math.add", "$L9", "$L9", "$L10.time", -60000],
        ["set", "$S0.expires_in", "$L9"]
    ],
    "resolvePath": [
        ["if==than", "$P2", "/", 4],
        ["create", "$P1", "Object"],
        ["set", "$P1.id", "0"],
        ["set", "$P1.type", "folder"],
        ["return"],
        ["string.substring", "$L0", "$P2", 1],
        ["callFunc", "resolvePathRelative", "$P0", "$P1", "$L0", "0", "$P3"]
    ],
    "resolvePathRelative": [
        ["string.indexOf", "$L0", "$P2", "/"],
        ["if!=than", "$L0", -1, 2],
        ["string.substring", "$L1", "$P2", 0, "$L0"],
        ["jumpRel", 1],
        ["set", "$L1", "$P2"],
        ["create", "$L2", "Object"],
        ["string.concat", "$L3", "https://api.box.com/2.0/folders/", "$P3", "/items?fields=name"],
        ["set", "$L2.url", "$L3"],
        ["set", "$L2.method", "GET"],
        ["create", "$L2.requestHeaders", "Object"],
        ["string.concat", "$L2.requestHeaders.Authorization", "Bearer ", "$S0.access_token"],
        ["http.requestCall", "$L5", "$L2"],
        ["callFunc", "checkHttpErrors", "$P0", "$L5", "path resolving", 200],
        ["json.parse", "$L4", "$L5.responseBody"],
        ["callFunc", "searchEntry", "$P0", "$L6", "$L4.entries", "$L1"],
        ["if==than", "$L6", null, 5],
        ["if!=than", "$P4", null, 2],
        ["set", "$P1", null],
        ["return"],
        ["create", "$L9", "Error", "Path does not point to an existing element", "NotFound"],
        ["throwError", "$L9"],
        ["if==than", "$L0", -1, 2],
        ["set", "$P1", "$L6"],
        ["return"],
        ["math.add", "$L7", "$L0", 1],
        ["string.substring", "$L8", "$P2", "$L7"],
        ["callFunc", "resolvePathRelative", "$P0", "$P1", "$L8", "$L6.id", "$P4"]
    ],
    "searchEntry": [
        ["size", "$L0", "$P2"],
        ["set", "$L1", 0],
        ["if<than", "$L1", "$L0", 8],
        ["get", "$L2", "$P2", "$L1"],
        ["if==than", "$L2.name", "$P3", 4],
        ["create", "$P1", "Object"],
        ["set", "$P1.id", "$L2.id"],
        ["set", "$P1.type", "$L2.type"],
        ["return"],
        ["math.add", "$L1", "$L1", 1],
        ["jumpRel", -9]
    ],
    "checkHttpErrors": [
        ["if!=than", "$P1.code", "$P3", 20],
        ["json.parse", "$L0", "$P1.responseBody"],
        ["set", "$L2", "$L0.message"],
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
        ["if==than", "$P1.code", 503, 2],
        ["create", "$L3", "Error", "$L2", "ServiceUnavailable"],
        ["throwError", "$L3"],
        ["if==than", "$P1.code", 404, 2],
        ["create", "$L3", "Error", "$L2", "NotFound"],
        ["throwError", "$L3"]
    ],
    "makeMeta": [
        ["create", "$P1", "CloudMetaData"],
        ["set", "$P1.name", "$P2.name"],
        ["if==than", "$P2.type", "folder", 2],
        ["set", "$P1.folder", 1],
        ["jumpRel", 2],
        ["set", "$P1.folder", 0],
        ["set", "$P1.size", "$P2.size"],
        ["if==than", "$P3", "/", 2],
        ["string.concat", "$P1.path", "$P3", "$P2.name"],
        ["return"],
        ["string.concat", "$P1.path", "$P3", "/", "$P2.name"]
    ],
    "validatePath": [
        ["if==than", "$P1", null, 2],
        ["create", "$L0", "Error", "Path shouldn't be null", "IllegalArgument"],
        ["throwError", "$L0"],
        ["if==than", "$P1", "", 2],
        ["create", "$L0", "Error", "Path should start with '/'.", "IllegalArgument"],
        ["throwError", "$L0"],
        ["create", "$L0", "String"],
        ["string.substr", "$L0", "$P1", 0, 1],
        ["if!=than", "$L0", "/", 2],
        ["create", "$L0", "Error", "Path should start with '/'.", "IllegalArgument"],
        ["throwError", "$L0"],
        ["create", "$L1", "Number"],
        ["size", "$L1", "$P1"],
        ["math.add", "$L1", "$L1", -1],
        ["if!=than", "$L1", 0, 5],
        ["create", "$L2", "String"],
        ["string.substr", "$L2", "$P1", "$L1", 1],
        ["if==than", "$L2", "/", 2],
        ["create", "$L3", "Error", "Path should not end with '/'.", "IllegalArgument"],
        ["throwError", "$L3"]
    ],
    "checkNull": [
        ["if==than", "$P1", null, 2],
        ["create", "$L0", "Error", "Passed argument is null.", "IllegalArgument"],
        ["throwError", "$L0"]
    ],
    "checkPositive": [
        ["if<than", "$P1", 0, 2],
        ["create", "$L0", "Error", "Passed argument should be bigger than 0.", "IllegalArgument"],
        ["throwError", "$L0"]
    ]
};
class Box {
    constructor(redirectReceiver, clientId, clientSecret, redirectUri, state) {
        this.interpreterStorage = {};
        this.persistentStorage = [{}];
        this.instanceDependencyStorage = {
            redirectReceiver: redirectReceiver
        };
        InitSelfTest_1.InitSelfTest.initTest("Box");
        this.interpreterStorage["clientId"] = clientId;
        this.interpreterStorage["clientSecret"] = clientSecret;
        this.interpreterStorage["redirectUri"] = redirectUri;
        this.interpreterStorage["state"] = state;
        let ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        if (SERVICE_CODE["init"]) {
            ip.callFunctionSync("init", this.interpreterStorage);
        }
    }
    download(filePath, callback) {
        let ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("CloudStorage:download", this.interpreterStorage, null, filePath).then(() => {
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
    upload(filePath, stream, size, overwrite, callback) {
        let ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("CloudStorage:upload", this.interpreterStorage, filePath, stream, size, overwrite ? 1 : 0).then(() => {
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
    move(sourcePath, destinationPath, callback) {
        let ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("CloudStorage:move", this.interpreterStorage, sourcePath, destinationPath).then(() => {
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
    delete(filePath, callback) {
        let ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("CloudStorage:delete", this.interpreterStorage, filePath).then(() => {
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
    copy(sourcePath, destinationPath, callback) {
        let ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("CloudStorage:copy", this.interpreterStorage, sourcePath, destinationPath).then(() => {
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
    createFolder(folderPath, callback) {
        let ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("CloudStorage:createFolder", this.interpreterStorage, folderPath).then(() => {
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
    getMetadata(filePath, callback) {
        let ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("CloudStorage:getMetadata", this.interpreterStorage, null, filePath).then(() => {
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
    getChildren(folderPath, callback) {
        let ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("CloudStorage:getChildren", this.interpreterStorage, null, folderPath).then(() => {
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
    getUserLogin(callback) {
        let ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("CloudStorage:getUserLogin", this.interpreterStorage, null).then(() => {
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
    getUserName(callback) {
        let ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("CloudStorage:getUserName", this.interpreterStorage, null).then(() => {
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
exports.Box = Box;
