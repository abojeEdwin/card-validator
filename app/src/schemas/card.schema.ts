import Joi from 'joi';

export const validateCardSchema = Joi.object({
  cardNumber: Joi.string()
    .trim()
    .required()
    .pattern(/^[0-9\s-]+$/, 'digits, spaces, or hyphens')
    .min(13)
    .max(16)
    .messages({
      'string.base': 'Card number must be a string.',
      'string.empty': 'Card number cannot be empty.',
      'string.pattern.name': 'Card number must contain only digits, spaces, or hyphens.',
      'string.min': 'Card number must be at least {#limit} characters long.',
      'string.max': 'Card number cannot be longer than {#limit} characters.',
      'any.required': 'Card number is required.'
    }),
});

export type ValidateCardInput = {
  cardNumber: string;
};
