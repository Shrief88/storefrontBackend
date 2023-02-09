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
var orderModel_1 = require("../models/orderModel");
var verifyAuthToken_1 = __importDefault(require("../middlewares/verifyAuthToken"));
var store = new orderModel_1.OrderStore();
var index = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orders, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, store.index()];
            case 1:
                orders = _a.sent();
                res.json(orders);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                res.status(400).json({ error: err_1.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var create = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var order, newOrder, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                order = {
                    status: "open",
                    user_id: req.body.user_id,
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, store.create(order)];
            case 2:
                newOrder = _a.sent();
                res.json(newOrder);
                return [3 /*break*/, 4];
            case 3:
                err_2 = _a.sent();
                res.status(400).json({ error: err_2.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var getActiveOrdersByUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userID, orders, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userID = req.params.userID;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, store.getActiveOrdersByUser(parseInt(userID))];
            case 2:
                orders = _a.sent();
                res.json(orders);
                return [3 /*break*/, 4];
            case 3:
                err_3 = _a.sent();
                res.status(400).json({ err: err_3.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var getClosedOrdersByUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userID, orders, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userID = req.params.userID;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, store.getClosedOrdersByUser(parseInt(userID))];
            case 2:
                orders = _a.sent();
                res.json(orders);
                return [3 /*break*/, 4];
            case 3:
                err_4 = _a.sent();
                res.status(400).json({ err: err_4.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var showProducts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orderID, products, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                orderID = parseInt(req.params.orderID);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, store.getOrderProducts(orderID)];
            case 2:
                products = _a.sent();
                res.json(products);
                return [3 /*break*/, 4];
            case 3:
                err_5 = _a.sent();
                res.status(400).json({ err: err_5.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var addProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orderId, productId, quantity, addedProduct, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                orderId = parseInt(req.params.orderID);
                productId = req.body.productId;
                quantity = parseInt(req.body.quantity);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, store.addProduct(quantity, orderId, productId)];
            case 2:
                addedProduct = _a.sent();
                res.json(addedProduct);
                return [3 /*break*/, 4];
            case 3:
                err_6 = _a.sent();
                res.status(400);
                res.json(err_6);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var closeOrder = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orderId, updatedOrder, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                orderId = parseInt(req.params.orderID);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, store.closeOrder(orderId)];
            case 2:
                updatedOrder = _a.sent();
                res.json(updatedOrder);
                return [3 /*break*/, 4];
            case 3:
                err_7 = _a.sent();
                res.status(400);
                res.json(err_7);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var orderRoutes = function (app) {
    app.get("/orders", verifyAuthToken_1.default, index);
    app.get("/orders/:orderID", verifyAuthToken_1.default, showProducts);
    app.put("/orders/:orderID", verifyAuthToken_1.default, closeOrder);
    app.post("/orders", verifyAuthToken_1.default, create);
    app.get("/orders/active/:userID", verifyAuthToken_1.default, getActiveOrdersByUser);
    app.get("/orders/close/:userID", verifyAuthToken_1.default, getClosedOrdersByUser);
    app.post("/orders/:orderID/products", verifyAuthToken_1.default, addProduct);
};
exports.default = orderRoutes;
