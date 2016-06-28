"use strict";
const SandboxObject_1 = require("./SandboxObject");
const DetailErrors_1 = require("../errors/DetailErrors");
class Refund extends SandboxObject_1.SandboxObject {
    constructor(_amount, _chargeID, _created, _id, _state, _currency) {
        super();
        this._amount = _amount;
        this._chargeID = _chargeID;
        this._created = _created;
        this._id = _id;
        this._state = _state;
        this._currency = _currency;
        if (_chargeID == null || _id == null || _state == null) {
            throw new DetailErrors_1.IllegalArgumentError("At least one of the parameters is null.");
        }
        else if (["pending", "succeeded", "failed"].indexOf(_state) < 0) {
            throw new DetailErrors_1.IllegalArgumentError("Unknown state. Allowed values are: 'succeeded', 'failed' or 'pending'.");
        }
        else if (_currency.length !== 3) {
            throw new DetailErrors_1.IllegalArgumentError("The passed currency is invalid.");
        }
        this._currency = _currency.toUpperCase();
    }
    get id() {
        return this._id;
    }
    get amount() {
        return this._amount;
    }
    get created() {
        return this._created;
    }
    get currency() {
        return this._currency;
    }
    get chargeID() {
        return this._chargeID;
    }
    get state() {
        return this._state;
    }
}
exports.Refund = Refund;
