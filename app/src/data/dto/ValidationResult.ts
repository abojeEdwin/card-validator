export interface ValidationResult {
    isValid: 'Valid' | 'Invalid';
    normalizedCardNumber: string;
    cardType: string;
}