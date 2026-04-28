"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const card_controller_1 = require("../controller/card.controller");
const validation_middleware_1 = require("../middleware/validation.middleware");
const card_schema_1 = require("../data/schemas/card.schema");
const router = (0, express_1.Router)();
router.post('/validate', (0, validation_middleware_1.validateSchema)(card_schema_1.validateCardSchema), card_controller_1.validateCard);
exports.default = router;
//# sourceMappingURL=card.route.js.map