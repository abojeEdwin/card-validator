"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cardValidation_service_1 = require("../src/service/cardValidation.service");
describe('CardValidationService', () => {
    let service;
    beforeEach(() => {
        service = new cardValidation_service_1.CardValidationService();
    });
    describe('validate method (orchestrator)', () => {
        it('should return isValid: "Valid" and no validationDetails for a valid Visa card number', () => {
            const result = service.validate('4000-0000-0000-0002');
            expect(result.isValid).toBe('Valid');
            expect(result.normalizedCardNumber).toBe('4000000000000002');
            expect(result.cardType).toBe('VisaCard');
            expect(result.validationDetails).toHaveLength(0);
        });
        it('should return isValid: "Valid" for a valid MasterCard number', () => {
            const result = service.validate('5234-5678-9157-8309');
            expect(result.isValid).toBe('Valid');
            expect(result.cardType).toBe('MasterCard');
            expect(result.validationDetails).toHaveLength(0);
        });
        it('should return isValid: "Invalid" and detail message for a number failing the Luhn check', () => {
            const result = service.validate('4000 0000 0000 0001');
            expect(result.isValid).toBe('Invalid');
            expect(result.cardType).toBe('VisaCard');
            expect(result.validationDetails).toContain('Luhn check failed: This is not a valid credit card number.');
        });
        it('should return isValid: "Invalid" and detail message for an invalid length (too short)', () => {
            const result = service.validate('400000000000'); // 12 digits
            expect(result.isValid).toBe('Invalid');
            expect(result.validationDetails).toContain('Invalid length: 12. Expected between 13 and 16 digits.');
        });
        it('should return isValid: "Invalid" and detail message for an invalid length (too long)', () => {
            const result = service.validate('40000000000000000'); // 17 digits
            expect(result.isValid).toBe('Invalid');
            expect(result.validationDetails).toContain('Invalid length: 17. Expected between 13 and 16 digits.');
        });
        it('should return isValid: "Invalid" and detail message for unknown card prefix', () => {
            const result = service.validate('9123-4567-8901-2345');
            expect(result.isValid).toBe('Invalid');
            expect(result.cardType).toBe('Invalid');
            expect(result.validationDetails).toContain('Card type could not be determined from the prefix.');
        });
        it('should return isValid: "Invalid" if non-digit characters remain after normalization', () => {
            const result = service.validate('4000-0000-0000-000A');
            expect(result.isValid).toBe('Invalid');
            expect(result.validationDetails).toContain('Card number must contain only digits after normalization.');
        });
        it('should handle empty strings', () => {
            const result = service.validate('');
            expect(result.isValid).toBe('Invalid');
            expect(result.validationDetails).toContain('Card number must contain only digits after normalization.');
        });
    });
});
//# sourceMappingURL=cardValidation.service.test.js.map