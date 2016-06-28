"use strict";
const VarAddress_1 = require("../servicecode/VarAddress");
const InternalError_1 = require("../errors/InternalError");
const stream = require("stream");
const url = require("url");
const http = require("http");
const https = require("https");
class Helper {
    static addAll(target, source) {
        target.push.apply(target, source);
    }
    static putAll(target, source) {
        for (let key in source) {
            target[key] = source[key];
        }
    }
    static clear(target) {
        for (let key in target)
            delete target[key];
    }
    static remove(target, element) {
        target.splice(target.indexOf(element), 1);
    }
    static isString(object) {
        return (typeof object === "string" || object instanceof String);
    }
    static isObject(object) {
        return (!!object && object.constructor === Object);
    }
    static isNumber(object) {
        return typeof object === "number";
    }
    static isBoolean(object) {
        return typeof object === "boolean";
    }
    static isNumberString(obj) {
        return (Helper.isString(obj) && obj.search("^\\d+$") !== -1);
    }
    static isStream(obj) {
        return obj instanceof stream.Readable;
    }
    static assert(expression) {
        if (!expression)
            throw new InternalError_1.InternalError("Assertion failed");
    }
    static resolve(environment, value, checkExistence = true) {
        if (value instanceof VarAddress_1.VarAddress)
            return environment.getVariable(value, undefined, !checkExistence);
        else
            return value;
    }
    static compare(aObj, bObj) {
        if (aObj < bObj)
            return -1;
        else if (bObj < aObj)
            return 1;
        else if (aObj === bObj)
            return 0;
        else
            throw new InternalError_1.InternalError("Compare compares incomparable values");
    }
    static dumpStream(stream, targetEncoding) {
        return new Promise((resolve, reject) => {
            let buffers = [], length = 0;
            stream.on("data", (chunk) => {
                buffers.push(chunk);
                length += chunk.length;
            });
            stream.on("end", () => {
                let buf = Buffer.concat(buffers, length);
                let str = buf.toString(targetEncoding);
                resolve(str);
            });
            stream.on("error", (err) => reject(err));
        });
    }
    static streamifyString(string, sourceEncoding) {
        let resStream = new stream.Readable();
        resStream._read = () => {
        };
        resStream.push(string, sourceEncoding);
        resStream.push(null);
        return resStream;
    }
    static makeRequest(urlString, headers, body, method) {
        let urlParsed = url.parse(urlString, true);
        let request = urlParsed.protocol === "http:" ? http : https;
        let options = {
            hostname: urlParsed.hostname,
            port: parseInt(urlParsed.port),
            path: urlParsed.path,
            method: method,
            headers: headers,
            auth: urlParsed.auth
        };
        return new Promise((resolve, reject) => {
            let req = request.request(options, res => {
                if ([300, 301, 302, 307, 308].some(stat => res.statusCode === stat)) {
                    let redUrl = res.headers["location"];
                    Helper.makeRequest(redUrl, headers, body, method).then(resolve, reject);
                }
                else
                    resolve(res);
            });
            req.on("error", reject);
            if (body) {
                body.pipe(req);
                body.on("end", () => req.end());
                body.on("error", reject);
            }
            else {
                req.end();
            }
        });
    }
    static lowerCaseFirstLetter(str) {
        return str.charAt(0).toLowerCase() + str.slice(1);
    }
    static upperCaseFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}
Helper.isArray = Array.isArray;
exports.Helper = Helper;
