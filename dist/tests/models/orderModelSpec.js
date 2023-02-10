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
var database_1 = __importDefault(require("../../database"));
var orderModel_1 = require("../../models/orderModel");
var productModel_1 = require("../../models/productModel");
var userModel_1 = require("../../models/userModel");
var orderStore = new orderModel_1.OrderStore();
var userStore = new userModel_1.UserStore();
var productStore = new productModel_1.ProductStore();
describe("order model", function () {
    var newOrder;
    var newUser;
    var newProduct;
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userStore.create({
                        email: "shriefessam1999@gmail.com",
                        first_name: "Shrief",
                        last_name: "Essam",
                        password: "password123",
                    })];
                case 1:
                    newUser = _a.sent();
                    return [4 /*yield*/, orderStore.create({
                            status: "open",
                            user_id: newUser.id,
                        })];
                case 2:
                    newOrder = _a.sent();
                    return [4 /*yield*/, orderStore.create({
                            status: "close",
                            user_id: newUser.id,
                        })];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, productStore.create({
                            name: "mobile",
                            price: 1000,
                            category: "electronics",
                        })];
                case 4:
                    newProduct = _a.sent();
                    return [4 /*yield*/, orderStore.addProduct(5, newOrder.id, newProduct.id)];
                case 5:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var conn;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database_1.default.connect()];
                case 1:
                    conn = _a.sent();
                    return [4 /*yield*/, conn.query("DELETE FROM ordered_products")];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, conn.query("DELETE FROM orders")];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, conn.query("DELETE FROM products")];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, conn.query("DELETE FROM users")];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, conn.query("ALTER SEQUENCE ordered_products_id_seq RESTART WITH 1")];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, conn.query("ALTER SEQUENCE orders_id_seq RESTART WITH 1")];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, conn.query("ALTER SEQUENCE products_id_seq RESTART WITH 1")];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, conn.query("ALTER SEQUENCE users_id_seq RESTART WITH 1")];
                case 9:
                    _a.sent();
                    conn.release();
                    return [2 /*return*/];
            }
        });
    }); });
    describe("model should have all Requirements methods", function () {
        it("should have index method", function () {
            expect(orderStore.index).toBeDefined();
        });
        it("should have getOrderProducts method", function () {
            expect(orderStore.getOrderProducts).toBeDefined();
        });
        it("should have create method", function () {
            expect(orderStore.create).toBeDefined();
        });
        it("should have getActiveOrdersByUser method", function () {
            expect(orderStore.getActiveOrdersByUser).toBeDefined();
        });
        it("should have getClosedOrdersByUser method", function () {
            expect(orderStore.getClosedOrdersByUser).toBeDefined();
        });
        it("should have closeOrder method", function () {
            expect(orderStore.closeOrder).toBeDefined();
        });
        it("should have addProduct method", function () {
            expect(orderStore.addProduct).toBeDefined();
        });
    });
    describe("test model methods", function () {
        describe("index method", function () {
            it("index method should retern list of orders", function () { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, orderStore.index()];
                        case 1:
                            result = _a.sent();
                            expect(result).toEqual([
                                {
                                    id: newOrder.id,
                                    status: "open",
                                    user_id: newOrder.user_id,
                                },
                                {
                                    id: newOrder.id + 1,
                                    status: "close",
                                    user_id: newOrder.user_id,
                                },
                            ]);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe("create method", function () {
            it("create method should add a order", function () {
                expect(newOrder).toEqual({
                    id: newOrder.id,
                    user_id: newOrder.user_id,
                    status: "open",
                });
            });
        });
        describe("getActiveOrdersByUser", function () {
            it("should return list of active orders by user", function () { return __awaiter(void 0, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, orderStore.getActiveOrdersByUser(newUser.id)];
                        case 1:
                            res = _a.sent();
                            expect(res).toEqual([
                                {
                                    id: newOrder.id,
                                    status: "open",
                                    user_id: newOrder.user_id,
                                },
                            ]);
                            return [2 /*return*/];
                    }
                });
            }); });
            it("should throw an error if userID is not existing", function () { return __awaiter(void 0, void 0, void 0, function () {
                var errMessage, err_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            errMessage = "";
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, orderStore.getActiveOrdersByUser(newUser.id + 1)];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            err_1 = _a.sent();
                            errMessage = err_1.message;
                            return [3 /*break*/, 4];
                        case 4:
                            expect(errMessage).toEqual("could not get orders, Error: you should provide existing user_id");
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe("getClosedOrdersByUser", function () {
            it("should return list of closed orders by user", function () { return __awaiter(void 0, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, orderStore.getClosedOrdersByUser(newUser.id)];
                        case 1:
                            res = _a.sent();
                            expect(res).toEqual([
                                {
                                    id: newOrder.id + 1,
                                    status: "close",
                                    user_id: newOrder.user_id,
                                },
                            ]);
                            return [2 /*return*/];
                    }
                });
            }); });
            it("should throw an error if userID is not existing", function () { return __awaiter(void 0, void 0, void 0, function () {
                var errMessage, err_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            errMessage = "";
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, orderStore.getActiveOrdersByUser(newUser.id + 1)];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            err_2 = _a.sent();
                            errMessage = err_2.message;
                            return [3 /*break*/, 4];
                        case 4:
                            expect(errMessage).toEqual("could not get orders, Error: you should provide existing user_id");
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe("addProduct method", function () {
            it("should add product to the right order", function () { return __awaiter(void 0, void 0, void 0, function () {
                var products;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, orderStore.getOrderProducts(newOrder.id)];
                        case 1:
                            products = _a.sent();
                            expect(products).toEqual([
                                {
                                    name: "mobile",
                                    quantity: 5,
                                    price: 1000,
                                },
                            ]);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe("getOrderProducts method", function () {
            it("should return list of all order products", function () { return __awaiter(void 0, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, orderStore.getOrderProducts(newOrder.id)];
                        case 1:
                            res = _a.sent();
                            expect(res).toEqual([
                                {
                                    name: "mobile",
                                    quantity: 5,
                                    price: 1000,
                                },
                            ]);
                            return [2 /*return*/];
                    }
                });
            }); });
            it("should throw an error if orderID is not existing", function () { return __awaiter(void 0, void 0, void 0, function () {
                var errMessage, err_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            errMessage = "";
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, orderStore.getOrderProducts(newOrder.id + 2)];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            err_3 = _a.sent();
                            errMessage = err_3.message;
                            return [3 /*break*/, 4];
                        case 4:
                            expect(errMessage).toEqual("could not get products, Error: you should provide existing order_id");
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe("closeOrder method", function () {
            it("should close the order", function () { return __awaiter(void 0, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, orderStore.closeOrder(1)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, orderStore.index()];
                        case 2:
                            res = _a.sent();
                            expect(res[0].status).toEqual("close");
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    });
});
