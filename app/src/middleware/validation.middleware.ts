import { Request, Response, NextFunction } from 'express';
import _Joi, { Schema, ValidationErrorItem } from 'joi';

export const validateSchema = (schema: Schema) => (req: Request, _res: Response, next: NextFunction) => {
  const { error, value } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const validationError = new Error(
      error.details.map((detail: ValidationErrorItem) => detail.message).join(', ')
    ) as Error & { status: number; code: string };
    
    validationError.status = 400;
    validationError.code = 'INVALID_INPUT';
    next(validationError);
  } else {
    req.body = value;
    next();
  }
};
