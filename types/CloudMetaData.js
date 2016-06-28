"use strict";
const SandboxObject_1 = require("./SandboxObject");
class CloudMetaData extends SandboxObject_1.SandboxObject {
    get folder() {
        return this._folder;
    }
    set folder(value) {
        this._folder = !!value;
    }
    toString() {
        let s = "";
        s += "name -> '" + this.name + "'\n";
        s += "path -> '" + this.path + "'\n";
        s += "size -> '" + this.size + "'\n";
        s += "folder -> '" + this.folder + "'";
        return s;
    }
}
exports.CloudMetaData = CloudMetaData;
