import { Request, Response, NextFunction } from 'express';
export declare const errorMiddleware: (err: Error & {
    status?: number;
    code?: string;
}, req: Request, res: Response, _next: NextFunction) => void;
export declare const notFoundMiddleware: (req: Request, res: Response) => void;
//# sourceMappingURL=error.middleware.d.ts.map