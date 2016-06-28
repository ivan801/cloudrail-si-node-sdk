"use strict";
const Interpreter_1 = require("../servicecode/Interpreter");
const Sandbox_1 = require("../servicecode/Sandbox");
const ErrorType_1 = require("../types/ErrorType");
const DetailErrors_1 = require("../errors/DetailErrors");
const InitSelfTest_1 = require("../servicecode/InitSelfTest");
const SERVICE_CODE = {
    "createCharge": [
        ["callFunc", "checkNull", "$P0", "$P2", "Amount"],
        ["callFunc", "checkLessThanZero", "$P0", "$P2", "Amount"],
        ["callFunc", "checkStringNullOrEmpty", "$P0", "$P3", "Currency"],
        ["callFunc", "checkCurrency", "$P0", "$P3"],
        ["callFunc", "checkNull", "$P0", "$P4", "Credit Card"],
        ["create", "$L0", "Object"],
        ["set", "$L0.method", "POST"],
        ["create", "$L1", "String"],
        ["callFunc", "createSource", "$P0", "$L2", "$P4"],
        ["string.concat", "$L0.requestBody", "amount=", "$P2", "&currency=", "$P3", "&", "$L2"],
        ["stream.stringToStream", "$L0.requestBody", "$L0.requestBody"],
        ["string.concat", "$L0.url", "https://api.stripe.com/v1/charges"],
        ["callFunc", "addAuthenticationHeader", "$P0", "$L3"],
        ["set", "$L3.Content-Type", "application/x-www-form-urlencoded"],
        ["set", "$L0.requestHeaders", "$L3"],
        ["http.requestCall", "$L4", "$L0"],
        ["callFunc", "checkHttpErrors", "$P0", "$L4"],
        ["json.parse", "$L5", "$L4.responseBody"],
        ["callFunc", "retrieveCharge", "$P0", "$P1", "$L5"]
    ],
    "getCharge": [
        ["callFunc", "checkStringNullOrEmpty", "$P0", "$P2", "Identifier"],
        ["create", "$L0", "Object"],
        ["set", "$L0.method", "GET"],
        ["string.concat", "$L1", "https://api.stripe.com/v1/charges/", "$P2"],
        ["set", "$L0.url", "$L1"],
        ["callFunc", "addAuthenticationHeader", "$P0", "$L3"],
        ["set", "$L0.requestHeaders", "$L3"],
        ["http.requestCall", "$L4", "$L0"],
        ["callFunc", "checkHttpErrors", "$P0", "$L4"],
        ["json.parse", "$L5", "$L4.responseBody"],
        ["callFunc", "retrieveCharge", "$P0", "$P1", "$L5"]
    ],
    "listCharges": [
        ["callFunc", "checkNull", "$P0", "$P2", "From"],
        ["callFunc", "checkNull", "$P0", "$P3", "To"],
        ["callFunc", "checkLessThanZero", "$P0", "$P2", "From"],
        ["callFunc", "checkLessThanZero", "$P0", "$P3", "To"],
        ["callFunc", "checkGreaterEqualThan", "$P0", "$P2", "$P3", "From", "To"],
        ["create", "$L20", "Date"],
        ["callFunc", "checkGreaterThan", "$P0", "$P3", "$L20.time", "To", "Current Date"],
        ["create", "$L6", "Array"],
        ["callFunc", "getListCharges", "$P0", "$L6", "$P2", "$P3", null],
        ["size", "$L7", "$L6"],
        ["create", "$L8", "Number", 0],
        ["create", "$L9", "Array"],
        ["create", "$L10", "Number", 0],
        ["if<than", "$L8", "$L7", 9],
        ["get", "$L11", "$L6", "$L8"],
        ["callFunc", "retrieveCharge", "$P0", "$L12", "$L11"],
        ["if==than", "$P4", null, 1],
        ["push", "$L9", "$L12"],
        ["if!=than", "$P4", null, 2],
        ["if==than", "$L12.source", "$P4", 1],
        ["push", "$L9", "$L12"],
        ["math.add", "$L8", "$L8", 1],
        ["jumpRel", -10],
        ["set", "$P1", "$L9"]
    ],
    "refundCharge": [
        ["callFunc", "checkStringNullOrEmpty", "$P0", "$P2", "Identifier"],
        ["create", "$L0", "Object"],
        ["set", "$L0.method", "POST"],
        ["create", "$L1", "String"],
        ["string.concat", "$L0.requestBody", "charge=", "$P2"],
        ["stream.stringToStream", "$L0.requestBody", "$L0.requestBody"],
        ["string.concat", "$L0.url", "https://api.stripe.com/v1/refunds"],
        ["callFunc", "addAuthenticationHeader", "$P0", "$L3"],
        ["set", "$L3.Content-Type", "application/x-www-form-urlencoded"],
        ["set", "$L0.requestHeaders", "$L3"],
        ["http.requestCall", "$L4", "$L0"],
        ["callFunc", "checkHttpErrors", "$P0", "$L4"],
        ["json.parse", "$L5", "$L4.responseBody"],
        ["callFunc", "retrieveRefund", "$P0", "$P1", "$L5"]
    ],
    "partiallyRefundCharge": [
        ["callFunc", "checkStringNullOrEmpty", "$P0", "$P2", "Identifier"],
        ["callFunc", "checkNull", "$P0", "$P3", "Amount"],
        ["callFunc", "checkLessThanZero", "$P0", "$P3", "Amount"],
        ["create", "$L0", "Object"],
        ["set", "$L0.method", "POST"],
        ["create", "$L1", "String"],
        ["string.concat", "$L0.requestBody", "charge=", "$P2", "&amount=", "$P3"],
        ["stream.stringToStream", "$L0.requestBody", "$L0.requestBody"],
        ["string.concat", "$L0.url", "https://api.stripe.com/v1/refunds"],
        ["callFunc", "addAuthenticationHeader", "$P0", "$L3"],
        ["set", "$L3.Content-Type", "application/x-www-form-urlencoded"],
        ["set", "$L0.requestHeaders", "$L3"],
        ["http.requestCall", "$L4", "$L0"],
        ["callFunc", "checkHttpErrors", "$P0", "$L4"],
        ["json.parse", "$L5", "$L4.responseBody"],
        ["callFunc", "retrieveRefund", "$P0", "$P1", "$L5"]
    ],
    "getRefund": [
        ["callFunc", "checkStringNullOrEmpty", "$P0", "$P2", "Identifier"],
        ["create", "$L0", "Object"],
        ["set", "$L0.method", "GET"],
        ["string.concat", "$L1", "https://api.stripe.com/v1/refunds/", "$P2"],
        ["set", "$L0.url", "$L1"],
        ["callFunc", "addAuthenticationHeader", "$P0", "$L3"],
        ["set", "$L0.requestHeaders", "$L3"],
        ["http.requestCall", "$L4", "$L0"],
        ["callFunc", "checkHttpErrors", "$P0", "$L4"],
        ["json.parse", "$L5", "$L4.responseBody"],
        ["callFunc", "retrieveRefund", "$P0", "$P1", "$L5"]
    ],
    "getRefundsForCharge": [
        ["callFunc", "checkStringNullOrEmpty", "$P0", "$P2", "Identifier"],
        ["create", "$L0", "Object"],
        ["set", "$L0.method", "GET"],
        ["string.concat", "$L1", "https://api.stripe.com/v1/charges/", "$P2"],
        ["set", "$L0.url", "$L1"],
        ["callFunc", "addAuthenticationHeader", "$P0", "$L3"],
        ["set", "$L0.requestHeaders", "$L3"],
        ["http.requestCall", "$L4", "$L0"],
        ["callFunc", "checkHttpErrors", "$P0", "$L4"],
        ["json.parse", "$L5", "$L4.responseBody"],
        ["create", "$L6", "Array"],
        ["set", "$L7", "$L5.refunds.data"],
        ["size", "$L8", "$L7"],
        ["create", "$L9", "Number", 0],
        ["if<than", "$L9", "$L8", 5],
        ["get", "$L10", "$L7", "$L9"],
        ["callFunc", "getRefund", "$P0", "$L11", "$L10.id"],
        ["push", "$L6", "$L11"],
        ["math.add", "$L9", "$L9", 1],
        ["jumpRel", -6],
        ["set", "$P1", "$L6"]
    ],
    "createSubscriptionPlan": [
        ["callFunc", "checkStringNullOrEmpty", "$P0", "$P2", "Name"],
        ["callFunc", "checkNull", "$P0", "$P3", "Amount"],
        ["callFunc", "checkStringNullOrEmpty", "$P0", "$P4", "Currency"],
        ["callFunc", "checkStringNullOrEmpty", "$P0", "$P5", "Description"],
        ["callFunc", "checkNull", "$P0", "$P6", "Interval"],
        ["callFunc", "checkNull", "$P0", "$P7", "Interval count"],
        ["callFunc", "checkLessThanZero", "$P0", "$P3", "Amount"],
        ["callFunc", "checkLessThanZero", "$P0", "$P7", "Interval Count"],
        ["callFunc", "checkInterval", "$P0", "$P6"],
        ["callFunc", "checkCurrency", "$P0", "$P4"],
        ["create", "$L0", "Object"],
        ["set", "$L0.method", "POST"],
        ["create", "$L1", "String"],
        ["string.urlEncode", "$L10", "$P2"],
        ["string.concat", "$L0.requestBody", "name=", "$L10", "&amount=", "$P3", "&currency=", "$P4", "&statement_descriptor=", "$P5", "&interval=", "$P6", "&interval_count=", "$P7", "&id=", "$L10"],
        ["stream.stringToStream", "$L0.requestBody", "$L0.requestBody"],
        ["string.concat", "$L0.url", "https://api.stripe.com/v1/plans"],
        ["callFunc", "addAuthenticationHeader", "$P0", "$L3"],
        ["set", "$L3.Content-Type", "application/x-www-form-urlencoded"],
        ["set", "$L0.requestHeaders", "$L3"],
        ["http.requestCall", "$L4", "$L0"],
        ["callFunc", "checkHttpErrors", "$P0", "$L4"],
        ["json.parse", "$L5", "$L4.responseBody"],
        ["callFunc", "retrieveSubscriptionPlan", "$P0", "$P1", "$L5"]
    ],
    "listSubscriptionPlans": [
        ["create", "$L0", "Array"],
        ["callFunc", "getListSubscriptions", "$P0", "$L0", null],
        ["size", "$L2", "$L0"],
        ["create", "$L3", "Number", 0],
        ["create", "$L5", "Array"],
        ["if<than", "$L3", "$L2", 5],
        ["get", "$L4", "$L0", "$L3"],
        ["callFunc", "retrieveSubscriptionPlan", "$P0", "$L6", "$L4"],
        ["push", "$L5", "$L6"],
        ["math.add", "$L3", "$L3", 1],
        ["jumpRel", -6],
        ["set", "$P1", "$L5"]
    ],
    "createSubscription": [
        ["callFunc", "checkStringNullOrEmpty", "$P0", "$P2", "Plan Identifier"],
        ["callFunc", "checkStringNullOrEmpty", "$P0", "$P3", "Name"],
        ["callFunc", "checkStringNullOrEmpty", "$P0", "$P4", "Description"],
        ["callFunc", "checkNull", "$P0", "$P5", "CreditCard"],
        ["callFunc", "createCustomer", "$P0", "$L0", "$P5"],
        ["set", "$L1", "$L0.id"],
        ["callFunc", "retrieveCustomerSource", "$P0", "$L2", "$L0"],
        ["create", "$L3", "Object"],
        ["set", "$L3.method", "POST"],
        ["string.urlEncode", "$L15", "$P4"],
        ["string.urlEncode", "$L16", "$P3"],
        ["string.concat", "$L3.requestBody", "plan=", "$P2", "&customer=", "$L1", "&", "metadata[description]=", "$L15", "&metadata[name]=", "$L16"],
        ["stream.stringToStream", "$L3.requestBody", "$L3.requestBody"],
        ["string.concat", "$L3.url", "https://api.stripe.com/v1/subscriptions"],
        ["callFunc", "addAuthenticationHeader", "$P0", "$L4"],
        ["set", "$L4.Content-Type", "application/x-www-form-urlencoded"],
        ["set", "$L3.requestHeaders", "$L4"],
        ["http.requestCall", "$L5", "$L3"],
        ["callFunc", "checkHttpErrors", "$P0", "$L5"],
        ["json.parse", "$L6", "$L5.responseBody"],
        ["callFunc", "retrieveSubscription", "$P0", "$P1", "$L6", "$L2"]
    ],
    "cancelSubscription": [
        ["callFunc", "checkStringNullOrEmpty", "$P0", "$P1", "Identifier"],
        ["create", "$L0", "Object"],
        ["set", "$L0.method", "DELETE"],
        ["string.urlEncode", "$P1", "$P1"],
        ["string.concat", "$L0.url", "https://api.stripe.com/v1/subscriptions/", "$P1"],
        ["callFunc", "addAuthenticationHeader", "$P0", "$L1"],
        ["set", "$L0.requestHeaders", "$L1"],
        ["http.requestCall", "$L2", "$L0"],
        ["callFunc", "checkHttpErrors", "$P0", "$L2"]
    ],
    "checkNull": [
        ["if==than", "$P1", null, 3],
        ["string.concat", "$L0", "$P2", " is not allowed to be null."],
        ["create", "$L1", "Error", "$L0", "IllegalArgument"],
        ["throwError", "$L1"]
    ],
    "checkStringNullOrEmpty": [
        ["if==than", "$P1", null, 3],
        ["string.concat", "$L0", "$P2", " is not allowed to be null."],
        ["create", "$L1", "Error", "$L0", "IllegalArgument"],
        ["throwError", "$L1"],
        ["if==than", "$P1", "", 3],
        ["string.concat", "$L0", "$P2", " is not allowed to be null."],
        ["create", "$L1", "Error", "$L0", "IllegalArgument"],
        ["throwError", "$L1"]
    ],
    "checkLessThanZero": [
        ["if<=than", "$P1", 0, 3],
        ["string.concat", "$L0", "$P2", " is not allowed to be less than 0."],
        ["create", "$L1", "Error", "$L0", "IllegalArgument"],
        ["throwError", "$L1"]
    ],
    "checkGreaterEqualThan": [
        ["if>=than", "$P1", "$P2", 3],
        ["string.concat", "$L0", "$P3", " is not allowed to be greater or equals than ", "$P4"],
        ["create", "$L1", "Error", "$L0", "IllegalArgument"],
        ["throwError", "$L1"]
    ],
    "checkGreaterThan": [
        ["if>than", "$P1", "$P2", 3],
        ["string.concat", "$L0", "$P3", " is not allowed to be greater or equals than ", "$P4"],
        ["create", "$L1", "Error", "$L0", "IllegalArgument"],
        ["throwError", "$L1"]
    ],
    "checkGreaterThanToday": [
        ["create", "$L1", "Date"],
        ["if>than", "$P1", "$L1.time", 3],
        ["string.concat", "$L0", "$P2", " is not allowed to be greater than current date"],
        ["create", "$L1", "Error", "$L0", "IllegalArgument"],
        ["throwError", "$L1"]
    ],
    "checkCurrency": [
        ["size", "$L0", "$P1"],
        ["if!=than", "$L0", 3, 2],
        ["create", "$L1", "Error", "Currency code has to have three letters.", "IllegalArgument"],
        ["throwError", "$L1"]
    ],
    "addAuthenticationHeader": [
        ["create", "$L0", "Object"],
        ["string.concat", "$L1", "$P0.secretKey", ":"],
        ["string.base64encode", "$L1", "$L1"],
        ["string.concat", "$L2", "Basic ", "$L1"],
        ["set", "$L0.Authorization", "$L2"],
        ["set", "$P1", "$L0"]
    ],
    "createSource": [
        ["create", "$L0", "String"],
        ["string.concat", "$L0", "$L0", "source[exp_month]=", "$P2.expire_month", "&"],
        ["string.concat", "$L0", "$L0", "source[exp_year]=", "$P2.expire_year", "&"],
        ["string.concat", "$L0", "$L0", "source[number]=", "$P2.number", "&"],
        ["string.concat", "$L0", "$L0", "source[object]=", "card", "&"],
        ["string.concat", "$L0", "$L0", "source[cvc]=", "$P2.cvc", "&"],
        ["if!=than", "$P2.address", null, 12],
        ["if!=than", "$P2.address.city", null, 1],
        ["string.concat", "$L0", "$L0", "source[address_city]=", "$P2.address.city", "&"],
        ["if!=than", "$P2.address.country", null, 1],
        ["string.concat", "$L0", "$L0", "source[address_country]=", "$P2.address.country", "&"],
        ["if!=than", "$P2.address.line1", null, 1],
        ["string.concat", "$L0", "$L0", "source[address_line1]=", "$P2.address.line1", "&"],
        ["if!=than", "$P2.address.line2", null, 1],
        ["string.concat", "$L0", "$L0", "source[address_line2]=", "$P2.address.line2", "&"],
        ["if!=than", "$P2.address.state", null, 1],
        ["string.concat", "$L0", "$L0", "source[address_state]=", "$P2.address.state", "&"],
        ["if!=than", "$P2.address.postalCode", null, 1],
        ["string.concat", "$L0", "$L0", "source[address_zip]=", "$P2.address.postalCode", "&"],
        ["if==than", "$P2.firstName", null, 1],
        ["set", "$P2.firstName", ""],
        ["if==than", "$P2.lastName", null, 1],
        ["set", "$P2.lastName", ""],
        ["string.concat", "$L1", "$P2.firstName", " ", "$P2.lastName"],
        ["string.urlEncode", "$L1", "$L1"],
        ["string.concat", "$L0", "$L0", "source[name]=", "$L1", "&"],
        ["string.concat", "$L0", "$L0", "metadata[firstName]=", "$P2.firstName", "&"],
        ["string.concat", "$L0", "$L0", "metadata[lastName]=", "$P2.lastName"],
        ["set", "$P1", "$L0"]
    ],
    "retrieveCharge": [
        ["set", "$L10", "$P2.id"],
        ["set", "$L11", "$P2.amount"],
        ["set", "$L12", "$P2.currency"],
        ["set", "$L13", "$P2.created"],
        ["set", "$L14", "$P2.status"],
        ["set", "$L15", "$P2.refunded"],
        ["callFunc", "retrieveSource", "$P0", "$L1", "$P2.source", "$P2.metadata"],
        ["create", "$L0", "Charge", "$L11", "$L13", "$L12", "$L10", "$L15", "$L1", "$L14"],
        ["set", "$P1", "$L0"]
    ],
    "retrieveSource": [
        ["string.concat", "$L16", "xxxxxxxxxxxx", "$P2.last4"],
        ["set", "$L17", "$P2.exp_month"],
        ["set", "$L18", "$P2.exp_year"],
        ["string.lowerCase", "$L19", "$P2.brand"],
        ["create", "$L20", "String", ""],
        ["create", "$L21", "String", ""],
        ["if!=than", "$P3.firstName", null, 2],
        ["set", "$L20", "$P3.firstName"],
        ["set", "$L21", "$P3.lastName"],
        ["if==than", "$P3.firstName", null, 14],
        ["if!=than", "$P2.name", null, 13],
        ["create", "$L2", "Array"],
        ["string.split", "$L2", "$P2.name", " "],
        ["size", "$L3", "$L2"],
        ["create", "$L4", "Number"],
        ["get", "$L20", "$L2", "$L4"],
        ["math.add", "$L4", "$L4", 1],
        ["create", "$L6", "String", ""],
        ["if<than", "$L4", "$L3", 4],
        ["get", "$L5", "$L2", "$L4"],
        ["string.concat", "$L6", "$L6", "$L5"],
        ["math.add", "$L4", "$L4", 1],
        ["jumpRel", -5],
        ["set", "$L21", "$L6"],
        ["create", "$L7", "Address"],
        ["if!=than", "$P2.address_country", null, 1],
        ["set", "$L7.country", "$P2.address_country"],
        ["if!=than", "$P2.address_city", null, 1],
        ["set", "$L7.city", "$P2.address_city"],
        ["if!=than", "$P2.address_state", null, 1],
        ["set", "$L7.state", "$P2.address_state"],
        ["if!=than", "$P2.address_line1", null, 1],
        ["set", "$L7.line1", "$P2.address_line1"],
        ["if!=than", "$P2.address_line2", null, 1],
        ["set", "$L7.line2", "$P2.address_line2"],
        ["if!=than", "$P2.address_zip", null, 1],
        ["set", "$L7.postalCode", "$P2.address_zip"],
        ["create", "$L1", "CreditCard", null, "$L17", "$L18", "$L16", "$L19", "$L20", "$L21", "$L7"],
        ["set", "$P1", "$L1"]
    ],
    "getListCharges": [
        ["create", "$L0", "Object"],
        ["set", "$L20", "$P2"],
        ["string.concat", "$L20", "$L20", ""],
        ["string.substring", "$L20", "$L20", 0, 10],
        ["math.add", "$L20", "$L20", 0],
        ["set", "$L21", "$P3"],
        ["string.concat", "$L21", "$L21", ""],
        ["string.substring", "$L21", "$L21", 0, 10],
        ["math.add", "$L21", "$L21", 0],
        ["string.concat", "$L1", "created%5Bgte%5D=", "$L20", "&", "created%5Blte%5D=", "$L21", "&limit=", "100"],
        ["if!=than", "$P4", null, 1],
        ["string.concat", "$L1", "$L1", "&", "starting_after=", "$P4"],
        ["set", "$L0.method", "GET"],
        ["string.concat", "$L2", "https://api.stripe.com/v1/charges", "?", "$L1"],
        ["set", "$L0.url", "$L2"],
        ["callFunc", "addAuthenticationHeader", "$P0", "$L3"],
        ["set", "$L0.requestHeaders", "$L3"],
        ["http.requestCall", "$L4", "$L0"],
        ["callFunc", "checkHttpErrors", "$P0", "$L4"],
        ["json.parse", "$L5", "$L4.responseBody"],
        ["create", "$L10", "Array"],
        ["set", "$L10", "$L5.data"],
        ["size", "$L11", "$L10"],
        ["create", "$L12", "Number", 0],
        ["if<than", "$L12", "$L11", 4],
        ["get", "$L13", "$L10", "$L12"],
        ["push", "$P1", "$L13"],
        ["math.add", "$L12", "$L12", 1],
        ["jumpRel", -5],
        ["if==than", "$L5.has_more", 0, 1],
        ["return"],
        ["size", "$L6", "$P1"],
        ["math.add", "$L6", "$L6", -1],
        ["get", "$L7", "$P1", "$L6"],
        ["callFunc", "getListCharges", "$P0", "$P1", "$P2", "$P3", "$L7.id"]
    ],
    "getListSubscriptions": [
        ["create", "$L0", "Object"],
        ["set", "$L0.method", "GET"],
        ["string.concat", "$L1", "https://api.stripe.com/v1/plans?limit=100"],
        ["if!=than", "$P2", null, 2],
        ["string.urlEncode", "$P2", "$P2"],
        ["string.concat", "$L1", "$L1", "&starting_after=", "$P2"],
        ["set", "$L0.url", "$L1"],
        ["callFunc", "addAuthenticationHeader", "$P0", "$L3"],
        ["set", "$L0.requestHeaders", "$L3"],
        ["http.requestCall", "$L4", "$L0"],
        ["callFunc", "checkHttpErrors", "$P0", "$L4"],
        ["json.parse", "$L5", "$L4.responseBody"],
        ["create", "$L10", "Array"],
        ["set", "$L10", "$L5.data"],
        ["size", "$L11", "$L10"],
        ["create", "$L12", "Number", 0],
        ["if<than", "$L12", "$L11", 4],
        ["get", "$L13", "$L10", "$L12"],
        ["push", "$P1", "$L13"],
        ["math.add", "$L12", "$L12", 1],
        ["jumpRel", -5],
        ["if==than", "$L5.has_more", 0, 1],
        ["return"],
        ["size", "$L6", "$P1"],
        ["math.add", "$L6", "$L6", -1],
        ["get", "$L7", "$P1", "$L6"],
        ["callFunc", "getListSubscriptions", "$P0", "$P1", "$L7.id"]
    ],
    "retrieveRefund": [
        ["set", "$L0", "$P2.amount"],
        ["set", "$L1", "$P2.charge"],
        ["set", "$L2", "$P2.created"],
        ["set", "$L3", "$P2.id"],
        ["set", "$L4", "$P2.status"],
        ["set", "$L5", "$P2.currency"],
        ["string.upperCase", "$L5", "$L5"],
        ["create", "$L6", "Refund", "$L0", "$L1", "$L2", "$L3", "$L4", "$L5"],
        ["set", "$P1", "$L6"]
    ],
    "retrieveSubscriptionPlan": [
        ["set", "$L0", "$P2.id"],
        ["set", "$L1", "$P2.amount"],
        ["set", "$L3", "$P2.created"],
        ["set", "$L4", "$P2.currency"],
        ["string.upperCase", "$L4", "$L4"],
        ["set", "$L5", "$P2.interval"],
        ["set", "$L6", "$P2.interval_count"],
        ["set", "$L7", "$P2.name"],
        ["set", "$L8", "$P2.statement_descriptor"],
        ["math.add", "$L6", "$L6", 0],
        ["create", "$L9", "SubscriptionPlan", "$L1", "$L3", "$L4", "$L8", "$L0", "$L5", "$L6", "$L7"],
        ["set", "$P1", "$L9"]
    ],
    "retrieveSubscription": [
        ["set", "$L0", "$P2.created"],
        ["set", "$L1", "$P2.metadata.description"],
        ["set", "$L2", "$P2.id"],
        ["set", "$L3", "$P2. current_period_start"],
        ["set", "$L4", "$P2.metadata.name"],
        ["set", "$L5", "$P2.current_period_end"],
        ["set", "$L6", "$P3"],
        ["set", "$L7", "$P2.status"],
        ["set", "$L8", "$P2.plan.id"],
        ["create", "$L9", "Subscription", "$L0", "$L1", "$L2", "$L3", "$L4", "$L5", "$L6", "$L7", "$L8"],
        ["set", "$P1", "$L9"]
    ],
    "createCustomer": [
        ["create", "$L0", "Object"],
        ["set", "$L0.method", "POST"],
        ["create", "$L1", "String"],
        ["callFunc", "createSource", "$P0", "$L2", "$P2"],
        ["string.concat", "$L0.requestBody", "$L2"],
        ["stream.stringToStream", "$L0.requestBody", "$L0.requestBody"],
        ["string.concat", "$L0.url", "https://api.stripe.com/v1/customers"],
        ["callFunc", "addAuthenticationHeader", "$P0", "$L3"],
        ["set", "$L3.Content-Type", "application/x-www-form-urlencoded"],
        ["set", "$L0.requestHeaders", "$L3"],
        ["http.requestCall", "$L4", "$L0"],
        ["callFunc", "checkHttpErrors", "$P0", "$L4"],
        ["json.parse", "$P1", "$L4.responseBody"]
    ],
    "retrieveCustomerSource": [
        ["create", "$L0", "Array"],
        ["set", "$L0", "$P2.sources.data"],
        ["size", "$L1", "$L0"],
        ["if>than", "$L1", 0, 1],
        ["get", "$L2", "$L0", 0],
        ["set", "$L2", "$L2"],
        ["callFunc", "retrieveSource", "$P0", "$L3", "$L2", "$P2.metadata"],
        ["set", "$P1", "$L3"]
    ],
    "checkInterval": [
        ["if!=than", "$P1", "day", 5],
        ["if!=than", "$P1", "month", 4],
        ["if!=than", "$P1", "week", 3],
        ["if!=than", "$P1", "year", 2],
        ["create", "$L0", "Error", "Interval must be one of day, month, week, year", "IllegalArgument"],
        ["throwError", "$L0"]
    ],
    "checkHttpErrors": [
        ["if>=than", "$P1.code", 400, 27],
        ["if>=than", "$P1.code", 500, 8],
        ["if!=than", "$P1.code", 503, 3],
        ["string.concat", "$L10", "The returned code was ", "$P1.code", " ", "$P1.message"],
        ["create", "$L3", "Error", "$L10", "Http"],
        ["throwError", "$L3"],
        ["if==than", "$P1.code", 503, 3],
        ["string.concat", "$L10", "The reurned code was ", "$P1.code", " ", "$P1.message"],
        ["create", "$L3", "Error", "$L10", "ServiceUnavailable"],
        ["throwError", "$L3"],
        ["json.parse", "$L0", "$P1.responseBody"],
        ["set", "$L1", "$L0.error"],
        ["set", "$L2", "$L1.message"],
        ["if==than", "$P1.code", 401, 2],
        ["create", "$L3", "Error", "$L2", "Authentication"],
        ["throwError", "$L3"],
        ["if==than", "$P1.code", 400, 2],
        ["create", "$L3", "Error", "$L2", "Http"],
        ["throwError", "$L3"],
        ["if>=than", "$P1.code", 402, 5],
        ["if<=than", "$P1.code", 509, 4],
        ["if!=than", "$P1.code", 503, 3],
        ["if!=than", "$P1.code", 404, 2],
        ["create", "$L3", "Error", "$L2", "Http"],
        ["throwError", "$L3"],
        ["if==than", "$P1.code", 404, 2],
        ["create", "$L3", "Error", "$L2", "NotFound"],
        ["throwError", "$L3"]
    ]
};
class Stripe {
    constructor(redirectReceiver, secretKey) {
        this.interpreterStorage = {};
        this.persistentStorage = [{}];
        this.instanceDependencyStorage = {
            redirectReceiver: redirectReceiver
        };
        InitSelfTest_1.InitSelfTest.initTest("Stripe");
        this.interpreterStorage["secretKey"] = secretKey;
        let ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        if (SERVICE_CODE["init"]) {
            ip.callFunctionSync("init", this.interpreterStorage);
        }
    }
    createCharge(amount, currency, source, callback) {
        let ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("createCharge", this.interpreterStorage, null, amount, currency, source).then(() => {
            let error = ip.sandbox.thrownError;
            if (error != null) {
                switch (error.getErrorType()) {
                    case ErrorType_1.ErrorType.ILLEGAL_ARGUMENT:
                        throw new DetailErrors_1.IllegalArgumentError(error.toString());
                    case ErrorType_1.ErrorType.AUTHENTICATION:
                        throw new DetailErrors_1.AuthenticationError(error.toString());
                    case ErrorType_1.ErrorType.NOT_FOUND:
                        throw new DetailErrors_1.NotFoundError(error.toString());
                    case ErrorType_1.ErrorType.HTTP:
                        throw new DetailErrors_1.HttpError(error.toString());
                    case ErrorType_1.ErrorType.SERVICE_UNAVAILABLE:
                        throw new DetailErrors_1.ServiceUnavailableError(error.toString());
                    default:
                        throw new Error(error.toString());
                }
            }
        }).then(() => {
            let res;
            res = ip.getParameter(1);
            if (callback != null && typeof callback === "function")
                callback(undefined, res);
        }, err => {
            if (callback != null && typeof callback === "function")
                callback(err);
        });
    }
    getCharge(id, callback) {
        let ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("getCharge", this.interpreterStorage, null, id).then(() => {
            let error = ip.sandbox.thrownError;
            if (error != null) {
                switch (error.getErrorType()) {
                    case ErrorType_1.ErrorType.ILLEGAL_ARGUMENT:
                        throw new DetailErrors_1.IllegalArgumentError(error.toString());
                    case ErrorType_1.ErrorType.AUTHENTICATION:
                        throw new DetailErrors_1.AuthenticationError(error.toString());
                    case ErrorType_1.ErrorType.NOT_FOUND:
                        throw new DetailErrors_1.NotFoundError(error.toString());
                    case ErrorType_1.ErrorType.HTTP:
                        throw new DetailErrors_1.HttpError(error.toString());
                    case ErrorType_1.ErrorType.SERVICE_UNAVAILABLE:
                        throw new DetailErrors_1.ServiceUnavailableError(error.toString());
                    default:
                        throw new Error(error.toString());
                }
            }
        }).then(() => {
            let res;
            res = ip.getParameter(1);
            if (callback != null && typeof callback === "function")
                callback(undefined, res);
        }, err => {
            if (callback != null && typeof callback === "function")
                callback(err);
        });
    }
    listCharges(from, to, creditCard, callback) {
        let ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("listCharges", this.interpreterStorage, null, from, to, creditCard).then(() => {
            let error = ip.sandbox.thrownError;
            if (error != null) {
                switch (error.getErrorType()) {
                    case ErrorType_1.ErrorType.ILLEGAL_ARGUMENT:
                        throw new DetailErrors_1.IllegalArgumentError(error.toString());
                    case ErrorType_1.ErrorType.AUTHENTICATION:
                        throw new DetailErrors_1.AuthenticationError(error.toString());
                    case ErrorType_1.ErrorType.NOT_FOUND:
                        throw new DetailErrors_1.NotFoundError(error.toString());
                    case ErrorType_1.ErrorType.HTTP:
                        throw new DetailErrors_1.HttpError(error.toString());
                    case ErrorType_1.ErrorType.SERVICE_UNAVAILABLE:
                        throw new DetailErrors_1.ServiceUnavailableError(error.toString());
                    default:
                        throw new Error(error.toString());
                }
            }
        }).then(() => {
            let res;
            res = ip.getParameter(1);
            if (callback != null && typeof callback === "function")
                callback(undefined, res);
        }, err => {
            if (callback != null && typeof callback === "function")
                callback(err);
        });
    }
    refundCharge(id, callback) {
        let ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("refundCharge", this.interpreterStorage, null, id).then(() => {
            let error = ip.sandbox.thrownError;
            if (error != null) {
                switch (error.getErrorType()) {
                    case ErrorType_1.ErrorType.ILLEGAL_ARGUMENT:
                        throw new DetailErrors_1.IllegalArgumentError(error.toString());
                    case ErrorType_1.ErrorType.AUTHENTICATION:
                        throw new DetailErrors_1.AuthenticationError(error.toString());
                    case ErrorType_1.ErrorType.NOT_FOUND:
                        throw new DetailErrors_1.NotFoundError(error.toString());
                    case ErrorType_1.ErrorType.HTTP:
                        throw new DetailErrors_1.HttpError(error.toString());
                    case ErrorType_1.ErrorType.SERVICE_UNAVAILABLE:
                        throw new DetailErrors_1.ServiceUnavailableError(error.toString());
                    default:
                        throw new Error(error.toString());
                }
            }
        }).then(() => {
            let res;
            res = ip.getParameter(1);
            if (callback != null && typeof callback === "function")
                callback(undefined, res);
        }, err => {
            if (callback != null && typeof callback === "function")
                callback(err);
        });
    }
    partiallyRefundCharge(id, amount, callback) {
        let ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("partiallyRefundCharge", this.interpreterStorage, null, id, amount).then(() => {
            let error = ip.sandbox.thrownError;
            if (error != null) {
                switch (error.getErrorType()) {
                    case ErrorType_1.ErrorType.ILLEGAL_ARGUMENT:
                        throw new DetailErrors_1.IllegalArgumentError(error.toString());
                    case ErrorType_1.ErrorType.AUTHENTICATION:
                        throw new DetailErrors_1.AuthenticationError(error.toString());
                    case ErrorType_1.ErrorType.NOT_FOUND:
                        throw new DetailErrors_1.NotFoundError(error.toString());
                    case ErrorType_1.ErrorType.HTTP:
                        throw new DetailErrors_1.HttpError(error.toString());
                    case ErrorType_1.ErrorType.SERVICE_UNAVAILABLE:
                        throw new DetailErrors_1.ServiceUnavailableError(error.toString());
                    default:
                        throw new Error(error.toString());
                }
            }
        }).then(() => {
            let res;
            res = ip.getParameter(1);
            if (callback != null && typeof callback === "function")
                callback(undefined, res);
        }, err => {
            if (callback != null && typeof callback === "function")
                callback(err);
        });
    }
    getRefund(id, callback) {
        let ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("getRefund", this.interpreterStorage, null, id).then(() => {
            let error = ip.sandbox.thrownError;
            if (error != null) {
                switch (error.getErrorType()) {
                    case ErrorType_1.ErrorType.ILLEGAL_ARGUMENT:
                        throw new DetailErrors_1.IllegalArgumentError(error.toString());
                    case ErrorType_1.ErrorType.AUTHENTICATION:
                        throw new DetailErrors_1.AuthenticationError(error.toString());
                    case ErrorType_1.ErrorType.NOT_FOUND:
                        throw new DetailErrors_1.NotFoundError(error.toString());
                    case ErrorType_1.ErrorType.HTTP:
                        throw new DetailErrors_1.HttpError(error.toString());
                    case ErrorType_1.ErrorType.SERVICE_UNAVAILABLE:
                        throw new DetailErrors_1.ServiceUnavailableError(error.toString());
                    default:
                        throw new Error(error.toString());
                }
            }
        }).then(() => {
            let res;
            res = ip.getParameter(1);
            if (callback != null && typeof callback === "function")
                callback(undefined, res);
        }, err => {
            if (callback != null && typeof callback === "function")
                callback(err);
        });
    }
    getRefundsForCharge(id, callback) {
        let ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("getRefundsForCharge", this.interpreterStorage, null, id).then(() => {
            let error = ip.sandbox.thrownError;
            if (error != null) {
                switch (error.getErrorType()) {
                    case ErrorType_1.ErrorType.ILLEGAL_ARGUMENT:
                        throw new DetailErrors_1.IllegalArgumentError(error.toString());
                    case ErrorType_1.ErrorType.AUTHENTICATION:
                        throw new DetailErrors_1.AuthenticationError(error.toString());
                    case ErrorType_1.ErrorType.NOT_FOUND:
                        throw new DetailErrors_1.NotFoundError(error.toString());
                    case ErrorType_1.ErrorType.HTTP:
                        throw new DetailErrors_1.HttpError(error.toString());
                    case ErrorType_1.ErrorType.SERVICE_UNAVAILABLE:
                        throw new DetailErrors_1.ServiceUnavailableError(error.toString());
                    default:
                        throw new Error(error.toString());
                }
            }
        }).then(() => {
            let res;
            res = ip.getParameter(1);
            if (callback != null && typeof callback === "function")
                callback(undefined, res);
        }, err => {
            if (callback != null && typeof callback === "function")
                callback(err);
        });
    }
    createSubscriptionPlan(name, amount, currency, description, Longerval, Longerval_count, callback) {
        let ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("createSubscriptionPlan", this.interpreterStorage, null, name, amount, currency, description, Longerval, Longerval_count).then(() => {
            let error = ip.sandbox.thrownError;
            if (error != null) {
                switch (error.getErrorType()) {
                    case ErrorType_1.ErrorType.ILLEGAL_ARGUMENT:
                        throw new DetailErrors_1.IllegalArgumentError(error.toString());
                    case ErrorType_1.ErrorType.AUTHENTICATION:
                        throw new DetailErrors_1.AuthenticationError(error.toString());
                    case ErrorType_1.ErrorType.NOT_FOUND:
                        throw new DetailErrors_1.NotFoundError(error.toString());
                    case ErrorType_1.ErrorType.HTTP:
                        throw new DetailErrors_1.HttpError(error.toString());
                    case ErrorType_1.ErrorType.SERVICE_UNAVAILABLE:
                        throw new DetailErrors_1.ServiceUnavailableError(error.toString());
                    default:
                        throw new Error(error.toString());
                }
            }
        }).then(() => {
            let res;
            res = ip.getParameter(1);
            if (callback != null && typeof callback === "function")
                callback(undefined, res);
        }, err => {
            if (callback != null && typeof callback === "function")
                callback(err);
        });
    }
    listSubscriptionPlans(callback) {
        let ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("listSubscriptionPlans", this.interpreterStorage, null).then(() => {
            let error = ip.sandbox.thrownError;
            if (error != null) {
                switch (error.getErrorType()) {
                    case ErrorType_1.ErrorType.ILLEGAL_ARGUMENT:
                        throw new DetailErrors_1.IllegalArgumentError(error.toString());
                    case ErrorType_1.ErrorType.AUTHENTICATION:
                        throw new DetailErrors_1.AuthenticationError(error.toString());
                    case ErrorType_1.ErrorType.NOT_FOUND:
                        throw new DetailErrors_1.NotFoundError(error.toString());
                    case ErrorType_1.ErrorType.HTTP:
                        throw new DetailErrors_1.HttpError(error.toString());
                    case ErrorType_1.ErrorType.SERVICE_UNAVAILABLE:
                        throw new DetailErrors_1.ServiceUnavailableError(error.toString());
                    default:
                        throw new Error(error.toString());
                }
            }
        }).then(() => {
            let res;
            res = ip.getParameter(1);
            if (callback != null && typeof callback === "function")
                callback(undefined, res);
        }, err => {
            if (callback != null && typeof callback === "function")
                callback(err);
        });
    }
    createSubscription(planID, name, description, source, callback) {
        let ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("createSubscription", this.interpreterStorage, null, planID, name, description, source).then(() => {
            let error = ip.sandbox.thrownError;
            if (error != null) {
                switch (error.getErrorType()) {
                    case ErrorType_1.ErrorType.ILLEGAL_ARGUMENT:
                        throw new DetailErrors_1.IllegalArgumentError(error.toString());
                    case ErrorType_1.ErrorType.AUTHENTICATION:
                        throw new DetailErrors_1.AuthenticationError(error.toString());
                    case ErrorType_1.ErrorType.NOT_FOUND:
                        throw new DetailErrors_1.NotFoundError(error.toString());
                    case ErrorType_1.ErrorType.HTTP:
                        throw new DetailErrors_1.HttpError(error.toString());
                    case ErrorType_1.ErrorType.SERVICE_UNAVAILABLE:
                        throw new DetailErrors_1.ServiceUnavailableError(error.toString());
                    default:
                        throw new Error(error.toString());
                }
            }
        }).then(() => {
            let res;
            res = ip.getParameter(1);
            if (callback != null && typeof callback === "function")
                callback(undefined, res);
        }, err => {
            if (callback != null && typeof callback === "function")
                callback(err);
        });
    }
    cancelSubscription(id, callback) {
        let ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        ip.callFunction("cancelSubscription", this.interpreterStorage, id).then(() => {
            let error = ip.sandbox.thrownError;
            if (error != null) {
                switch (error.getErrorType()) {
                    case ErrorType_1.ErrorType.ILLEGAL_ARGUMENT:
                        throw new DetailErrors_1.IllegalArgumentError(error.toString());
                    case ErrorType_1.ErrorType.AUTHENTICATION:
                        throw new DetailErrors_1.AuthenticationError(error.toString());
                    case ErrorType_1.ErrorType.NOT_FOUND:
                        throw new DetailErrors_1.NotFoundError(error.toString());
                    case ErrorType_1.ErrorType.HTTP:
                        throw new DetailErrors_1.HttpError(error.toString());
                    case ErrorType_1.ErrorType.SERVICE_UNAVAILABLE:
                        throw new DetailErrors_1.ServiceUnavailableError(error.toString());
                    default:
                        throw new Error(error.toString());
                }
            }
        }).then(() => {
            let res;
            if (callback != null && typeof callback === "function")
                callback(undefined, res);
        }, err => {
            if (callback != null && typeof callback === "function")
                callback(err);
        });
    }
    saveAsString() {
        let ip = new Interpreter_1.Interpreter(new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage));
        return ip.saveAsString();
    }
    loadAsString(savedState) {
        let sandbox = new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage);
        let ip = new Interpreter_1.Interpreter(sandbox);
        ip.loadAsString(savedState);
        this.persistentStorage = sandbox.persistentStorage;
    }
    resumeLogin(executionState, callback) {
        let sandbox = new Sandbox_1.Sandbox(SERVICE_CODE, this.persistentStorage, this.instanceDependencyStorage);
        sandbox.loadStateFromString(executionState);
        let ip = new Interpreter_1.Interpreter(sandbox);
        ip.resumeFunction("Authenticating:login", this.interpreterStorage).then(() => callback(), err => callback(err));
    }
}
exports.Stripe = Stripe;
