"use strict";
const Interpreter_1 = require("./Interpreter");
const VarAddress_1 = require("./VarAddress");
const InternalError_1 = require("../errors/InternalError");
const Helper_1 = require("../helpers/Helper");
const SandboxObject_1 = require("../types/SandboxObject");
const Types_1 = require("../types/Types");
const stream = require("stream");
const LIST_MAX_ADD_JUMP_ALLOWED = 32;
const JSON_AWARE_MARKER = "@JSONAware/";
class Sandbox {
    constructor(serviceCode, persistentStorage, instanceDependencyStorage) {
        this.localVariablesStack = [];
        this.parametersStack = [];
        this.codeFunctionNameStack = [];
        this.codeLineStack = [];
        this.persistentStorage = [];
        this.serviceCode = serviceCode;
        this.persistentStorage = persistentStorage;
        this.instanceDependencyStorage = instanceDependencyStorage;
    }
    createNewStackLevel(functionName, codeLine) {
        this.localVariablesStack.push([]);
        this.parametersStack.push([]);
        this.codeFunctionNameStack.push(functionName);
        this.codeLineStack.push(codeLine);
    }
    currentParameters() {
        if (this.parametersStack.length === 0)
            return null;
        else
            return this.parametersStack[this.parametersStack.length - 1];
    }
    currentFunctionName() {
        if (this.codeFunctionNameStack.length === 0)
            return null;
        else
            return this.codeFunctionNameStack[this.codeFunctionNameStack.length - 1];
    }
    currentFunctionCode() {
        return this.serviceCode[this.currentFunctionName()];
    }
    currentServiceCodeLine() {
        if (this.codeLineStack.length === 0)
            return -1;
        else
            return this.codeLineStack[this.codeLineStack.length - 1];
    }
    incrementCurrentServiceCodeLine(amount) {
        if (this.codeLineStack.length === 0)
            return;
        else
            this.codeLineStack[this.codeLineStack.length - 1] = this.codeLineStack[this.codeLineStack.length - 1] + amount;
    }
    returnFromFunction() {
        if (this.codeFunctionNameStack.length <= 1)
            return;
        let currentStackLevel = this.codeFunctionNameStack.length - 1;
        let callFunctionCommandParameters = Interpreter_1.Interpreter.decodeCommandParameters(this.serviceCode[this.codeFunctionNameStack[currentStackLevel - 1]][this.codeLineStack[currentStackLevel - 1]]);
        for (let i = 0; i < callFunctionCommandParameters.length; i++) {
            let paramterVar = callFunctionCommandParameters[i];
            if (paramterVar instanceof VarAddress_1.VarAddress) {
                let value = this.parametersStack[currentStackLevel][i - 1];
                this.setVariable(paramterVar, value, currentStackLevel - 1);
            }
        }
        this.codeFunctionNameStack.splice(currentStackLevel, 1);
        this.codeLineStack.splice(currentStackLevel, 1);
        this.localVariablesStack.splice(currentStackLevel, 1);
        this.parametersStack.splice(currentStackLevel, 1);
        this.incrementCurrentServiceCodeLine(1);
    }
    setVariable(varAddress, value, stacklevel = this.localVariablesStack.length - 1) {
        let varAddressParts;
        if (varAddress instanceof VarAddress_1.VarAddress)
            varAddressParts = Sandbox.decodeVariableAddress(varAddress);
        else
            varAddressParts = varAddress;
        let variables = this.getStackForAddressPart(varAddressParts[0], stacklevel);
        let varIdx = varAddressParts[1];
        if (varAddressParts.length <= 2) {
            if (variables.length === varIdx) {
                variables.push(value);
            }
            else if (variables.length > varIdx) {
                variables[varIdx] = value;
            }
            else if (variables.length + LIST_MAX_ADD_JUMP_ALLOWED > varIdx) {
                for (let i = 0; i < varIdx - variables.length + 1; i++)
                    variables.push(null);
                variables[varIdx] = value;
            }
            else {
                throw new InternalError_1.InternalError("Could not decode variable " + varAddressParts.join(":"));
            }
            return true;
        }
        return this.setEntry(variables[varIdx], varAddressParts.slice(2, varAddressParts.length), value);
    }
    getVariable(varAddress, stacklevel = this.localVariablesStack.length - 1, emptyIsNull = false) {
        let varAddressParts;
        if (varAddress instanceof VarAddress_1.VarAddress)
            varAddressParts = Sandbox.decodeVariableAddress(varAddress);
        else
            varAddressParts = varAddress;
        let variables = this.getStackForAddressPart(varAddressParts[0], stacklevel);
        if (emptyIsNull && varAddressParts[1] >= variables.length)
            return null;
        let localEntry = variables[varAddressParts[1]];
        if (varAddressParts.length <= 2)
            return localEntry;
        return this.getEntry(localEntry, varAddressParts.slice(2, varAddressParts.length), emptyIsNull);
    }
    deleteVariable(varAddressParts, stacklevel = this.localVariablesStack.length - 1) {
        let variables = this.getStackForAddressPart(varAddressParts[0], stacklevel);
        let varIdx = varAddressParts[1];
        if (varAddressParts.length <= 2) {
            if (varIdx < variables.length) {
                variables[varIdx] = null;
            }
            return true;
        }
        return this.deleteEntry(variables[varIdx], varAddressParts.slice(2, varAddressParts.length));
    }
    getStackForAddressPart(part, stacklevel) {
        let variables;
        if (part === "L") {
            variables = this.localVariablesStack[stacklevel];
        }
        else if (part === "P") {
            variables = this.parametersStack[stacklevel];
        }
        else if (part === "S") {
            variables = this.persistentStorage;
        }
        else {
            throw new InternalError_1.InternalError("Could not attribute variable part" + part);
        }
        return variables;
    }
    static decodeVariableAddress(varAddress) {
        let decAdr = [];
        let adr = varAddress.addressString;
        Helper_1.Helper.assert(adr[0] !== "$");
        if (adr[0] < '0' || adr[0] > '9') {
            decAdr.push(adr[0]);
            adr = adr.substring(1);
        }
        let adrParts = adr.split(".");
        for (let i = 0; i < adrParts.length; i++) {
            let part = adrParts[i];
            if (Helper_1.Helper.isNumberString(part)) {
                decAdr.push(parseInt(part));
            }
            else {
                decAdr.push(part);
            }
        }
        return decAdr;
    }
    setEntry(container, varAddress, value) {
        if (varAddress.length > 1) {
            let nextContainer = this.getEntry(container, varAddress.slice(0, varAddress.length - 1), false);
            return this.setEntry(nextContainer, varAddress.slice(1, varAddress.length), value);
        }
        let varAddressPart = varAddress[0];
        if (Helper_1.Helper.isArray(container)) {
            if (Helper_1.Helper.isNumberString(varAddressPart)) {
                varAddressPart = parseInt(varAddressPart);
            }
            if (!Helper_1.Helper.isNumber(varAddressPart) || varAddressPart >= container.length) {
                throw new InternalError_1.InternalError("Invalid index while indexing into an array");
            }
            let idx = varAddressPart;
            let list = container;
            if (list.length + LIST_MAX_ADD_JUMP_ALLOWED <= idx) {
                for (let i = 0; i < idx - list.length + 1; i++)
                    list.push(null);
            }
            list[idx] = value;
        }
        else if (Helper_1.Helper.isObject(container)) {
            if (!Helper_1.Helper.isString(varAddressPart)) {
                varAddressPart = varAddressPart.toString();
            }
            container[varAddressPart] = value;
        }
        else if (container instanceof SandboxObject_1.SandboxObject) {
            if (!Helper_1.Helper.isString(varAddressPart)) {
                varAddressPart = varAddressPart.toString();
            }
            container.set(varAddressPart, value);
        }
        return false;
    }
    getEntry(container, varAddress, emptyIsNull) {
        let entry;
        let varAddressPart = varAddress[0];
        if (Helper_1.Helper.isArray(container) || Helper_1.Helper.isString(container)) {
            if (Helper_1.Helper.isNumberString(varAddressPart)) {
                varAddressPart = parseInt(varAddressPart);
            }
            if (!Helper_1.Helper.isNumber(varAddressPart)) {
                throw new InternalError_1.InternalError("Invalid index while indexing into an array or string");
            }
            if (!(emptyIsNull && varAddressPart >= container.length)) {
                entry = container[varAddressPart];
            }
        }
        else if (Helper_1.Helper.isObject(container)) {
            if (!Helper_1.Helper.isString(varAddressPart)) {
                varAddressPart = varAddressPart.toString();
            }
            entry = container[varAddressPart];
        }
        else if (container instanceof SandboxObject_1.SandboxObject) {
            if (!Helper_1.Helper.isString(varAddressPart)) {
                varAddressPart = varAddressPart.toString();
            }
            entry = container.get(varAddressPart);
        }
        if (varAddress.length > 1) {
            return this.getEntry(entry, varAddress.slice(1, varAddress.length), emptyIsNull);
        }
        return entry;
    }
    deleteEntry(container, varAddress) {
        if (varAddress.length > 1) {
            let nextContainer = this.getEntry(container, varAddress.slice(0, varAddress.length - 1), false);
            return this.deleteEntry(nextContainer, varAddress.slice(1, varAddress.length));
        }
        let varAddressPart = varAddress[0];
        if (Helper_1.Helper.isArray(container)) {
            if (Helper_1.Helper.isNumberString(varAddressPart)) {
                varAddressPart = parseInt(varAddressPart);
            }
            if (!Helper_1.Helper.isNumber(varAddressPart) || varAddressPart >= container.length) {
                throw new InternalError_1.InternalError("Invalid index while indexing into an array");
            }
            let idx = varAddressPart;
            let list = container;
            if (idx < list.length) {
                list.splice(idx, 1);
            }
            while (list.length > 0 && list[list.length - 1] == null) {
                list.pop();
            }
        }
        else if (Helper_1.Helper.isObject(container)) {
            varAddressPart = varAddressPart.toString();
            delete container[varAddressPart];
        }
        else if (container instanceof SandboxObject_1.SandboxObject) {
            varAddressPart = varAddressPart.toString();
            container.set(varAddressPart, null);
        }
        return false;
    }
    callFunction(functionName, parameters) {
        this.createNewStackLevel(functionName, -1);
        let parameterStack = this.currentParameters();
        Helper_1.Helper.addAll(parameterStack, parameters);
    }
    compareVariables(aObj, bObj, commandID, typeCheck) {
        aObj = Helper_1.Helper.resolve(this, aObj, false);
        bObj = Helper_1.Helper.resolve(this, bObj, false);
        if (!typeCheck && (aObj == null || bObj == null)) {
            if (aObj == null && bObj == null) {
                return 0;
            }
            return -1;
        }
        if (aObj.constructor !== bObj.constructor) {
            if (!typeCheck)
                return -1;
            throw new InternalError_1.InternalError("Command '" + commandID + "' compares arguments of different types");
        }
        if (typeof aObj["compareTo"] === "function") {
            return aObj.compareTo(bObj);
        }
        else {
            return Helper_1.Helper.compare(aObj, bObj);
        }
    }
    saveStateToString() {
        let savelist = [];
        savelist.push(this.codeFunctionNameStack);
        savelist.push(this.codeLineStack);
        savelist.push(this.localVariablesStack);
        savelist.push(this.parametersStack);
        savelist.push(this.persistentStorage);
        return JSON.stringify(savelist, (key, value) => {
            if (value instanceof stream.Readable) {
                return undefined;
            }
            else if (value != null && typeof value["toJSONString"] === "function" && typeof value["fromJSONString"] === "function") {
                return JSON_AWARE_MARKER + value.constructor.name + ":" + value.toJSONString();
            }
            else {
                return value;
            }
        });
    }
    loadStateFromString(savedState) {
        let savelist = JSON.parse(savedState, (key, value) => {
            if (Helper_1.Helper.isString(value) && value.startsWith(JSON_AWARE_MARKER)) {
                let start = JSON_AWARE_MARKER.length;
                let className = value.substring(start, value.indexOf(":"));
                let content = value.substring(value.indexOf(":") + 1);
                let cl = Types_1.Types.typeMap[className];
                let instance = new cl();
                return instance["fromJSONString"](content);
            }
            else {
                return value;
            }
        });
        this.codeFunctionNameStack = savelist[0];
        this.codeLineStack = savelist[1];
        this.localVariablesStack = savelist[2];
        let mergeStacks = (jsonStack, stack) => {
            for (let i = 0; i < jsonStack.length; i++) {
                if (i >= stack.length) {
                    stack.push(jsonStack[i]);
                }
                else {
                    stack[i] = jsonStack[i];
                }
            }
        };
        let jsonParametersStack = savelist[3];
        let jsonPersistentStorage = savelist[4];
        mergeStacks(jsonParametersStack, this.parametersStack);
        mergeStacks(jsonPersistentStorage, this.persistentStorage);
    }
    getParameter(idx, stacklevel) {
        if (this.parametersStack.length === 0 || stacklevel >= this.parametersStack.length || idx >= this.parametersStack[stacklevel].length)
            return null;
        return this.parametersStack[stacklevel][idx];
    }
}
exports.Sandbox = Sandbox;
