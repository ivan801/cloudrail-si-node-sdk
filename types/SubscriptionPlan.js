"use strict";
const SandboxObject_1 = require("./SandboxObject");
const DetailErrors_1 = require("../errors/DetailErrors");
class SubscriptionPlan extends SandboxObject_1.SandboxObject {
    constructor(_amount, _created, _currency, _description, _id, _interval, _interval_count, _name) {
        super();
        this._amount = _amount;
        this._created = _created;
        this._currency = _currency;
        this._description = _description;
        this._id = _id;
        this._interval = _interval;
        this._interval_count = _interval_count;
        this._name = _name;
        if (_currency == null || _description == null || _id == null || _interval == null || _name == null) {
            throw new DetailErrors_1.IllegalArgumentError("At least one of the parameters is undefined.");
        }
        else if (_amount < 0) {
            throw new DetailErrors_1.IllegalArgumentError("Amount can not be less than 0.");
        }
        else if (_currency.length !== 3) {
            throw new DetailErrors_1.IllegalArgumentError("Passed currency is not a valid three-letter currency code.");
        }
        else if (["day", "week", "month", "year"].indexOf(_interval) < 0) {
            throw new DetailErrors_1.IllegalArgumentError("Unknown interval. Allowed values are: 'day', 'week', 'month' or 'year'.");
        }
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
    get description() {
        return this._description;
    }
    get id() {
        return this._id;
    }
    get interval() {
        return this._interval;
    }
    get interval_count() {
        return this._interval_count;
    }
    get name() {
        return this._name;
    }
}
exports.SubscriptionPlan = SubscriptionPlan;
