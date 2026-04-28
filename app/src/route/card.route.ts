import { Router } from 'express';
import { validateCard } from '../controller/card.controller';
import { validateSchema } from '../middleware/validation.middleware';
import { validateCardSchema } from '../data/schemas/card.schema';

const router = Router();


router.post('/validate', validateSchema(validateCardSchema), validateCard);

export default router;
