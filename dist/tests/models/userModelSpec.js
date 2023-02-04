"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var userModel_1 = require("../../models/userModel");
var dotenv_1 = __importDefault(require("dotenv"));
var bcrypt_1 = __importDefault(require("bcrypt"));
dotenv_1.default.config();
var BCRYPT_PASSWORD = process.env.BCRYPT_PASSWORD;
var store = new userModel_1.UserStore();
describe("user model", function () {
    var newUser;
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, store.create({
                        email: "shriefessam1999@gmail.com",
                        first_name: "Shrief",
                        last_name: "Essam",
                        password: "password123",
                    })];
                case 1:
                    newUser = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    describe("model should have all Requirements methods", function () {
        it("should have index method", function () {
            expect(store.index).toBeDefined();
        });
        it("should have show method", function () {
            expect(store.show).toBeDefined();
        });
        it("should have create method", function () {
            expect(store.create).toBeDefined();
        });
    });
    describe("test model methods", function () {
        describe("create method", function () {
            it("create method should add a user", function () {
                var userInfo = {
                    email: newUser.email,
                    first_name: newUser.first_name,
                    last_name: newUser.last_name,
                };
                expect(userInfo).toEqual({
                    email: "shriefessam1999@gmail.com",
                    first_name: "Shrief",
                    last_name: "Essam",
                });
            });
            it("password should be hashed", function () {
                expect(bcrypt_1.default.compareSync("password123" + BCRYPT_PASSWORD, newUser.password)).toBe(true);
            });
            it("should throw an error if email already exist", function () { return __awaiter(void 0, void 0, void 0, function () {
                var errMessage, err_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            errMessage = "";
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, store.create({
                                    email: "shriefessam1999@gmail.com",
                                    first_name: "mohamed",
                                    last_name: "esmail",
                                    password: "password123",
                                })];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            err_1 = _a.sent();
                            errMessage = err_1.message;
                            return [3 /*break*/, 4];
                        case 4:
                            expect(errMessage).toEqual("could not create new user. Error: email is already used!");
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe("show method", function () {
            it("should return the right user", function () { return __awaiter(void 0, void 0, void 0, function () {
                var result, userInfo;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, store.show(1)];
                        case 1:
                            result = _a.sent();
                            userInfo = {
                                id: result.id,
                                email: result.email,
                                first_name: result.first_name,
                                last_name: result.last_name,
                            };
                            expect(userInfo).toEqual({
                                id: 1,
                                email: "shriefessam1999@gmail.com",
                                first_name: "Shrief",
                                last_name: "Essam",
                            });
                            return [2 /*return*/];
                    }
                });
            }); });
            it("should throw an error if user enter not existing id", function () { return __awaiter(void 0, void 0, void 0, function () {
                var errMessage, err_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            errMessage = "";
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, store.show(3)];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            err_2 = _a.sent();
                            errMessage = err_2.message;
                            return [3 /*break*/, 4];
                        case 4:
                            expect(errMessage).toEqual("could not get user, Error: you should provide existing id");
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        it("index method should retern list of users", function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, store.index()];
                    case 1:
                        result = _a.sent();
                        expect(result.length).toEqual(1);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
