"use strict";
const SandboxObject_1 = require("./SandboxObject");
const DetailErrors_1 = require("../errors/DetailErrors");
class Charge extends SandboxObject_1.SandboxObject {
    constructor(_amount, _created, _currency, _id, _refunded, _source, _status) {
        super();
        this._amount = _amount;
        this._created = _created;
        this._currency = _currency;
        this._id = _id;
        this._refunded = _refunded;
        this._source = _source;
        this._status = _status;
        if (_currency == null || _id == null || _source == null || _status == null || _refunded == null) {
            throw new DetailErrors_1.IllegalArgumentError("One or more parameters are null.");
        }
        else if (_amount < 0) {
            throw new DetailErrors_1.IllegalArgumentError("The amount can not be less than 0.");
        }
        else if (_currency.length !== 3) {
            throw new DetailErrors_1.IllegalArgumentError("The passed currency is invalid.");
        }
        else if (["pending", "succeeded", "failed"].indexOf(_status) < 0) {
            throw new DetailErrors_1.IllegalArgumentError("The passed state should be one of: 'pending', 'succeeded' or 'failed'.");
        }
        this._currency = _currency.toUpperCase();
        this._refunded = !!_refunded;
    }
    get id() {
        return this._id;
    }
    get amount() {
        return this._amount;
    }
    get currency() {
        return this._currency;
    }
    get source() {
        return this._source;
    }
    get created() {
        return this._created;
    }
    get status() {
        return this._status;
    }
    get refunded() {
        return this._refunded;
    }
}
exports.Charge = Charge;
