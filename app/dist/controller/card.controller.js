"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCard = void 0;
const cardValidation_service_1 = require("../service/cardValidation.service");
const cardValidationService = new cardValidation_service_1.CardValidationService();
const validateCard = async (req, res, next) => {
    try {
        const { cardNumber } = req.body;
        const result = cardValidationService.validate(cardNumber);
        return res.status(200).json({
            isValid: result.isValid,
            normalizedCardNumber: result.normalizedCardNumber,
            cardType: result.cardType,
            validationDetails: result.validationDetails
        });
    }
    catch (err) {
        next(err);
        return;
    }
};
exports.validateCard = validateCard;
//# sourceMappingURL=card.controller.js.map