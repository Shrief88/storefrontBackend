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
var supertest_1 = __importDefault(require("supertest"));
var __1 = __importDefault(require("../.."));
var database_1 = __importDefault(require("../../database"));
var userModel_1 = require("../../models/userModel");
var request = (0, supertest_1.default)(__1.default);
describe("testing users endpoint response", function () {
    var token;
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var store, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    store = new userModel_1.UserStore();
                    return [4 /*yield*/, store.create({
                            email: "shriefessam1999@gmail.com",
                            first_name: "Shrief",
                            last_name: "Essam",
                            password: "Sh00000000",
                        })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, request.post("/users/authentiacate").send({
                            email: "shriefessam1999@gmail.com",
                            password: "Sh00000000",
                        })];
                case 2:
                    response = _a.sent();
                    token = response.body;
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var conn, sql;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database_1.default.connect()];
                case 1:
                    conn = _a.sent();
                    sql = "DELETE FROM users";
                    return [4 /*yield*/, conn.query(sql)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, conn.query("ALTER SEQUENCE users_id_seq RESTART WITH 1")];
                case 3:
                    _a.sent();
                    conn.release();
                    return [2 /*return*/];
            }
        });
    }); });
    describe("test [GET] /users endpoint", function () {
        it("should return an error if user try to access without token", function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request.get("/users")];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(401);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return ok response if user enter a valid token", function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request.get("/users").set({
                            Authorization: "Bearer ".concat(token),
                        })];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(200);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("test [GET] /users/:id endpoint", function () {
        it("should return an error if user try to access without token", function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request.get("/users/1")];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(401);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return ok response if user enter a valid token", function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request.get("/users/1").set({
                            Authorization: "Bearer ".concat(token),
                        })];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(200);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return not found response if user enter an unvalid input", function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request.get("/users/ffdfd").set({
                            Authorization: "Bearer ".concat(token),
                        })];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(404);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("test [POST] /users endpoint", function () {
        it("should return ok response", function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request.post("/users").send({
                            email: "shriefessam1888@gmail.com",
                            password: "Sh00000000",
                            first_name: "Shrief",
                            last_name: "Essam",
                        })];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(200);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return 400 response if any required attribute is missing", function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request.post("/users").send({
                            password: "Sh00000000",
                            first_name: "Shrief",
                            last_name: "Essam",
                        })];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(400);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return 400 response if any attribute is empty", function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request.post("/users").send({
                            email: "shriefessam1888@gmail.com",
                            password: "Sh00000000",
                            first_name: "",
                            last_name: "Essam",
                        })];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(400);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return 400 response if any string attribute is a number", function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request.post("/users").send({
                            email: "shriefessam1888@gmail.com",
                            password: "Sh00000000",
                            first_name: "",
                            last_name: "Essam",
                        })];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(400);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return 400 response if email is unvalid", function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request.post("/users").send({
                            email: "shriefessam1888",
                            password: "Sh00000000",
                            first_name: "shrief",
                            last_name: "Essam",
                        })];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(400);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return 400 response if password contains numbers only", function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request.post("/users").send({
                            email: "shriefessam1888",
                            password: "123456789",
                            first_name: "shrief",
                            last_name: "Essam",
                        })];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(400);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return 400 response if password contains letters only", function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request.post("/users").send({
                            email: "shriefessam1888",
                            password: "password",
                            first_name: "shrief",
                            last_name: "Essam",
                        })];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(400);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return 400 response if password less than 8 characters", function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request.post("/users").send({
                            email: "shriefessam1888",
                            password: "pass123",
                            first_name: "shrief",
                            last_name: "Essam",
                        })];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(400);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("authentiacate method", function () {
        it("should return 400 response if any attribute is missing", function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request
                            .post("/users")
                            .send({
                            email: "shriefessam1999@gmail.com",
                        })
                            .set({
                            Authorization: "Bearer ".concat(token),
                        })];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(400);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
