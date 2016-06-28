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
        ["string.concat", "$L0.url", "https://www.googleapis.com/drive/v3/about?fields=user&key=", "$P0.clientID"],
        ["create", "$L0.requestHeaders", "Object"],
        ["string.concat", "$L0.requestHeaders.Authorization", "Bearer ", "$S0.accessToken"],
        ["set", "$L0.method", "GET"],
        ["http.requestCall", "$L1", "$L0"],
        ["json.parse", "$L2", "$L1.responseBody"],
        ["callFunc", "validateResponse", "$P0", "$L1"],
        ["create", "$P0.userInfo", "Object"],
        ["create", "$L3", "Date"],
        ["set", "$P0.userInfo.lastUpdate", "$L3.Time"],
        ["set", "$P0.userInfo.emailAddress", "$L2.user.emailAddress"],
        ["set", "$P0.userInfo.displayName", "$L2.user.displayName"]
    ],
    "getGDMetadata": [
        ["callFunc", "validatePath", "$P0", "$P2"],
        ["if==than", "$P2", "/", 2],
        ["create", "$L3", "Error", "You cannot take metadata from the root folder", "IllegalArgument"],
        ["throwError", "$L3"],
        ["callFunc", "checkAuthentication", "$P0"],
        ["create", "$L0", "String"],
        ["callFunc", "resolvePath", "$P0", "$L0", "$P2"],
        ["callFunc", "getMetadataByID", "$P0", "$P1", "$L0"],
        ["set", "$P1.Path", "$P2"]
    ],
    "downloadGD": [
        ["callFunc", "validatePath", "$P0", "$P2"],
        ["callFunc", "checkAuthentication", "$P0"],
        ["create", "$L0", "String"],
        ["callFunc", "resolvePath", "$P0", "$L0", "$P2"],
        ["create", "$L1", "Object"],
        ["set", "$L1.method", "GET"],
        ["create", "$L2", "String"],
        ["string.concat", "$L2", "https://www.googleapis.com/drive/v3/files/", "$L0", "?alt=media"],
        ["set", "$L1.url", "$L2"],
        ["create", "$L3", "Object"],
        ["set", "$L1.requestHeaders", "$L3"],
        ["create", "$L4", "String"],
        ["string.concat", "$L4", "Bearer ", "$S0.accessToken"],
        ["set", "$L3", "$L4", "Authorization"],
        ["create", "$L5", "Object"],
        ["http.requestCall", "$L5", "$L1"],
        ["callFunc", "validateResponse", "$P0", "$L5"],
        ["set", "$P1", "$L5.responseBody"]
    ],
    "moveGD": [
        ["callFunc", "validatePath", "$P0", "$P1"],
        ["callFunc", "validatePath", "$P0", "$P2"],
        ["callFunc", "checkAuthentication", "$P0"],
        ["create", "$L0", "String"],
        ["callFunc", "checkIfPathExists", "$P0", "$L0", "$P2"],
        ["if==than", "$L0", "true", 2],
        ["create", "$L0", "Error", "Destination already exists.", "Http"],
        ["throwError", "$L0"],
        ["create", "$L0", "Number"],
        ["string.lastIndexOf", "$L0", "$P2", "/"],
        ["create", "$L1", "String"],
        ["string.substring", "$L1", "$P2", 0, "$L0"],
        ["if==than", "$L1", "", 1],
        ["set", "$L1", "/"],
        ["create", "$L2", "Number"],
        ["math.add", "$L2", "$L0", 1],
        ["create", "$L3", "String"],
        ["string.substring", "$L3", "$P2", "$L2"],
        ["create", "$L4", "String"],
        ["callFunc", "resolvePath", "$P0", "$L4", "$P1"],
        ["create", "$L5", "String"],
        ["callFunc", "resolvePath", "$P0", "$L5", "$L1"],
        ["create", "$L6", "Object"],
        ["set", "$L6.method", "PUT"],
        ["create", "$L7", "String"],
        ["string.concat", "$L7", "https://www.googleapis.com/drive/v2/files/", "$L4"],
        ["set", "$L6.url", "$L7"],
        ["create", "$L8", "Object"],
        ["set", "$L6.requestHeaders", "$L8"],
        ["create", "$L9", "String"],
        ["string.concat", "$L9", "Bearer ", "$S0.accessToken"],
        ["set", "$L8", "$L9", "Authorization"],
        ["set", "$L8", "application/json", "Content-Type"],
        ["create", "$L10", "Object"],
        ["set", "$L10.title", "$L3"],
        ["create", "$L11", "Array"],
        ["set", "$L10.parents", "$L11"],
        ["create", "$L12", "Object"],
        ["set", "$L12.id", "$L5"],
        ["push", "$L11", "$L12"],
        ["create", "$L13", "String"],
        ["json.stringify", "$L13", "$L10"],
        ["stream.stringToStream", "$L14", "$L13"],
        ["set", "$L6.requestBody", "$L14"],
        ["create", "$L15", "Object"],
        ["http.requestCall", "$L15", "$L6"],
        ["callFunc", "validateResponse", "$P0", "$L15"]
    ],
    "deleteGD": [
        ["callFunc", "validatePath", "$P0", "$P1"],
        ["callFunc", "checkAuthentication", "$P0"],
        ["create", "$L0", "String"],
        ["callFunc", "resolvePath", "$P0", "$L0", "$P1"],
        ["create", "$L1", "Object"],
        ["set", "$L1.method", "DELETE"],
        ["create", "$L2", "String"],
        ["string.concat", "$L2", "https://www.googleapis.com/drive/v2/files/", "$L0"],
        ["set", "$L1.url", "$L2"],
        ["create", "$L3", "Object"],
        ["set", "$L1.requestHeaders", "$L3"],
        ["create", "$L4", "String"],
        ["string.concat", "$L4", "Bearer ", "$S0.accessToken"],
        ["set", "$L3.Authorization", "$L4"],
        ["create", "$L5", "Object"],
        ["http.requestCall", "$L5", "$L1"],
        ["callFunc", "validateResponse", "$P0", "$L5"]
    ],
    "copyGD": [
        ["callFunc", "validatePath", "$P0", "$P1"],
        ["callFunc", "validatePath", "$P0", "$P2"],
        ["callFunc", "checkAuthentication", "$P0"],
        ["create", "$L0", "String"],
        ["callFunc", "checkIfPathExists", "$P0", "$L0", "$P2"],
        ["if==than", "$L0", "true", 2],
        ["create", "$L0", "Error", "Destination already exists.", "Http"],
        ["throwError", "$L0"],
        ["create", "$L0", "Number"],
        ["string.lastIndexOf", "$L0", "$P2", "/"],
        ["create", "$L1", "String", "/"],
        ["if!=than", "$L0", 0, 1],
        ["string.substring", "$L1", "$P2", 0, "$L0"],
        ["create", "$L2", "Number"],
        ["math.add", "$L2", "$L0", 1],
        ["create", "$L3", "String"],
        ["string.substring", "$L3", "$P2", "$L2"],
        ["create", "$L4", "String"],
        ["callFunc", "resolvePath", "$P0", "$L4", "$P1"],
        ["create", "$L5", "String"],
        ["callFunc", "resolvePath", "$P0", "$L5", "$L1"],
        ["create", "$L6", "CloudMetaData"],
        ["callFunc", "getMetadataByID", "$P0", "$L6", "$L4"],
        ["if==than", "$L6.Folder", 1, 2],
        ["callFunc", "copyFolder", "$P0", "$P1", "$P2"],
        ["return"],
        ["create", "$L7", "Object"],
        ["set", "$L7.method", "POST"],
        ["create", "$L8", "String"],
        ["string.concat", "$L8", "https://www.googleapis.com/drive/v2/files/", "$L4", "/copy"],
        ["set", "$L7.url", "$L8"],
        ["create", "$L9", "Object"],
        ["set", "$L7.requestHeaders", "$L9"],
        ["create", "$L10", "String"],
        ["string.concat", "$L10", "Bearer ", "$S0.accessToken"],
        ["set", "$L9", "$L10", "Authorization"],
        ["set", "$L9", "application/json", "Content-Type"],
        ["create", "$L11", "Object"],
        ["set", "$L11.title", "$L3"],
        ["create", "$L12", "Array"],
        ["set", "$L11.parents", "$L12"],
        ["create", "$L13", "Object"],
        ["set", "$L13.id", "$L5"],
        ["push", "$L12", "$L13"],
        ["create", "$L14", "String"],
        ["json.stringify", "$L14", "$L11"],
        ["stream.stringToStream", "$L15", "$L14"],
        ["set", "$L7.requestBody", "$L15"],
        ["create", "$L15", "Object"],
        ["http.requestCall", "$L15", "$L7"],
        ["callFunc", "validateResponse", "$P0", "$L15"]
    ],
    "createGDFolder": [
        ["callFunc", "validatePath", "$P0", "$P1"],
        ["callFunc", "checkAuthentication", "$P0"],
        ["set", "$L19", "$P1"],
        ["callFunc", "checkIfPathExists", "$P0", "$L20", "$L19"],
        ["if==than", "$L20", "true", 2],
        ["create", "$L21", "Error", "Folder already exists.", "Http"],
        ["throwError", "$L21"],
        ["create", "$L0", "Number"],
        ["string.lastIndexOf", "$L0", "$P1", "/"],
        ["create", "$L1", "String", "/"],
        ["if!=than", "$L0", 0, 1],
        ["string.substring", "$L1", "$P1", 0, "$L0"],
        ["create", "$L2", "String"],
        ["callFunc", "resolvePath", "$P0", "$L2", "$L1"],
        ["create", "$L3", "String"],
        ["math.add", "$L0", "$L0", 1],
        ["string.substring", "$L3", "$P1", "$L0"],
        ["create", "$L4", "Object"],
        ["set", "$L4.method", "POST"],
        ["create", "$L5", "Object"],
        ["set", "$L4.requestHeaders", "$L5"],
        ["set", "$L5", "application/json", "Content-Type"],
        ["create", "$L6", "String"],
        ["string.concat", "$L6", "Bearer ", "$S0.accessToken"],
        ["set", "$L5", "$L6", "Authorization"],
        ["set", "$L4.url", "https://www.googleapis.com/drive/v2/files"],
        ["create", "$L7", "Object"],
        ["set", "$L7.title", "$L3"],
        ["set", "$L7.mimeType", "application/vnd.google-apps.folder"],
        ["create", "$L8", "Array"],
        ["set", "$L7.parents", "$L8"],
        ["create", "$L9", "Object"],
        ["set", "$L9.id", "$L2"],
        ["push", "$L8", "$L9"],
        ["create", "$L10", "String"],
        ["json.stringify", "$L10", "$L7"],
        ["stream.stringToStream", "$L11", "$L10"],
        ["set", "$L4.requestBody", "$L11"],
        ["create", "$L10", "Object"],
        ["http.requestCall", "$L10", "$L4"],
        ["callFunc", "validateResponse", "$P0", "$L10"]
    ],
    "getGDParents": [
        ["callFunc", "validatePath", "$P0", "$P2"],
        ["callFunc", "checkAuthentication", "$P0"],
        ["create", "$L0", "Number"],
        ["string.lastIndexOf", "$L0", "$P2", "/"],
        ["create", "$L1", "String"],
        ["if==than", "$L0", 0, 2],
        ["set", "$L1", "/"],
        ["jumpRel", 1],
        ["string.substring", "$L1", "$P2", 0, "L0"],
        ["create", "$L2", "String"],
        ["callFunc", "resolvePath", "$P0", "$L2", "$L1"],
        ["create", "$L3", "CloudMetaData"],
        ["callFunc", "getMetadataByID", "$P0", "$L3", "$L2"],
        ["create", "$P1", "Array"],
        ["push", "$P1", "$L3"]
    ],
    "getGDChildren": [
        ["callFunc", "validatePath", "$P0", "$P2"],
        ["callFunc", "checkAuthentication", "$P0"],
        ["create", "$L0", "String"],
        ["callFunc", "resolvePath", "$P0", "$L0", "$P2"],
        ["create", "$L1", "Object"],
        ["callFunc", "getFolderContent", "$P0", "$L1", "$L0"],
        ["create", "$L10", "Array"],
        ["create", "$L2", "Array"],
        ["set", "$L2", "$L1.items"],
        ["create", "$L3", "Number"],
        ["size", "$L3", "$L2"],
        ["create", "$L4", "Number", 0],
        ["if<than", "$L4", "$L3", 17],
        ["create", "$L5", "Object"],
        ["get", "$L5", "$L2", "$L4"],
        ["create", "$L7", "CloudMetaData"],
        ["set", "$L7.name", "$L5.title"],
        ["if!=than", "$L5.fileSize", null, 1],
        ["math.add", "$L7.size", "$L5.fileSize", 0],
        ["if==than", "$L5.mimeType", "application/vnd.google-apps.folder", 2],
        ["set", "$L7.Folder", 1],
        ["jumpRel", 1],
        ["set", "$L7.Folder", 0],
        ["if==than", "$P2", "/", 2],
        ["string.concat", "$L7.path", "/", "$L7.name"],
        ["jumpRel", 1],
        ["string.concat", "$L7.path", "$P2", "/", "$L7.name"],
        ["push", "$L10", "$L7"],
        ["math.add", "$L4", "$L4", 1],
        ["jumpRel", -18],
        ["set", "$P1", "$L10"]
    ],
    "uploadGD": [
        ["callFunc", "validatePath", "$P0", "$P1"],
        ["callFunc", "checkNull", "$P0", "$P2"],
        ["callFunc", "checkAuthentication", "$P0"],
        ["if!=than", "$P4", 0, 4],
        ["callFunc", "resolvePath", "$P0", "$L20", "$P1", 1],
        ["if!=than", "$L20", null, 2],
        ["callFunc", "uploadOverwrite", "$P0", "$P1", "$P2", "$L20"],
        ["return"],
        ["callFunc", "checkIfPathExists", "$P0", "$L25", "$P1"],
        ["if==than", "$L25", "true", 2],
        ["create", "$L26", "Error", "Path already exists.", "Http"],
        ["throwError", "$L26"],
        ["create", "$L0", "Number"],
        ["string.lastIndexOf", "$L0", "$P1", "/"],
        ["create", "$L16", "String", "/"],
        ["if!=than", "$L0", 0, 1],
        ["string.substring", "$L16", "$P1", 0, "$L0"],
        ["create", "$L17", "String"],
        ["callFunc", "resolvePath", "$P0", "$L17", "$L16"],
        ["math.add", "$L0", "$L0", 1],
        ["create", "$L1", "String"],
        ["string.substring", "$L1", "$P1", "$L0"],
        ["create", "$L2", "Object"],
        ["set", "$L2.method", "POST"],
        ["set", "$L2.url", "https://www.googleapis.com/upload/drive/v2/files?uploadType=resumable"],
        ["create", "$L3", "Object"],
        ["set", "$L2.requestHeaders", "$L3"],
        ["set", "$L3", "application/json", "Content-Type"],
        ["create", "$L4", "String"],
        ["string.concat", "$L4", "Bearer ", "$S0.accessToken"],
        ["set", "$L3", "$L4", "Authorization"],
        ["create", "$L30", "Number"],
        ["string.lastIndexOf", "$L30", "$P1", "."],
        ["math.add", "$L30", "$L30", 1],
        ["create", "$L29", "String"],
        ["string.substring", "$L29", "$P1", "$L30"],
        ["create", "$L28", "String"],
        ["getMimeType", "$L28", "$L29"],
        ["if==than", "$L28", null, 2],
        ["set", "$L28", "application/octet-stream"],
        ["debug.out", "No known MimeType for extension '", "$L29", "'. Used 'application/octet-stream' instead."],
        ["set", "$L3", "$L28", "X-Upload-Content-Type"],
        ["create", "$L5", "Object"],
        ["set", "$L5.title", "$L1"],
        ["create", "$L18", "Array"],
        ["set", "$L5.parents", "$L18"],
        ["create", "$L19", "Object"],
        ["set", "$L19.id", "$L17"],
        ["push", "$L18", "$L19"],
        ["create", "$L6", "String"],
        ["json.stringify", "$L6", "$L5"],
        ["stream.stringToStream", "$L7", "$L6"],
        ["set", "$L2.requestBody", "$L7"],
        ["create", "$L8", "Object"],
        ["http.requestCall", "$L8", "$L2"],
        ["callFunc", "validateResponse", "$P0", "$L8"],
        ["create", "$L9", "String"],
        ["get", "$L9", "$L8.responseHeaders", "Location"],
        ["create", "$L2", "Object"],
        ["set", "$L2.method", "PUT"],
        ["set", "$L2.url", "$L9"],
        ["set", "$L2.requestBody", "$P2"],
        ["create", "$L3", "Object"],
        ["set", "$L2.requestHeaders", "$L3"],
        ["set", "$L3", "$L28", "Content-Type"],
        ["create", "$L4", "Object"],
        ["http.requestCall", "$L4", "$L2"],
        ["callFunc", "validateResponse", "$P0", "$L4"]
    ],
    "uploadOverwrite": [
        ["create", "$L2", "Object"],
        ["set", "$L2.method", "PUT"],
        ["string.concat", "$L2.url", "https://www.googleapis.com/upload/drive/v2/files/", "$P3", "?uploadType=resumable"],
        ["create", "$L3", "Object"],
        ["set", "$L2.requestHeaders", "$L3"],
        ["set", "$L3", "application/json", "Content-Type"],
        ["create", "$L4", "String"],
        ["string.concat", "$L4", "Bearer ", "$S0.accessToken"],
        ["set", "$L3", "$L4", "Authorization"],
        ["string.lastIndexOf", "$L30", "$P1", "."],
        ["math.add", "$L30", "$L30", 1],
        ["string.substring", "$L29", "$P1", "$L30"],
        ["create", "$L28", "String"],
        ["getMimeType", "$L28", "$L29"],
        ["if==than", "$L28", null, 2],
        ["set", "$L28", "application/octet-stream"],
        ["debug.out", "No known MimeType for extension '", "$L29", "'. Used 'application/octet-stream' instead."],
        ["set", "$L3", "$L28", "X-Upload-Content-Type"],
        ["create", "$L5", "Object"],
        ["json.stringify", "$L6", "$L5"],
        ["stream.stringToStream", "$L7", "$L6"],
        ["set", "$L2.requestBody", "$L7"],
        ["create", "$L8", "Object"],
        ["http.requestCall", "$L8", "$L2"],
        ["callFunc", "validateResponse", "$P0", "$L8"],
        ["create", "$L9", "String"],
        ["get", "$L9", "$L8.responseHeaders", "Location"],
        ["create", "$L2", "Object"],
        ["set", "$L2.method", "PUT"],
        ["set", "$L2.url", "$L9"],
        ["set", "$L2.requestBody", "$P2"],
        ["create", "$L3", "Object"],
        ["set", "$L2.requestHeaders", "$L3"],
        ["set", "$L3", "$L28", "Content-Type"],
        ["create", "$L4", "Object"],
        ["http.requestCall", "$L4", "$L2"],
        ["callFunc", "validateResponse", "$P0", "$L4"]
    ],
    "Authenticating:login": [
        ["callFunc", "checkAuthentication", "$P0"]
    ],
    "Authenticating:logout": [
        ["create", "$L0", "Object"],
        ["string.concat", "$L0.url", "https://accounts.google.com/o/oauth2/revoke?token=", "$S0.accessToken"],
        ["set", "$L0.method", "GET"],
        ["http.requestCall", "$L1", "$L0"],
        ["callFunc", "validateResponse", "$P0", "$L1"],
        ["set", "$S0.accessToken", null]
    ],
    "resolvePath": [
        ["if==than", "$P2", "/", 2],
        ["set", "$P1", "root"],
        ["return"],
        ["create", "$L0", "Number"],
        ["string.lastIndexOf", "$L0", "$P2", "/"],
        ["math.add", "$L0", "$L0", 1],
        ["create", "$L1", "String"],
        ["string.substring", "$L1", "$P2", "$L0"],
        ["create", "$L2", "Array"],
        ["callFunc", "searchForFile", "$P0", "$L2", "$L1"],
        ["create", "$L3", "Number", 0],
        ["create", "$L4", "Number"],
        ["size", "$L4", "$L2"],
        ["create", "$L5", "String"],
        ["math.add", "$L0", "$L0", -1],
        ["string.substring", "$L5", "$P2", 0, "$L0"],
        ["if<than", "$L3", "$L4", 9],
        ["create", "$L6", "Object"],
        ["get", "$L6", "$L2", "$L3"],
        ["create", "$L7", "Number"],
        ["callFunc", "validateParents", "$P0", "$L7", "$L6", "$L5"],
        ["if==than", "$L7", 1, 2],
        ["set", "$P1", "$L6.id"],
        ["return"],
        ["math.add", "$L3", "$L3", 1],
        ["jumpRel", -10],
        ["if!=than", "$P3", null, 2],
        ["set", "$P1", null],
        ["return"],
        ["create", "$L6", "Error", "Specified file does not exist.", "NotFound"],
        ["throwError", "$L6"]
    ],
    "checkIfPathExists": [
        ["if==than", "$P2", "/", 2],
        ["set", "$P1", "root"],
        ["return"],
        ["create", "$L0", "Number"],
        ["string.lastIndexOf", "$L0", "$P2", "/"],
        ["math.add", "$L0", "$L0", 1],
        ["create", "$L1", "String"],
        ["string.substring", "$L1", "$P2", "$L0"],
        ["create", "$L2", "Array"],
        ["callFunc", "searchForFile", "$P0", "$L2", "$L1"],
        ["create", "$L3", "Number", 0],
        ["create", "$L4", "Number"],
        ["size", "$L4", "$L2"],
        ["create", "$L5", "String"],
        ["math.add", "$L0", "$L0", -1],
        ["string.substring", "$L5", "$P2", 0, "$L0"],
        ["if<than", "$L3", "$L4", 9],
        ["create", "$L6", "Object"],
        ["get", "$L6", "$L2", "$L3"],
        ["create", "$L7", "Number"],
        ["callFunc", "validateParents", "$P0", "$L7", "$L6", "$L5"],
        ["if==than", "$L7", 1, 2],
        ["set", "$P1", "true"],
        ["return"],
        ["math.add", "$L3", "$L3", 1],
        ["jumpRel", -10],
        ["set", "$P1", "false"]
    ],
    "searchForFile": [
        ["create", "$L0", "Object"],
        ["set", "$L0.method", "GET"],
        ["create", "$L1", "String"],
        ["string.concat", "$L1", "title = '", "$P2", "'"],
        ["string.urlEncode", "$L1", "$L1"],
        ["create", "$L2", "String"],
        ["string.concat", "$L2", "https://www.googleapis.com/drive/v2/files?q=", "$L1"],
        ["set", "$L0.url", "$L2"],
        ["create", "$L3", "Object"],
        ["set", "$L0.requestHeaders", "$L3"],
        ["create", "$L4", "String"],
        ["string.concat", "$L4", "Bearer ", "$S0.accessToken"],
        ["set", "$L3", "$L4", "Authorization"],
        ["create", "$L5", "Object"],
        ["http.requestCall", "$L5", "$L0"],
        ["callFunc", "validateResponse", "$P0", "$L5"],
        ["create", "$L6", "Object"],
        ["json.parse", "$L6", "$L5.responseBody"],
        ["create", "$P1", "Array"],
        ["create", "$L7", "Number"],
        ["create", "$L8", "Number"],
        ["size", "$L8", "$L6.items"],
        ["if<than", "$L7", "$L8", 6],
        ["create", "$L9", "Object"],
        ["get", "$L9", "$L6.items", "$L7"],
        ["if==than", "$L9.labels.trashed", 0, 1],
        ["push", "$P1", "$L9"],
        ["math.add", "$L7", "$L7", 1],
        ["jumpRel", -7]
    ],
    "validateParents": [
        ["create", "$L0", "Array"],
        ["set", "$L0", "$P2.parents"],
        ["create", "$L1", "String", "/"],
        ["if!=than", "$P3", "", 4],
        ["create", "$L2", "Number"],
        ["string.lastIndexOf", "$L2", "$P3", "/"],
        ["math.add", "$L2", "$L2", 1],
        ["string.substring", "$L1", "$P3", "$L2"],
        ["create", "$L3", "Number", 0],
        ["create", "$L4", "Number"],
        ["size", "$L4", "$L0"],
        ["if<than", "$L3", "$L4", 17],
        ["create", "$L5", "Object"],
        ["get", "$L5", "$L0", "$L3"],
        ["if==than", "$L1", "/", 4],
        ["if==than", "$L5.isRoot", 1, 2],
        ["set", "$P1", 1],
        ["return"],
        ["jumpRel", 8],
        ["create", "$L6", "Object"],
        ["callFunc", "getRawMetadataByID", "$P0", "$L6", "$L5.id"],
        ["if==than", "$L6.title", "$L1", 5],
        ["create", "$L7", "String", "/"],
        ["math.add", "$L2", "$L2", -1],
        ["string.substring", "$L7", "$P3", 0, "$L2"],
        ["callFunc", "validateParents", "$P0", "$P1", "$L6", "$L7"],
        ["return"],
        ["math.add", "$L3", "$L3", 1],
        ["jumpRel", -18],
        ["set", "$P1", 0]
    ],
    "getFolderContent": [
        ["create", "$L0", "String", "https://www.googleapis.com/drive/v2/files?fields=items(id%2CmimeType%2Ctitle%2CfileSize%2Clabels)&q="],
        ["create", "$L5", "String"],
        ["string.concat", "$L5", "'", "$P2", "'", " in parents"],
        ["string.urlEncode", "$L5", "$L5"],
        ["string.concat", "$L0", "$L0", "$L5"],
        ["create", "$L1", "Object"],
        ["set", "$L1.url", "$L0"],
        ["set", "$L1.method", "GET"],
        ["create", "$L2", "Object"],
        ["create", "$L3", "String"],
        ["string.concat", "$L3", "Bearer ", "$S0.accessToken"],
        ["set", "$L2", "$L3", "Authorization"],
        ["set", "$L1.requestHeaders", "$L2"],
        ["create", "$L4", "Object"],
        ["http.requestCall", "$L4", "$L1"],
        ["callFunc", "validateResponse", "$P0", "$L4"],
        ["create", "$L5", "Object"],
        ["json.parse", "$L5", "$L4.responseBody"],
        ["create", "$L6", "Array"],
        ["create", "$L7", "Number"],
        ["create", "$L8", "Number"],
        ["size", "$L8", "$L5.items"],
        ["if<than", "$L7", "$L8", 6],
        ["create", "$L9", "Object"],
        ["get", "$L9", "$L5.items", "$L7"],
        ["if==than", "$L9.labels.trashed", 0, 1],
        ["push", "$L6", "$L9"],
        ["math.add", "$L7", "$L7", 1],
        ["jumpRel", -7],
        ["set", "$L5.items", "$L6"],
        ["set", "$P1", "$L5"]
    ],
    "getMetadataByID": [
        ["create", "$L0", "Object"],
        ["callFunc", "getRawMetadataByID", "$P0", "$L0", "$P2"],
        ["create", "$P1", "CloudMetaData"],
        ["set", "$P1.Name", "$L0.title"],
        ["if!=than", "$L0.fileSize", null, 1],
        ["math.add", "$P1.Size", "$L0.fileSize", 0],
        ["if==than", "$L0.mimeType", "application/vnd.google-apps.folder", 2],
        ["set", "$P1.Folder", 1],
        ["return"],
        ["set", "$P1.Folder", 0]
    ],
    "getRawMetadataByID": [
        ["create", "$L0", "Object"],
        ["create", "$L1", "String"],
        ["string.concat", "$L1", "https://www.googleapis.com/drive/v2/files/", "$P2"],
        ["create", "$L2", "Object"],
        ["create", "$L3", "String"],
        ["string.concat", "$L3", "Bearer ", "$S0.accessToken"],
        ["set", "$L2", "$L3", "Authorization"],
        ["set", "$L0.url", "$L1"],
        ["set", "$L0.requestHeaders", "$L2"],
        ["set", "$L0.method", "GET"],
        ["create", "$L4", "Object"],
        ["http.requestCall", "$L4", "$L0"],
        ["callFunc", "validateResponse", "$P0", "$L4"],
        ["json.parse", "$P1", "$L4.responseBody"]
    ],
    "checkAuthentication": [
        ["create", "$L0", "Date"],
        ["if==than", "$S0.accessToken", null, 2],
        ["callFunc", "authenticate", "$P0", "accessToken"],
        ["return"],
        ["create", "$L1", "Date"],
        ["set", "$L1.time", "$S0.expireIn"],
        ["if<than", "$L1", "$L0", 1],
        ["callFunc", "authenticate", "$P0", "refreshToken"]
    ],
    "authenticate": [
        ["create", "$L2", "String"],
        ["if==than", "$P1", "accessToken", 4],
        ["string.concat", "$L0", "https://accounts.google.com/o/oauth2/v2/auth?client_id=", "$P0.clientID", "&scope=", "https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fdrive", "&response_type=code&prompt=consent&access_type=offline&redirect_uri=", "$P0.redirectUri"],
        ["awaitCodeRedirect", "$L1", "$L0"],
        ["string.concat", "$L2", "client_id=", "$P0.clientID", "&redirect_uri=", "$P0.redirectUri", "&client_secret=", "$P0.clientSecret", "&code=", "$L1", "&grant_type=authorization_code"],
        ["jumpRel", 1],
        ["string.concat", "$L2", "client_id=", "$P0.clientID", "&redirect_uri=", "$P0.redirectUri", "&client_secret=", "$P0.clientSecret", "&refresh_token=", "$S0.refreshToken", "&grant_type=refresh_token"],
        ["stream.stringToStream", "$L3", "$L2"],
        ["create", "$L4", "Object"],
        ["set", "$L4", "application/x-www-form-urlencoded", "Content-Type"],
        ["create", "$L5", "Object"],
        ["set", "$L5.url", "https://www.googleapis.com/oauth2/v4/token"],
        ["set", "$L5.method", "POST"],
        ["set", "$L5.requestBody", "$L3"],
        ["set", "$L5.requestHeaders", "$L4"],
        ["http.requestCall", "$L6", "$L5"],
        ["callFunc", "validateResponse", "$P0", "$L6"],
        ["stream.streamToString", "$L7", "$L6.responseBody"],
        ["json.parse", "$L8", "$L7"],
        ["set", "$S0.accessToken", "$L8.access_token"],
        ["if!=than", "$L8.refresh_token", null, 1],
        ["set", "$S0.refreshToken", "$L8.refresh_token"],
        ["create", "$L10", "Date"],
        ["math.multiply", "$L9", "$L8.expires_in", 1000],
        ["math.add", "$L9", "$L9", "$L10.time", -60000],
        ["set", "$S0.expireIn", "$L9"]
    ],
    "checkNull": [
        ["if==than", "$P1", null, 2],
        ["create", "$L0", "Error", "Passed argument is null.", "IllegalArgument"],
        ["throwError", "$L0"]
    ],
    "validatePath": [
        ["callFunc", "checkNull", "$P0", "$P1"],
        ["if==than", "$P1", "", 2],
        ["create", "$L1", "Error", "Path should not be empty.", "IllegalArgument"],
        ["throwError", "$L1"],
        ["create", "$L0", "String"],
        ["string.substring", "$L0", "$P1", 0, 1],
        ["if!=than", "$L0", "/", 2],
        ["create", "$L1", "Error", "Path should start with '/'.", "IllegalArgument"],
        ["throwError", "$L1"],
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
    "validateResponse": [
        ["if>=than", "$P1.code", 400, 20],
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
    "copyFolder": [
        ["callFunc", "createGDFolder", "$P0", "$P2"],
        ["create", "$L0", "String"],
        ["callFunc", "resolvePath", "$P0", "$L0", "$P2"],
        ["create", "$L1", "String"],
        ["callFunc", "resolvePath", "$P0", "$L1", "$P1"],
        ["create", "$L2", "Object"],
        ["callFunc", "getFolderContent", "$P0", "$L2", "$L1"],
        ["create", "$L3", "Array"],
        ["set", "$L3", "$L2.items"],
        ["create", "$L4", "Array"],
        ["create", "$L5", "Number"],
        ["create", "$L6", "Number"],
        ["size", "$L6", "$L3"],
        ["if<than", "$L5", "$L6", 12],
        ["create", "$L7", "Object"],
        ["get", "$L7", "$L3", "$L5"],
        ["if==than", "$L7.mimeType", "application/vnd.google-apps.folder", 6],
        ["create", "$L8", "String"],
        ["string.concat", "$L8", "$P2", "/", "$L7.title"],
        ["create", "$L9", "String"],
        ["string.concat", "$L9", "$P1", "/", "$L7.title"],
        ["callFunc", "copyFolder", "$P0", "$L9", "$L8"],
        ["jumpRel", 1],
        ["push", "$L4", "$L7"],
        ["math.add", "$L5", "$L5", 1],
        ["jumpRel", -13],
        ["create", "$L30", "String", "nfh39t8gui34fhoifc90a9fhg39pkjoiu90oh4ug"],
        ["create", "$L5", "Number"],
        ["size", "$L5", "$L4"],
        ["if==than", "$L5", 0, 1],
        ["return"],
        ["create", "$L6", "Object"],
        ["set", "$L6.method", "POST"],
        ["set", "$L6.url", "https://www.googleapis.com/batch"],
        ["create", "$L7", "Object"],
        ["set", "$L6.requestHeaders", "$L7"],
        ["create", "$L8", "String"],
        ["string.concat", "$L8", "Bearer ", "$S0.accessToken"],
        ["set", "$L7", "$L8", "Authorization"],
        ["create", "$L8", "String"],
        ["string.concat", "$L8", "multipart/mixed; boundary=", "$L30"],
        ["set", "$L7", "$L8", "Content-Type"],
        ["create", "$L29", "String"],
        ["create", "$L8", "Number"],
        ["if<than", "$L8", "$L5", 27],
        ["create", "$L9", "Object"],
        ["get", "$L9", "$L4", "$L8"],
        ["create", "$L10", "Object"],
        ["set", "$L10.method", "POST"],
        ["create", "$L11", "String"],
        ["string.concat", "$L11", "/drive/v2/files/", "$L9.id", "/copy"],
        ["set", "$L10.url", "$L11"],
        ["create", "$L12", "Object"],
        ["set", "$L10.requestHeaders", "$L12"],
        ["set", "$L12", "application/json", "Content-Type"],
        ["create", "$L13", "Object"],
        ["set", "$L10.requestBody", "$L13"],
        ["set", "$L13.title", "$L9.title"],
        ["create", "$L14", "Array"],
        ["set", "$L13.parents", "$L14"],
        ["create", "$L15", "Object"],
        ["set", "$L15.id", "$L0"],
        ["push", "$L14", "$L15"],
        ["create", "$L16", "String"],
        ["callFunc", "createRawHttpRequest", "$P0", "$L16", "$L10"],
        ["string.concat", "$L29", "$L29", "--", "$L30", "\n"],
        ["string.concat", "$L29", "$L29", "Content-Type: application/http\n"],
        ["string.concat", "$L29", "$L29", "Content-ID: item", "$L8", "\n"],
        ["string.concat", "$L29", "$L29", "Content-Transfer-Encoding: binary\n\n\n"],
        ["string.concat", "$L29", "$L29", "$L16", "\n\n\n"],
        ["math.add", "$L8", "$L8", 1],
        ["jumpRel", -28],
        ["string.concat", "$L29", "$L29", "--", "$L30", "--"],
        ["stream.stringToStream", "$L9", "$L29"],
        ["set", "$L6.requestBody", "$L9"],
        ["create", "$L10", "Object"],
        ["http.requestCall", "$L10", "$L6"],
        ["callFunc", "validateResponse", "$P0", "$L10"]
    ],
    "createRawHttpRequest": [
        ["create", "$L0", "String"],
        ["string.concat", "$L0", "$P2.method", " ", "$P2.url", "\n"],
        ["create", "$L1", "String"],
        ["get", "$L1", "$P2.requestHeaders", "Content-Type"],
        ["string.concat", "$L0", "$L0", "Content-Type: ", "$L1", "\n\n\n"],
        ["create", "$L2", "String"],
        ["json.stringify", "$L2", "$P2.requestBody"],
        ["string.concat", "$L0", "$L0", "$L2"],
        ["set", "$P1", "$L0"]
    ]
};
class GoogleDrive {
    constructor(redirectReceiver, clientID, clientSecret, redirectUri, state) {
        this.interpreterStorage = {};
        this.persistentStorage = [{}];
        this.instanceDependencyStorage = {
            redirectReceiver: redirectReceiver
        };
        InitSelfTest_1.InitSelfTest.initTest("GoogleDrive");
        this.interpreterStorage["clientID"] = clientID;
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
        ip.callFunction("downloadGD", this.interpreterStorage, null, filePath).then(() => {
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
        ip.callFunction("uploadGD", this.interpreterStorage, filePath, stream, size, overwrite ? 1 : 0).then(() => {
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
        ip.callFunction("moveGD", this.interpreterStorage, sourcePath, destinationPath).then(() => {
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
        ip.callFunction("deleteGD", this.interpreterStorage, filePath).then(() => {
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
        ip.callFunction("copyGD", this.interpreterStorage, sourcePath, destinationPath).then(() => {
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
        ip.callFunction("createGDFolder", this.interpreterStorage, folderPath).then(() => {
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
        ip.callFunction("getGDMetadata", this.interpreterStorage, null, filePath).then(() => {
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
        ip.callFunction("getGDChildren", this.interpreterStorage, null, folderPath).then(() => {
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
exports.GoogleDrive = GoogleDrive;
