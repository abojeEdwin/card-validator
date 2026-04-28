import { Request, Response, NextFunction } from 'express';
import { CardValidationService } from '../service/cardValidation.service';

const cardValidationService = new CardValidationService();


export const validateCard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { cardNumber } = req.body;
    const result = cardValidationService.validate(cardNumber);

    return res.status(200).json({
      isValid: result.isValid,
      normalizedCardNumber: result.normalizedCardNumber,
      cardType: result.cardType,
      validationDetails: result.validationDetails
    });
  } catch (err) {
    next(err);
    return;
  }
};
