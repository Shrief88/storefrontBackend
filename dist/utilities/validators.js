"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringSchema = exports.numberSchema = exports.authentiacateUserSchema = exports.createUserSchema = void 0;
var yup = __importStar(require("yup"));
var PASSWORD_REGEX = /^[a-zA-Z0-9]{8,}$/;
exports.createUserSchema = yup.object({
    email: yup.string().required().email(),
    first_name: yup.string().required().strict().trim(),
    last_name: yup.string().required().strict().trim(),
    password: yup
        .string()
        .matches(PASSWORD_REGEX, "password must contain only letters and numbers with a minimum of 8 characters")
        .required(),
});
exports.authentiacateUserSchema = yup.object({
    email: yup.string().required(),
    password: yup.string().required(),
});
exports.numberSchema = yup.object({ id: yup.number().required() });
exports.stringSchema = yup.object({ id: yup.string().required().trim() });
