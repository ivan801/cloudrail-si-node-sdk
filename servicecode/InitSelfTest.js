"use strict";
const Interpreter_1 = require("./Interpreter");
const Sandbox_1 = require("./Sandbox");
const os = require("os");
const dns = require("dns");
class InitSelfTest {
    static initTest(servicename) {
        if (InitSelfTest.testedServices.has(servicename))
            return true;
        let testRes = InitSelfTest.execute(servicename);
        if (testRes)
            InitSelfTest.testedServices.add(servicename);
        return testRes;
    }
    static execute(servicename) {
        let testState = true;
        let SERVICE_CODE = {
            "selfTest": [
                ["create", "$L0", "Object"],
                ["create", "$L1", "Object"],
                ["create", "$L1.client", "Object"],
                ["create", "$L1.app", "Object"],
                ["set", "$L1.client.mac", "$P1"],
                ["set", "$L1.client.platform", "$P0.platform"],
                ["set", "$L1.client.os", "$P0.os"],
                ["set", "$L1.app.name", "$P2"],
                ["set", "$L1.app.version", "$P3"],
                ["json.stringify", "$L3", "$L1.client"],
                ["callFunc", "hashString", "$L4", "$L3"],
                ["json.stringify", "$L5", "$L1.app"],
                ["callFunc", "hashString", "$L6", "$L5"],
                ["delete", "$L1.client.mac"],
                ["create", "$L8", "Object"],
                ["set", "$L8.method", "GET"],
                ["string.concat", "$L8.url", "https://stat-si.cloudrail.com/current_version?service=", "$P0.serviceName", "&client=", "$L4", "&app=", "$L6"],
                ["create", "$L8.requestHeaders", "Object"],
                ["json.stringify", "$L8.requestHeaders.clientdata", "$L1.client"],
                ["json.stringify", "$L8.requestHeaders.appdata", "$L1.app"],
                ["http.requestCall", "$L9", "$L8"]
            ],
            "hashString": [
                ["hash.md5", "$L0", "$P1"],
                ["size", "$L1", "$L0"],
                ["set", "$L2", 0],
                ["set", "$P0", ""],
                ["get", "$L3", "$L0", "$L2"],
                ["string.format", "$L4", "%02X", "$L3"],
                ["string.concat", "$P0", "$P0", "$L4"],
                ["math.add", "$L2", "$L2", 1],
                ["if>=than", "$L2", "$L1", -5]
            ]
        };
        let interpreterStorage = {
            "serviceName": servicename,
            "platform": "Node.js",
            "os": os.type() + " , " + os.arch() + " , " + os.release()
        };
        dns.lookup(os.hostname(), (err, add, fam) => {
            let mac;
            let interfaces = os.networkInterfaces();
            for (let key in interfaces) {
                for (let entry of interfaces[key]) {
                    if (entry.address === add) {
                        mac = entry.mac;
                        break;
                    }
                }
                if (mac)
                    break;
            }
            let pjson;
            let path = "./package.json";
            let limit = 50;
            while (!pjson && limit > 0) {
                try {
                    let tmp = require(path);
                    if (tmp.name === "cloudrail-si")
                        throw Error();
                    else
                        pjson = tmp;
                }
                catch (err) {
                    if (path.startsWith("./")) {
                        path = "." + path;
                    }
                    else {
                        path = "../" + path;
                    }
                }
                limit--;
            }
            let name;
            let version;
            if (!pjson) {
                name = "unknown";
                version = "unknown";
            }
            else {
                name = pjson.name ? pjson.name : "unknown";
                version = pjson.version ? pjson.version : "unknown";
            }
            let interpreter = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, [], {}));
            interpreter.callFunction("selfTest", interpreterStorage, mac, name, version);
        });
        return testState;
    }
}
InitSelfTest.testedServices = new Set();
exports.InitSelfTest = InitSelfTest;
