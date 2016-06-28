"use strict";
const SandboxObject_1 = require("./SandboxObject");
const DetailErrors_1 = require("../errors/DetailErrors");
class Subscription extends SandboxObject_1.SandboxObject {
    constructor(_created, _description, _id, _lastCharge, _name, _nextCharge, _creditCard, _state, _subscriptionPlanID) {
        super();
        this._created = _created;
        this._description = _description;
        this._id = _id;
        this._lastCharge = _lastCharge;
        this._name = _name;
        this._nextCharge = _nextCharge;
        this._creditCard = _creditCard;
        this._state = _state;
        this._subscriptionPlanID = _subscriptionPlanID;
        if (_description == null || _id == null || _name == null || _creditCard == null || _state == null || _subscriptionPlanID == null) {
            throw new DetailErrors_1.IllegalArgumentError("At least one of the parameters is undefined.");
        }
        else if (["active", "cancelled"].indexOf(_state) < 0) {
            throw new DetailErrors_1.IllegalArgumentError("Unknown state. Allowed values are: 'active' or 'canceled'.");
        }
    }
    get created() {
        return this._created;
    }
    get description() {
        return this._description;
    }
    get id() {
        return this._id;
    }
    get lastCharge() {
        return this._lastCharge;
    }
    get name() {
        return this._name;
    }
    get nextCharge() {
        return this._nextCharge;
    }
    get creditCard() {
        return this._creditCard;
    }
    get state() {
        return this._state;
    }
    get subscriptionPlanID() {
        return this._subscriptionPlanID;
    }
}
exports.Subscription = Subscription;
