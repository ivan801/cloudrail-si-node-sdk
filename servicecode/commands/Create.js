"use strict";
const Sandbox_1 = require("../Sandbox");
const VarAddress_1 = require("../VarAddress");
const Helper_1 = require("../../helpers/Helper");
const InternalError_1 = require("../../errors/InternalError");
const Types_1 = require("../../types/Types");
class Create {
    getIdentifier() {
        return "create";
    }
    execute(environment, parameters) {
        Helper_1.Helper.assert(parameters.length >= 2 && parameters[0] instanceof VarAddress_1.VarAddress &&
            (Helper_1.Helper.isString(parameters[1]) || parameters[1] instanceof VarAddress_1.VarAddress));
        let targetId = parameters[0];
        let type = Helper_1.Helper.resolve(environment, parameters[1]);
        Helper_1.Helper.assert(Helper_1.Helper.isString(type));
        let targetIdParts = Sandbox_1.Sandbox.decodeVariableAddress(targetId);
        let newObject;
        let constructorArgs = [];
        for (let i = 2; i < parameters.length; i++) {
            constructorArgs.push(Helper_1.Helper.resolve(environment, parameters[i]));
        }
        if (type === "String") {
            newObject = "";
            for (let arg of constructorArgs) {
                newObject += arg.toString();
            }
        }
        else if (type === "Number") {
            if (constructorArgs.length > 1)
                throw new InternalError_1.InternalError("Create Number has too many arguments");
            if (constructorArgs.length === 1) {
                if (Helper_1.Helper.isNumber(constructorArgs[0])) {
                    newObject = constructorArgs[0];
                }
                else
                    throw new InternalError_1.InternalError("Create Number has an invalid argument type");
            }
            else {
                newObject = 0;
            }
        }
        else if (type === "Object") {
            if (constructorArgs.length !== 0)
                throw new InternalError_1.InternalError("Create Object does not take constructor arguments");
            newObject = {};
        }
        else if (type === "Array") {
            newObject = [];
            for (let value of constructorArgs) {
                newObject.push(value);
            }
        }
        else {
            newObject = new Types_1.Types.typeMap[type](...constructorArgs);
        }
        environment.setVariable(targetIdParts, newObject);
    }
}
exports.Create = Create;
