"use strict";
const SandboxObject_1 = require("./SandboxObject");
const InternalError_1 = require("../errors/InternalError");
class CustomDate extends SandboxObject_1.SandboxObject {
    constructor(date) {
        super();
        if (date != null)
            this.date = new Date(Date.parse(date));
        else
            this.date = new Date();
    }
    getDate() {
        return this.date;
    }
    get time() {
        return this.date.getTime();
    }
    set time(value) {
        this.date.setTime(value);
    }
    get rfcTime() {
        return this.date.toISOString().slice(0, 19) + "Z";
    }
    toJSONString() {
        return "" + this.date.getTime();
    }
    fromJSONString(jsonString) {
        let cd = new CustomDate();
        cd.time = parseInt(jsonString);
        return cd;
    }
    compareTo(obj) {
        if (!(obj instanceof CustomDate)) {
            throw new InternalError_1.InternalError("Comparing a Date with a non-Date");
        }
        if (this.getDate() < obj.getDate())
            return -1;
        else if (obj.getDate() < this.getDate())
            return 1;
        else if (this.getDate() === obj.getDate())
            return 0;
        else
            throw new InternalError_1.InternalError("Comparing a Date with a non-Date");
    }
}
exports.CustomDate = CustomDate;
