import { Request, Response, NextFunction } from 'express';

export const errorLogger = (error: any, _req: Request, _res: Response, next: NextFunction) => {
  console.error('Middleware error log: ', error);
  next(error);
};

export const boomErrorHandler = (error: any, _req: Request, res: Response, next: NextFunction) => {
  if (error.isBoom) {
    const { output } = error;
    return res.status(output.statusCode).json(output.payload);
  }
  next(error);
};

export const genericErrorHandler = (
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.status(500).json({
    message: error.message,
    stack: error.stack,
  });
};
