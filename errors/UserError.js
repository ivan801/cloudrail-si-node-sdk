"use strict";
class UserError extends Error {
    constructor(message) {
        var newMessage = "An error occured that you should be able to fix. The error message is:\n" + message;
        super(newMessage);
    }
}
exports.UserError = UserError;
