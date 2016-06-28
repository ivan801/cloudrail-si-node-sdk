"use strict";
class InternalError extends Error {
    constructor(message) {
        var newMessage = "An internal error has occured which you probably cannot fix. " +
            "We'd very much appreciate it if you would report it to the CloudRail team. The error message is:\n" + message;
        super(newMessage);
    }
}
exports.InternalError = InternalError;
