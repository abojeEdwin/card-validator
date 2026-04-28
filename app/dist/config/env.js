"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const isBlank = (value) => value === undefined || value === null || value === '';
const getNumber = (name, fallback) => {
    const raw = process.env[name];
    if (isBlank(raw)) {
        if (fallback !== undefined)
            return fallback;
        throw new Error(`Missing required environment variable: ${name}`);
    }
    const parsed = Number(raw);
    if (!Number.isFinite(parsed)) {
        throw new Error(`Environment variable ${name} must be a valid number. Received: ${raw}`);
    }
    return parsed;
};
exports.env = {
    PORT: getNumber('PORT', 3000),
};
//# sourceMappingURL=env.js.map