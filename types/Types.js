"use strict";
const DateOfBirth_1 = require("./DateOfBirth");
const CloudMetaData_1 = require("./CloudMetaData");
const Error_1 = require("./Error");
const Date_1 = require("./Date");
const Address_1 = require("./Address");
const Charge_1 = require("./Charge");
const CreditCard_1 = require("./CreditCard");
const Location_1 = require("./Location");
const POI_1 = require("./POI");
const Refund_1 = require("./Refund");
const Subscription_1 = require("./Subscription");
const SubscriptionPlan_1 = require("./SubscriptionPlan");
class Types {
}
Types.typeMap = {
    "DateOfBirth": DateOfBirth_1.DateOfBirth,
    "CloudMetaData": CloudMetaData_1.CloudMetaData,
    "Error": Error_1.Error,
    "Date": Date_1.CustomDate,
    "CustomDate": Date_1.CustomDate,
    "Address": Address_1.Address,
    "Charge": Charge_1.Charge,
    "CreditCard": CreditCard_1.CreditCard,
    "Location": Location_1.Location,
    "POI": POI_1.POI,
    "Refund": Refund_1.Refund,
    "Subscription": Subscription_1.Subscription,
    "SubscriptionPlan": SubscriptionPlan_1.SubscriptionPlan
};
exports.Types = Types;
