"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCardSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.validateCardSchema = joi_1.default.object({
    cardNumber: joi_1.default.string()
        .trim()
        .required()
        .pattern(/^[0-9\s-]+$/, 'digits, spaces, or hyphens')
        .min(13)
        .max(16)
        .messages({
        'string.base': 'Card number must be a string.',
        'string.empty': 'Card number cannot be empty.',
        'string.pattern.name': 'Card number must contain only digits, spaces, or hyphens.',
        'string.min': 'Card number must be at least {#limit} characters long.',
        'string.max': 'Card number cannot be longer than {#limit} characters.',
        'any.required': 'Card number is required.'
    }),
});
//# sourceMappingURL=card.schema.js.map