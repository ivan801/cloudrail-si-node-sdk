"use strict";
const SandboxObject_1 = require("./SandboxObject");
class POI extends SandboxObject_1.SandboxObject {
    constructor(categories, imageURL, location, name, phone) {
        super();
        this.categories = categories;
        this.imageURL = imageURL;
        this.location = location;
        this.name = name;
        this.phone = phone;
    }
}
exports.POI = POI;
