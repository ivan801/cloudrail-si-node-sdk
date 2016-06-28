"use strict";
const SandboxObject_1 = require("./SandboxObject");
class DateOfBirth extends SandboxObject_1.SandboxObject {
    constructor(day, month, year) {
        super();
        this.day = day;
        this.month = month;
        this.year = year;
    }
}
exports.DateOfBirth = DateOfBirth;
