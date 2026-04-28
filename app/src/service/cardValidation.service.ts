export interface ValidationResult {
  isValid: 'Valid' | 'Invalid';
  normalizedCardNumber: string;
  cardType: string;
  validationDetails: string[]; // Added this field
}

export class CardValidationService {
  /**
   * Orchestrator function to validate a card number and determine its type.
   * Accumulates reasons for invalidation in `validationDetails`.
   */
  public validate(cardNumber: string): ValidationResult {
    const normalized = this.normalizeCardNumber(cardNumber);
    const validationDetails: string[] = [];

    // 1. Initial check for digit characters
    if (!this.isDigitsOnly(normalized)) {
      validationDetails.push('Card number must contain only digits after normalization.');
      return {
        isValid: 'Invalid',
        normalizedCardNumber: normalized,
        cardType: 'Invalid',
        validationDetails
      };
    }

    // 2. Determine card type
    const cardType = this.getCardType(normalized);
    if (cardType === 'Invalid') {
      validationDetails.push('Card type could not be determined from the prefix.');
    }

    // 3. Check for valid length (13-16)
    if (!this.isValidLength(normalized)) {
      validationDetails.push(`Invalid length: ${normalized.length}. Expected between 13 and 16 digits.`);
    }

    // 4. Perform specific index-based Luhn check
    const passesLuhn = this.passesLuhnCheck(normalized);
    if (!passesLuhn) {
      validationDetails.push('Luhn check failed: This is not a valid credit card number.');
    }

    // Determine overall validity
    // It's valid ONLY if there are no validation details collected
    const isValid = validationDetails.length === 0;

    return {
      isValid: isValid ? 'Valid' : 'Invalid',
      normalizedCardNumber: normalized,
      cardType: cardType,
      validationDetails
    };
  }

  /**
   * Determines the card type based on the first digit of the normalized card number.
   */
  private getCardType(cardNumber: string): string {
    const firstDigit = cardNumber.charAt(0);
    switch (firstDigit) {
      case '4':
        return 'VisaCard';
      case '5':
        return 'MasterCard';
      case '3':
        return 'American Express Card';
      case '6':
        return 'Discover Card';
      default:
        return 'Invalid';
    }
  }

  /**
   * Normalizes a card number by removing spaces and hyphens.
   */
  private normalizeCardNumber(cardNumber: string): string {
    return cardNumber.replace(/[\s-]/g, '');
  }

  /**
   * Checks if a string contains only digits.
   */
  private isDigitsOnly(cardNumber: string): boolean {
    return /^\d+$/.test(cardNumber);
  }

  /**
   * Checks if a card number has a valid length (typically between 13 and 16 digits).
   */
  private isValidLength(cardNumber: string): boolean {
    const length = cardNumber.length;
    return length >= 13 && length <= 16;
  }

  /**
   * Validates a card number using the exact logic provided from Java.
   */
  private passesLuhnCheck(cardNumber: string): boolean {
    const cardNumbers: number[] = [];
    for (let i = 0; i < cardNumber.length; i++) {
      cardNumbers.push(Number(cardNumber.charAt(i)));
    }

    let sumOfNumbersLessThanOrEqualToFour = 0;
    let sumOfNumberGreaterThanFour = 0;

    for (let index = cardNumbers.length - 1; index >= 0; index--) {
      if (index % 2 === 0 && cardNumbers[index]! <= 4) {
        sumOfNumbersLessThanOrEqualToFour += cardNumbers[index]! * 2;
      }
    }

    for (let index = cardNumbers.length - 1; index >= 0; index--) {
      if (index % 2 === 0 && cardNumbers[index]! > 4) {
        sumOfNumberGreaterThanFour += (cardNumbers[index]! * 2) - 9;
      }
    }

    const total = sumOfNumbersLessThanOrEqualToFour + sumOfNumberGreaterThanFour;

    let sumOfOddPositions = 0;
    for (let index = cardNumbers.length - 1; index >= 0; index--) {
      if (index % 2 !== 0) {
        sumOfOddPositions += cardNumbers[index]!;
      }
    }

    const sumTotal = sumOfOddPositions + total;
    return sumTotal % 10 === 0;
  }
}
