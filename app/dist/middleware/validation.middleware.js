"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchema = void 0;
const validateSchema = (schema) => (req, _res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        const validationError = new Error(error.details.map((detail) => detail.message).join(', '));
        validationError.status = 400;
        validationError.code = 'INVALID_INPUT';
        next(validationError);
    }
    else {
        req.body = value;
        next();
    }
};
exports.validateSchema = validateSchema;
//# sourceMappingURL=validation.middleware.js.map