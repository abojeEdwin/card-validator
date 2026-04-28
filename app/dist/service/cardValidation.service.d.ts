export interface ValidationResult {
    isValid: 'Valid' | 'Invalid';
    normalizedCardNumber: string;
    cardType: string;
    validationDetails: string[];
}
export declare class CardValidationService {
    validate(cardNumber: string): ValidationResult;
    private getCardType;
    private normalizeCardNumber;
    private isDigitsOnly;
    private isValidLength;
    private passesLuhnCheck;
}
//# sourceMappingURL=cardValidation.service.d.ts.map