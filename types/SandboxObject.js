"use strict";
const Helper_1 = require("../helpers/Helper");
class SandboxObject {
    get(key) {
        let entry = this[Helper_1.Helper.lowerCaseFirstLetter(key)];
        if (Helper_1.Helper.isBoolean(entry)) {
            entry = entry ? 1 : 0;
        }
        return entry;
    }
    set(key, value) {
        this[Helper_1.Helper.lowerCaseFirstLetter(key)] = value;
    }
}
exports.SandboxObject = SandboxObject;
