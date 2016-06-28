"use strict";
const Helper_1 = require("../../helpers/Helper");
const VarAddress_1 = require("../VarAddress");
const UserError_1 = require("../../errors/UserError");
const url = require("url");
class AwaitCodeRedirect {
    getIdentifier() {
        return "awaitCodeRedirect";
    }
    execute(environment, parameters) {
        Helper_1.Helper.assert(parameters.length >= 2 && parameters[0] instanceof VarAddress_1.VarAddress && (Helper_1.Helper.isString(parameters[1]) || parameters[1] instanceof VarAddress_1.VarAddress));
        let resVar = parameters[0];
        let urlStr = Helper_1.Helper.resolve(environment, parameters[1]);
        let legacy = parameters.length == 2;
        let keys = [];
        for (let i = 2; i < parameters.length; i++) {
            keys.push(Helper_1.Helper.resolve(environment, parameters[i]));
        }
        if (legacy)
            keys.push("code");
        let redirectReceiver = environment.instanceDependencyStorage["redirectReceiver"];
        if (!redirectReceiver || typeof redirectReceiver !== "function")
            throw new UserError_1.UserError("This service needs the RedirectReceiver to be implemented as a function. Have a look at our examples and documentation if you are unsure how to do that.");
        return new Promise(resolve => {
            redirectReceiver(urlStr, environment.saveStateToString(), resolve);
        }).then(redirectUrl => {
            let queryMap = url.parse(redirectUrl, true).query;
            let resMap = {};
            for (let key of keys) {
                if (queryMap[key] != null)
                    resMap[key] = queryMap[key];
                else
                    throw new UserError_1.UserError("The URL the RedirectReceiver returns does not contain all necessary keys in the query, it's missing at least " + key);
            }
            environment.setVariable(resVar, legacy ? resMap["code"] : resMap);
        });
    }
}
exports.AwaitCodeRedirect = AwaitCodeRedirect;
