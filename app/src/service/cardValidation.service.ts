
import { ValidationResult } from '../data/dto/ValidationResult';

export class CardValidationService {

  public validate(cardNumber: string): ValidationResult {
    const normalized = this.normalizeCardNumber(cardNumber);

    if (!this.isDigitsOnly(normalized)) {
      return {
        isValid: 'Invalid',
        normalizedCardNumber: normalized,
        cardType: 'Invalid'
      };
    }

    const cardType = this.getCardType(normalized);

    if (cardType === 'Invalid') {
      return {
        isValid: 'Invalid',
        normalizedCardNumber: normalized,
        cardType: 'Invalid'
      };
    }

    if (!this.isValidLength(normalized)) {
      return {
        isValid: 'Invalid',
        normalizedCardNumber: normalized,
        cardType: cardType
      };
    }

    const passesLuhn = this.passesLuhnCheck(normalized);

    return {
      isValid: passesLuhn ? 'Valid' : 'Invalid',
      normalizedCardNumber: normalized,
      cardType: cardType
    };
  }

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

  private normalizeCardNumber(cardNumber: string): string {
    return cardNumber.replace(/[\s-]/g, '');
  }

  private isDigitsOnly(cardNumber: string): boolean {
    return /^\d+$/.test(cardNumber);
  }

  private isValidLength(cardNumber: string): boolean {
    const length = cardNumber.length;
    return length >= 13 && length <= 16;
  }

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
