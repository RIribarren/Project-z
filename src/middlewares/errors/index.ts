import { Request, Response } from 'express';

function errorHandler(err: any, _req: Request, res: Response, _next: any) {
  console.log("middleware",err);
  res.status(401).send({ 
    message: err.message 
  });
}

export default errorHandler;
