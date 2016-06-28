"use strict";
const SandboxObject_1 = require("./SandboxObject");
const DetailErrors_1 = require("../errors/DetailErrors");
const InternalError_1 = require("../errors/InternalError");
const Helper_1 = require("../helpers/Helper");
class CreditCard extends SandboxObject_1.SandboxObject {
    constructor(cvc, expire_month, expire_year, number, type, firstName, lastName, address) {
        super();
        this.cvc = cvc;
        this.expire_month = expire_month;
        this.expire_year = expire_year;
        this.number = number;
        this.type = type;
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
    }
    get expire_month() {
        return this._expire_month;
    }
    set expire_month(value) {
        if (value == null)
            throw new DetailErrors_1.IllegalArgumentError("Expiration month shouldn't be null");
        if (value <= 0 || value > 12) {
            throw new DetailErrors_1.IllegalArgumentError("Expiration month needs to be between 1 and 12.");
        }
        this._expire_month = value;
    }
    get expire_year() {
        return this._expire_year;
    }
    set expire_year(value) {
        if (value == null)
            throw new DetailErrors_1.IllegalArgumentError("Expiration year shouldn't be null");
        if (value < 1970 || value.toString().length !== 4) {
            throw new DetailErrors_1.IllegalArgumentError("Expiration year needs to be a four digit number.");
        }
        this._expire_year = value;
    }
    get number() {
        return this._number;
    }
    set number(value) {
        if (value == null) {
            throw new DetailErrors_1.IllegalArgumentError("Card number is not allowed to be null.");
        }
        this._number = value;
    }
    get type() {
        return this._type;
    }
    set type(value) {
        if (value == null) {
            throw new DetailErrors_1.IllegalArgumentError("Card type is not allowed to be null.");
        }
        else if (["visa", "mastercard", "discover", "amex"].indexOf(value) < 0) {
            throw new DetailErrors_1.IllegalArgumentError("Unknown card type. Allowed values are: 'visa', 'mastercard', 'discover' or 'amex'.");
        }
        this._type = value;
    }
    compareTo(obj) {
        if (obj == null || !(obj instanceof CreditCard)) {
            throw new InternalError_1.InternalError("CreditCards must only be compared with other non-null CreditCards");
        }
        let another = obj;
        let compare;
        compare = Helper_1.Helper.compare(this.firstName, another.firstName);
        if (compare)
            return compare;
        compare = Helper_1.Helper.compare(this.lastName, another.lastName);
        if (compare)
            return compare;
        compare = Helper_1.Helper.compare(this.number.substring(12), another.number.substring(12));
        if (compare)
            return compare;
        compare = Helper_1.Helper.compare(this.expire_month, another.expire_month);
        if (compare)
            return compare;
        compare = Helper_1.Helper.compare(this.expire_year, another.expire_year);
        if (compare)
            return compare;
        return Helper_1.Helper.compare(this.type, another.type);
    }
}
exports.CreditCard = CreditCard;
