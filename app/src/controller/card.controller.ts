import { Request, Response } from 'express';
import { validateCardSchema } from '../data/schemas/card.schema';
import { CardValidationService } from '../service/cardValidation.service'; // Import the class

const cardValidationService = new CardValidationService(); // Instantiate the service

export const validateCard = async (req: Request, res: Response) => {
  const { error, value } = validateCardSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      error: {
        code: 'INVALID_INPUT',
        message: error.details.map((detail) => detail.message).join(', ')
      }
    });
  }

  const { cardNumber } = value;
  const result = cardValidationService.validate(cardNumber);

  return res.status(200).json({
    isValid: result.isValid,
    normalizedCardNumber: result.normalizedCardNumber,
    cardType: result.cardType
  });
};
