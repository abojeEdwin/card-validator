import express from 'express';
import cardRoutes from './route/card.route';
import { errorMiddleware, notFoundMiddleware } from './middleware/error.middleware';

const app = express();

// JSON parsing middleware
app.use(express.json());

// API routes
app.use('/api/v1/validateCard', cardRoutes);

// 404 handler
app.use(notFoundMiddleware);

// Global error middleware
app.use(errorMiddleware);

export default app;
