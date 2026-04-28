import { Request, Response, NextFunction } from 'express';

export const errorMiddleware = (
  err: Error & { status?: number; code?: string },
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const status = err.status || 500;
  const code = err.code || 'INTERNAL_SERVER_ERROR';
  const message = err.message || 'An unexpected error occurred';

  console.error(`[Error] ${req.method} ${req.url} - Status: ${status}, Code: ${code}, Message: ${message}`);


  res.status(status).json({
    error: {
      code,
      message,
    }
  });
};

export const notFoundMiddleware = (req: Request, res: Response) => {
  res.status(404).json({
    error: {
      code: 'NOT_FOUND',
      message: `Route ${req.method} ${req.url} not found`
    }
  });
};
