"use strict";
const Helper_1 = require("../helpers/Helper");
const InternalError_1 = require("../errors/InternalError");
const VarAddress_1 = require("./VarAddress");
const CallFunc_1 = require("./commands/CallFunc");
const Create_1 = require("./commands/Create");
const Clone_1 = require("./commands/Clone");
const Delete_1 = require("./commands/Delete");
const Get_1 = require("./commands/Get");
const Uint8ToBase64_1 = require("./commands/array/Uint8ToBase64");
const Md5_1 = require("./commands/hash/Md5");
const Sha1_1 = require("./commands/crypt/hmac/Sha1");
const Base64Encode_1 = require("./commands/string/Base64Encode");
const StreamToString_1 = require("./commands/stream/StreamToString");
const StringToStream_1 = require("./commands/stream/StringToStream");
const MakeJoinedStream_1 = require("./commands/stream/MakeJoinedStream");
const MakeLimitedStream_1 = require("./commands/stream/MakeLimitedStream");
const RequestCall_1 = require("./commands/http/RequestCall");
const Out_1 = require("./commands/debug/Out");
const UserError_1 = require("../errors/UserError");
const AwaitCodeRedirect_1 = require("./commands/AwaitCodeRedirect");
const GetMimeType_1 = require("./commands/GetMimeType");
const ThrowError_1 = require("./commands/ThrowError");
const Parse_1 = require("./commands/json/Parse");
const Stringify_1 = require("./commands/json/Stringify");
const Floor_1 = require("./commands/math/Floor");
const Conditional_1 = require("./commands/Conditional");
const MathCombine_1 = require("./commands/math/MathCombine");
const GetKeyArray_1 = require("./commands/object/GetKeyArray");
const GetKeyValueArrays_1 = require("./commands/object/GetKeyValueArrays");
const Concat_1 = require("./commands/string/Concat");
const IndexOf_1 = require("./commands/string/IndexOf");
const LastIndexOf_1 = require("./commands/string/LastIndexOf");
const Split_1 = require("./commands/string/Split");
const Substr_1 = require("./commands/string/Substr");
const Substring_1 = require("./commands/string/Substring");
const StringTransform_1 = require("./commands/string/StringTransform");
const JumpRel_1 = require("./commands/JumpRel");
const Pull_1 = require("./commands/Pull");
const Push_1 = require("./commands/Push");
const Return_1 = require("./commands/Return");
const Set_1 = require("./commands/Set");
const Size_1 = require("./commands/Size");
const Format_1 = require("./commands/string/Format");
class Interpreter {
    constructor(sandbox) {
        this.sandbox = sandbox;
    }
    callFunction(functionName, ...parameters) {
        this.sandbox.createNewStackLevel(functionName, 0);
        Helper_1.Helper.addAll(this.sandbox.currentParameters(), parameters);
        if (this.sandbox.currentFunctionCode() == null) {
            let errorMessage = "Service code error: function '" + functionName + "' not found";
            throw new InternalError_1.InternalError(errorMessage);
        }
        return this.run();
    }
    callFunctionSync(functionName, ...parameters) {
        this.sandbox.createNewStackLevel(functionName, 0);
        Helper_1.Helper.addAll(this.sandbox.currentParameters(), parameters);
        if (this.sandbox.currentFunctionCode() == null) {
            let errorMessage = "Service code error: function '" + functionName + "' not found";
            throw new InternalError_1.InternalError(errorMessage);
        }
        return this.runSync();
    }
    run() {
        let condition = () => (this.sandbox.currentServiceCodeLine() < this.sandbox.currentFunctionCode().length && this.sandbox.currentServiceCodeLine() >= 0);
        let body = () => {
            let command = this.sandbox.currentFunctionCode()[this.sandbox.currentServiceCodeLine()];
            if (COMMANDS[command[0]] == null) {
                throw new InternalError_1.InternalError("Unknown command: " + command[0]);
            }
            let commandParameters = Interpreter.decodeCommandParameters(command);
            return Promise.resolve().then(() => COMMANDS[command[0]].execute(this.sandbox, commandParameters)).then(() => {
                if (this.sandbox.thrownError != null) {
                    return false;
                }
                this.sandbox.incrementCurrentServiceCodeLine(1);
                while ((this.sandbox.currentServiceCodeLine() >= this.sandbox.currentFunctionCode().length ||
                    this.sandbox.currentServiceCodeLine() < 0) && this.sandbox.codeFunctionNameStack.length > 1) {
                    this.sandbox.returnFromFunction();
                }
                return true;
            });
        };
        let loop = (condition, body) => {
            if (condition()) {
                return body().then(cont => cont ? loop(condition, body) : Promise.resolve());
            }
            else {
                return Promise.resolve();
            }
        };
        return Promise.resolve().then(() => loop(condition, body)).catch(e => {
            if (e instanceof UserError_1.UserError)
                throw e;
            let errorMessage = "Service code error in function " + this.sandbox.currentFunctionName() + " at line " + this.sandbox.currentServiceCodeLine() + " with message: " + e.message;
            throw new InternalError_1.InternalError(errorMessage);
        });
    }
    runSync() {
        try {
            while (this.sandbox.currentServiceCodeLine() < this.sandbox.currentFunctionCode().length && this.sandbox.currentServiceCodeLine() >= 0) {
                let command = this.sandbox.currentFunctionCode()[this.sandbox.currentServiceCodeLine()];
                if (COMMANDS[command[0]] == null) {
                    throw new InternalError_1.InternalError("Unknown command: " + command[0]);
                }
                let commandParameters = Interpreter.decodeCommandParameters(command);
                let commandRet = COMMANDS[command[0]].execute(this.sandbox, commandParameters);
                if (commandRet != null && commandRet instanceof Promise)
                    throw new InternalError_1.InternalError("Attempt to synchronously execute an asynchronous command");
                if (this.sandbox.thrownError != null) {
                    return;
                }
                this.sandbox.incrementCurrentServiceCodeLine(1);
                while ((this.sandbox.currentServiceCodeLine() >= this.sandbox.currentFunctionCode().length ||
                    this.sandbox.currentServiceCodeLine() < 0) && this.sandbox.codeFunctionNameStack.length > 1) {
                    this.sandbox.returnFromFunction();
                }
            }
        }
        catch (e) {
            if (e instanceof UserError_1.UserError)
                throw e;
            let errorMessage = "Service code error in function " + this.sandbox.currentFunctionName() + " at line " + this.sandbox.currentServiceCodeLine() + " with message: " + e.message;
            throw new InternalError_1.InternalError(errorMessage);
        }
    }
    static decodeCommandParameters(command) {
        let commandParameters = command.slice(1, command.length);
        for (let i = 0; i < commandParameters.length; i++) {
            if (Helper_1.Helper.isString(commandParameters[i])) {
                if (commandParameters[i].startsWith("$")) {
                    commandParameters[i] = new VarAddress_1.VarAddress(commandParameters[i].substring(1));
                }
                else if (commandParameters[i].startsWith("\\$")) {
                    commandParameters[i] = commandParameters[i].substring(1);
                }
            }
        }
        return commandParameters;
    }
    getParameter(idx) {
        return this.sandbox.getParameter(idx, 0);
    }
    saveAsString() {
        return JSON.stringify(this.sandbox.persistentStorage);
    }
    loadAsString(savedState) {
        this.sandbox.persistentStorage = JSON.parse(savedState);
    }
    resumeFunction(functionName, ...parameters) {
        let firstParameters;
        if (this.sandbox.parametersStack.length === 0) {
            firstParameters = [];
            this.sandbox.parametersStack.push(firstParameters);
        }
        else {
            firstParameters = this.sandbox.parametersStack[0];
        }
        for (let i = 0; i < parameters.length; i++) {
            if (Helper_1.Helper.isObject(parameters[i])) {
                let m = parameters[i];
                Helper_1.Helper.clear(m);
                Helper_1.Helper.putAll(m, firstParameters[i]);
            }
            else {
                if (i >= firstParameters.length) {
                    firstParameters.push(parameters[i]);
                }
                else {
                    firstParameters[i] = parameters[i];
                }
            }
        }
        return this.run();
    }
}
exports.Interpreter = Interpreter;
const COMMAND_LIST = [
    new CallFunc_1.CallFunc(),
    new Clone_1.Clone(),
    new Create_1.Create(),
    new Delete_1.Delete(),
    new Get_1.Get(),
    new JumpRel_1.JumpRel(),
    new Pull_1.Pull(),
    new Push_1.Push(),
    new Return_1.Return(),
    new Set_1.Set(),
    new Size_1.Size(),
    new ThrowError_1.ThrowError(),
    new Uint8ToBase64_1.Uint8ToBase64(),
    new Sha1_1.Sha1(),
    new Md5_1.Md5(),
    new Base64Encode_1.Base64Encode(),
    new StreamToString_1.StreamToString(),
    new StringToStream_1.StringToStream(),
    new MakeJoinedStream_1.MakeJoinedStream(),
    new MakeLimitedStream_1.MakeLimitedStream(),
    new RequestCall_1.RequestCall(),
    new Out_1.Out(),
    new AwaitCodeRedirect_1.AwaitCodeRedirect(),
    new GetMimeType_1.GetMimeType(),
    new Conditional_1.Conditional("if==than", compare => compare == 0, false),
    new Conditional_1.Conditional("if>=than", compare => compare >= 0, true),
    new Conditional_1.Conditional("if>than", compare => compare > 0, true),
    new Conditional_1.Conditional("if<=than", compare => compare <= 0, true),
    new Conditional_1.Conditional("if<than", compare => compare < 0, true),
    new Conditional_1.Conditional("if!=than", compare => compare != 0, false),
    new ThrowError_1.ThrowError(),
    new Parse_1.Parse(),
    new Stringify_1.Stringify(),
    new MathCombine_1.MathCombine("math.add", elements => elements.reduce((prev, curr) => prev + curr)),
    new MathCombine_1.MathCombine("math.multiply", elements => elements.reduce((prev, curr) => prev * curr)),
    new MathCombine_1.MathCombine("math.max", elements => elements.reduce((prev, curr) => Math.max(prev, curr))),
    new MathCombine_1.MathCombine("math.min", elements => elements.reduce((prev, curr) => Math.min(prev, curr))),
    new Floor_1.Floor(),
    new GetKeyArray_1.GetKeyArray(),
    new GetKeyValueArrays_1.GetKeyValueArrays(),
    new Concat_1.Concat(),
    new Format_1.Format(),
    new IndexOf_1.IndexOf(),
    new LastIndexOf_1.LastIndexOf(),
    new Split_1.Split(),
    new Substr_1.Substr(),
    new Substring_1.Substring(),
    new StringTransform_1.StringTransform("string.lowerCase", str => str.toLowerCase()),
    new StringTransform_1.StringTransform("string.upperCase", str => str.toUpperCase()),
    new StringTransform_1.StringTransform("string.urlEncode", str => encodeURIComponent(str).split("%20").join("+")),
    new StringTransform_1.StringTransform("string.urlDecode", str => decodeURIComponent(str.split("+").join("%20")))
];
const COMMANDS = {};
for (let command of COMMAND_LIST) {
    COMMANDS[command.getIdentifier()] = command;
}
