import { Request, Response, NextFunction } from 'express';

function errorHandler(err, _req: Request, res: Response, _next: NextFunction) {
  console.log('middleware', err);
  res.status(401).send({
    message: err.message,
  });
}

export default errorHandler;
