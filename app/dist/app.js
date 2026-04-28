"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const card_route_1 = __importDefault(require("./route/card.route"));
const error_middleware_1 = require("./middleware/error.middleware");
const app = (0, express_1.default)();
// JSON parsing middleware
app.use(express_1.default.json());
// API routes
app.use('/api/v1/validateCard', card_route_1.default);
// 404 handler
app.use(error_middleware_1.notFoundMiddleware);
// Global error middleware
app.use(error_middleware_1.errorMiddleware);
exports.default = app;
//# sourceMappingURL=app.js.map