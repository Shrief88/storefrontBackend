"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEmail = void 0;
var validateEmail = function (email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
};
exports.validateEmail = validateEmail;
