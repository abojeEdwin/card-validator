import { CardValidationService, ValidationResult } from '../src/service/cardValidation.service';

describe('CardValidationService', () => {
  let service: CardValidationService;

  beforeEach(() => {
    service = new CardValidationService();
  });

  describe('validate method (orchestrator)', () => {
    it('should return isValid: "Valid" and correct cardType for a valid Visa card number', () => {
      const result: ValidationResult = service.validate('4000-0000-0000-0002'); // Valid Visa example
      expect(result.isValid).toBe('Valid');
      expect(result.normalizedCardNumber).toBe('4000000000000002');
      expect(result.cardType).toBe('VisaCard');
    });

    it('should return isValid: "Valid" and correct cardType for a valid MasterCard number', () => {
      const result: ValidationResult = service.validate('5000-0000-0000-0002'); // Valid MasterCard example
      expect(result.isValid).toBe('Valid');
      expect(result.normalizedCardNumber).toBe('5000000000000002');
      expect(result.cardType).toBe('MasterCard');
    });

    it('should return isValid: "Valid" and correct cardType for a valid American Express card number', () => {
      const result: ValidationResult = service.validate('3000-0000-0000-0002'); // Valid Amex example
      expect(result.isValid).toBe('Valid');
      expect(result.normalizedCardNumber).toBe('3000000000000002');
      expect(result.cardType).toBe('American Express Card');
    });

    it('should return isValid: "Valid" and correct cardType for a valid Discover card number', () => {
      const result: ValidationResult = service.validate('6000-0000-0000-0002'); // Valid Discover example
      expect(result.isValid).toBe('Valid');
      expect(result.normalizedCardNumber).toBe('6000000000000002');
      expect(result.cardType).toBe('DiscoverCard');
    });

    it('should return isValid: "Invalid" and correct cardType for a number failing the Luhn check', () => {
      const result: ValidationResult = service.validate('4000 0000 0000 0001'); // Invalid Luhn
      expect(result.isValid).toBe('Invalid');
      expect(result.normalizedCardNumber).toBe('4000000000000001');
      expect(result.cardType).toBe('VisaCard'); // Type is still detected if prefix is valid
    });

    it('should return isValid: "Invalid" and correct cardType for a number with invalid length (too short)', () => {
      const result: ValidationResult = service.validate('400000000000'); // Too short Visa
      expect(result.isValid).toBe('Invalid');
      expect(result.normalizedCardNumber).toBe('400000000000');
      expect(result.cardType).toBe('VisaCard');
    });

    it('should return isValid: "Invalid" and correct cardType for a number with invalid length (too long)', () => {
      const result: ValidationResult = service.validate('40000000000000000'); // Too long Visa
      expect(result.isValid).toBe('Invalid');
      expect(result.normalizedCardNumber).toBe('40000000000000000');
      expect(result.cardType).toBe('VisaCard');
    });

    it('should return isValid: "Invalid" and "Invalid" cardType if non-digit characters remain after normalization', () => {
      const result: ValidationResult = service.validate('4000-0000-0000-000A'); // Contains non-digit
      expect(result.isValid).toBe('Invalid');
      expect(result.normalizedCardNumber).toBe('400000000000000A');
      expect(result.cardType).toBe('Invalid'); // Type is invalid because it's not digits only
    });

    it('should return isValid: "Invalid" and "Invalid" cardType for an unknown card prefix', () => {
      const result: ValidationResult = service.validate('9123-4567-8901-2345'); // Unknown prefix
      expect(result.isValid).toBe('Invalid');
      expect(result.normalizedCardNumber).toBe('9123456789012345');
      expect(result.cardType).toBe('Invalid');
    });

    it('should return isValid: "Invalid" and "Invalid" cardType for an empty string', () => {
      const result: ValidationResult = service.validate('');
      expect(result.isValid).toBe('Invalid');
      expect(result.normalizedCardNumber).toBe('');
      expect(result.cardType).toBe('Invalid');
    });

    it('should return isValid: "Invalid" and "Invalid" cardType for a string with only spaces', () => {
      const result: ValidationResult = service.validate('   ');
      expect(result.isValid).toBe('Invalid');
      expect(result.normalizedCardNumber).toBe(''); // Normalized to empty string
      expect(result.cardType).toBe('Invalid');
    });
  });
});
