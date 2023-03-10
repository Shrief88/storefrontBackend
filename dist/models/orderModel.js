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
exports.OrderStore = void 0;
var database_1 = __importDefault(require("../database"));
var OrderStore = /** @class */ (function () {
    function OrderStore() {
    }
    OrderStore.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, res, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "SELECT * FROM orders";
                        return [4 /*yield*/, database_1.default.query(sql)];
                    case 2:
                        res = _a.sent();
                        conn.release();
                        return [2 /*return*/, res.rows];
                    case 3:
                        err_1 = _a.sent();
                        throw new Error("could not get orders");
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype.getActiveOrdersByUser = function (userID) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sqlUsers, users, sql, res, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sqlUsers = "SELECT * FROM users WHERE id=($1)";
                        return [4 /*yield*/, conn.query(sqlUsers, [userID])];
                    case 2:
                        users = _a.sent();
                        if (users.rowCount === 0) {
                            throw new Error("you should provide existing user_id");
                        }
                        sql = "SELECT * FROM orders WHERE user_id = ($1) AND status = ($2)";
                        return [4 /*yield*/, database_1.default.query(sql, [userID, "open"])];
                    case 3:
                        res = _a.sent();
                        conn.release();
                        return [2 /*return*/, res.rows];
                    case 4:
                        err_2 = _a.sent();
                        throw new Error("could not get orders, ".concat(err_2));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype.getClosedOrdersByUser = function (userID) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sqlUsers, users, sql, res, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sqlUsers = "SELECT * FROM users WHERE id=($1)";
                        return [4 /*yield*/, conn.query(sqlUsers, [userID])];
                    case 2:
                        users = _a.sent();
                        if (users.rowCount === 0) {
                            throw new Error("you should provide existing user_id");
                        }
                        sql = "SELECT * FROM orders WHERE user_id = ($1) AND status = ($2)";
                        return [4 /*yield*/, database_1.default.query(sql, [userID, "close"])];
                    case 3:
                        res = _a.sent();
                        conn.release();
                        return [2 /*return*/, res.rows];
                    case 4:
                        err_3 = _a.sent();
                        throw new Error("could not get orders, ".concat(err_3));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype.getOrderProducts = function (orderID) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sqlOrders, orders, sql, res, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sqlOrders = "SELECT * FROM orders WHERE id=($1)";
                        return [4 /*yield*/, conn.query(sqlOrders, [orderID])];
                    case 2:
                        orders = _a.sent();
                        if (orders.rowCount === 0) {
                            throw new Error("you should provide existing order_id");
                        }
                        sql = "SELECT name,quantity,price FROM products INNER JOIN ordered_products ON products.id = ordered_products.product_id WHERE order_id=($1)";
                        return [4 /*yield*/, conn.query(sql, [
                                orderID,
                            ])];
                    case 3:
                        res = _a.sent();
                        return [2 /*return*/, res.rows];
                    case 4:
                        err_4 = _a.sent();
                        throw new Error("could not get products, ".concat(err_4));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype.create = function (order) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, res, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "INSERT INTO orders (status,user_id) VALUES ($1,$2) RETURNING *";
                        return [4 /*yield*/, conn.query(sql, [order.status, order.user_id])];
                    case 2:
                        res = _a.sent();
                        conn.release();
                        return [2 /*return*/, res.rows[0]];
                    case 3:
                        err_5 = _a.sent();
                        throw new Error("could not create new Order. ".concat(err_5));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype.closeOrder = function (orderID) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sqlOrder, order, sql, res, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sqlOrder = "SELECT * FROM orders WHERE id=($1)";
                        return [4 /*yield*/, conn.query(sqlOrder, [orderID])];
                    case 2:
                        order = _a.sent();
                        if (order.rowCount === 0) {
                            throw new Error("you should provide existing order_id");
                        }
                        sql = "UPDATE orders SET status=($1) WHERE id=($2)";
                        return [4 /*yield*/, conn.query(sql, ["close", orderID])];
                    case 3:
                        res = _a.sent();
                        conn.release();
                        return [2 /*return*/, res.rows[0]];
                    case 4:
                        err_6 = _a.sent();
                        throw new Error("could not close the order. ".concat(err_6));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype.addProduct = function (quantity, orderID, productID) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sqlOrder, resOrder, sqlproduct, resProducst, order, sql, res, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sqlOrder = "SELECT * FROM orders WHERE id=($1)";
                        return [4 /*yield*/, conn.query(sqlOrder, [orderID])];
                    case 2:
                        resOrder = _a.sent();
                        if (resOrder.rowCount === 0) {
                            throw new Error("you should provide existing order_id");
                        }
                        sqlproduct = "SELECT * FROM products WHERE id=($1)";
                        return [4 /*yield*/, conn.query(sqlproduct, [productID])];
                    case 3:
                        resProducst = _a.sent();
                        if (resProducst.rowCount === 0) {
                            throw new Error("you should provide existing product_id");
                        }
                        order = resOrder.rows[0];
                        if (order.status !== "open") {
                            throw new Error("Order is compelete");
                        }
                        sql = "INSERT INTO ordered_products (order_id,product_id,quantity) VALUES ($1,$2,$3) RETURNING *";
                        return [4 /*yield*/, conn.query(sql, [
                                orderID,
                                productID,
                                quantity,
                            ])];
                    case 4:
                        res = _a.sent();
                        conn.release();
                        return [2 /*return*/, res.rows[0]];
                    case 5:
                        err_7 = _a.sent();
                        throw new Error("could not add product. ".concat(err_7));
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return OrderStore;
}());
exports.OrderStore = OrderStore;
