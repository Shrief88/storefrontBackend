"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var userHandler_1 = __importDefault(require("./handlers/userHandler"));
var productHandler_1 = __importDefault(require("./handlers/productHandler"));
var orderHandler_1 = __importDefault(require("./handlers/orderHandler"));
var dotenv_1 = __importDefault(require("dotenv"));
var cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
var PORT = process.env.PORT;
var app = (0, express_1.default)();
var port = parseInt(PORT);
var host = "localhost";
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
(0, userHandler_1.default)(app);
(0, productHandler_1.default)(app);
(0, orderHandler_1.default)(app);
app.get("/", function (req, res) {
    res.send("Welcome to storefront API from Fullstack Nanodegre");
});
app.listen(port, host, function () {
    console.log("app is rurnning on http://".concat(host, ":").concat(port));
});
exports.default = app;
