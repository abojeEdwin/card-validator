"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundMiddleware = exports.errorMiddleware = void 0;
const errorMiddleware = (err, req, res, _next) => {
    const status = err.status || 500;
    const code = err.code || 'INTERNAL_SERVER_ERROR';
    const message = err.message || 'An unexpected error occurred';
    console.error(`[Error] ${req.method} ${req.url} - Status: ${status}, Code: ${code}, Message: ${message}`);
    res.status(status).json({
        error: {
            code,
            message,
        }
    });
};
exports.errorMiddleware = errorMiddleware;
const notFoundMiddleware = (req, res) => {
    res.status(404).json({
        error: {
            code: 'NOT_FOUND',
            message: `Route ${req.method} ${req.url} not found`
        }
    });
};
exports.notFoundMiddleware = notFoundMiddleware;
//# sourceMappingURL=error.middleware.js.map